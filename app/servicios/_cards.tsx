'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BoltIcon         from '@/components/icons/BoltIcon'
import PackageIcon      from '@/components/icons/PackageIcon'
import TruckIcon        from '@/components/icons/TruckIcon'
import TrendingUpIcon   from '@/components/icons/TrendingUpIcon'
import ShoppingCartIcon from '@/components/icons/ShoppingCartIcon'

interface Service {
  id:        string
  name:      string
  tag:       string
  tagKey:    string
  desc:      string
  idealPara: string
  mejorSi:   string
  href:      string
}

const SERVICES: Service[] = [
  {
    id: 'mensajeria', name: 'Mensajería', tag: 'Envío urgente', tagKey: 'mensajeria',
    href: '/servicios/mensajeria',
    desc: 'Servicio con recolección programada para documentos y paquetes pequeños que requieren una entrega ágil, según cobertura disponible.',
    idealPara: 'Envíos urgentes de documentos o paquetes pequeños.',
    mejorSi:   'Rapidez, atención directa y una solución clara para envíos puntuales.',
  },
  {
    id: 'paqueteria', name: 'Paquetería', tag: 'Paquetería LTL', tagKey: 'paqueteria',
    href: '/servicios/paqueteria',
    desc: 'Servicio LTL con recolección programada para paquetes de hasta 30 kg, con opción de kilos adicionales. Entregas de 24 a 72 horas, de acuerdo con la cobertura disponible.',
    idealPara: 'Empresas que envían paquetes de forma recurrente o necesitan mover volumen medio.',
    mejorSi:   'Una solución estructurada con recolección programada y tiempos definidos según cobertura.',
  },
  {
    id: 'rutas-dedicadas', name: 'Rutas Dedicadas', tag: 'Unidades exclusivas', tagKey: 'rutas',
    href: '/servicios/rutas-dedicadas',
    desc: 'Unidades exclusivas para operaciones que requieren viajes directos, horarios definidos y mayor control sobre la ruta.',
    idealPara: 'Empresas con rutas fijas, entregas recurrentes o necesidades operativas específicas.',
    mejorSi:   'Una unidad asignada a tu operación con mayor control sobre tiempos y trayectos.',
  },
  {
    id: 'logistica', name: 'Logística', tag: 'Distribución especializada', tagKey: 'logistica',
    href: '/servicios/logistica',
    desc: 'Distribución especializada para operaciones que requieren documentación, preparación, maquila de envíos y mayor trazabilidad operativa.',
    idealPara: 'Operaciones que necesitan más que traslado: preparación, documentación, distribución y seguimiento.',
    mejorSi:   'Gestionar envíos con trazabilidad documental y procesos logísticos más completos.',
  },
  {
    id: 'ecommerce', name: 'Envíos para e-commerce', tag: 'E-commerce', tagKey: 'ecommerce',
    href: '/servicios/envios-para-ecommerce',
    desc: 'Solución para tiendas en línea que necesitan documentar, preparar y organizar sus envíos mediante guías electrónicas y etiquetas de servicio.',
    idealPara: 'Tiendas online, negocios digitales y operaciones que preparan pedidos para envío.',
    mejorSi:   'Generar guías, preparar etiquetas y tener mayor orden en el flujo de tus envíos.',
  },
]

const NEED_TAGS = [
  { id: 'mensajeria', label: 'Envío urgente' },
  { id: 'paqueteria', label: 'Envío de paquetes' },
  { id: 'rutas',      label: 'Ruta dedicada / recurrente' },
  { id: 'logistica',  label: 'Operación logística especializada' },
  { id: 'ecommerce',  label: 'Envíos para e-commerce' },
]

function getIcon(id: string, primary: 'orange' | 'blue') {
  if (id === 'mensajeria')      return <BoltIcon         primary={primary} size={32} />
  if (id === 'paqueteria')      return <PackageIcon      primary={primary} size={32} />
  if (id === 'rutas-dedicadas') return <TruckIcon        primary={primary} size={32} />
  if (id === 'logistica')       return <TrendingUpIcon   primary={primary} size={32} />
  return                               <ShoppingCartIcon primary={primary} size={32} />
}

interface CardProps {
  service:     Service
  index:       number
  highlighted: boolean
}

function ServiceCard({ service, index, highlighted }: CardProps) {
  // Alternate orange / teal across the 3+2 grid for visual rhythm
  const isOrange = index % 2 === 0
  const cardNum  = String(index + 1).padStart(2, '0')
  const primary  = isOrange ? ('orange' as const) : ('blue' as const)

  const wrapperBase = isOrange
    ? 'bg-brand-orange-50 border-[1.5px] border-brand-orange-100'
    : 'bg-brand-blue-50   border-[1.5px] border-brand-blue-100'

  const wrapperHighlight = highlighted
    ? isOrange
      ? 'shadow-[0_0_0_4px_rgba(241,98,39,0.12),0_12px_48px_rgba(15,25,35,0.12)] -translate-y-[5px]'
      : 'shadow-[0_0_0_4px_rgba(20,163,190,0.12),0_12px_48px_rgba(15,25,35,0.12)] -translate-y-[5px]'
    : ''

  const iconBg     = isOrange ? 'bg-[rgba(241,98,39,0.10)]'  : 'bg-[rgba(20,163,190,0.10)]'
  const accentText = isOrange ? 'text-brand-orange'          : 'text-brand-blue'

  return (
    <Link
      id={`svc-card-${service.id}`}
      href={service.href}
      className={[
        'group relative rounded-[20px] flex flex-col overflow-hidden',
        'transition-all duration-[250ms]',
        'hover:-translate-y-[5px] hover:shadow-[0_12px_48px_rgba(15,25,35,0.14)]',
        wrapperBase,
        wrapperHighlight,
      ].join(' ')}
    >
      {/* Ghost number — background watermark */}
      <div
        className="font-display font-black leading-[1] text-ink
                   absolute top-4 right-5 text-[80px] opacity-[0.06]
                   select-none pointer-events-none"
        aria-hidden="true"
      >
        {cardNum}
      </div>

      <div className="p-[38px_32px] flex flex-col flex-1">

        {/* Icon badge */}
        <div
          className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5 flex-shrink-0 ${iconBg}`}
          aria-hidden="true"
        >
          {getIcon(service.id, primary)}
        </div>

        {/* Tag eyebrow */}
        <p className={`text-[11px] font-bold tracking-[0.1em] uppercase mb-2 ${accentText}`}>
          {service.tag}
        </p>

        {/* Service name */}
        <h3 className="font-display font-black text-[26px] text-ink
                       leading-[1.1] tracking-[-0.02em] mb-3">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-[14px] text-ink-50 leading-[1.7] mb-6">
          {service.desc}
        </p>

        {/* Meta rows */}
        <div className="flex flex-col gap-4 mb-7 flex-1">
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.09em] uppercase text-ink-50 mb-[5px]">
              Ideal para
            </p>
            <p className="text-[13.5px] text-ink-80 font-light leading-[1.55]">{service.idealPara}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.09em] uppercase text-ink-50 mb-[5px]">
              Mejor si necesitas
            </p>
            <p className="text-[13.5px] text-ink-80 font-light leading-[1.55]">{service.mejorSi}</p>
          </div>
        </div>

        {/* CTA — inline text link style matching homepage cards */}
        <div
          className={`inline-flex items-center gap-[6px] text-[13.5px] font-bold
                      transition-all duration-200 group-hover:gap-[10px] ${accentText}`}
        >
          Ver detalles
          <ArrowRight className="w-[13px] h-[13px]" aria-hidden="true" />
        </div>

      </div>
    </Link>
  )
}

export default function ServiciosCards() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  function handleTagClick(tagId: string) {
    const isDeselecting = activeTag === tagId
    setActiveTag(isDeselecting ? null : tagId)
    if (!isDeselecting) {
      const svc = SERVICES.find(s => s.tagKey === tagId)
      if (svc) {
        setTimeout(() => {
          document.getElementById(`svc-card-${svc.id}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          })
        }, 40)
      }
    }
  }

  const row1 = SERVICES.slice(0, 3)
  const row2 = SERVICES.slice(3, 5)

  return (
    <>
      {/* ── Selector by need ─────────────────────────────────────── */}
      <section className="py-[68px] bg-white border-b border-gray-200">
        <div className="max-w-site mx-auto px-5 sm:px-7">
          <span className="tag">Encuentra tu servicio</span>
          <h2
            className="font-display font-black text-ink tracking-[-0.025em] mb-3"
            style={{ fontSize: 'clamp(34px, 4vw, 52px)' }}
          >
            ¿Qué necesitas resolver?
          </h2>
          <p className="text-[15px] text-ink-50 font-light mb-8 max-w-[560px]">
            Elige la necesidad que mejor describe tu operación y encuentra el servicio más adecuado.
          </p>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrar por necesidad">
            {NEED_TAGS.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagClick(tag.id)}
                aria-pressed={activeTag === tag.id}
                className={[
                  'inline-flex items-center h-[42px] px-5 rounded-full text-[14px]',
                  'border transition-all duration-[180ms] cursor-pointer whitespace-nowrap',
                  activeTag === tag.id
                    ? 'bg-brand-orange-50 border-brand-orange/40 text-brand-orange font-semibold shadow-[0_0_0_3px_rgba(241,98,39,0.12)]'
                    : 'bg-gray-50 border-gray-200 text-ink-80 font-normal hover:bg-brand-orange-50 hover:border-brand-orange/30 hover:text-brand-orange',
                ].join(' ')}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service cards ─────────────────────────────────────────── */}
      <section className="py-[96px] bg-gray-50 border-b border-gray-200">
        <div className="max-w-site mx-auto px-5 sm:px-7">
          <div className="mb-14">
            <span className="tag">Nuestros servicios</span>
            <h2
              className="font-display font-black text-ink tracking-[-0.025em] mb-3"
              style={{ fontSize: 'clamp(38px, 4.5vw, 58px)' }}
            >
              Soluciones para cada tipo de operación
            </h2>
            <p className="text-[15px] text-ink-50 font-light leading-[1.75]">
              Cada servicio está diseñado para responder a una necesidad específica. Selecciona el que
              mejor se adapte a tu operación.
            </p>
          </div>

          {/* Row 1 — 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {row1.map((svc, i) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                index={i}
                highlighted={activeTag === svc.tagKey}
              />
            ))}
          </div>

          {/* Row 2 — 2 cards, centered on desktop */}
          <div className="w-full md:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {row2.map((svc, i) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                index={i + 3}
                highlighted={activeTag === svc.tagKey}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
