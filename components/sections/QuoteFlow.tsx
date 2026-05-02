'use client'

import { useRef, useEffect } from 'react'
import { useQuoteFlow }   from '@/hooks/useQuoteFlow'
import PackageCard        from './quote/PackageCard'
import AddressCard        from './quote/AddressCard'
import ResultCard         from './quote/ResultCard'
import FlowSummary        from './quote/FlowSummary'
import type { QuoteStep } from '@/types/quote'

// ── Progress indicator ──────────────────────────────────────────────

const STEPS: { n: QuoteStep; label: string }[] = [
  { n: 1, label: 'Paquete'     },
  { n: 2, label: 'Direcciones' },
  { n: 3, label: 'Cotización'  },
]

function ProgressBar({ step }: { step: QuoteStep }) {
  return (
    <nav aria-label="Progreso de cotización" className="mb-8">
      <ol className="flex items-center" role="list">
        {STEPS.map(({ n, label }, idx) => {
          const done   = step > n
          const active = step === n
          return (
            <li key={n} className="flex items-center flex-1 last:flex-none">

              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-[6px]">
                <div
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    'font-display font-black text-[14px]',
                    'transition-all duration-200',
                    done   ? 'bg-brand-orange text-white'
                      : active ? 'bg-brand-orange text-white ring-4 ring-brand-orange/20'
                      : 'bg-gray-100 text-ink-50',
                  ].join(' ')}
                  aria-current={active ? 'step' : undefined}
                >
                  {done ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3.5 3.5L12 3.5" stroke="white" strokeWidth="2.2"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : n}
                </div>
                <span
                  className={[
                    'text-[11px] font-semibold whitespace-nowrap',
                    active || done ? 'text-ink' : 'text-ink-20',
                  ].join(' ')}
                >
                  {label}
                </span>
              </div>

              {/* Connector line (not after last step) */}
              {idx < STEPS.length - 1 && (
                <div
                  className={[
                    'flex-1 h-[2px] mx-3 mb-[22px] rounded-full transition-all duration-300',
                    step > n ? 'bg-brand-orange' : 'bg-gray-200',
                  ].join(' ')}
                  aria-hidden="true"
                />
              )}

            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// ── Main QuoteFlow component ────────────────────────────────────────

export default function QuoteFlow() {
  const flow = useQuoteFlow()
  const {
    step, packageData, addressData, mockResult,
    setPackage, setAddress, editStep, reset,
    isLocked, isCollapsed, isActive,
  } = flow

  // Refs for scroll-to-next-card behavior
  const card2Ref = useRef<HTMLDivElement | null>(null)
  const card3Ref = useRef<HTMLDivElement | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const target = step === 2 ? card2Ref.current : step === 3 ? card3Ref.current : null
    if (!target) return
    // small delay so card expands before scrolling
    const t = setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div className="max-w-site mx-auto px-7 py-[72px]">

      <ProgressBar step={step} />

      {/* Two-column on desktop: cards left, summary right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

        {/* ── Card column ────────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Card 1 — Package */}
          <PackageCard
            isActive={isActive(1)}
            isCollapsed={isCollapsed(1)}
            isLocked={isLocked(1)}
            defaultData={packageData}
            onSubmit={setPackage}
            onEdit={() => editStep(1)}
          />

          {/* Card 2 — Address */}
          <div ref={card2Ref}>
            <AddressCard
              isActive={isActive(2)}
              isCollapsed={isCollapsed(2)}
              isLocked={isLocked(2)}
              defaultData={addressData}
              onSubmit={(addr) => setAddress(addr, packageData!)}
              onEdit={() => editStep(2)}
            />
          </div>

          {/* Card 3 — Result */}
          <div ref={card3Ref}>
            <ResultCard
              isActive={isActive(3)}
              isLocked={isLocked(3)}
              packageData={packageData}
              addressData={addressData}
              mockResult={mockResult}
              onReset={reset}
            />
          </div>

        </div>

        {/* ── Summary column (desktop only) ─────────────── */}
        <FlowSummary
          packageData={packageData}
          addressData={addressData}
          mockResult={mockResult}
          onEdit={editStep}
        />

      </div>
    </div>
  )
}
