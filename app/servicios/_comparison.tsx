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

// Short names for mobile accordion headers (avoids crowding)
const SERVICE_NAMES_SHORT: Record<ServiceKey, string> = {
  mensajeria: 'Mensajería',
  paqueteria: 'Paquetería',
  rutas:      'Rutas Dedicadas',
  logistica:  'Logística',
  ecommerce:  'E-commerce',
}

const CMP_CATEGORIES: CmpCategory[] = [
  {
    title: 'Tipo de envío',
    rows: [
      { criterio: 'Envío urgente',    values: { mensajeria: 'pri', paqueteria: 'no',  rutas: 'no',  logistica: 'no',  ecommerce: 'no'  } },
      { criterio: 'Paquetería / LTL', values: { mensajeria: 'no',  paqueteria: 'pri', rutas: 'no',  logistica: 'no',  ecommerce: 'par' } },
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
    ],
  },
  {
    title: 'E-commerce',
    rows: [
      { criterio: 'Flujo para e-commerce', values: { mensajeria: 'no', paqueteria: 'no', rutas: 'no', logistica: 'no', ecommerce: 'pri' } },
    ],
  },
  {
    title: 'Confirmación operativa',
    rows: [
      { criterio: 'Seguimiento / tracking', values: { mensajeria: 'pnd', paqueteria: 'pnd', rutas: 'pnd', logistica: 'pnd', ecommerce: 'pnd' } },
      { criterio: 'Contacto con asesor',    values: { mensajeria: 'dis', paqueteria: 'dis', rutas: 'dis', logistica: 'dis', ecommerce: 'dis' } },
    ],
  },
]

const STATUS_CONFIG = {
  pri: { label: 'Principal',           classes: 'bg-brand-blue-50 text-brand-blue border-brand-blue-100' },
  par: { label: 'Aplica parcialmente', classes: 'bg-brand-orange-50 text-brand-orange border-brand-orange-100' },
  pnd: { label: 'Por confirmar',       classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  dis: { label: 'Disponible',          classes: 'bg-brand-blue-50 text-brand-blue-dark border-brand-blue-100' },
} as const

function StatusBadge({ status }: { status: Status }) {
  if (status === 'no') {
    return (
      <span
        className="text-[18px] leading-none text-ink-20 select-none"
        aria-label="No es el enfoque principal"
      >
        —
      </span>
    )
  }
  const { label, classes } = STATUS_CONFIG[status]
  return (
    <span
      className={`inline-flex items-center gap-[6px] text-[12.5px] font-semibold
                  px-[12px] py-[7px] rounded-[8px] border whitespace-nowrap ${classes}`}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-current flex-shrink-0" aria-hidden="true" />
      {label}
    </span>
  )
}

export default function ServiciosComparison() {
  const [openKey, setOpenKey] = useState<ServiceKey | null>(null)

  function toggle(svcKey: ServiceKey) {
    setOpenKey(prev => (prev === svcKey ? null : svcKey))
  }

  return (
    <section className="py-[110px] bg-white border-b border-gray-200">
      <div className="max-w-site mx-auto px-5 sm:px-7">

        {/* ── Section intro ─────────────────────────────────── */}
        <div className="mb-14">
          <span className="tag">Comparativa</span>
          <h2
            className="font-display font-black text-ink tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: '1.06' }}
          >
            Compara los servicios y elige el más adecuado
          </h2>
          <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[600px]">
            Cada servicio responde a una necesidad distinta. Usa esta comparación como guía rápida para
            identificar si necesitas velocidad, volumen, una ruta dedicada, distribución especializada
            o soporte para envíos de e-commerce.
          </p>
        </div>

        {/* ── Desktop matrix (hidden on mobile) ─────────────── */}
        <div className="hidden md:block overflow-x-auto rounded-[20px] shadow-[var(--shadow-lg)]">
          <table className="w-full min-w-[900px] border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50">
                <th
                  scope="col"
                  className="px-6 py-[18px] text-left text-[11px] font-bold tracking-[0.10em] uppercase
                             text-ink-50 border-b border-gray-200"
                  style={{ width: '220px', minWidth: '220px' }}
                >
                  Criterio
                </th>
                {SERVICE_KEYS.map(svcKey => (
                  <th
                    key={svcKey}
                    scope="col"
                    className="px-4 py-[18px] text-center text-[13px] font-bold text-ink
                               border-b border-gray-200"
                    style={{ minWidth: '136px' }}
                  >
                    {SERVICE_NAMES[svcKey]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CMP_CATEGORIES.map(cat => (
                <React.Fragment key={cat.title}>
                  {/* Category separator row */}
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-[12px] text-[11px] font-bold tracking-[0.10em] uppercase
                                 text-brand-orange bg-brand-orange-50 border-y border-brand-orange-100"
                    >
                      {cat.title}
                    </td>
                  </tr>

                  {/* Data rows */}
                  {cat.rows.map(row => (
                    <tr
                      key={row.criterio}
                      className="border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50/70"
                    >
                      <td className="px-6 py-[18px] text-[14px] text-ink font-medium leading-[1.4]">
                        {row.criterio}
                      </td>
                      {SERVICE_KEYS.map(svcKey => (
                        <td key={svcKey} className="px-4 py-[18px] text-center">
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

        {/* ── Legend ─────────────────────────────────────────── */}
        <div
          className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-3 mt-5
                     px-6 py-[14px] bg-gray-50 border border-gray-200 rounded-[14px]"
        >
          <span className="text-[11px] font-bold tracking-[0.10em] uppercase text-ink-50 mr-1">
            Leyenda
          </span>
          {(['pri', 'par', 'dis', 'pnd'] as const).map(s => (
            <StatusBadge key={s} status={s} />
          ))}
          <span className="ml-auto text-[12.5px] text-ink-50 font-light">
            — No es el enfoque principal
          </span>
        </div>

        <p className="hidden md:block mt-3 text-[12.5px] text-ink-50 italic leading-[1.6] pl-1">
          * La disponibilidad de seguimiento / tracking se confirmará con el equipo operativo antes de publicar.
        </p>

        {/* ── Mobile accordion (hidden on md+) ──────────────── */}
        <div className="flex md:hidden flex-col gap-3" role="list">
          {SERVICE_KEYS.map(svcKey => {
            const isOpen = openKey === svcKey
            return (
              <div
                key={svcKey}
                role="listitem"
                className="bg-white border border-gray-200 rounded-[16px] overflow-hidden shadow-[var(--shadow-sm)]"
              >
                <button
                  type="button"
                  onClick={() => toggle(svcKey)}
                  aria-expanded={isOpen}
                  className="flex items-center justify-between w-full px-5 py-[18px] text-left
                             transition-colors hover:bg-gray-50"
                >
                  <span className="font-display font-black text-[17px] text-ink">
                    {SERVICE_NAMES_SHORT[svcKey]}
                  </span>
                  <span
                    className={[
                      'w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0',
                      'border transition-all duration-200',
                      isOpen
                        ? 'rotate-180 bg-brand-blue border-brand-blue'
                        : 'bg-gray-100 border-gray-200',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    <ChevronDown
                      className={`w-[11px] h-[11px] transition-colors ${isOpen ? 'text-white' : 'text-ink-50'}`}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-200">
                    {CMP_CATEGORIES.map(cat => (
                      <div key={cat.title}>
                        {/* Category label */}
                        <div
                          className="px-5 py-[11px] text-[11px] font-bold tracking-[0.10em] uppercase
                                     text-brand-orange bg-brand-orange-50 border-b border-brand-orange-100"
                        >
                          {cat.title}
                        </div>

                        {/* Rows in this category */}
                        {cat.rows.map(row => (
                          <div
                            key={row.criterio}
                            className="flex items-center justify-between gap-3 px-5 py-[14px]
                                       border-b border-gray-100 last:border-b-0"
                          >
                            <span className="text-[13.5px] text-ink font-medium flex-1 leading-[1.4]">
                              {row.criterio}
                            </span>
                            <StatusBadge status={row.values[svcKey]} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="md:hidden mt-3 text-[12px] text-ink-50 italic leading-[1.6]">
          * Seguimiento / tracking está por confirmar con el equipo operativo.
        </p>

      </div>
    </section>
  )
}
