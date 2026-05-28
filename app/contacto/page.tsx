import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Calculator, MessageCircle, PackageSearch,
  Phone, Mail, Clock, MapPin,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { waUrl } from '@/lib/whatsapp'
import {
  TRACKING_URL, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_SCHEDULE,
  CONTACT_ADDRESS,
} from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contacto — Transportes BADA',
  description:
    'Contacta a Transportes BADA para cotizar envíos, hablar con un asesor o resolver ' +
    'dudas sobre cobertura, rastreo y servicios logísticos.',
}

// ── Mensajes prellenados de WhatsApp por contexto ────────────────────
const WA_ASESOR    = '¡Hola! Quiero hablar con un asesor de Transportes BADA.'
const WA_EMPRESAS  = 'Hola, tengo envíos recurrentes / una operación especial y quiero que un asesor de BADA la revise.'

// ── Tracking disponible solo si BADA ya definió la URL real ──────────
const trackingReady = TRACKING_URL !== '#'

// ── Google Maps (iframe sin API key + link externo) ──────────────────
const MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=H.+Congreso+de+la+Unión+6305,+Tres+Estrellas,+Gustavo+A.+Madero,+07820+Ciudad+de+México,+CDMX&output=embed'
const MAPS_SEARCH_URL =
  'https://www.google.com/maps/search/?api=1&query=H.%20Congreso%20de%20la%20Unión%206305%2C%20Tres%20Estrellas%2C%20Gustavo%20A.%20Madero%2C%2007820%20Ciudad%20de%20México%2C%20CDMX'

// ── FAQ breve ─────────────────────────────────────────────────────────
const FAQS = [
  {
    q: '¿Puedo cotizar en línea?',
    a: 'Sí. El cotizador calcula un precio estimado a partir de medidas, peso y código postal cuando la ruta cumple las condiciones para cotización automática.',
  },
  {
    q: '¿Cuándo debo hablar con un asesor?',
    a: 'Cuando necesitas rutas dedicadas, logística, e-commerce, envíos recurrentes o cuando una ruta requiere validación especial. Un asesor te orienta sobre la mejor opción.',
  },
  {
    q: '¿Dónde puedo rastrear mi guía?',
    a: trackingReady
      ? 'Desde el botón “Rastrear” en la parte superior del sitio o en la tarjeta de rastreo de esta página, que abre el sistema de rastreo de BADA.'
      : 'El sistema de rastreo en línea está pendiente de conexión por BADA. Mientras tanto, un asesor puede ayudarte a consultar el estado de tu envío por WhatsApp.',
  },
  {
    q: '¿El precio del cotizador es definitivo?',
    a: 'Es un precio estimado. Puede ajustarse según cobertura, peso cobrable, dimensiones y condiciones operativas, por lo que algunos casos requieren validación antes de confirmar.',
  },
] as const

export default function ContactoPage() {
  return (
    <>
      <Navbar />

      <main className="pt-[68px]">

        {/* ── Hero editorial ───────────────────────────────────────── */}
        <section className="bg-white border-b border-gray-200 relative overflow-hidden">

          {/* Orange radial — top right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[80px] -right-[100px] w-[640px] h-[640px] rounded-full"
            style={{ background: 'radial-gradient(circle, #FEF0E8 0%, transparent 68%)' }}
          />
          {/* Teal radial — bottom left (acento informativo) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 -left-[120px] w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, #E8F7FA 0%, transparent 68%)' }}
          />

          <div className="max-w-site mx-auto px-5 sm:px-7 relative z-[2]">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="pt-10 mb-10">
              <ol className="flex items-center gap-[8px] list-none p-0 m-0
                             text-[12px] font-medium tracking-[0.02em] text-ink-50">
                <li>
                  <Link href="/" className="hover:text-ink transition-colors duration-200">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-20 select-none">/</li>
                <li className="text-ink">Contacto</li>
              </ol>
            </nav>

            <div className="max-w-[720px] pb-20">
              <div className="flex items-center gap-[10px] text-[12px] font-bold tracking-[0.15em] uppercase text-ink-50 mb-6">
                <div className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" aria-hidden="true" />
                Contacto
              </div>

              <h1
                className="font-display font-black leading-[1.04] tracking-[-0.025em] text-ink mb-6"
                style={{ fontSize: 'clamp(44px, 5.5vw, 68px)' }}
              >
                Hablemos de tu{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  operación.
                </em>
              </h1>

              <p className="text-[17px] text-ink-50 font-light leading-[1.75] mb-8 max-w-[560px]">
                Un ejecutivo puede ayudarte a elegir el servicio correcto, revisar cobertura
                o resolver dudas sobre tu envío.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={waUrl(WA_ASESOR)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hablar con un asesor por WhatsApp (abre en nueva pestaña)"
                  className="inline-flex items-center gap-[10px]
                             text-[15px] font-bold text-white bg-brand-orange
                             px-8 py-[15px] rounded-[14px]
                             shadow-[0_4px_20px_rgba(241,98,39,0.3)]
                             hover:bg-brand-orange-light hover:-translate-y-[2px]
                             hover:shadow-[0_8px_32px_rgba(241,98,39,0.4)]
                             transition-all duration-[250ms]"
                >
                  Hablar con un asesor
                  <ArrowUpRight className="w-[15px] h-[15px]" aria-hidden="true" />
                </a>

                <Link
                  href="/cotizar"
                  className="inline-flex items-center gap-[10px]
                             text-[15px] font-semibold text-ink-80
                             bg-gray-100 border-[1.5px] border-gray-200
                             px-7 py-[14px] rounded-[14px]
                             hover:bg-gray-200 hover:border-gray-300
                             transition-all duration-[250ms]"
                >
                  Cotizar envío
                  <ArrowRight className="w-[15px] h-[15px]" aria-hidden="true" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ── Cards de contacto rápido ─────────────────────────────── */}
        <section className="py-[88px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="mb-12 max-w-[600px]">
              <span className="tag">Cómo te ayudamos</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: '1.07' }}
              >
                Elige el camino{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  que necesitas.
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Card 1 — Cotizar */}
              <div className="flex flex-col bg-white border border-gray-200 rounded-[20px] p-7
                              shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
                              transition-shadow duration-[250ms]">
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5 flex-shrink-0
                                bg-brand-orange-50 border border-brand-orange-100">
                  <Calculator className="w-[26px] h-[26px] text-brand-orange" aria-hidden="true" />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink leading-[1.2] tracking-[-0.015em] mb-3">
                  Cotizar un envío
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.75] flex-1 mb-6">
                  Calcula un precio estimado con medidas, peso y código postal.
                </p>
                <Link
                  href="/cotizar"
                  className="inline-flex items-center gap-[7px] text-[14px] font-bold text-brand-orange
                             hover:gap-[10px] transition-all duration-200"
                >
                  Ir al cotizador
                  <ArrowRight className="w-[14px] h-[14px]" aria-hidden="true" />
                </Link>
              </div>

              {/* Card 2 — Hablar con un asesor */}
              <div className="flex flex-col bg-white border border-gray-200 rounded-[20px] p-7
                              shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
                              transition-shadow duration-[250ms]">
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5 flex-shrink-0
                                bg-brand-orange-50 border border-brand-orange-100">
                  <MessageCircle className="w-[26px] h-[26px] text-brand-orange" aria-hidden="true" />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink leading-[1.2] tracking-[-0.015em] mb-3">
                  Hablar con un asesor
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.75] flex-1 mb-6">
                  Para rutas dedicadas, logística, e-commerce o validaciones especiales.
                </p>
                <a
                  href={waUrl(WA_ASESOR)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir WhatsApp con un asesor (abre en nueva pestaña)"
                  className="inline-flex items-center gap-[7px] text-[14px] font-bold text-brand-orange
                             hover:gap-[10px] transition-all duration-200"
                >
                  WhatsApp
                  <ArrowUpRight className="w-[14px] h-[14px]" aria-hidden="true" />
                </a>
              </div>

              {/* Card 3 — Rastrear guía */}
              <div className="flex flex-col bg-white border border-gray-200 rounded-[20px] p-7
                              shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
                              transition-shadow duration-[250ms]">
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5 flex-shrink-0
                                bg-brand-blue-50 border border-brand-blue-100">
                  <PackageSearch className="w-[26px] h-[26px] text-brand-blue" aria-hidden="true" />
                </div>
                <h3 className="font-display font-black text-[20px] text-ink leading-[1.2] tracking-[-0.015em] mb-3">
                  Rastrear guía
                </h3>
                <p className="text-[14px] text-ink-50 font-light leading-[1.75] flex-1 mb-6">
                  Consulta el estado de tu envío en el sistema de rastreo.
                </p>
                {trackingReady ? (
                  <a
                    href={TRACKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Rastrear envío (abre en nueva pestaña)"
                    className="inline-flex items-center gap-[7px] text-[14px] font-bold text-brand-blue-dark
                               hover:gap-[10px] transition-all duration-200"
                  >
                    Rastrear envío
                    <ArrowUpRight className="w-[14px] h-[14px]" aria-hidden="true" />
                  </a>
                ) : (
                  // TODO: conectar al rastreador real de BADA — definir NEXT_PUBLIC_TRACKING_URL.
                  <span className="text-[13px] text-ink-50 font-medium">
                    Rastreo en línea pendiente de confirmar por BADA.
                  </span>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* ── Datos de contacto ────────────────────────────────────── */}
        <section className="py-[88px] bg-white border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="mb-12 max-w-[600px]">
              <span className="tag">Datos de contacto</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: '1.07' }}
              >
                Canales para{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  llegar a nosotros.
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* WhatsApp */}
              <ContactRow
                Icon={MessageCircle}
                tone="orange"
                label="WhatsApp"
              >
                <a
                  href={waUrl(WA_ASESOR)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors"
                >
                  Escríbenos por WhatsApp
                </a>
              </ContactRow>

              {/* Teléfono */}
              <ContactRow Icon={Phone} tone="blue" label="Teléfono">
                {/* TODO: reemplazar con número real — definir NEXT_PUBLIC_PHONE / NEXT_PUBLIC_PHONE_TEL */}
                {CONTACT_PHONE.includes('XXXX') ? (
                  <span className="text-[15px] font-medium text-ink-80">
                    Dato pendiente de confirmar por BADA.
                  </span>
                ) : (
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className="text-[15px] font-semibold text-ink hover:text-brand-orange transition-colors"
                  >
                    {CONTACT_PHONE}
                  </a>
                )}
              </ContactRow>

              {/* Correo */}
              <ContactRow Icon={Mail} tone="orange" label="Correo">
                {/* TODO: confirmar correo real con BADA antes de publicar */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[15px] font-semibold text-ink hover:text-brand-orange transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </ContactRow>

              {/* Horarios */}
              <ContactRow Icon={Clock} tone="blue" label="Horarios">
                {/* TODO: confirmar horarios exactos con BADA operaciones */}
                <span className="text-[14px] text-ink-80 leading-[1.7]">
                  {CONTACT_SCHEDULE.weekdays}<br />
                  {CONTACT_SCHEDULE.saturday}<br />
                  {CONTACT_SCHEDULE.sunday}
                </span>
              </ContactRow>

              {/* Dirección */}
              <ContactRow Icon={MapPin} tone="orange" label="Dirección">
                <span className="text-[14px] text-ink-80 leading-[1.7]">
                  {CONTACT_ADDRESS.line1},<br />
                  {CONTACT_ADDRESS.line2},<br />
                  {CONTACT_ADDRESS.line3},<br />
                  {CONTACT_ADDRESS.line4}
                </span>
              </ContactRow>

            </div>
          </div>
        </section>

        {/* ── Ubicación — Google Maps embebido ─────────────────────── */}
        <section className="py-[88px] bg-gray-50 border-b border-gray-200">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div className="max-w-[600px]">
                <span className="tag">Ubicación</span>
                <h2
                  className="font-display font-black text-ink tracking-[-0.025em]"
                  style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: '1.07' }}
                >
                  Dónde nos{' '}
                  <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                    encuentras.
                  </em>
                </h2>
              </div>

              <a
                href={MAPS_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir la ubicación en Google Maps (abre en nueva pestaña)"
                className="inline-flex items-center gap-[10px] flex-shrink-0
                           text-[15px] font-bold text-white bg-brand-orange
                           px-7 py-[13px] rounded-[14px]
                           shadow-[0_4px_20px_rgba(241,98,39,0.3)]
                           hover:bg-brand-orange-light hover:-translate-y-[2px]
                           hover:shadow-[0_8px_32px_rgba(241,98,39,0.4)]
                           transition-all duration-[250ms]"
              >
                Abrir en Google Maps
                <ArrowUpRight className="w-[15px] h-[15px]" aria-hidden="true" />
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-[24px] p-3
                            shadow-[var(--shadow-sm)] overflow-hidden">
              {/* Dirección sobre el mapa */}
              <div className="flex items-start gap-3 px-4 pt-3 pb-4">
                <MapPin className="w-[18px] h-[18px] text-brand-orange flex-shrink-0 mt-[2px]" aria-hidden="true" />
                <p className="text-[14px] text-ink-80 font-medium leading-[1.6]">
                  {CONTACT_ADDRESS.full}
                </p>
              </div>

              <iframe
                title="Ubicación de Transportes BADA"
                src={MAPS_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="w-full h-[320px] sm:h-[420px] rounded-[16px] border-0 block"
              />
            </div>
          </div>
        </section>

        {/* ── Bloque para empresas — dark, acento teal a la izquierda ── */}
        <section className="py-[110px] bg-ink relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(20,163,190,.08) 0%, transparent 50%, rgba(241,98,39,.09) 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[80px] top-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.12)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[20px] top-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full"
            style={{ border: '1px solid rgba(20,163,190,0.07)' }}
          />

          <div className="max-w-[680px] mx-auto px-5 sm:px-7 text-center relative z-[1]">
            <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.13em] uppercase text-white/40 mb-6">
              <div className="w-[24px] h-[2px] bg-white/30 rounded-sm" aria-hidden="true" />
              Para empresas
            </div>

            <h2
              className="font-display font-black text-white tracking-[-0.025em] leading-[1.07] mb-6"
              style={{ fontSize: 'clamp(30px, 4.4vw, 52px)' }}
            >
              ¿Tienes envíos recurrentes o una{' '}
              <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                operación especial?
              </em>
            </h2>

            <p className="text-[16px] text-white/55 font-light leading-[1.75] mb-10 max-w-[520px] mx-auto">
              BADA puede revisar tu operación y recomendar el servicio adecuado según volumen,
              cobertura y necesidades logísticas.
            </p>

            <a
              href={waUrl(WA_EMPRESAS)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablar con un asesor por WhatsApp (abre en nueva pestaña)"
              className="inline-flex items-center gap-[10px]
                         text-[15px] font-bold text-brand-orange bg-white
                         px-[34px] py-4 rounded-[14px]
                         shadow-[0_4px_24px_rgba(15,25,35,0.18)]
                         hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(15,25,35,0.22)]
                         transition-all duration-[250ms]"
            >
              Hablar con un asesor
              <ArrowUpRight className="w-[15px] h-[15px]" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* ── FAQ breve ────────────────────────────────────────────── */}
        <section className="py-[88px] bg-white">
          <div className="max-w-site mx-auto px-5 sm:px-7">

            <div className="mb-12 max-w-[600px]">
              <span className="tag">Preguntas frecuentes</span>
              <h2
                className="font-display font-black text-ink tracking-[-0.025em]"
                style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: '1.07' }}
              >
                Dudas{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>
                  frecuentes.
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FAQS.map(item => (
                <div
                  key={item.q}
                  className="bg-gray-50 border border-gray-200 rounded-[20px] p-7
                             shadow-[var(--shadow-sm)]"
                >
                  <h3 className="font-display font-black text-[18px] text-ink leading-[1.25] tracking-[-0.01em] mb-3">
                    {item.q}
                  </h3>
                  <p className="text-[14px] text-ink-50 font-light leading-[1.75]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

// ── Fila de dato de contacto (reutilizada en el bloque de datos) ─────
function ContactRow({
  Icon, tone, label, children,
}: {
  Icon: React.ElementType
  tone: 'orange' | 'blue'
  label: string
  children: React.ReactNode
}) {
  const isOrange = tone === 'orange'
  return (
    <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-[18px] p-6
                    shadow-[var(--shadow-sm)]">
      <div className={[
        'w-[44px] h-[44px] rounded-[12px] flex items-center justify-center flex-shrink-0',
        isOrange
          ? 'bg-brand-orange-50 border border-brand-orange-100'
          : 'bg-brand-blue-50 border border-brand-blue-100',
      ].join(' ')}>
        <Icon className={`w-[22px] h-[22px] ${isOrange ? 'text-brand-orange' : 'text-brand-blue'}`} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-ink-50 mb-1.5">
          {label}
        </p>
        {children}
      </div>
    </div>
  )
}
