import Link                from 'next/link'
import ShoppingCartIcon   from '@/components/icons/ShoppingCartIcon'
import BuildingIcon       from '@/components/icons/BuildingIcon'
import TrendingUpIcon     from '@/components/icons/TrendingUpIcon'
import type { ReactNode } from 'react'

interface Solucion {
  slug:  string
  tag:   string
  title: string
  desc:  string
  link:  string
}

interface Props {
  soluciones: Solucion[]
}

function getIcon(slug: string): ReactNode {
  if (slug === 'ecommerce') return <ShoppingCartIcon size={52} />
  if (slug === 'empresas')  return <BuildingIcon     size={52} />
  return                           <TrendingUpIcon   size={52} />
}

export default function SolucionesSection({ soluciones }: Props) {
  return (
    <section className="bg-gray-50 py-[110px]">
      <div className="max-w-site mx-auto px-7">

        {/* Section header */}
        <div className="text-center mb-[60px]">
          <span className="tag">Soluciones por vertical</span>
          <h2
            className="font-display font-black tracking-[-0.025em] text-ink
                       leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
          >
            ¿Qué tipo de negocio<br />
            <em className="italic text-brand-orange">tienes?</em>
          </h2>
          <p className="text-[16.5px] text-ink-50 max-w-[540px] mx-auto leading-[1.7]">
            Los servicios son los productos —Express, LTL, Rutas, Última Milla—.
            Las soluciones son la combinación pensada para tu tipo de operación.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {soluciones.map((sol) => (
            <SolucionCard key={sol.slug} sol={sol} icon={getIcon(sol.slug)} />
          ))}
        </div>

      </div>
    </section>
  )
}

function SolucionCard({ sol, icon }: { sol: Solucion; icon: ReactNode }) {
  // TODO: connect href to /soluciones/${sol.slug} when the pages are created
  return (
    <Link
      href="#"
      className="group bg-white border-[1.5px] border-gray-200 rounded-[20px]
                 p-[38px_32px] flex flex-col
                 transition-all duration-[250ms]
                 hover:border-brand-orange
                 hover:shadow-[0_0_0_4px_rgba(241,98,39,0.06),0_4px_20px_rgba(15,25,35,0.1)]
                 hover:-translate-y-1"
    >
      {/* Icon */}
      <div
        className="w-[60px] h-[60px] rounded-[14px] bg-brand-orange-50
                   flex items-center justify-center mb-[22px]
                   transition-transform duration-[250ms]
                   group-hover:scale-[1.08] group-hover:-rotate-[4deg]"
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Tag */}
      <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-brand-orange mb-2">
        {sol.tag}
      </p>

      {/* Title */}
      <h3
        className="font-display font-black text-[26px] text-ink
                   leading-[1.1] tracking-[-0.02em] mb-[14px]"
      >
        {sol.title}
      </h3>

      {/* Desc */}
      <p className="text-[14px] text-ink-50 leading-[1.7] mb-6 flex-1">
        {sol.desc}
      </p>

      {/* Link indicator */}
      <div
        className="flex items-center gap-[6px] text-[13.5px] font-bold text-brand-orange
                   transition-all duration-200 group-hover:gap-[10px]"
      >
        {sol.link} →
      </div>
    </Link>
  )
}
