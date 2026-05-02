'use client'

import { cn } from '@/lib/utils'
import { waUrl } from '@/lib/whatsapp'
import type { QuoteResult } from '@/lib/calculator/calculateQuote'
import type { ServiceId } from '@/lib/calculator/types'

const SERVICE_LABELS: Record<ServiceId, string> = {
  mensajeria:      'Mensajería',
  paqueteria:      'Paquetería',
  rutas_dedicadas: 'Rutas Dedicadas',
  logistica:       'Logística',
  ecommerce:       'E-commerce',
}

function formatMXN(n: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n)
}

interface Props {
  service:      ServiceId | null
  pesoCobrable: number | null
  result:       QuoteResult | null
}

export default function MobileQuoteSticky({ service, pesoCobrable, result }: Props) {
  const isAdvisor = result?.type === 'advisor'
  const isSuccess = result?.type === 'success'

  const advisorWA = waUrl(
    service
      ? `Hola, quiero información sobre el servicio de ${SERVICE_LABELS[service]} de Transportes BADA.`
      : undefined
  )

  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 right-4 z-40 lg:hidden',
        'rounded-[22px] border shadow-[0_18px_42px_rgba(15,25,35,.16)] p-3',
        'backdrop-blur-[10px]',
        isAdvisor
          ? 'bg-[rgba(255,247,232,.98)] border-[rgba(184,115,18,.28)]'
          : 'bg-[rgba(255,255,255,.98)] border-[#DDE3EA]'
      )}
    >
      <div className="flex items-center justify-between gap-[14px] flex-wrap sm:flex-nowrap">
        <div className="min-w-0 flex-1">
          <span className={cn(
            'block text-[11px] font-bold uppercase tracking-[.08em] mb-1',
            isAdvisor ? 'text-[#B87312]' : 'text-ink-50'
          )}>
            {isAdvisor ? 'Requiere asesor' : 'Resumen rápido'}
          </span>
          <div className="flex gap-2.5 items-baseline flex-wrap">
            <strong className="text-[17px] leading-[1.2]">
              {isSuccess ? formatMXN(result.total) : isAdvisor ? 'Validación manual' : '$ ─ ─'}
            </strong>
            <span className={cn('text-[13px]', isAdvisor ? 'text-ink-80' : 'text-ink-50')}>
              {isSuccess
                ? `${pesoCobrable} kg · ${result.route.tipo_tarifa} · IVA incluido`
                : isAdvisor
                  ? (result.reason === 'over_dimension' || result.reason === 'over_weight')
                    ? 'El envío excede los límites para cotización automática.'
                    : 'Revisaremos cobertura y condiciones.'
                  : pesoCobrable ? `Peso cobrable: ${pesoCobrable} kg` : '─'}
            </span>
          </div>
        </div>
        {isAdvisor ? (
          <a
            href={advisorWA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 h-12 px-[18px] rounded-[14px] bg-white border border-[#C5CDD7] text-ink text-[14px] font-bold inline-flex items-center hover:border-ink transition-colors whitespace-nowrap"
          >
            Hablar con asesor
          </a>
        ) : (
          <a
            href="#step3"
            className="flex-shrink-0 h-12 px-[18px] rounded-[14px] bg-brand-orange text-white text-[14px] font-bold inline-flex items-center shadow-[0_12px_24px_rgba(241,98,39,.20)] hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Ver desglose →
          </a>
        )}
      </div>
    </div>
  )
}
