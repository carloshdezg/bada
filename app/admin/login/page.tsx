'use client'

// TODO: reemplazar flujo demo por autenticación real del backend/AWS de BADA.
// Este componente es un scaffold visual para handoff — no implementa seguridad real.

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPwd, setShowPwd]     = useState(false)
  const [loading, setLoading]     = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: reemplazar con POST real a endpoint de autenticación del backend BADA.
    // Por ahora redirige directo para demo visual de handoff.
    setLoading(true)
    setTimeout(() => router.push('/admin/cotizador'), 900)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange mb-4">
            <span className="font-black text-white text-xl" style={{ fontFamily: 'var(--font-display)' }}>B</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Acceso administrador</h1>
          <p className="text-sm text-slate-500 mt-1">
            Ingresa con tus credenciales para administrar la configuración del cotizador.
          </p>
        </div>

        {/* Handoff notice */}
        <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
          <span>
            Acceso visual preparado para integración con autenticación real de BADA.
            El botón redirige directamente para demo de handoff.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

          <div className="space-y-5">

            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Correo electrónico
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@transportesbada.com"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900
                           placeholder:text-slate-400
                           focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-brand-orange
                           transition-colors"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPwd ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900
                             placeholder:text-slate-400
                             focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-brand-orange
                             transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPwd
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full flex items-center justify-center gap-2
                       bg-brand-orange text-white text-sm font-bold
                       px-4 py-3 rounded-xl
                       hover:opacity-90 active:scale-[0.98]
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                Iniciar sesión
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Back to public site */}
        <p className="text-center text-xs text-slate-400 mt-6">
          <Link href="/" className="hover:text-slate-600 transition-colors underline underline-offset-2">
            Volver al sitio público
          </Link>
        </p>

      </div>
    </div>
  )
}
