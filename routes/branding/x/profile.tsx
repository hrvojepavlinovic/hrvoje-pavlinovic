import { Head } from "$fresh/runtime.ts";

export default function XProfile() {
  return (
    <>
      <Head>
        <title>X Profile Photo &mdash; Hrvoje Pavlinovic</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>
          {`
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        `}
        </style>
      </Head>

      <div class="min-h-screen bg-gradient-to-br from-gray-950 via-orange-950/20 to-gray-950 p-8 flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl">
          </div>
          <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl">
          </div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-blue-500/5 rounded-full blur-3xl">
          </div>
        </div>

        <div class="relative z-10">
          {/* Gradient Border */}
          <div class="w-[400px] h-[400px] rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 p-2">
            {/* Cover Background + Profile Image */}
            <div class="w-full h-full rounded-full bg-gradient-to-br from-gray-950 via-orange-950/90 to-gray-950 flex items-center justify-center overflow-hidden">
              <img
                src="/pfpt.png"
                alt="Hrvoje Pavlinovic Profile Photo"
                class="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
