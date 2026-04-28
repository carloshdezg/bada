'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Status     = 'pri' | 'par' | 'pnd' | 'dis' | 'no'
type ServiceKey = 'mensajeria' | 'paqueteria' | 'rutas' | 'logistica' | 'ecommerce'

interface CmpRow {
  criterio: string
  values:   Record<ServiceKey, Status>
}

interface CmpCategory {
  title: string
  rows:  CmpRow[]
}

const SERVICE_KEYS: ServiceKey[] = ['mensajeria', 'paqueteria', 'rutas', 'logistica', 'ecommerce']

const SERVICE_NAMES: Record<ServiceKey, string> = {
  mensajeria: 'Mensajería',
  paqueteria: 'Paquetería',
  rutas:      'Rutas Dedicadas',
  logistica:  'Logística',
  ecommerce:  'Envíos para e-commerce',
}

const CMP_CATEGORIES: CmpCategory[] = [
  {
    title: 'Envío y velocidad',
    rows: [
      { criterio: 'Envío urgente',  values: { mensajeria: 'pri', paqueteria: 'no',  rutas: 'no',  logistica: 'no',  ecommerce: 'no'  } },
      { criterio: 'Paquetes / LTL', values: { mensajeria: 'no',  paqueteria: 'pri', rutas: 'no',  logistica: 'no',  ecommerce: 'par' } },
    ],
  },
  {
    title: 'Operación',
    rows: [
      { criterio: 'Ruta fija o recurrente',    values: { mensajeria: 'no',  paqueteria: 'par', rutas: 'pri', logistica: 'par', ecommerce: 'no'  } },
      { criterio: 'Unidad exclusiva',           values: { mensajeria: 'no',  paqueteria: 'no',  rutas: 'pri', logistica: 'no',  ecommerce: 'no'  } },
      { criterio: 'Distribución especializada', values: { mensajeria: 'no',  paqueteria: 'no',  rutas: 'no',  logistica: 'pri', ecommerce: 'no'  } },
    ],
  },
  {
    title: 'Documentación',
    rows: [
      { criterio: 'Documentos de retorno / acuses', values: { mensajeria: 'no', paqueteria: 'no', rutas: 'no', logistica: 'pri', ecommerce: 'no'  } },
      { criterio: 'Generación de guías',            values: { mensajeria: 'no', paqueteria: 'no', rutas: 'no', logistica: 'no',  ecommerce: 'pri' } },
      { criterio: 'Etiquetas de envío',             values: { mensajeria: 'no', paqueteria: 'no', rutas: 'no', logistica: 'no',  ecommerce: 'pri' } },
      { criterio: 'Flujo para e-commerce',          values: { mensajeria: 'no', paqueteria: 'no', rutas: 'no', logistica: 'no',  ecommerce: 'pri' } },
    ],
  },
  {
    title: 'Por confirmar con el equipo operativo',
    rows: [
      { criterio: 'Seguimiento / tracking', values: { mensajeria: 'pnd', paqueteria: 'pnd', rutas: 'pnd', logistica: 'pnd', ecommerce: 'pnd' } },
      { criterio: 'Contacto con asesor',    values: { mensajeria: 'dis', paqueteria: 'dis', rutas: 'dis', logistica: 'dis', ecommerce: 'dis' } },
    ],
  },
]

const STATUS_CONFIG = {
  pri: { label: 'Característica principal', classes: 'bg-brand-blue-50 text-brand-blue border-brand-blue-100' },
  par: { label: 'Aplica parcialmente',      classes: 'bg-brand-orange-50 text-brand-orange border-brand-orange-100' },
  pnd: { label: 'Por confirmar',            classes: 'bg-gray-100 text-ink-50 border-gray-200' },
  dis: { label: 'Disponible',               classes: 'bg-brand-blue-50 text-brand-blue-dark border-brand-blue-100' },
} as const

function StatusBadge({ status }: { status: Status }) {
  if (status === 'no') {
    return (
      <span className="text-[16px] text-ink-20 select-none" aria-label="No es el enfoque principal">
        —
      </span>
    )
  }
  const { label, classes } = STATUS_CONFIG[status]
  return (
    <span
      className={`inline-flex items-center gap-[6px] text-[12px] font-medium px-3 py-[4px] rounded-full border ${classes}`}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-current flex-shrink-0" aria-hidden="true" />
      {label}
    </span>
  )
}

const ALL_ROWS: CmpRow[] = CMP_CATEGORIES.flatMap(cat => cat.rows)

export default function ServiciosComparison() {
  const [openKey, setOpenKey] = useState<ServiceKey | null>(null)

  function toggle(svcKey: ServiceKey) {
    setOpenKey(prev => (prev === svcKey ? null : svcKey))
  }

  return (
    <section className="py-[96px] bg-white border-b border-gray-200">
      <div className="max-w-site mx-auto px-5 sm:px-7">
        <span className="tag">Comparativa</span>
        <h2
          className="font-display font-bold text-ink tracking-[-0.02em] mb-3"
          style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.08' }}
        >
          Compara los servicios y elige el más adecuado
        </h2>
        <p className="text-[15px] text-ink-50 font-light mb-11 max-w-[640px] leading-[1.75]">
          Cada servicio responde a una necesidad distinta. Usa esta comparación como guía rápida para
          identificar si necesitas velocidad, volumen, una ruta dedicada, distribución especializada
          o soporte para envíos de e-commerce.
        </p>

        {/* ── Desktop table (hidden on mobile) ─────────────────── */}
        <div className="hidden md:block overflow-x-auto rounded-[16px] shadow-[var(--shadow)]">
          <table className="w-full min-w-[820px] border-collapse bg-white">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-[14px] text-left text-[12px] font-semibold tracking-[0.06em] uppercase
                             text-ink-50 bg-gray-50 border-b border-gray-200 min-w-[190px]"
                >
                  Criterio
                </th>
                {SERVICE_KEYS.map(svcKey => (
                  <th
                    key={svcKey}
                    scope="col"
                    className="px-4 py-[14px] text-center text-[11.5px] font-semibold tracking-[0.04em] uppercase
                               text-ink-80 bg-gray-50 border-b border-gray-200 min-w-[120px]"
                  >
                    {SERVICE_NAMES[svcKey]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CMP_CATEGORIES.map(cat => (
                <React.Fragment key={cat.title}>
                  {/* Category header row */}
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-[10px] text-[11px] font-semibold tracking-[0.09em] uppercase
                                 text-brand-orange bg-brand-orange-50 border-b border-brand-orange-100"
                    >
                      {cat.title}
                    </td>
                  </tr>
                  {/* Data rows */}
                  {cat.rows.map(row => (
                    <tr key={row.criterio} className="border-b border-gray-100 hover:bg-gray-50 last:border-b-0">
                      <td className="px-5 py-[14px] text-[14px] text-ink-80 font-light">{row.criterio}</td>
                      {SERVICE_KEYS.map(svcKey => (
                        <td key={svcKey} className="px-4 py-[14px] text-center">
                          <StatusBadge status={row.values[svcKey]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div
          className="hidden md:flex flex-wrap items-center gap-5 mt-4 px-5 py-4
                     bg-gray-50 border border-gray-200 rounded-[12px]"
        >
          {(['pri', 'par', 'pnd', 'dis'] as const).map(s => (
            <div key={s} className="flex items-center gap-1.5">
              <StatusBadge status={s} />
            </div>
          ))}
          <span className="ml-auto text-[12.5px] text-ink-50">— No es el enfoque principal</span>
        </div>
        <p
          className="hidden md:block mt-3 text-[12.5px] text-ink-50 italic
                     px-4 py-3 bg-gray-50 border border-gray-200 rounded-md"
        >
          * La disponibilidad de seguimiento / tracking en cada servicio se confirmará con el equipo
          operativo antes de publicar.
        </p>

        {/* ── Mobile accordion (hidden on md+) ─────────────────── */}
        <div className="flex md:hidden flex-col gap-2.5" role="list">
          {SERVICE_KEYS.map(svcKey => {
            const isOpen = openKey === svcKey
            return (
              <div
                key={svcKey}
                role="listitem"
                className="bg-white border border-gray-200 rounded-[14px] overflow-hidden shadow-[var(--shadow-sm)]"
              >
                <button
                  type="button"
                  onClick={() => toggle(svcKey)}
                  aria-expanded={isOpen}
                  className="flex items-center justify-between w-full px-5 py-[18px] text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-display font-bold text-[17px] text-ink">
                    {SERVICE_NAMES[svcKey]}
                  </span>
                  <span
                    className={[
                      'w-[26px] h-[26px] rounded-full flex items-center justify-center flex-shrink-0',
                      'border transition-all duration-200',
                      isOpen
                        ? 'rotate-180 bg-brand-blue border-brand-blue'
                        : 'bg-gray-100 border-gray-200',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    <ChevronDown
                      className={`w-[11px] h-[11px] ${isOpen ? 'text-white' : 'text-ink-50'}`}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-200">
                    {ALL_ROWS.map(row => (
                      <div
                        key={row.criterio}
                        className="flex items-center justify-between gap-3 px-5 py-[14px] border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-[14px] text-ink-80 font-light flex-1">
                          {row.criterio}
                        </span>
                        <StatusBadge status={row.values[svcKey]} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <p className="md:hidden mt-3 text-[12px] text-ink-50 italic">
          * Seguimiento / tracking está por confirmar con el equipo operativo.
        </p>
      </div>
    </section>
  )
}
