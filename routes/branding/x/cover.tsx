import { Head } from "$fresh/runtime.ts";

export default function XCover() {
  return (
    <>
      <Head>
        <title>X Cover - Hrvoje Pavlinovic</title>
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

      <div class="min-h-screen bg-gray-200 dark:bg-gray-800 p-8 flex items-center justify-center">
        <div class="w-full max-w-[1500px] aspect-[3/1] relative overflow-hidden bg-gradient-to-br from-gray-950 via-orange-950/20 to-gray-950 flex items-center shadow-2xl border-[10px] border-red-500">
          {/* Animated Background Elements */}
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute top-[10%] left-[8%] w-[25%] h-[80%] bg-orange-500/10 rounded-full blur-3xl">
            </div>
            <div class="absolute bottom-[10%] right-[8%] w-[17%] h-[55%] bg-blue-500/10 rounded-full blur-3xl">
            </div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[35%] h-[120%] bg-purple-500/5 rounded-full blur-3xl">
            </div>
          </div>

          {/* Main Content */}
          <div class="relative z-10 w-full px-[10%] flex items-center">
            {/* Right Side - Main Content */}
            <div class="flex-1 text-right space-y-[2vw]">
              <div class="space-y-[1vw]">
                <h1 class="text-[5vw] font-black text-white leading-tight">
                  Dream • Build • Repeat
                </h1>
                <div class="text-[2vw] font-semibold">
                  🚀{" "}
                  <span class="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Follow for daily builds & insights
                  </span>
                </div>
              </div>

              <div class="space-y-[1.5vw]">
                <div class="flex justify-end items-center gap-[2vw] text-gray-300">
                  <div class="flex items-center gap-[0.6vw]">
                    <span class="text-[1.5vw] font-medium">
                      🤖 AI & Automation
                    </span>
                  </div>
                  <div class="flex items-center gap-[0.6vw]">
                    <span class="text-[1.5vw] font-medium">
                      ⚡️ Bitcoin & Web3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div class="absolute bottom-0 left-0 right-0 h-[0.4vw] bg-gradient-to-r from-orange-500 via-red-500 to-purple-500">
          </div>
        </div>
      </div>
    </>
  );
}
