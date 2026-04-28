import Link from 'next/link'
import { COVERAGE_GRID } from '@/lib/data'

interface Props {
  states: string[]
}

export default function CoverageSection({ states }: Props) {
  return (
    <section className="bg-white py-[110px]">
      <div className="max-w-site mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">

          {/* Left — copy */}
          <div>
            <span className="tag">Cobertura nacional</span>
            <h2
              className="font-display font-black tracking-[-0.025em] leading-[1.05] text-ink mb-[18px]"
              style={{ fontSize: 'clamp(38px, 4.5vw, 56px)' }}
            >
              Llegamos donde<br />tu negocio necesita.
            </h2>
            <p className="text-[15.5px] text-ink-50 leading-[1.75] mb-7">
              Cobertura activa en 32 estados con rutas directas a las principales plazas
              comerciales e industriales de México. Verifica tu zona al instante.
            </p>

            {/* State chips — each links to /cobertura for details */}
            <div className="flex flex-wrap gap-2 mb-7" role="list" aria-label="Estados con cobertura">
              {states.map(state => (
                <Link
                  key={state}
                  href="/cobertura"
                  role="listitem"
                  className="bg-gray-100 border border-gray-200 rounded-full
                             px-3 py-[5px] text-[12px] font-semibold text-ink-80
                             hover:bg-brand-orange-50 hover:border-brand-orange hover:text-brand-orange
                             transition-all duration-200"
                >
                  {state}
                </Link>
              ))}
              <Link
                href="/cobertura"
                role="listitem"
                className="bg-gray-100 border border-gray-200 rounded-full
                           px-3 py-[5px] text-[12px] font-semibold text-ink-80
                           hover:bg-brand-orange-50 hover:border-brand-orange hover:text-brand-orange
                           transition-all duration-200"
              >
                +22 estados →
              </Link>
            </div>

            {/* Coverage search — functional form, works without JS */}
            <form action="/cobertura" method="GET">
              <label htmlFor="coverage-search" className="sr-only">
                Código postal o ciudad
              </label>
              <div className="flex gap-[10px]">
                <input
                  id="coverage-search"
                  name="q"
                  type="search"
                  placeholder="Código postal o ciudad…"
                  autoComplete="off"
                  className="flex-1 bg-gray-50 border-[1.5px] border-gray-200 rounded-md
                             px-4 py-3 text-[14px] text-ink outline-none
                             placeholder:text-ink-20
                             focus:border-brand-orange transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="bg-brand-orange text-white font-bold text-[13.5px]
                             px-[22px] py-3 rounded-md whitespace-nowrap
                             hover:bg-brand-orange-light transition-colors duration-200"
                >
                  Verificar →
                </button>
              </div>
            </form>
          </div>

          {/* Right — coverage cards */}
          <CoverageGrid />

        </div>
      </div>
    </section>
  )
}

function CoverageGrid() {
  return (
    <div className="grid grid-cols-2 gap-[14px]">

      {/* Big card — span 2 cols */}
      <div className="col-span-2 bg-ink border-ink rounded-[14px] px-5 py-6 text-center">
        <div className="font-display font-black text-[52px] text-brand-orange
                        tracking-[-0.02em] leading-[1] mb-[6px]">
          32
        </div>
        <p className="text-[12px] text-white/45 font-medium">Estados con cobertura activa</p>
      </div>

      {/* Small cards */}
      {COVERAGE_GRID.map(item => (
        <div
          key={item.value}
          className="bg-gray-50 border-[1.5px] border-gray-200 rounded-[14px]
                     px-5 py-6 text-center
                     hover:border-brand-orange hover:bg-brand-orange-50 hover:-translate-y-[3px]
                     hover:shadow-[0_4px_20px_rgba(15,25,35,0.1)]
                     transition-all duration-[250ms] group"
        >
          <div className="font-display font-black text-[38px] text-ink
                          tracking-[-0.02em] leading-[1] mb-[6px]
                          group-hover:text-brand-orange transition-colors duration-[250ms]">
            {item.value}
          </div>
          <p className="text-[12px] text-ink-50 font-medium">{item.label}</p>
        </div>
      ))}

    </div>
  )
}
