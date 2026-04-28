import type { z } from 'zod'
import type { packageSchema, addressSchema } from '@/lib/validations'

export type PackageData  = z.infer<typeof packageSchema>
export type AddressData  = z.infer<typeof addressSchema>
export type QuoteStep    = 1 | 2 | 3

export interface MockResult {
  pesoReal:        number
  pesoVolumetrico: number
  pesoCobrable:    number
  tarifaBase:      number
  total:           number
  servicio:        string
  tiempoEstimado:  string
  esMock:          true
}
