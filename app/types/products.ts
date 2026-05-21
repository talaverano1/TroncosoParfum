// ─── Interfaces compartidas para el modelo de datos ────────

export interface ScentNote {
  name: string;
  intensity: number; // 1–10
}

export interface MainAccord {
  name: string;
  percentage: number; // 0–100
  color: string; // tailwind bg class para la barra de porcentaje, ej. "bg-green-500"
}

export interface Longevity {
  hours: number;   // estimated wear time in hours
  label: string;   // e.g. "Larga duración"
}

export type SizeKey = "5 ml" | "50 ml";

export interface Product {
  id: number;
  name: string;
  gender: "Masculino" | "Femenino" | "Unisex";
  description: string;
  fullDescription: string;
  images?: string[]; // multiple images for carousel; falls back to [image]
  /** Regular prices for each size */
  prices: Record<SizeKey, number>;
  image: string;
  isBestseller: boolean;
  /** Discounted prices per size. A size is considered on sale when discountPrices[size] < prices[size]. */
  discountPrices?: Partial<Record<SizeKey, number>>;
  scentNotes: ScentNote[];
  mainAccords: MainAccord[];
  usageLevels: Record<string, number>;
  longevity: Longevity;
}

// ─── Cream / Complementos ─────────────────────────────────────────────────────
export interface Cream {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  image: string;
  images?: string[];
  /** Fixed price (single size) */
  price: number;
  /** e.g. "100 gr" */
  quantity: string;
  /** Optional discount price */
  discountPrice?: number;
}
