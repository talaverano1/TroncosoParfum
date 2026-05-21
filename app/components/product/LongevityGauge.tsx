"use client";

import { motion } from "framer-motion";
import { type Longevity } from "@/app/types/products";

interface LongevityGaugeProps {
  longevity: Longevity;
}

export default function LongevityGauge({ longevity }: LongevityGaugeProps) {
  const circumference = 2 * Math.PI * 44;
  const dashOffset = circumference * (1 - Math.min(longevity.hours, 16) / 16);

  return (
    <div className="mt-8 md:mt-12">
      <h2 className="text-white/50 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-semibold flex items-center gap-2 mb-4 md:mb-6">
        <span>⏱️</span> Duración en piel
      </h2>

      <div className="relative bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden p-5 sm:p-8 md:p-10">
        {/* Subtle golden glows */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex justify-center">
          <div className="flex flex-col items-center justify-center shrink-0">
            {/* Circular gauge */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Track ring */}
                <circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="8"
                />
                {/* Filled arc */}
                <motion.circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  stroke="url(#goldGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${dashOffset}`}
                  initial={{ strokeDashoffset: `${circumference}` }}
                  animate={{ strokeDashoffset: `${dashOffset}` }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="#F5D78E" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-4xl sm:text-5xl font-bold text-gold leading-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {longevity.hours}
                </motion.span>
                <span className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mt-0.5">
                  horas
                </span>
              </div>
            </div>

            {/* Label badge */}
            <span className="mt-3 inline-block gold-gradient text-black text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow">
              {longevity.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
