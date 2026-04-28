'use client'

import { useEffect, useRef } from 'react'
import { useForm }            from 'react-hook-form'
import { zodResolver }        from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { packageSchema }      from '@/lib/validations'
import type { PackageData }   from '@/types/quote'

interface Props {
  isActive:    boolean
  isCollapsed: boolean
  isLocked:    boolean
  defaultData: PackageData | null
  onSubmit:    (data: PackageData) => void
  onEdit:      () => void
}

interface FieldProps {
  id:       string
  label:    string
  unit:     string
  step?:    string
  register: ReturnType<typeof useForm<PackageData>>['register']
  error?:   string
}

function NumberField({ id, label, unit, step = '1', register, error }: FieldProps) {
  const errId = `${id}-error`
  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor={id} className="text-[12.5px] font-semibold text-ink-50 tracking-[0.04em] uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          step={step}
          min="0"
          inputMode="decimal"
          autoComplete="off"
          aria-describedby={error ? errId : undefined}
          aria-invalid={error ? 'true' : 'false'}
          className={[
            'w-full rounded-[10px] px-4 py-[11px] text-[15px] text-ink font-medium',
            'border-[1.5px] bg-white',
            'focus:outline-none focus:ring-2',
            'transition-colors duration-150',
            'pr-14',                          // space for unit badge
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/15',
          ].join(' ')}
          {...register(id as keyof PackageData, { valueAsNumber: true })}
        />
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2
                     text-[12px] font-bold text-ink-20 tracking-wide"
          aria-hidden="true"
        >
          {unit}
        </span>
      </div>
      {error && (
        <p id={errId} role="alert" className="text-[12px] text-danger font-medium">
          {error}
        </p>
      )}
    </div>
  )
}

export default function PackageCard({
  isActive, isCollapsed, isLocked, defaultData, onSubmit, onEdit,
}: Props) {
  const rm       = useReducedMotion()
  const firstRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<PackageData>({
    resolver:      zodResolver(packageSchema),
    defaultValues: defaultData ?? undefined,
  })
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form

  // Pre-fill form when becoming active (e.g. re-edit)
  useEffect(() => {
    if (isActive && defaultData) reset(defaultData)
  }, [isActive]) // eslint-disable-line react-hooks/exhaustive-deps

  // Move focus to first input when card unlocks
  useEffect(() => {
    if (isActive && !isLocked) {
      const t = setTimeout(() => firstRef.current?.focus(), rm ? 0 : 220)
      return () => clearTimeout(t)
    }
  }, [isActive, isLocked, rm])

  const inputAnim = {
    initial:    { opacity: 0, y: rm ? 0 : 8 },
    animate:    { opacity: 1, y: 0 },
    exit:       { opacity: 0, y: rm ? 0 : -4 },
    transition: { duration: rm ? 0 : 0.18 },
  }

  const largoRef = useRef<HTMLInputElement | null>(null)
  const { ref: largoRegRef, ...largoRest } = register('largo', { valueAsNumber: true })

  return (
    <div
      className={[
        'rounded-[20px] overflow-hidden',
        'border-[1.5px] transition-all duration-200',
        isActive    ? 'border-brand-orange bg-white shadow-[0_8px_32px_rgba(15,25,35,0.10)]'
          : isCollapsed ? 'border-gray-200 bg-white'
          : 'border-gray-100 bg-gray-50',
        isLocked    ? 'opacity-60 pointer-events-none select-none' : '',
      ].join(' ')}
      aria-disabled={isLocked}
    >

      {/* ── Locked placeholder ────────────────────────────────── */}
      {isLocked && (
        <div className="px-7 py-6 flex items-center gap-4">
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center
                           font-display font-black text-[14px] text-ink-50 flex-shrink-0">
            1
          </span>
          <span className="text-[14px] text-ink-50 font-semibold">Paquete</span>
          <span className="ml-auto text-[12px] text-ink-20">Completa el paso anterior</span>
        </div>
      )}

      {/* ── Collapsed summary ─────────────────────────────────── */}
      <AnimatePresence>
        {isCollapsed && defaultData && (
          <motion.div key="summary" {...inputAnim}
            className="px-7 py-5 flex items-center gap-3 flex-wrap"
          >
            <span className="w-7 h-7 rounded-full bg-brand-orange flex items-center
                             justify-center flex-shrink-0" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-[13.5px] font-semibold text-ink">Paquete</span>
            <span className="text-[13.5px] text-ink-50">
              {defaultData.largo}×{defaultData.ancho}×{defaultData.alto} cm
              {' · '}{defaultData.peso} kg
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

      {/* ── Active form ───────────────────────────────────────── */}
      <AnimatePresence>
        {isActive && (
          <motion.div key="form" {...inputAnim}>
            <div className="px-7 pt-7 pb-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-brand-orange flex items-center
                                 justify-center font-display font-black text-[15px] text-white
                                 flex-shrink-0" aria-hidden="true">
                  1
                </span>
                <h2 className="font-display font-black text-[20px] text-ink tracking-[-0.01em]">
                  Datos del paquete
                </h2>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <fieldset className="border-none p-0 m-0">
                <legend className="sr-only">Dimensiones y peso del paquete</legend>

                <div className="px-7 pb-7 flex flex-col gap-5">
                  {/* Dimensions row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-[6px]">
                      <label htmlFor="largo"
                        className="text-[12.5px] font-semibold text-ink-50 tracking-[0.04em] uppercase">
                        Largo
                      </label>
                      <div className="relative">
                        <input
                          id="largo"
                          type="number"
                          step="1"
                          min="0"
                          inputMode="numeric"
                          autoComplete="off"
                          aria-describedby={errors.largo ? 'largo-error' : undefined}
                          aria-invalid={errors.largo ? 'true' : 'false'}
                          ref={(el) => {
                            largoRegRef(el)
                            firstRef.current = el
                            largoRef.current = el
                          }}
                          {...largoRest}
                          className={[
                            'w-full rounded-[10px] px-4 py-[11px] pr-12 text-[15px] text-ink font-medium',
                            'border-[1.5px] bg-white focus:outline-none focus:ring-2 transition-colors duration-150',
                            errors.largo
                              ? 'border-danger focus:border-danger focus:ring-danger/20'
                              : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/15',
                          ].join(' ')}
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
                                         text-[12px] font-bold text-ink-20" aria-hidden="true">cm</span>
                      </div>
                      {errors.largo && (
                        <p id="largo-error" role="alert" className="text-[11.5px] text-danger font-medium">
                          {errors.largo.message}
                        </p>
                      )}
                    </div>

                    <NumberField id="ancho" label="Ancho" unit="cm" register={register} error={errors.ancho?.message} />
                    <NumberField id="alto"  label="Alto"  unit="cm" register={register} error={errors.alto?.message}  />
                  </div>

                  {/* Weight row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <NumberField id="peso" label="Peso" unit="kg" step="0.1"
                      register={register} error={errors.peso?.message} />
                    <div className="bg-brand-orange-50 border border-brand-orange-100
                                    rounded-[10px] px-4 py-3 flex flex-col justify-center">
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-brand-orange mb-1">
                        Tip
                      </p>
                      <p className="text-[12px] text-ink-50 leading-[1.55]">
                        Peso volumétrico = L×A×A÷5000.
                        Se cobra el mayor de los dos.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="self-end btn btn-primary btn-lg mt-1"
                  >
                    Ver opciones de envío →
                  </button>
                </div>
              </fieldset>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
