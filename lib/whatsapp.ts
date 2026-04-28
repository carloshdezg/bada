// Single source of truth for all WhatsApp link generation.
// Number comes from env so no phone digits are hardcoded.

const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? '525500000000' // TODO: set in .env

const WA_DEFAULT_MSG =
  process.env.NEXT_PUBLIC_WA_DEFAULT_MSG ??
  'Hola, quiero información sobre los servicios de Transportes BADA.'

/**
 * Returns a wa.me deep-link with an optional pre-filled message.
 * Works in both server and client contexts (NEXT_PUBLIC_ vars are inlined).
 */
export function waUrl(msg?: string): string {
  const text = encodeURIComponent(msg ?? WA_DEFAULT_MSG)
  return `https://wa.me/${WA_NUMBER}?text=${text}`
}
