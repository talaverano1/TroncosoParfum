"use client";

import { AnimatePresence, motion } from "framer-motion";

interface PriceDisplayProps {
  currentPrice: number;
  originalPrice: number;
  isOnSale: boolean;
  savingsPct: number;
  size?: number;
}

export default function PriceDisplay({
  currentPrice,
  originalPrice,
  isOnSale,
  savingsPct,
  size,
}: PriceDisplayProps) {
  return (
    <div>
      {/* Current price + optional savings badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <p className="text-gold text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
          ARS {currentPrice.toLocaleString("es-AR")}
        </p>
        {isOnSale && (
          <span className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full tracking-wide">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 17a7 7 0 100-14 7 7 0 000 14zm.75-9.75a.75.75 0 00-1.5 0v3.19L7.47 8.66a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l2.5-2.5a.75.75 0 10-1.06-1.06l-1.66 1.78V7.25z"
                clipRule="evenodd"
              />
            </svg>
            Ahorrás {savingsPct}%
          </span>
        )}
      </div>

      {/* Strikethrough original price */}
      {isOnSale && (
        <p className="text-white/35 text-sm sm:text-base line-through mt-1">
          ARS {originalPrice.toLocaleString("es-AR")}
        </p>
      )}

      {size === 50 && (
        <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
          Fragancia + crema 60g
        </p>
      )}

      <p className="text-white/40 text-sm md:text-base mt-2">
        Precio por unidad · Stock disponible
      </p>
    </div>
  );
}
