"use client";

import { motion, Variants } from "framer-motion";
import { Cinzel, Inter } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function NosotrosClient() {
  return (
    <div className="max-w-4xl mx-auto px-6 text-white/90">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-16"
      >
        {/* Intro */}
        <motion.section variants={fadeIn} className="text-center space-y-6 mt-8 md:mt-16">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl text-[#C9A96E] mb-6 tracking-wide">
            Nuestra Historia
          </h1>
          <p className={`${inter.className} text-lg md:text-xl leading-relaxed text-white/80 max-w-2xl mx-auto font-light`}>
            <span className={`${cinzel.className} text-[#C9A96E] font-medium`}>Troncoso Perfumes</span> nace en Mendoza combinando diseño olfativo, producción artesanal y pasión por las fragancias de alta concentración.
          </p>
        </motion.section>

        {/* Development & Inspiration */}
        <motion.section variants={fadeIn} className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className={`${inter.className} text-white/70 leading-relaxed font-light text-justify text-lg`}>
              Cada perfume es desarrollado cuidadosamente en pequeños lotes, buscando equilibrio entre duración, presencia y sofisticación. Trabajamos con materias primas seleccionadas para crear aromas intensos, modernos y memorables, pensados para personas que buscan destacar a través de su esencia.
            </p>
          </div>
          <div className="p-8 md:p-10 border border-[#C9A96E]/20 bg-black/40 backdrop-blur-md rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[#C9A96E] mb-5">Identidad Mendocina</h3>
            <p className={`${inter.className} text-white/80 leading-relaxed italic font-light text-lg relative z-10`}>
              &quot;Nuestra inspiración nace de las noches frías, la montaña, el vino, la elegancia de la ciudad y esos momentos que permanecen en la memoria.&quot;
            </p>
          </div>
        </motion.section>

        {/* Philosophy */}
        <motion.section variants={fadeIn} className="text-center space-y-6 max-w-3xl mx-auto py-12">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-white">No creemos en perfumes genéricos.</h2>
          <p className={`${inter.className} text-[#C9A96E] text-xl md:text-2xl leading-relaxed font-light`}>
            Creemos en fragancias con personalidad, creadas para convertirse en parte de la imagen y presencia de quien las usa.
          </p>
        </motion.section>

        {/* The Essence List */}
        <motion.section variants={fadeIn} className="bg-gradient-to-b from-[#111111] to-[#0A0A0A] p-10 md:p-16 rounded-3xl border border-[#C9A96E]/10 shadow-[0_0_50px_rgba(201,169,110,0.03)]">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-center text-[#C9A96E] mb-12">Nuestra Esencia</h2>
          <ul className="grid md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-8 max-w-3xl mx-auto">
            {[
              "Alta concentración y duración real.",
              "Producción artesanal en pequeños lotes.",
              "Diseño olfativo moderno y sofisticado.",
              "Atención personalizada.",
              "Fragancias diseñadas para dejar huella."
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="text-[#C9A96E] mt-1.5 flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className={`${inter.className} text-white/80 font-light text-lg`}>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Conclusion */}
        <motion.section variants={fadeIn} className="text-center pt-12 pb-20 space-y-12">
          <div className="max-w-3xl mx-auto">
            <p className={`${inter.className} text-xl md:text-2xl text-white/70 font-light leading-relaxed`}>
              Cada creación representa nuestra visión:
            </p>
            <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-white mt-6 leading-relaxed">
              &quot;Un perfume debería sentirse incluso después de que alguien se haya ido.&quot;
            </p>
          </div>
          
          <div className="pt-16 max-w-md mx-auto relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"></div>
            <h2 className={`${cinzel.className} text-3xl md:text-4xl text-[#C9A96E] mb-4`}>Troncoso Perfumes</h2>
            <p className={`${inter.className} text-white/50 tracking-[0.2em] uppercase text-sm font-light`}>
              La esencia de Mendoza convertida en perfume
            </p>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
