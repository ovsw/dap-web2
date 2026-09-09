/* Park US opt-out bridge. Load before the native iubenda blocking/CMP scripts. */
(function (window, document) {
  "use strict";
  if (window.ParkPrivacy) return;

  var ready = false;
  var failed = false;
  var allowed = false;
  var started = false;
  var reloading = false;
  var listeners = [];
  var stopListeners = [];
  var stopped = false;

  function readSavedPreference() {
    if (!ready || failed || window.navigator.globalPrivacyControl === true) {
      return false;
    }
    try {
      var api = window._iub && window._iub.cs && window._iub.cs.api;
      var preferences = api && api.getPreferences();
      var uspr = preferences && preferences.uspr;
      // Fresh US opt-out visits can return {} from getPreferences(). The
      // documented getPurposesState() exposes CMP-resolved defaults/stored state.
      if (!uspr && api && typeof api.getPurposesState === "function") {
        uspr = api.getPurposesState();
      }
      // iubenda core 1.105.0: true = allowed; GPC/opt-out produces false.
      // Do not use the GDPR `consent` boolean or treat missing US flags as allowed.
      return !!(
        uspr &&
        uspr.s === true &&
        uspr.sh === true &&
        uspr.adv === true
      );
    } catch (error) {
      return false;
    }
  }

  function sync() {
    if (reloading) return;

    if (
      !window.ParkPrivacy.isAllowed() &&
      (ready || failed || window.navigator.globalPrivacyControl === true)
    ) {
      if (!stopped) {
        stopped = true;
        stopListeners.forEach(function (stop) {
          try {
            stop();
          } catch (error) {
            /* Continue to the other cleanup. */
          }
        });
      }
      if (started) {
        // The CMP saves US preferences before these callbacks. Reload destroys
        // third-party event handlers; cleanup also covers returning opt-outs.
        reloading = true;
        window.location.reload();
        return;
      }
    }
    if (window.ParkPrivacy.isAllowed()) {
      stopped = false;
      var pending = listeners;
      listeners = [];
      pending.forEach(function (start) {
        if (!window.ParkPrivacy.isAllowed()) return;
        started = true;
        try {
          start();
        } catch (error) {
          /* Continue to the other listeners. */
        }
      });
    }
  }

  function onReady() {
    ready = true;
    onSavedPreference();
  }

  function onSavedPreference() {
    allowed = readSavedPreference();
    sync();
  }

  function onFailure() {
    failed = true;
    sync();
  }

  window.ParkPrivacy = {
    isAllowed: function () {
      return (
        ready &&
        !failed &&
        !reloading &&
        allowed &&
        window.navigator.globalPrivacyControl !== true
      );
    },
    onStop: function (stop) {
      stopListeners.push(stop);
      if (stopped) stop();
    },
    whenAllowed: function (start) {
      listeners.push(start);
      sync();
    },
  };

  window._iub = window._iub || [];
  var configuration = (window._iub.csConfiguration =
    window._iub.csConfiguration || {});
  // netlify.app is a shared public suffix: browsers reject cookies scoped to it.
  // Keep preview consent on the exact host; retain the native production scope.
  if ((window.location.hostname || "").endsWith(".netlify.app")) {
    configuration.localConsentDomainExact = true;
  }
  var callbacks = (configuration.callback = configuration.callback || {});
  function chain(name, next) {
    var previous = callbacks[name];
    callbacks[name] = function () {
      // Our state must update even if an unrelated callback throws.
      try {
        if (typeof previous === "function") previous.apply(this, arguments);
      } finally {
        next();
      }
    };
  }
  chain("onReady", onReady);
  chain("onPreferenceExpressedOrNotNeeded", onSavedPreference);
  chain("onPreferenceFirstExpressed", onSavedPreference);
  chain("onStartupFailed", onFailure);
  chain("onFatalError", onFailure);

  // Do not read staged modal choices here: only saved callbacks refresh them.
  // Recheck GPC, and initialize again instead of reviving trackers from BFCache.
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) window.location.reload();
    else sync();
  });
  window.addEventListener("focus", sync);
  document.addEventListener("visibilitychange", sync);
  window.setInterval(sync, 1000);
})(window, document);
