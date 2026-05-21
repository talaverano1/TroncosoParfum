// ─── Pricing utilities ────────────────────────────────────────────────────────

/**
 * Returns discount info for a product or cream price pair.
 * A "sale" is when discountedPrice is defined AND less than originalPrice.
 */
export function getDiscountInfo(
  originalPrice: number,
  discountedPrice: number | undefined
) {
  const isOnSale =
    discountedPrice != null && discountedPrice < originalPrice;
  const displayPrice = isOnSale ? discountedPrice! : originalPrice;
  const savingsPct = isOnSale
    ? Math.round((1 - discountedPrice! / originalPrice) * 100)
    : 0;

  return { isOnSale, displayPrice, savingsPct };
}
