"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/app/components/ui/AnimatedSection";

export default function FinalCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px gold-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-px gold-gradient" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <AnimatedSection>
          <p className="text-gold text-sm uppercase tracking-[0.2em] mb-4">
            Tu momento es ahora
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Descubrí tu fragancia hoy
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            Explorá nuestra colección exclusiva y encontrá el perfume que define tu personalidad.
          </p>
          <motion.a
            href="#coleccion"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-gold text-black font-semibold px-10 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-gold-light transition-colors duration-300"
          >
            Explorar catálogo
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}
