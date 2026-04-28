interface Stat {
  value: string
  label: string
}

interface Props {
  stats: readonly Stat[]
  logos: readonly string[]
}

export default function SocialProof({ stats, logos }: Props) {
  return (
    <section className="bg-gray-50 py-[110px]">
      <div className="max-w-site mx-auto px-7">

        {/* ── En números ───────────────────────────────────────────── */}
        <div className="text-center mb-[52px]">
          <span className="tag">Prueba social</span>
          <h2
            className="font-display font-black tracking-[-0.025em] text-ink leading-[1.05]"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
          >
            Resultados que se<br />
            miden en <em className="italic text-brand-orange">números</em>.
          </h2>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-3 gap-[14px] mb-[72px]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border-[1.5px] border-gray-200 rounded-[16px]
                         p-[28px_20px] text-center
                         transition-all duration-[250ms]
                         hover:border-brand-orange hover:-translate-y-[3px]
                         hover:shadow-[0_6px_24px_rgba(15,25,35,0.08)]"
            >
              <dt
                className="font-display font-black text-brand-orange leading-none
                           tracking-[-0.03em] block mb-[8px]"
                style={{ fontSize: 'clamp(40px, 5vw, 56px)' }}
              >
                {stat.value}
              </dt>
              <dd className="text-[13px] text-ink-50 leading-[1.4]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* ── Logos de clientes ────────────────────────────────────── */}
        <div className="border-t-[1.5px] border-gray-200 pt-[52px]">
          <p className="text-center text-[11.5px] tracking-[0.12em] uppercase
                        text-ink-20 font-semibold mb-[30px]">
            Empresas que confían en BADA
          </p>
          {/*
            TODO: logos reales — BADA entregará SVG monocromo por empresa.
            Implementación: <Image src="/logos/[empresa].svg" /> con
            filter:grayscale(1) por defecto y hover:grayscale(0) transition.
          */}
          <div
            className="flex justify-center items-center gap-[44px] flex-wrap"
            aria-label="Clientes destacados"
          >
            {logos.map((name) => (
              <span
                key={name}
                className="font-display font-black text-[16px] text-ink-20
                           tracking-[0.05em] uppercase select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* ── TODO: Testimonios reales ─────────────────────────────── */}
        {/*
          TODO: Sección Testimonios con casos reales.
          Pendiente de BADA: entregar 3-5 testimonios con autorización escrita
          incluyendo quote, nombre completo, empresa, cargo y métrica cuantificable.

          Cuando estén disponibles, insertar aquí un bloque <TestimonialCard>
          por cada caso. La estructura de datos esperada:
            {
              quote:   string   — texto completo
              bold:    string   — fragmento a destacar en <strong>
              metric:  string   — métrica cuantificable (ej. "↓ 40% incidencias")
              author:  string   — nombre completo
              role:    string   — cargo + empresa
              initials: string  — 2 letras para avatar
            }
        */}

      </div>
    </section>
  )
}
