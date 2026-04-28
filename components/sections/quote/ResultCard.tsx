'use client'

import { useState }         from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { buildQuoteWAMessage, buildQuoteClipboardText } from '@/lib/quote-utils'
import type { PackageData, AddressData, MockResult }    from '@/types/quote'

interface Props {
  isActive:    boolean
  isLocked:    boolean
  packageData: PackageData | null
  addressData: AddressData | null
  mockResult:  MockResult  | null
  onReset:     () => void
}

export default function ResultCard({
  isActive, isLocked, packageData, addressData, mockResult, onReset,
}: Props) {
  const rm = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!packageData || !addressData || !mockResult) return
    const text = buildQuoteClipboardText(packageData, addressData, mockResult)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      alert(text) // fallback for insecure contexts
    }
  }

  return (
    <div
      className={[
        'rounded-[20px] overflow-hidden border-[1.5px] transition-all duration-200',
        isActive  ? 'border-brand-orange bg-white shadow-[0_8px_32px_rgba(15,25,35,0.10)]'
                  : 'border-gray-100 bg-gray-50',
        isLocked  ? 'opacity-60 pointer-events-none select-none' : '',
      ].join(' ')}
      aria-disabled={isLocked}
    >

      {/* ── Locked placeholder ──────────────────────────────── */}
      {isLocked && (
        <div className="px-7 py-6 flex items-center gap-4">
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center
                           font-display font-black text-[14px] text-ink-50 flex-shrink-0">
            3
          </span>
          <span className="text-[14px] text-ink-50 font-semibold">Cotización</span>
          <span className="ml-auto text-[12px] text-ink-20">Completa el paso anterior</span>
        </div>
      )}

      {/* ── Result ──────────────────────────────────────────── */}
      {isActive && mockResult && packageData && addressData && (
        <motion.div
          initial={{ opacity: 0, y: rm ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: rm ? 0 : 0.2 }}
          className="px-7 pt-7 pb-7"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-7">
            <span className="w-8 h-8 rounded-full bg-brand-orange flex items-center
                             justify-center font-display font-black text-[15px] text-white
                             flex-shrink-0" aria-hidden="true">
              3
            </span>
            <h2 className="font-display font-black text-[20px] text-ink tracking-[-0.01em]">
              Tu cotización
            </h2>
          </div>

          {/* ── Mock price — big display ───────────────────── */}
          <div className="bg-brand-orange-50 border border-brand-orange-100
                          rounded-[16px] p-6 mb-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-brand-orange mb-1">
              Precio estimado
            </p>
            <p
              className="font-display font-black text-brand-orange leading-none
                         tracking-[-0.03em] mb-1"
              style={{ fontSize: 'clamp(48px, 6vw, 64px)' }}
            >
              ${mockResult.total}
              <span className="text-[20px] font-bold ml-1">MXN</span>
            </p>
            <p className="text-[13px] text-brand-orange/70">
              {mockResult.servicio} · {mockResult.tiempoEstimado}
            </p>
          </div>

          {/* ── Breakdown table ───────────────────────────── */}
          <div className="border border-gray-200 rounded-[12px] overflow-hidden mb-5">
            <table className="w-full text-[13.5px]">
              <caption className="sr-only">Desglose de la cotización</caption>
              <tbody>
                {[
                  ['Peso real',         `${mockResult.pesoReal} kg`],
                  ['Peso volumétrico',  `${mockResult.pesoVolumetrico} kg`],
                  ['Peso cobrable',     `${mockResult.pesoCobrable} kg`, true],
                  ['Tarifa base',       `$${mockResult.tarifaBase} MXN`],
                ].map(([label, value, bold]) => (
                  <tr key={label as string}
                      className="border-b border-gray-100 last:border-b-0">
                    <td className={`px-4 py-3 ${bold ? 'font-semibold text-ink' : 'text-ink-50'}`}>
                      {label}
                    </td>
                    <td className={`px-4 py-3 text-right ${bold ? 'font-bold text-ink' : 'text-ink-50'}`}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Disclaimer ───────────────────────────────── */}
          <div className="flex items-start gap-3 bg-gray-50 border border-gray-200
                          rounded-[10px] px-4 py-3 mb-6"
               role="note">
            <span className="text-[16px] mt-[1px] flex-shrink-0" aria-hidden="true">⚠️</span>
            <p className="text-[12.5px] text-ink-50 leading-[1.55]">
              <strong className="text-ink font-semibold">Precio estimado.</strong>{' '}
              La tarifa final se confirma al contratar con tu ejecutivo.
              {/* TODO: reemplazar cálculo mock con llamada a /api/cotizar cuando el endpoint exista */}
            </p>
          </div>

          {/* ── CTAs ─────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={buildQuoteWAMessage(packageData, addressData, mockResult)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar ejecutivo de BADA por WhatsApp con datos de cotización (se abre en nueva pestaña)"
              className="flex-1 btn btn-primary btn-lg text-center justify-center"
            >
              Contactar ejecutivo →
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Cotización copiada al portapapeles' : 'Guardar cotización en portapapeles'}
              className="flex-1 btn btn-lg border-2 border-gray-200 text-ink-50
                         hover:border-brand-orange hover:text-brand-orange
                         transition-colors"
            >
              {copied ? '✓ Copiado' : 'Guardar cotización'}
            </button>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="mt-5 text-[12.5px] text-ink-20 hover:text-ink-50
                       underline underline-offset-2 transition-colors"
          >
            Nueva cotización
          </button>
        </motion.div>
      )}

    </div>
  )
}
