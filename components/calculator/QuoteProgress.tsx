'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepState {
  active: boolean
  done:   boolean
}

interface Props {
  step1: StepState
  step2: StepState
  step3: StepState
}

const STEPS = [
  { n: 1, label: 'Datos del paquete', sub: 'Servicio, medidas y peso' },
  { n: 2, label: 'Origen y destino',  sub: 'Ruta y cobertura'        },
  { n: 3, label: 'Precio estimado',   sub: 'IVA incluido'            },
] as const

export default function QuoteProgress({ step1, step2, step3 }: Props) {
  const states = [step1, step2, step3]

  return (
    <div className="bg-white border border-[#DDE3EA] rounded-[24px] shadow-[0_8px_28px_rgba(15,25,35,.08)] p-4 mb-7">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STEPS.map((s, i) => {
          const st = states[i]
          return (
            <div
              key={s.n}
              className={cn(
                'flex items-center gap-3 p-[14px] rounded-[16px] border transition-colors',
                st.done
                  ? 'bg-[#E6F7FB] border-[rgba(20,163,190,.25)] text-ink'
                  : st.active
                    ? 'bg-[#FEF0EA] border-[rgba(241,98,39,.28)] text-ink'
                    : 'bg-[#F8FAFB] border-[#DDE3EA] text-ink-50'
              )}
            >
              <div className={cn(
                'w-[34px] h-[34px] rounded-full border flex items-center justify-center font-black text-[14px] flex-shrink-0 bg-white',
                st.done   ? 'border-brand-blue text-brand-blue'   :
                st.active ? 'border-brand-orange text-brand-orange' :
                            'border-current text-current'
              )}>
                {st.done ? <Check size={15} strokeWidth={3} /> : s.n}
              </div>
              <div>
                <strong className="block text-[14px] font-bold leading-tight">{s.label}</strong>
                <small className="block text-[12px] text-ink-50 mt-0.5">{s.sub}</small>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
