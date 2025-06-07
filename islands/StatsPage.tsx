import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface IStatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
}

function StatCard({ title, value, unit, icon }: IStatCardProps) {
  return (
    <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-6 shadow-xl hover:border-orange-200 dark:hover:border-orange-900/50 transition-all duration-300">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-orange-600 dark:text-orange-400 font-semibold flex items-center text-lg">
          <span class="text-2xl mr-3">{icon}</span>
          {title}
        </h3>
      </div>
      <div class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
        {unit && <span class="text-lg ml-2 text-gray-500 dark:text-gray-400 font-medium">{unit}</span>}
      </div>
    </div>
  );
}

interface ProgressBarProps {
  label: string;
  current: number;
  goal: number;
  unit?: string;
}

function ProgressBar({ label, current, goal, unit = "" }: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / goal) * 100));
  
  return (
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <span class="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          {label} ({goal}{unit})
        </span>
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold text-orange-600 dark:text-orange-400">
            {current}{unit}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-500">
            {percentage}%
          </span>
        </div>
      </div>
      <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div 
          style={`width: ${percentage}%`} 
          class="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 rounded-full transition-all duration-500 ease-out"
        ></div>
      </div>
    </div>
  );
}

export default function StatsPage() {
  const weight = useSignal(97.6);
  const pushUps = useSignal(50);
  const pullUps = useSignal(25);
  const hoursWorked = useSignal(18);
  const lastUpdated = useSignal(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuations
      weight.value = Math.round((weight.value + (Math.random() - 0.5) * 0.2) * 10) / 10;
      pushUps.value = Math.max(0, Math.round(pushUps.value + (Math.random() - 0.5) * 2));
      pullUps.value = Math.max(0, Math.round(pullUps.value + (Math.random() - 0.5)));
      hoursWorked.value = Math.round(hoursWorked.value + Math.random() * 0.1);
      lastUpdated.value = new Date();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div class="min-h-screen bg-gradient-to-b from-orange-50/30 via-transparent via-40% to-orange-50/30 dark:from-orange-950/10 dark:via-transparent dark:via-40% dark:to-orange-950/10">
      {/* Hero Section */}
      <div class="pt-32 pb-20 px-6 sm:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center space-y-8">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-900 via-gray-900 to-gray-600 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
              Personal Stats
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
              Real-time metrics of my fitness journey and work progress
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div class="px-6 sm:px-8 pb-20">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StatCard
              title="Weight"
              value={weight.value}
              unit="kg"
              icon="⚖️"
            />
            <StatCard
              title="Push-ups"
              value={pushUps.value}
              unit="reps"
              icon="💪"
            />
            <StatCard
              title="Pull-ups"
              value={pullUps.value}
              unit="reps"
              icon="🏋️‍♂️"
            />
            <StatCard
              title="Hours Worked"
              value={hoursWorked.value}
              unit="hrs"
              icon="⏰"
            />
          </div>

          {/* Goals Section */}
          <div class="bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-8 shadow-xl">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Weekly Goals
              </h2>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProgressBar
                label="Weight Goal"
                current={weight.value}
                goal={85}
                unit="kg"
              />
              <ProgressBar
                label="Push-ups Goal"
                current={pushUps.value}
                goal={250}
                unit=" reps"
              />
              <ProgressBar
                label="Pull-ups Goal"
                current={pullUps.value}
                goal={100}
                unit=" reps"
              />
              <ProgressBar
                label="Work Hours Goal"
                current={hoursWorked.value}
                goal={50}
                unit=" hrs"
              />
            </div>

            {/* Last Updated */}
            <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <p class="text-sm text-gray-500 dark:text-gray-500 text-center">
                Last updated: {lastUpdated.value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 