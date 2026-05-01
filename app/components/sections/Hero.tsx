"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-[80vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Capa 1: fondo negro con partículas doradas */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-black-gold.png')" }}
      />

      {/* Overlay oscuro sutil para profundidad */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Vignette perimetral */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gold text-sm md:text-base uppercase tracking-[0.35em] mb-6 font-medium"
        >
          Fragancias premium
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-[family-name:var(--font-heading)] text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Descubrí tu{" "}
          <span className="text-gold-gradient">esencia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          Fragancias premium que definen tu estilo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            id="hero-btn-catalog"
            href="/catalogo"
            className="inline-block gold-gradient text-black font-semibold px-12 py-4 rounded-full text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(201,169,110,0.3)] hover:opacity-90 transition-all duration-300"
          >
            Ver catálogo
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
