import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import Navbar         from '@/components/layout/Navbar'
import Footer         from '@/components/layout/Footer'
import { waUrl }      from '@/lib/whatsapp'
import TrendingUpIcon from '@/components/icons/TrendingUpIcon'
import ShieldIcon     from '@/components/icons/ShieldIcon'
import ChatIcon       from '@/components/icons/ChatIcon'

export const metadata: Metadata = {
  title: 'Nosotros — Transportes BADA',
  description:
    'BADA ayuda a coordinar envíos y soluciones logísticas con información clara, cobertura ' +
    'validada y acompañamiento cuando cada operación necesita revisarse con cuidado.',
}

// ── Cómo trabajamos — 4 pasos narrativos ─────────────────────────────
const COMO_TRABAJAMOS = [
  {
    n:     '01',
    title: 'Escuchamos la necesidad',
    body:  'Cada envío o requerimiento logístico parte de datos concretos: origen, destino, peso, dimensiones, frecuencia y condiciones.',
    tone:  'orange' as const,
  },
  {
    n:     '02',
    title: 'Validamos cobertura',
    body:  'Las rutas se revisan contra la cobertura disponible para saber si pueden cotizarse automáticamente o si requieren asesor.',
    tone:  'blue' as const,
  },
  {
    n:     '03',
    title: 'Calculamos con criterio',
    body:  'Cuando aplica, el cotizador considera peso real, peso volumétrico y peso cobrable para mostrar un precio estimado.',
    tone:  'orange' as const,
  },
  {
    n:     '04',
    title: 'Acompañamos casos especiales',
    body:  'Si la operación requiere revisión, un asesor puede ayudar a encontrar la opción más adecuada.',
    tone:  'blue' as const,
  },
]

// ── Principios — valores institucionales ─────────────────────────────
const PRINCIPIOS = [
  {
    n:     '01',
    title: 'Claridad antes que promesas',
    body:  'Preferimos comunicar condiciones reales antes que generar expectativas que después deban corregirse.',
  },
  {
    n:     '02',
    title: 'Cobertura con información actualizable',
    body:  'La cobertura debe poder administrarse por rutas, zonas y códigos postales para mantener decisiones más precisas.',
  },
  {
    n:     '03',
    title: 'Atención humana cuando hace falta',
    body:  'No todo caso debe resolverse de forma automática. Cuando una ruta, peso o servicio requiere validación, la asesoría es parte del proceso.',
  },
]

// ── Checklist diferencia BADA ─────────────────────────────────────────
const DIFERENCIA_CHECKS = [
  'Cotización estimada cuando el caso es seguro.',
  'Asesoría cuando la ruta requiere validación.',
  'Cobertura administrable por rutas y códigos postales.',
  'CTAs claros: cotizar no es lo mismo que hablar con asesor.',
  'Lenguaje operativo sin prometer de más.',
]

// ── Ecosistema de servicios ───────────────────────────────────────────
const ECOSISTEMA = [
  {
    label: 'Mensajería',
    tag:   'Mensajería express',
    desc:  'Documentos y paquetes pequeños que requieren atención ágil.',
    href:  '/servicios/mensajeria',
    color: 'orange' as const,
  },
  {
    label: 'Paquetería',
    tag:   'Paquetería LTL',
    desc:  'Cajas, paquetes y bultos con cálculo por peso cobrable.',
    href:  '/servicios/paqueteria',
    color: 'blue' as const,
  },
  {
    label: 'Rutas Dedicadas',
    tag:   'Unidades exclusivas',
    desc:  'Operaciones que requieren ruta o unidad dedicada.',
    href:  '/servicios/rutas-dedicadas',
    color: 'orange' as const,
  },
  {
    label: 'Logística',
    tag:   'Soluciones logísticas',
    desc:  'Soluciones operativas a la medida.',
    href:  '/servicios/logistica',
    color: 'blue' as const,
  },
  {
    label: 'E-commerce',
    tag:   'Envíos para e-commerce',
    desc:  'Revisión de envíos recurrentes para tiendas online.',
    href:  '/servicios/ecommerce',
    color: 'orange' as const,
  },
]

// ── Confianza operativa — 3 columnas ─────────────────────────────────
const CONFIANZA = [
  {
    Icon:  TrendingUpIcon,
    tone:  'orange' as const,
    title: 'Datos antes de precio',
    body:  'Medidas, peso y ruta ayudan a definir si el envío puede cotizarse automáticamente.',
  },
  {
    Icon:  ShieldIcon,
    tone:  'blue' as const,
    title: 'Validación antes de confirmar',
    body:  'El precio estimado está sujeto a cobertura, dimensiones, peso cobrable y condiciones operativas.',
  },
  {
    Icon:  ChatIcon,
    tone:  'orange' as const,
    title: 'Asesoría antes de forzar',
    body:  'Si algo no encaja en cotización automática, el usuario puede hablar con un asesor.',
  },
]

export default function NosotrosPage() {
  return (
    <>
      <Navbar />

      <main className="pt-[68px]">

        {/* ── Hero institucional ────────────────────────────────────── */}
        <section className="bg-white border-b border-gray-200 relative overflow-hidden">

          {/* Orange radial — top right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[80px] -right-[100px] w-[640px] h-[640px] rounded-full"
            style={{ background: 'radial-gradient(circle, #FEF0E8 0%, transparent 68%)' }}
          />
          {/* Teal radial — bottom left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 -left-[120px] w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, #E8F7FA 0%, transparent 68%)' }}
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
                <li className="text-ink">Nosotros</li>
              </ol>
            </nav>

            {/* Two-column */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-14 pb-20 items-start">

              {/* Left — editorial */}
              <div>
                <div className="flex items-center gap-[10px] text-[12px] font-bold tracking-[0.15em] uppercase text-ink-50 mb-6">
                  <div className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" aria-hidden="true" />
                  Sobre BADA
                </div>

                <h1
                  className="font-display font-black leading-[1.04] tracking-[-0.025em] text-ink mb-6"
                  style={{ fontSize: 'clamp(44px, 5.5vw, 68px)' }}
                >
                  Logística con claridad y{' '}
                  <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                    acompañamiento humano.
                  </em>
                </h1>

                <p className="text-[17px] text-ink-50 font-light leading-[1.75] mb-8 max-w-[520px]">
                  En BADA ayudamos a coordinar envíos y soluciones logísticas con información
                  clara, cobertura validada y acompañamiento cuando cada operación necesita
                  revisarse con cuidado.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <Link
                    href="/servicios"
                    className="inline-flex items-center gap-[10px]
                               text-[15px] font-bold text-white bg-brand-orange
                               px-8 py-[15px] rounded-[14px]
                               shadow-[0_4px_20px_rgba(241,98,39,0.3)]
                               hover:bg-brand-orange-light hover:-translate-y-[2px]
                               hover:shadow-[0_8px_32px_rgba(241,98,39,0.4)]
                               transition-all duration-[250ms]"
                  >
                    Conocer servicios
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

                {/* 4 highlights — 2×2 */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {[
                    'Cotización responsable',
                    'Cobertura validada',
                    'Asesoría cuando se necesita',
                    'Soluciones según operación',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <div
                        className="w-[6px] h-[6px] rounded-full bg-brand-orange flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-[14px] text-ink-80 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — identity card */}
              <div className="lg:sticky lg:top-[88px]">
                <div className="relative bg-white border-[1.5px] border-gray-200 rounded-[28px]
                                shadow-[0_8px_40px_rgba(15,25,35,0.10)] overflow-hidden">

                  {/* Top gradient bar */}
                  <div
                    className="h-[3px] w-full"
                    style={{ background: 'linear-gradient(90deg, #F16227 0%, #14A3BE 100%)' }}
                    aria-hidden="true"
                  />

                  {/* Decorative visual band */}
                  <div
                    className="h-[200px] relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #FEF0E8 0%, #E8F7FA 100%)' }}
                    aria-hidden="true"
                  >
                    {/* Abstract circles */}
                    <div className="absolute -top-[50px] -right-[50px] w-[220px] h-[220px] rounded-full
                                    border-[1.5px] border-brand-orange/20" />
                    <div className="absolute -top-[10px] -right-[10px] w-[130px] h-[130px] rounded-full
                                    border-[1.5px] border-brand-orange/30" />
                    <div className="absolute top-[60px] right-[60px] w-[56px] h-[56px] rounded-full
                                    bg-brand-orange/10" />
                    <div className="absolute bottom-[10px] -left-[40px] w-[160px] h-[160px] rounded-full
                                    border-[1.5px] border-brand-blue/20" />

                    {/* Ghost BADA text */}
                    <p
                      className="font-display font-black text-ink opacity-[0.07]
                                 absolute bottom-6 left-8 text-[56px] leading-none select-none"
                      aria-hidden="true"
                    >
                      BADA
                    </p>

                    {/* Floating stat */}
                    <div className="absolute top-6 left-6 bg-white rounded-[14px] px-5 py-3
                                    shadow-[0_4px_20px_rgba(15,25,35,0.10)] border border-gray-100">
                      <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-ink-50 mb-1">
                        Cobertura en
                      </p>
                      <p className="font-display font-black text-[24px] text-ink leading-none">
                        10 estados
                      </p>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-7">
                    <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-ink-50 mb-5">
                      Logística con criterio
                    </p>
                    <div className="flex flex-col gap-[14px]">
                      {[
                        { color: 'bg-brand-orange', text: 'Rutas y cobertura administrables' },
                        { color: 'bg-brand-blue',   text: 'Precio estimado con IVA incluido' },
                        { color: 'bg-brand-orange', text: 'Asesor cuando el caso lo requiere' },
                        { color: 'bg-brand-blue',   text: 'Servicio sujeto a condiciones operativas' },
                      ].map(item => (
                        <div key={item.text} className="flex items-center gap-3">
                          <div
                            className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${item.color}`}
                            aria-hidden="true"
                          />
                          <span className="text-[14px] text-ink-80 font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Quiénes somos — editorial centrado ───────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="max-w-[800px] mx-auto">

              <div className="mb-4">
                <span className="tag">Quiénes somos</span>
              </div>

              <h2
                className="font-display font-black text-ink tracking-[-0.025em] mb-8"
                style={{ fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: '1.06' }}
              >
                Un equipo enfocado en mover cada envío con{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  más claridad.
                </em>
              </h2>

              <p className="text-[16px] text-ink-80 font-light leading-[1.85] mb-8">
                BADA trabaja con una idea simple: antes de prometer, hay que entender la ruta,
                el tipo de envío y las condiciones operativas. Por eso combinamos herramientas
                de cotización, cobertura administrable y atención con asesor cuando el caso
                requiere validación.
              </p>

              {/* Pull quote */}
              <div className="flex items-start gap-5 my-10 py-8 border-y border-gray-200">
                <div
                  className="w-[3px] min-h-[60px] rounded-full bg-brand-orange flex-shrink-0 mt-[4px]"
                  aria-hidden="true"
                />
                <p
                  className="font-display font-black text-ink tracking-[-0.02em] leading-[1.25]"
                  style={{ fontSize: 'clamp(18px, 2.4vw, 28px)' }}
                >
                  &ldquo;Antes de prometer, hay que entender la ruta, el tipo de envío y las
                  condiciones operativas.&rdquo;
                </p>
              </div>

              <p className="text-[16px] text-ink-80 font-light leading-[1.85]">
                Nuestro enfoque busca que cada cliente tenga información útil para tomar
                decisiones: cuándo una ruta puede cotizarse automáticamente, cuándo necesita
                revisión y qué datos son importantes para avanzar con seguridad.
              </p>

            </div>
          </div>
        </section>

        {/* ── Cómo trabajamos — 4 cards 2×2 ────────────────────────── */}
        <section className="py-[96px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="mb-12">
              <span className="tag">Cómo trabajamos</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: '1.06' }}
              >
                Primero entendemos la operación.{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  Después proponemos el camino.
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {COMO_TRABAJAMOS.map(card => {
                const isOrange = card.tone === 'orange'
                return (
                  <div
                    key={card.n}
                    className="relative bg-white border border-gray-200 rounded-[24px] p-8
                               shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
                               transition-shadow duration-[250ms] overflow-hidden"
                  >
                    {/* Ghost number */}
                    <p
                      className="font-display font-black text-ink opacity-[0.04]
                                 absolute top-3 right-5 text-[100px] leading-none
                                 select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {card.n}
                    </p>

                    {/* Step badge */}
                    <div
                      className={[
                        'w-[48px] h-[48px] rounded-full flex items-center justify-center mb-5 flex-shrink-0',
                        isOrange ? 'bg-brand-orange' : 'bg-brand-blue',
                      ].join(' ')}
                    >
                      <span className="text-[16px] font-black text-white font-display">
                        {card.n}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-[20px] text-ink
                                   leading-[1.2] tracking-[-0.015em] mb-3">
                      {card.title}
                    </h3>
                    <p className="text-[14px] text-ink-50 font-light leading-[1.75]">
                      {card.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Principios — dark section (teal accent, left circles) ─── */}
        <section className="py-[96px] bg-ink relative overflow-hidden">

          {/* Decorative circles — left (teal accent, vs service/cobertura right-orange) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[100px] top-1/2 -translate-y-1/2
                       w-[520px] h-[520px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.14)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[40px] top-1/2 -translate-y-1/2
                       w-[320px] h-[320px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.08)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(20,163,190,.06) 0%, transparent 50%, rgba(241,98,39,.07) 100%)',
            }}
          />

          <div className="max-w-site mx-auto px-5 sm:px-7 relative z-[1]">

            <div className="max-w-[580px] mb-14">
              <div className="flex items-center gap-[10px] text-[12px] font-bold tracking-[0.15em] uppercase text-white/40 mb-5">
                <div className="w-[24px] h-[2px] bg-white/30 rounded-sm" aria-hidden="true" />
                Principios
              </div>
              <h2
                className="font-display font-black text-white tracking-[-0.025em]"
                style={{ fontSize: 'clamp(34px, 4.5vw, 56px)', lineHeight: '1.06' }}
              >
                Lo que guía{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  nuestra operación.
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PRINCIPIOS.map(p => (
                <div
                  key={p.n}
                  className="relative bg-white/[0.05] border border-white/[0.08]
                             rounded-[24px] p-9 overflow-hidden
                             hover:bg-white/[0.08] transition-colors duration-200"
                >
                  {/* Ghost number */}
                  <p
                    className="font-display font-black text-white/[0.05]
                               absolute top-3 right-5 text-[88px] leading-none
                               select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {p.n}
                  </p>

                  {/* Accent ring badge */}
                  <div
                    className="w-[44px] h-[44px] rounded-full flex items-center justify-center mb-6 flex-shrink-0"
                    style={{ border: '1.5px solid rgba(241,98,39,0.45)' }}
                  >
                    <span className="text-[15px] font-black text-brand-orange font-display">
                      {p.n}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-[20px] text-white
                                 leading-[1.2] tracking-[-0.015em] mb-4">
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-white/55 font-light leading-[1.75]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Qué nos hace diferentes — 2 columnas ─────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="mb-12">
              <span className="tag">Diferencia BADA</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: '1.06' }}
              >
                Una operación que no fuerza respuestas{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  automáticas cuando no conviene.
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left — editorial copy */}
              <div>
                <p className="text-[16px] text-ink-80 font-light leading-[1.85] mb-6">
                  No todos los envíos son iguales. Algunos pueden cotizarse con datos claros
                  y reglas definidas. Otros necesitan revisar cobertura, condiciones, volumen
                  o frecuencia. BADA separa esos escenarios para orientar mejor al usuario.
                </p>
                <p className="text-[16px] text-ink-80 font-light leading-[1.85]">
                  La distinción entre cotización automática y asesoría no es una limitación;
                  es la forma en que garantizamos que cada cliente reciba información correcta
                  antes de confirmar cualquier operación.
                </p>
              </div>

              {/* Right — styled checklist */}
              <div className="bg-white border border-gray-200 rounded-[24px] p-8
                              shadow-[var(--shadow-sm)]">
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-ink-50 mb-6">
                  En la práctica
                </p>
                <ul className="flex flex-col gap-5 list-none p-0 m-0">
                  {DIFERENCIA_CHECKS.map(item => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="w-[24px] h-[24px] rounded-full bg-brand-orange-50
                                   border border-brand-orange-100
                                   flex items-center justify-center flex-shrink-0 mt-[1px]"
                        aria-hidden="true"
                      >
                        <Check className="w-[12px] h-[12px] text-brand-orange" />
                      </span>
                      <span className="text-[15px] text-ink-80 font-medium leading-[1.65]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── Ecosistema BADA — banda compacta ─────────────────────── */}
        <section className="py-[96px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div>
                <span className="tag">Ecosistema</span>
                <h2
                  className="font-display font-black text-ink tracking-[-0.025em]"
                  style={{ fontSize: 'clamp(28px, 3.6vw, 46px)', lineHeight: '1.08' }}
                >
                  Servicios conectados para distintas{' '}
                  <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                    necesidades logísticas.
                  </em>
                </h2>
              </div>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-[8px] flex-shrink-0
                           text-[14px] font-bold text-ink-80
                           hover:text-brand-orange transition-colors duration-200"
              >
                Ver todos los servicios
                <ArrowRight className="w-[13px] h-[13px]" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ECOSISTEMA.map(svc => {
                const isOrange = svc.color === 'orange'
                return (
                  <Link
                    key={svc.href}
                    href={svc.href}
                    className={[
                      'group rounded-[18px] p-5 border-[1.5px] flex flex-col gap-3',
                      'transition-all duration-[220ms]',
                      'hover:-translate-y-[4px] hover:shadow-[0_8px_32px_rgba(15,25,35,0.10)]',
                      isOrange
                        ? 'bg-brand-orange-50 border-brand-orange-100'
                        : 'bg-brand-blue-50 border-brand-blue-100',
                    ].join(' ')}
                  >
                    <p className={`text-[11px] font-bold tracking-[0.1em] uppercase ${
                      isOrange ? 'text-brand-orange' : 'text-brand-blue'
                    }`}>
                      {svc.tag}
                    </p>
                    <h3 className="font-display font-black text-[17px] text-ink
                                   leading-[1.2] tracking-[-0.01em]">
                      {svc.label}
                    </h3>
                    <p className="text-[13px] text-ink-50 font-light leading-[1.6] flex-1">
                      {svc.desc}
                    </p>
                    <div className={[
                      'inline-flex items-center gap-[5px] text-[13px] font-bold',
                      'transition-all duration-200 group-hover:gap-[8px]',
                      isOrange ? 'text-brand-orange' : 'text-brand-blue',
                    ].join(' ')}>
                      Ver más
                      <ArrowRight className="w-[12px] h-[12px]" aria-hidden="true" />
                    </div>
                  </Link>
                )
              })}
            </div>

          </div>
        </section>

        {/* ── Confianza operativa — 3 columnas ─────────────────────── */}
        <section className="py-[96px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="max-w-[600px] mb-14">
              <span className="tag">Confianza</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(34px, 4vw, 54px)', lineHeight: '1.06' }}
              >
                Decisiones más claras para{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  cada envío.
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONFIANZA.map(item => {
                const isOrange = item.tone === 'orange'
                return (
                  <div
                    key={item.title}
                    className="bg-white border border-gray-200 rounded-[20px] p-7
                               shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
                               transition-shadow duration-[250ms]"
                  >
                    <div className={[
                      'w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5 flex-shrink-0',
                      isOrange
                        ? 'bg-brand-orange-50 border border-brand-orange-100'
                        : 'bg-brand-blue-50 border border-brand-blue-100',
                    ].join(' ')}>
                      <item.Icon primary={item.tone} size={28} />
                    </div>
                    <h3 className="font-display font-black text-[20px] text-ink
                                   leading-[1.2] tracking-[-0.015em] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-ink-50 font-light leading-[1.75]">
                      {item.body}
                    </p>
                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* ── CTA final — dark, teal-left accent ───────────────────── */}
        <section className="py-[120px] bg-ink relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(20,163,190,.08) 0%, transparent 50%, rgba(241,98,39,.09) 100%)',
            }}
          />
          {/* Circles left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[80px] top-1/2 -translate-y-1/2
                       w-[440px] h-[440px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.12)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[20px] top-1/2 -translate-y-1/2
                       w-[260px] h-[260px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.07)' }}
          />

          <div className="max-w-[640px] mx-auto px-5 sm:px-7 text-center relative z-[1]">

            <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.13em] uppercase text-white/40 mb-6">
              <div className="w-[24px] h-[2px] bg-white/30 rounded-sm" aria-hidden="true" />
              BADA
            </div>

            <h2
              className="font-display font-black text-white tracking-[-0.025em] leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(38px, 5vw, 62px)' }}
            >
              Hablemos de tu{' '}
              <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                operación.
              </em>
            </h2>

            <p className="text-[16px] text-white/55 font-light leading-[1.75] mb-12 max-w-[480px] mx-auto">
              Ya sea que necesites cotizar un envío puntual o revisar una necesidad logística
              más específica, BADA puede ayudarte a encontrar el siguiente paso correcto.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap mb-7">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-[10px]
                           text-[15px] font-bold text-brand-orange bg-white
                           px-[34px] py-4 rounded-[14px]
                           shadow-[0_4px_24px_rgba(15,25,35,0.18)]
                           hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(15,25,35,0.22)]
                           transition-all duration-[250ms]"
              >
                Conocer servicios
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

            <Link
              href="/cotizar"
              className="inline-flex items-center gap-[6px]
                         text-[13px] font-medium text-white/40
                         hover:text-white/70 transition-colors duration-200"
            >
              Abrir cotizador
              <ArrowRight className="w-[12px] h-[12px]" aria-hidden="true" />
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
