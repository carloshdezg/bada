import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar   from '@/components/layout/Navbar'
import Footer   from '@/components/layout/Footer'
import { waUrl } from '@/lib/whatsapp'

import ServiciosCards      from './_cards'
import ServiciosComparison from './_comparison'

export const metadata: Metadata = {
  title: 'Servicios logísticos',
  description:
    'Mensajería, paquetería, rutas dedicadas, logística y envíos para e-commerce. ' +
    'Soluciones para cada etapa de tu operación con atención directa y sin call centers.',
}

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNGRUYwRUEiLz48L3N2Zz4='

const HERO_BULLETS = [
  'Mensajería y paquetería para envíos regulares o urgentes',
  'Rutas dedicadas y logística para operaciones más complejas',
  'Flujos especializados para distribución y e-commerce',
]

const HERO_SERVICES = [
  'Mensajería',
  'Paquetería',
  'Rutas Dedicadas',
  'Logística',
  'Envíos para e-commerce',
]

export default function ServiciosPage() {
  return (
    <>
      <Navbar />

      <main className="pt-[68px]">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden min-h-[calc(100vh-68px)] bg-white flex items-center">
          {/* Orange radial — top right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[60px] -right-[80px] w-[620px] h-[620px] rounded-full"
            style={{ background: 'radial-gradient(circle, #FEF0EA 0%, transparent 70%)' }}
          />
          {/* Gray radial — bottom left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[100px] -left-[120px] w-[440px] h-[440px] rounded-full"
            style={{ background: 'radial-gradient(circle, #EFF2F5 0%, transparent 70%)' }}
          />
          {/* Vertical divider — desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-[55%] w-px hidden lg:block"
            style={{
              background: 'linear-gradient(180deg, transparent, #DDE3EA 30%, #DDE3EA 70%, transparent)',
            }}
          />

          <div className="max-w-site mx-auto px-5 sm:px-7 relative z-[2] w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-[60px] lg:gap-[80px] items-center py-16 lg:py-20">

              {/* Left — copy */}
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-[10px] text-[12px] font-bold tracking-[0.15em] uppercase text-ink-50 mb-6">
                  <div
                    className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0"
                    aria-hidden="true"
                  />
                  Servicios logísticos · BADA
                </div>

                <h1
                  className="font-display font-black leading-[1.04] tracking-[-0.025em] text-ink mb-6"
                  style={{ fontSize: 'clamp(52px, 6.2vw, 80px)' }}
                >
                  Servicios logísticos para{' '}
                  <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                    cada etapa
                  </em>{' '}
                  de tu operación
                </h1>

                <p className="text-[17px] text-ink-50 font-light leading-[1.75] mb-8 max-w-[540px]">
                  No todas las operaciones son iguales. Tenemos cinco servicios distintos para cubrir
                  cada tipo de necesidad: desde un envío urgente hasta la gestión completa
                  de tu distribución.
                </p>

                {/* Service-area bullets — numbered, signals "choose one" not "brand promise" */}
                <div className="flex flex-col gap-[12px] mb-[38px]">
                  {HERO_BULLETS.map((bullet, i) => (
                    <div key={bullet} className="flex items-start gap-[12px]">
                      <div
                        className="w-[22px] h-[22px] rounded-full bg-brand-orange-50 border border-brand-orange-100
                                   flex items-center justify-center text-brand-orange text-[11px] font-bold
                                   flex-shrink-0 mt-[2px]"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </div>
                      <span className="text-[14px] font-medium text-ink-80">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3">
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

              {/* Right — desktop only */}
              <div className="hidden lg:block">
                <div className="relative pb-[60px]">

                  {/* Hero image */}
                  <div className="relative h-[480px] rounded-[24px] overflow-hidden">
                    <Image
                      src="/images/hero/hero-placeholder.svg"
                      alt="Operación logística Transportes BADA"
                      fill
                      priority
                      unoptimized
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      sizes="(max-width: 1280px) 40vw, 500px"
                      className="object-cover"
                    />
                  </div>

                  {/* Floating services card — overlaid bottom-right */}
                  <div className="absolute bottom-0 right-0 w-[280px]">
                    <div className="relative bg-white border-[1.5px] border-gray-200 rounded-[20px] p-6 shadow-[0_8px_32px_rgba(15,25,35,0.12)]">
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]"
                        style={{ background: 'linear-gradient(90deg, #F16227 0%, #14A3BE 100%)' }}
                        aria-hidden="true"
                      />
                      <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-ink-50 mb-4">
                        5 servicios especializados
                      </p>
                      <div className="flex flex-col gap-[10px]">
                        {HERO_SERVICES.map(svc => (
                          <div key={svc} className="flex items-center gap-3">
                            <div
                              className="w-[6px] h-[6px] rounded-full bg-brand-orange flex-shrink-0"
                              aria-hidden="true"
                            />
                            <span className="text-[13.5px] text-ink-80 font-medium">{svc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Selector + Service cards (client) ─────────────────── */}
        <ServiciosCards />

        {/* ── Comparison table + mobile accordion (client) ──────── */}
        <ServiciosComparison />

        {/* ── Global CTA ───────────────────────────────────────── */}
        <section className="py-[120px] bg-ink relative overflow-hidden">
          {/* Background gradients */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(241,98,39,.10) 0%, transparent 50%, rgba(20,163,190,.08) 100%)',
            }}
          />
          {/* Decorative ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[80px] top-1/2 -translate-y-1/2
                       w-[460px] h-[460px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.1)' }}
          />
          {/* Second ring, smaller */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[20px] top-1/2 -translate-y-1/2
                       w-[280px] h-[280px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.06)' }}
          />

          <div className="max-w-[640px] mx-auto px-5 sm:px-7 text-center relative z-[1]">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.13em] uppercase text-white/45 mb-6">
              <div className="w-[24px] h-[2px] bg-white/35 rounded-sm" aria-hidden="true" />
              ¿Necesitas orientación?
            </div>

            <h2
              className="font-display font-black text-white tracking-[-0.025em] leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(38px, 5vw, 62px)' }}
            >
              ¿No sabes qué servicio{' '}
              <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                necesitas?
              </em>
            </h2>

            <p className="text-[16px] text-white/55 font-light leading-[1.75] mb-12 max-w-[520px] mx-auto">
              Cuéntanos qué necesitas enviar, desde dónde sale y a dónde debe llegar.
              Un asesor puede ayudarte a identificar el servicio más adecuado para tu operación.
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
