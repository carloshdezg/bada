import Link       from 'next/link'
import { waUrl } from '@/lib/whatsapp'

export default function FinalCTA() {
  return (
    <section className="bg-brand-orange py-[130px] text-center relative overflow-hidden">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[100px] -right-[100px] w-[400px] h-[400px] rounded-full"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[80px] -left-[80px] w-[300px] h-[300px] rounded-full"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />

      <div className="max-w-site mx-auto px-7 relative z-[1]">

        <span
          className="tag mb-6"
          style={{
            background:  'rgba(255,255,255,0.15)',
            color:       'white',
            borderColor: 'rgba(255,255,255,0.3)',
          }}
        >
          Empieza hoy
        </span>

        <h2
          className="font-display font-black text-white tracking-[-0.025em] leading-[1.05] mb-5"
          style={{ fontSize: 'clamp(40px, 5.5vw, 70px)' }}
        >
          Tu logística, resuelta.<br />
          Sin excusas.
        </h2>

        <p className="mx-auto leading-[1.75] mb-[44px] text-white/75"
           style={{ fontSize: '17px', maxWidth: '520px' }}>
          Cotiza en minutos. Sin contratos, sin letra pequeña.
          Solo envíos que llegan a tiempo.
        </p>

        <div className="flex items-center justify-center gap-[16px] flex-wrap">
          {/* TODO: connect to /cotizar when the page is created */}
          <Link
            href="#"
            className="inline-flex items-center gap-[10px]
                       text-[15px] font-bold text-brand-orange bg-white
                       px-[34px] py-4 rounded-[14px]
                       shadow-[0_4px_24px_rgba(15,25,35,0.18)]
                       hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(15,25,35,0.22)]
                       transition-all duration-[250ms]"
          >
            Quiero mi cotización →
          </Link>
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablar con un ejecutivo de BADA por WhatsApp (se abre en nueva pestaña)"
            className="inline-flex items-center gap-[10px]
                       text-[15px] font-bold text-white
                       px-[34px] py-4 rounded-[14px]
                       border-2 border-white/40
                       hover:bg-white/10 hover:-translate-y-px
                       transition-all duration-[250ms]"
          >
            Hablar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  )
}
