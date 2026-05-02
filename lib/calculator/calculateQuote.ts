import { calculatorConfig } from './config'
import { findRouteByPostalCode, routeRequiresAdvisor } from './seedRoutes'
import { getPublicTariffByType } from './seedTariffs'
import type { ServiceId, RouteCoverageRow, TariffRow } from './types'

export interface QuoteInput {
  service: ServiceId
  peso: number
  largo: number
  ancho: number
  alto: number
  originCp: string
  destinationCp: string
}

export type AdvisorReason =
  | 'service_requires_advisor'
  | 'route_not_found'
  | 'route_requires_advisor'
  | 'over_weight'
  | 'over_dimension'

export interface QuoteSuccess {
  type: 'success'
  service: ServiceId
  route: RouteCoverageRow
  tariff: TariffRow
  pesoReal: number
  pesoVolumetrico: number
  pesoCobrable: number
  precioBase: number
  iva: number
  total: number
}

export interface QuoteAdvisor {
  type: 'advisor'
  reason: AdvisorReason
  message: string
}

export type QuoteResult = QuoteSuccess | QuoteAdvisor

function getTariffPrice(tariff: TariffRow, pesoCobrable: number): number {
  if (pesoCobrable <= 5)  return tariff.tarifa_5kg
  if (pesoCobrable <= 10) return tariff.tarifa_10kg
  if (pesoCobrable <= 15) return tariff.tarifa_15kg
  if (pesoCobrable <= 20) return tariff.tarifa_20kg
  if (pesoCobrable <= 30) return tariff.tarifa_30kg
  return tariff.tarifa_30kg + (pesoCobrable - 30) * tariff.precio_kg_adicional
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const cfg = calculatorConfig

  if (
    (cfg.serviciosAsesor as ServiceId[]).includes(input.service) ||
    (cfg.serviciosPendientesValidacion as ServiceId[]).includes(input.service)
  ) {
    return { type: 'advisor', reason: 'service_requires_advisor', message: cfg.mensajeRequiereAsesor }
  }

  if (input.largo > cfg.largoMaximoCm) {
    return { type: 'advisor', reason: 'over_dimension', message: cfg.mensajeRequiereAsesor }
  }
  if (input.ancho > cfg.anchoMaximoCm) {
    return { type: 'advisor', reason: 'over_dimension', message: cfg.mensajeRequiereAsesor }
  }
  if (input.alto > cfg.altoMaximoCm) {
    return { type: 'advisor', reason: 'over_dimension', message: cfg.mensajeRequiereAsesor }
  }

  const pesoVolumetrico = (input.largo * input.ancho * input.alto) / cfg.divisorVolumetrico
  const pesoCobrable = Math.ceil(Math.max(input.peso, pesoVolumetrico))

  const maxPeso = input.service === 'mensajeria' ? cfg.pesoMaxMensajeriaKg : cfg.pesoMaxPaqueteriaKg
  if (pesoCobrable > maxPeso) {
    return { type: 'advisor', reason: 'over_weight', message: cfg.mensajeRequiereAsesor }
  }

  const route = findRouteByPostalCode(input.originCp, input.destinationCp)
  if (routeRequiresAdvisor(route)) {
    return {
      type: 'advisor',
      reason: route ? 'route_requires_advisor' : 'route_not_found',
      message: route?.mensaje_opcional ?? cfg.mensajeRequiereAsesor,
    }
  }

  const tariff = getPublicTariffByType(route!.tipo_tarifa)
  if (!tariff) {
    return { type: 'advisor', reason: 'route_requires_advisor', message: cfg.mensajeRequiereAsesor }
  }

  const precioBase = getTariffPrice(tariff, pesoCobrable)
  const iva        = precioBase * cfg.iva
  const total      = precioBase + iva

  return {
    type: 'success',
    service: input.service,
    route: route!,
    tariff,
    pesoReal:        input.peso,
    pesoVolumetrico: Math.round(pesoVolumetrico * 100) / 100,
    pesoCobrable,
    precioBase:      Math.round(precioBase * 100) / 100,
    iva:             Math.round(iva * 100) / 100,
    total:           Math.round(total * 100) / 100,
  }
}
