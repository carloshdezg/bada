interface Metric {
  value: string
  label: string
}

interface Props {
  metrics: Metric[]
}

export default function TrustStrip({ metrics }: Props) {
  return (
    <div className="bg-ink py-9" role="region" aria-label="Estadísticas de operación">
      <div className="max-w-site mx-auto px-7">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.value}
              className={[
                'text-center px-6',
                i < metrics.length - 1 ? 'border-r border-white/[0.08]' : '',
              ].join(' ')}
            >
              <dt className="font-display font-black text-[44px] text-brand-orange
                             leading-none tracking-[-0.02em] block">
                {m.value}
              </dt>
              <dd className="text-[13px] text-white/45 mt-[5px]">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
