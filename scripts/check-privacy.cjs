// Run with Node 14. No network requests or browser accounts.
const assert = require("assert");
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function browser(preferences, gpc = false, purposeState, hostname = "www.mydelgrossopark.com") {
  const requests = [],
    events = {},
    timers = [];
  let reloads = 0;
  const storage = new Map();
  const observers = [];
  const appendChild = (node) => {
    requests.push(node.src || node.attributes.src);
  };
  const document = {
    documentElement: {},
    readyState: "complete",
    body: { appendChild },
    head: { appendChild },
    addEventListener: (name, fn) => {
      events[name] = fn;
    },
    removeEventListener() {},
    getElementsByTagName: (name) => (name === "body" ? [document.body] : []),
    getElementById: () => null,
    querySelectorAll: () => [],
    createElement: () => ({
      attributes: {},
      remove() {},
      setAttribute(key, value) {
        this.attributes[key] = value;
      },
    }),
  };
  const window = {
    localStorage: { removeItem: (key) => storage.delete(key) },
    navigator: { globalPrivacyControl: gpc },
    document,
    location: {
      hostname,
      href: "https://" + hostname + "/",
      reload() {
        reloads++;
      },
    },
    addEventListener: (name, fn) => {
      events[name] = fn;
    },
    setInterval: (fn) => {
      events.interval = fn;
    },
    _iub: {
      cs: {
        api: {
          getPreferences: () => preferences,
          getPurposesState: () => purposeState,
        },
      },
    },
  };
  window.top = window;
  window.parent = window;
  const context = vm.createContext({
    window,
    document,
    navigator: window.navigator,
    top: window,
    URL,
    MutationObserver: class {
      constructor(callback) {
        this.callback = callback;
        this.active = false;
        observers.push(this);
      }
      observe(target, options) {
        this.active = true;
        this.options = options;
      }
      disconnect() { this.active = false; }
    },
    setTimeout: (fn) => timers.push(fn),
    console,
  });
  vm.runInContext(read("static/privacy-controls.js"), context);
  for (const file of [
    "plugins/privacy-tracking.client.js",
    "plugins/pixel.client.js",
  ]) {
    vm.runInContext(
      "(function(){" +
        read(file).replace("export default function", "function startPlugin") +
        "; startPlugin();})()",
      context
    );
  }
  const flush = () => {
    while (timers.length) timers.shift()();
  };
  return {
    window,
    requests,
    events,
    flush,
    document,
    storage,
    observers,
    callbacks: window._iub.csConfiguration.callback,
    set: (value) => (preferences = value),
    reloads: () => reloads,
  };
}
const allow = {
  id: 41165067,
  consent: false,
  uspr: { s: true, sh: true, adv: true },
};
const assertNoTracking = (b) => {
  b.flush();
  assert.deepStrictEqual(b.requests, []);
};
for (const preference of [
  {},
  { consent: true },
  { uspr: { s: "true", sh: true, adv: true } },
  ...["s", "sh", "adv"].map((key) => ({
    ...allow,
    uspr: { ...allow.uspr, [key]: false },
  })),
]) {
  const b = browser(preference);
  b.callbacks.onReady(true);
  assertNoTracking(b);
}
let fresh = browser({}, false, allow.uspr);
fresh.callbacks.onReady();
fresh.flush();
assert.equal(fresh.requests.length, 3);
let unknown = browser({}, false, { s: true, sh: true });
unknown.callbacks.onReady();
assertNoTracking(unknown);
let freshGpc = browser({}, true, allow.uspr);
freshGpc.callbacks.onReady();
assertNoTracking(freshGpc);
let b = browser(allow);
assertNoTracking(b);
b.events.interval();
assertNoTracking(b);
b.callbacks.onPreferenceExpressedOrNotNeeded();
assertNoTracking(b);
b.callbacks.onReady(false);
b.flush();
assert.equal(b.requests.length, 3);
assert(
  b.requests.includes("https://www.googletagmanager.com/gtm.js?id=GTM-M35WQ393")
);
assert(
  b.requests.includes("https://www.googletagmanager.com/gtm.js?id=GTM-PTB8BGL")
);
assert(
  b.requests.some(
    (url) => url.includes("adv=wylz9t3") && url.includes("upid=jthjdgl")
  )
);
b.callbacks.onReady();
b.callbacks.onPreferenceExpressedOrNotNeeded();
b.flush();
assert.equal(b.requests.length, 3);
// Staged UI edits must not reload before storage is saved.
b.set({ ...allow, uspr: { s: false, sh: false, adv: false } });
b.events.interval();
assert.equal(b.reloads(), 0);
b.callbacks.onPreferenceFirstExpressed();
assert.equal(b.reloads(), 1);
assert.equal(b.window.ParkPrivacy.isAllowed(), false);
b.callbacks.onPreferenceExpressedOrNotNeeded();
assert.equal(b.reloads(), 1);
b = browser(allow, true);
b.callbacks.onReady();
assertNoTracking(b);
b = browser(allow);
b.callbacks.onStartupFailed();
b.callbacks.onReady();
assertNoTracking(b);
b = browser({ ...allow, uspr: { s: false, sh: false, adv: false } });
b.callbacks.onReady();
assertNoTracking(b);
b.set(allow);
b.callbacks.onPreferenceFirstExpressed();
b.flush();
assert.equal(b.requests.length, 3);
b.window.navigator.globalPrivacyControl = true;
b.events.interval();
assert.equal(b.reloads(), 1);
// Revoke before delayed vendor DOM work: the standalone pixel must stay off.
b = browser(allow);
b.callbacks.onReady();
b.set({ ...allow, uspr: { s: false, sh: true, adv: true } });
b.callbacks.onPreferenceFirstExpressed();
b.flush();
assert.equal(b.requests.length, 2);
assert(!read("app.html").includes("googletagmanager"));
assert(!read("nuxt.config.js").includes('"@nuxtjs/gtm"'));
assert(!read("app.html").includes("<noscript"));
console.log(
  "PASS: ready/default opt-out semantics, all US flags, GPC, saved withdrawal/reload, staged edits, repeated callbacks, startup failure, delayed pixel, both GTM containers, and no noscript bypass."
);

// Clear only the published GTM attribution keys, preserving checkout state/URL bytes.
const returning = browser({
  ...allow,
  uspr: { s: false, sh: true, adv: true },
});
const keys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
];
keys.forEach((key) => returning.storage.set(key, "old-campaign"));
returning.storage.set("cart", "keep-cart");
returning.storage.set("unrelated", "keep");
const ticket = {
  href: "https://delgrossos.centeredgeonline.com/retail?cart=abc%20def&utm_source=old&count=2&utm_source=duplicate&utm_id=x#checkout",
  getAttribute() {
    return this.href;
  },
  setAttribute(key, value) {
    this.href = value;
  },
};
const unrelated = {
  ...ticket,
  href: "https://example.com/?next=delgrossos.centeredgeonline.com&utm_source=keep",
};
returning.document.querySelectorAll = (selector) =>
  selector.startsWith("a[") ? [ticket, unrelated] : [];
returning.callbacks.onReady();
keys.forEach((key) => assert.equal(returning.storage.has(key), false));
assert.equal(returning.storage.get("cart"), "keep-cart");
assert.equal(returning.storage.get("unrelated"), "keep");
assert.equal(
  ticket.href,
  "https://delgrossos.centeredgeonline.com/retail?cart=abc%20def&count=2#checkout"
);
assert.equal(
  unrelated.href,
  "https://example.com/?next=delgrossos.centeredgeonline.com&utm_source=keep"
);
console.log(
  "PASS: returning opt-out removes only six GTM keys and CenterEdge UTM parameters; cart, quantity, encoded bytes, fragments and unrelated links remain."
);

// A broken optional vendor must not suppress later starts or withdrawal cleanup.
const isolated = browser(allow);
let laterStarts = 0;
let stopped = 0;
isolated.window.ParkPrivacy.whenAllowed(() => { throw new Error("vendor failed"); });
isolated.window.ParkPrivacy.whenAllowed(() => { laterStarts++; });
isolated.window.ParkPrivacy.onStop(() => { stopped++; });
assert.doesNotThrow(() => isolated.callbacks.onReady());
assert.equal(laterStarts, 1);
isolated.set({ uspr: { s: false, sh: false, adv: false } });
isolated.callbacks.onPreferenceFirstExpressed();
assert.equal(stopped, 1);
assert.equal(isolated.reloads(), 1);
assert.equal(isolated.window.ParkPrivacy.isAllowed(), false);

// The observer removes attribution from links inserted or updated while denied.
const observer = returning.observers[0];
assert(observer.active);
assert.equal(observer.options.childList, true);
assert.equal(observer.options.attributeFilter[0], "href");
ticket.href = "https://delgrossos.centeredgeonline.com/retail?cart=keep&utm_campaign=late#checkout";
returning.storage.set("utm_campaign", "late");
observer.callback([{ type: "childList" }]);
assert.equal(ticket.href, "https://delgrossos.centeredgeonline.com/retail?cart=keep#checkout");
assert.equal(returning.storage.has("utm_campaign"), false);
returning.set(allow);
returning.callbacks.onPreferenceFirstExpressed();
assert.equal(observer.active, false);
console.log("PASS: failed start isolation and dynamic attribution observer/disconnect.");

// Local browser-test server rejects traversal, malformed URLs, and outside symlinks.
const { resolveStaticFile } = require("./privacy-test-server.cjs");
const fixture = fs.mkdtempSync(path.join(require("os").tmpdir(), "park-static-"));
try {
  const dist = path.join(fixture, "dist");
  fs.mkdirSync(path.join(dist, "page"), { recursive: true });
  fs.writeFileSync(path.join(dist, "index.html"), "home");
  fs.writeFileSync(path.join(dist, "page/index.html"), "page");
  fs.writeFileSync(path.join(dist, "asset.js"), "asset");
  fs.writeFileSync(path.join(fixture, "outside.txt"), "outside");
  fs.symlinkSync(path.join(fixture, "outside.txt"), path.join(dist, "escape"));
  for (const url of ["/../outside.txt", "/%2e%2e/outside.txt", "/%2e%2e%2foutside.txt", "/escape", "/%ZZ", "/%00", "/missing"])
    assert.equal(resolveStaticFile(dist, url), null, url);
  for (const [url, file] of [["/", "index.html"], ["/page/", "page/index.html"], ["/page", "page/index.html"], ["/asset.js?v=1", "asset.js"]])
    assert.equal(resolveStaticFile(dist, url), path.join(dist, file));
} finally {
  fs.rmdirSync(fixture, { recursive: true });
}
console.log("PASS: static test-server containment and normal routes/assets.");

for (const host of ["deploy-preview-1--park.netlify.app", "park.netlify.app"])
  assert.equal(browser(allow, false, undefined, host).window._iub.csConfiguration.localConsentDomainExact, true);
for (const host of ["www.mydelgrossopark.com", "netlify.app.example.com", "localhost"])
  assert.equal(browser(allow, false, undefined, host).window._iub.csConfiguration.localConsentDomainExact, undefined);
console.log("PASS: exact-host consent scope only on Netlify preview hosts.");
