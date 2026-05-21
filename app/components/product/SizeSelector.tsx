"use client";

import { type SizeKey } from "@/app/types/products";
import { getDiscountInfo } from "@/app/lib/pricing";

const SIZE_LABELS: SizeKey[] = ["5 ml", "50 ml"];

interface SizeSelectorProps {
  prices: Record<SizeKey, number>;
  discountPrices?: Partial<Record<SizeKey, number>>;
  selectedSize: SizeKey;
  onSelect: (size: SizeKey) => void;
}

export default function SizeSelector({
  prices,
  discountPrices,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <span className="text-white/50 text-xs uppercase tracking-[0.2em] font-semibold">
        Tamaño del envase
      </span>
      <div className="flex gap-2">
        {SIZE_LABELS.map((size) => {
          const isSelected = selectedSize === size;
          const { isOnSale, displayPrice } = getDiscountInfo(
            prices[size],
            discountPrices?.[size]
          );
          return (
            <button
              key={size}
              id={`size-${size.replace(" ", "")}`}
              onClick={() => onSelect(size)}
              className={`relative flex flex-col items-center justify-center gap-0.5 px-4 py-2.5 rounded-xl border-2 font-bold text-sm tracking-wide transition-all duration-250 select-none ${
                isSelected
                  ? "gold-gradient text-black border-transparent shadow-lg shadow-gold/30 scale-105"
                  : "bg-transparent text-gold border-gold/40 hover:border-gold/80 hover:bg-gold/5"
              }`}
              aria-pressed={isSelected}
            >
              <span className="text-base leading-none">{size}</span>
              {isOnSale ? (
                <>
                  <span
                    className={`text-[10px] font-semibold tracking-widest leading-none ${
                      isSelected ? "text-black/70" : "text-gold/80"
                    }`}
                  >
                    ARS {displayPrice.toLocaleString("es-AR")}
                  </span>
                  <span
                    className={`text-[9px] font-semibold leading-none line-through ${
                      isSelected ? "text-black/40" : "text-white/30"
                    }`}
                  >
                    {prices[size].toLocaleString("es-AR")}
                  </span>
                </>
              ) : (
                <span
                  className={`text-[10px] font-semibold tracking-widest leading-none ${
                    isSelected ? "text-black/70" : "text-white/40"
                  }`}
                >
                  ARS {prices[size].toLocaleString("es-AR")}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
