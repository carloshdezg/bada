import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Zap, UserCheck, Search, AlertTriangle, HelpCircle } from 'lucide-react'
import Navbar       from '@/components/layout/Navbar'
import Footer       from '@/components/layout/Footer'
import { waUrl }    from '@/lib/whatsapp'
import CoberturaFaq from './_faq'

export const metadata: Metadata = {
  title: 'Cobertura — Transportes BADA',
  description:
    'Consulta si tu ruta puede cotizarse automáticamente. La cobertura de BADA se valida ' +
    'por rutas, zonas y códigos postales administrables.',
}

// ── Cómo funciona — 4 proceso cards ──────────────────────────────────
const PROCESO = [
  {
    num:   '01',
    icon:  MapPin,
    title: 'Rutas administrables',
    body:  'Las rutas y zonas disponibles se gestionan desde una fuente administrable para mantener la cobertura actualizada.',
  },
  {
    num:   '02',
    icon:  Search,
    title: 'Validación por código postal',
    body:  'El código postal ayuda a identificar si la ruta existe, está activa y puede cotizarse automáticamente.',
  },
  {
    num:   '03',
    icon:  Zap,
    title: 'Cotización automática',
    body:  'Si la ruta está activa y cumple las condiciones, el cotizador puede mostrar un precio estimado con IVA incluido.',
  },
  {
    num:   '04',
    icon:  UserCheck,
    title: 'Asesor cuando se necesita',
    body:  'Si la ruta no está disponible, está desactivada o requiere revisión, el sistema dirige al usuario con un asesor.',
  },
]

// ── Casos que requieren asesor ────────────────────────────────────────
const CASOS_ASESOR = [
  'La ruta no aparece en la cobertura administrable.',
  'La ruta está desactivada temporalmente.',
  'La ruta está marcada como requiere asesor.',
  'El envío excede peso o dimensiones máximas para cotización automática.',
  'El servicio seleccionado no se cotiza automáticamente.',
  'La operación tiene condiciones especiales.',
]

export default function CoberturaPage() {
  return (
    <>
      <Navbar />

      <main className="pt-[68px]">

        {/* ── Hero compacto ─────────────────────────────────────────── */}
        <section className="bg-white border-b border-gray-200">

          {/* Subtle orange radial */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[40px] -right-[60px] w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, #FEF0EA 0%, transparent 68%)' }}
          />

          <div className="max-w-site mx-auto px-5 sm:px-7 relative z-[2]">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="pt-8 mb-8">
              <ol className="flex items-center gap-[8px] list-none p-0 m-0
                             text-[12px] font-medium tracking-[0.02em] text-ink-50">
                <li>
                  <Link href="/" className="hover:text-ink transition-colors duration-200">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-20 select-none">/</li>
                <li className="text-ink">Cobertura</li>
              </ol>
            </nav>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 pb-16 items-start">

              {/* Left — editorial */}
              <div>
                <div className="flex items-center gap-[10px] text-[12px] font-bold tracking-[0.15em] uppercase text-ink-50 mb-6">
                  <div className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" aria-hidden="true" />
                  Cobertura BADA
                </div>

                <h1
                  className="font-display font-black leading-[1.04] tracking-[-0.025em] text-ink mb-6"
                  style={{ fontSize: 'clamp(44px, 5.5vw, 68px)' }}
                >
                  Consulta si tu ruta puede{' '}
                  <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                    cotizarse automáticamente.
                  </em>
                </h1>

                <p className="text-[17px] text-ink-50 font-light leading-[1.75] mb-8 max-w-[500px]">
                  La cobertura de BADA se valida por rutas, zonas y códigos postales
                  administrables. Algunas rutas pueden cotizarse automáticamente y otras
                  requieren revisión con un asesor.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-7">
                  <Link
                    href="/cotizar"
                    className="inline-flex items-center gap-[10px]
                               text-[15px] font-bold text-white bg-brand-orange
                               px-8 py-[15px] rounded-[14px]
                               shadow-[0_4px_20px_rgba(241,98,39,0.3)]
                               hover:bg-brand-orange-light hover:-translate-y-[2px]
                               hover:shadow-[0_8px_32px_rgba(241,98,39,0.4)]
                               transition-all duration-[250ms]"
                  >
                    Consultar en cotizador
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

                <div className="flex items-start gap-2">
                  <div className="w-[3px] h-full min-h-[36px] rounded-full bg-gray-200 flex-shrink-0 mt-[2px]" aria-hidden="true" />
                  <p className="text-[13px] text-ink-50 font-light leading-[1.75]">
                    La disponibilidad puede variar según cobertura vigente, dimensiones, peso
                    cobrable y condiciones operativas.
                  </p>
                </div>
              </div>

              {/* Right — functional status panel */}
              <div className="lg:sticky lg:top-[88px]">
                <div className="relative bg-white border-[1.5px] border-gray-200 rounded-[24px] p-8
                                shadow-[0_8px_32px_rgba(15,25,35,0.09)]">
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px]"
                    style={{ background: 'linear-gradient(90deg, #F16227 0%, #14A3BE 100%)' }}
                    aria-hidden="true"
                  />

                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-ink-50 mb-6">
                    Posibles resultados al consultar
                  </p>

                  <div className="flex flex-col gap-5">

                    <div className="flex items-start gap-4">
                      <div
                        className="w-[42px] h-[42px] rounded-[10px] bg-green-50 border border-green-200
                                   flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <span className="w-[10px] h-[10px] rounded-full bg-green-500" />
                      </div>
                      <div className="pt-[2px]">
                        <p className="text-[14px] font-semibold text-ink leading-snug mb-[3px]">
                          Ruta cotizable
                        </p>
                        <p className="text-[13px] text-ink-50 font-light leading-snug">
                          Cotización automática disponible
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="w-[42px] h-[42px] rounded-[10px] bg-brand-orange-50 border border-brand-orange-100
                                   flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <span className="w-[10px] h-[10px] rounded-full bg-brand-orange" />
                      </div>
                      <div className="pt-[2px]">
                        <p className="text-[14px] font-semibold text-ink leading-snug mb-[3px]">
                          Ruta con validación
                        </p>
                        <p className="text-[13px] text-ink-50 font-light leading-snug">
                          Requiere revisión con asesor
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="w-[42px] h-[42px] rounded-[10px] bg-gray-100 border border-gray-200
                                   flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <span className="w-[10px] h-[10px] rounded-full bg-gray-400" />
                      </div>
                      <div className="pt-[2px]">
                        <p className="text-[14px] font-semibold text-ink leading-snug mb-[3px]">
                          Ruta no encontrada
                        </p>
                        <p className="text-[13px] text-ink-50 font-light leading-snug">
                          Validación manual con asesor
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="mt-7 pt-6 border-t border-gray-100">
                    <Link
                      href="/cotizar"
                      className="inline-flex items-center gap-[8px]
                                 text-[14px] font-bold text-brand-orange
                                 hover:underline underline-offset-2 transition-all duration-150"
                    >
                      Abrir cotizador
                      <ArrowRight className="w-[13px] h-[13px]" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Módulo de consulta — 3 pasos (dark, star block) ──────── */}
        <section className="py-[96px] bg-ink relative overflow-hidden">

          {/* Decorative circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[100px] top-1/2 -translate-y-1/2
                       w-[520px] h-[520px] rounded-full"
            style={{ border: '1px solid rgba(241,98,39,0.12)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[40px] top-1/2 -translate-y-1/2
                       w-[320px] h-[320px] rounded-full"
            style={{ border: '1px solid rgba(241,98,39,0.07)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(241,98,39,.06) 0%, transparent 50%, rgba(20,163,190,.04) 100%)',
            }}
          />

          <div className="max-w-site mx-auto px-5 sm:px-7 relative z-[1]">

            <div className="max-w-[600px] mb-14">
              <div className="flex items-center gap-[10px] text-[12px] font-bold tracking-[0.15em] uppercase text-white/40 mb-5">
                <div className="w-[24px] h-[2px] bg-white/30 rounded-sm" aria-hidden="true" />
                Cómo consultarlo
              </div>
              <h2
                className="font-display font-black text-white tracking-[-0.025em] mb-5"
                style={{ fontSize: 'clamp(36px, 4.5vw, 58px)', lineHeight: '1.05' }}
              >
                Revisa tu ruta{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  en el cotizador.
                </em>
              </h2>
              <p className="text-[16px] text-white/55 font-light leading-[1.75]">
                Ingresa el código postal de origen y destino en el cotizador para saber si
                tu ruta puede calcularse automáticamente o si necesita validación.
              </p>
            </div>

            {/* Step cards — dark variant */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">

              {[
                {
                  n: '1',
                  title: 'Ingresa origen y destino',
                  body:  'El cotizador detecta la ruta con base en los códigos postales disponibles.',
                },
                {
                  n: '2',
                  title: 'Validamos cobertura',
                  body:  'La ruta se revisa contra la cobertura administrable vigente.',
                },
                {
                  n: '3',
                  title: 'Obtén resultado o asesoría',
                  body:  'Si la ruta está activa y cotizable, verás un precio estimado. Si requiere validación, podrás hablar con un asesor.',
                },
              ].map(step => (
                <div
                  key={step.n}
                  className="relative bg-white/[0.05] border border-white/[0.08]
                             rounded-[20px] p-8 overflow-hidden
                             hover:bg-white/[0.08] transition-colors duration-200"
                >
                  <div
                    className="font-display font-black text-white/[0.05]
                               absolute top-3 right-5 text-[88px] leading-none
                               select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {step.n}
                  </div>
                  <div className="w-[44px] h-[44px] rounded-full bg-brand-orange
                                  flex items-center justify-center mb-6 flex-shrink-0">
                    <span className="text-[16px] font-black text-white font-display">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-[19px] text-white
                                 leading-[1.2] tracking-[-0.015em] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-white/55 font-light leading-[1.7]">
                    {step.body}
                  </p>
                </div>
              ))}

            </div>

            <Link
              href="/cotizar"
              className="inline-flex items-center gap-[10px]
                         text-[15px] font-bold text-brand-orange bg-white
                         px-8 py-[14px] rounded-[14px]
                         shadow-[0_4px_20px_rgba(15,25,35,0.2)]
                         hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(15,25,35,0.24)]
                         transition-all duration-[250ms]"
            >
              Abrir cotizador
              <ArrowRight className="w-[15px] h-[15px]" aria-hidden="true" />
            </Link>

          </div>
        </section>

        {/* ── Cómo funciona — 4 cards de proceso ───────────────────── */}
        <section className="py-[96px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="mb-12">
              <span className="tag">Cómo funciona</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: '1.06' }}
              >
                La cobertura se valida{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  antes de confirmar.
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROCESO.map(p => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="relative bg-white border border-gray-200 rounded-[20px] p-7
                               shadow-[var(--shadow-sm)]
                               hover:shadow-[var(--shadow)] hover:border-gray-300
                               transition-all duration-[250ms]"
                  >
                    <p
                      className="font-display font-black text-[80px] text-ink opacity-[0.05]
                                 absolute top-3 right-4 leading-none select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {p.num}
                    </p>
                    <div className="w-[52px] h-[52px] rounded-[14px] bg-brand-orange-50
                                    border border-brand-orange-100
                                    flex items-center justify-center mb-5 flex-shrink-0">
                      <Icon className="w-[22px] h-[22px] text-brand-orange" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-black text-[18px] text-ink
                                   leading-[1.2] tracking-[-0.015em] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-[14px] text-ink-50 font-light leading-[1.75]">
                      {p.body}
                    </p>
                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* ── Tipos de resultado — 3 estados ───────────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="mb-12">
              <span className="tag">Resultados posibles</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: '1.06' }}
              >
                ¿Qué puede pasar al consultar una ruta?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Cotizable — green */}
              <div className="relative bg-white border-[1.5px] border-green-200 rounded-[24px] p-8
                              shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
                              transition-shadow duration-[250ms] overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px] bg-green-500"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-[44px] h-[44px] rounded-[12px] bg-green-50 border border-green-200
                                  flex items-center justify-center flex-shrink-0">
                    <span className="w-[12px] h-[12px] rounded-full bg-green-500" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-green-700">
                    Cotización automática
                  </span>
                </div>
                <h3 className="font-display font-black text-[22px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Ruta cotizable
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.75]">
                  La ruta está activa y permite calcular un precio estimado en el cotizador.
                </p>
              </div>

              {/* Validación — orange */}
              <div className="relative bg-white border-[1.5px] border-brand-orange-100 rounded-[24px] p-8
                              shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
                              transition-shadow duration-[250ms] overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px] bg-brand-orange"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-[44px] h-[44px] rounded-[12px] bg-brand-orange-50 border border-brand-orange-100
                                  flex items-center justify-center flex-shrink-0">
                    <span className="w-[12px] h-[12px] rounded-full bg-brand-orange" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-brand-orange">
                    Requiere asesor
                  </span>
                </div>
                <h3 className="font-display font-black text-[22px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Ruta con validación
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.75]">
                  La ruta existe, pero necesita revisión con asesor antes de confirmar condiciones.
                </p>
              </div>

              {/* No encontrada — gray */}
              <div className="relative bg-white border-[1.5px] border-gray-200 rounded-[24px] p-8
                              shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
                              transition-shadow duration-[250ms] overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px] bg-gray-300"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-[44px] h-[44px] rounded-[12px] bg-gray-100 border border-gray-200
                                  flex items-center justify-center flex-shrink-0">
                    <span className="w-[12px] h-[12px] rounded-full bg-gray-400" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-ink-50">
                    Validación manual
                  </span>
                </div>
                <h3 className="font-display font-black text-[22px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Ruta no encontrada
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.75]">
                  Si la ruta no aparece en la cobertura administrable, un asesor puede ayudar
                  a revisar opciones disponibles.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── Área Metro vs Foráneo ─────────────────────────────────── */}
        <section className="py-[96px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="mb-12">
              <span className="tag">Tipos de ruta</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-5"
                style={{ fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: '1.06' }}
              >
                Área Metropolitana y rutas foráneas
              </h2>
              <p className="text-[16px] text-ink-50 font-light leading-[1.75] max-w-[520px]">
                BADA puede clasificar rutas como Área Metropolitana o Foráneas según la
                cobertura administrable vigente. La fuente de rutas tiene prioridad sobre
                cualquier regla general.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[760px]">

              <div className="bg-brand-orange-50 border-[1.5px] border-brand-orange-100
                              rounded-[24px] p-9
                              shadow-[var(--shadow-sm)]">
                <div className="w-[52px] h-[52px] rounded-[14px] bg-white
                                flex items-center justify-center mb-6 flex-shrink-0
                                shadow-[0_2px_8px_rgba(241,98,39,0.15)]
                                border border-brand-orange-100">
                  <MapPin className="w-[22px] h-[22px] text-brand-orange" aria-hidden="true" />
                </div>
                <h3 className="font-display font-black text-[22px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Área Metropolitana
                </h3>
                <p className="text-[14px] text-ink-80 font-light leading-[1.75]">
                  Rutas configuradas como locales dentro de la cobertura administrable.
                </p>
              </div>

              <div className="bg-brand-blue-50 border-[1.5px] border-brand-blue-100
                              rounded-[24px] p-9
                              shadow-[var(--shadow-sm)]">
                <div className="w-[52px] h-[52px] rounded-[14px] bg-white
                                flex items-center justify-center mb-6 flex-shrink-0
                                shadow-[0_2px_8px_rgba(20,163,190,0.15)]
                                border border-brand-blue-100">
                  <MapPin className="w-[22px] h-[22px] text-brand-blue" aria-hidden="true" />
                </div>
                <h3 className="font-display font-black text-[22px] text-ink
                               leading-[1.15] tracking-[-0.02em] mb-3">
                  Foráneo
                </h3>
                <p className="text-[14px] text-ink-80 font-light leading-[1.75]">
                  Rutas configuradas como foráneas según cobertura y condiciones disponibles.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ── Casos que requieren asesor ────────────────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="max-w-[560px] mb-12">
              <span className="tag">Validación adicional</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: '1.06' }}
              >
                ¿Cuándo puede requerir asesor?
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
                {CASOS_ASESOR.map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-4 bg-white border border-gray-200
                               rounded-[16px] p-5 shadow-[var(--shadow-sm)]
                               hover:shadow-[var(--shadow)] hover:border-gray-300
                               transition-all duration-[200ms]"
                  >
                    <span
                      className="w-[32px] h-[32px] rounded-[8px] bg-brand-orange-50 border border-brand-orange-100
                                 flex items-center justify-center flex-shrink-0 mt-[1px]"
                      aria-hidden="true"
                    >
                      <AlertTriangle className="w-[14px] h-[14px] text-brand-orange" />
                    </span>
                    <span className="text-[14px] text-ink-80 font-medium leading-[1.65]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="lg:sticky lg:top-[88px]">
                <div className="relative bg-white border border-gray-200 rounded-[24px] p-8
                                shadow-[var(--shadow)]">
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px] bg-brand-orange"
                    aria-hidden="true"
                  />
                  <div className="w-[52px] h-[52px] rounded-[14px] bg-brand-orange-50
                                  border border-brand-orange-100
                                  flex items-center justify-center mb-5 flex-shrink-0">
                    <HelpCircle className="w-[22px] h-[22px] text-brand-orange" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-black text-[20px] text-ink
                                 leading-[1.2] tracking-[-0.015em] mb-3">
                    El objetivo es ayudarte
                  </h3>
                  <p className="text-[14px] text-ink-80 font-light leading-[1.75]">
                    En estos casos, el objetivo no es bloquear al usuario, sino revisar la
                    mejor opción disponible con información correcta.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA intermedio ────────────────────────────────────────── */}
        <section className="py-[72px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">
            <div className="relative bg-brand-orange-50 border-[1.5px] border-brand-orange-100
                            rounded-[28px] px-10 py-12 overflow-hidden
                            flex flex-col sm:flex-row items-start sm:items-center
                            justify-between gap-8">
              {/* Ghost text */}
              <p
                className="font-display font-black text-ink opacity-[0.04]
                           absolute right-6 top-1/2 -translate-y-1/2
                           text-[120px] leading-none select-none pointer-events-none hidden sm:block"
                aria-hidden="true"
              >
                CP
              </p>
              <div className="max-w-[480px] relative z-[1]">
                <h2
                  className="font-display font-black text-ink tracking-[-0.025em] mb-3"
                  style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', lineHeight: '1.08' }}
                >
                  ¿Quieres validar una ruta{' '}
                  <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                    ahora?
                  </em>
                </h2>
                <p className="text-[15px] text-ink-50 font-light leading-[1.7]">
                  Usa el cotizador para revisar si tu ruta permite una cotización automática
                  o si requiere asesoría.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0 relative z-[1]">
                <Link
                  href="/cotizar"
                  className="inline-flex items-center gap-[10px]
                             text-[15px] font-bold text-white bg-brand-orange
                             px-7 py-[13px] rounded-[12px]
                             shadow-[0_4px_20px_rgba(241,98,39,0.3)]
                             hover:bg-brand-orange-light hover:-translate-y-px
                             hover:shadow-[0_8px_28px_rgba(241,98,39,0.4)]
                             transition-all duration-[220ms] whitespace-nowrap"
                >
                  Consultar en cotizador
                  <ArrowRight className="w-[14px] h-[14px]" aria-hidden="true" />
                </Link>
                <a
                  href={waUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hablar con un asesor por WhatsApp (abre en nueva pestaña)"
                  className="inline-flex items-center gap-[10px]
                             text-[15px] font-semibold text-ink-80
                             border-[1.5px] border-gray-300 bg-white
                             px-6 py-3 rounded-[12px]
                             hover:border-gray-400 hover:bg-gray-50
                             transition-all duration-[220ms] whitespace-nowrap"
                >
                  Hablar con un asesor
                </a>
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
                className="font-display font-black text-ink tracking-[-0.025em] mb-5"
                style={{ fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: '1.06' }}
              >
                Preguntas sobre cobertura
              </h2>
              <p className="text-[15px] text-ink-50 font-light leading-[1.75] max-w-[480px]">
                Si no encuentras lo que necesitas, un asesor puede orientarte directamente.
              </p>
            </div>

            <div className="max-w-[720px]">
              <CoberturaFaq />
            </div>

          </div>
        </section>

        {/* ── CTA final ─────────────────────────────────────────────── */}
        <section className="py-[120px] bg-ink relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(241,98,39,.09) 0%, transparent 55%, rgba(20,163,190,.06) 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[80px] top-1/2 -translate-y-1/2
                       w-[480px] h-[480px] rounded-full"
            style={{ border: '1px solid rgba(241,98,39,0.1)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[20px] top-1/2 -translate-y-1/2
                       w-[280px] h-[280px] rounded-full"
            style={{ border: '1px solid rgba(241,98,39,0.06)' }}
          />

          <div className="max-w-[640px] mx-auto px-5 sm:px-7 text-center relative z-[1]">

            <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.13em] uppercase text-white/40 mb-6">
              <div className="w-[24px] h-[2px] bg-white/30 rounded-sm" aria-hidden="true" />
              Cobertura BADA
            </div>

            <h2
              className="font-display font-black text-white tracking-[-0.025em] leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(38px, 5vw, 62px)' }}
            >
              Consulta tu ruta{' '}
              <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                antes de enviar.
              </em>
            </h2>

            <p className="text-[16px] text-white/55 font-light leading-[1.75] mb-12 max-w-[480px] mx-auto">
              Valida origen, destino y condiciones del envío desde el cotizador. Si tu ruta
              requiere revisión, un asesor puede ayudarte a encontrar la mejor opción
              disponible.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/cotizar"
                className="inline-flex items-center gap-[10px]
                           text-[15px] font-bold text-brand-orange bg-white
                           px-[34px] py-4 rounded-[14px]
                           shadow-[0_4px_24px_rgba(15,25,35,0.18)]
                           hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(15,25,35,0.22)]
                           transition-all duration-[250ms]"
              >
                Consultar en cotizador
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
                           border-2 border-[rgba(255,255,255,.40)]
                           hover:bg-[rgba(255,255,255,.10)] hover:border-[rgba(255,255,255,.60)] hover:-translate-y-px
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
