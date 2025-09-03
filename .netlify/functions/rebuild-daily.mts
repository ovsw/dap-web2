// Stop TypeScript from complaining about
// the missing process.env.BUILD_HOOK
declare var process: {
  env: {
    BUILD_HOOK: string;
  };
};

// An asynchronous function to call
// the Netlify build hook to rebuild your site
const rebuildSite = async (triggerTitle: string) => {
  // Construct the URL for the Netlify rebuild hook
  const url = new URL(process.env.BUILD_HOOK);

  // Add the title to the query string
  url.searchParams.append("trigger_title", triggerTitle);

  // Make a POST request to the Netlify webhook
  return await fetch(url.toString(), {
    method: "POST",
  });
};

// Helper: determine if current time in America/New_York is within
// the first 10 minutes after midnight. This makes the job DST-safe.
const isAroundMidnightET = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour")!.value);
  const minute = Number(parts.find((p) => p.type === "minute")!.value);
  return hour === 0 && minute < 10;
};

export default async () => {
  if (!process.env.BUILD_HOOK) {
    return new Response("BUILD_HOOK is not configured", { status: 500 });
  }

  if (!isAroundMidnightET()) {
    return new Response("Skipped: not midnight ET window", { status: 200 });
  }

  const resp = await rebuildSite("Daily rebuild, to update events");
  const text = resp.ok
    ? "Triggered rebuild"
    : `Failed to trigger: ${resp.status}`;
  return new Response(text, { status: resp.ok ? 200 : 500 });
};

// Netlify scheduled function cron syntax (UTC)
// Run daily at 04:00 and 05:00 UTC to cover ET midnight across DST.
// The handler guards to only fire at midnight ET.
export const config = {
  schedule: "0 4,5 * * *",
};
