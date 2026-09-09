import { legacyPolicyRedirects } from "../lib/privacy-links";

// Netlify handles direct requests; middleware also covers Nuxt navigation.
export default function ({ route, redirect }) {
  const path = route.path.replace(/\/$/, "");
  const destination = legacyPolicyRedirects[path];
  if (destination) {
    return redirect(301, destination);
  }
}
