'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, ArrowUpRight, ArrowRight } from 'lucide-react'
import { NAV_LINKS, TRACKING_URL } from '@/lib/constants'

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-ink/40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
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
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-2 rounded-md text-ink-50 hover:text-ink hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center text-[15px] font-medium text-ink-80 hover:text-ink
                             py-3 px-3 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTAs al pie del drawer */}
        <div className="px-4 pb-6 pt-3 border-t border-gray-100 flex flex-col gap-3">
          <a
            href={TRACKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rastrear envío (abre en nueva pestaña)"
            onClick={onClose}
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
          {/* TODO: connect to /cotizar when the page is created */}
          <Link
            href="#"
            onClick={onClose}
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
