// TODO: replace '#' with real hrefs when the pages are created
export const NAV_LINKS = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/cobertura',  label: 'Cobertura' },
  { href: '#',          label: 'Nosotros'  },
  { href: '#',          label: 'Contacto'  },
] as const

export const TRACKING_URL = process.env.NEXT_PUBLIC_TRACKING_URL ?? '#'

// ── Prueba social — datos verificados por BADA ──────────────────────
// Valores marcados con "TODO" están pendientes de confirmación escrita.
export const STATS_EN_NUMEROS = [
  { value: '12+',    label: 'Años en operación'   },
  { value: '4,000+', label: 'Envíos mensuales'    },
  { value: '32',     label: 'Estados con cobertura' },
  { value: '98%',    label: 'Entregas a tiempo'   }, // TODO: confirmar con BADA operaciones
  { value: 'XX',     label: 'Clientes activos'    }, // TODO: pendiente dato de BADA
  { value: 'XX',     label: 'Ejecutivos de cuenta' }, // TODO: pendiente dato de BADA
] as const

// Logos tipográficos — placeholders hasta que BADA entregue SVG monocromo autorizado.
// Formato recomendado: SVG monocromo, filtro grayscale → color en hover.
export const LOGOS_CLIENTES = [
  'Grupo Valle',
  'TiendaOrganics',
  'Ferretero Azteca',
  'Distribuidora Norte',
  'Moda Express',
  'FarmaPlus',
] as const

// ── Contacto ─────────────────────────────────────────────────────────
// Fuente única para todos los canales de contacto.
// Número y teléfono vienen de env para no hardcodear dígitos reales.

// TODO: confirmar correo real con BADA antes de publicar
export const CONTACT_EMAIL = 'contacto@transportesbada.com'

// TODO: reemplazar XXXX con número real — agregar a .env (NEXT_PUBLIC_PHONE)
export const CONTACT_PHONE     = process.env.NEXT_PUBLIC_PHONE     ?? '+52 55 XXXX XXXX'
export const CONTACT_PHONE_TEL = process.env.NEXT_PUBLIC_PHONE_TEL ?? '+5255XXXXXXXX'

// TODO: confirmar horarios exactos con BADA operaciones
export const CONTACT_SCHEDULE = {
  weekdays: 'L-V 8:00 am – 7:00 pm',
  saturday: 'Sáb 9:00 am – 2:00 pm',
  sunday:   'Dom cerrado',
} as const
