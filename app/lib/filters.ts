import type { Product } from "@/app/types/products";

// ─── Filter option definitions ────────────────────────────────────────────────

export const GENDERS = [
  { key: "all", label: "Todos", icon: "✦" },
  { key: "Masculino", label: "Hombre", icon: "♂" },
  { key: "Femenino", label: "Mujer", icon: "♀" },
  { key: "Unisex", label: "Unisex", icon: "◈" },
] as const;

export const TIME_FILTERS = [
  { key: "all", label: "Cualquier hora", icon: "🕐" },
  { key: "Día", label: "De Día", icon: "☀️" },
  { key: "Noche", label: "De Noche", icon: "🌙" },
] as const;

export const SEASON_FILTERS = [
  { key: "all", label: "Toda estación", icon: "🗓" },
  { key: "Primavera", label: "Primavera", icon: "🌿" },
  { key: "Verano", label: "Verano", icon: "☂️" },
  { key: "Otoño", label: "Otoño", icon: "🍂" },
  { key: "Invierno", label: "Invierno", icon: "❄️" },
] as const;

export const GENDER_SECTIONS: Array<{
  key: Exclude<GenderKey, "all">;
  label: string;
  accent: string;
  dot: string;
}> = [
  { key: "Masculino", label: "Hombre", accent: "text-blue-300", dot: "bg-blue-400" },
  { key: "Femenino", label: "Mujer", accent: "text-rose-300", dot: "bg-rose-400" },
  { key: "Unisex", label: "Unisex", accent: "text-amber-300", dot: "bg-amber-400" },
];

// ─── Derived types ────────────────────────────────────────────────────────────
export type GenderKey = typeof GENDERS[number]["key"];
export type TimeKey = typeof TIME_FILTERS[number]["key"];
export type SeasonKey = typeof SEASON_FILTERS[number]["key"];

// ─── Filter logic ─────────────────────────────────────────────────────────────

/** Returns true if the product matches the selected time and season filters */
export function matchesFilters(
  p: Product,
  time: TimeKey,
  season: SeasonKey
): boolean {
  const timeOk =
    time === "all" || (p.usageLevels ? p.usageLevels[time as string] >= 2 : false);
  const seasonOk =
    season === "all" || (p.usageLevels ? p.usageLevels[season as string] >= 2 : false);
  return timeOk && seasonOk;
}

/** Sorts products: bestsellers first, then alphabetical */
export function sortProducts(list: Product[]): Product[] {
  return [...list].sort((a, b) => {
    if (a.isBestseller !== b.isBestseller) return a.isBestseller ? -1 : 1;
    return a.name.localeCompare(b.name, "es");
  });
}
