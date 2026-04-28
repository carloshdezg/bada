import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionContainer from '@/components/ui/SectionContainer'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'

export interface PainPoint {
  icon:  string
  title: string
  desc:  string
}

export interface IncludedService {
  icon:    string
  title:   string
  tagline: string
}

export interface SolucionLandingProps {
  eyebrow:     string
  heading:     string
  heroDesc:    string
  segment:     string
  painPoints:  PainPoint[]
  services:    IncludedService[]
}

export default function SolucionLanding({
  eyebrow,
  heading,
  heroDesc,
  segment,
  painPoints,
  services,
}: SolucionLandingProps) {
  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 pt-[130px] pb-[100px]">
        <SectionContainer className="">
          <span className="tag">{eyebrow}</span>
          <h1
            className="font-display font-black tracking-[-0.025em] text-ink
                       leading-[1.05] mb-6 max-w-[700px]"
            style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
          >
            {heading}
          </h1>
          <p className="text-[17px] text-ink-50 max-w-[520px] leading-[1.7] mb-8">
            {heroDesc}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2
                         text-[15px] font-bold text-white bg-brand-orange
                         px-[32px] py-[14px] rounded-[12px]
                         hover:bg-brand-orange-light hover:-translate-y-px
                         hover:shadow-[0_4px_20px_rgba(241,98,39,0.35)]
                         transition-all duration-[220ms]"
            >
              Quiero una propuesta
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2
                         text-[15px] font-semibold text-ink-80
                         border-[1.5px] border-gray-300 bg-transparent
                         px-[32px] py-[14px] rounded-[12px]
                         hover:border-ink-80 hover:text-ink
                         transition-all duration-200"
            >
              Hablar con un ejecutivo
            </Link>
          </div>
        </SectionContainer>
      </section>

      {/* ── Pain points ──────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <SectionContainer className="">
          <SectionHeader
            eyebrow={`Si eres ${segment}`}
            heading="Lo que necesitas resolver"
            description="Estas son las fricciones más comunes en tu operación. Tenemos una respuesta específica para cada una."
            className="mb-[52px]"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {painPoints.map((p, i) => (
              <Card key={i} className="">
                <div className="text-[32px] mb-4" aria-hidden="true">{p.icon}</div>
                <h3 className="font-display font-bold text-[20px] text-ink leading-[1.2] mb-3">
                  {p.title}
                </h3>
                <p className="text-[14px] text-ink-50 leading-[1.7]">
                  {p.desc}
                </p>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Included services ────────────────────────────────────── */}
      <section className="bg-gray-50 py-[100px]">
        <SectionContainer className="">
          <SectionHeader
            eyebrow="Lo que incluye"
            heading="Servicios diseñados para tu operación"
            description="No pagas por lo que no necesitas. Esta combinación está pensada para tu tipo de negocio."
            className="mb-[52px]"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
            {services.map((s, i) => (
              <Card key={i} className="flex items-start gap-4">
                <div className="text-[28px] flex-shrink-0" aria-hidden="true">{s.icon}</div>
                <div>
                  <h3 className="font-display font-bold text-[18px] text-ink mb-1">
                    {s.title}
                  </h3>
                  <p className="text-[13.5px] text-ink-50 leading-[1.6]">
                    {s.tagline}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── CTA final ────────────────────────────────────────────── */}
      <section className="bg-brand-orange py-[110px] text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[100px] -right-[100px]
                     w-[400px] h-[400px] rounded-full"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[80px] -left-[80px]
                     w-[300px] h-[300px] rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />
        <SectionContainer className="relative z-[1]">
          <h2
            className="font-display font-black text-white tracking-[-0.025em]
                       leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            ¿Listo para resolver<br />tu logística?
          </h2>
          <p className="text-white/75 text-[17px] leading-[1.75] max-w-[480px] mx-auto mb-9">
            Cotiza en minutos. Tu ejecutivo responde en menos de 2 horas.
            Sin contratos, sin letra pequeña.
          </p>
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2
                       text-[15px] font-bold text-brand-orange bg-white
                       px-[34px] py-[16px] rounded-[14px]
                       shadow-[0_4px_24px_rgba(15,25,35,0.18)]
                       hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(15,25,35,0.22)]
                       transition-all duration-[250ms]"
          >
            Quiero mi cotización
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </SectionContainer>
      </section>

    </main>
  )
}
