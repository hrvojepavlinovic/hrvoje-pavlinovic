import { Handlers } from "$fresh/server.ts";
import { ClickType, trackClick, trackPageView } from "../../utils/kv.ts";

const ALLOWED_CLICK_TYPES = new Set<ClickType>([
  "menu",
  "link",
  "internal",
  "external",
  "like",
  "cta",
]);

const isShortString = (value: unknown, maxLength: number): value is string =>
  typeof value === "string" && value.length > 0 && value.length <= maxLength;

export const handler: Handlers = {
  async POST(req) {
    let data: Record<string, unknown>;

    try {
      data = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { type, target, page, userAgent } = data;

    if (type === "click") {
      const clickType = typeof data.clickType === "string"
        ? data.clickType
        : "link";

      if (
        !ALLOWED_CLICK_TYPES.has(clickType as ClickType) ||
        !isShortString(target, 200)
      ) {
        return new Response(JSON.stringify({ error: "Invalid click event" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      await trackClick(clickType as ClickType, target);
    } else if (type === "pageview") {
      if (
        !isShortString(page, 200) || !page.startsWith("/") ||
        (userAgent !== undefined && typeof userAgent !== "string")
      ) {
        return new Response(
          JSON.stringify({ error: "Invalid pageview event" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      await trackPageView(page, userAgent?.slice(0, 512));
    } else {
      return new Response(JSON.stringify({ error: "Invalid event type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
