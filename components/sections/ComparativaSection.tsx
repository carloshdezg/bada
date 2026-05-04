import Link from 'next/link'

interface Row {
  criterio: string
  bada:     string
  otros:    string
}

interface Props {
  rows: Row[]
}

export default function ComparativaSection({ rows }: Props) {
  return (
    <section className="bg-gray-50 py-[110px]">
      <div className="max-w-site mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[80px] items-center">

          {/* Copy */}
          <div>
            <span className="tag">¿Por qué cambiarse?</span>
            <h2
              className="font-display font-black tracking-[-0.025em] leading-[1.05] text-ink mb-5"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
            >
              El servicio que los grandes<br />
              <em className="italic text-brand-orange">no pueden dar.</em>
            </h2>
            <p className="text-[15px] text-ink-50 leading-[1.75] mb-[30px]">
              Los carriers grandes son sistemas. Tienen call centers, tickets de 48 horas
              y contratos que nadie lee. BADA es exactamente lo contrario.
            </p>
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-[10px]
                         text-[14px] font-bold text-white bg-brand-orange
                         px-8 py-[15px] rounded-[14px]
                         shadow-[0_4px_20px_rgba(241,98,39,0.3)]
                         hover:bg-brand-orange-light hover:-translate-y-px
                         hover:shadow-[0_8px_32px_rgba(241,98,39,0.4)]
                         transition-all duration-[250ms]"
            >
              Quiero cambiarme a BADA →
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white border-[1.5px] border-gray-200 rounded-[20px]
                          overflow-hidden shadow-[0_4px_20px_rgba(15,25,35,0.1)]">
            <div className="overflow-x-auto">
            <table className="min-w-[560px] w-full border-collapse">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-4 text-[12px] font-bold tracking-[0.08em] uppercase
                               text-left border-b-[1.5px] border-gray-200
                               text-ink-50 bg-gray-50 w-[32%]"
                  >
                    Criterio
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-[12px] font-bold tracking-[0.08em] uppercase
                               text-left border-b-[1.5px] border-gray-200
                               bg-brand-orange text-white w-[34%]"
                  >
                    BADA
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-[12px] font-bold tracking-[0.08em] uppercase
                               text-left border-b-[1.5px] border-gray-200
                               bg-gray-100 text-ink-50 w-[34%]"
                  >
                    Carriers grandes
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.criterio} className="border-b border-gray-100 last:border-b-0">
                    <th
                      scope="row"
                      className={[
                        'px-5 py-[14px] text-[13px] font-medium text-ink-50 text-left',
                        i % 2 === 1 ? 'bg-gray-50' : '',
                      ].join(' ')}
                    >
                      {row.criterio}
                    </th>
                    <td className={['px-5 py-[14px] text-[13.5px] font-medium text-ink', i % 2 === 1 ? 'bg-gray-50' : ''].join(' ')}>
                      <span aria-label="Sí" className="text-success mr-[5px]">✓</span>
                      {row.bada}
                    </td>
                    <td className={['px-5 py-[14px] text-[13.5px] text-ink-20', i % 2 === 1 ? 'bg-gray-50' : ''].join(' ')}>
                      <span aria-label="No" className="text-danger opacity-50 mr-[5px]">✗</span>
                      {row.otros}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
