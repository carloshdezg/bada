import { z } from 'zod'

// Adjustable limits — change here only, all error messages update automatically
export const PACKAGE_LIMITS = {
  maxDim:  200, // cm
  maxPeso: 500, // kg
} as const

// z.number() (no coerce) — react-hook-form uses valueAsNumber: true on inputs,
// so values arrive as numbers already. NaN from empty inputs is handled via
// the { error } constructor param.
const dim = (label: string) =>
  z.number({ error: `${label}: ingresa un número` })
    .positive({ message: `${label}: debe ser mayor que 0` })
    .max(PACKAGE_LIMITS.maxDim, { message: `${label}: máximo ${PACKAGE_LIMITS.maxDim} cm` })

export const packageSchema = z.object({
  largo: dim('Largo'),
  ancho: dim('Ancho'),
  alto:  dim('Alto'),
  peso:  z.number({ error: 'Peso: ingresa un número' })
    .positive({ message: 'Peso: debe ser mayor que 0' })
    .max(PACKAGE_LIMITS.maxPeso, { message: `Peso: máximo ${PACKAGE_LIMITS.maxPeso} kg` }),
})

export const addressSchema = z.object({
  origen: z.object({
    estado: z.string().min(1, 'Selecciona un estado'),
    ciudad: z.string().min(1, 'Selecciona una ciudad'),
    cp:     z.string().regex(/^\d{5}$/, 'El CP debe tener 5 dígitos'),
  }),
  destino: z.object({
    estado: z.string().min(1, 'Selecciona un estado'),
    ciudad: z.string().min(1, 'Selecciona una ciudad'),
    cp:     z.string().regex(/^\d{5}$/, 'El CP debe tener 5 dígitos'),
  }),
})
