import Link          from 'next/link'
import BoltIcon      from '@/components/icons/BoltIcon'
import PackageIcon   from '@/components/icons/PackageIcon'
import TruckIcon     from '@/components/icons/TruckIcon'
import HomeDoorIcon  from '@/components/icons/HomeDoorIcon'
import type { ReactNode } from 'react'

interface Service {
  slug:        string
  title:       string
  tagline:     string
  description: string
}

interface Props {
  services: Service[]
}

function getIcon(slug: string): ReactNode {
  if (slug === 'mensajeria')     return <BoltIcon     size={40} />
  if (slug === 'paqueteria')     return <PackageIcon  size={40} />
  if (slug === 'rutas-dedicadas') return <TruckIcon   size={40} />
  return                                <HomeDoorIcon size={40} />
}

export default function ServicesGrid({ services }: Props) {
  return (
    <section className="bg-white py-[110px]">
      <div className="max-w-site mx-auto px-7">

        <div className="text-center mb-[60px]">
          <span className="tag">Servicios</span>
          <h2
            className="font-display font-black tracking-[-0.025em] text-ink leading-[1.05]"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
          >
            Lo que movemos,<br />
            cómo lo movemos.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {services.map(service => (
            <ServiceCard key={service.slug} service={service} icon={getIcon(service.slug)} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ServiceCard({ service, icon }: { service: Service; icon: ReactNode }) {
  // TODO: connect href to /servicios/${service.slug} when the pages are created
  return (
    <Link
      href="#"
      className="group border-[1.5px] border-gray-200 rounded-[20px]
                 p-[30px_26px] bg-white flex flex-col
                 transition-all duration-[250ms]
                 hover:border-brand-orange
                 hover:shadow-[0_0_0_3px_rgba(241,98,39,0.08),0_4px_20px_rgba(15,25,35,0.1)]
                 hover:-translate-y-[3px]"
    >
      <div
        className="w-12 h-12 rounded-md bg-brand-orange-50 flex items-center
                   justify-center mb-[18px]"
        aria-hidden="true"
      >
        {icon}
      </div>

      <h3 className="font-display font-black text-[21px] text-ink
                     tracking-[-0.01em] leading-[1.1] mb-[6px]">
        {service.title}
      </h3>

      <p className="text-[12px] font-bold text-brand-orange mb-3 tracking-[0.04em]">
        {service.tagline}
      </p>

      <p className="text-[13.5px] text-ink-50 leading-[1.65] mb-[22px] flex-1">
        {service.description}
      </p>

      <span className="flex items-center gap-[6px] text-[13px] font-bold text-ink-80
                       transition-all duration-200
                       group-hover:text-brand-orange group-hover:gap-[9px]">
        Ver detalles →
      </span>
    </Link>
  )
}
