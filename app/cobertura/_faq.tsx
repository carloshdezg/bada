'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: '¿La cobertura es fija?',
    a: 'No necesariamente. La cobertura puede actualizarse según rutas, zonas, códigos postales y condiciones operativas definidas por BADA.',
  },
  {
    q: '¿Cómo sé si mi ruta está disponible?',
    a: 'Puedes consultarla desde el cotizador ingresando el código postal de origen y destino. El sistema revisa si la ruta está activa y disponible para cotización automática.',
  },
  {
    q: '¿Qué pasa si mi ruta no aparece?',
    a: 'Si la ruta no está en la cobertura administrable, el cotizador puede indicar que se requiere validación con asesor para revisar opciones disponibles.',
  },
  {
    q: '¿Área Metropolitana y Foráneo siempre significan lo mismo?',
    a: 'La clasificación depende de la cobertura administrable vigente. La fuente de rutas tiene prioridad sobre cualquier regla general.',
  },
  {
    q: '¿La cobertura garantiza entrega?',
    a: 'No. La cobertura permite validar disponibilidad de ruta, pero la cotización y el servicio están sujetos a condiciones operativas, dimensiones, peso cobrable y validación cuando aplique.',
  },
  {
    q: '¿Puedo consultar cobertura sin cotizar?',
    a: 'La forma recomendada es usar el cotizador, porque además de revisar cobertura también considera dimensiones, peso y condiciones básicas del envío.',
  },
]

export default function CoberturaFaq() {
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
