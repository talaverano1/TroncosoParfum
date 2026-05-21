"use client";

import { useParams } from "next/navigation";
import { creams } from "@/app/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { getDiscountInfo } from "@/app/lib/pricing";
import { buildCreamWhatsAppUrl } from "@/app/lib/whatsapp";
import { fadeUp, staggerContainer } from "@/app/lib/animations";
import WhatsAppButton from "@/app/components/product/WhatsAppButton";

export default function CreamDetailPage() {
  const params = useParams<{ id: string }>();
  const cream = creams.find((c) => c.id === Number(params.id));

  // useState must be called before any conditional return (Rules of Hooks)
  const [activeImg, setActiveImg] = useState(0);

  if (!cream) return notFound();

  const { isOnSale, displayPrice: currentPrice, savingsPct } = getDiscountInfo(
    cream.price,
    cream.discountPrice
  );

  const whatsappUrl = buildCreamWhatsAppUrl(cream.name, cream.quantity, currentPrice);
  const images = cream.images ?? [cream.image];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-10">

        {/* ─── Breadcrumb ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto px-6 mb-10"
        >
          <nav className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/catalogo" className="text-white/60 hover:text-gold transition-colors">Colección</Link>
            <span>/</span>
            <span className="text-gold truncate">{cream.name}</span>
          </nav>
        </motion.div>

        {/* ─── Main Content ────────────────────────────────────────────────── */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-6 md:gap-y-4 items-start">

            {/* ── Left: Image ─────────────────────────────────────────────── */}
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="md:sticky md:top-24 z-10 flex flex-col gap-3"
              >
                {/* Main image frame */}
                <div className="relative group">
                  {/* Glow halo */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gold/10 blur-2xl md:blur-3xl scale-90 opacity-60 pointer-events-none" />

                  <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111]">
                    <div className="relative w-full aspect-square md:aspect-[5/6]">
                      <Image
                        src={images[activeImg]}
                        alt={cream.name}
                        fill
                        className="object-contain p-6 md:p-8"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Thumbnails (desktop only, only when multiple images) */}
                {images.length > 1 && (
                  <div className="hidden md:flex gap-2">
                    {images.map((src: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`relative flex-1 rounded-xl overflow-hidden border-2 transition-all duration-300 ${i === activeImg
                          ? "border-gold shadow-md shadow-gold/20"
                          : "border-white/10 hover:border-white/30"
                          }`}
                        style={{ aspectRatio: "1" }}
                        aria-label={`Seleccionar imagen ${i + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${cream.name} thumbnail ${i + 1}`}
                          fill
                          className="object-contain p-2"
                          sizes="10vw"
                        />
                        {i !== activeImg && (
                          <div className="absolute inset-0 bg-black/40" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* ── Right: Product Info ──────────────────────────────────────── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 md:gap-8 pb-4"
            >

              {/* Name */}
              <motion.div variants={fadeUp}>
                <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {cream.name}
                </h1>
              </motion.div>

              {/* Price */}
              <motion.div variants={fadeUp}>
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-gold font-bold text-3xl md:text-4xl tracking-tight">
                    ARS {currentPrice.toLocaleString("es-AR")}
                  </span>
                  {isOnSale && (
                    <span className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-bold px-3 py-1.5 rounded-full tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      Ahorrás {savingsPct}%
                    </span>
                  )}
                </div>
                {isOnSale && (
                  <p className="text-white/35 text-base mt-1 line-through">
                    ARS {cream.price.toLocaleString("es-AR")}
                  </p>
                )}
                <p className="text-white/40 text-sm md:text-base mt-2">
                  Precio por unidad · {cream.quantity} · Stock disponible
                </p>
              </motion.div>

              {/* WhatsApp CTA */}
              <WhatsAppButton url={whatsappUrl} id="btn-whatsapp-cream" />

              {/* Divider */}
              <motion.hr variants={fadeUp} className="border-white/10" />

              {/* Descripción */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <h2 className="text-white/50 text-sm md:text-base uppercase tracking-[0.2em] font-semibold">
                  Descripción
                </h2>
                <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                  {cream.description}
                </p>
              </motion.div>

              {/* Propiedades */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <h2 className="text-white/50 text-sm md:text-base uppercase tracking-[0.2em] font-semibold">
                  Propiedades
                </h2>
                <ul className="flex flex-col gap-3">
                  {cream.fullDescription.split("\n").filter(Boolean).map((line: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                        {line}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
