import Link from 'next/link'
import Image from 'next/image'
import { FOOTER_SOLUCIONES, FOOTER_SERVICIOS, FOOTER_EMPRESA } from '@/lib/data'

interface FooterLink {
  label: string
  href: string
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
              className="mb-4 inline-flex h-[48px] w-[170px] items-center"
              aria-label="Ir al inicio"
            >
              <Image
                src="/images/footer/logo-bada-footer.svg"
                alt="Transportes BADA"
                width={170}
                height={48}
                className="block h-auto w-full"
                priority={false}
              />
            </Link>

            <p className="text-[13.5px] !text-white leading-[1.75] max-w-[260px] mb-[22px]">
              Mensajería y logística con atención humana real. Sin call centers, sin tickets,
              sin excusas. Tu operación, nuestra responsabilidad.
            </p>

            {/* TODO: reemplazar href con URLs reales de redes sociales de BADA */}
            <div className="flex gap-[10px]">
              {[
                {
                  label: 'LinkedIn',
                  href: 'https://linkedin.com',
                  icon: <LinkedInIcon />,
                },
                {
                  label: 'Facebook',
                  href: 'https://facebook.com',
                  icon: <FacebookIcon />,
                },
                {
                  label: 'Instagram',
                  href: 'https://instagram.com',
                  icon: <InstagramIcon />,
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-[10px]
                             border border-white/15 bg-white/[0.06]
                             !text-white transition-all duration-200 select-none
                             hover:border-brand-orange hover:bg-brand-orange hover:!text-white"
                >
                  <span className="flex items-center justify-center !text-white group-hover:!text-white">
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Soluciones" links={FOOTER_SOLUCIONES} />
          <FooterCol title="Servicios" links={FOOTER_SERVICIOS} />
          <FooterCol title="Empresa" links={FOOTER_EMPRESA} />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] pt-[26px] flex flex-wrap justify-between items-center gap-3">
          <p className="text-[12.5px] !text-white">
            © {new Date().getFullYear()} Transportes BADA. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap gap-x-[22px] gap-y-3">
            {[
              { label: 'Aviso de privacidad', href: '/aviso-privacidad' },
              { label: 'Términos y condiciones', href: '/terminos' },
              { label: 'Artículos prohibidos', href: '/prohibidos' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12.5px] !text-white hover:opacity-80 transition-opacity"
              >
                {link.label}
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
      <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase !text-white mb-[18px]">
        {title}
      </h4>

      <ul className="list-none space-y-[11px] m-0 p-0">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[13.5px] !text-white hover:opacity-80 transition-opacity duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] fill-current !text-white"
    >
      <path d="M6.94 8.5H3.56V20h3.38V8.5Zm-1.69-5A1.97 1.97 0 0 0 3.28 5.47c0 1.1.86 1.97 1.94 1.97h.03a1.97 1.97 0 1 0 0-3.94ZM20 12.88c0-3.46-1.85-5.07-4.32-5.07-1.99 0-2.88 1.1-3.38 1.87V8.5H8.94c.04.78 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.67.12-.91.27-.67.88-1.37 1.9-1.37 1.34 0 1.87 1.03 1.87 2.54V20H20v-7.12Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] fill-current !text-white"
    >
      <path d="M13.5 21v-7.03h2.36l.35-2.74H13.5v-1.75c0-.8.22-1.33 1.37-1.33h1.46V5.7c-.25-.03-1.1-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.61v2.02H8.38v2.74h2.35V21h2.77Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] fill-current !text-white"
    >
      <path d="M7.75 3h8.5A4.75 4.75 0 0 1 21 7.75v8.5A4.75 4.75 0 0 1 16.25 21h-8.5A4.75 4.75 0 0 1 3 16.25v-8.5A4.75 4.75 0 0 1 7.75 3Zm0 1.8A2.95 2.95 0 0 0 4.8 7.75v8.5a2.95 2.95 0 0 0 2.95 2.95h8.5a2.95 2.95 0 0 0 2.95-2.95v-8.5a2.95 2.95 0 0 0-2.95-2.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.6A4.4 4.4 0 1 1 7.6 12 4.4 4.4 0 0 1 12 7.6Zm0 1.8A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Z" />
    </svg>
  )
}