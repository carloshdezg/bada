import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  'Datos del paquete',
  'Origen y destino',
  'Precio al instante',
]

interface Props {
  className?: string
}

export default function TeaserCard({ className }: Props) {
  return (
    <div
      className={cn(
        'bg-white border-[1.5px] border-gray-200 rounded-[20px] p-6',
        'shadow-[0_8px_32px_rgba(15,25,35,0.12)]',
        className
      )}
    >
      <p className="text-[14px] font-bold text-ink leading-[1.35] mb-5">
        Cotiza tu envío en menos de 60 segundos
      </p>

      <ol className="flex flex-col gap-[10px] mb-5 list-none m-0 p-0">
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span
              className="w-[26px] h-[26px] rounded-full bg-brand-orange-50 text-brand-orange
                         flex items-center justify-center text-[12px] font-bold flex-shrink-0
                         select-none"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="text-[13.5px] text-ink-80">{step}</span>
          </li>
        ))}
      </ol>

      <Link
        href="/cotizar"
        className="flex items-center justify-center gap-2
                   text-[14px] font-bold text-white bg-brand-orange
                   px-5 py-[11px] rounded-[10px] w-full
                   hover:bg-brand-orange-light hover:-translate-y-px
                   transition-all duration-200"
      >
        Empezar cotización
        <ArrowRight className="w-[14px] h-[14px]" aria-hidden="true" />
      </Link>
    </div>
  )
}
