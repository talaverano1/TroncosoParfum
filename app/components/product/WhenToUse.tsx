"use client";

import { type Product } from "@/app/types/products";

const ALL_SEASONS = ["Invierno", "Primavera", "Verano", "Otoño"] as const;
const ALL_TIMES = ["Día", "Noche"] as const;

const climateConfig: Record<string, { icon: string; color: string }> = {
  Primavera: { icon: "🌿", color: "bg-green-500" },
  Verano: { icon: "☂️", color: "bg-pink-400" },
  Otoño: { icon: "🍂", color: "bg-amber-600" },
  Invierno: { icon: "❄️", color: "bg-blue-400" },
};

const timeOfDayConfig: Record<string, { icon: string; color: string }> = {
  Día: { icon: "☀️", color: "bg-yellow-400" },
  Noche: { icon: "🌙", color: "bg-indigo-400" },
};

interface WhenToUseProps {
  climate: Product["climate"];
  timeOfDay: Product["timeOfDay"];
  usageLevels?: Product["usageLevels"];
}

function UsageCell({
  label,
  icon,
  color,
  isActive,
  fillValue,
}: {
  label: string;
  icon: string;
  color: string;
  isActive: boolean;
  fillValue: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-3 w-full">
      <span
        className={`text-base sm:text-2xl md:text-3xl transition-all ${
          isActive ? "opacity-100" : "opacity-20 grayscale"
        }`}
      >
        {icon}
      </span>
      <span
        className={`text-[8px] sm:text-[10px] md:text-xs text-center font-medium tracking-tighter sm:tracking-wide uppercase w-full truncate ${
          isActive ? "text-white/80" : "text-white/30"
        }`}
      >
        {label}
      </span>
      <div className="w-[80%] sm:w-[90%] md:w-full h-1 md:h-2 bg-white/10 rounded-full overflow-hidden mx-auto mt-0.5">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${fillValue}%` }}
        />
      </div>
    </div>
  );
}

export default function WhenToUse({ climate, timeOfDay, usageLevels }: WhenToUseProps) {
  const hasUsage = usageLevels !== undefined;

  return (
    <div className="mt-8 md:mt-12 space-y-3 md:space-y-4">
      <h2 className="text-white/50 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
        <span>🕐</span> Cuándo Usarlo
      </h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-3 sm:p-6 md:p-8">
        <div className="grid grid-cols-6 gap-2 sm:gap-4 md:gap-6 justify-items-center w-full">
          {ALL_SEASONS.map((season) => {
            const defaultActive = climate.includes(season);
            const level = hasUsage ? (usageLevels![season] ?? 1) : (defaultActive ? 3 : 1);
            const isActive = level > 1;
            const fillValue = level === 3 ? 100 : level === 2 ? 50 : 0;
            const cfg = climateConfig[season];
            return (
              <UsageCell
                key={season}
                label={season}
                icon={cfg.icon}
                color={cfg.color}
                isActive={isActive}
                fillValue={fillValue}
              />
            );
          })}

          {ALL_TIMES.map((time) => {
            const defaultActive = timeOfDay.includes(time);
            const level = hasUsage ? (usageLevels![time] ?? 1) : (defaultActive ? 3 : 1);
            const isActive = level > 1;
            const fillValue = level === 3 ? 100 : level === 2 ? 50 : 0;
            const cfg = timeOfDayConfig[time];
            return (
              <UsageCell
                key={time}
                label={time}
                icon={cfg.icon}
                color={cfg.color}
                isActive={isActive}
                fillValue={fillValue}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
