'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: '¿Cómo se calcula el peso cobrable?',
    a: 'El peso cobrable se define comparando el peso real contra el peso volumétrico. Se toma el mayor de los dos y, si tiene decimales, se redondea al kilo inmediato superior.',
  },
  {
    q: '¿Qué es el peso volumétrico?',
    a: 'Es una forma de calcular el espacio que ocupa un paquete. En el cotizador se calcula con la fórmula: largo × ancho × alto / 5000.',
  },
  {
    q: '¿El precio que muestra el cotizador es final?',
    a: 'No. El cotizador muestra un precio estimado con IVA incluido, sujeto a validación de cobertura, dimensiones, peso cobrable y condiciones operativas.',
  },
  {
    q: '¿Qué pasa si mi paquete excede las dimensiones permitidas?',
    a: 'Si el paquete supera los límites de cotización automática, el sistema te indicará que el envío requiere validación con un asesor.',
  },
  {
    q: '¿Puedo cotizar cualquier ruta?',
    a: 'La cotización automática depende de la cobertura administrable vigente. Si la ruta no está disponible, está desactivada o requiere validación, el sistema te enviará con un asesor.',
  },
  {
    q: '¿Cuál es la diferencia entre Mensajería y Paquetería?',
    a: 'Mensajería está pensada para documentos y paquetes pequeños. Paquetería es mejor para cajas, paquetes o bultos con mayor peso o volumen.',
  },
]

export default function PaqueteriaFaq() {
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
