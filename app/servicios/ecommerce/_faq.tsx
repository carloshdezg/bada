'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: '¿Este servicio es solo para tiendas grandes?',
    a: 'No necesariamente. Está pensado para negocios que venden en línea y quieren revisar una operación de envíos recurrentes, sin importar si están empezando o ya manejan más volumen.',
  },
  {
    q: '¿Puedo cotizar automáticamente mis envíos de e-commerce?',
    a: 'No en esta primera versión. Los envíos para e-commerce requieren validación con un asesor para revisar volumen, cobertura, frecuencia y condiciones de operación.',
  },
  {
    q: '¿Qué información necesito para solicitar asesoría?',
    a: 'Necesitamos conocer qué vendes, cuántos pedidos manejas, desde dónde envías, hacia qué zonas entregas y qué características tienen tus paquetes.',
  },
  {
    q: '¿Envíos para e-commerce es lo mismo que Paquetería?',
    a: 'No. Paquetería funciona mejor para envíos puntuales de cajas o paquetes. Envíos para e-commerce se enfoca en operaciones recurrentes de tiendas online y puede requerir una revisión más completa.',
  },
  {
    q: '¿BADA se integra con mi tienda online?',
    a: 'No debemos asumir integraciones automáticas. Si necesitas revisar un flujo para tu tienda, un asesor puede ayudarte a entender qué opciones están disponibles.',
  },
  {
    q: '¿Qué pasa si mi operación todavía es pequeña?',
    a: 'Puedes hablar con un asesor para revisar si te conviene usar paquetería estándar o si ya necesitas una solución más orientada a envíos recurrentes.',
  },
]

export default function EcommerceFaq() {
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
