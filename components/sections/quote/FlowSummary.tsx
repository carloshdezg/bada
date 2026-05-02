'use client'

import type { PackageData, AddressData, MockResult, QuoteStep } from '@/types/quote'
import { MEXICO_STATES } from '@/lib/mexico-states'

interface Props {
  packageData: PackageData | null
  addressData: AddressData | null
  mockResult:  MockResult  | null
  onEdit:      (n: QuoteStep) => void
}

function stateLabel(value: string) {
  return MEXICO_STATES.find(s => s.value === value)?.label ?? value
}

export default function FlowSummary({ packageData, addressData, mockResult, onEdit }: Props) {
  const hasPackage = !!packageData
  const hasAddress = !!addressData

  return (
    <aside
      className="hidden lg:block"
      aria-label="Resumen de cotización"
    >
      <div className="sticky top-28 bg-white border-[1.5px] border-gray-200
                      rounded-[20px] p-6 flex flex-col gap-5">

        <h3 className="font-display font-black text-[17px] text-ink tracking-[-0.01em]">
          Resumen
        </h3>

        {/* ── Paquete ───────────────────────────────────────── */}
        <SummaryBlock
          step={1}
          label="Paquete"
          completed={hasPackage}
          canEdit={hasPackage}
          onEdit={onEdit}
        >
          {packageData && (
            <ul className="list-none text-[13px] text-ink-50 space-y-[3px]">
              <li><span className="text-ink-20 text-[11px] uppercase font-bold tracking-wide">Dimensiones</span><br/>{packageData.largo} × {packageData.ancho} × {packageData.alto} cm</li>
              <li className="mt-1"><span className="text-ink-20 text-[11px] uppercase font-bold tracking-wide">Peso</span><br/>{packageData.peso} kg</li>
            </ul>
          )}
          {!packageData && (
            <p className="text-[12.5px] text-ink-20 italic">Pendiente</p>
          )}
        </SummaryBlock>

        <div className="border-t border-gray-100" />

        {/* ── Direcciones ──────────────────────────────────── */}
        <SummaryBlock
          step={2}
          label="Direcciones"
          completed={hasAddress}
          canEdit={hasAddress}
          onEdit={onEdit}
        >
          {addressData && (
            <ul className="list-none text-[13px] text-ink-50 space-y-[3px]">
              <li><span className="text-ink-20 text-[11px] uppercase font-bold tracking-wide">Origen</span><br/>{addressData.origen.ciudad}, {stateLabel(addressData.origen.estado)} {addressData.origen.cp}</li>
              <li className="mt-1"><span className="text-ink-20 text-[11px] uppercase font-bold tracking-wide">Destino</span><br/>{addressData.destino.ciudad}, {stateLabel(addressData.destino.estado)} {addressData.destino.cp}</li>
            </ul>
          )}
          {!addressData && (
            <p className="text-[12.5px] text-ink-20 italic">Pendiente</p>
          )}
        </SummaryBlock>

        {/* ── Resultado ────────────────────────────────────── */}
        {mockResult && (
          <>
            <div className="border-t border-gray-100" />
            <div className="bg-brand-orange-50 border border-brand-orange-100
                            rounded-[12px] p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-brand-orange mb-1">
                Estimado
              </p>
              <p className="font-display font-black text-[32px] text-brand-orange
                             leading-none tracking-[-0.02em]">
                ${mockResult.total}
                <span className="text-[13px] font-bold ml-1">MXN</span>
              </p>
              <p className="text-[11.5px] text-brand-orange/70 mt-1">
                {mockResult.servicio} · {mockResult.tiempoEstimado}
              </p>
            </div>
          </>
        )}

        {/* ── Empty state ─────────────────────────────────── */}
        {!hasPackage && (
          <p className="text-[12.5px] text-ink-20 text-center leading-[1.55]">
            Completa los pasos para ver<br />tu cotización aquí.
          </p>
        )}

      </div>
    </aside>
  )
}

// ── SummaryBlock sub-component ─────────────────────────────────────

function SummaryBlock({
  step, label, completed, canEdit, onEdit, children,
}: {
  step:      QuoteStep
  label:     string
  completed: boolean
  canEdit:   boolean
  onEdit:    (n: QuoteStep) => void
  children:  React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {completed
            ? (
              <span className="w-5 h-5 rounded-full bg-brand-orange flex items-center
                               justify-center flex-shrink-0" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            ) : (
              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center
                               justify-center flex-shrink-0 font-display font-black
                               text-[10px] text-ink-50" aria-hidden="true">
                {step}
              </span>
            )
          }
          <span className="text-[13px] font-semibold text-ink">{label}</span>
        </div>
        {canEdit && (
          <button
            type="button"
            onClick={() => onEdit(step)}
            className="text-[11.5px] font-semibold text-brand-orange
                       hover:text-brand-orange-dark underline underline-offset-2
                       transition-colors focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
            aria-label={`Editar ${label}`}
          >
            Editar
          </button>
        )}
      </div>
      {children}
    </div>
  )
}
