import Link from 'next/link'
import { FOOTER_SOLUCIONES, FOOTER_SERVICIOS, FOOTER_EMPRESA } from '@/lib/data'

interface FooterLink {
  label: string
  href:  string
}

export default function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-8">
      <div className="max-w-site mx-auto px-7">

        {/* Main grid — Brand · Soluciones · Servicios · Empresa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[52px] mb-[52px]">

          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="font-display font-black text-white text-[28px] tracking-[-0.02em] mb-4 inline-block leading-none"
            >
              BAD<span className="text-brand-orange">A</span>
            </Link>
            <p className="text-[13.5px] text-white leading-[1.75] max-w-[260px] mb-[22px]">
              Mensajería y logística con atención humana real. Sin call centers, sin tickets,
              sin excusas. Tu operación, nuestra responsabilidad.
            </p>
            {/* TODO: reemplazar href con URLs reales de redes sociales */}
            <div className="flex gap-[10px] text-orange-400">
              {[
                { s: 'in', href: 'https://linkedin.com' },
                { s: 'fb', href: 'https://facebook.com' },
                { s: 'ig', href: 'https://instagram.com' },
              ].map(({ s, href }) => (
                <a
                  key={s}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s}
                  className="w-9 h-9 bg-white/[0.06] border border-white/10 rounded-md
                             flex items-center justify-center
                             text-[14px] text-white/40
                             hover:bg-brand-orange hover:border-brand-orange hover:text-white
                             transition-all duration-200 select-none"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Soluciones" links={FOOTER_SOLUCIONES} />
          <FooterCol title="Servicios"  links={FOOTER_SERVICIOS}  />
          <FooterCol title="Empresa"    links={FOOTER_EMPRESA}    />

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] text-white pt-[26px] flex flex-wrap justify-between items-center gap-3">
          <p className="text-[12.5px] text-white">
            © {new Date().getFullYear()} Transportes BADA. Todos los derechos reservados.
          </p>
          <div className="flex gap-[22px]">
            {[
              { label: 'Aviso de privacidad',    href: '/aviso-privacidad' },
              { label: 'Términos y condiciones', href: '/terminos'         },
              { label: 'Artículos prohibidos',   href: '/prohibidos'       },
            ].map(l => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[12.5px] text-[rgba(255,255,255,0.45)] hover:text-[#ffffff] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-[rgba(255,255,255,0.85)] mb-[18px]">
        {title}
      </h4>
      <ul className="list-none space-y-[11px] m-0 p-0">
        {links.map(link => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[13.5px] text-[rgba(255,255,255,0.55)] hover:text-[#ffffff] transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
