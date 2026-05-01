'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: '¿Qué tipo de envíos acepta el servicio de Mensajería?',
    a: 'Documentos, sobres y paquetes pequeños que no requieren unidad exclusiva. Para envíos con mayor volumen o peso existe el servicio de Paquetería o Rutas Dedicadas.',
  },
  {
    q: '¿Cómo se programa la recolección?',
    a: 'La recolección se coordina directamente con tu asesor BADA, quien define horario y punto de recolección según la cobertura disponible en tu zona.',
  },
  {
    q: '¿En cuánto tiempo llega el envío?',
    a: 'El tiempo estimado de entrega depende del destino y la cobertura disponible. Tu asesor te confirmará los tiempos aplicables antes de confirmar el servicio.',
  },
  {
    q: '¿Hay límites de peso o dimensiones?',
    a: 'Los límites específicos de peso y dimensiones están por confirmar con el equipo operativo. Tu asesor puede orientarte según el tipo de envío que necesitas.',
  },
  {
    q: '¿Qué pasa si el destinatario no está en el momento de la entrega?',
    a: 'El protocolo de entrega fallida se define al contratar el servicio. Habla con tu asesor para revisar las opciones disponibles en tu cobertura.',
  },
  {
    q: '¿Se puede obtener un comprobante de entrega?',
    a: 'La generación de comprobantes de entrega está por confirmar con el equipo operativo. Consulta con tu asesor el estado actual de esta funcionalidad.',
  },
]

export default function MensajeriaFaq() {
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
