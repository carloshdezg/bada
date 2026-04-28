import type { MetadataRoute } from 'next'

const BASE = 'https://badamensajeria.mx'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/cotizar`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/servicios`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/cobertura`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/nosotros`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contacto`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/soluciones/ecommerce`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/soluciones/empresas`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/soluciones/pymes`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
