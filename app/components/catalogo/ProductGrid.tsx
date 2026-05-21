"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeUpLight, staggerGrid } from "@/app/lib/animations";
import { GENDER_SECTIONS, type GenderKey } from "@/app/lib/filters";
import ProductCard from "@/app/components/ui/ProductCard";
import CreamCard from "@/app/components/ui/CreamCard";
import { type Product, type Cream } from "@/app/types/products";

interface ProductGridProps {
  activeGender: GenderKey;
  flatList: Product[];
  sections: Array<{
    key: Exclude<GenderKey, "all">;
    label: string;
    accent: string;
    dot: string;
    products: Product[];
  }>;
  creams: Cream[];
  animationKey: string;
  onClearFilters: () => void;
}

const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <div className="text-center py-28 flex flex-col items-center gap-4">
    <span className="text-5xl opacity-30">✦</span>
    <p className="text-white/30 text-lg font-medium">
      No hay fragancias para esta combinación de filtros.
    </p>
    <button
      onClick={onClear}
      className="mt-2 text-gold hover:text-white underline text-sm transition-colors"
    >
      Limpiar filtros
    </button>
  </div>
);

export default function ProductGrid({
  activeGender,
  flatList,
  sections,
  creams,
  animationKey,
  onClearFilters,
}: ProductGridProps) {
  return (
    <>
      {/* ── Animated product area ───────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Flat grid: "Todos" — no gender headers */}
          {activeGender === "all" && (
            flatList.length > 0 ? (
              <motion.div
                variants={staggerGrid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
              >
                {flatList.map((product, i) => (
                  <motion.div key={product.id} variants={fadeUpLight} className="h-full">
                    <ProductCard product={product} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState onClear={onClearFilters} />
            )
          )}

          {/* Sectioned grid: specific gender selected */}
          {activeGender !== "all" && (
            sections.length > 0 ? (
              <div className="space-y-16">
                {sections.map((section) => (
                  <section key={section.key} id={`section-${section.key.toLowerCase()}`}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-2 h-2 rounded-full ${section.dot}`} />
                      <h2
                        className={`font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold ${section.accent}`}
                      >
                        {section.label}
                      </h2>
                      <div className="h-px flex-1 bg-white/8" />
                      <span className="text-white/25 text-xs font-medium">
                        {section.products.length}{" "}
                        {section.products.length === 1 ? "fragancia" : "fragancias"}
                      </span>
                    </div>
                    <motion.div
                      variants={staggerGrid}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
                    >
                      {section.products.map((product, i) => (
                        <motion.div key={product.id} variants={fadeUpLight} className="h-full">
                          <ProductCard product={product} index={i} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </section>
                ))}
              </div>
            ) : (
              <EmptyState onClear={onClearFilters} />
            )
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Complementos Section ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mt-20 pt-12 border-t border-white/8"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold text-amber-300">
            Complementos
          </h2>
          <div className="h-px flex-1 bg-white/8" />
          <span className="text-white/25 text-xs font-medium">
            {creams.length} {creams.length === 1 ? "producto" : "productos"}
          </span>
        </div>
        <p className="text-white/35 text-sm mb-8 max-w-md">
          Productos de cuidado personal para complementar tu fragancia.
        </p>

        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {creams.map((cream, i) => (
            <motion.div key={cream.id} variants={fadeUpLight}>
              <CreamCard cream={cream} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
