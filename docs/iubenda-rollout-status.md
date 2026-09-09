# Park iubenda rollout — source status

2026-09-09. **Implementation and local checks complete. Not committed or deployed.**

Repository: `/work/dev/dgs/old/dap/dap-web2`.
Branch: `feat/iubenda-rollout`, created from clean `master` at `1583bf6`. This task changed Park source only. No CMS writes, commits, pushes, deploys, or CodeRabbit review.

## Identity and native loader

Nash task `01a08471-67ce-7081-b048-c2b498566b55` confirmed:

- Site **4607766**, public policy **41165067**, editor **3299041**, Cookie Solution **1284756**.
- Actual unified widget: https://embeds.iubenda.com/widgets/09c719d0-e19a-4073-9656-a898af0fa09b.js
- Public runtime configuration: https://cs.iubenda.com/cookie-solution/confs/js/41165067.js
- Final config: GDPR off; US enabled and applied to all users; `usprPurposes: s,sh,adv`; inline-left US widget. Banner matches the saved DG2Go reference.

The public configuration exposed the widget UUID; HTTP GET verified it. No ID was invented or copied from another site. Nash then supplied the same generated snippet and final public verification. See `park-cmp-evidence.json` for URLs, configuration, timestamps and hashes.

`app.html` loads synchronous `/privacy-controls.js`, then the native unified widget, then Nuxt `HEAD`. The first script installs callbacks only; it does not start tracking. The native blocking loader therefore runs before page scripts. No duplicate classic loader, stub, or second CMP is installed.

## Tracking behavior

- Removed the direct `GTM-M35WQ393` head loader and its noscript frame from `app.html`.
- Removed `@nuxtjs/gtm` from active Nuxt modules and its configuration, eliminating the automatic `GTM-PTB8BGL` loader and second noscript frame. Its installed dependency/lockfile were left intact.
- `plugins/privacy-tracking.client.js` loads both containers only through the local privacy bridge. Existing Do Not Track behavior is retained and now applies to both containers.
- `plugins/pixel.client.js` retains the existing standalone Trade Desk code and IDs (`wylz9t3`, `jthjdgl`), but starts it only through the bridge. A second check at delayed iframe insertion prevents a pending pixel from starting after withdrawal.
- All optional analytics/ads are treated together: any `s`, `sh`, or `adv` opt-out blocks both containers and the standalone pixel.
- GPC is an explicit veto. CMP missing/failure/unknown flags cannot start optional tracking. Repeated callbacks cannot start duplicate loaders.
- On saved withdrawal, tracking elements are removed before reload. Reload destroys already-running third-party code and handlers. The first browser test exposed a native Trade Desk iframe rebuild during withdrawal; removal before reload resolved it.
- Staged modal edits do not cause a reload. The bridge reads preference state only on readiness and saved-preference callbacks; its interval/focus checks recheck GPC without reading unsaved modal state. BFCache restoration reloads to resolve stored preferences again.

### Verified US flag semantics

Read the saved advanced guide at `/work/dev/dgs/iubenda-rollout/iubenda-advanced-guide.txt`, especially the US purposes, callback, `getPreferences()` and `getPurposesState()` sections. Its HTML companion records the original documentation. Runtime examined: https://cdn.iubenda.com/cookie_solution/iubenda_cs/1.105.0/core-en.js

- US defaults in that runtime: `s:true`, `sh:true`, `adv:true`. GPC sets the affected values to **false**. Thus true means allowed, not opted out.
- `getPreferences()` may return `{}` on a fresh US opt-out visit even after `onReady`. The actual browser confirmed this.
- The documented `getPurposesState()` returns merged core and US flags. After readiness, it exposes CMP-resolved defaults/stored state. The bridge uses it only when `getPreferences().uspr` is absent, then requires all three booleans to be exactly true.
- The GDPR `consent` boolean and numeric purpose flags are not used to infer a US opt-out.
- Runtime `setPreference` stores US values before `fireConsentCallbacks`, which invokes `onPreferenceFirstExpressed` and `onPreferenceExpressed` (and its OrNotNeeded callback). These callbacks cover saved US changes. `onPreferenceChange` alone compares generic purposes and is insufficient.

## UTM and CenterEdge cleanup

Published `GTM-PTB8BGL` resource version 21, tags **25** and **51**, stores and appends exactly:

`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`.

Tag **15** reads a subset into `utmDataReady`. Source evidence is the extracted public container in `/work/dev/dgs/iubenda-rollout/public-audit/www.googletagmanager.com_gtm.js-c2960510.resource.json` and its original URL https://www.googletagmanager.com/gtm.js?id=GTM-PTB8BGL.

On denial, including a returning opt-out without any tracking started in this document, the plugin removes only these six localStorage keys. It removes only these query parameters from links whose hostname is exactly `delgrossos.centeredgeonline.com`. It preserves other parameters byte-for-byte, including encoded cart values, quantities and URL fragments. An observer handles later Nuxt DOM/href updates while denied. This stops residual attribution without clearing cart/storage wholesale or disabling ticket links.

## Footer and legacy routes

`lib/privacy-links.js` holds the verified hosted URLs. The Legal list preserves Privacy, Cookie, Terms and accessibility links, and contains:

- Notice at Collection: `iubenda-cs-uspr-link`, cookie-policy fallback with `?an=no&s_ck=false&newmarkup=yes`.
- Your Privacy Choices: `iubenda-cs-preferences-link`, `/legal#privacy_rights_under_us_state_laws` fallback. Nash verified the exact anchor after finalizing the policy.

The generated site browser check found exactly one of each in the footer, **zero** automatic US widgets and **zero** visible generic floating buttons. No display override was needed. The preferences link opens the native CMP; hosted fallbacks remain available without JavaScript. Existing footer layout/style classes and Terms remain intact.

Before edits, `pages/_page/index.vue` rendered the Sanity `simplePage` slug `privacy-policy`; there was no cookie-policy document in the read-only policy-slug query. The site is static on Netlify, so middleware alone would not handle deployed direct requests. Forced Netlify 301 rules and Nuxt navigation middleware cover `/privacy-policy` and `/cookie-policy`, both with and without a final slash. Generation excludes those replaced slugs. Terms and other CMS pages remain generated.

## Checks and proof

- **Node 14.21.3**, as required by `AGENTS.md`: `npm ci`, then full **`npm run generate`**, exit **0** after the final functional changes. This includes the production client/server build, CMS read-only route generation, fallback and sitemaps. Proof: `park-build-proof.json`; full local log `/tmp/park-generate-review.log`.
- Non-blocking build warnings: outdated Browserslist data and Webpack asset size limit. Dependency manifests and lockfile are unchanged.
- `node scripts/check-privacy.cjs`: passed. Covers readiness, fresh US defaults, every opt-out flag, GPC, stored opt-out, re-enabling, staged vs saved preferences, single reload, delayed pixel, no noscript bypass, exact UTM cleanup and preservation of ticket/cart values.
- Vue 2.6.12 footer compilation/server render and redirect/generation fixture checks: passed.
- **Real Chromium against generated `dist`**, using the real Park widget/runtime: fresh allowed visit; saved withdrawal/reload; returning opt-out; GPC; unavailable CMP; disabled JavaScript; actual contact-page iframe and ticket-link preservation; native footer preferences; no duplicate controls; stale UTM cleanup; dynamic decorated ticket-link cleanup. All passed. Results: `park-browser-results.json`.
- Browser tracker responses were intercepted, so no test events were sent to production analytics/advertising services. Cognito responses were stubbed; forms were not submitted. These checks establish gating, DOM and link preservation, not full third-party checkout or form processing.
- Repeat browser check: after generation, run `scripts/check-privacy-browser.cjs` with a separate current Playwright installation via `PLAYWRIGHT_MODULE`. The browser runner uses current Node; the application build and source checks use Node 14. It runs only on local port 4317 and writes `park-browser-results-latest.json`.
- `git diff --check`: passed. Generated HTML scan found no direct GTM script or noscript URLs.

## Release status

The source checks pass, including the HTTPS Netlify fixture described below. Actual deployed preview verification remains required. Netlify/GitHub deployment access and release execution belong to the main task; this task did not inspect or change account permissions or create deployment records. No release has been made. Recheck the selected preview after authorized deployment, especially real form/ticket operation and downstream GTM behavior, since those external responses were stubbed locally.

## Single review resolution and preview persistence

The completed CodeRabbit review reported four minor findings. Start callbacks now run independently when a vendor throws. The local test server rejects traversal and outside symlink targets. A VM observer check now covers dynamic CenterEdge attribution and disconnect on allow, in addition to the existing browser check. The broad embed exemption was rejected: the generated pages contain two Cognito form iframes, neither in the tracker list. No essential content break was found, and arbitrary CMS embeds must not bypass opt-out cleanup.

An HTTPS fixture at `https://deploy-preview-1--park-privacy-fixture.netlify.app` reproduced the shared-host consent bug: Save/reload lost cookies and reset US flags to allowed. Before proof: `park-preview-persistence-before.json`. The bootstrap now sets `localConsentDomainExact=true` only for `.netlify.app` hosts, before the real native widget. This uses the documented option (saved advanced guide line 4870; core 1.105.0 `_getLocalConsentDomain` omits Domain for exact mode). Custom production domain scope is unchanged.

The full Node 14 generate passed after this fix (162 routes). Real Chromium with generated assets served at the HTTPS fixture origin and the actual remote CMP now preserves host-only cookies and false US flags in the same context through reload; no optional requests follow withdrawal. Returning opt-out, GPC, unavailable CMP, no-JS fallbacks, footer controls, forms/tickets and dynamic UTM cleanup also pass. Evidence: `park-browser-results-netlify.json`. This is a browser fixture with real public-suffix rules, not a deployed Netlify test. Run it with `PARK_TEST_ORIGIN` and `PARK_TEST_RESULTS` using the saved browser runner. Tracker/form responses remain stubbed.

Full resolution: `/work/dev/dgs/iubenda-rollout/coderabbit-park-resolution.md`. No further CodeRabbit review, commit, push or deployment was run by this task.
