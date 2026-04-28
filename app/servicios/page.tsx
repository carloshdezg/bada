import type { Metadata } from 'next'
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

const HERO_STATS = [
  { num: '5',   style: {},                   colorClass: 'text-brand-orange', label: 'Servicios especializados' },
  { num: 'B2B', style: {},                   colorClass: 'text-brand-blue',   label: 'Enfoque empresarial' },
  { num: 'MX',  style: { fontSize: '28px' }, colorClass: 'text-ink-20',       label: 'Operación en México' },
]

export default function ServiciosPage() {
  return (
    <>
      <Navbar />

      <main className="pt-[68px]">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-[110px] bg-gray-50 border-b border-gray-200 relative overflow-hidden">
          {/* Subtle teal gradient — right side */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-[520px] h-full"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, rgba(20,163,190,0.06) 100%)',
            }}
          />
          {/* Warm orange glow — top left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[120px] -left-[80px] w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(241,98,39,0.04) 0%, transparent 70%)' }}
          />

          <div className="max-w-site mx-auto px-5 sm:px-7 relative z-[1]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-center">

              {/* Left — copy */}
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-3 text-[12px] font-bold tracking-[0.13em] uppercase text-ink-50 mb-7">
                  <div className="w-[24px] h-[2px] bg-brand-orange rounded-sm flex-shrink-0" aria-hidden="true" />
                  Servicios logísticos
                </div>

                <h1
                  className="font-display font-black text-ink leading-[1.06] tracking-[-0.025em] mb-7"
                  style={{ fontSize: 'clamp(44px, 5.2vw, 66px)' }}
                >
                  Servicios logísticos para{' '}
                  <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                    cada etapa
                  </em>{' '}
                  de tu operación
                </h1>

                <p className="text-[17px] text-ink-50 font-light leading-[1.75] mb-[46px] max-w-[540px]">
                  En BADA ofrecemos soluciones de mensajería, paquetería, rutas dedicadas, logística
                  y envíos para e-commerce, pensadas para empresas que necesitan recolectar, distribuir,
                  documentar y gestionar sus envíos con mayor control.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {/* TODO: connect to /cotizar when the page is created */}
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

              {/* Right — stat card (desktop only) */}
              <div className="hidden lg:block bg-white border border-gray-200 rounded-[20px] shadow-[var(--shadow-lg)] relative overflow-hidden">
                {/* Top gradient bar — thicker, more impactful */}
                <div
                  className="absolute top-0 left-0 right-0 h-[4px]"
                  style={{ background: 'linear-gradient(90deg, #F16227 0%, #14A3BE 100%)' }}
                  aria-hidden="true"
                />
                <div className="px-8 pt-10 pb-6">
                  {HERO_STATS.map(({ num, style, colorClass, label }, i) => (
                    <div key={label} className={`py-[18px] ${i > 0 ? 'border-t border-gray-200' : ''}`}>
                      <div
                        className={`font-display font-black text-[44px] leading-none tracking-[-0.02em] ${colorClass}`}
                        style={style}
                      >
                        {num}
                      </div>
                      <div className="text-[12.5px] text-ink-50 mt-[6px] tracking-[0.02em]">
                        {label}
                      </div>
                    </div>
                  ))}
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
              className="font-display font-black text-white tracking-[-0.025em] leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(34px, 4.6vw, 54px)' }}
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
              {/* TODO: connect to /cotizar when the page is created */}
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
                           text-[15px] font-bold text-white
                           px-[34px] py-4 rounded-[14px]
                           border-2 border-white/40
                           hover:bg-white/10 hover:-translate-y-px
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
