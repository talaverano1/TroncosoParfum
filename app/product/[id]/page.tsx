"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import { products, type SizeKey } from "@/app/data/products";
import { getDiscountInfo } from "@/app/lib/pricing";
import { fadeUp, staggerContainer } from "@/app/lib/animations";
import { buildProductWhatsAppUrl } from "@/app/lib/whatsapp";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import ProductCarousel from "@/app/components/product/ProductCarousel";
import SizeSelector from "@/app/components/product/SizeSelector";
import PriceDisplay from "@/app/components/product/PriceDisplay";
import ScentNotes from "@/app/components/product/ScentNotes";
import MainAccords from "@/app/components/product/MainAccords";
import WhenToUse from "@/app/components/product/WhenToUse";
import LongevityGauge from "@/app/components/product/LongevityGauge";
import WhatsAppButton from "@/app/components/product/WhatsAppButton";


// ─── Gender badge color ───────────────────────────────────────────────────────
const genderColor: Record<string, string> = {
  Masculino: "bg-blue-950/60 text-blue-300 border border-blue-700/40",
  Femenino: "bg-rose-950/60 text-rose-300 border border-rose-700/40",
  Unisex: "bg-amber-950/60 text-amber-300 border border-amber-700/40",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(params.id));

  // useState must be called before any conditional return (Rules of Hooks)
  const [selectedSize, setSelectedSize] = useState<SizeKey>("50 ml");

  if (!product) return notFound();

  const { isOnSale, displayPrice: currentPrice, savingsPct } = getDiscountInfo(
    product.prices[selectedSize],
    product.discountPrices?.[selectedSize]
  );
  const originalPrice = product.prices[selectedSize];
  const whatsappUrl = buildProductWhatsAppUrl(product.name, selectedSize, currentPrice);
  const images = product.images ?? [product.image];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-10 md:pb-20">

        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto px-6 mb-10"
        >
          <nav className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/catalogo" className="text-white/60 hover:text-gold transition-colors">
              Colección
            </Link>
            <span>/</span>
            <span className="text-gold truncate">{product.name}</span>
          </nav>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6">

          {/* ── Two-column grid ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-6 md:gap-y-4 items-start">

            {/* Left: carousel */}
            <div className="h-full w-full relative">
              <ProductCarousel
                images={images}
                productName={product.name}
                isBestseller={product.isBestseller}
              />
            </div>

            {/* Right: product info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 md:gap-8 pb-4"
            >
              {/* Gender tag + Name */}
              <motion.div variants={fadeUp}>
                <span
                  className={`inline-block text-xs md:text-sm font-semibold px-3 py-1 md:py-1.5 rounded-full tracking-widest uppercase mb-3 ${genderColor[product.gender]}`}
                >
                  {product.gender}
                </span>
                <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
                  {product.name}
                </h1>
              </motion.div>

              {/* Price + size selector */}
              <motion.div variants={fadeUp}>
                <PriceDisplay
                  currentPrice={currentPrice}
                  originalPrice={originalPrice}
                  isOnSale={isOnSale}
                  savingsPct={savingsPct}
                />
                <SizeSelector
                  prices={product.prices}
                  discountPrices={product.discountPrices}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />
              </motion.div>

              {/* WhatsApp CTA */}
              <WhatsAppButton url={whatsappUrl} id="btn-whatsapp" />

              <motion.hr variants={fadeUp} className="border-white/10" />

              {/* Full description */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3 md:gap-4">
                {product.fullDescription.split("\n").map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* Scent notes */}
              <motion.div variants={fadeUp}>
                <ScentNotes notes={product.scentNotes} />
              </motion.div>

            </motion.div>
          </div>

          {/* ── Full-width sections below the grid ──────────────────────────── */}
          <MainAccords accords={product.mainAccords} />
          <WhenToUse
            usageLevels={product.usageLevels}
          />
          <LongevityGauge longevity={product.longevity} />
        </div>
      </main>

      <Footer />
    </>
  );
}
