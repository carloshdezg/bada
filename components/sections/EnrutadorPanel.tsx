import Link from 'next/link'
import type { ReactNode } from 'react'
import ShieldIcon       from '@/components/icons/ShieldIcon'
import ShoppingCartIcon from '@/components/icons/ShoppingCartIcon'
import BoltIcon         from '@/components/icons/BoltIcon'
import TruckIcon        from '@/components/icons/TruckIcon'

interface Option {
  icon:   ReactNode
  strong: string
  span:   string
  href:   string
}

const OPTIONS: Option[] = [
  {
    icon:   <ShieldIcon size={36} />,
    strong: 'Mi proveedor actual falla demasiado',
    span:   'Estoy evaluando cambiar de mensajería',
    href:   '/cotizar?motivo=cambio-proveedor',
  },
  {
    icon:   <ShoppingCartIcon size={36} />,
    strong: 'Tengo un ecommerce en crecimiento',
    span:   'Necesito logística confiable para escalar',
    href:   '/soluciones/ecommerce',
  },
  {
    icon:   <BoltIcon size={36} />,
    strong: 'Necesito un envío urgente hoy',
    span:   'Es para hoy o mañana, no puede esperar',
    href:   '/cotizar?motivo=urgente',
  },
  {
    icon:   <TruckIcon size={36} />,
    strong: 'Manejo distribución recurrente',
    span:   'Necesito un socio logístico serio',
    href:   '/soluciones/empresas',
  },
]

export default function EnrutadorPanel() {
  return (
    <div className="bg-gray-50 border-[1.5px] border-gray-200 rounded-[14px] p-5 max-w-[560px]">
      <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-ink-50 mb-[14px] pl-1">
        ¿Qué describe mejor tu situación?
      </p>
      <div className="flex flex-col gap-2">
        {OPTIONS.map((opt) => (
          <Link
            key={opt.strong}
            href={opt.href}
            className="flex items-center gap-[14px] px-4 py-[14px] rounded-md
                       border-[1.5px] border-gray-200 bg-white
                       hover:border-brand-orange hover:bg-brand-orange-50 hover:translate-x-[3px]
                       transition-all duration-200 group"
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-md bg-gray-100
                            flex items-center justify-center flex-shrink-0
                            group-hover:bg-brand-orange-100 transition-colors duration-200">
              {opt.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <strong className="block text-[13px] font-semibold text-ink">
                {opt.strong}
              </strong>
              <span className="text-[11.5px] text-ink-50">{opt.span}</span>
            </div>

            {/* Arrow */}
            <span className="text-[16px] flex-shrink-0 text-ink-20
                             group-hover:text-brand-orange group-hover:translate-x-[3px]
                             transition-all duration-200">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
