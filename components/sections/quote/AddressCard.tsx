'use client'

import { useEffect, useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver }       from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { addressSchema }     from '@/lib/validations'
import { MEXICO_STATES, getCities } from '@/lib/mexico-states'
import type { AddressData }  from '@/types/quote'

interface Props {
  isActive:    boolean
  isCollapsed: boolean
  isLocked:    boolean
  defaultData: AddressData | null
  onSubmit:    (data: AddressData) => void
  onEdit:      () => void
}

type AddressBlock = 'origen' | 'destino'

function AddressGroup({
  prefix,
  label,
  control,
  register,
  errors,
  setValue,
}: {
  prefix:   AddressBlock
  label:    string
  control:  ReturnType<typeof useForm<AddressData>>['control']
  register: ReturnType<typeof useForm<AddressData>>['register']
  errors:   ReturnType<typeof useForm<AddressData>>['formState']['errors']
  setValue: ReturnType<typeof useForm<AddressData>>['setValue']
}) {
  const selectedEstado = useWatch({ control, name: `${prefix}.estado` })
  const cities = getCities(selectedEstado ?? '')

  // Reset city when state changes
  const prevEstado = useRef(selectedEstado)
  useEffect(() => {
    if (prevEstado.current !== selectedEstado) {
      setValue(`${prefix}.ciudad`, '')
      prevEstado.current = selectedEstado
    }
  }, [selectedEstado, prefix, setValue])

  const errs = errors[prefix]
  const selectCls = (hasErr: boolean) => [
    'w-full rounded-[10px] px-4 py-[11px] text-[15px] text-ink',
    'border-[1.5px] bg-white appearance-none',
    'focus:outline-none focus:ring-2 transition-colors duration-150',
    hasErr
      ? 'border-danger focus:border-danger focus:ring-danger/20'
      : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/15',
  ].join(' ')

  const inputCls = (hasErr: boolean) => [
    'w-full rounded-[10px] px-4 py-[11px] text-[15px] text-ink',
    'border-[1.5px] bg-white',
    'focus:outline-none focus:ring-2 transition-colors duration-150',
    hasErr
      ? 'border-danger focus:border-danger focus:ring-danger/20'
      : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/15',
  ].join(' ')

  return (
    <fieldset className="border-none p-0 m-0">
      <legend className="text-[11px] font-bold tracking-[0.1em] uppercase
                         text-ink-50 mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" aria-hidden="true" />
        {label}
      </legend>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Estado */}
        <div className="flex flex-col gap-[6px]">
          <label htmlFor={`${prefix}-estado`}
                 className="text-[12px] font-semibold text-ink-50 tracking-[0.04em] uppercase">
            Estado
          </label>
          <select
            id={`${prefix}-estado`}
            aria-describedby={errs?.estado ? `${prefix}-estado-error` : undefined}
            aria-invalid={errs?.estado ? 'true' : 'false'}
            className={selectCls(!!errs?.estado)}
            {...register(`${prefix}.estado`)}
          >
            <option value="">Selecciona…</option>
            {MEXICO_STATES.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {errs?.estado && (
            <p id={`${prefix}-estado-error`} role="alert" className="text-[11.5px] text-danger font-medium">
              {errs.estado.message}
            </p>
          )}
        </div>

        {/* Ciudad */}
        <div className="flex flex-col gap-[6px]">
          <label htmlFor={`${prefix}-ciudad`}
                 className="text-[12px] font-semibold text-ink-50 tracking-[0.04em] uppercase">
            Ciudad
          </label>
          <select
            id={`${prefix}-ciudad`}
            disabled={!selectedEstado}
            aria-describedby={errs?.ciudad ? `${prefix}-ciudad-error` : undefined}
            aria-invalid={errs?.ciudad ? 'true' : 'false'}
            className={[selectCls(!!errs?.ciudad), !selectedEstado ? 'opacity-50 cursor-not-allowed' : ''].join(' ')}
            {...register(`${prefix}.ciudad`)}
          >
            <option value="">Selecciona…</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errs?.ciudad && (
            <p id={`${prefix}-ciudad-error`} role="alert" className="text-[11.5px] text-danger font-medium">
              {errs.ciudad.message}
            </p>
          )}
        </div>

        {/* CP */}
        <div className="flex flex-col gap-[6px]">
          <label htmlFor={`${prefix}-cp`}
                 className="text-[12px] font-semibold text-ink-50 tracking-[0.04em] uppercase">
            C.P.
          </label>
          <input
            id={`${prefix}-cp`}
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="00000"
            autoComplete={prefix === 'origen' ? 'postal-code' : 'off'}
            aria-describedby={errs?.cp ? `${prefix}-cp-error` : undefined}
            aria-invalid={errs?.cp ? 'true' : 'false'}
            className={inputCls(!!errs?.cp)}
            {...register(`${prefix}.cp`)}
          />
          {errs?.cp && (
            <p id={`${prefix}-cp-error`} role="alert" className="text-[11.5px] text-danger font-medium">
              {errs.cp.message}
            </p>
          )}
        </div>

      </div>
    </fieldset>
  )
}

export default function AddressCard({
  isActive, isCollapsed, isLocked, defaultData, onSubmit, onEdit,
}: Props) {
  const rm       = useReducedMotion()
  const firstRef = useRef<HTMLSelectElement | null>(null)

  const form = useForm<AddressData>({
    resolver:      zodResolver(addressSchema),
    defaultValues: defaultData ?? undefined,
  })
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control, setValue } = form

  useEffect(() => {
    if (isActive && defaultData) reset(defaultData)
  }, [isActive]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isActive && !isLocked) {
      const t = setTimeout(() => firstRef.current?.focus(), rm ? 0 : 220)
      return () => clearTimeout(t)
    }
  }, [isActive, isLocked, rm])

  const anim = {
    initial: { opacity: 0, y: rm ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: rm ? 0 : -4 },
    transition: { duration: rm ? 0 : 0.18 },
  }

  const { ref: origenEstadoRef, ...origenEstadoRest } = register('origen.estado')

  return (
    <div
      className={[
        'rounded-[20px] overflow-hidden',
        'border-[1.5px] transition-all duration-200',
        isActive      ? 'border-brand-orange bg-white shadow-[0_8px_32px_rgba(15,25,35,0.10)]'
          : isCollapsed ? 'border-gray-200 bg-white'
          : 'border-gray-100 bg-gray-50',
        isLocked      ? 'opacity-60 pointer-events-none select-none' : '',
      ].join(' ')}
      aria-disabled={isLocked}
    >

      {/* ── Locked placeholder ──────────────────────────────── */}
      {isLocked && (
        <div className="px-7 py-6 flex items-center gap-4">
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center
                           font-display font-black text-[14px] text-ink-50 flex-shrink-0">
            2
          </span>
          <span className="text-[14px] text-ink-50 font-semibold">Direcciones</span>
          <span className="ml-auto text-[12px] text-ink-20">Completa el paso anterior</span>
        </div>
      )}

      {/* ── Collapsed summary ───────────────────────────────── */}
      <AnimatePresence>
        {isCollapsed && defaultData && (
          <motion.div key="summary" {...anim}
            className="px-7 py-5 flex items-center gap-3 flex-wrap"
          >
            <span className="w-7 h-7 rounded-full bg-brand-orange flex items-center
                             justify-center flex-shrink-0" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-[13.5px] font-semibold text-ink">Direcciones</span>
            <span className="text-[13.5px] text-ink-50 truncate max-w-[280px]">
              {defaultData.origen.ciudad} CP {defaultData.origen.cp}
              {' → '}
              {defaultData.destino.ciudad} CP {defaultData.destino.cp}
            </span>
            <button
              type="button"
              onClick={onEdit}
              className="ml-auto text-[12.5px] font-semibold text-brand-orange
                         hover:text-brand-orange-dark underline underline-offset-2
                         transition-colors focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
            >
              Editar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Active form ─────────────────────────────────────── */}
      <AnimatePresence>
        {isActive && (
          <motion.div key="form" {...anim}>
            <div className="px-7 pt-7 pb-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-brand-orange flex items-center
                                 justify-center font-display font-black text-[15px] text-white
                                 flex-shrink-0" aria-hidden="true">
                  2
                </span>
                <h2 className="font-display font-black text-[20px] text-ink tracking-[-0.01em]">
                  Origen y destino
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="px-7 pb-7 flex flex-col gap-7">

                {/* Origen */}
                <AddressGroup
                  prefix="origen"
                  label="Origen — ¿Desde dónde sale?"
                  control={control}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                />

                <div className="border-t border-gray-100" role="separator" />

                {/* Destino */}
                <AddressGroup
                  prefix="destino"
                  label="Destino — ¿A dónde llega?"
                  control={control}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="self-end btn btn-primary btn-lg mt-1"
                >
                  Ver mi cotización →
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
