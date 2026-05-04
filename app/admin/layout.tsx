import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default:  'Admin — Transportes BADA',
    template: '%s — Admin BADA',
  },
  robots: { index: false, follow: false },
}

// TODO: proteger /admin/* con autenticación real del backend/AWS de BADA.
// Este layout es el punto de entrada para agregar middleware de sesión real.

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {children}
    </div>
  )
}
