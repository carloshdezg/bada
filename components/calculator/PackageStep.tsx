'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Package, Truck, Layers, ShoppingCart, ArrowRight, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { waUrl } from '@/lib/whatsapp'
import { calculatorConfig } from '@/lib/calculator/config'
import type { ServiceId } from '@/lib/calculator/types'

const cfg = calculatorConfig

const packageSchema = z.object({
  peso:  z.number({ error: 'Ingresa el peso' })
           .positive({ message: 'Debe ser mayor que 0' })
           .max(cfg.pesoMaxPaqueteriaKg, { message: `Máximo ${cfg.pesoMaxPaqueteriaKg} kg` }),
  largo: z.number({ error: 'Ingresa el largo' })
           .positive({ message: 'Debe ser mayor que 0' })
           .max(cfg.largoMaximoCm, { message: `Máximo ${cfg.largoMaximoCm} cm` }),
  ancho: z.number({ error: 'Ingresa el ancho' })
           .positive({ message: 'Debe ser mayor que 0' })
           .max(cfg.anchoMaximoCm, { message: `Máximo ${cfg.anchoMaximoCm} cm` }),
  alto:  z.number({ error: 'Ingresa el alto' })
           .positive({ message: 'Debe ser mayor que 0' })
           .max(cfg.altoMaximoCm, { message: `Máximo ${cfg.altoMaximoCm} cm` }),
})

type PackageFormValues = z.infer<typeof packageSchema>

export interface PackageValues extends PackageFormValues {
  service: ServiceId
}

interface ServiceOption {
  id: ServiceId
  label: string
  shortDesc: string
  icon: React.ReactNode
  isAdvisor: boolean
}

const SERVICES: ServiceOption[] = [
  { id: 'mensajeria',      label: 'Mensajería',      shortDesc: 'Hasta 30 kg',             icon: <Mail size={20} />,         isAdvisor: false },
  { id: 'paqueteria',      label: 'Paquetería',      shortDesc: 'Hasta 1,500 kg',          icon: <Package size={20} />,      isAdvisor: false },
  { id: 'rutas_dedicadas', label: 'Rutas Dedicadas', shortDesc: 'Carga programada',        icon: <Truck size={20} />,        isAdvisor: true  },
  { id: 'logistica',       label: 'Logística',       shortDesc: 'Almacén y distribución',  icon: <Layers size={20} />,       isAdvisor: true  },
  { id: 'ecommerce',       label: 'E-commerce',      shortDesc: 'Fulfillment',             icon: <ShoppingCart size={20} />, isAdvisor: true  },
]

interface Props {
  defaultValues?: Partial<PackageValues> | null
  onSubmit: (values: PackageValues) => void
}

export default function PackageStep({ defaultValues, onSubmit }: Props) {
  const [selectedService, setSelectedService] = useState<ServiceId | null>(
    defaultValues?.service ?? null
  )

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      peso:  defaultValues?.peso  ?? ('' as unknown as number),
      largo: defaultValues?.largo ?? ('' as unknown as number),
      ancho: defaultValues?.ancho ?? ('' as unknown as number),
      alto:  defaultValues?.alto  ?? ('' as unknown as number),
    },
  })

  const largo = watch('largo')
  const ancho = watch('ancho')
  const alto  = watch('alto')
  const peso  = watch('peso')

  const pesoVolumetrico =
    largo && ancho && alto && !isNaN(largo) && !isNaN(ancho) && !isNaN(alto)
      ? (largo * ancho * alto) / cfg.divisorVolumetrico
      : null

  const pesoCobrable =
    pesoVolumetrico !== null && peso && !isNaN(peso)
      ? Math.ceil(Math.max(peso, pesoVolumetrico))
      : null

  const selectedMeta   = SERVICES.find(s => s.id === selectedService)
  const isAdvisorService = selectedMeta?.isAdvisor ?? false
  const isAutoService    = selectedService !== null && !isAdvisorService

  const advisorMessage = selectedMeta
    ? `Hola, quiero información sobre el servicio de ${selectedMeta.label} de Transportes BADA.`
    : undefined

  function handleFormSubmit(pkg: PackageFormValues) {
    if (!selectedService) return
    onSubmit({ service: selectedService, ...pkg })
  }

  return (
    <div className="space-y-8">
      {/* Service selector */}
      <div>
        <p className="text-[12px] font-semibold tracking-[0.06em] uppercase text-ink-50 mb-3">
          Tipo de servicio
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SERVICES.map((svc) => (
            <button
              key={svc.id}
              type="button"
              onClick={() => setSelectedService(svc.id)}
              className={cn(
                'relative flex flex-col items-start gap-2 p-4 rounded-2xl border-2 text-left transition-all',
                svc.isAdvisor
                  ? selectedService === svc.id
                    ? 'border-brand-blue bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-brand-blue/40'
                  : selectedService === svc.id
                    ? 'border-brand-orange bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-brand-orange/40'
              )}
            >
              <div
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center',
                  svc.isAdvisor
                    ? selectedService === svc.id
                      ? 'bg-brand-blue/15 text-brand-blue'
                      : 'bg-gray-100 text-ink-50'
                    : selectedService === svc.id
                      ? 'bg-brand-orange/15 text-brand-orange'
                      : 'bg-gray-100 text-ink-50'
                )}
              >
                {svc.icon}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-ink leading-tight">
                  {svc.label}
                </div>
                <div className="text-[11px] text-ink-50 mt-0.5">{svc.shortDesc}</div>
              </div>
              {svc.isAdvisor && (
                <span className="text-[10px] font-semibold tracking-wide uppercase text-brand-blue/80 bg-brand-blue/10 px-1.5 py-0.5 rounded-md">
                  Asesor
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Advisor service notice */}
      {isAdvisorService && (
        <div className="rounded-2xl border-2 border-brand-blue/25 bg-blue-50 p-5">
          <p className="text-[14px] font-semibold text-ink mb-1">
            Este servicio requiere cotización con asesor
          </p>
          <p className="text-[13px] text-ink-50 leading-relaxed mb-4">
            {selectedMeta?.label} requiere una propuesta personalizada según tu operación.
            Un ejecutivo de BADA te contacta y acompaña en todo el proceso.
          </p>
          <a
            href={waUrl(advisorMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-blue text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={16} />
            Hablar con un asesor
          </a>
        </div>
      )}

      {/* Prompt to select a service */}
      {!selectedService && (
        <p className="text-[13px] text-ink-50">
          Selecciona un tipo de servicio para continuar.
        </p>
      )}

      {/* Package form — auto-quote services only */}
      {isAutoService && (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
          {/* Dimensions */}
          <div>
            <p className="text-[12px] font-semibold tracking-[0.06em] uppercase text-ink-50 mb-3">
              Dimensiones (cm)
            </p>
            <div className="grid grid-cols-3 gap-3">
              {(['largo', 'ancho', 'alto'] as const).map((field) => (
                <div key={field}>
                  <label className="text-[12px] font-medium text-ink-50 block mb-1.5 capitalize">
                    {field}
                  </label>
                  <input
                    {...register(field, { valueAsNumber: true })}
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    min="0.1"
                    step="0.1"
                    className={cn(
                      'w-full border rounded-xl px-3 py-2.5 text-[15px] text-ink bg-white',
                      'placeholder:text-ink/20 focus:outline-none transition-colors',
                      errors[field]
                        ? 'border-red-400 focus:ring-2 focus:ring-red-400/10'
                        : 'border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10'
                    )}
                  />
                  {errors[field] && (
                    <p className="text-[11px] text-red-500 mt-1">{errors[field]?.message}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="text-[12px] font-semibold tracking-[0.06em] uppercase text-ink-50 block mb-3">
              Peso real (kg)
            </label>
            <input
              {...register('peso', { valueAsNumber: true })}
              type="number"
              inputMode="decimal"
              placeholder="0"
              min="0.01"
              step="0.01"
              className={cn(
                'w-full max-w-[200px] border rounded-xl px-4 py-2.5 text-[15px] text-ink bg-white',
                'placeholder:text-ink/20 focus:outline-none transition-colors',
                errors.peso
                  ? 'border-red-400 focus:ring-2 focus:ring-red-400/10'
                  : 'border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10'
              )}
            />
            {errors.peso && (
              <p className="text-[11px] text-red-500 mt-1">{errors.peso.message}</p>
            )}
          </div>

          {/* Live weight preview */}
          {pesoCobrable !== null && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex items-center gap-6 flex-wrap">
              <div>
                <div className="text-[11px] font-medium text-ink-50 uppercase tracking-wider mb-0.5">
                  Volumétrico
                </div>
                <div className="text-[15px] font-semibold text-ink">
                  {pesoVolumetrico!.toFixed(2)} kg
                </div>
              </div>
              <div className="w-px h-7 bg-gray-200" />
              <div>
                <div className="text-[11px] font-medium text-ink-50 uppercase tracking-wider mb-0.5">
                  Real
                </div>
                <div className="text-[15px] font-semibold text-ink">
                  {!isNaN(peso) && peso > 0 ? `${peso} kg` : '—'}
                </div>
              </div>
              <div className="w-px h-7 bg-gray-200" />
              <div>
                <div className="text-[11px] font-medium text-ink-50 uppercase tracking-wider mb-0.5">
                  Cobrable
                </div>
                <div className="text-[17px] font-bold text-brand-orange">
                  {pesoCobrable} kg
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-brand-orange text-white text-[15px] font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Continuar
            <ArrowRight size={16} />
          </button>
        </form>
      )}
    </div>
  )
}
