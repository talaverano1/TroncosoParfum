"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type MainAccord } from "@/app/types/products";
import { accordItemVariants, barVariants } from "@/app/lib/animations";

interface MainAccordsProps {
  accords: MainAccord[];
}

export default function MainAccords({ accords }: MainAccordsProps) {
  const [showBars, setShowBars] = useState(false);

  return (
    <div className="mt-6 md:mt-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-white/50 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-semibold">
          Acordes Principales
        </h2>
        <button
          onClick={() => setShowBars(!showBars)}
          className="text-gold hover:text-white underline transition-colors text-[10px] sm:text-xs md:text-sm"
        >
          {showBars ? "Ocultar" : "Detalles"}
        </button>
      </div>

      {/* Collapsed: pill tags */}
      <AnimatePresence mode="popLayout">
        {!showBars && (
          <motion.div
            key="pills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="flex flex-wrap gap-1.5 md:gap-3"
          >
            {accords.map((accord) => (
              <span
                key={accord.name}
                className={`inline-block rounded-md text-white/90 uppercase tracking-widest font-bold shadow-sm ${accord.color} px-2 py-1 md:px-3 md:py-1.5 text-[9px] sm:text-xs md:text-sm`}
              >
                {accord.name}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded: stacked rows with animated bars */}
      <AnimatePresence mode="popLayout">
        {showBars && (
          <motion.div
            key="bars"
            initial="collapsed"
            animate="expanded"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="flex flex-col gap-3 md:gap-5 w-full"
          >
            {accords.map((accord, idx) => (
              <motion.div
                key={accord.name}
                custom={idx}
                variants={accordItemVariants}
                className="flex flex-col items-start w-full"
              >
                {/* Pill label */}
                <span
                  className={`inline-block rounded-md text-white/90 uppercase tracking-widest font-bold shadow-sm ${accord.color} px-2 py-1 md:px-3 md:py-1.5 text-[9px] sm:text-xs md:text-sm mb-1.5 md:mb-2`}
                >
                  {accord.name}
                </span>

                {/* Bar track */}
                <div className="w-full h-4 sm:h-6 md:h-8 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
                  <motion.div
                    custom={idx}
                    variants={barVariants}
                    style={{ originX: 0, width: `${accord.percentage}%` }}
                    className={`h-full rounded-full ${accord.color} flex items-center justify-end pr-2 md:pr-4`}
                  >
                    <span className="text-white/90 text-[10px] sm:text-xs md:text-sm font-bold leading-none tracking-widest drop-shadow-md">
                      {accord.percentage}%
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
