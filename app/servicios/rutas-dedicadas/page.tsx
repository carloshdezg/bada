import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'
import Navbar            from '@/components/layout/Navbar'
import Footer            from '@/components/layout/Footer'
import { waUrl }         from '@/lib/whatsapp'
import TruckIcon         from '@/components/icons/TruckIcon'
import MapPinIcon        from '@/components/icons/MapPinIcon'
import ShieldIcon        from '@/components/icons/ShieldIcon'
import BuildingIcon      from '@/components/icons/BuildingIcon'
import ChatIcon          from '@/components/icons/ChatIcon'
import PackageIcon       from '@/components/icons/PackageIcon'
import RutasDedicadasFaq from './_faq'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Rutas Dedicadas — Servicios logísticos',
  description:
    'Servicio para coordinar rutas o unidades dedicadas según las necesidades de tu operación, ' +
    'frecuencia, cobertura y condiciones logísticas. Validación con asesor.',
}

// ── Feature cards — diferenciadores ──────────────────────────────────
const FEATURES: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon:  <MapPinIcon   primary="orange" size={32} />,
    title: 'Planeación por ruta',
    body:  'Cada operación se revisa según origen, destino, frecuencia, volumen y condiciones necesarias para la ruta.',
  },
  {
    icon:  <TruckIcon    primary="orange" size={32} />,
    title: 'Mayor control operativo',
    body:  'Pensado para empresas que necesitan coordinar recorridos o entregas con más control que un envío estándar.',
  },
  {
    icon:  <ShieldIcon   primary="orange" size={32} />,
    title: 'Validación antes de confirmar',
    body:  'La disponibilidad se revisa con un asesor para definir si la ruta puede cubrirse y bajo qué condiciones.',
  },
  {
    icon:  <BuildingIcon primary="orange" size={32} />,
    title: 'Solución adaptable',
    body:  'El servicio puede ajustarse a operaciones recurrentes, rutas específicas o necesidades logísticas particulares.',
  },
]

// ── Qué incluye — confirmado ──────────────────────────────────────────
const INCLUYE_CONFIRMED = [
  'Revisión de la necesidad operativa.',
  'Validación de origen, destino y cobertura.',
  'Evaluación de frecuencia, volumen y condiciones.',
  'Posibilidad de ruta o unidad dedicada según disponibilidad.',
  'Acompañamiento de asesor para definir la mejor opción.',
  'Coordinación previa antes de confirmar el servicio.',
  'Propuesta sujeta a condiciones operativas.',
]

// ── Debe validarse con asesor ─────────────────────────────────────────
const INCLUYE_VALIDACION = [
  'Disponibilidad de ruta o unidad.',
  'Frecuencia requerida.',
  'Volumen aproximado de envíos.',
  'Puntos de recolección y entrega.',
  'Horarios o ventanas operativas.',
  'Condiciones especiales de manejo.',
  'Alcance y cobertura de la operación.',
]

// ── Checklist de asesoría ─────────────────────────────────────────────
const ASESORIA_CHECKS = [
  'Origen y destino de la operación.',
  'Frecuencia estimada de la ruta.',
  'Volumen aproximado de paquetes o entregas.',
  'Tipo de mercancía o envío.',
  'Horarios o ventanas de operación.',
  'Puntos de recolección y entrega.',
  'Necesidades especiales de manejo o coordinación.',
]

// ── Servicios relacionados ────────────────────────────────────────────
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
    id:    'paqueteria',
    name:  'Paquetería',
    tag:   'Paquetería LTL',
    desc:  'Paquetes, cajas y bultos con cálculo por peso cobrable.',
    href:  '/servicios/paqueteria',
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
    href:  '/servicios/ecommerce',
    color: 'blue' as const,
  },
]

export default function RutasDedicadasPage() {
  return (
    <>
      <Navbar />

      <main className="pt-[68px]">

        {/* ── Hero ─────────────────────────────────────────────────── */}
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
                <li className="text-ink">Rutas Dedicadas</li>
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
                Rutas Dedicadas · BADA
              </div>

              <h1
                className="font-display font-black leading-[1.04] tracking-[-0.025em] text-ink mb-6"
                style={{ fontSize: 'clamp(52px, 6.2vw, 80px)' }}
              >
                Rutas dedicadas,{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  para operaciones que necesitan control propio.
                </em>
              </h1>

              <p className="text-[17px] text-ink-50 font-light leading-[1.75] mb-8 max-w-[560px]">
                Servicio para coordinar rutas o unidades dedicadas según las necesidades de tu
                operación, frecuencia, cobertura y condiciones logísticas.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={waUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hablar con un asesor por WhatsApp (abre en nueva pestaña)"
                  className="inline-flex items-center gap-[10px]
                             text-[15px] font-bold text-white bg-brand-orange
                             px-8 py-[15px] rounded-[14px]
                             shadow-[0_4px_20px_rgba(241,98,39,0.3)]
                             hover:bg-brand-orange-light hover:-translate-y-[2px]
                             hover:shadow-[0_8px_32px_rgba(241,98,39,0.4)]
                             transition-all duration-[250ms]"
                >
                  Hablar con un asesor
                  <ArrowRight className="w-[15px] h-[15px]" aria-hidden="true" />
                </a>

                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-[10px]
                             text-[15px] font-semibold text-ink-80
                             bg-gray-100 border-[1.5px] border-gray-200
                             px-7 py-[14px] rounded-[14px]
                             hover:bg-gray-200 hover:border-gray-300
                             transition-all duration-[250ms]"
                >
                  Ver servicios
                </Link>
              </div>
            </div>

            {/* Visual block */}
            <div className="relative pb-[72px]">

              {/* Image media area */}
              <div
                className="relative h-[360px] sm:h-[420px] rounded-[24px] overflow-hidden bg-ink"
                aria-hidden="true"
              >
                <Image
                  src="/images/rutas-dedicadas/rutas-dedicadas-bada.webp"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={false}
                />

                <div className="absolute bottom-8 left-8 opacity-[0.15]">
                  <TruckIcon primary="orange" size={96} />
                </div>
              </div>

              {/* Floating service card */}
              <div className="absolute bottom-0 right-4 sm:right-6 w-[260px] sm:w-[280px]">
                <div
                  className="relative bg-white border-[1.5px] border-gray-200 rounded-[20px] p-6
                            shadow-[0_8px_32px_rgba(15,25,35,0.12)]"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]"
                    style={{ background: 'linear-gradient(90deg, #1A2B3C 0%, #F16227 100%)' }}
                    aria-hidden="true"
                  />
                  <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-ink-50 mb-4">
                    Rutas Dedicadas · BADA
                  </p>
                  <div className="flex flex-col gap-[10px]">
                    {[
                      'Ruta o unidad dedicada',
                      'Operaciones recurrentes',
                      'Validación con asesor',
                      'Cobertura según condiciones',
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
                ¿Rutas Dedicadas es lo que necesitas?
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
                  <TruckIcon primary="orange" size={32} />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Ideal para
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.6] mb-4">
                  Operaciones que necesitan una ruta o unidad dedicada, con mayor control que un envío individual.
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {[
                    'Entregas recurrentes o programadas.',
                    'Operaciones con puntos de entrega definidos.',
                    'Empresas que requieren continuidad en sus rutas.',
                    'Necesidades logísticas que no encajan en paquetería estándar.',
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
                  <MapPinIcon primary="blue" size={32} />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Mejor si necesitas
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.6] mb-4">
                  Coordinar una operación específica con validación previa de cobertura, frecuencia, volumen y condiciones.
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {[
                    'Revisar una ruta fija o recurrente.',
                    'Planear una unidad o recorrido exclusivo.',
                    'Coordinar entregas con mayor control operativo.',
                    'Hablar con un asesor antes de confirmar el servicio.',
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
                  <PackageIcon primary="ink" size={32} />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Considera otro si
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.6] mb-4">
                  Tu envío puede resolverse con una opción más simple.
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  <li className="flex items-start gap-[10px]">
                    <span className="text-[14px] text-ink-50 flex-shrink-0 mt-[1px]" aria-hidden="true">—</span>
                    <span className="text-[14px] text-ink-80 font-light leading-[1.6]">
                      Si necesitas mover documentos o paquetes pequeños, revisa{' '}
                      <Link href="/servicios/mensajeria" className="underline underline-offset-2 hover:text-ink transition-colors">
                        Mensajería
                      </Link>.
                    </span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <span className="text-[14px] text-ink-50 flex-shrink-0 mt-[1px]" aria-hidden="true">—</span>
                    <span className="text-[14px] text-ink-80 font-light leading-[1.6]">
                      Si necesitas enviar cajas o bultos, revisa{' '}
                      <Link href="/servicios/paqueteria" className="underline underline-offset-2 hover:text-ink transition-colors">
                        Paquetería
                      </Link>.
                    </span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <span className="text-[14px] text-ink-50 flex-shrink-0 mt-[1px]" aria-hidden="true">—</span>
                    <span className="text-[14px] text-ink-80 font-light leading-[1.6]">
                      Si necesitas una solución operativa completa, revisa{' '}
                      <Link href="/servicios/logistica" className="underline underline-offset-2 hover:text-ink transition-colors">
                        Logística
                      </Link>.
                    </span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <span className="text-[14px] text-ink-50 flex-shrink-0 mt-[1px]" aria-hidden="true">—</span>
                    <span className="text-[14px] text-ink-80 font-light leading-[1.6]">
                      Si vendes en línea y manejas envíos frecuentes, revisa{' '}
                      <Link href="/servicios/ecommerce" className="underline underline-offset-2 hover:text-ink transition-colors">
                        Envíos para e-commerce
                      </Link>.
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
                Lo que hace diferente a Rutas Dedicadas BADA
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[560px]">
                Una solución para operaciones que requieren planeación, continuidad y validación
                directa antes de confirmar una ruta.
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
                  Incluye
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

              {/* Validación con asesor — blue accent (advisor service) */}
              <div className="rounded-[20px] p-8 border-[1.5px] border-brand-blue-100 bg-brand-blue-50">
                <div className="flex items-center gap-3 mb-5">
                  <AlertCircle className="w-[18px] h-[18px] text-brand-blue flex-shrink-0" aria-hidden="true" />
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-brand-blue">
                    Debe validarse con asesor
                  </p>
                </div>
                <p className="text-[14px] text-ink-80 font-light leading-[1.75] mb-5">
                  Rutas Dedicadas requiere revisión antes de confirmar precio, cobertura y
                  condiciones del servicio.
                </p>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {INCLUYE_VALIDACION.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="w-[22px] h-[22px] rounded-full bg-white border border-brand-blue-100
                                   flex items-center justify-center flex-shrink-0 mt-[1px]"
                        aria-hidden="true"
                      >
                        <AlertCircle className="w-[10px] h-[10px] text-brand-blue" />
                      </span>
                      <span className="text-[14px] text-ink-80 font-medium leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── Asesoría — información para evaluar tu ruta ─────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="mb-12">
              <span className="tag">Asesoría</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-4"
                style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: '1.06' }}
              >
                Información que necesitamos para evaluar tu ruta
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[540px]">
                Para revisar una ruta dedicada, un asesor necesita entender el origen, destino,
                frecuencia, volumen y condiciones de la operación. Con esos datos se puede
                orientar mejor la solución.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

              {/* Checklist */}
              <div className="bg-white border border-gray-200 rounded-[20px] p-8">
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {ASESORIA_CHECKS.map(item => (
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
                    <ChatIcon primary="blue" size={32} />
                  </div>
                  <h3 className="font-display font-black text-[22px] text-white
                                 leading-[1.15] tracking-[-0.02em] mb-3">
                    Cuéntanos sobre tu operación
                  </h3>
                  <p className="text-[14px] text-white/80 font-light leading-[1.75] mb-6">
                    Comparte los datos generales de tu ruta para que un asesor pueda revisar
                    disponibilidad, cobertura y condiciones operativas.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={waUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Hablar con un asesor por WhatsApp (abre en nueva pestaña)"
                      className="inline-flex items-center justify-center gap-[10px] w-full
                                 text-[15px] font-bold text-brand-orange bg-white
                                 px-6 py-4 rounded-[12px]
                                 hover:bg-gray-50 hover:-translate-y-px
                                 hover:shadow-[0_4px_16px_rgba(15,25,35,0.14)]
                                 transition-all duration-[220ms]"
                    >
                      Hablar con un asesor
                      <ArrowRight className="w-[14px] h-[14px]" aria-hidden="true" />
                    </a>
                    <Link
                      href="/servicios"
                      className="inline-flex items-center justify-center gap-[10px] w-full
                                 text-[15px] font-semibold text-[#ffffff]
                                 px-6 py-[15px] rounded-[12px]
                                 border-2 border-[rgba(255,255,255,.45)]
                                 hover:bg-[rgba(255,255,255,.10)] hover:border-[rgba(255,255,255,.65)]
                                 transition-all duration-[220ms]"
                    >
                      Ver servicios
                    </Link>
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
                Respuestas sobre Rutas Dedicadas
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[500px]">
                Si no encuentras lo que necesitas, tu asesor puede orientarte directamente.
              </p>
            </div>

            <div className="max-w-[720px]">
              <RutasDedicadasFaq />
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
              Revisa tu ruta con{' '}
              <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                un asesor.
              </em>
            </h2>

            <p className="text-[16px] text-white/55 font-light leading-[1.75] mb-12 max-w-[480px] mx-auto">
              Cuéntanos origen, destino, frecuencia y condiciones de tu operación para evaluar
              si una ruta dedicada es la mejor opción.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hablar con un asesor por WhatsApp (abre en nueva pestaña)"
                className="inline-flex items-center gap-[10px]
                           text-[15px] font-bold text-brand-orange bg-white
                           px-[34px] py-4 rounded-[14px]
                           shadow-[0_4px_24px_rgba(15,25,35,0.18)]
                           hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(15,25,35,0.22)]
                           transition-all duration-[250ms]"
              >
                Hablar con un asesor
                <ArrowRight className="w-[15px] h-[15px]" aria-hidden="true" />
              </a>

              <Link
                href="/servicios"
                className="group inline-flex items-center gap-[10px]
                          px-[34px] py-4 rounded-[14px]
                          border-2 border-[rgba(255,255,255,.45)]
                          hover:bg-[rgba(255,255,255,.10)] hover:border-[rgba(255,255,255,.65)] hover:-translate-y-px
                          transition-all duration-[250ms]"
              >
                <span className="text-[15px] font-bold !text-white group-hover:!text-white">
                  Ver servicios
                </span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
