'use client'

import { useState } from 'react'
import { MessageCircle, Info, AlertTriangle, CheckCircle2, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { waUrl } from '@/lib/whatsapp'
import { calculatorConfig } from '@/lib/calculator/config'
import { calculateQuote, type QuoteResult } from '@/lib/calculator/calculateQuote'
import { findRouteByPostalCode, routeRequiresAdvisor } from '@/lib/calculator/seedRoutes'
import { MEXICO_STATES } from '@/lib/mexico-states'
import type { ServiceId } from '@/lib/calculator/types'
import QuoteProgress     from './QuoteProgress'
import MobileQuoteSticky from './MobileQuoteSticky'

const cfg = calculatorConfig

// ─── helpers ────────────────────────────────────────────────────────────────

const SERVICE_OPTIONS: { id: ServiceId; label: string }[] = [
  { id: 'mensajeria',      label: 'Mensajería'             },
  { id: 'paqueteria',      label: 'Paquetería'             },
  { id: 'rutas_dedicadas', label: 'Rutas Dedicadas'        },
  { id: 'logistica',       label: 'Logística'              },
  { id: 'ecommerce',       label: 'Envíos para e-commerce' },
]

function tariffRangeInfo(pesoCobrable: number): { base: number; extra: number; label: string } {
  for (const r of cfg.rangosPesoKg) {
    if (pesoCobrable <= r) return { base: r, extra: 0, label: `${r} kg` }
  }
  const extra = pesoCobrable - 30
  return { base: 30, extra, label: `30 kg + ${extra} kg extra` }
}

function formatMXN(n: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n)
}

// ─── sub-components ──────────────────────────────────────────────────────────

function Badge({ children, color }: { children: React.ReactNode; color: 'orange' | 'teal' }) {
  return (
    <span className={cn(
      'inline-flex items-center min-h-[26px] px-3 py-1 rounded-full text-[11px] font-black tracking-[.08em] uppercase mb-3',
      color === 'orange'
        ? 'bg-[#FEF0EA] text-brand-orange'
        : 'bg-[#E6F7FB] text-brand-blue'
    )}>
      {children}
    </span>
  )
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label className="flex justify-between items-center gap-2.5 font-black text-[14px] mb-2">
      {children}
      {hint && <small className="text-ink-50 font-semibold">{hint}</small>}
    </label>
  )
}

const INPUT_BASE =
  'w-full h-[54px] border border-[#C5CDD7] rounded-[14px] px-4 bg-white text-ink outline-none ' +
  'focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 transition-colors ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F8FAFB]'

const INPUT_ERROR =
  'w-full h-[54px] border border-red-400 rounded-[14px] px-4 bg-white text-ink outline-none ' +
  'focus:border-red-400 focus:ring-4 focus:ring-red-400/10 transition-colors'

function Metric({
  label, value, highlight, muted,
}: {
  label: string; value: string; highlight?: boolean; muted?: boolean
}) {
  return (
    <div className={cn('bg-[#F8FAFB] border border-[#DDE3EA] rounded-[18px] p-4', muted && 'opacity-50')}>
      <span className="block text-ink-50 text-[12px] mb-1.5">{label}</span>
      <b className={cn('text-[22px] font-bold', highlight && 'text-brand-orange')}>{value}</b>
    </div>
  )
}

function InfoBox({
  children,
  variant = 'teal',
}: {
  children: React.ReactNode
  variant?: 'teal' | 'warn' | 'error' | 'success'
}) {
  const cls = {
    teal:    'bg-[#E6F7FB] border-[rgba(20,163,190,.25)] text-ink-80',
    warn:    'bg-[#FFF7E8] border-[rgba(184,115,18,.28)] text-ink-80',
    error:   'bg-[#FEF2F2] border-[rgba(220,38,38,.22)] text-red-900',
    success: 'bg-[#F0FDF4] border-[rgba(22,163,74,.25)] text-ink-80',
  }[variant]

  const Icon = variant === 'warn'
    ? AlertTriangle
    : variant === 'success'
      ? CheckCircle2
      : Info

  return (
    <div className={cn('mt-5 p-4 rounded-[18px] border flex gap-2.5 text-[14px] leading-[1.55]', cls)}>
      <Icon size={16} className="flex-shrink-0 mt-0.5 opacity-70" />
      <div>{children}</div>
    </div>
  )
}

function LockedNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-[18px] bg-[#F8FAFB] border border-[#DDE3EA] text-ink-50 text-[14px] leading-[1.55]">
      <Lock size={16} className="flex-shrink-0 opacity-60" />
      {children}
    </div>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-[13px] border-b border-[#DDE3EA] text-[14px]">
      <span className="text-ink-50">{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

// ─── main component ──────────────────────────────────────────────────────────

interface FormState {
  service:     ServiceId
  peso:        string
  largo:       string
  ancho:       string
  alto:        string
  originState: string
  originCity:  string
  originCp:    string
  destState:   string
  destCity:    string
  destCp:      string
}

interface Props {
  initialService?: ServiceId | null
}

export default function QuoteCalculator({ initialService }: Props) {
  const [form, setForm] = useState<FormState>({
    service:     initialService ?? 'mensajeria',
    peso:        '',
    largo:       '',
    ancho:       '',
    alto:        '',
    originState: '',
    originCity:  '',
    originCp:    '',
    destState:   '',
    destCity:    '',
    destCp:      '',
  })

  function update(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // ── parsed values ──────────────────────────────────────────────────────────
  const parsedPeso  = parseFloat(form.peso)
  const parsedLargo = parseFloat(form.largo)
  const parsedAncho = parseFloat(form.ancho)
  const parsedAlto  = parseFloat(form.alto)

  const hasPeso = !isNaN(parsedPeso)  && parsedPeso  > 0
  const hasDims = !isNaN(parsedLargo) && parsedLargo > 0 &&
                  !isNaN(parsedAncho) && parsedAncho > 0 &&
                  !isNaN(parsedAlto)  && parsedAlto  > 0
  const hasPackage = hasPeso && hasDims
  const hasDestCp  = /^\d{5}$/.test(form.destCp)

  const pesoVolumetrico = hasDims
    ? (parsedLargo * parsedAncho * parsedAlto) / cfg.divisorVolumetrico
    : null
  const pesoCobrable = hasPackage && pesoVolumetrico !== null
    ? Math.ceil(Math.max(parsedPeso, pesoVolumetrico))
    : null

  // ── dimension limit checks ────────────────────────────────────────────────
  const largoExceeded = !isNaN(parsedLargo) && parsedLargo > 0 && parsedLargo > cfg.largoMaximoCm
  const anchoExceeded = !isNaN(parsedAncho) && parsedAncho > 0 && parsedAncho > cfg.anchoMaximoCm
  const altoExceeded  = !isNaN(parsedAlto)  && parsedAlto  > 0 && parsedAlto  > cfg.altoMaximoCm

  // ── route preview ─────────────────────────────────────────────────────────
  const routeLookup   = hasDestCp ? findRouteByPostalCode(form.originCp, form.destCp) : undefined
  const routeNeedsAdv = routeLookup !== undefined ? routeRequiresAdvisor(routeLookup) : undefined

  // ── advisor eligibility ────────────────────────────────────────────────────
  const serviceRequiresAdvisor =
    (cfg.serviciosAsesor as ServiceId[]).includes(form.service) ||
    (cfg.serviciosPendientesValidacion as ServiceId[]).includes(form.service)

  const maxPesoForService = form.service === 'mensajeria' ? cfg.pesoMaxMensajeriaKg : cfg.pesoMaxPaqueteriaKg
  const pesoExceeded      = pesoCobrable !== null && pesoCobrable > maxPesoForService
  const exceedsLimits     = largoExceeded || anchoExceeded || altoExceeded || pesoExceeded

  // ── step validity — single source of truth ────────────────────────────────
  const isStep1Complete = hasPackage
  const isStep1Valid    = isStep1Complete && !serviceRequiresAdvisor && !exceedsLimits

  const isStep2FieldsComplete =
    form.originState !== '' &&
    form.originCity.trim() !== '' &&
    /^\d{5}$/.test(form.originCp) &&
    form.destState !== '' &&
    form.destCity.trim() !== '' &&
    hasDestCp
  const isStep2Complete = isStep1Valid && isStep2FieldsComplete
  const isStep2Valid    = isStep2Complete && routeLookup !== undefined && routeNeedsAdv === false

  // ── full quote result ──────────────────────────────────────────────────────
  const calcResult: QuoteResult | null =
    !serviceRequiresAdvisor && !exceedsLimits && hasPackage && hasDestCp
      ? calculateQuote({
          service:       form.service,
          peso:          parsedPeso,
          largo:         parsedLargo,
          ancho:         parsedAncho,
          alto:          parsedAlto,
          originCp:      form.originCp,
          destinationCp: form.destCp,
        })
      : null

  // Fires without destCp when advisor status is already determined from field data
  const syntheticAdvisor: QuoteResult | null = serviceRequiresAdvisor || exceedsLimits
    ? {
        type: 'advisor',
        reason: serviceRequiresAdvisor
          ? 'service_requires_advisor'
          : largoExceeded || anchoExceeded || altoExceeded
            ? 'over_dimension'
            : 'over_weight',
        message: cfg.mensajeRequiereAsesor,
      }
    : null

  const result: QuoteResult | null = syntheticAdvisor ?? calcResult

  const canQuoteAutomatically = result?.type === 'success'
  const requiresAdvisor       = result?.type === 'advisor'

  // ── step 3 tariff breakdown ────────────────────────────────────────────────
  const rangeInfo   = pesoCobrable !== null ? tariffRangeInfo(pesoCobrable) : null
  const extraKgText = canQuoteAutomatically && rangeInfo && rangeInfo.extra > 0
    ? `${rangeInfo.extra} × $${cfg.precioKgAdicional.toFixed(2)}`
    : 'No aplica'
  const tarifaType  = canQuoteAutomatically && result?.type === 'success' ? result.route.tipo_tarifa : '—'

  // ── WA message ────────────────────────────────────────────────────────────
  const quoteWAMsg =
    canQuoteAutomatically && result?.type === 'success'
      ? `Hola, quiero confirmar el envío cotizado en badamensajeria.mx.\n\n` +
        `Servicio: ${SERVICE_OPTIONS.find(s => s.id === form.service)?.label}\n` +
        `Paquete: ${form.largo}×${form.ancho}×${form.alto} cm | ${form.peso} kg real\n` +
        `CP Destino: ${form.destCp} (${result.route.poblacion}, ${result.route.estado})\n` +
        `Peso cobrable: ${result.pesoCobrable} kg\n` +
        `Total estimado: ${formatMXN(result.total)} MXN (IVA incluido)`
      : `Hola, quiero información sobre el servicio de ${SERVICE_OPTIONS.find(s => s.id === form.service)?.label ?? form.service} de Transportes BADA.`

  return (
    <div>
      <QuoteProgress
        step1={{ active: !isStep1Valid,                    done: isStep1Valid  }}
        step2={{ active: isStep1Valid && !isStep2Valid,    done: isStep2Valid  }}
        step3={{ active: isStep1Valid  && isStep2Valid,    done: false         }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_370px] gap-7 items-start">
        {/* ── LEFT COLUMN ── */}
        <div>

          {/* ── CARD 1: Datos del paquete ───────────────────────────────── */}
          <div id="step1" className="bg-white border border-[#DDE3EA] rounded-[28px] shadow-[0_8px_28px_rgba(15,25,35,.08)] overflow-hidden">
            <div className="px-[30px] py-7 border-b border-[#DDE3EA]">
              <Badge color="orange">Paso 1</Badge>
              <h2 className="font-display font-black text-[34px] tracking-[-0.035em] leading-[1] m-0 mb-2.5">
                Datos del paquete
              </h2>
              <p className="m-0 text-ink-50 text-[15px] leading-[1.6] max-w-[620px]">
                Calculamos el peso volumétrico y el peso cobrable para determinar qué rango tarifario aplica.
              </p>
            </div>
            <div className="p-[30px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                <div>
                  <FieldLabel>Servicio</FieldLabel>
                  <select
                    value={form.service}
                    onChange={e => update('service', e.target.value)}
                    className={INPUT_BASE + ' cursor-pointer'}
                  >
                    {SERVICE_OPTIONS.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                  <p className="text-[12px] text-ink-50 mt-2 leading-[1.45]">
                    Mensajería y Paquetería cotizan automático. Otros servicios requieren validación.
                  </p>
                </div>
                <div>
                  <FieldLabel hint="kg">Peso real</FieldLabel>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    value={form.peso}
                    onChange={e => update('peso', e.target.value)}
                    placeholder="0"
                    className={INPUT_BASE}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px] mt-[18px]">
                <div>
                  <FieldLabel hint={`cm · máx. ${cfg.largoMaximoCm}`}>Largo</FieldLabel>
                  <input type="number" inputMode="decimal" min="0" step="1"
                    value={form.largo} onChange={e => update('largo', e.target.value)}
                    placeholder="0" className={largoExceeded ? INPUT_ERROR : INPUT_BASE} />
                  {largoExceeded && (
                    <p className="text-[12px] text-red-600 mt-1.5 leading-[1.4]">
                      El largo máximo para cotización automática es de {cfg.largoMaximoCm} cm.
                    </p>
                  )}
                </div>
                <div>
                  <FieldLabel hint={`cm · máx. ${cfg.anchoMaximoCm}`}>Ancho</FieldLabel>
                  <input type="number" inputMode="decimal" min="0" step="1"
                    value={form.ancho} onChange={e => update('ancho', e.target.value)}
                    placeholder="0" className={anchoExceeded ? INPUT_ERROR : INPUT_BASE} />
                  {anchoExceeded && (
                    <p className="text-[12px] text-red-600 mt-1.5 leading-[1.4]">
                      El ancho máximo para cotización automática es de {cfg.anchoMaximoCm} cm.
                    </p>
                  )}
                </div>
                <div>
                  <FieldLabel hint={`cm · máx. ${cfg.altoMaximoCm}`}>Alto</FieldLabel>
                  <input type="number" inputMode="decimal" min="0" step="1"
                    value={form.alto} onChange={e => update('alto', e.target.value)}
                    placeholder="0" className={altoExceeded ? INPUT_ERROR : INPUT_BASE} />
                  {altoExceeded && (
                    <p className="text-[12px] text-red-600 mt-1.5 leading-[1.4]">
                      El alto máximo para cotización automática es de {cfg.altoMaximoCm} cm.
                    </p>
                  )}
                </div>
              </div>

              {/* Mini calc — always visible for transparency */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px] mt-6">
                <Metric label="Peso real"        value={hasPeso ? `${parsedPeso} kg` : '─ kg'} />
                <Metric label="Peso volumétrico" value={pesoVolumetrico !== null ? `${pesoVolumetrico.toFixed(1)} kg` : '─ kg'} />
                <Metric label="Peso cobrable"    value={pesoCobrable !== null ? `${pesoCobrable} kg` : '─ kg'}
                         highlight={pesoCobrable !== null && !exceedsLimits} />
              </div>

              <InfoBox variant="teal">
                <strong>Fórmula:</strong>{' '}
                Peso volumétrico = largo × ancho × alto / {cfg.divisorVolumetrico}. El peso cobrable se redondea al kilo inmediato superior.
              </InfoBox>

              {/* Per-service weight warnings */}
              {pesoCobrable !== null && form.service === 'mensajeria' && pesoCobrable > cfg.pesoMaxMensajeriaKg && (
                <InfoBox variant="warn">
                  <strong>Requiere asesor:</strong>{' '}
                  El peso cobrable supera el límite automático para Mensajería ({cfg.pesoMaxMensajeriaKg} kg).
                </InfoBox>
              )}
              {pesoCobrable !== null && form.service === 'paqueteria' && pesoCobrable > cfg.pesoMaxPaqueteriaKg && (
                <InfoBox variant="warn">
                  <strong>Requiere asesor:</strong>{' '}
                  El peso cobrable supera el límite automático ({cfg.pesoMaxPaqueteriaKg} kg).
                </InfoBox>
              )}
            </div>
          </div>

          {/* ── CARD 2: Origen y destino — locked until Step 1 is valid ─── */}
          <div id="step2" className="mt-7 bg-white border border-[#DDE3EA] rounded-[28px] shadow-[0_8px_28px_rgba(15,25,35,.08)] overflow-hidden">
            <div className="px-[30px] py-7 border-b border-[#DDE3EA]">
              <Badge color="orange">Paso 2</Badge>
              <h2 className="font-display font-black text-[34px] tracking-[-0.035em] leading-[1] m-0 mb-2.5">
                Origen y destino
              </h2>
              <p className="m-0 text-ink-50 text-[15px] leading-[1.6] max-w-[620px]">
                La ruta se valida contra la cobertura administrable. Si no existe, está desactivada o requiere asesor, no se muestra precio automático.
              </p>
            </div>
            <div className="p-[30px]">
              {!isStep1Valid && (
                <LockedNotice>
                  Completa primero los datos del paquete para continuar.
                </LockedNotice>
              )}

              <div className={cn(
                'grid grid-cols-1 sm:grid-cols-3 gap-[18px]',
                !isStep1Valid ? 'mt-5 opacity-50' : ''
              )}>
                {/* Origin */}
                <div>
                  <FieldLabel>Estado origen</FieldLabel>
                  <select
                    value={form.originState}
                    onChange={e => update('originState', e.target.value)}
                    className={INPUT_BASE + ' cursor-pointer'}
                    disabled={!isStep1Valid}
                  >
                    <option value="">Seleccionar</option>
                    {MEXICO_STATES.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel>Ciudad / municipio origen</FieldLabel>
                  <input
                    type="text"
                    value={form.originCity}
                    onChange={e => update('originCity', e.target.value)}
                    placeholder="Ciudad o municipio"
                    className={INPUT_BASE}
                    disabled={!isStep1Valid}
                  />
                </div>
                <div>
                  <FieldLabel>Código postal origen</FieldLabel>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={form.originCp}
                    onChange={e => update('originCp', e.target.value.replace(/\D/g, '').slice(0, 5))}
                    placeholder="00000"
                    className={INPUT_BASE}
                    disabled={!isStep1Valid}
                  />
                </div>
                {/* Destination */}
                <div>
                  <FieldLabel>Estado destino</FieldLabel>
                  <select
                    value={form.destState}
                    onChange={e => update('destState', e.target.value)}
                    className={INPUT_BASE + ' cursor-pointer'}
                    disabled={!isStep1Valid}
                  >
                    <option value="">Seleccionar</option>
                    {MEXICO_STATES.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel>Ciudad / municipio destino</FieldLabel>
                  <input
                    type="text"
                    value={form.destCity}
                    onChange={e => update('destCity', e.target.value)}
                    placeholder="Ciudad o municipio"
                    className={INPUT_BASE}
                    disabled={!isStep1Valid}
                  />
                </div>
                <div>
                  <FieldLabel>Código postal destino</FieldLabel>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={form.destCp}
                    onChange={e => update('destCp', e.target.value.replace(/\D/g, '').slice(0, 5))}
                    placeholder="00000"
                    className={INPUT_BASE}
                    disabled={!isStep1Valid}
                  />
                </div>
              </div>

              {/* Route status — only show when step 1 is valid and CP entered */}
              {isStep1Valid && hasDestCp && routeLookup !== undefined && !routeNeedsAdv && (
                <InfoBox variant="success">
                  <strong>Ruta detectada:</strong>{' '}
                  {routeLookup.poblacion}, {routeLookup.estado} · {routeLookup.zona_operativa} · Tarifa {routeLookup.tipo_tarifa} · cotización automática disponible.
                </InfoBox>
              )}
              {isStep1Valid && hasDestCp && routeLookup !== undefined && routeNeedsAdv && (
                <InfoBox variant="warn">
                  <strong>Ruta detectada:</strong>{' '}
                  {routeLookup.poblacion}, {routeLookup.estado} · requiere validación con asesor.
                </InfoBox>
              )}
              {isStep1Valid && hasDestCp && routeLookup === undefined && (
                <InfoBox variant="warn">
                  <strong>Ruta no encontrada</strong>{' '}
                  en la cobertura administrable. Un asesor puede verificar disponibilidad.
                </InfoBox>
              )}
            </div>
          </div>

          {/* ── CARD 3: Precio estimado — locked until Step 2 is complete ── */}
          <div id="step3" className="mt-7 bg-white border border-[#DDE3EA] rounded-[28px] shadow-[0_8px_28px_rgba(15,25,35,.08)] overflow-hidden">
            <div className="px-[30px] py-7 border-b border-[#DDE3EA]">
              <Badge color="orange">Paso 3</Badge>
              <h2 className="font-display font-black text-[34px] tracking-[-0.035em] leading-[1] m-0 mb-2.5">
                Precio estimado
              </h2>
              <p className="m-0 text-ink-50 text-[15px] leading-[1.6] max-w-[620px]">
                El precio se muestra con IVA incluido y puede requerir validación operativa según cobertura, dimensiones y condiciones del envío.
              </p>
            </div>
            <div className="p-[30px]">
              {!isStep2Complete && (
                <LockedNotice>
                  Completa origen y destino para calcular tu precio estimado.
                </LockedNotice>
              )}

              <div className={cn(
                'grid grid-cols-1 sm:grid-cols-2 gap-[14px]',
                !isStep2Complete ? 'mt-5' : ''
              )}>
                <Metric label="Rango tarifario" value={rangeInfo ? rangeInfo.label : '─'}
                         muted={!isStep2Complete} />
                <Metric label="Tipo de tarifa"  value={tarifaType}
                         muted={!isStep2Complete} />
                <Metric label="Kg adicional"    value={canQuoteAutomatically ? extraKgText : '─'}
                         muted={!isStep2Complete} />
                <Metric label="IVA"             value="Incluido"
                         muted={!isStep2Complete} />
              </div>

              {isStep2Complete && (
                <InfoBox variant="warn">
                  <strong>Validación:</strong>{' '}
                  Precio estimado sujeto a validación de cobertura, dimensiones, peso cobrable y condiciones operativas.
                </InfoBox>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: sticky result panel ───────────────────────── */}
        <aside className="sticky top-[100px] bg-white border border-[#DDE3EA] rounded-[28px] shadow-[0_16px_48px_rgba(15,25,35,.10)] p-7">
          <h3 className="font-display font-black text-[34px] tracking-[-0.035em] leading-[1] m-0 mb-3">
            Resultado
          </h3>
          <p className="text-ink-50 m-0 mb-[22px] text-[14px] leading-[1.6]">
            Resumen de la cotización estimada.
          </p>

          {/* Quote / advisor / empty */}
          {canQuoteAutomatically && result?.type === 'success' ? (
            <>
              <div className="p-[22px] rounded-[22px] mb-5"
                   style={{ background: 'linear-gradient(135deg, #F16227, #F47D4A)', color: '#fff' }}>
                <span className="block text-[13px] opacity-90">Precio estimado con IVA incluido</span>
                <b className="block text-[40px] font-bold leading-[1.1] my-2">{formatMXN(result.total)}</b>
                <small className="block opacity-[0.78] leading-[1.45] text-[13px]">
                  Calculado con tarifario vigente y ruta administrable.
                </small>
              </div>
              <ResultRow label="Peso real"         value={`${result.pesoReal} kg`} />
              <ResultRow label="Peso volumétrico"  value={`${result.pesoVolumetrico} kg`} />
              <ResultRow label="Peso cobrable"     value={`${result.pesoCobrable} kg`} />
              <ResultRow label="Tarifa base"        value={rangeInfo ? `${rangeInfo.base} kg` : '─'} />
              <ResultRow label="Kilos adicionales" value={rangeInfo ? `${rangeInfo.extra} kg` : '0 kg'} />
              <ResultRow label="Tipo de tarifa"    value={result.route.tipo_tarifa} />
            </>
          ) : requiresAdvisor && result?.type === 'advisor' ? (
            <div className="p-5 bg-[#FFF7E8] border border-[rgba(184,115,18,.28)] rounded-[20px] mb-2">
              <h4 className="m-0 mb-2 text-[18px] font-bold">Requiere asesor</h4>
              {(result.reason === 'over_dimension' || result.reason === 'over_weight') && (
                <p className="m-0 mb-2 text-ink-80 text-[13px] font-semibold leading-[1.45]">
                  El envío excede los límites para cotización automática.
                </p>
              )}
              <p className="m-0 text-ink-80 text-[14px] leading-[1.55]">
                {result.message}
              </p>
            </div>
          ) : (
            <div className="p-[22px] rounded-[22px] mb-5 bg-[#F8FAFB] border border-[#DDE3EA]">
              <span className="block text-[13px] text-ink-50">Precio estimado con IVA incluido</span>
              <b className="block text-[40px] font-bold leading-[1.1] my-2 text-ink-50">$ ─ ─</b>
              <small className="block text-ink-50 leading-[1.45] text-[13px]">
                Completa los datos del paquete y la ruta para calcular.
              </small>
            </div>
          )}

          {/* CTAs */}
          <div className="grid gap-2.5 mt-[22px]">
            <a
              href={waUrl(quoteWAMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] px-[26px] rounded-[12px] bg-brand-orange text-white font-bold text-[14px] inline-flex items-center justify-center gap-2.5 shadow-[0_12px_24px_rgba(241,98,39,.20)] hover:opacity-90 transition-opacity"
            >
              {canQuoteAutomatically ? 'Confirmar cotización →' : 'Hablar con un asesor'}
            </a>
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] px-[26px] rounded-[12px] bg-white border border-[#C5CDD7] text-ink font-bold text-[14px] inline-flex items-center justify-center gap-2.5 hover:border-ink transition-colors"
            >
              <MessageCircle size={16} />
              Hablar con un asesor
            </a>
          </div>
        </aside>
      </div>

      {/* Mobile sticky */}
      {(hasPackage || requiresAdvisor) && (
        <MobileQuoteSticky
          service={form.service}
          pesoCobrable={pesoCobrable}
          result={result}
        />
      )}
    </div>
  )
}
