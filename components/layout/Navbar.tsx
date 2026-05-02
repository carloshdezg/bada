'use client'

import { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, Menu, ChevronDown, Package, Truck, MapPin, LayoutGrid, ShoppingBag } from 'lucide-react'
import { NAV_LINKS, TRACKING_URL } from '@/lib/constants'
import MobileMenu from './MobileMenu'

const SERVICES = [
  {
    label:    'Mensajería',
    desc:     'Envíos express hasta 20 kg',
    href:     '/servicios/mensajeria',
    icon:     Package,
  },
  {
    label:    'Paquetería',
    desc:     'Cargas medianas puerta a puerta',
    href:     '/servicios',   // TODO: change to /servicios/paqueteria when page exists
    icon:     Truck,
  },
  {
    label:    'Rutas Dedicadas',
    desc:     'Flota exclusiva para tu negocio',
    href:     '/servicios/rutas-dedicadas',
    icon:     MapPin,
  },
  {
    label:    'Logística',
    desc:     'Almacén, picking y distribución',
    href:     '/servicios',   // TODO: change to /servicios/logistica when page exists
    icon:     LayoutGrid,
  },
  {
    label:    'E-commerce',
    desc:     'Integración con tu tienda online',
    href:     '/servicios',   // TODO: change to /servicios/ecommerce when page exists
    icon:     ShoppingBag,
  },
] as const

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on outside click or ESC
  useEffect(() => {
    if (!servicesOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setServicesOpen(false) }
    const onClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [servicesOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] h-[68px] flex items-center
                    bg-white/[0.92] backdrop-blur-[16px] transition-all duration-200
                    ${scrolled
                      ? 'border-b border-gray-200 shadow-[var(--shadow-sm)]'
                      : 'border-b border-transparent'
                    }`}
      >
        <nav className="max-w-site mx-auto px-5 sm:px-7 w-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/nav/logo-bada.svg"
              alt="Transportes BADA"
              width={160}
              height={52}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Nav links — desktop */}
          <ul className="hidden md:flex items-center gap-[34px] list-none m-0 p-0">
            {NAV_LINKS.map(link =>
              link.label === 'Servicios' ? (
                <li key="Servicios" ref={servicesRef} className="relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen(v => !v)}
                    className="flex items-center gap-1 text-[14px] font-medium text-ink-50 hover:text-ink transition-colors duration-200 cursor-pointer"
                  >
                    Servicios
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mega menu panel */}
                  <div
                    role="menu"
                    aria-label="Servicios"
                    className={`absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2
                                w-[540px] bg-white rounded-[16px]
                                shadow-[0_8px_40px_rgba(15,25,35,0.13)]
                                border border-gray-100
                                transition-all duration-200 origin-top
                                ${servicesOpen
                                  ? 'opacity-100 scale-100 pointer-events-auto'
                                  : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                  >
                    {/* Arrow */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rotate-45 bg-white border-l border-t border-gray-100 rounded-tl-[2px]"
                    />

                    {/* Service cards */}
                    <div className="p-4 grid grid-cols-2 gap-2" role="none">
                      {SERVICES.map(s => {
                        const Icon = s.icon
                        return (
                          <Link
                            key={s.label}
                            href={s.href}
                            role="menuitem"
                            onClick={() => setServicesOpen(false)}
                            className="flex items-start gap-3 p-3 rounded-[10px]
                                       hover:bg-orange-50 transition-colors duration-150 group"
                          >
                            <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-[8px] bg-orange-100
                                             flex items-center justify-center
                                             group-hover:bg-brand-orange transition-colors duration-150">
                              <Icon className="w-4 h-4 text-brand-orange group-hover:text-white transition-colors duration-150" aria-hidden="true" />
                            </span>
                            <span>
                              <span className="block text-[13.5px] font-semibold text-ink leading-snug">
                                {s.label}
                              </span>
                              <span className="block text-[12px] text-ink-50 leading-snug mt-[2px]">
                                {s.desc}
                              </span>
                            </span>
                          </Link>
                        )
                      })}
                    </div>

                    {/* Bottom row */}
                    <div
                      role="none"
                      className="border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <Link
                        href="/servicios"
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                        className="text-[13px] font-medium text-ink-50 hover:text-ink transition-colors duration-150"
                      >
                        Ver todos los servicios →
                      </Link>
                      <Link
                        href="/cotizar"
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                        className="inline-flex items-center gap-1.5
                                   text-[13px] font-bold text-white
                                   bg-brand-orange px-4 py-[7px] rounded-[8px]
                                   hover:bg-brand-orange-light transition-colors duration-150"
                      >
                        Cotizar envío
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-medium text-ink-50 hover:text-ink transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* CTAs — siempre visibles, compactos en mobile */}
          <div className="flex items-center gap-[6px] sm:gap-[8px]">

            {/* Rastrear — enlace externo, azul solo en hover */}
            <a
              href={TRACKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rastrear envío (abre en nueva pestaña)"
              className="inline-flex items-center gap-1.5
                         text-[13px] sm:text-[13.5px] font-semibold text-ink-80
                         border-[1.5px] border-gray-300 bg-transparent
                         px-3 py-2 sm:px-4 sm:py-[8px] rounded-md
                         hover:border-brand-blue hover:text-brand-blue-dark hover:bg-brand-blue-50
                         transition-all duration-200"
            >
              Rastrear
              <ArrowUpRight className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] flex-shrink-0" aria-hidden="true" />
            </a>

            {/* Cotizar — Link interno, naranja sólido */}
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-1.5
                         text-[13px] sm:text-[13.5px] font-bold text-white
                         bg-brand-orange border-[1.5px] border-brand-orange
                         px-3 py-2 sm:px-[18px] sm:py-[9px] rounded-md
                         hover:bg-brand-orange-light hover:border-brand-orange-light hover:-translate-y-px
                         hover:shadow-[0_4px_16px_rgba(241,98,39,0.35)]
                         transition-all duration-[220ms]"
            >
              Cotizar
              <ArrowRight className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] flex-shrink-0" aria-hidden="true" />
            </Link>

            {/* Hamburger — solo mobile */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden ml-0.5 p-2 rounded-md text-ink-50 hover:text-ink hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
