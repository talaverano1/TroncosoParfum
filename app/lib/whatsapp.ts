// ─── WhatsApp URL builder ─────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "5492615177609";

/**
 * Builds a wa.me URL with a pre-filled message for a perfume product.
 */
export function buildProductWhatsAppUrl(
  productName: string,
  size: string,
  price: number
): string {
  const message = encodeURIComponent(
    `Hola! Me interesa el perfume "${productName}" en ${size} (ARS ${price.toLocaleString("es-AR")}). ¿Tienen stock disponible?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

/**
 * Builds a wa.me URL with a pre-filled message for a cream/complemento product.
 */
export function buildCreamWhatsAppUrl(
  creamName: string,
  quantity: string,
  price: number
): string {
  const message = encodeURIComponent(
    `Hola! Me interesa la "${creamName}" (${quantity}) — ARS ${price.toLocaleString("es-AR")}. ¿Tienen stock disponible?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
