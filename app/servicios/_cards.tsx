'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BoltIcon         from '@/components/icons/BoltIcon'
import PackageIcon      from '@/components/icons/PackageIcon'
import TruckIcon        from '@/components/icons/TruckIcon'
import TrendingUpIcon   from '@/components/icons/TrendingUpIcon'
import ShoppingCartIcon from '@/components/icons/ShoppingCartIcon'

type Accent = 'orange' | 'teal'

interface Service {
  id:        string
  name:      string
  accent:    Accent
  tagKey:    string
  desc:      string
  idealPara: string
  mejorSi:   string
  // TODO: connect detail pages when /servicios/[slug] routes are created
  href: string
}

const SERVICES: Service[] = [
  {
    id: 'mensajeria', name: 'Mensajería', accent: 'orange', tagKey: 'mensajeria',
    href: '/servicios/mensajeria',
    desc: 'Servicio con recolección programada para documentos y paquetes pequeños que requieren una entrega ágil, según cobertura disponible.',
    idealPara: 'Envíos urgentes de documentos o paquetes pequeños.',
    mejorSi:   'Rapidez, atención directa y una solución clara para envíos puntuales.',
  },
  {
    id: 'paqueteria', name: 'Paquetería', accent: 'teal', tagKey: 'paqueteria',
    href: '/servicios/paqueteria',
    desc: 'Servicio LTL con recolección programada para paquetes de hasta 30 kg, con opción de kilos adicionales. Entregas de 24 a 72 horas, de acuerdo con la cobertura disponible.',
    idealPara: 'Empresas que envían paquetes de forma recurrente o necesitan mover volumen medio.',
    mejorSi:   'Una solución estructurada con recolección programada y tiempos definidos según cobertura.',
  },
  {
    id: 'rutas-dedicadas', name: 'Rutas Dedicadas', accent: 'teal', tagKey: 'rutas',
    href: '/servicios/rutas-dedicadas',
    desc: 'Unidades exclusivas para operaciones que requieren viajes directos, horarios definidos y mayor control sobre la ruta.',
    idealPara: 'Empresas con rutas fijas, entregas recurrentes o necesidades operativas específicas.',
    mejorSi:   'Una unidad asignada a tu operación con mayor control sobre tiempos y trayectos.',
  },
  {
    id: 'logistica', name: 'Logística', accent: 'teal', tagKey: 'logistica',
    href: '/servicios/logistica',
    desc: 'Distribución especializada para operaciones que requieren documentación, preparación, maquila de envíos y mayor trazabilidad operativa.',
    idealPara: 'Operaciones que necesitan más que traslado: preparación, documentación, distribución y seguimiento.',
    mejorSi:   'Gestionar envíos con trazabilidad documental y procesos logísticos más completos.',
  },
  {
    id: 'ecommerce', name: 'Envíos para e-commerce', accent: 'teal', tagKey: 'ecommerce',
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

function getIcon(id: string, accent: Accent) {
  const primary = accent === 'orange' ? ('orange' as const) : ('blue' as const)
  if (id === 'mensajeria')      return <BoltIcon         primary={primary} size={38} />
  if (id === 'paqueteria')      return <PackageIcon      primary={primary} size={38} />
  if (id === 'rutas-dedicadas') return <TruckIcon        primary={primary} size={38} />
  if (id === 'logistica')       return <TrendingUpIcon   primary={primary} size={38} />
  return                               <ShoppingCartIcon primary={primary} size={38} />
}

interface CardProps {
  service:     Service
  highlighted: boolean
}

function ServiceCard({ service, highlighted }: CardProps) {
  const isOrange = service.accent === 'orange'

  const borderClass = highlighted
    ? isOrange
      ? 'border-brand-orange shadow-[0_0_0_4px_rgba(241,98,39,0.10),var(--shadow-lg)]'
      : 'border-brand-blue   shadow-[0_0_0_4px_rgba(20,163,190,0.10),var(--shadow-lg)]'
    : isOrange
      ? 'border-gray-200 shadow-[var(--shadow-sm)] hover:border-brand-orange hover:shadow-[var(--shadow-lg)]'
      : 'border-gray-200 shadow-[var(--shadow-sm)] hover:border-brand-blue   hover:shadow-[var(--shadow-lg)]'

  const barClass = highlighted
    ? isOrange ? 'bg-brand-orange' : 'bg-brand-blue'
    : isOrange
      ? 'bg-gray-200 group-hover:bg-brand-orange'
      : 'bg-gray-200 group-hover:bg-brand-blue'

  const ctaClass = isOrange
    ? 'border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white'
    : 'border-brand-blue   text-brand-blue   hover:bg-brand-blue   hover:text-white'

  const iconBgClass = isOrange
    ? 'bg-brand-orange-50 border border-brand-orange-100'
    : 'bg-brand-blue-50   border border-brand-blue-100'

  return (
    <div
      id={`svc-card-${service.id}`}
      className={`group relative bg-white rounded-[20px] flex flex-col border transition-all duration-[220ms] hover:-translate-y-[5px] ${borderClass}`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px] transition-colors duration-200 ${barClass}`}
        aria-hidden="true"
      />

      <div className="p-8 flex flex-col flex-1 pt-[34px]">
        {/* Icon container */}
        <div
          className={`w-[62px] h-[62px] rounded-[16px] flex items-center justify-center mb-[24px] flex-shrink-0 ${iconBgClass}`}
          aria-hidden="true"
        >
          {getIcon(service.id, service.accent)}
        </div>

        {/* Service name */}
        <h3 className="font-display font-bold text-[22px] text-ink tracking-[-0.02em] leading-[1.15] mb-3">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-[13.5px] text-ink-80 leading-[1.7] font-light mb-6">
          {service.desc}
        </p>

        <div className="h-px bg-gray-200 mb-5" aria-hidden="true" />

        {/* Meta rows */}
        <div className="flex flex-col gap-[18px] mb-7 flex-1">
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

        {/* CTA — detail page link */}
        <Link
          href={service.href}
          className={`flex items-center justify-center gap-[10px] w-full py-[14px] border-[1.5px] rounded-[10px] text-[14px] font-bold transition-all duration-[250ms] [&>svg]:transition-transform [&>svg]:duration-[200ms] hover:[&>svg]:translate-x-[3px] ${ctaClass}`}
        >
          Ver detalles
          <ArrowRight className="w-[14px] h-[14px]" aria-hidden="true" />
        </Link>
      </div>
    </div>
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
            className="font-display font-bold text-ink tracking-[-0.02em] mb-3"
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
              className="font-display font-bold text-ink tracking-[-0.02em] mb-3"
              style={{ fontSize: 'clamp(34px, 4vw, 52px)' }}
            >
              Soluciones para cada tipo de operación
            </h2>
            <p className="text-[15px] text-ink-50 font-light">
              Cada servicio está diseñado para responder a una necesidad específica. Selecciona el que
              mejor se adapte a tu operación.
            </p>
          </div>

          {/* Row 1 — 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {row1.map(svc => (
              <ServiceCard
                key={svc.id}
                service={svc}
                highlighted={activeTag === svc.tagKey}
              />
            ))}
          </div>

          {/* Row 2 — 2 cards, centered on desktop */}
          <div className="w-full md:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {row2.map(svc => (
              <ServiceCard
                key={svc.id}
                service={svc}
                highlighted={activeTag === svc.tagKey}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
