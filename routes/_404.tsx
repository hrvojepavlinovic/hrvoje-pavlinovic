import { Head } from "$fresh/runtime.ts";
import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const response = await ctx.render();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, {
      status: 404,
      headers: response.headers,
    });
  },
};

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 Page Not Found &mdash; Hrvoje Pavlinovic</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div class="flex flex-col items-center justify-center min-h-screen p-4">
        <div class="text-center">
          <h1 class="text-6xl font-bold dark:text-white text-black">404</h1>
          <p class="mt-4 text-lg dark:text-white/60 text-black/60">
            What are you doing here?
          </p>
          <a
            href="/"
            class="inline-block mt-6 px-6 py-2 rounded-lg bg-btc-orange text-white hover:bg-btc-orange/90"
          >
            Go Home
          </a>
        </div>
      </div>
    </>
  );
}
