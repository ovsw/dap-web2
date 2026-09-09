# Park legal footer correction

Branch: `feat/park-legal-lightboxes`, based on `origin/master` at `ece803e2`. Park has no `origin/main`.

- Privacy, Cookie and Terms now use the official `iubenda-nostyle no-brand iubenda-noiframe iubenda-embed` classes and hosted hrefs for policy 41165067.
- `SiteFooter.mounted` loads the official `https://cdn.iubenda.com/iubenda.js` scanner. Normal Nuxt navigation keeps the footer and bindings. A footer remount replaces the loader script and scans the new anchors. No custom modal or click interception is used.
- Terms replaces the legacy menu link. Both `/terms-and-conditions` variants redirect to the hosted Terms document in Netlify and Nuxt. Existing generation filtering also omits the old Terms page.
- The white two-part US control is beneath the left contact/address block, separate from Legal. It uses the DG2Go blue icon and native CMP hooks. Narrow columns stack the two parts to prevent clipping. No automatic duplicate widget is added.
- Tracking gating, CMP configuration and essential forms/ticket logic are unchanged.

## Checks

- Node 14.21.3 full `npm run generate`: exit 0; 161 routes. Log `/tmp/park-legal-generate.log`, SHA-256 `ea7b5866062b8f61ebbc1020ed9eac184a72da9317d68b34103b79c0b458d324`. Existing Browserslist and bundle-size warnings remain.
- Node 14 privacy VM suite: passed. Footer SSR, all six forced redirect variants and route generation fixture: passed.
- Real official loader/CMP against generated pages: three lightboxes launch on initial load and after client-side navigation to Contact; page stays in the app. Privacy/Cookie content loads. Native hosted hrefs remain without JavaScript.
- Widths 1440, 1024, 405 and 360: no widget clipping/overflow, correct white background, 32px blue icon, beneath address, separate from Legal, no duplicate native US widget. Preferences opens the CMP.
- Full generated-site consent browser regression with the legal loader present: passed (fresh, saved withdrawal/reload, returning opt-out, GPC, CMP failure, no JS, forms/tickets and UTM cleanup). Evidence: `/work/dev/dgs/iubenda-rollout/park-legal-consent-results.json`.
- Evidence and screenshots: `/work/dev/dgs/iubenda-rollout/park-legal-browser-results.json`, `park-legal-browser.log`, `park-legal-footer-*.png`.

## Release hold

The hosted Terms URL still returns HTTP 404 while main generates the document. The Terms anchor and official lightbox launch are checked; Terms content must be checked after publication. This draft must not merge until that check passes. No CMS changes or CodeRabbit review were run.
