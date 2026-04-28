import type { Metadata } from 'next'
import { Fraunces, Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const SITE_URL  = 'https://badamensajeria.mx'
const SITE_NAME = 'Transportes BADA'
const DESC      =
  'Mensajería y logística con ejecutivo real asignado. Respuesta garantizada en menos ' +
  'de 2 horas. Cobertura en 32 estados de México. Sin call center, sin tickets, sin excusas.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  `${SITE_NAME} — Mensajería y Logística en México`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESC,
  keywords: [
    'mensajería México', 'logística CDMX', 'envíos empresariales',
    'paquetería LTL', 'última milla', 'rutas dedicadas',
    'mensajería express', 'transportes BADA',
  ],
  openGraph: {
    title:       `${SITE_NAME} — Mensajería y Logística en México`,
    description: DESC,
    url:         SITE_URL,
    siteName:    SITE_NAME,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Transportes BADA' }],
    locale: 'es_MX',
    type:   'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${SITE_NAME} — Mensajería y Logística en México`,
    description: DESC,
    images:      ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'LocalBusiness',
  name:        SITE_NAME,
  url:         SITE_URL,
  logo:        `${SITE_URL}/images/bada-logo.png`,
  description: DESC,
  address: {
    '@type':          'PostalAddress',
    addressLocality:  'Ciudad de México',
    addressRegion:    'CDMX',
    addressCountry:   'MX',
  },
  areaServed:  'MX',
  serviceType: 'Mensajería y Logística',
  contactPoint: {
    '@type':       'ContactPoint',
    contactType:   'customer service',
    availableLanguage: 'Spanish',
  },
  sameAs: [
    /* TODO: add real social URLs */
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-js=""
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
