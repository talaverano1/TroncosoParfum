import type { Product } from "@/app/types/products";

// ─── Filter option definitions ────────────────────────────────────────────────

export const GENDERS = [
  { key: "all",       label: "Todos",  icon: "✦" },
  { key: "Masculino", label: "Hombre", icon: "♂" },
  { key: "Femenino",  label: "Mujer",  icon: "♀" },
] as const;

export const TIME_FILTERS = [
  { key: "all",      label: "Cualquier momento",       icon: "🕐" },
  { key: "Casual",   label: "Casual",                   icon: "☀️" },
  { key: "Especial", label: "Para ocasiones especiales", icon: "✨" },
] as const;

export const SEASON_FILTERS = [
  { key: "all",      label: "Toda estación", icon: "🗓" },
  { key: "Verano",   label: "Verano",        icon: "🔥" },
  { key: "Invierno", label: "Invierno",      icon: "❄️" },
] as const;

export const GENDER_SECTIONS: Array<{
  key: Exclude<GenderKey, "all">;
  label: string;
  accent: string;
  dot: string;
}> = [
  { key: "Masculino", label: "Hombre", accent: "text-blue-300",  dot: "bg-blue-400" },
  { key: "Femenino",  label: "Mujer",  accent: "text-rose-300",  dot: "bg-rose-400" },
];

// ─── Derived types ────────────────────────────────────────────────────────────
export type GenderKey  = typeof GENDERS[number]["key"];
export type TimeKey    = typeof TIME_FILTERS[number]["key"];
export type SeasonKey  = typeof SEASON_FILTERS[number]["key"];

// ─── Filter logic ─────────────────────────────────────────────────────────────

/** Devuelve true si el producto coincide con los filtros de time y season selecionados */
export function matchesFilters(
  p: Product,
  time: TimeKey,
  season: SeasonKey
): boolean {
  // ── Occasion filter (Casual / Especial) ──────────────────────────────────────
  const timeOk =
  time === "all" ||
  (p.usageLevels ? p.usageLevels[time] === 1 : false);

  // ── Season filter (Verano / Invierno) ────────────────────────────────────────
  const seasonOk =
    season === "all" ||
    (p.usageLevels ? p.usageLevels[season] === 1 : false);

  return timeOk && seasonOk;
}

/** Ordena los productos: bestsellers primero, despues alfabéticamente */
export function sortProducts(list: Product[]): Product[] {
  return [...list].sort((a, b) => {
    if (a.isBestseller !== b.isBestseller) return a.isBestseller ? -1 : 1;
    return a.name.localeCompare(b.name, "es");
  });
}
