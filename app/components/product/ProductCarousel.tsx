"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface ProductCarouselProps {
  images: string[];
  productName: string;
  isBestseller: boolean;
}

export default function ProductCarousel({
  images,
  productName,
  isBestseller,
}: ProductCarouselProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxScrollRef = useRef<HTMLDivElement>(null);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const scrollLightboxTo = useCallback((idx: number) => {
    if (!lightboxScrollRef.current) return;
    const container = lightboxScrollRef.current;
    const child = container.children[idx + 1] as HTMLElement; // +1 for left spacer
    if (child) {
      container.scrollTo({
        left: child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (lightboxOpen) {
        scrollLightboxTo(idx);
      } else {
        setDirection(idx > activeImg ? 1 : -1);
        setActiveImg(idx);
      }
    },
    [activeImg, lightboxOpen, scrollLightboxTo]
  );

  const prev = useCallback(
    () => goTo((activeImg - 1 + images.length) % images.length),
    [activeImg, images.length, goTo]
  );
  const next = useCallback(
    () => goTo((activeImg + 1) % images.length),
    [activeImg, images.length, goTo]
  );

  // ── Scroll lightbox to active image on open ───────────────────────────────
  useEffect(() => {
    if (!lightboxOpen) return;
    const raf = requestAnimationFrame(() => {
      if (!lightboxScrollRef.current) return;
      const container = lightboxScrollRef.current;
      const child = container.children[activeImg + 1] as HTMLElement;
      if (child) {
        container.scrollTo({
          left: child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2,
          behavior: "instant" as ScrollBehavior,
        });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [lightboxOpen]); // intentionally omit activeImg — only on open

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, next, prev]);

  // ── Slide variants ────────────────────────────────────────────────────────
  const slideVariants: Variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
    exit: (d: number) => ({
      x: d > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="md:sticky md:top-24 z-10 flex flex-col gap-2 md:gap-3"
      >
        {/* Main image frame */}
        <div className="relative group">
          {/* Glow halo */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gold/10 blur-2xl md:blur-3xl scale-90 opacity-60 pointer-events-none" />

          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {isBestseller && (
              <span className="absolute top-2 left-2 md:top-5 md:left-5 z-20 gold-gradient text-black text-[9px] md:text-xs font-bold px-2 py-0.5 md:px-4 md:py-1.5 rounded-full tracking-wider md:tracking-widest uppercase shadow-md md:shadow-lg">
                ⭐ Más vendido
              </span>
            )}

            {/* Slide container */}
            <div className="relative w-full bg-black-light overflow-hidden aspect-square md:aspect-[5/6]">
              {/* Drag wrapper */}
              <motion.div
                className="absolute inset-0 z-10 cursor-zoom-in"
                drag={images.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onClick={() => setLightboxOpen(true)}
                onDragEnd={(_e, info) => {
                  const threshold = 50;
                  if (info.offset.x < -threshold) next();
                  else if (info.offset.x > threshold) prev();
                }}
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeImg}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 pointer-events-none"
                  >
                    <Image
                      src={images[activeImg]}
                      alt={`${productName} — imagen ${activeImg + 1}`}
                      fill
                      priority={activeImg === 0}
                      className="object-contain"
                      sizes="(max-width: 1024px) 40vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-9 md:h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-gold hover:text-black hover:border-gold transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Imagen anterior"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 md:w-4 md:h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-9 md:h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-gold hover:text-black hover:border-gold transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Imagen siguiente"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 md:w-4 md:h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === activeImg
                            ? "bg-gold w-4 h-1.5 md:w-5 md:h-2"
                            : "bg-white/40 w-1.5 h-1.5 md:w-2 md:h-2 hover:bg-white/70"
                        }`}
                        aria-label={`Ver imagen ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnails — desktop only */}
        {images.length > 1 && (
          <div className="hidden md:flex gap-1.5 md:gap-2">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative flex-1 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  i === activeImg
                    ? "border-gold shadow-md shadow-gold/20"
                    : "border-white/10 hover:border-white/30"
                }`}
                style={{ aspectRatio: "1" }}
                aria-label={`Seleccionar imagen ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`${productName} thumbnail ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="10vw"
                />
                {i !== activeImg && <div className="absolute inset-0 bg-black/40" />}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Lightbox ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative w-full h-full flex flex-col justify-center overflow-hidden">
              <div
                ref={lightboxScrollRef}
                className="flex items-center w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const scrollLeft = container.scrollLeft;
                  const itemWidth =
                    (container.children[1] as HTMLElement).clientWidth + 24;
                  const newIndex = Math.round(scrollLeft / itemWidth);
                  if (
                    newIndex !== activeImg &&
                    newIndex >= 0 &&
                    newIndex < images.length
                  ) {
                    setActiveImg(newIndex);
                  }
                }}
              >
                {/* Left spacer */}
                <div
                  style={{ flex: "0 0 calc(50vw - min(42.5vw, 512px, 42.5vh))" }}
                  className="shrink-0"
                />

                {images.map((src, i) => {
                  const isActive = i === activeImg;
                  return (
                    <div
                      key={i}
                      className="snap-center relative shrink-0 overflow-hidden bg-black rounded-2xl shadow-2xl"
                      style={{
                        width: "min(85vw, 1024px, 85vh)",
                        height: "min(85vw, 1024px, 85vh)",
                        marginRight: i === images.length - 1 ? 0 : "24px",
                        opacity: isActive ? 1 : 0.42,
                        transform: isActive ? "scale(1)" : "scale(0.95)",
                        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: isActive ? "default" : "pointer",
                        boxShadow: isActive
                          ? "0 0 60px rgba(255,255,255,0.05), 0 24px 60px rgba(0,0,0,0.7)"
                          : "none",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isActive) goTo(i);
                      }}
                    >
                      <Image
                        src={src}
                        alt={`${productName} — imagen ${i + 1}`}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 1024px) 85vw, 1024px"
                        priority={i === activeImg}
                      />
                    </div>
                  );
                })}

                {/* Right spacer */}
                <div
                  style={{ flex: "0 0 calc(50vw - min(42.5vw, 512px, 42.5vh))" }}
                  className="shrink-0"
                />
              </div>
            </div>

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-200"
                  aria-label="Imagen anterior"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-200"
                  aria-label="Imagen siguiente"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-white/70 text-xs font-medium tracking-widest">
                {activeImg + 1} / {images.length}
              </div>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); goTo(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeImg
                        ? "bg-gold w-5 h-2"
                        : "bg-white/40 w-2 h-2 hover:bg-white/70"
                    }`}
                    aria-label={`Ver imagen ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
