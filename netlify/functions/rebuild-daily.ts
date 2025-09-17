export default async () => {
  try {
    const tz = "America/New_York";
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const hour = Number(parts.find((p) => p.type === "hour")?.value);
    const minute = Number(parts.find((p) => p.type === "minute")?.value);
    const force = process.env.FORCE_REBUILD === "1";
    const hasHook = Boolean(process.env.BUILD_HOOK);
    const hookLen = (process.env.BUILD_HOOK || "").length;

    console.log(
      `[rebuild-daily] ET ${hour}:${minute
        .toString()
        .padStart(2, "0")} | force=${force} | hasHook=${hasHook} len=${hookLen}`
    );

    if (!hasHook) return new Response("BUILD_HOOK missing", { status: 500 });
    if (!force && !(hour === 0 && minute < 10)) {
      console.log("[rebuild-daily] Skipping outside midnight window");
      return new Response("Skipped (not midnight window)", { status: 200 });
    }

    const url = new URL(process.env.BUILD_HOOK!);
    url.searchParams.append(
      "trigger_title",
      force ? "Forced rebuild (debug)" : "Daily rebuild, to update events"
    );

    const resp = await fetch(url.toString(), { method: "POST" });
    const text = await resp.text().catch(() => "");
    console.log(
      `[rebuild-daily] webhook status=${resp.status} ok=${
        resp.ok
      } body=${text.slice(0, 200)}`
    );

    return new Response(
      resp.ok ? "Triggered rebuild" : `Failed: ${resp.status}`,
      { status: resp.ok ? 200 : 500 }
    );
  } catch (err) {
    console.error("[rebuild-daily] Error", err);
    return new Response("Error", { status: 500 });
  }
};

// while debugging
export const config = { schedule: "*/2 * * * *" };
