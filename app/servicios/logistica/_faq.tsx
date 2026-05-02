'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: '¿Qué significa una solución logística?',
    a: 'Es una revisión más amplia de la operación para identificar qué servicio o combinación de servicios puede resolver mejor una necesidad de envío, ruta o coordinación.',
  },
  {
    q: '¿Puedo cotizar Logística automáticamente?',
    a: 'No en esta primera versión. Las soluciones logísticas requieren validación con un asesor para revisar cobertura, alcance, frecuencia, volumen y condiciones operativas.',
  },
  {
    q: '¿Qué información necesito para solicitar una solución logística?',
    a: 'Necesitamos conocer qué se va a mover, origen, destino, frecuencia, volumen aproximado, condiciones especiales y objetivo de la operación.',
  },
  {
    q: '¿Logística es lo mismo que Rutas Dedicadas?',
    a: 'No. Rutas Dedicadas se orienta a recorridos o unidades específicas. Logística revisa una necesidad más amplia y puede orientar hacia distintos servicios según el caso.',
  },
  {
    q: '¿La solución está garantizada desde el primer contacto?',
    a: 'No. Primero se validan cobertura, disponibilidad, operación y condiciones para definir si BADA puede atender la necesidad y bajo qué alcance.',
  },
  {
    q: '¿Qué pasa si mi necesidad todavía no está bien definida?',
    a: 'Puedes hablar con un asesor para ordenar la información y revisar si conviene paquetería, rutas dedicadas u otra solución logística.',
  },
]

export default function LogisticaFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  return (
    <div className="flex flex-col gap-3" role="list">
      {FAQS.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            role="listitem"
            className="bg-white border border-gray-200 rounded-[16px] overflow-hidden shadow-[var(--shadow-sm)]"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex items-center justify-between w-full px-6 py-5 text-left gap-4
                         hover:bg-gray-50 transition-colors"
            >
              <span className="text-[15px] font-semibold text-ink leading-[1.4]">
                {item.q}
              </span>
              <span
                className={[
                  'w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0',
                  'border transition-all duration-200',
                  isOpen
                    ? 'rotate-180 bg-brand-orange border-brand-orange'
                    : 'bg-gray-100 border-gray-200',
                ].join(' ')}
                aria-hidden="true"
              >
                <ChevronDown
                  className={`w-[11px] h-[11px] transition-colors ${isOpen ? 'text-white' : 'text-ink-50'}`}
                />
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-5 border-t border-gray-100">
                <p className="text-[14px] text-ink-50 font-light leading-[1.75] pt-4">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
