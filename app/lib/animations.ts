import type { Variants } from "framer-motion";

// ─── Common fade-up variant ───────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Lighter version used in catalog page */
export const fadeUpLight: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Stagger container ────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/** Stagger with a slightly larger interval for catalog grids */
export const staggerGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// ─── Accord bar variants (used in MainAccords component) ─────────────────────
export const accordItemVariants: Variants = {
  collapsed: { opacity: 0, x: -10 },
  expanded: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const barVariants: Variants = {
  collapsed: { scaleX: 0, opacity: 0 },
  expanded: (i: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.0, delay: 0.55 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};
