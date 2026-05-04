// ─────────────────────────────────────────────────────────────────
// Transportes BADA — Static data
// Move to CMS or API when content changes frequently.
// ─────────────────────────────────────────────────────────────────

/* ── Stats bar ──────────────────────────────────────────────────── */
export const METRICS = [
  { value: '+12',  label: 'Años en operación'         },
  { value: '32',   label: 'Estados con cobertura'      },
  { value: '+4K',  label: 'Envíos mensuales'           },
  { value: '98%',  label: 'Entregas a tiempo'          },
]

/* ── Garantías ──────────────────────────────────────────────────── */
export const GARANTIAS = [
  {
    num: '01',
    variant: 'orange',
    icon: '⚡',
    title: 'Garantía de respuesta',
    desc: 'Si no te contactamos en <strong>2 horas hábiles</strong> tras tu cotización, tu primer envío no tiene costo de gestión. Sin letra pequeña. Sin condiciones ocultas.',
  },
  {
    num: '02',
    variant: 'green',
    icon: '📦',
    title: 'Garantía de entrega',
    desc: 'Si tu envío llega tarde <strong>por causa nuestra</strong>, te compensamos el costo del flete completo. Sin formularios. Sin esperar semanas.',
  },
  {
    num: '03',
    variant: 'blue',
    icon: '📄',
    title: 'Garantía de claridad',
    desc: '<strong>Lo que cotizamos es exactamente lo que cobras.</strong> Sin cargos de último momento. Sin ajustes de combustible no avisados. Sin sorpresas en la factura.',
  },
]

/* ── Soluciones ─────────────────────────────────────────────────── */
export const SOLUCIONES = [
  {
    slug: 'ecommerce',
    emoji: '📦',
    tag: 'Para ecommerce',
    title: 'Tu cliente compró. Llega mañana.',
    desc: 'Integración con tu plataforma, notificaciones automáticas a tu cliente y confirmación de entrega en tiempo real. Tu reputación, protegida.',
    link: 'Ver solución para ecommerce',
  },
  {
    slug: 'empresas',
    emoji: '🏢',
    tag: 'Para empresas con volumen',
    title: 'Tu operación no puede depender de un ticket.',
    desc: 'Ejecutivo dedicado, reportes semanales de operación, SLA documentado y proceso de escalación directo. Sin centralitas ni formularios.',
    link: 'Ver solución para empresas',
  },
  {
    slug: 'pymes',
    emoji: '📈',
    tag: 'Para PyMEs',
    title: 'Logística de empresa grande. Precio de PyME.',
    desc: 'Acceso a rutas, tecnología y atención que antes solo tenían los grandes. Sin volumen mínimo para arrancar. Sin letra pequeña.',
    link: 'Ver solución para PyMEs',
  },
]

/* ── Servicios ──────────────────────────────────────────────────── */
export const SERVICES = [
  {
    slug: 'mensajeria',
    title: 'Mensajería Express',
    tagline: 'Entrega en 24–48 horas',
    description:
      'Recolección el mismo día, confirmación en tiempo real. Para cuando el tiempo importa y el margen de error es cero.',
    icon: '⚡',
  },
  {
    slug: 'paqueteria',
    title: 'Paquetería LTL',
    tagline: 'Volumen sin ruta exclusiva',
    description:
      'Carga parcial con trazabilidad completa. Eficiencia de ruta compartida sin pagar espacio que no usas.',
    icon: '📦',
  },
  {
    slug: 'rutas-dedicadas',
    title: 'Rutas Dedicadas',
    tagline: 'Tu unidad, tu horario',
    description:
      'Unidad exclusiva para tu operación recurrente. Para cadenas de suministro y clientes prioritarios.',
    icon: '🚛',
  },
  {
    slug: 'logistica',
    title: 'Última Milla',
    tagline: 'Del almacén al cliente final',
    description:
      'El tramo más crítico de la cadena. Firma digital, notificación automática y confirmación de entrega con evidencia.',
    icon: '🏠',
  },
]

/* ── Cómo funciona — 4 pasos ────────────────────────────────────── */
export const STEPS = [
  {
    number: '01',
    title: 'Cotiza en minutos',
    description:
      'Llena el formulario o escríbenos por WhatsApp. Tu ejecutivo te responde en menos de 2 horas hábiles con una propuesta sin sorpresas.',
  },
  {
    number: '02',
    title: 'Ejecutivo asignado',
    description:
      'Desde el primer día tienes una persona real con nombre y WhatsApp directo. No un ticket. No un correo genérico.',
  },
  {
    number: '03',
    title: 'Recolectamos',
    description:
      'Coordinamos desde tu punto de origen. Recibes confirmación cuando el paquete ya está en tránsito hacia su destino.',
  },
  {
    number: '04',
    title: 'Entrega confirmada',
    description:
      'Tu cliente recibe notificación automática. Tú recibes confirmación con evidencia. Si algo falla, actuamos antes de que preguntes.',
  },
]

/* ── Comparativa ────────────────────────────────────────────────── */
export const COMPARATIVA_ROWS = [
  { criterio: 'Respuesta a incidencias',  bada: 'Menos de 2 horas',         otros: '24–72 horas'         },
  { criterio: 'Ejecutivo de cuenta',      bada: 'Desde el primer contrato',  otros: 'Solo alto volumen'   },
  { criterio: 'Compensación por fallo',   bada: '48 horas, sin burocracia',  otros: 'Semanas de proceso'  },
  { criterio: 'Contacto directo',         bada: 'WhatsApp con tu ejecutivo', otros: 'Call center con menú'},
  { criterio: 'Precio transparente',      bada: 'Sin cargos ocultos',        otros: 'Ajustes frecuentes'  },
]

/* ── Cobertura ──────────────────────────────────────────────────── */
export const COVERAGE_STATES = [
  'CDMX', 'Jalisco', 'Nuevo León', 'Puebla', 'Edo. de México',
  'Querétaro', 'Guanajuato', 'Veracruz', 'Yucatán', 'Chihuahua',
]

export const DELIVERY_TIMES = [
  { zone: 'CDMX y ZMVM',          time: '24 hrs' },
  { zone: 'Estados cercanos',      time: '48 hrs' },
  { zone: 'Resto de la República', time: '72 hrs' },
]

export const COVERAGE_GRID = [
  { value: '24h',  label: 'CDMX → GDL'         },
  { value: '48h',  label: 'CDMX → MTY'          },
  { value: 'SDD',  label: 'Same day CDMX'        },
  { value: '+50',  label: 'Rutas directas'       },
]

/* ── Testimonios ────────────────────────────────────────────────── */
export const TESTIMONIALS = [
  {
    metric: '↓ 40% menos incidencias',
    quote: 'Llevábamos dos años peleando con Estafeta por retrasos. Con BADA llevamos 8 meses y no hemos tenido un solo caso sin resolver en el mismo día. La diferencia es tener a alguien real al teléfono.',
    bold: 'no hemos tenido un solo caso sin resolver en el mismo día.',
    author: 'Miguel Reyes',
    role: 'Director de Operaciones · Distribuidora Textil del Valle',
    initials: 'MR',
  },
  {
    metric: '↑ 98.4% tasa de entrega',
    quote: 'Tengo 300 envíos mensuales. Antes el 8% tenía algún problema. Con BADA, bajó a menos del 2%. Mi calificación en Mercado Libre subió en dos meses.',
    bold: 'Mi calificación en Mercado Libre subió en dos meses.',
    author: 'Laura Castillo',
    role: 'Fundadora · TiendaOrganics.mx',
    initials: 'LC',
  },
  {
    metric: '↓ 3 días → respuesta en 47 min',
    quote: 'Lo que me convenció no fue el precio. Fue que cuando llamé para cotizar, me respondió una persona con nombre. No un formulario. En logística eso ya no es normal.',
    bold: 'En logística eso ya no es normal.',
    author: 'Andrés Villanueva',
    role: 'Gerente de Compras · Grupo Ferretero Azteca',
    initials: 'AV',
  },
]

export const CLIENT_LOGOS = [
  'Grupo Valle',
  'TiendaOrganics',
  'Ferretero Azteca',
  'Distribuidora Norte',
  'Moda Express',
  'FarmaPlus',
]

/* ── Legacy exports (keep backward-compat with existing components) */
export const TESTIMONIAL = TESTIMONIALS[0]
export const CLIENTS = CLIENT_LOGOS.map(name => ({ name, logo: '' }))

/* ── Nav ────────────────────────────────────────────────────────── */
export const NAV_LINKS = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/cobertura', label: 'Cobertura' },
  { href: '/nosotros',  label: 'Nosotros'  },
  // TODO: crear /contacto o conectar a WhatsApp/asesor si BADA lo define así
  { href: '#',          label: 'Contacto'  },
]

/* ── Footer ─────────────────────────────────────────────────────── */
export const FOOTER_SOLUCIONES = [
  { label: 'Para e-commerce', href: '/servicios/ecommerce' },
  { label: 'Para empresas',   href: '/servicios' },
  { label: 'Para PyMEs',      href: '/servicios' },
]

/** @deprecated Renamed to FOOTER_SOLUCIONES */
export const FOOTER_SERVICES = FOOTER_SOLUCIONES

export const FOOTER_SERVICIOS = [
  { label: 'Mensajería',             href: '/servicios/mensajeria' },
  { label: 'Paquetería',             href: '/servicios/paqueteria' },
  { label: 'Rutas Dedicadas',        href: '/servicios/rutas-dedicadas' },
  { label: 'Logística',              href: '/servicios/logistica' },
  { label: 'Envíos para e-commerce', href: '/servicios/ecommerce' },
]

export const FOOTER_EMPRESA = [
  { label: 'Nosotros',  href: '/nosotros' },
  { label: 'Cobertura', href: '/cobertura' },
  // TODO: conectar al rastreador real de BADA cuando el programador defina la ruta o URL externa.
  // Si /rastreo no existe todavía, no usar /rastreo para evitar 404.
  { label: 'Rastreo',   href: '#' },
]

// Keep legacy export names
export const FOOTER_LINKS = FOOTER_EMPRESA
