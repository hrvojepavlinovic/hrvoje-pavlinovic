import { trackClick } from "$utils/analytics.ts";

export default function StatsLink() {
  return (
    <a
      href="/webstats"
      class="hover:text-btc-orange"
      onClick={() => trackClick("footer", "webstats")}
    >
      📊
    </a>
  );
}
