"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/app/components/ui/AnimatedSection";

const reviews = [
  {
    name: "María González",
    rating: 5,
    comment:
      "Increíble calidad. El perfume dura todo el día y el aroma es exactamente como se describe. ¡Totalmente recomendado!",
  },
  {
    name: "Carlos Rodríguez",
    rating: 5,
    comment:
      "Excelente atención al cliente y envío rapidísimo. El Noir Élégance es mi favorito, sofisticado y elegante.",
  },
  {
    name: "Ana Martínez",
    rating: 5,
    comment:
      "Buscaba un regalo especial y encontré la fragancia perfecta. El empaque es hermoso y la calidad se nota desde el primer momento.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          fill="#C9A96E"
          viewBox="0 0 24 24"
        >
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <p className="text-gold text-sm uppercase tracking-[0.2em] mb-3">
            Lo que dicen nuestros clientes
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white">
            Reseñas
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <AnimatedSection key={review.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-black-light border border-white/10 rounded-2xl p-8 hover:border-gold/30 transition-colors duration-300"
              >
                <Stars count={review.rating} />
                <p className="text-white/70 text-sm leading-relaxed mt-4 mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-gold font-semibold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium">
                    {review.name}
                  </span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
