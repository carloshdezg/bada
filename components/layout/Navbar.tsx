'use client'

import { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, Menu } from 'lucide-react'
import { NAV_LINKS, TRACKING_URL } from '@/lib/constants'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[14px] font-medium text-ink-50 hover:text-ink transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
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
