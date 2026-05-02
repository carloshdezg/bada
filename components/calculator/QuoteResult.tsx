'use client'

import { CheckCircle, AlertCircle, MessageCircle, RotateCcw, MapPin, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { waUrl } from '@/lib/whatsapp'
import type { QuoteResult } from '@/lib/calculator/calculateQuote'
import type { PackageValues } from './PackageStep'
import type { RouteValues } from './RouteStep'
import type { RouteCoverageRow } from '@/lib/calculator/types'

type DayKey = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado'

const DAYS: { key: DayKey; short: string }[] = [
  { key: 'lunes',     short: 'L'  },
  { key: 'martes',    short: 'M'  },
  { key: 'miercoles', short: 'Mi' },
  { key: 'jueves',    short: 'J'  },
  { key: 'viernes',   short: 'V'  },
  { key: 'sabado',    short: 'S'  },
]

function formatMXN(n: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n)
}

function ServiceDays({ route }: { route: RouteCoverageRow }) {
  return (
    <div className="flex items-center gap-1.5">
      {DAYS.map(({ key, short }) => (
        <div
          key={key}
          className={cn(
            'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold',
            route[key] ? 'bg-brand-orange text-white' : 'bg-gray-100 text-ink-50'
          )}
        >
          {short}
        </div>
      ))}
    </div>
  )
}

const ADVISOR_REASON_LABELS: Record<string, string> = {
  service_requires_advisor: 'Servicio requiere asesor',
  route_not_found:          'Ruta sin cobertura detectada',
  route_requires_advisor:   'Ruta requiere validación',
  over_weight:              'Peso excede límite automático',
}

interface Props {
  result:        QuoteResult
  packageValues: PackageValues
  routeValues:   RouteValues | null
  onRestart:     () => void
}

export default function QuoteResultDisplay({ result, packageValues, routeValues, onRestart }: Props) {
  if (result.type === 'success') {
    const { route, pesoReal, pesoVolumetrico, pesoCobrable, precioBase, iva, total } = result

    const advisorMessage =
      `Hola, quiero confirmar y contratar el envío cotizado en badamensajeria.mx.\n\n` +
      `Servicio: ${packageValues.service}\n` +
      `Paquete: ${packageValues.largo}×${packageValues.ancho}×${packageValues.alto} cm | ${packageValues.peso} kg\n` +
      `CP Origen: ${routeValues?.originCp ?? '—'}\n` +
      `CP Destino: ${routeValues?.destinationCp ?? '—'} (${route.poblacion}, ${route.estado})\n` +
      `Peso cobrable: ${pesoCobrable} kg\n` +
      `Total estimado: ${formatMXN(total)} MXN (IVA incluido)`

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
          <div>
            <h2 className="text-[18px] font-bold text-ink">Cotización estimada</h2>
            <p className="text-[13px] text-ink-50">Tarifa pública · Guías 1–15</p>
          </div>
        </div>

        {/* Route info card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[15px] font-semibold text-ink">
                  {route.poblacion}, {route.estado}
                </div>
                <div className="text-[13px] text-ink-50">
                  CP {routeValues?.destinationCp}
                </div>
              </div>
            </div>
            <span className={cn(
              'text-[12px] font-bold tracking-wide uppercase px-3 py-1 rounded-full',
              route.tipo_tarifa === 'Local'
                ? 'bg-brand-orange/10 text-brand-orange'
                : 'bg-brand-blue/10 text-brand-blue'
            )}>
              {route.zona_operativa}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-[12px] font-medium text-ink-50 mb-2">
              <Calendar size={13} />
              Días de recolección disponibles
            </div>
            <ServiceDays route={route} />
          </div>
        </div>

        {/* Weight breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-[12px] font-semibold tracking-[0.06em] uppercase text-ink-50 mb-4">
            Desglose de peso
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-[11px] text-ink-50 mb-1">Real</div>
              <div className="text-[16px] font-semibold text-ink">{pesoReal} kg</div>
            </div>
            <div>
              <div className="text-[11px] text-ink-50 mb-1">Volumétrico</div>
              <div className="text-[16px] font-semibold text-ink">{pesoVolumetrico} kg</div>
            </div>
            <div>
              <div className="text-[11px] text-ink-50 mb-1">Cobrable</div>
              <div className="text-[17px] font-bold text-brand-orange">{pesoCobrable} kg</div>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
          <p className="text-[12px] font-semibold tracking-[0.06em] uppercase text-ink-50">
            Precio estimado
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-[14px]">
              <span className="text-ink-50">Precio base (sin IVA)</span>
              <span className="text-ink font-medium">{formatMXN(precioBase)}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-ink-50">IVA (16%)</span>
              <span className="text-ink font-medium">{formatMXN(iva)}</span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex justify-between text-[16px]">
              <span className="font-semibold text-ink">Total</span>
              <span className="font-bold text-ink">{formatMXN(total)}</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[12px] text-ink-50 leading-relaxed">
          Cotización estimada con tarifa pública vigente. La tarifa final se confirma al contratar con tu ejecutivo BADA.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={waUrl(advisorMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-[15px] font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={16} />
            Confirmar con asesor
          </a>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-ink text-[15px] font-semibold px-5 py-2.5 rounded-xl hover:border-gray-300 transition-colors"
          >
            <RotateCcw size={15} />
            Nueva cotización
          </button>
        </div>
      </div>
    )
  }

  // Advisor fallback
  const advisorMessage =
    `Hola, quiero una cotización para el servicio de ${packageValues.service} de BADA.\n` +
    (routeValues
      ? `Origen CP: ${routeValues.originCp} · Destino CP: ${routeValues.destinationCp}`
      : '')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <AlertCircle size={24} className="text-amber-500 flex-shrink-0" />
        <div>
          <h2 className="text-[18px] font-bold text-ink">Este envío requiere un asesor</h2>
          <p className="text-[12px] text-ink-50 mt-0.5">
            {ADVISOR_REASON_LABELS[result.reason] ?? 'Requiere validación'}
          </p>
        </div>
      </div>

      {/* Message card */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-[14px] text-ink leading-relaxed">{result.message}</p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={waUrl(advisorMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-[15px] font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          <MessageCircle size={16} />
          Hablar con un asesor
        </a>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-ink text-[15px] font-semibold px-5 py-2.5 rounded-xl hover:border-gray-300 transition-colors"
        >
          <RotateCcw size={15} />
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
