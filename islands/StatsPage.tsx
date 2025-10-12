interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
}

function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div class="space-y-2 rounded-2xl border border-gray-200 bg-white/80 p-6 dark:border-gray-800 dark:bg-gray-900/40">
      <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </p>
      {hint && (
        <p class="text-xs text-gray-500 dark:text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
}

interface ProgressStatProps {
  label: string;
  current: number;
  goal: number;
  format?: (value: number) => string;
}

function ProgressStat({ label, current, goal, format = (v) => `${v}` }: ProgressStatProps) {
  const percentage = Math.min(100, Math.round((current / goal) * 100));

  return (
    <div class="space-y-2 rounded-2xl border border-gray-200 bg-white/80 p-6 dark:border-gray-800 dark:bg-gray-900/40">
      <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p class="text-sm text-gray-700 dark:text-gray-300">
        {format(current)}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-500">
        Target: {format(goal)}
      </p>
      <div class="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 transition-all"
          style={`width: ${percentage}%`}
        />
      </div>
    </div>
  );
}

export default function StatsPage() {
  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <section class="max-w-5xl mx-auto flex min-h-screen flex-col justify-center px-6 py-24 md:py-32">
        <div class="space-y-8">
          <div class="flex items-center gap-4 md:gap-5">
            <img
              src="/pfptbs.png"
              alt="Hrvoje Pavlinovic"
              class="h-12 w-12 rounded-full object-cover md:h-[52px] md:w-[52px]"
              loading="eager"
            />
            <div>
              <h1 class="text-[32px] font-semibold leading-tight text-gray-900 dark:text-gray-100 md:text-[44px]">
                Training log
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-400 md:text-base">
                Tracking what matters: weight, reps, and energy output.
              </p>
            </div>
          </div>

          <p class="max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-[17px] md:leading-loose">
            October focus: reclaim conditioning while keeping professional pace. Weight trends, push-up volumes, and active calories are the primary signals.
          </p>
        </div>
      </section>

      <section class="border-t border-gray-100 dark:border-gray-800">
        <div class="max-w-5xl mx-auto px-6 py-12 pb-24 md:py-16 md:pb-32 space-y-10">
          <div class="grid gap-6 md:grid-cols-3">
            <StatCard label="Current weight" value="96.1 kg" hint="Measured October 2025" />
            <StatCard label="Primary goal" value="50 push-ups unbroken" hint="No timer, strict form" />
            <StatCard label="Secondary focus" value="Consistency > intensity" hint="Daily movement, sustainable burn" />
          </div>

          <div class="space-y-4">
            <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              October snapshot
            </h2>
            <div class="grid gap-6 md:grid-cols-3">
              <ProgressStat label="Push-ups" current={480} goal={1500} format={(v) => `${v} reps`} />
              <ProgressStat label="Pull-ups" current={140} goal={500} format={(v) => `${v} reps`} />
              <ProgressStat label="Active kcal" current={4300} goal={10000} format={(v) => `${v.toLocaleString()} kcal`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
