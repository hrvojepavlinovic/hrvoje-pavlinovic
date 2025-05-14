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
    <div class="dark:bg-white/5 bg-black/5 p-6 rounded-lg">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-btc-orange font-medium flex items-center">
          <span class="mr-2">{icon}</span>
          {title}
        </h3>
      </div>
      <div class="text-3xl font-medium mb-1">
        {value}
        {unit && <span class="text-sm ml-1 dark:text-white/60 text-black/60">{unit}</span>}
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
    <div class="dark:bg-black bg-white text-black dark:text-white w-full pt-32 pb-16">
      <div class="max-w-screen-xl mx-auto px-4">
        <div class="mb-8">
          <h1 class="text-3xl font-semibold tracking-tight mb-2">Personal Stats</h1>
          <p class="text-sm dark:text-white/60 text-black/60">
            Last updated: {lastUpdated.value.toLocaleTimeString()}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div class="mt-8 dark:bg-white/5 bg-black/5 p-6 rounded-lg">
          <h2 class="text-xl font-medium tracking-tight mb-4 flex items-center">
            <span class="w-1.5 h-1.5 bg-btc-orange rounded-full mr-2"></span>
            Weekly Goals
          </h2>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm">Weight Goal (85kg)</span>
                <span class="text-sm text-btc-orange">10%</span>
              </div>
              <div class="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                  style={`width: ${Math.min(100, (weight.value / 85) * 100)}%`} 
                  class="h-full bg-btc-orange rounded-full"
                ></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm">Push-ups Goal (250)</span>
                <span class="text-sm text-btc-orange">{Math.round((pushUps.value / 250) * 100)}%</span>
              </div>
              <div class="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                  style={`width: ${Math.min(100, (pushUps.value / 250) * 100)}%`} 
                  class="h-full bg-btc-orange rounded-full"
                ></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm">Pull-ups Goal (100)</span>
                <span class="text-sm text-btc-orange">{Math.round((pullUps.value / 100) * 100)}%</span>
              </div>
              <div class="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                  style={`width: ${Math.min(100, (pullUps.value / 100) * 100)}%`} 
                  class="h-full bg-btc-orange rounded-full"
                ></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm">Work Hours Goal (50)</span>
                <span class="text-sm text-btc-orange">{Math.round((hoursWorked.value / 50) * 100)}%</span>
              </div>
              <div class="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                  style={`width: ${Math.min(100, (hoursWorked.value / 50) * 100)}%`} 
                  class="h-full bg-btc-orange rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 