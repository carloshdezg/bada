import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Clock } from 'lucide-react'
import Navbar         from '@/components/layout/Navbar'
import Footer         from '@/components/layout/Footer'
import { waUrl }      from '@/lib/whatsapp'
import BoltIcon       from '@/components/icons/BoltIcon'
import ClockIcon      from '@/components/icons/ClockIcon'
import PackageIcon    from '@/components/icons/PackageIcon'
import PhoneIcon      from '@/components/icons/PhoneIcon'
import TrendingUpIcon from '@/components/icons/TrendingUpIcon'
import MensajeriaFaq  from './_faq'

export const metadata: Metadata = {
  title: 'Mensajería — Servicios logísticos',
  description:
    'Servicio de mensajería con recolección programada para documentos y paquetes pequeños. ' +
    'Atención directa, sin call centers, con cobertura según zona.',
}

// ── Feature cards — Qué resuelve ──────────────────────────────────────
const FEATURES: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon:  <BoltIcon       primary="orange" size={32} />,
    title: 'Recolección programada',
    body:  'Coordinamos la recolección en tu ubicación para que no tengas que ir a una sucursal ni depender de ventanas de horario inciertas.',
  },
  {
    icon:  <ClockIcon      primary="orange" size={32} />,
    title: 'Agilidad en la entrega',
    body:  'Servicio enfocado en velocidad para documentos y paquetes que no pueden esperar. Los tiempos se confirman según destino y cobertura.',
  },
  {
    icon:  <PhoneIcon      primary="orange" size={32} />,
    title: 'Asesor directo asignado',
    body:  'Sin call centers ni tickets. Tu asesor BADA conoce tu operación y puede orientarte sobre cobertura, tiempos y cualquier detalle del servicio.',
  },
  {
    icon:  <TrendingUpIcon primary="orange" size={32} />,
    title: 'Escala según tu volumen',
    body:  'Funciona para envíos puntuales o como parte de una operación recurrente. Cuando el volumen crece, puedes escalar a Paquetería o Rutas Dedicadas.',
  },
]

// ── Qué incluye ───────────────────────────────────────────────────────
const INCLUYE_CONFIRMED = [
  'Recolección en punto acordado',
  'Manejo cuidadoso del envío',
  'Atención directa por asesor',
  'Comunicación sobre estatus de la operación',
]

// ── Cómo funciona ─────────────────────────────────────────────────────
const STEPS = [
  {
    num:    '01',
    title:  'Contacta a tu asesor',
    body:   'Habla directamente con tu asesor BADA para confirmar cobertura, horario disponible y detalles del envío.',
    accent: false,
  },
  {
    num:    '02',
    title:  'Prepara tu envío',
    body:   'Empaca y etiqueta tu documento o paquete. Tu asesor te indica si hay requerimientos adicionales según el tipo de envío.',
    accent: false,
  },
  {
    num:    '03',
    title:  'Recolectamos en tu ubicación',
    body:   'El equipo BADA recoge en el punto acordado en el horario pactado. Sin filas, sin traslados innecesarios de tu parte.',
    accent: true,
  },
  {
    num:    '04',
    title:  'Entrega al destinatario',
    body:   'El envío llega al destino según los tiempos estimados confirmados para tu ruta. Tu asesor puede darte estatus durante el proceso.',
    accent: false,
  },
]

// ── Cotizar checklist ─────────────────────────────────────────────────
const COTIZAR_CHECKS = [
  'Origen y destino del envío',
  'Tipo de contenido (documentos o paquete)',
  'Dimensiones y peso aproximado',
  'Fecha y horario ideal de recolección',
  'Frecuencia (envío único o recurrente)',
]

// ── Servicios relacionados ─────────────────────────────────────────────
const RELACIONADOS = [
  {
    id:    'paqueteria',
    name:  'Paquetería',
    tag:   'Paquetería LTL',
    desc:  'Para paquetes de hasta 30 kg con recolección programada y tiempos definidos.',
    href:  '/servicios/paqueteria',
    color: 'blue' as const,
  },
  {
    id:    'rutas-dedicadas',
    name:  'Rutas Dedicadas',
    tag:   'Unidades exclusivas',
    desc:  'Unidades asignadas a tu operación para rutas fijas o recurrentes.',
    href:  '/servicios/rutas-dedicadas',
    color: 'orange' as const,
  },
  {
    id:    'logistica',
    name:  'Logística',
    tag:   'Distribución especializada',
    desc:  'Preparación, documentación y distribución para operaciones más complejas.',
    href:  '/servicios/logistica',
    color: 'blue' as const,
  },
  {
    id:    'ecommerce',
    name:  'E-commerce',
    tag:   'Envíos para e-commerce',
    desc:  'Guías electrónicas, etiquetas y flujos especializados para tiendas en línea.',
    href:  '/servicios/envios-para-ecommerce',
    color: 'orange' as const,
  },
]

export default function MensajeriaPage() {
  return (
    <>
      <Navbar />

      <main className="pt-[68px]">

        {/* ── Hero — one-column editorial ───────────────────────────── */}
        <section className="relative overflow-hidden bg-white">

          {/* Orange radial — top right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[60px] -right-[80px] w-[620px] h-[620px] rounded-full"
            style={{ background: 'radial-gradient(circle, #FEF0EA 0%, transparent 70%)' }}
          />
          {/* Gray radial — bottom left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[40%] -left-[120px] w-[440px] h-[440px] rounded-full"
            style={{ background: 'radial-gradient(circle, #EFF2F5 0%, transparent 70%)' }}
          />

          <div className="max-w-site mx-auto px-5 sm:px-7 relative z-[2]">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="pt-10 mb-10">
              <ol className="flex items-center gap-[8px] list-none p-0 m-0
                             text-[12px] font-medium tracking-[0.02em] text-ink-50">
                <li>
                  <Link href="/" className="hover:text-ink transition-colors duration-200">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-20 select-none">/</li>
                <li>
                  <Link href="/servicios" className="hover:text-ink transition-colors duration-200">
                    Servicios
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-20 select-none">/</li>
                <li className="text-ink">Mensajería</li>
              </ol>
            </nav>

            {/* Editorial text block — constrained width for readability */}
            <div className="max-w-[820px] mb-12 lg:mb-14">

              {/* Eyebrow */}
              <div className="flex items-center gap-[10px] text-[12px] font-bold tracking-[0.15em] uppercase text-ink-50 mb-6">
                <div
                  className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0"
                  aria-hidden="true"
                />
                Mensajería · BADA
              </div>

              <h1
                className="font-display font-black leading-[1.04] tracking-[-0.025em] text-ink mb-6"
                style={{ fontSize: 'clamp(52px, 6.2vw, 80px)' }}
              >
                Documentos y paquetes pequeños,{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  cuando el tiempo importa.
                </em>
              </h1>

              <p className="text-[17px] text-ink-50 font-light leading-[1.75] mb-8 max-w-[560px]">
                Servicio con recolección programada para documentos y paquetes pequeños
                que requieren atención ágil, según cobertura disponible.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                {/* TODO: connect to /cotizar?servicio=mensajeria when the page is created */}
                <Link
                  href="#"
                  className="inline-flex items-center gap-[10px]
                             text-[15px] font-bold text-white bg-brand-orange
                             px-8 py-[15px] rounded-[14px]
                             shadow-[0_4px_20px_rgba(241,98,39,0.3)]
                             hover:bg-brand-orange-light hover:-translate-y-[2px]
                             hover:shadow-[0_8px_32px_rgba(241,98,39,0.4)]
                             transition-all duration-[250ms]"
                >
                  Cotizar servicio
                  <ArrowRight className="w-[15px] h-[15px]" aria-hidden="true" />
                </Link>

                <a
                  href={waUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hablar con un asesor por WhatsApp (abre en nueva pestaña)"
                  className="inline-flex items-center gap-[10px]
                             text-[15px] font-semibold text-ink-80
                             bg-gray-100 border-[1.5px] border-gray-200
                             px-7 py-[14px] rounded-[14px]
                             hover:bg-gray-200 hover:border-gray-300
                             transition-all duration-[250ms]"
                >
                  Hablar con un asesor
                </a>
              </div>
            </div>

            {/* Visual block — full editorial width, below copy */}
            <div className="relative pb-[72px]">

              {/* Gradient media area */}
              <div
                className="relative h-[360px] sm:h-[420px] rounded-[24px] overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #F16227 0%, #E8530F 35%, #14A3BE 100%)',
                }}
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at 25% 45%, rgba(255,255,255,0.12) 0%, transparent 55%)',
                  }}
                />
                <div className="absolute bottom-8 left-8 opacity-[0.18]">
                  <BoltIcon primary="blue" size={96} />
                </div>
              </div>

              {/* Floating service card — bottom-right overlay */}
              <div className="absolute bottom-0 right-4 sm:right-6 w-[260px] sm:w-[280px]">
                <div className="relative bg-white border-[1.5px] border-gray-200 rounded-[20px] p-6
                                shadow-[0_8px_32px_rgba(15,25,35,0.12)]">
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]"
                    style={{ background: 'linear-gradient(90deg, #F16227 0%, #14A3BE 100%)' }}
                    aria-hidden="true"
                  />
                  <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-ink-50 mb-4">
                    Mensajería · BADA
                  </p>
                  <div className="flex flex-col gap-[10px]">
                    {[
                      'Recolección programada',
                      'Documentos y paquetes pequeños',
                      'Asesor directo asignado',
                      'Sin call centers',
                    ].map(item => (
                      <div key={item} className="flex items-center gap-3">
                        <div
                          className="w-[6px] h-[6px] rounded-full bg-brand-orange flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-[13.5px] text-ink-80 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Quick Fit — 3 cards ────────────────────────────────────── */}
        <section className="py-[96px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">¿Es para ti?</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(32px, 4vw, 50px)', lineHeight: '1.06' }}
              >
                ¿Mensajería es lo que necesitas?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Card 1 — Ideal para (orange tint) */}
              <div className="relative bg-brand-orange-50 border-[1.5px] border-brand-orange-100
                              rounded-[20px] p-8 overflow-hidden">
                <div
                  className="font-display font-black leading-[1] text-ink
                             absolute top-4 right-5 text-[80px] opacity-[0.06]
                             select-none pointer-events-none"
                  aria-hidden="true"
                >
                  01
                </div>
                <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(241,98,39,0.10)]
                                flex items-center justify-center mb-5 flex-shrink-0">
                  <BoltIcon primary="orange" size={32} />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-4">
                  Ideal para
                </h3>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {[
                    'Documentos urgentes o confidenciales',
                    'Paquetes pequeños de entrega rápida',
                    'Negocios con envíos puntuales o frecuentes',
                    'Operaciones que necesitan recolección a domicilio',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-[10px]">
                      <Check className="w-[14px] h-[14px] text-brand-orange flex-shrink-0 mt-[3px]" aria-hidden="true" />
                      <span className="text-[14px] text-ink-80 font-light leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2 — Mejor si (teal tint) */}
              <div className="relative bg-brand-blue-50 border-[1.5px] border-brand-blue-100
                              rounded-[20px] p-8 overflow-hidden">
                <div
                  className="font-display font-black leading-[1] text-ink
                             absolute top-4 right-5 text-[80px] opacity-[0.06]
                             select-none pointer-events-none"
                  aria-hidden="true"
                >
                  02
                </div>
                <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(20,163,190,0.10)]
                                flex items-center justify-center mb-5 flex-shrink-0">
                  <ClockIcon primary="blue" size={32} />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-4">
                  Mejor si necesitas
                </h3>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {[
                    'Rapidez por encima del volumen',
                    'Asesor que conoce tu operación',
                    'Coordinación directa sin intermediarios',
                    'Solución clara para envíos puntuales',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-[10px]">
                      <Check className="w-[14px] h-[14px] text-brand-blue flex-shrink-0 mt-[3px]" aria-hidden="true" />
                      <span className="text-[14px] text-ink-80 font-light leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 3 — Considera otro servicio (warm cream) */}
              <div className="relative bg-[#F6EDDD] border-[1.5px] border-[#E8D9BF]
                              rounded-[20px] p-8 overflow-hidden">
                <div
                  className="font-display font-black leading-[1] text-ink
                             absolute top-4 right-5 text-[80px] opacity-[0.06]
                             select-none pointer-events-none"
                  aria-hidden="true"
                >
                  03
                </div>
                <div className="w-[52px] h-[52px] rounded-[14px] bg-[rgba(15,25,35,0.06)]
                                flex items-center justify-center mb-5 flex-shrink-0">
                  <PackageIcon primary="ink" size={32} />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-4">
                  Considera otro si
                </h3>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {[
                    'Tus paquetes pesan más de lo permitido',
                    'Necesitas una unidad exclusiva para tu ruta',
                    'Requieres distribución con documentación',
                    'Operas una tienda en línea con volumen',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-[10px]">
                      <span className="text-[14px] text-ink-50 flex-shrink-0 mt-[1px]" aria-hidden="true">—</span>
                      <span className="text-[14px] text-ink-80 font-light leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── Qué resuelve — 4 feature cards ─────────────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">Qué resuelve</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-4"
                style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.06' }}
              >
                Lo que hace diferente a Mensajería BADA
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[560px]">
                No solo transportamos — coordinamos, comunicamos y atendemos directamente.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FEATURES.map(feat => (
                <div
                  key={feat.title}
                  className="bg-white border border-gray-200 rounded-[20px] p-7
                             shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
                             transition-shadow duration-[250ms]"
                >
                  <div className="w-[52px] h-[52px] rounded-[14px] bg-brand-orange-50
                                  flex items-center justify-center mb-5 flex-shrink-0">
                    {feat.icon}
                  </div>
                  <h3 className="font-display font-black text-[18px] text-ink
                                 leading-[1.2] tracking-[-0.015em] mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-[14px] text-ink-50 font-light leading-[1.75]">
                    {feat.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Qué incluye ───────────────────────────────────────────── */}
        <section className="py-[96px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">Qué incluye</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.06' }}
              >
                Qué incluye y qué falta confirmar
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Confirmed checklist */}
              <div className="bg-gray-50 border border-gray-200 rounded-[20px] p-8">
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-ink-50 mb-5">
                  Confirmado
                </p>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {INCLUYE_CONFIRMED.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="w-[22px] h-[22px] rounded-full bg-green-100 border border-green-200
                                   flex items-center justify-center flex-shrink-0 mt-[1px]"
                        aria-hidden="true"
                      >
                        <Check className="w-[11px] h-[11px] text-green-600" />
                      </span>
                      <span className="text-[14px] text-ink-80 font-medium leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pending card — dashed amber treatment */}
              <div className="rounded-[20px] p-8 border-2 border-dashed border-amber-300 bg-amber-50">
                <div className="flex items-center gap-3 mb-5">
                  <Clock className="w-[18px] h-[18px] text-amber-600 flex-shrink-0" aria-hidden="true" />
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-amber-700">
                    Por confirmar
                  </p>
                </div>
                <p className="text-[14px] text-amber-800 font-light leading-[1.75] mb-5">
                  Los siguientes elementos están pendientes de confirmación con el equipo operativo
                  y se publicarán una vez verificados:
                </p>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {[
                    'Seguimiento / tracking del envío',
                    'Comprobante de entrega',
                    'Límites exactos de peso y dimensiones',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="w-[22px] h-[22px] rounded-full border-2 border-dashed border-amber-400
                                   flex items-center justify-center flex-shrink-0 mt-[1px]"
                        aria-hidden="true"
                      >
                        <Clock className="w-[10px] h-[10px] text-amber-500" />
                      </span>
                      <span className="text-[14px] text-amber-800 font-medium leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── Cómo funciona — 4 steps ─────────────────────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">Proceso</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-4"
                style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.06' }}
              >
                Cómo funciona el servicio
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[500px]">
                Un proceso simple diseñado para que no tengas que preocuparte por la logística.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map(step => (
                <div
                  key={step.num}
                  className={[
                    'relative rounded-[20px] p-7 overflow-hidden',
                    step.accent
                      ? 'bg-brand-orange border-[1.5px] border-brand-orange'
                      : 'bg-white border border-gray-200 shadow-[var(--shadow-sm)]',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'font-display font-black leading-[1] absolute -top-2 right-4',
                      'text-[80px] opacity-[0.07] select-none pointer-events-none',
                      step.accent ? 'text-white' : 'text-ink',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {step.num}
                  </div>

                  <p
                    className={`text-[11px] font-bold tracking-[0.12em] uppercase mb-3 ${
                      step.accent ? 'text-white/70' : 'text-brand-orange'
                    }`}
                  >
                    Paso {step.num}
                  </p>
                  <h3
                    className={`font-display font-black text-[19px] leading-[1.15] tracking-[-0.02em] mb-3 ${
                      step.accent ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-[14px] font-light leading-[1.75] ${
                      step.accent ? 'text-white/80' : 'text-ink-50'
                    }`}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Información para cotizar ────────────────────────────────── */}
        <section className="py-[96px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">Cotizar</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-4"
                style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.06' }}
              >
                Información que necesitamos para cotizar
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[540px]">
                Ten estos datos a la mano para que tu asesor pueda prepararte una propuesta rápida.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

              {/* Checklist */}
              <div className="bg-gray-50 border border-gray-200 rounded-[20px] p-8">
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {COTIZAR_CHECKS.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="w-[22px] h-[22px] rounded-full bg-brand-orange-50 border border-brand-orange-100
                                   flex items-center justify-center flex-shrink-0 mt-[1px]"
                        aria-hidden="true"
                      >
                        <Check className="w-[11px] h-[11px] text-brand-orange" />
                      </span>
                      <span className="text-[14px] text-ink-80 font-medium leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sticky CTA card */}
              <div className="lg:sticky lg:top-[88px]">
                <div className="bg-brand-orange rounded-[20px] p-8
                                shadow-[0_8px_40px_rgba(241,98,39,0.3)]">
                  <div
                    className="w-[52px] h-[52px] rounded-[14px] bg-white/20
                                flex items-center justify-center mb-5"
                    aria-hidden="true"
                  >
                    <BoltIcon primary="blue" size={32} />
                  </div>
                  <h3 className="font-display font-black text-[22px] text-white
                                 leading-[1.15] tracking-[-0.02em] mb-3">
                    ¿Listo para cotizar?
                  </h3>
                  <p className="text-[14px] text-white/80 font-light leading-[1.75] mb-6">
                    Usa el formulario de cotización o habla directamente con tu asesor.
                  </p>
                  <div className="flex flex-col gap-3">
                    {/* TODO: connect to /cotizar?servicio=mensajeria when the page is created */}
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center gap-[10px] w-full
                                 text-[15px] font-bold text-brand-orange bg-white
                                 px-6 py-4 rounded-[12px]
                                 hover:bg-gray-50 hover:-translate-y-px
                                 hover:shadow-[0_4px_16px_rgba(15,25,35,0.14)]
                                 transition-all duration-[220ms]"
                    >
                      Cotizar servicio
                      <ArrowRight className="w-[14px] h-[14px]" aria-hidden="true" />
                    </Link>
                    <a
                      href={waUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Hablar con un asesor por WhatsApp (abre en nueva pestaña)"
                      className="inline-flex items-center justify-center gap-[10px] w-full
                                 text-[15px] font-semibold text-[#ffffff]
                                 px-6 py-[15px] rounded-[12px]
                                 border-2 border-[rgba(255,255,255,.45)]
                                 hover:bg-[rgba(255,255,255,.10)] hover:border-[rgba(255,255,255,.65)]
                                 transition-all duration-[220ms]"
                    >
                      Hablar con un asesor
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">Preguntas frecuentes</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-4"
                style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.06' }}
              >
                Respuestas sobre Mensajería
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[500px]">
                Si no encuentras lo que necesitas, tu asesor puede orientarte directamente.
              </p>
            </div>

            <div className="max-w-[720px]">
              <MensajeriaFaq />
            </div>
          </div>
        </section>

        {/* ── Servicios relacionados ────────────────────────────────── */}
        <section className="py-[96px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-10">
              <span className="tag">También disponemos de</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '1.06' }}
              >
                Otros servicios logísticos
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {RELACIONADOS.map((svc, i) => {
                const isOrange = svc.color === 'orange'
                return (
                  <Link
                    key={svc.id}
                    href={svc.href}
                    className={[
                      'group relative rounded-[20px] flex flex-col p-6 overflow-hidden',
                      'border-[1.5px] transition-all duration-[250ms]',
                      'hover:-translate-y-[5px] hover:shadow-[0_12px_48px_rgba(15,25,35,0.14)]',
                      isOrange
                        ? 'bg-brand-orange-50 border-brand-orange-100'
                        : 'bg-brand-blue-50 border-brand-blue-100',
                    ].join(' ')}
                  >
                    <div
                      className="font-display font-black leading-[1] text-ink
                                 absolute top-3 right-4 text-[60px] opacity-[0.06]
                                 select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <p className={`text-[11px] font-bold tracking-[0.1em] uppercase mb-2 ${
                      isOrange ? 'text-brand-orange' : 'text-brand-blue'
                    }`}>
                      {svc.tag}
                    </p>
                    <h3 className="font-display font-black text-[20px] text-ink
                                   leading-[1.15] tracking-[-0.02em] mb-3">
                      {svc.name}
                    </h3>
                    <p className="text-[14px] text-ink-80 font-light leading-[1.7] mb-5 flex-1">
                      {svc.desc}
                    </p>
                    <div className="inline-flex items-center gap-[6px] text-[14px] font-bold text-ink
                                    transition-all duration-200 group-hover:gap-[10px]">
                      Ver servicio
                      <ArrowRight className={`w-[13px] h-[13px] ${isOrange ? 'text-brand-orange' : 'text-brand-blue'}`} aria-hidden="true" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Dark CTA — matches hub and homepage pattern ──────────── */}
        <section className="py-[120px] bg-ink relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(241,98,39,.10) 0%, transparent 50%, rgba(20,163,190,.08) 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[80px] top-1/2 -translate-y-1/2
                       w-[460px] h-[460px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.1)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[20px] top-1/2 -translate-y-1/2
                       w-[280px] h-[280px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.06)' }}
          />

          <div className="max-w-[640px] mx-auto px-5 sm:px-7 text-center relative z-[1]">
            <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.13em] uppercase text-white/45 mb-6">
              <div className="w-[24px] h-[2px] bg-white/35 rounded-sm" aria-hidden="true" />
              ¿Listo para empezar?
            </div>

            <h2
              className="font-display font-black text-white tracking-[-0.025em] leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(38px, 5vw, 62px)' }}
            >
              Cotiza tu primer{' '}
              <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                envío
              </em>{' '}
              hoy
            </h2>

            <p className="text-[16px] text-white/55 font-light leading-[1.75] mb-12 max-w-[480px] mx-auto">
              Habla directamente con un asesor BADA. Sin call centers, sin esperas.
              Solo cuéntanos qué necesitas enviar.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* TODO: connect to /cotizar?servicio=mensajeria when the page is created */}
              <Link
                href="#"
                className="inline-flex items-center gap-[10px]
                           text-[15px] font-bold text-brand-orange bg-white
                           px-[34px] py-4 rounded-[14px]
                           shadow-[0_4px_24px_rgba(15,25,35,0.18)]
                           hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(15,25,35,0.22)]
                           transition-all duration-[250ms]"
              >
                Cotizar servicio
                <ArrowRight className="w-[15px] h-[15px]" aria-hidden="true" />
              </Link>

              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hablar con un asesor por WhatsApp (abre en nueva pestaña)"
                className="inline-flex items-center gap-[10px]
                           text-[15px] font-bold text-[#ffffff]
                           px-[34px] py-4 rounded-[14px]
                           border-2 border-[rgba(255,255,255,.45)]
                           hover:bg-[rgba(255,255,255,.10)] hover:border-[rgba(255,255,255,.65)] hover:-translate-y-px
                           transition-all duration-[250ms]"
              >
                Hablar con un asesor
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
