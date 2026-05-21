"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import FilterBar from "@/app/components/catalogo/FilterBar";
import ProductGrid from "@/app/components/catalogo/ProductGrid";
import { products, creams } from "@/app/data/products";
import {
  GENDER_SECTIONS,
  matchesFilters,
  sortProducts,
  type GenderKey,
  type TimeKey,
  type SeasonKey,
} from "@/app/lib/filters";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CatalogoPage() {
  const [activeGender, setActiveGender] = useState<GenderKey>("all");
  const [activeTime, setActiveTime] = useState<TimeKey>("all");
  const [activeSeason, setActiveSeason] = useState<SeasonKey>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasActiveFilters = activeTime !== "all" || activeSeason !== "all";

  const clearFilters = () => {
    setActiveTime("all");
    setActiveSeason("all");
  };

  // Products filtered by "cuando usarlo" filters
  const baseFiltered = useMemo(
    () => products.filter((p) => matchesFilters(p, activeTime, activeSeason)),
    [activeTime, activeSeason]
  );

  // Flat sorted list for "Todos" mode
  const flatList = useMemo(() => sortProducts(baseFiltered), [baseFiltered]);

  // Sectioned list for a specific gender
  const sections = useMemo(() => {
    if (activeGender === "all") return [];
    return GENDER_SECTIONS
      .filter((g) => g.key === activeGender)
      .map((g) => ({
        ...g,
        products: sortProducts(
          baseFiltered.filter((p) => p.gender === g.key || p.gender === "Unisex")
        ),
      }))
      .filter((s) => s.products.length > 0);
  }, [activeGender, baseFiltered]);

  const totalCount =
    activeGender === "all"
      ? flatList.length
      : sections.reduce((acc, s) => acc + s.products.length, 0);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-24">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-10">

          {/* ── Breadcrumb ───────────────────────────────────────────────── */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-white/40 mb-12"
          >
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/70 font-medium">Colección</span>
          </motion.nav>

          {/* ── Header ───────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-medium">
              Troncoso Parfum
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold text-white mb-4">
              Nuestra Colección
            </h1>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto">
              {products.length} fragancias pensadas para cada momento y personalidad.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
          </motion.div>

          {/* ── Filter bar ───────────────────────────────────────────────── */}
          <FilterBar
            activeGender={activeGender}
            activeTime={activeTime}
            activeSeason={activeSeason}
            totalCount={totalCount}
            filtersOpen={filtersOpen}
            hasActiveFilters={hasActiveFilters}
            onGenderChange={setActiveGender}
            onTimeChange={setActiveTime}
            onSeasonChange={setActiveSeason}
            onToggleFilters={() => setFiltersOpen((v) => !v)}
            onClearFilters={clearFilters}
          />

          {/* ── Product grid + complementos ──────────────────────────────── */}
          <ProductGrid
            activeGender={activeGender}
            flatList={flatList}
            sections={sections}
            creams={creams}
            animationKey={`${activeGender}-${activeTime}-${activeSeason}`}
            onClearFilters={clearFilters}
          />

        </div>
      </main>

      <Footer />
    </>
  );
}
