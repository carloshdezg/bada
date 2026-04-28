import type { PackageData, AddressData, MockResult } from '@/types/quote'
import { waUrl } from '@/lib/whatsapp'

// TODO: reemplazar con llamada a /api/cotizar cuando el endpoint exista
export const FAKE_PRICE = 450

export function computeMockResult(pkg: PackageData): MockResult {
  // Peso volumétrico = (largo × ancho × alto) / 5000  (divisor estándar DHL/FedEx)
  const pesoVolumetrico = (pkg.largo * pkg.ancho * pkg.alto) / 5000
  const pesoCobrable    = Math.max(pkg.peso, pesoVolumetrico)

  return {
    pesoReal:        pkg.peso,
    pesoVolumetrico: Math.round(pesoVolumetrico * 100) / 100,
    pesoCobrable:    Math.round(pesoCobrable    * 100) / 100,
    tarifaBase:      FAKE_PRICE,
    total:           FAKE_PRICE, // TODO: tarifa real = pesoCobrable × tarifa_por_kg_por_zona
    servicio:        'Mensajería Express',
    tiempoEstimado:  '24-48 horas',
    esMock:          true,
  }
}

export function buildQuoteWAMessage(
  pkg: PackageData,
  addr: AddressData,
  result: MockResult,
): string {
  const message =
    `Hola, quiero contratar el siguiente envío cotizado en badamensajeria.mx:\n\n` +
    `📦 Paquete: ${pkg.largo}×${pkg.ancho}×${pkg.alto} cm | Peso: ${pkg.peso} kg\n` +
    `📍 Origen:  ${addr.origen.ciudad}, ${addr.origen.estado}  CP ${addr.origen.cp}\n` +
    `📍 Destino: ${addr.destino.ciudad}, ${addr.destino.estado} CP ${addr.destino.cp}\n` +
    `🚚 Servicio: ${result.servicio} (${result.tiempoEstimado})\n` +
    `💰 Estimado: $${result.total} MXN\n\n` +
    `¿Me pueden confirmar la tarifa final?`
  return waUrl(message)
}

export function buildQuoteClipboardText(
  pkg: PackageData,
  addr: AddressData,
  result: MockResult,
): string {
  return (
    `COTIZACIÓN BADA — ${new Date().toLocaleDateString('es-MX', { dateStyle: 'long' })}\n\n` +
    `PAQUETE\n` +
    `Dimensiones:       ${pkg.largo} × ${pkg.ancho} × ${pkg.alto} cm\n` +
    `Peso real:         ${pkg.peso} kg\n` +
    `Peso volumétrico:  ${result.pesoVolumetrico} kg\n` +
    `Peso cobrable:     ${result.pesoCobrable} kg\n\n` +
    `RUTA\n` +
    `Origen:  ${addr.origen.ciudad}, ${addr.origen.estado} CP ${addr.origen.cp}\n` +
    `Destino: ${addr.destino.ciudad}, ${addr.destino.estado} CP ${addr.destino.cp}\n\n` +
    `RESULTADO\n` +
    `Servicio:          ${result.servicio}\n` +
    `Tiempo estimado:   ${result.tiempoEstimado}\n` +
    `Precio estimado:   $${result.total} MXN\n\n` +
    `* Precio estimado. La tarifa final se confirma al contratar.\n` +
    `  badamensajeria.mx`
  )
}
