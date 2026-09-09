export default function () {
  const privacy = window.ParkPrivacy;
  if (!privacy) return;
  const scripts = [];
  // GTM-PTB8BGL tags 25 and 51 write/decorate exactly these campaign keys.
  const campaignKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "utm_id",
  ];
  let attributionObserver;

  function cleanAttribution() {
    campaignKeys.forEach((key) => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        /* Storage may be disabled. */
      }
    });
    document
      .querySelectorAll('a[href*="delgrossos.centeredgeonline.com"]')
      .forEach((link) => {
        const href = link.getAttribute("href");
        try {
          if (
            new URL(href, window.location.href).hostname !==
            "delgrossos.centeredgeonline.com"
          )
            return;
          const hashIndex = href.indexOf("#");
          const hash = hashIndex < 0 ? "" : href.slice(hashIndex);
          const base = hashIndex < 0 ? href : href.slice(0, hashIndex);
          const queryIndex = base.indexOf("?");
          if (queryIndex < 0) return;
          const query = base
            .slice(queryIndex + 1)
            .split("&")
            .filter((part) => {
              const key = decodeURIComponent(part.split("=")[0]);
              return !campaignKeys.includes(key);
            })
            .join("&");
          const clean =
            base.slice(0, queryIndex) + (query ? `?${query}` : "") + hash;
          // Keep unrelated ticket/cart parameters byte-for-byte, including signatures.
          if (clean !== href) link.setAttribute("href", clean);
        } catch (error) {
          /* Leave malformed or unrelated links intact. */
        }
      });
  }

  privacy.onStop(() => {
    cleanAttribution();
    // Nuxt may replace footer/navigation nodes after initial CMP readiness.
    if (!attributionObserver && typeof MutationObserver === "function") {
      attributionObserver = new MutationObserver(() => {
        if (!privacy.isAllowed()) cleanAttribution();
      });
      attributionObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["href"],
      });
    }
    scripts.forEach((script) => script.remove());
    // GTM can create its own pixels/frames. Remove these before the CMP can
    // rebuild an old iframe while the saved-choice reload is in progress.
    const trackerHosts = [
      "googletagmanager.com",
      "google-analytics.com",
      "analytics.google.com",
      "doubleclick.net",
      "googleadservices.com",
      "googlesyndication.com",
      "facebook.com",
      "facebook.net",
      "tiktok.com",
      "adsrvr.org",
    ];
    document.querySelectorAll("script, iframe, img").forEach((element) => {
      const source =
        element.getAttribute("src") ||
        element.getAttribute("data-suppressedsrc");
      if (!source) return;
      try {
        const hostname = new URL(source, window.location.href).hostname;
        if (
          trackerHosts.some(
            (host) => hostname === host || hostname.endsWith(`.${host}`)
          )
        ) {
          element.removeAttribute("src");
          element.remove();
        }
      } catch (error) {
        /* Non-URL elements are unrelated to tracking. */
      }
    });
  });

  privacy.whenAllowed(() => {
    if (attributionObserver) {
      attributionObserver.disconnect();
      attributionObserver = null;
    }
    // Keep the previous module's Do Not Track protection for both containers.
    const dnt =
      navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack;
    if (dnt === "1" || dnt === 1 || dnt === "yes") return;
    window.dataLayer = window.dataLayer || [];
    ["GTM-M35WQ393", "GTM-PTB8BGL"].forEach((id) => {
      if (!privacy.isAllowed()) return;
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
      scripts.push(script);
      document.head.appendChild(script);
    });
  });
}
