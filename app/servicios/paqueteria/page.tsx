import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'
import Navbar         from '@/components/layout/Navbar'
import Footer         from '@/components/layout/Footer'
import { waUrl }      from '@/lib/whatsapp'
import PackageIcon    from '@/components/icons/PackageIcon'
import MapPinIcon     from '@/components/icons/MapPinIcon'
import PhoneIcon      from '@/components/icons/PhoneIcon'
import ClockIcon      from '@/components/icons/ClockIcon'
import TrendingUpIcon from '@/components/icons/TrendingUpIcon'
import PaqueteriaFaq  from './_faq'

export const metadata: Metadata = {
  title: 'Paquetería — Servicios logísticos',
  description:
    'Servicio de paquetería con recolección programada para cajas, paquetes y mercancía ligera o mediana. ' +
    'Cotización basada en peso real o peso volumétrico, según cobertura disponible.',
}

// ── Feature cards — Qué resuelve ──────────────────────────────────────
const FEATURES: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon:  <TrendingUpIcon primary="orange" size={32} />,
    title: 'Peso cobrable claro',
    body:  'El cálculo considera peso real y peso volumétrico para definir el peso cobrable de forma transparente.',
  },
  {
    icon:  <MapPinIcon     primary="orange" size={32} />,
    title: 'Cobertura validada',
    body:  'La ruta se valida contra la cobertura disponible antes de mostrar una cotización automática.',
  },
  {
    icon:  <PackageIcon    primary="orange" size={32} />,
    title: 'Paquetes con mayor capacidad',
    body:  'Una opción más adecuada para cajas, bultos y mercancía ligera o mediana que excede la mensajería.',
  },
  {
    icon:  <PhoneIcon      primary="orange" size={32} />,
    title: 'Asesor cuando se necesita',
    body:  'Si el envío excede límites, la ruta no está disponible o requiere revisión, un asesor puede ayudarte a validar la mejor opción.',
  },
]

// ── Qué incluye — confirmado ──────────────────────────────────────────
const INCLUYE_CONFIRMED = [
  'Recolección programada según cobertura.',
  'Envío de paquetes, cajas y bultos permitidos.',
  'Cálculo por peso real o volumétrico.',
  'Aplicación de peso cobrable según regla vigente.',
  'Cobertura local o foránea según ruta disponible.',
  'Cotización estimada con IVA incluido.',
  'Opción de asesor cuando la ruta o el envío requiere validación.',
]

// ── Qué incluye — requiere validación ────────────────────────────────
const INCLUYE_VALIDACION = [
  'Rutas no disponibles para cotización automática.',
  'Paquetes que excedan peso o dimensiones máximas.',
  'Zonas marcadas como "requiere asesor" en la cobertura administrable.',
  'Envíos con condiciones especiales de manejo.',
  'Volúmenes altos o necesidades recurrentes.',
]

// ── Cotizar checklist ─────────────────────────────────────────────────
const COTIZAR_CHECKS = [
  'Largo, ancho y alto en centímetros.',
  'Peso real en kilogramos.',
  'Código postal de origen.',
  'Código postal de destino.',
  'Tipo de servicio: Paquetería.',
  'Validación de ruta disponible.',
  'Confirmación si el envío requiere asesor.',
]

// ── Servicios relacionados ─────────────────────────────────────────────
const RELACIONADOS = [
  {
    id:    'mensajeria',
    name:  'Mensajería',
    tag:   'Mensajería express',
    desc:  'Documentos y paquetes pequeños que requieren atención ágil.',
    href:  '/servicios/mensajeria',
    color: 'orange' as const,
  },
  {
    id:    'rutas-dedicadas',
    name:  'Rutas Dedicadas',
    tag:   'Unidades exclusivas',
    desc:  'Unidades o rutas exclusivas para operaciones recurrentes o especiales.',
    href:  '/servicios/rutas-dedicadas',
    color: 'blue' as const,
  },
  {
    id:    'logistica',
    name:  'Logística',
    tag:   'Distribución especializada',
    desc:  'Soluciones operativas a la medida para negocios con necesidades más complejas.',
    href:  '/servicios/logistica',
    color: 'orange' as const,
  },
  {
    id:    'ecommerce',
    name:  'E-commerce',
    tag:   'Envíos para e-commerce',
    desc:  'Flujo pensado para tiendas, ventas online y envíos frecuentes.',
    href:  '/servicios',   // TODO: change to /servicios/ecommerce when page exists
    color: 'blue' as const,
  },
]

export default function PaqueteriaPage() {
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
                <li className="text-ink">Paquetería</li>
              </ol>
            </nav>

            {/* Editorial text block */}
            <div className="max-w-[820px] mb-12 lg:mb-14">

              {/* Eyebrow */}
              <div className="flex items-center gap-[10px] text-[12px] font-bold tracking-[0.15em] uppercase text-ink-50 mb-6">
                <div
                  className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0"
                  aria-hidden="true"
                />
                Paquetería · BADA
              </div>

              <h1
                className="font-display font-black leading-[1.04] tracking-[-0.025em] text-ink mb-6"
                style={{ fontSize: 'clamp(52px, 6.2vw, 80px)' }}
              >
                Paquetes y cajas,{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  con el peso claro
                  <br />desde el inicio.
                </em>
              </h1>

              <p className="text-[17px] text-ink-50 font-light leading-[1.75] mb-8 max-w-[560px]">
                Servicio de paquetería para enviar cajas, paquetes y mercancía ligera o mediana,
                con recolección programada y cotización basada en peso real o peso volumétrico,
                según cobertura disponible.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/cotizar?servicio=paqueteria"
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

            {/* Visual block */}
            <div className="relative pb-[72px]">

              {/* Gradient media area */}
              <div
                className="relative h-[360px] sm:h-[420px] rounded-[24px] overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #E8530F 0%, #F16227 40%, #14A3BE 100%)',
                }}
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at 70% 35%, rgba(255,255,255,0.10) 0%, transparent 55%)',
                  }}
                />
                <div className="absolute bottom-8 left-8 opacity-[0.18]">
                  <PackageIcon primary="blue" size={96} />
                </div>
              </div>

              {/* Floating service card */}
              <div className="absolute bottom-0 right-4 sm:right-6 w-[260px] sm:w-[280px]">
                <div className="relative bg-white border-[1.5px] border-gray-200 rounded-[20px] p-6
                                shadow-[0_8px_32px_rgba(15,25,35,0.12)]">
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]"
                    style={{ background: 'linear-gradient(90deg, #E8530F 0%, #14A3BE 100%)' }}
                    aria-hidden="true"
                  />
                  <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-ink-50 mb-4">
                    Paquetería · BADA
                  </p>
                  <div className="flex flex-col gap-[10px]">
                    {[
                      'Cajas y paquetes',
                      'Peso real o volumétrico',
                      'Cobertura local o foránea',
                      'Asesor si requiere validación',
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
              <span className="tag">Encuentra tu servicio</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(32px, 4vw, 50px)', lineHeight: '1.06' }}
              >
                ¿Paquetería es lo que necesitas?
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
                  <PackageIcon primary="orange" size={32} />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Ideal para
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.6] mb-4">
                  Cajas, paquetes y bultos de mayor volumen que un envío de mensajería.
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {[
                    'Paquetes de productos o mercancía.',
                    'Envíos con peso o volumen moderado.',
                    'Negocios que necesitan mover paquetes de forma recurrente.',
                    'Operaciones que requieren recolección programada.',
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
                  <TrendingUpIcon primary="blue" size={32} />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Mejor si necesitas
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.6] mb-4">
                  Un servicio para mover paquetes con cálculo claro de peso cobrable y validación de cobertura.
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {[
                    'Cotizar por peso real o volumétrico.',
                    'Validar cobertura antes de enviar.',
                    'Enviar paquetes a rutas locales o foráneas.',
                    'Tener una opción más robusta que mensajería.',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-[10px]">
                      <Check className="w-[14px] h-[14px] text-brand-blue flex-shrink-0 mt-[3px]" aria-hidden="true" />
                      <span className="text-[14px] text-ink-80 font-light leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 3 — Considera otro (warm cream) */}
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
                  <ClockIcon primary="ink" size={32} />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Considera otro si
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.6] mb-4">
                  Tu operación requiere una solución más especializada.
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  <li className="flex items-start gap-[10px]">
                    <span className="text-[14px] text-ink-50 flex-shrink-0 mt-[1px]" aria-hidden="true">—</span>
                    <span className="text-[14px] text-ink-80 font-light leading-[1.6]">
                      Si necesitas mover documentos o paquetes pequeños urgentes, revisa{' '}
                      <Link href="/servicios/mensajeria" className="underline underline-offset-2 hover:text-ink transition-colors">
                        Mensajería
                      </Link>.
                    </span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <span className="text-[14px] text-ink-50 flex-shrink-0 mt-[1px]" aria-hidden="true">—</span>
                    <span className="text-[14px] text-ink-80 font-light leading-[1.6]">
                      Si necesitas una unidad o ruta exclusiva, revisa{' '}
                      <Link href="/servicios/rutas-dedicadas" className="underline underline-offset-2 hover:text-ink transition-colors">
                        Rutas Dedicadas
                      </Link>.
                    </span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <span className="text-[14px] text-ink-50 flex-shrink-0 mt-[1px]" aria-hidden="true">—</span>
                    <span className="text-[14px] text-ink-80 font-light leading-[1.6]">
                      Si necesitas una operación completa para tu negocio, revisa{' '}
                      <Link href="/servicios/logistica" className="underline underline-offset-2 hover:text-ink transition-colors">
                        Logística
                      </Link>.
                    </span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <span className="text-[14px] text-ink-50 flex-shrink-0 mt-[1px]" aria-hidden="true">—</span>
                    <span className="text-[14px] text-ink-80 font-light leading-[1.6]">
                      Si vendes en línea y manejas envíos frecuentes, revisa{' '}
                      <Link href="/servicios" className="underline underline-offset-2 hover:text-ink transition-colors">
                        Envíos para e-commerce
                      </Link>.{/* TODO: update href to /servicios/ecommerce when page exists */}
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── Diferenciadores — 4 feature cards ───────────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">¿Por qué BADA?</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-4"
                style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.06' }}
              >
                Lo que hace diferente a Paquetería BADA
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[560px]">
                Una solución para mover paquetes con reglas claras de peso, cobertura administrable
                y apoyo de asesor cuando el envío requiere validación.
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
                Qué incluye y qué debe validarse
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

              {/* Validación card — operational language, orange accent */}
              <div className="rounded-[20px] p-8 border-[1.5px] border-brand-orange-100 bg-brand-orange-50">
                <div className="flex items-center gap-3 mb-5">
                  <AlertCircle className="w-[18px] h-[18px] text-brand-orange flex-shrink-0" aria-hidden="true" />
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-brand-orange">
                    Con validación
                  </p>
                </div>
                <p className="text-[14px] text-ink-80 font-light leading-[1.75] mb-5">
                  Algunos casos pueden requerir revisión antes de confirmar la cotización.
                </p>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {INCLUYE_VALIDACION.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="w-[22px] h-[22px] rounded-full bg-white border border-brand-orange-100
                                   flex items-center justify-center flex-shrink-0 mt-[1px]"
                        aria-hidden="true"
                      >
                        <AlertCircle className="w-[10px] h-[10px] text-brand-orange" />
                      </span>
                      <span className="text-[14px] text-ink-80 font-medium leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── Información para cotizar ────────────────────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">Cotización</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-4"
                style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.06' }}
              >
                Información que necesitamos para cotizar
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[540px]">
                Para calcular una cotización más precisa, el cotizador necesita las medidas, el peso real
                y la ruta del envío. Con esos datos se calcula el peso volumétrico y se define el peso cobrable.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

              {/* Checklist */}
              <div className="bg-white border border-gray-200 rounded-[20px] p-8">
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
                    <PackageIcon primary="blue" size={32} />
                  </div>
                  <h3 className="font-display font-black text-[22px] text-white
                                 leading-[1.15] tracking-[-0.02em] mb-3">
                    ¿Listo para cotizar?
                  </h3>
                  <p className="text-[14px] text-white/80 font-light leading-[1.75] mb-6">
                    Ingresa los datos de tu paquete y revisa si puede calcularse automáticamente
                    según cobertura y condiciones operativas.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/cotizar?servicio=paqueteria"
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
        <section className="py-[96px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">Preguntas frecuentes</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-4"
                style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.06' }}
              >
                Respuestas sobre Paquetería
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[500px]">
                Si no encuentras lo que necesitas, tu asesor puede orientarte directamente.
              </p>
            </div>

            <div className="max-w-[720px]">
              <PaqueteriaFaq />
            </div>
          </div>
        </section>

        {/* ── Otros servicios logísticos ────────────────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
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

        {/* ── Dark CTA ─────────────────────────────────────────────── */}
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
              Cotiza tu envío de{' '}
              <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                paquetería.
              </em>
            </h2>

            <p className="text-[16px] text-white/55 font-light leading-[1.75] mb-12 max-w-[480px] mx-auto">
              Calcula un precio estimado con base en las medidas, peso y ruta de tu paquete.
              Si tu envío requiere validación, un asesor puede ayudarte a revisar la mejor opción.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/cotizar?servicio=paqueteria"
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
