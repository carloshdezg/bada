'use client'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { findRouteByPostalCode, routeRequiresAdvisor } from '@/lib/calculator/seedRoutes'
import type { ServiceId } from '@/lib/calculator/types'
import type { PackageValues } from './PackageStep'

const routeSchema = z.object({
  originCp:      z.string().regex(/^\d{5}$/, 'El CP debe tener 5 dígitos'),
  destinationCp: z.string().regex(/^\d{5}$/, 'El CP debe tener 5 dígitos'),
})

export type RouteValues = z.infer<typeof routeSchema>

const SERVICE_LABELS: Record<ServiceId, string> = {
  mensajeria:      'Mensajería',
  paqueteria:      'Paquetería',
  rutas_dedicadas: 'Rutas Dedicadas',
  logistica:       'Logística',
  ecommerce:       'E-commerce',
}

interface Props {
  packageValues:  PackageValues
  defaultValues?: RouteValues | null
  pesoCobrable:   number
  onSubmit:       (values: RouteValues) => void
  onBack:         () => void
}

export default function RouteStep({ packageValues, defaultValues, pesoCobrable, onSubmit, onBack }: Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<RouteValues>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      originCp:      defaultValues?.originCp      ?? '',
      destinationCp: defaultValues?.destinationCp ?? '',
    },
  })

  const destinationCp = useWatch({ control, name: 'destinationCp' })
  const originCp      = useWatch({ control, name: 'originCp' })

  const matchedRoute = destinationCp?.length === 5 && /^\d{5}$/.test(destinationCp)
    ? findRouteByPostalCode(originCp ?? '', destinationCp)
    : undefined

  const requiresAdvisor = matchedRoute !== undefined ? routeRequiresAdvisor(matchedRoute) : undefined

  return (
    <div className="space-y-8">
      {/* Package summary chip */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="text-[13px] font-semibold text-ink">
          {SERVICE_LABELS[packageValues.service]}
        </span>
        <span className="text-[12px] text-ink-50">
          {packageValues.largo} × {packageValues.ancho} × {packageValues.alto} cm
        </span>
        <span className="text-[12px] text-ink-50">
          {packageValues.peso} kg real
        </span>
        <span className="text-[13px] font-semibold text-brand-orange">
          {pesoCobrable} kg cobrable
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Origin CP */}
        <div>
          <label className="text-[12px] font-semibold tracking-[0.06em] uppercase text-ink-50 block mb-3">
            Código postal de origen
          </label>
          <input
            {...register('originCp')}
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="00000"
            className={cn(
              'w-full max-w-[200px] border rounded-xl px-4 py-2.5 text-[15px] text-ink bg-white',
              'placeholder:text-ink/20 focus:outline-none transition-colors',
              errors.originCp
                ? 'border-red-400 focus:ring-2 focus:ring-red-400/10'
                : 'border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10'
            )}
          />
          {errors.originCp && (
            <p className="text-[11px] text-red-500 mt-1">{errors.originCp.message}</p>
          )}
        </div>

        {/* Destination CP */}
        <div>
          <label className="text-[12px] font-semibold tracking-[0.06em] uppercase text-ink-50 block mb-3">
            Código postal de destino
          </label>
          <input
            {...register('destinationCp')}
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="00000"
            className={cn(
              'w-full max-w-[200px] border rounded-xl px-4 py-2.5 text-[15px] text-ink bg-white',
              'placeholder:text-ink/20 focus:outline-none transition-colors',
              errors.destinationCp
                ? 'border-red-400 focus:ring-2 focus:ring-red-400/10'
                : 'border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10'
            )}
          />
          {errors.destinationCp && (
            <p className="text-[11px] text-red-500 mt-1">{errors.destinationCp.message}</p>
          )}

          {/* Live route preview */}
          {matchedRoute !== undefined && !errors.destinationCp && (
            <div className={cn(
              'mt-3 rounded-xl border px-4 py-3 flex items-start gap-3',
              requiresAdvisor
                ? 'border-amber-300 bg-amber-50'
                : 'border-green-300 bg-green-50'
            )}>
              {requiresAdvisor ? (
                <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <div className={cn(
                  'text-[13px] font-semibold',
                  requiresAdvisor ? 'text-amber-800' : 'text-green-800'
                )}>
                  {matchedRoute.poblacion}, {matchedRoute.estado}
                </div>
                <div className={cn(
                  'text-[12px] mt-0.5',
                  requiresAdvisor ? 'text-amber-700' : 'text-green-700'
                )}>
                  {requiresAdvisor
                    ? 'Esta ruta requiere validación con un asesor'
                    : `${matchedRoute.zona_operativa} · Tarifa ${matchedRoute.tipo_tarifa}`}
                </div>
              </div>
            </div>
          )}

          {/* CP not found after entering 5 digits */}
          {destinationCp?.length === 5 && /^\d{5}$/.test(destinationCp) && matchedRoute === undefined && !errors.destinationCp && (
            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-start gap-3">
              <XCircle size={16} className="text-ink-50 mt-0.5 flex-shrink-0" />
              <div className="text-[13px] text-ink-50">
                No se encontró cobertura para este código postal.{' '}
                <span className="font-medium text-ink">Un asesor puede verificar disponibilidad.</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 border-2 border-gray-200 text-ink text-[15px] font-semibold px-5 py-2.5 rounded-xl hover:border-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
            Atrás
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-brand-orange text-white text-[15px] font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Ver cotización
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
