// Optional browser check of `npm run generate` output. Use an isolated Playwright
// installation: PLAYWRIGHT_MODULE=/path/to/playwright-core node scripts/check-privacy-browser.cjs
// The real Park CMP loads; tracker/form responses are stubbed. No purchases or
// production analytics requests are sent. The server listens only on 127.0.0.1.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE ||
  "playwright-core");
const http = require("http");
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const { resolveStaticFile } = require("./privacy-test-server.cjs");
// HTTPS fixture URLs exercise the browser's real cookie-domain/public-suffix rules.
// Only this origin's page/assets come from dist; the actual CMP still uses HTTPS.
const baseUrl = process.env.PARK_TEST_ORIGIN || "http://127.0.0.1:4317";
async function serveFixture(route) {
  const url = new URL(route.request().url());
  if (url.origin !== baseUrl || baseUrl === "http://127.0.0.1:4317") return false;
  const file = resolveStaticFile(path.join(root, "dist"), url.pathname);
  const contentType = file && file.endsWith(".js") ? "application/javascript"
    : file && file.endsWith(".css") ? "text/css"
    : file && file.endsWith(".html") ? "text/html" : "application/octet-stream";
  await route.fulfill({ status: file ? 200 : 404, contentType,
    body: file ? fs.readFileSync(file) : "Not found" });
  return true;
}
const server = http.createServer((req, res) => {
  const file = resolveStaticFile(path.join(root, "dist"), req.url);
  if (!file) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  const type = file.endsWith(".js")
    ? "application/javascript"
    : file.endsWith(".css")
    ? "text/css"
    : file.endsWith(".html")
    ? "text/html"
    : file.endsWith(".svg")
    ? "image/svg+xml"
    : "application/octet-stream";
  res.setHeader("Content-Type", type);
  res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise((r) => server.listen(4317, "127.0.0.1", r));
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const reqs = [];
  await context.route("**/*", async (route) => {
    if (await serveFixture(route)) return;
    const u = route.request().url();
    if (/googletagmanager|adsrvr|facebook|tiktok|google-analytics/.test(u)) {
      reqs.push(u);
      return route.fulfill({ contentType: "application/javascript", body: "" });
    }
    if (u.includes("cognitoforms"))
      return route.fulfill({
        contentType: "text/html",
        body: '<form><input name="email"><button>Contact</button></form>',
      });
    return route.continue();
  });
  page.on("pageerror", (e) => console.log("PAGE ERROR", e.message));
  page.on("requestfailed", (r) =>
    console.log("FAILED", r.url(), r.failure().errorText)
  );
  await page.goto(baseUrl + "/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => window._iub?.csReady === true);
  await page.waitForFunction(() => window.ParkPrivacy?.isAllowed() === true);
  await page.waitForTimeout(600);
  const assert = require("assert");
  for (let attempt = 0; reqs.length < 3 && attempt < 20; attempt++)
    await page.waitForTimeout(250);
  assert.equal(reqs.length, 3);
  const initial = await page.evaluate(() => ({
    preferences: _iub.cs.api.getPreferences(),
    purposes: _iub.cs.api.getPurposesState(),
  }));
  const results = {
    origin: baseUrl,
    fresh: { allowed: true, requests: reqs.slice(), ...initial },
  };
  const controls = await page.evaluate(() => ({
    noticeInFooter: document.querySelectorAll("footer .iubenda-cs-uspr-link")
      .length,
    preferencesInFooter: document.querySelectorAll(
      "footer .iubenda-cs-preferences-link"
    ).length,
    automaticUSWidgets: document.querySelectorAll(".iub__us-widget").length,
    genericFloatingButtons: [
      ...document.querySelectorAll(".iubenda-tp-btn"),
    ].filter((e) => e.getBoundingClientRect().width > 0).length,
    noticeHref: document
      .querySelector("footer .iubenda-cs-uspr-link")
      .getAttribute("href"),
  }));
  assert.equal(controls.noticeInFooter, 1);
  assert.equal(controls.preferencesInFooter, 1);
  assert.equal(controls.automaticUSWidgets, 0);
  results.controls = controls;
  await page.evaluate(() => {
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "utm_id",
    ].forEach((k) => localStorage.setItem(k, "old-tracking"));
    localStorage.setItem("cart-test-preserve", "cart-123");
  });
  // The actual CMP writes storage and invokes our callbacks. Wait for the reload.
  await Promise.all([
    page.waitForEvent("domcontentloaded"),
    page.evaluate(() =>
      _iub.cs.api.setPreferences({ uspr: { s: false, sh: false, adv: false } })
    ),
  ]);
  await page.waitForFunction(() => window._iub?.csReady === true);
  await page.waitForTimeout(800);
  const persistence = {
    origin: baseUrl,
    cookies: (await context.cookies()).filter(c => c.name.startsWith("_iub")),
    state: await page.evaluate(() => ({ preferences: _iub.cs.api.getPreferences(), purposes: _iub.cs.api.getPurposesState() })),
    requests: reqs.length
  };
  console.log("PERSISTENCE", JSON.stringify(persistence));
  results.persistence = persistence;
  assert.equal(
    reqs.length,
    3,
    "No further optional request after withdrawal/reload"
  );
  assert.equal(await page.evaluate(() => ParkPrivacy.isAllowed()), false);
  results.withdrawal = {
    allowed: false,
    requestsAfterReload: reqs.length - 3,
    purposes: await page.evaluate(() => _iub.cs.api.getPurposesState()),
  };
  const after = await context.storageState();
  const attributionState = await page.evaluate(() => ({
    keys: Object.keys(localStorage),
    cart: localStorage.getItem("cart-test-preserve"),
  }));
  assert(!attributionState.keys.some((k) => k.startsWith("utm_")));
  assert.equal(attributionState.cart, "cart-123");
  // Seed stale campaign state, as on a returning opted-out browser from an older build.
  after.origins
    .find((o) => o.origin === baseUrl)
    .localStorage.push(
      ...[
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "utm_id",
      ].map((name) => ({ name, value: "stale" }))
    );
  const returning = await browser.newContext({ storageState: after });
  let returningRequests = [];
  await returning.route("**/*", async (route) => {
    if (await serveFixture(route)) return;
    const u = route.request().url();
    if (/googletagmanager|adsrvr|facebook|tiktok|google-analytics/.test(u)) {
      returningRequests.push(u);
      return route.fulfill({ body: "" });
    }
    if (u.includes("cognitoforms"))
      return route.fulfill({
        contentType: "text/html",
        body: "<form>Contact form</form>",
      });
    return route.continue();
  });
  const returnPage = await returning.newPage();
  await returnPage.goto(baseUrl + "/");
  await returnPage.waitForFunction(() => window._iub?.csReady === true);
  await returnPage.waitForTimeout(600);
  assert.equal(returningRequests.length, 0);
  assert.equal(await returnPage.evaluate(() => ParkPrivacy.isAllowed()), false);
  await returnPage.goto(baseUrl + "/contact/");
  await returnPage.waitForFunction(() => window._iub?.csReady === true);
  assert.equal(
    await returnPage
      .locator('iframe[src*="cognitoforms"]')
      .first()
      .getAttribute("src"),
    "https://www.cognitoforms.com/f/xPoircp7HEGoNo_tpFEirg?id=167"
  );
  assert.equal(
    await returnPage
      .locator('a[href="https://delgrossos.centeredgeonline.com/"]')
      .first()
      .getAttribute("href"),
    "https://delgrossos.centeredgeonline.com/"
  );
  await returnPage.locator("footer .iubenda-cs-preferences-link").click();
  await returnPage
    .getByRole("button", { name: "Save and continue", exact: true })
    .waitFor();
  assert(returnPage.url().startsWith(baseUrl + "/"));
  const persisted = await returnPage.evaluate(() => Object.keys(localStorage));
  assert(!persisted.some((k) => k.startsWith("utm_")));
  await returnPage.evaluate(() => {
    const a = document.createElement("a");
    a.id = "ticket-attribution-test";
    a.href =
      "https://delgrossos.centeredgeonline.com/retail?cart=abc%20def&utm_source=old&count=2&utm_id=old#checkout";
    document.body.appendChild(a);
  });
  await returnPage.waitForFunction(
    () =>
      document
        .getElementById("ticket-attribution-test")
        .getAttribute("href") ===
      "https://delgrossos.centeredgeonline.com/retail?cart=abc%20def&count=2#checkout"
  );
  results.returningOptOut = {
    requests: 0,
    contactIframeRetained: true,
    ticketLinkRetained: true,
    footerOpensNativePreferences: true,
    staleUtmKeysRemoved: true,
    dynamicTicketUtmRemoved: true,
    cartParametersPreserved: true,
  };
  const gpc = await browser.newContext();
  await gpc.addInitScript(() =>
    Object.defineProperty(navigator, "globalPrivacyControl", {
      get: () => true,
    })
  );
  const gpcRequests = [];
  await gpc.route("**/*", async (route) => {
    if (await serveFixture(route)) return;
    const u = route.request().url();
    if (/googletagmanager|adsrvr|facebook|tiktok|google-analytics/.test(u)) {
      gpcRequests.push(u);
      return route.fulfill({ body: "" });
    }
    if (u.includes("cognitoforms")) return route.fulfill({ body: "Contact" });
    return route.continue();
  });
  const gpcPage = await gpc.newPage();
  await gpcPage.goto(baseUrl + "/");
  await gpcPage.waitForFunction(() => window._iub?.csReady === true);
  await gpcPage.waitForTimeout(600);
  assert.equal(gpcRequests.length, 0);
  assert.equal(await gpcPage.evaluate(() => ParkPrivacy.isAllowed()), false);
  results.gpc = {
    requests: 0,
    purposes: await gpcPage.evaluate(() => _iub.cs.api.getPurposesState()),
  };
  // Failure must not cause a permissive timeout.
  const failed = await browser.newContext();
  const failedRequests = [];
  await failed.route("**/*", async (route) => {
    if (await serveFixture(route)) return;
    const u = route.request().url();
    if (/iubenda/.test(u)) return route.abort();
    if (/googletagmanager|adsrvr/.test(u)) {
      failedRequests.push(u);
      return route.fulfill({ body: "" });
    }
    if (u.includes("cognitoforms")) return route.fulfill({ body: "Contact" });
    return route.continue();
  });
  const failPage = await failed.newPage();
  await failPage.goto(baseUrl + "/");
  await failPage.waitForTimeout(1500);
  assert.equal(failedRequests.length, 0);
  assert.equal(await failPage.evaluate(() => ParkPrivacy.isAllowed()), false);
  results.cmpUnavailable = { requests: 0 };
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const noJsRequests = [];
  await noJs.route("**/*", async (route) => {
    if (await serveFixture(route)) return;
    const u = route.request().url();
    if (/googletagmanager|adsrvr|facebook|tiktok|google-analytics/.test(u)) {
      noJsRequests.push(u);
      return route.fulfill({ body: "" });
    }
    return route.continue();
  });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(baseUrl + "/");
  assert.equal(noJsRequests.length, 0);
  assert.equal(
    await noJsPage
      .locator("footer .iubenda-cs-preferences-link")
      .getAttribute("href"),
    "https://www.iubenda.com/privacy-policy/41165067/legal#privacy_rights_under_us_state_laws"
  );
  results.noJavaScript = { requests: 0, hostedFallbackRetained: true };
  console.log(JSON.stringify(results, null, 2));
  fs.writeFileSync(
    path.join(root, process.env.PARK_TEST_RESULTS || "docs/park-browser-results-latest.json"),
    JSON.stringify(results, null, 2)
  );
  await browser.close();
  server.close();
})().catch((e) => {
  console.error(e);
  server.close();
  process.exit(1);
});
