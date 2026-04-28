import type { Metadata } from 'next'

const SITE_URL  = 'https://badamensajeria.mx'
const SITE_NAME = 'Transportes BADA'

interface SolucionMetaInput {
  slug:        'ecommerce' | 'empresas' | 'pymes'
  title:       string
  description: string
}

export function solucionMeta({ slug, title, description }: SolucionMetaInput): Metadata {
  const url = `${SITE_URL}/soluciones/${slug}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'es_MX',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  }
}
