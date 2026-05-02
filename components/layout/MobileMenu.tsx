'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react'
import { NAV_LINKS, TRACKING_URL } from '@/lib/constants'

const SERVICES = [
  { label: 'Mensajería',      href: '/servicios/mensajeria' },
  { label: 'Paquetería',      href: '/servicios/paqueteria' },
  { label: 'Rutas Dedicadas', href: '/servicios/rutas-dedicadas' },
  { label: 'Logística',       href: '/servicios/logistica' },
  { label: 'E-commerce',      href: '/servicios/ecommerce' },
] as const

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: Props) {
  const [servicesExpanded, setServicesExpanded] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleClose() {
    setServicesExpanded(false)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-ink/40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed top-0 right-0 z-[201] h-full w-[280px] bg-white shadow-xl
                    flex flex-col transition-transform duration-300 ease-out
                    ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between h-[68px] px-6 border-b border-gray-200 flex-shrink-0">
          <span className="font-display font-black text-[22px] tracking-[-0.02em] text-ink leading-none">
            BAD<span className="text-brand-orange">A</span>
          </span>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar menú"
            className="p-2 rounded-md text-ink-50 hover:text-ink hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
            {NAV_LINKS.map(link =>
              link.label === 'Servicios' ? (
                <li key="Servicios">
                  {/* Expandable trigger */}
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={servicesExpanded}
                    onClick={() => setServicesExpanded(v => !v)}
                    className="w-full flex items-center justify-between text-[15px] font-medium text-ink-80 hover:text-ink
                               py-3 px-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Servicios
                    <ChevronDown
                      className={`w-4 h-4 text-ink-50 transition-transform duration-200 ${servicesExpanded ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Sub-links */}
                  <ul
                    className={`list-none m-0 pl-3 overflow-hidden transition-all duration-200 ${
                      servicesExpanded ? 'max-h-[400px] opacity-100 pb-1' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {SERVICES.map(s => (
                      <li key={s.label}>
                        <Link
                          href={s.href}
                          onClick={handleClose}
                          className="flex items-center text-[14px] font-medium text-ink-50 hover:text-ink
                                     py-2.5 px-3 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mr-2.5 flex-shrink-0" aria-hidden="true" />
                          {s.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/servicios"
                        onClick={handleClose}
                        className="flex items-center text-[13px] font-semibold text-brand-orange
                                   py-2.5 px-3 rounded-md hover:bg-orange-50 transition-colors mt-0.5"
                      >
                        Ver todos los servicios →
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={handleClose}
                    className="flex items-center text-[15px] font-medium text-ink-80 hover:text-ink
                               py-3 px-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* CTAs al pie del drawer */}
        <div className="px-4 pb-6 pt-3 border-t border-gray-100 flex flex-col gap-3">
          <a
            href={TRACKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rastrear envío (abre en nueva pestaña)"
            onClick={handleClose}
            className="flex items-center justify-center gap-2
                       text-[14px] font-semibold text-ink-80
                       border-[1.5px] border-gray-300 bg-transparent
                       px-4 py-3 rounded-md
                       hover:border-brand-blue hover:text-brand-blue-dark hover:bg-brand-blue-50
                       transition-all duration-200"
          >
            Rastrear envío
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <Link
            href="/cotizar"
            onClick={handleClose}
            className="flex items-center justify-center gap-2
                       text-[14px] font-bold text-white
                       bg-brand-orange border-[1.5px] border-brand-orange
                       px-4 py-3 rounded-md
                       hover:bg-brand-orange-light hover:border-brand-orange-light
                       transition-all duration-200"
          >
            Cotizar ahora
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  )
}
