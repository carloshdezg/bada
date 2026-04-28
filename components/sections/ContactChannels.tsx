import ChatIcon  from '@/components/icons/ChatIcon'
import PhoneIcon from '@/components/icons/PhoneIcon'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_SCHEDULE,
} from '@/lib/constants'
import { waUrl } from '@/lib/whatsapp'

export default function ContactChannels() {
  return (
    <section className="bg-gray-50 py-[90px]" aria-label="Canales de contacto">
      <div className="max-w-site mx-auto px-7">

        {/* ── Two channel cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

          {/* WhatsApp — canal principal */}
          <div className="bg-ink rounded-[24px] p-[44px_36px] flex flex-col relative overflow-hidden">

            {/* Decorative blob */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-[80px] -right-[80px]
                         w-[300px] h-[300px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(241,98,39,0.14), transparent 65%)' }}
            />

            <div className="relative z-[1] flex flex-col h-full">
              {/* Badge */}
              <span
                className="self-start inline-flex items-center gap-[6px]
                           bg-brand-orange/15 border border-brand-orange/30
                           text-brand-orange text-[11px] font-bold
                           tracking-[0.08em] uppercase px-[10px] py-1 rounded-full mb-8"
              >
                Canal principal
              </span>

              {/* Icon + title */}
              <div className="flex items-center gap-4 mb-3">
                <ChatIcon primary="orange" size={52} />
                <h2 className="font-display font-black text-[36px] text-white
                               leading-none tracking-[-0.02em]">
                  WhatsApp
                </h2>
              </div>

              <p className="text-[15px] text-white/55 mb-1">
                Respuesta en menos de 2 horas hábiles
              </p>
              <p className="text-[13px] text-white/35 mb-8">
                24/7*
              </p>

              {/* CTA */}
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir WhatsApp de Transportes BADA (se abre en nueva pestaña)"
                className="mt-auto inline-flex items-center justify-center gap-[10px]
                           bg-brand-orange text-white font-bold text-[15px]
                           px-[32px] py-[14px] rounded-[14px]
                           hover:bg-brand-orange-light hover:-translate-y-px
                           hover:shadow-[0_8px_32px_rgba(241,98,39,0.35)]
                           transition-all duration-[250ms] self-start"
              >
                Abrir WhatsApp →
              </a>
            </div>
          </div>

          {/* Teléfono */}
          <div className="bg-white border-[1.5px] border-gray-200 rounded-[24px]
                          p-[44px_36px] flex flex-col">

            {/* Icon + title */}
            <div className="flex items-center gap-4 mb-3">
              <PhoneIcon primary="orange" size={52} />
              <h2 className="font-display font-black text-[36px] text-ink
                             leading-none tracking-[-0.02em]">
                Teléfono
              </h2>
            </div>

            {/* Schedule */}
            <p className="text-[14px] text-ink-50 mb-[6px]">
              {CONTACT_SCHEDULE.weekdays}
            </p>
            <p className="text-[14px] text-ink-50 mb-8">
              {CONTACT_SCHEDULE.saturday}
            </p>

            {/* Number — big, click-to-call */}
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              aria-label={`Llamar a Transportes BADA al ${CONTACT_PHONE}`}
              className="font-display font-black text-[32px] text-brand-orange
                         leading-none tracking-[-0.02em] mb-8
                         hover:text-brand-orange-dark transition-colors duration-200
                         self-start"
            >
              {CONTACT_PHONE}
            </a>

            {/* CTA */}
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              aria-label={`Llamar a Transportes BADA al ${CONTACT_PHONE}`}
              className="mt-auto inline-flex items-center justify-center gap-[10px]
                         border-2 border-brand-orange text-brand-orange font-bold text-[15px]
                         px-[32px] py-[14px] rounded-[14px]
                         hover:bg-brand-orange hover:text-white hover:-translate-y-px
                         hover:shadow-[0_6px_24px_rgba(241,98,39,0.2)]
                         transition-all duration-[250ms] self-start"
            >
              Llamar ahora
            </a>
          </div>

        </div>

        {/* ── Email + asterisk ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                        gap-3 text-[13px] text-ink-50">
          <p>
            También por correo:{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-ink font-semibold underline underline-offset-2
                         hover:text-brand-orange transition-colors duration-200"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-[12px] text-ink-20">
            * Mensajes fuera de horario hábil se responden al siguiente día hábil.
            {/* TODO: confirmar con BADA si hay guardia de WhatsApp real fuera de horario */}
          </p>
        </div>

      </div>
    </section>
  )
}
