"use client";

export type IntensityKey = "edp" | "elixir";

export interface IntensityOption {
    key: IntensityKey;
    type: string;
    subtitle: string;
    ml: number;
    price: number;
    description: string;
}

export const INTENSITY_OPTIONS: IntensityOption[] = [
    {
        key: "edp",
        type: "EAU DE PARFUM",
        subtitle: "Equilibrio Perfecto",
        ml: 50,
        price: 35000,
        description: "Ideal para uso diario",
    },
    {
        key: "elixir",
        type: "ELIXIR",
        subtitle: "Máxima Intensidad",
        ml: 50,
        price: 45000,
        description: "Mayor concentración y duración",
    },
];

interface IntensitySelectorProps {
    selected: IntensityKey;
    onSelect: (key: IntensityKey) => void;
}

export default function IntensitySelector({
    selected,
    onSelect,
}: IntensitySelectorProps) {
    return (
        <div className="flex flex-col gap-3">
            <span className="text-white/50 text-xs uppercase tracking-[0.2em] font-semibold">
                Intensidad
            </span>

            <div className="grid grid-cols-2 gap-3">
                {INTENSITY_OPTIONS.map((opt) => {
                    const isSelected = selected === opt.key;
                    return (
                        <button
                            key={opt.key}
                            id={`intensity-${opt.key}`}
                            onClick={() => onSelect(opt.key)}
                            aria-pressed={isSelected}
                            className={`
                relative flex flex-col items-center text-center gap-2
                px-4 py-5 rounded-2xl border-2 transition-all duration-300 select-none
                ${isSelected
                                    ? "gold-gradient text-black border-transparent shadow-xl shadow-gold/30 scale-[1.03]"
                                    : "bg-black/40 text-gold border-gold/30 hover:border-gold/60 hover:bg-gold/5"
                                }
              `}
                        >
                            {/* Type + subtitle */}
                            <div className="flex flex-col items-center gap-0.5">
                                <span
                                    className={`font-bold text-sm md:text-base leading-tight tracking-wider ${isSelected ? "text-black" : "text-gold"
                                        }`}
                                >
                                    {opt.type}
                                </span>
                                <span
                                    className={`text-[10px] uppercase tracking-widest font-semibold ${isSelected ? "text-black/60" : "text-gold/60"
                                        }`}
                                >
                                    {opt.subtitle}
                                </span>
                            </div>

                            {/* Divider */}
                            <div
                                className={`w-full h-px ${isSelected ? "bg-black/20" : "bg-gold/20"
                                    }`}
                            />

                            {/* ml */}
                            <span
                                className={`text-xs font-medium ${isSelected ? "text-black/70" : "text-white/50"
                                    }`}
                            >
                                {opt.ml} ml
                            </span>

                            {/* Price */}
                            <span
                                className={`text-2xl md:text-3xl font-bold leading-none ${isSelected ? "text-black" : "text-gold"
                                    }`}
                            >
                                ARS {opt.price.toLocaleString("es-AR")}
                            </span>

                            {/* Description */}
                            <span
                                className={`text-[11px] leading-snug ${isSelected ? "text-black/60" : "text-white/40"
                                    }`}
                            >
                                {opt.description}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
