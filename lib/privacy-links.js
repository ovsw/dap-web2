// Park public policy ID confirmed with the policy owner; this is not the site ID.
export const privacyPolicyUrl =
  "https://www.iubenda.com/privacy-policy/41165067";
export const cookiePolicyUrl = `${privacyPolicyUrl}/cookie-policy`;
export const noticeAtCollectionUrl = `${cookiePolicyUrl}?an=no&s_ck=false&newmarkup=yes`;
export const privacyChoicesUrl = `${privacyPolicyUrl}/legal#privacy_rights_under_us_state_laws`;

export const legacyPolicyRedirects = {
  "/privacy-policy": privacyPolicyUrl,
  "/cookie-policy": cookiePolicyUrl,
};
