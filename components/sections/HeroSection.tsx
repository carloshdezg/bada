import Image from 'next/image'
import Link from 'next/link'
import { CheckIcon } from '@/components/icons'
import EnrutadorPanel from '@/components/sections/EnrutadorPanel'
import TeaserCard from '@/components/ui/TeaserCard'
import { TRACKING_URL } from '@/lib/constants'

// Tiny orange square — used as blur placeholder until real image loads.
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNGRUYwRUEiLz48L3N2Zz4='

const TRUST_BULLETS = [
  'Respuesta garantizada en menos de 2 horas hábiles',
  'Ejecutivo de cuenta asignado desde el primer día',
  'Compensación documentada si algo falla',
]

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden min-h-screen pt-[68px]
                 bg-white flex items-center"
    >
      {/* Deco 1 — orange radial top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[60px] right-0
                   w-[620px] h-[620px] rounded-full"
        style={{ background: 'radial-gradient(circle, #FEF0EA 0%, transparent 70%)' }}
      />
      {/* Deco 2 — gray radial bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[100px] -left-[120px]
                   w-[440px] h-[440px] rounded-full"
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
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[60px] lg:gap-[80px] items-center py-16 lg:py-20">

          {/* ── LEFT ───────────────────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-[10px] text-[12px] font-bold tracking-[0.15em] uppercase text-ink-50 mb-6">
              <div
                className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0"
                style={{ animation: 'float 2s ease-in-out infinite' }}
                aria-hidden="true"
              />
              Mensajería y logística · CDMX
            </div>

            {/* H1 */}
            <h1
              className="font-display font-black leading-[1.0] tracking-[-0.025em] text-ink mb-6"
              style={{ fontSize: 'clamp(48px, 6vw, 82px)' }}
            >
              Cuando tu<br />
              envío no puede<br />
              <em className="italic text-brand-orange relative" style={{ fontStyle: 'italic' }}>
                fallar
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-0 right-0 h-[3px] bg-brand-orange opacity-30 rounded-sm"
                />
              </em>
              ,<br />
              llamas a BADA.
            </h1>

            {/* Sub — máx. 2 líneas */}
            <p className="text-[17px] text-ink-50 leading-[1.7] max-w-[480px] mb-8">
              Mensajería con{' '}
              <strong className="text-ink font-semibold">ejecutivo real asignado</strong>
              {' '}y respuesta garantizada en menos de 2 horas. Sin call center. Sin tickets.
            </p>

            {/* Trust bullets */}
            <div className="flex flex-col gap-[10px] mb-[38px]">
              {TRUST_BULLETS.map(bullet => (
                <div key={bullet} className="flex items-center gap-[10px]">
                  <div
                    className="w-[22px] h-[22px] rounded-full bg-success-bg border border-green-300
                               flex items-center justify-center text-success flex-shrink-0"
                  >
                    <CheckIcon size={11} className="" />
                  </div>
                  <span className="text-[14px] font-medium text-ink-80">{bullet}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
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
                Quiero que BADA maneje mis envíos →
              </Link>
              <a
                href={TRACKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rastrear mi envío (abre en nueva pestaña)"
                className="inline-flex items-center gap-[10px]
                           text-[15px] font-semibold text-ink-80
                           bg-gray-100 border-[1.5px] border-gray-200
                           px-7 py-[14px] rounded-[14px]
                           hover:bg-gray-200 hover:border-gray-300
                           transition-all duration-[250ms]"
              >
                ⏱ Rastrear mi envío
              </a>
            </div>

            {/* TeaserCard — mobile/tablet only (desktop lives in right column) */}
            <div className="lg:hidden mb-8">
              <TeaserCard />
            </div>

            {/* Enrutador */}
            <EnrutadorPanel />
          </div>

          {/* ── RIGHT — desktop only ────────────────────────── */}
          <div className="hidden lg:block">
            {/* Outer wrapper has extra bottom padding for TeaserCard overflow */}
            <div className="relative pb-[60px]">

              {/* Hero image */}
              <div className="relative h-[480px] rounded-[24px] overflow-hidden">
                {/*
                  Replace src with real editorial photo when available.
                  Remove `unoptimized` once switching to a raster format (webp/jpg).
                  Add a real blurDataURL from the optimized image at that point.
                */}
                <Image
                  src="/images/hero/bada-home.webp"
                  alt="Equipo operativo Transportes BADA"
                  fill
                  priority
                  unoptimized
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(max-width: 1280px) 45vw, 540px"
                  className="object-cover"
                />
              </div>

              {/* TeaserCard — overlaid on bottom-right corner of image */}
              <div className="absolute bottom-0 right-0 w-[280px]">
                <TeaserCard />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
