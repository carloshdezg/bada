import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar           from '@/components/layout/Navbar'
import Footer           from '@/components/layout/Footer'
import QuoteCalculator  from '@/components/calculator/QuoteCalculator'
import { calculatorConfig } from '@/lib/calculator/config'
import type { ServiceId }   from '@/lib/calculator/types'

export const metadata: Metadata = {
  title: 'Cotizador',
  description:
    'Ingresa las medidas, el peso y la ruta para calcular un precio estimado con IVA incluido.',
}

const VALID_SERVICES = [
  ...calculatorConfig.serviciosAutomaticos,
  ...calculatorConfig.serviciosAsesor,
  ...calculatorConfig.serviciosPendientesValidacion,
] as ServiceId[]

interface PageProps {
  searchParams: Promise<{ servicio?: string }>
}

export default async function CotizarPage({ searchParams }: PageProps) {
  const { servicio } = await searchParams
  const initialService = VALID_SERVICES.includes(servicio as ServiceId)
    ? (servicio as ServiceId)
    : null

  return (
    <>
      <Navbar />
      <main className="pt-[68px] bg-[#F3F6F8] min-h-screen">
        <div className="max-w-[1240px] mx-auto px-7 pt-11 pb-22">
          {/* Compact intro */}
          <div className="flex items-end justify-between gap-8 mb-7 flex-wrap">
            <div>
              <nav aria-label="Breadcrumb" className="flex gap-2 items-center text-[13px] text-ink-50 mb-4">
                <Link href="/" className="hover:text-ink transition-colors">Inicio</Link>
                <span>/</span>
                <strong className="text-ink font-semibold">Cotizador</strong>
              </nav>
              <h1
                className="font-display font-black tracking-[-0.035em] leading-[.98] mb-[14px]"
                style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}
              >
                Cotiza tu{' '}
                <em className="text-brand-orange" style={{ fontStyle: 'italic' }}>envío</em>.
              </h1>
              <p className="text-ink-50 text-[17px] leading-[1.7] max-w-[640px] m-0">
                Ingresa las medidas, el peso y la ruta para calcular un precio estimado con IVA incluido.
              </p>
            </div>
            <div className="max-w-[320px] bg-white border border-[#DDE3EA] rounded-[18px] shadow-[0_8px_28px_rgba(15,25,35,.08)] px-5 py-[18px] text-ink-50 text-[14px] flex-shrink-0">
              El cálculo toma como base el peso cobrable: el mayor entre peso real y peso volumétrico.
            </div>
          </div>

          <QuoteCalculator initialService={initialService} />
        </div>
      </main>
      <Footer />
    </>
  )
}
