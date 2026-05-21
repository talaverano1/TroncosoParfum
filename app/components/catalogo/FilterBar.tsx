"use client";

import { motion, AnimatePresence } from "framer-motion";
import FilterChip from "./FilterChip";
import {
  GENDERS,
  TIME_FILTERS,
  SEASON_FILTERS,
  type GenderKey,
  type TimeKey,
  type SeasonKey,
} from "@/app/lib/filters";

interface FilterBarProps {
  activeGender: GenderKey;
  activeTime: TimeKey;
  activeSeason: SeasonKey;
  totalCount: number;
  filtersOpen: boolean;
  hasActiveFilters: boolean;
  onGenderChange: (key: GenderKey) => void;
  onTimeChange: (key: TimeKey) => void;
  onSeasonChange: (key: SeasonKey) => void;
  onToggleFilters: () => void;
  onClearFilters: () => void;
}

export default function FilterBar({
  activeGender,
  activeTime,
  activeSeason,
  totalCount,
  filtersOpen,
  hasActiveFilters,
  onGenderChange,
  onTimeChange,
  onSeasonChange,
  onToggleFilters,
  onClearFilters,
}: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-20 z-40 mb-10"
    >
      <div className="bg-[#111]/90 backdrop-blur-xl border border-white/8 rounded-2xl p-4 shadow-2xl space-y-4">

        {/* Gender tabs */}
        <div className="flex gap-1.5">
          {GENDERS.map(({ key, label, icon }) => (
            <button
              key={key}
              id={`gender-tab-${key}`}
              onClick={() => onGenderChange(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-250 ${
                activeGender === key
                  ? "bg-gold text-black shadow-md"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span className="text-xl sm:text-base leading-none">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Divider + toggle */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/8" />
          <button
            onClick={onToggleFilters}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-white/40 hover:text-white/70 transition-colors"
          >
            {hasActiveFilters && !filtersOpen && (
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            )}
            <span>{filtersOpen ? "Ocultar filtros" : "Filtrar"}</span>
            <motion.span
              animate={{ rotate: filtersOpen ? 0 : 180 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="inline-block leading-none"
            >
              ⌃
            </motion.span>
          </button>
        </div>

        {/* Collapsible filters */}
        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              key="filters"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-1">

                {/* Momento del día */}
                <div className="space-y-2">
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium px-1">
                    Momento del día
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TIME_FILTERS.map(({ key, label, icon }) => (
                      <FilterChip
                        key={key}
                        icon={icon}
                        label={label}
                        active={activeTime === key}
                        onClick={() => onTimeChange(key)}
                      />
                    ))}
                  </div>
                </div>

                {/* Estación */}
                <div className="space-y-2">
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium px-1">
                    Estación
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SEASON_FILTERS.map(({ key, label, icon }) => (
                      <FilterChip
                        key={key}
                        icon={icon}
                        label={label}
                        active={activeSeason === key}
                        onClick={() => onSeasonChange(key)}
                      />
                    ))}
                  </div>
                </div>

                {/* Resumen + limpiar */}
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center justify-between pt-1 border-t border-white/8">
                        <p className="text-white/40 text-xs">
                          Mostrando{" "}
                          <span className="text-gold font-bold">{totalCount}</span>{" "}
                          {totalCount === 1 ? "fragancia" : "fragancias"}
                        </p>
                        <button
                          onClick={onClearFilters}
                          className="text-xs text-white/40 hover:text-white underline transition-colors"
                        >
                          Limpiar filtros
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
