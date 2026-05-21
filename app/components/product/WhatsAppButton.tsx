"use client";

import { motion } from "framer-motion";

// ─── WhatsApp SVG ─────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface WhatsAppButtonProps {
  url: string;
  id?: string;
  /** Extra Tailwind classes for the wrapper (e.g. "mt-4 w-full") */
  className?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

// ─── Size presets ─────────────────────────────────────────────────────────────
const sizes = {
  sm: { btn: "py-3 px-6 text-sm gap-2",   icon: 18 },
  md: { btn: "py-3.5 px-7 text-base gap-2.5", icon: 20 },
  lg: { btn: "py-4 px-8 text-lg gap-3",   icon: 22 },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function WhatsAppButton({
  url,
  id,
  className = "",
  size = "md",
  animate = true,
}: WhatsAppButtonProps) {
  const { btn, icon } = sizes[size];

  const button = (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        // Layout
        "group relative inline-flex items-center justify-center w-full overflow-hidden",
        // Shape
        "rounded-2xl",
        // Spacing & typography
        btn,
        "font-semibold tracking-wide",
        // Gold gradient background (matches .gold-gradient in globals.css)
        "bg-[linear-gradient(135deg,_#b8904a_0%,_#e8d5a3_40%,_#d4aa6a_70%,_#b8904a_100%)]",
        // Subtle inner border
        "ring-1 ring-[#9a7535]/40",
        // Shadow: layered gold glow
        "shadow-[0_2px_8px_rgba(180,140,60,0.25),_0_0_0_1px_rgba(200,160,80,0.15)]",
        // Text color: deep warm black
        "text-[#1c0f00]",
        // Hover / active
        "hover:brightness-105 hover:shadow-[0_4px_20px_rgba(180,140,60,0.4),_0_0_0_1px_rgba(200,160,80,0.3)]",
        "active:scale-[0.98] active:brightness-95",
        // Transitions
        "transition-all duration-200 ease-out",
        "cursor-pointer select-none",
      ].join(" ")}
    >
      {/* Shimmer overlay on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <WhatsAppIcon size={icon} />
      <span>Comprar por WhatsApp</span>
    </a>
  );

  if (!animate) return button;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {button}
    </motion.div>
  );
}
