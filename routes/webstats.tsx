import { Head } from "$fresh/runtime.ts";
import WebStatsPage from "../islands/WebStats.tsx";

export default function WebStats() {
  return (
    <>
      <Head>
        <title>Web Stats &mdash; Hrvoje Pavlinovic</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <WebStatsPage />
    </>
  );
}
