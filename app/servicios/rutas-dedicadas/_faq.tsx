'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: '¿Qué es una ruta dedicada?',
    a: 'Es una solución pensada para operaciones que requieren una ruta, unidad o coordinación específica, validada según origen, destino, frecuencia, volumen y condiciones operativas.',
  },
  {
    q: '¿Puedo cotizar una ruta dedicada automáticamente?',
    a: 'No en esta primera versión. Las rutas dedicadas requieren validación con un asesor para revisar cobertura, disponibilidad y condiciones del servicio.',
  },
  {
    q: '¿Qué información necesito para solicitar una ruta dedicada?',
    a: 'Necesitamos conocer origen, destino, frecuencia, volumen aproximado, tipo de mercancía, horarios y cualquier condición especial de la operación.',
  },
  {
    q: '¿Rutas Dedicadas es lo mismo que Paquetería?',
    a: 'No. Paquetería está pensada para enviar paquetes, cajas o bultos bajo una lógica de cotización estándar. Rutas Dedicadas se orienta a operaciones específicas o recurrentes que requieren mayor coordinación.',
  },
  {
    q: '¿La disponibilidad está garantizada?',
    a: 'No. La disponibilidad depende de cobertura, capacidad operativa, frecuencia, ruta y condiciones del servicio. Por eso se valida con un asesor antes de confirmar.',
  },
  {
    q: '¿Qué pasa si mi operación todavía no está bien definida?',
    a: 'Puedes hablar con un asesor para revisar el caso y entender si conviene una ruta dedicada, paquetería u otra solución logística.',
  },
]

export default function RutasDedicadasFaq() {
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
