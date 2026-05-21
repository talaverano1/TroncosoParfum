// ─── Shared TypeScript interfaces for the Troncoso Perfumes data model ────────

export interface ScentNote {
  name: string;
  intensity: number; // 1–10
}

export interface MainAccord {
  name: string;
  percentage: number; // 0–100
  color: string; // tailwind bg class for the bar
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
  timeOfDay: ("Día" | "Noche")[];
  usageLevels?: Record<string, number>;
  style: string;
  climate: string[];
  occasions: string[];
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
