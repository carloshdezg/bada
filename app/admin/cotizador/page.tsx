'use client'

// TODO: proteger esta página con autenticación real del backend/AWS de BADA.
// TODO: reemplazar todos los datos seed/locales por endpoints reales una vez disponibles.

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Settings, Layers, DollarSign, MapPin, MessageSquare,
  Save, Check, AlertTriangle, Plus, Upload, Search,
  LogOut, Info, MoreHorizontal,
} from 'lucide-react'
import { calculatorConfig } from '@/lib/calculator/config'
import { seedTariffs } from '@/lib/calculator/seedTariffs'
import { seedRoutes } from '@/lib/calculator/seedRoutes'
import type { TariffRow, RouteCoverageRow } from '@/lib/calculator/types'

// ─────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────

type TabId = 'config' | 'servicios' | 'tarifario' | 'rutas' | 'mensajes'
type SaveState = 'idle' | 'saving' | 'saved'
type ServiceMode = 'automatic' | 'advisor' | 'pending' | 'disabled'

interface ServiceRow {
  id: string
  nombre: string
  descripcion: string
  modo: ServiceMode
  activo: boolean
  orden: number
}

interface ConfigState {
  divisorVolumetrico: number
  iva: number
  precioKgAdicional: number
  pesoMaxMensajeriaKg: number
  pesoMaxPaqueteriaKg: number
  largoMaximoCm: number
  anchoMaximoCm: number
  altoMaximoCm: number
  rangoGuiasPublico: string
  versionConfig: string
}

interface MessagesState {
  fallbackAsesor: string
  rutaNoEncontrada: string
  rutaInactiva: string
  rutaRequiereAsesor: string
  limiteExcedido: string
  servicioRequiereAsesor: string
  notaValidacion: string
  whatsappAsesor: string
  mensajePrellenado: string
}

// ─────────────────────────────────────────────────────────────────────
// Tarifario admin helpers
// ─────────────────────────────────────────────────────────────────────

interface AdminTariffRow extends TariffRow {
  moneda: string
  isNew: boolean
  rango_desde: number | ''
  rango_hasta: number | '' | 'plus'
}

function parseTariffRango(rango: string): Pick<AdminTariffRow, 'rango_desde' | 'rango_hasta'> {
  if (rango.endsWith('+')) {
    const n = parseInt(rango)
    return { rango_desde: isNaN(n) ? '' : n, rango_hasta: 'plus' }
  }
  const [a, b] = rango.split('-')
  const d = parseInt(a); const h = parseInt(b)
  return { rango_desde: isNaN(d) ? '' : d, rango_hasta: isNaN(h) ? '' : h }
}

function buildTariffId(
  tipo: TariffRow['tipo_tarifa'],
  desde: number | '',
  hasta: number | '' | 'plus',
): string {
  const t = tipo === 'Local' ? 'LOCAL' : 'FORANEA'
  if (desde === '') return `T_${t}_?`
  if (hasta === 'plus') return `T_${t}_${desde}PLUS`
  if (hasta === '') return `T_${t}_${desde}_?`
  return `T_${t}_${desde}_${hasta}`
}

function buildRangoGuias(desde: number | '', hasta: number | '' | 'plus'): string {
  if (desde === '') return ''
  if (hasta === 'plus') return `${desde}+`
  if (hasta === '') return `${desde}-?`
  return `${desde}-${hasta}`
}

function seedToAdmin(t: TariffRow): AdminTariffRow {
  return { ...t, moneda: 'MXN', isNew: false, ...parseTariffRango(t.rango_guias) }
}

// ─────────────────────────────────────────────────────────────────────
// Rutas / cobertura admin helpers
// ─────────────────────────────────────────────────────────────────────

type AdminRouteZone   = 'Metro' | 'Foráneo' | 'Especial'
type AdminRouteMode   = 'Automática' | 'Asesor'
type AdminRouteTarifa = 'Local' | 'Foránea'

interface AdminRouteRow {
  _rowKey: string
  ruta_id: string
  estado: string
  ruta: string
  poblacion: string
  codigo_postal: string
  lunes: boolean
  martes: boolean
  miercoles: boolean
  jueves: boolean
  viernes: boolean
  sabado: boolean
  zona: AdminRouteZone
  tipo_tarifa: AdminRouteTarifa
  activo: boolean
  modo_cotizacion: AdminRouteMode
  isNew: boolean
}

// Genera un identificador estable para uso interno como React key.
// Importante: NO usar ruta_id (que se recalcula al editar Estado/CP) como key,
// porque cualquier cambio remonta la fila y los inputs pierden foco.
function makeRowKey(): string {
  return `row_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function normalizeEstado(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^A-Z0-9_]/g, '')
}

function buildRouteId(estado: string, cp: string): string {
  const estadoNorm = normalizeEstado(estado)
  const cpTrim     = cp.trim()
  if (!estadoNorm || !cpTrim) return 'COV_PENDIENTE'
  return `COV_${estadoNorm}_${cpTrim}`
}

function seedRouteToAdmin(r: RouteCoverageRow, idx: number): AdminRouteRow {
  const zona: AdminRouteZone = r.zona_operativa === 'Área Metropolitana' ? 'Metro' : 'Foráneo'
  const modo: AdminRouteMode = r.cotizacion_automatica && !r.requiere_asesor ? 'Automática' : 'Asesor'
  return {
    // Determinístico para evitar mismatches de hidratación SSR/cliente.
    _rowKey: `seed_${idx}`,
    ruta_id: buildRouteId(r.estado, r.codigo_postal),
    estado: r.estado,
    ruta: r.ruta,
    poblacion: r.poblacion,
    codigo_postal: r.codigo_postal,
    lunes: r.lunes, martes: r.martes, miercoles: r.miercoles,
    jueves: r.jueves, viernes: r.viernes, sabado: r.sabado,
    zona, tipo_tarifa: r.tipo_tarifa, activo: r.activo,
    modo_cotizacion: modo, isNew: false,
  }
}

function isRouteRowComplete(r: AdminRouteRow): boolean {
  if (!r.estado.trim() || !r.ruta.trim() || !r.poblacion.trim()) return false
  if (!/^\d{5}$/.test(r.codigo_postal.trim())) return false
  if (r.ruta_id === 'COV_PENDIENTE') return false
  return true
}

// ─────────────────────────────────────────────────────────────────────
// Seed data copies (local state — not connected to any backend yet)
// TODO: reemplazar datos seed/locales por endpoints reales.
// ─────────────────────────────────────────────────────────────────────

const CONFIG_SEED: ConfigState = {
  divisorVolumetrico:  calculatorConfig.divisorVolumetrico,
  iva:                 calculatorConfig.iva,
  precioKgAdicional:   calculatorConfig.precioKgAdicional,
  pesoMaxMensajeriaKg: calculatorConfig.pesoMaxMensajeriaKg,
  pesoMaxPaqueteriaKg: calculatorConfig.pesoMaxPaqueteriaKg,
  largoMaximoCm:       calculatorConfig.largoMaximoCm,
  anchoMaximoCm:       calculatorConfig.anchoMaximoCm,
  altoMaximoCm:        calculatorConfig.altoMaximoCm,
  rangoGuiasPublico:   calculatorConfig.rangoGuiasPublico,
  versionConfig:       calculatorConfig.versionConfig,
}

const SERVICES_SEED: ServiceRow[] = [
  { id: 'mensajeria',      nombre: 'Mensajería',             descripcion: 'Documentos y paquetes pequeños.',                          modo: 'automatic', activo: true,  orden: 1 },
  { id: 'paqueteria',      nombre: 'Paquetería',             descripcion: 'Cajas y bultos con cálculo por peso cobrable.',             modo: 'automatic', activo: true,  orden: 2 },
  { id: 'rutas_dedicadas', nombre: 'Rutas Dedicadas',        descripcion: 'Unidades o rutas exclusivas para operaciones recurrentes.', modo: 'advisor',   activo: true,  orden: 3 },
  { id: 'logistica',       nombre: 'Logística',              descripcion: 'Soluciones operativas a la medida.',                       modo: 'advisor',   activo: true,  orden: 4 },
  { id: 'ecommerce',       nombre: 'Envíos para e-commerce', descripcion: 'Revisión de envíos recurrentes para tiendas online.',      modo: 'pending',   activo: true,  orden: 5 },
]

const MESSAGES_SEED: MessagesState = {
  fallbackAsesor:         calculatorConfig.mensajeRequiereAsesor,
  rutaNoEncontrada:       'La ruta ingresada no se encuentra en la cobertura disponible. Un asesor puede ayudarte a revisar opciones.',
  rutaInactiva:           'La ruta seleccionada está temporalmente inactiva. Contacta a un asesor para opciones disponibles.',
  rutaRequiereAsesor:     'Esta ruta requiere validación con un asesor antes de confirmar el servicio.',
  limiteExcedido:         'El peso o dimensiones del envío exceden los límites para cotización automática. Contacta a un asesor.',
  servicioRequiereAsesor: 'Este servicio no puede cotizarse automáticamente. Un asesor puede orientarte sobre la opción más adecuada.',
  notaValidacion:         'El precio mostrado es un estimado sujeto a cobertura, peso cobrable y condiciones operativas. Puede variar al confirmar.',
  whatsappAsesor:         calculatorConfig.whatsappAsesor,
  mensajePrellenado:      'Hola, quiero información sobre los servicios de Transportes BADA.',
}

// ─────────────────────────────────────────────────────────────────────
// UI helpers
// ─────────────────────────────────────────────────────────────────────

const MODE_LABEL: Record<ServiceMode, string> = {
  automatic: 'Automático',
  advisor:   'Asesor',
  pending:   'Pendiente',
  disabled:  'Desactivado',
}
const MODE_BADGE: Record<ServiceMode, string> = {
  automatic: 'bg-green-100 text-green-800 border-green-200',
  advisor:   'bg-yellow-100 text-yellow-800 border-yellow-200',
  pending:   'bg-sky-100 text-sky-800 border-sky-200',
  disabled:  'bg-gray-100 text-gray-500 border-gray-200',
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${className}`}>
      {children}
    </span>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-checked={checked}
      role="switch"
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-orange/40 ${
        checked ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? 'translate-x-[18px]' : 'translate-x-[2px]'
      }`} />
    </button>
  )
}

function SaveBtn({ state, onClick }: { state: SaveState; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === 'saving'}
      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg
                 bg-brand-orange text-white
                 hover:opacity-90 active:scale-[0.98] disabled:opacity-60
                 transition-all duration-150"
    >
      {state === 'saving' && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
      {state === 'saved'  && <Check className="w-3.5 h-3.5" />}
      {state === 'idle'   && <Save className="w-3.5 h-3.5" />}
      {state === 'saving' ? 'Guardando…' : state === 'saved' ? 'Guardado' : 'Guardar cambios'}
    </button>
  )
}

function TodoNote({ endpoint }: { endpoint: string }) {
  return (
    <div className="flex items-start gap-2 bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-sky-700 mt-4">
      <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
      <span className="font-mono">TODO: conectar con endpoint real → {endpoint}</span>
    </div>
  )
}

function HandoffBanner() {
  return (
    <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
      <span>
        <strong>Modo handoff / pendiente backend.</strong>{' '}
        Esta interfaz usa datos seed/locales como referencia. El equipo técnico de BADA
        deberá conectar la lectura y escritura real con su backend en AWS.
      </span>
    </div>
  )
}

function InputField({
  label, value, type = 'text', onChange,
}: {
  label: string
  value: string | number
  type?: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-slate-900
                   focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-brand-orange
                   transition-colors bg-white"
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Tab definitions
// ─────────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: 'config',    label: 'Configuración',       Icon: Settings       },
  { id: 'servicios', label: 'Servicios',            Icon: Layers         },
  { id: 'tarifario', label: 'Tarifario',            Icon: DollarSign     },
  { id: 'rutas',     label: 'Rutas y cobertura',   Icon: MapPin         },
  { id: 'mensajes',  label: 'Mensajes y WhatsApp', Icon: MessageSquare  },
]

// ─────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────

export default function AdminCotizadorPage() {
  const [activeTab, setActiveTab] = useState<TabId>('config')

  // Per-tab save state
  const [saveState, setSaveState] = useState<Record<TabId, SaveState>>({
    config: 'idle', servicios: 'idle', tarifario: 'idle', rutas: 'idle', mensajes: 'idle',
  })

  function triggerSave(tab: TabId) {
    // TODO: enviar datos al endpoint real correspondiente.
    setSaveState(s => ({ ...s, [tab]: 'saving' }))
    setTimeout(() => {
      setSaveState(s => ({ ...s, [tab]: 'saved' }))
      setTimeout(() => setSaveState(s => ({ ...s, [tab]: 'idle' })), 3000)
    }, 900)
  }

  // ── Config state ──────────────────────────────────────────────────
  const [config, setConfig] = useState<ConfigState>(CONFIG_SEED)

  function setConfigField(key: keyof ConfigState, val: string) {
    setConfig(prev => ({
      ...prev,
      [key]: typeof CONFIG_SEED[key] === 'number' ? parseFloat(val) || 0 : val,
    }))
  }

  // ── Services state ────────────────────────────────────────────────
  const [services, setServices] = useState<ServiceRow[]>(SERVICES_SEED)

  function updateService(id: string, patch: Partial<ServiceRow>) {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s))
  }

  // ── Tariffs state ─────────────────────────────────────────────────
  const [tariffs, setTariffs] = useState<AdminTariffRow[]>(() => seedTariffs.map(seedToAdmin))
  const [filterTipo, setFilterTipo] = useState<'all' | 'Local' | 'Foránea'>('all')
  const [filterUso,  setFilterUso]  = useState<'all' | 'Público' | 'Asesor'>('all')
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  // Versión activa del tarifario completo. En producción provendrá del Excel
  // importado o del backend. Por ahora se deriva del seed local.
  const activeTariffVersion = seedTariffs[0]?.version_tarifario ?? 'v2026'

  // Cierra el dropdown de Acciones al hacer click fuera.
  useEffect(() => {
    if (!openDropdownId) return
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target?.closest('[data-tariff-actions]')) {
        setOpenDropdownId(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openDropdownId])

  function updateTariff(oldId: string, patch: Partial<AdminTariffRow>) {
    setTariffs(prev => prev.map(t => {
      if (t.tarifa_id !== oldId) return t
      const updated = { ...t, ...patch }
      if ('tipo_tarifa' in patch || 'rango_desde' in patch || 'rango_hasta' in patch) {
        updated.tarifa_id   = buildTariffId(updated.tipo_tarifa, updated.rango_desde, updated.rango_hasta)
        updated.rango_guias = buildRangoGuias(updated.rango_desde, updated.rango_hasta)
      }
      return updated
    }))
  }

  function addTariff() {
    const tempId = `T_LOCAL_NUEVA_${Date.now()}`
    const newRow: AdminTariffRow = {
      tarifa_id: tempId, tipo_tarifa: 'Local', rango_guias: '',
      rango_desde: '', rango_hasta: '',
      tarifa_5kg: 0, tarifa_10kg: 0, tarifa_15kg: 0,
      tarifa_20kg: 0, tarifa_30kg: 0, precio_kg_adicional: 0,
      precio_base_incluye_iva: false, activo: true,
      version_tarifario: activeTariffVersion,
      vigencia_desde: new Date().toISOString().split('T')[0],
      vigencia_hasta: null, uso: 'Asesor',
      notas: 'Nueva tarifa.', moneda: 'MXN', isNew: true,
    }
    setTariffs(prev => [newRow, ...prev])
  }

  function duplicateTariff(id: string) {
    const src = tariffs.find(t => t.tarifa_id === id)
    if (!src) return
    const tempId = `${src.tipo_tarifa === 'Local' ? 'T_LOCAL' : 'T_FORANEA'}_COPIA_${Date.now()}`
    const newRow: AdminTariffRow = {
      ...src, tarifa_id: tempId,
      rango_desde: '', rango_hasta: '', rango_guias: '', isNew: true,
    }
    setTariffs(prev => {
      const idx = prev.findIndex(t => t.tarifa_id === id)
      const next = [...prev]
      next.splice(idx + 1, 0, newRow)
      return next
    })
  }

  function deleteTariff(id: string) {
    setTariffs(prev => prev.filter(t => t.tarifa_id !== id))
    setDeleteConfirmId(null)
  }

  const tariffIdCounts = tariffs.reduce<Record<string, number>>((acc, t) => {
    acc[t.tarifa_id] = (acc[t.tarifa_id] ?? 0) + 1
    return acc
  }, {})

  const filteredTariffs = tariffs.filter(t => {
    if (filterTipo !== 'all' && t.tipo_tarifa !== filterTipo) return false
    if (filterUso  !== 'all' && t.uso        !== filterUso)  return false
    return true
  })

  // ── Routes state ──────────────────────────────────────────────────
  const [routes, setRoutes] = useState<AdminRouteRow[]>(() => seedRoutes.map(seedRouteToAdmin))
  const [routeSearch,    setRouteSearch]    = useState('')
  const [filterRType,    setFilterRType]    = useState<'all' | 'Local' | 'Foránea'>('all')
  const [filterRActive,  setFilterRActive]  = useState<'all' | 'active' | 'inactive'>('all')
  const [filterRMode,    setFilterRMode]    = useState<'all' | 'Automática' | 'Asesor'>('all')
  const [filterRZone,    setFilterRZone]    = useState<'all' | AdminRouteZone>('all')
  const [openRouteDropdownId,   setOpenRouteDropdownId]   = useState<string | null>(null)
  const [deleteRouteConfirmId,  setDeleteRouteConfirmId]  = useState<string | null>(null)
  const [showImportModal,       setShowImportModal]       = useState(false)

  // Versión activa de cobertura. En producción provendrá del Excel limpio
  // importado o del backend.
  const activeCoverageVersion = seedRoutes[0]?.version_cobertura ?? 'cobertura-2025'
  const [importVersion, setImportVersion] = useState(activeCoverageVersion)

  // Cierra el dropdown de acciones de rutas al hacer click fuera.
  useEffect(() => {
    if (!openRouteDropdownId) return
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target?.closest('[data-route-actions]')) {
        setOpenRouteDropdownId(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openRouteDropdownId])

  // Todos los lookups usan _rowKey (estable) en vez de ruta_id (recalculado).
  function updateRoute(rowKey: string, patch: Partial<AdminRouteRow>) {
    setRoutes(prev => prev.map(r => {
      if (r._rowKey !== rowKey) return r
      const updated = { ...r, ...patch }
      if ('estado' in patch || 'codigo_postal' in patch) {
        updated.ruta_id = buildRouteId(updated.estado, updated.codigo_postal)
      }
      return updated
    }))
  }

  function addRoute() {
    const newRow: AdminRouteRow = {
      _rowKey: makeRowKey(),
      ruta_id: 'COV_PENDIENTE',
      estado: '', ruta: '', poblacion: '', codigo_postal: '',
      lunes: true, martes: true, miercoles: true, jueves: true, viernes: true, sabado: false,
      zona: 'Metro', tipo_tarifa: 'Local',
      activo: true, modo_cotizacion: 'Automática', isNew: true,
    }
    setRoutes(prev => [newRow, ...prev])
  }

  function duplicateRoute(rowKey: string) {
    const src = routes.find(r => r._rowKey === rowKey)
    if (!src) return
    const newRow: AdminRouteRow = {
      ...src,
      _rowKey: makeRowKey(),
      ruta_id: 'COV_PENDIENTE',
      estado: '', codigo_postal: '',
      isNew: true,
    }
    setRoutes(prev => {
      const idx = prev.findIndex(r => r._rowKey === rowKey)
      const next = [...prev]
      next.splice(idx + 1, 0, newRow)
      return next
    })
  }

  function deleteRoute(rowKey: string) {
    setRoutes(prev => prev.filter(r => r._rowKey !== rowKey))
    setDeleteRouteConfirmId(null)
  }

  const routeIdCounts = routes.reduce<Record<string, number>>((acc, r) => {
    acc[r.ruta_id] = (acc[r.ruta_id] ?? 0) + 1
    return acc
  }, {})

  const routeEstadoCpCounts = routes.reduce<Record<string, number>>((acc, r) => {
    if (!r.estado.trim() || !r.codigo_postal.trim()) return acc
    const key = `${normalizeEstado(r.estado)}|${r.codigo_postal.trim()}`
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})

  const filteredRoutes = routes.filter(r => {
    if (routeSearch) {
      const q = routeSearch.toLowerCase()
      const hit =
        r.codigo_postal.includes(routeSearch) ||
        r.poblacion.toLowerCase().includes(q) ||
        r.estado.toLowerCase().includes(q) ||
        r.ruta.toLowerCase().includes(q)
      if (!hit) return false
    }
    if (filterRType   !== 'all' && r.tipo_tarifa     !== filterRType)   return false
    if (filterRMode   !== 'all' && r.modo_cotizacion !== filterRMode)   return false
    if (filterRZone   !== 'all' && r.zona            !== filterRZone)   return false
    if (filterRActive === 'active'   && !r.activo) return false
    if (filterRActive === 'inactive' &&  r.activo) return false
    return true
  })

  // ── Messages state ────────────────────────────────────────────────
  const [messages, setMessages] = useState<MessagesState>(MESSAGES_SEED)

  function setMsg(key: keyof MessagesState, val: string) {
    setMessages(prev => ({ ...prev, [key]: val }))
  }

  // ─────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Admin top bar ───────────────────────────────────────── */}
      <header className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-7 h-7 rounded-md bg-brand-orange flex items-center justify-center flex-shrink-0">
            <span className="font-black text-white text-sm" style={{ fontFamily: 'var(--font-display)' }}>B</span>
          </div>
          <span className="font-semibold text-white text-sm">Transportes BADA</span>
          <span className="text-slate-500 text-sm hidden sm:block">/</span>
          <span className="text-slate-300 text-sm hidden sm:block">Panel Administrativo</span>
          <span className="ml-1 text-[10px] font-bold tracking-widest uppercase bg-amber-500 text-white px-2 py-0.5 rounded">
            HANDOFF
          </span>
        </div>
        <Link
          href="/admin/login"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Salir
        </Link>
      </header>

      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Administrador del cotizador</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Configura tarifas, rutas, límites, servicios y mensajes usados por el cotizador público.
            </p>
          </div>
          <Badge className="self-start sm:self-auto bg-amber-50 text-amber-700 border-amber-200 text-xs">
            Modo handoff / pendiente backend
          </Badge>
        </div>
      </div>

      {/* ── Tab navigation ──────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 flex-shrink-0 overflow-x-auto">
        <div className="flex -mb-px">
          {TABS.map(tab => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  active
                    ? 'border-brand-orange text-brand-orange'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Tab content ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto px-6 py-6">

        {/* ══ TAB: CONFIGURACIÓN ══════════════════════════════════ */}
        {activeTab === 'config' && (
          <div className="max-w-3xl space-y-6">
            <HandoffBanner />

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-700 mb-5">Parámetros generales del cotizador</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Divisor volumétrico"         value={config.divisorVolumetrico}  type="number" onChange={v => setConfigField('divisorVolumetrico', v)} />
                <InputField label="Tasa de IVA (ej. 0.16)"     value={config.iva}                 type="number" onChange={v => setConfigField('iva', v)} />
                <InputField label="Precio kg adicional (MXN)"  value={config.precioKgAdicional}   type="number" onChange={v => setConfigField('precioKgAdicional', v)} />
                <InputField label="Peso máx. mensajería (kg)"  value={config.pesoMaxMensajeriaKg} type="number" onChange={v => setConfigField('pesoMaxMensajeriaKg', v)} />
                <InputField label="Peso máx. paquetería (kg)"  value={config.pesoMaxPaqueteriaKg} type="number" onChange={v => setConfigField('pesoMaxPaqueteriaKg', v)} />
                <InputField label="Largo máximo (cm)"          value={config.largoMaximoCm}       type="number" onChange={v => setConfigField('largoMaximoCm', v)} />
                <InputField label="Ancho máximo (cm)"          value={config.anchoMaximoCm}       type="number" onChange={v => setConfigField('anchoMaximoCm', v)} />
                <InputField label="Alto máximo (cm)"           value={config.altoMaximoCm}        type="number" onChange={v => setConfigField('altoMaximoCm', v)} />
                <InputField label="Rango guías público"        value={config.rangoGuiasPublico}              onChange={v => setConfigField('rangoGuiasPublico', v)} />
                <InputField label="Versión de configuración"   value={config.versionConfig}                  onChange={v => setConfigField('versionConfig', v)} />
              </div>

              <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs text-slate-400">Fuente actual: seed/config local</p>
                <SaveBtn state={saveState.config} onClick={() => triggerSave('config')} />
              </div>
            </div>

            <TodoNote endpoint="PATCH /api/admin/calculator/settings" />
          </div>
        )}

        {/* ══ TAB: SERVICIOS ══════════════════════════════════════ */}
        {activeTab === 'servicios' && (
          <div className="max-w-5xl space-y-6">
            <HandoffBanner />

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-700">Servicios cotizables</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-green-400" />automatic = cotiza si ruta/dimensiones válidas
                  <span className="ml-3 w-2 h-2 rounded-full bg-yellow-400" />advisor = fallback asesor
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-slate-50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID técnico</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nombre</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Descripción</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Modo</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Activo</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Orden</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {services.map(svc => (
                      <tr key={svc.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{svc.id}</td>
                        <td className="px-4 py-4 font-medium text-slate-800 whitespace-nowrap">{svc.nombre}</td>
                        <td className="px-4 py-4 text-xs text-slate-400 hidden md:table-cell max-w-[200px] truncate">{svc.descripcion}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Badge className={MODE_BADGE[svc.modo]}>{MODE_LABEL[svc.modo]}</Badge>
                            <select
                              value={svc.modo}
                              onChange={e => updateService(svc.id, { modo: e.target.value as ServiceMode })}
                              className="border border-gray-200 rounded-md px-2 py-1 text-xs text-slate-600
                                         focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                            >
                              <option value="automatic">Automático</option>
                              <option value="advisor">Asesor</option>
                              <option value="pending">Pendiente</option>
                              <option value="disabled">Desactivado</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Toggle
                            checked={svc.activo}
                            onChange={() => updateService(svc.id, { activo: !svc.activo })}
                          />
                        </td>
                        <td className="px-4 py-4 text-center text-slate-500">{svc.orden}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                <SaveBtn state={saveState.servicios} onClick={() => triggerSave('servicios')} />
              </div>
            </div>

            <TodoNote endpoint="GET/PATCH /api/admin/calculator/services" />
          </div>
        )}

        {/* ══ TAB: TARIFARIO ══════════════════════════════════════ */}
        {activeTab === 'tarifario' && (
          <div className="space-y-4">
            <HandoffBanner />

            {/* Handoff note */}
            <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
              <span>
                Los cambios de esta interfaz son parte del handoff administrativo.
                La persistencia real deberá conectarse al backend/AWS de BADA.
              </span>
            </div>

            {/* Versión activa global del tarifario */}
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-500 uppercase tracking-wider">Versión activa del tarifario</span>
                <Badge className="bg-slate-100 text-slate-700 border-slate-200 font-mono text-[11px]">
                  {activeTariffVersion}
                </Badge>
              </div>
              <span className="text-slate-400">
                Fuente: <span className="text-slate-600">seed/local · pendiente Excel/backend</span>
              </span>
              <span className="text-slate-400">
                Última carga: <span className="text-slate-600">pendiente backend</span>
              </span>
            </div>

            {/* Nota: la versión se define por carga del tarifario, no por fila */}
            <div className="flex gap-2 items-start bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-500">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>
                La versión del tarifario se define por carga/importación de Excel o desde backend. No se edita por fila.
              </span>
            </div>

            {/* Toolbar + Filters */}
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm flex flex-wrap gap-3 items-center">
              <button
                type="button"
                onClick={addTariff}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-orange text-white hover:opacity-90 transition-opacity"
              >
                <Plus className="w-3.5 h-3.5" />
                Nueva tarifa
              </button>

              <div className="w-px h-5 bg-gray-200 hidden sm:block" />

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipo</label>
                <select
                  value={filterTipo}
                  onChange={e => setFilterTipo(e.target.value as typeof filterTipo)}
                  className="border border-gray-200 rounded-md px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="Local">Local</option>
                  <option value="Foránea">Foránea</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Audiencia</label>
                <select
                  value={filterUso}
                  onChange={e => setFilterUso(e.target.value as typeof filterUso)}
                  className="border border-gray-200 rounded-md px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="Público">Público</option>
                  <option value="Asesor">Asesor</option>
                </select>
              </div>
              <p className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                {filteredTariffs.length} / {tariffs.length} filas &nbsp;·&nbsp;
                El cotizador público usa rango 1–15.
              </p>
            </div>

            {/* Weight-bracket note */}
            <div className="flex gap-2 items-start bg-sky-50 border border-sky-200 rounded-lg px-4 py-3 text-xs text-sky-700">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>Estos valores son costos por escalón de peso cobrable, no kilogramos capturados.</span>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="text-sm" style={{ minWidth: '1380px', width: '100%' }}>
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200">
                      {[
                        'ID técnico', 'Tipo', 'Desde', 'Hasta', 'Audiencia',
                        'Hasta 5 kg', 'Hasta 10 kg', 'Hasta 15 kg', 'Hasta 20 kg', 'Hasta 30 kg', 'Kg adicional',
                        'Moneda', 'Inc. IVA', 'Activo', 'Acciones',
                      ].map(h => (
                        <th key={h} className="px-3 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredTariffs.map(t => {
                      const isDuplicate   = (tariffIdCounts[t.tarifa_id] ?? 0) > 1
                      const hasInvalidRange = typeof t.rango_desde === 'number' && typeof t.rango_hasta === 'number' && t.rango_desde > t.rango_hasta
                      const isDropdownOpen = openDropdownId === t.tarifa_id
                      return (
                        <tr
                          key={t.tarifa_id}
                          className={[
                            'transition-colors hover:bg-slate-50',
                            !t.activo ? 'opacity-50' : '',
                          ].filter(Boolean).join(' ')}
                        >
                          {/* ID técnico — readonly */}
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <div className="flex flex-col gap-0.5">
                              <span className={`font-mono text-[11px] ${isDuplicate ? 'text-red-600' : 'text-slate-500'}`}>
                                {t.tarifa_id}
                              </span>
                              {t.isNew && (
                                <Badge className="bg-sky-50 text-sky-700 border-sky-200 text-[10px] self-start">Nueva</Badge>
                              )}
                              {isDuplicate && (
                                <Badge className="bg-red-50 text-red-600 border-red-200 text-[10px] self-start">ID duplicado</Badge>
                              )}
                            </div>
                          </td>

                          {/* Tipo */}
                          <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                            <select
                              value={t.tipo_tarifa}
                              onChange={e => updateTariff(t.tarifa_id, { tipo_tarifa: e.target.value as TariffRow['tipo_tarifa'] })}
                              className="border border-gray-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                            >
                              <option value="Local">Local</option>
                              <option value="Foránea">Foránea</option>
                            </select>
                          </td>

                          {/* Rango desde */}
                          <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                            <input
                              type="number"
                              value={t.rango_desde}
                              min={1}
                              onChange={e => {
                                const v = parseInt(e.target.value)
                                updateTariff(t.tarifa_id, { rango_desde: isNaN(v) ? '' : v })
                              }}
                              className={`w-[58px] border rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white ${hasInvalidRange ? 'border-red-300' : 'border-gray-200'}`}
                            />
                          </td>

                          {/* Rango hasta — number or "+" for open-ended */}
                          <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                            <input
                              type="text"
                              value={t.rango_hasta === 'plus' ? '+' : t.rango_hasta}
                              placeholder="num / +"
                              onChange={e => {
                                const raw = e.target.value.trim()
                                if (raw === '+') {
                                  updateTariff(t.tarifa_id, { rango_hasta: 'plus' })
                                } else {
                                  const v = parseInt(raw)
                                  updateTariff(t.tarifa_id, { rango_hasta: isNaN(v) ? '' : v })
                                }
                              }}
                              className={`w-[58px] border rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white ${hasInvalidRange ? 'border-red-300' : 'border-gray-200'}`}
                            />
                          </td>

                          {/* Audiencia */}
                          <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                            <select
                              value={t.uso}
                              onChange={e => updateTariff(t.tarifa_id, { uso: e.target.value as TariffRow['uso'] })}
                              className="border border-gray-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                            >
                              <option value="Público">Público</option>
                              <option value="Asesor">Asesor</option>
                            </select>
                          </td>

                          {/* Cost fields */}
                          {(['tarifa_5kg', 'tarifa_10kg', 'tarifa_15kg', 'tarifa_20kg', 'tarifa_30kg', 'precio_kg_adicional'] as const).map(field => (
                            <td key={field} className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                              <input
                                type="number"
                                value={t[field]}
                                step="0.01"
                                min={0}
                                onChange={e => updateTariff(t.tarifa_id, { [field]: parseFloat(e.target.value) || 0 } as Partial<AdminTariffRow>)}
                                className="w-[70px] border border-gray-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                              />
                            </td>
                          ))}

                          {/* Moneda */}
                          <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                            <input
                              type="text"
                              value={t.moneda}
                              onChange={e => updateTariff(t.tarifa_id, { moneda: e.target.value })}
                              className="w-[50px] border border-gray-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                            />
                          </td>

                          {/* Inc. IVA */}
                          <td className="px-3 py-2.5 text-center" onClick={e => e.stopPropagation()}>
                            <Toggle
                              checked={t.precio_base_incluye_iva}
                              onChange={() => updateTariff(t.tarifa_id, { precio_base_incluye_iva: !t.precio_base_incluye_iva })}
                            />
                          </td>

                          {/* Activo */}
                          <td className="px-3 py-2.5 text-center" onClick={e => e.stopPropagation()}>
                            <div className="flex flex-col items-center gap-1">
                              <Toggle
                                checked={t.activo}
                                onChange={() => updateTariff(t.tarifa_id, { activo: !t.activo })}
                              />
                              {!t.activo && (
                                <Badge className="bg-gray-100 text-gray-500 border-gray-200 text-[10px]">Inactiva</Badge>
                              )}
                            </div>
                          </td>

                          {/* Acciones — dropdown compacto */}
                          <td className="px-3 py-2.5 whitespace-nowrap text-right">
                            <div className="relative inline-block" data-tariff-actions>
                              <button
                                type="button"
                                onClick={() => setOpenDropdownId(prev => prev === t.tarifa_id ? null : t.tarifa_id)}
                                aria-haspopup="menu"
                                aria-expanded={isDropdownOpen}
                                aria-label="Acciones de la tarifa"
                                className="inline-flex items-center justify-center w-8 h-7 rounded border border-gray-200 text-slate-500 hover:bg-gray-50 hover:text-slate-700 transition-colors"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                              {isDropdownOpen && (
                                <div
                                  role="menu"
                                  className="absolute right-0 z-20 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1"
                                >
                                  <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                      duplicateTariff(t.tarifa_id)
                                      setOpenDropdownId(null)
                                    }}
                                    className="block w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                                  >
                                    Duplicar
                                  </button>
                                  <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                      setDeleteConfirmId(t.tarifa_id)
                                      setOpenDropdownId(null)
                                    }}
                                    className="block w-full text-left px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  Fuente: seedTariffs.ts &nbsp;·&nbsp;
                  {tariffs.filter(t => t.isNew).length > 0
                    ? `${tariffs.filter(t => t.isNew).length} fila(s) nueva(s) sin persistir`
                    : 'Sin cambios pendientes'
                  }
                  &nbsp;·&nbsp; Cambios guardados en modo demo / pendiente backend.
                </p>
                <SaveBtn state={saveState.tarifario} onClick={() => triggerSave('tarifario')} />
              </div>
            </div>

            <TodoNote endpoint="GET/PATCH /api/admin/calculator/tariffs" />

            {/* Modal de confirmación estricta para eliminar tarifa */}
            {deleteConfirmId && (() => {
              const target = tariffs.find(t => t.tarifa_id === deleteConfirmId)
              return (
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="delete-tariff-title"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                  onClick={() => setDeleteConfirmId(null)}
                >
                  <div
                    className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 id="delete-tariff-title" className="text-base font-bold text-slate-900">
                          ¿Eliminar esta tarifa?
                        </h3>
                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                          Esta acción eliminará la tarifa{' '}
                          {target && (
                            <span className="font-mono text-[11px] text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                              {target.tarifa_id}
                            </span>
                          )}{' '}
                          de la tabla. Si esta tarifa se usa en producción, podría afectar la
                          configuración del cotizador cuando se conecte al backend. Esta acción
                          no se puede deshacer en esta interfaz.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-slate-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTariff(deleteConfirmId)}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        Sí, eliminar tarifa
                      </button>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* ══ TAB: RUTAS Y COBERTURA ══════════════════════════════ */}
        {activeTab === 'rutas' && (
          <div className="space-y-4">
            <HandoffBanner />

            {/* Versión activa global de cobertura */}
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-500 uppercase tracking-wider">Versión activa de cobertura</span>
                <Badge className="bg-slate-100 text-slate-700 border-slate-200 font-mono text-[11px]">
                  {activeCoverageVersion}
                </Badge>
              </div>
              <span className="text-slate-400">
                Fuente: <span className="text-slate-600">Excel limpio / seed local</span>
              </span>
              <span className="text-slate-400">
                Última carga: <span className="text-slate-600">pendiente backend</span>
              </span>
            </div>

            {/* Nota: la versión se define por carga del Excel, no por fila */}
            <div className="flex gap-2 items-start bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-500">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>
                La versión de cobertura se define por carga/importación de Excel o desde backend. No se edita por fila.
              </span>
            </div>

            {/* Toolbar: Nueva ruta + Importar Excel + Filtros */}
            <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm flex flex-wrap gap-3 items-center">
              <button
                type="button"
                onClick={addRoute}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-orange text-white hover:opacity-90 transition-opacity"
              >
                <Plus className="w-3.5 h-3.5" />
                Nueva ruta
              </button>
              <button
                type="button"
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-slate-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                Importar Excel
              </button>

              <div className="w-px h-5 bg-gray-200 hidden sm:block" />

              <div className="relative min-w-[200px] max-w-[260px] flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar CP, estado, ruta o población…"
                  value={routeSearch}
                  onChange={e => setRouteSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-700
                             focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tarifa</label>
                <select
                  value={filterRType}
                  onChange={e => setFilterRType(e.target.value as typeof filterRType)}
                  className="border border-gray-200 rounded-md px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                >
                  <option value="all">Todas</option>
                  <option value="Local">Local</option>
                  <option value="Foránea">Foránea</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Estado</label>
                <select
                  value={filterRActive}
                  onChange={e => setFilterRActive(e.target.value as typeof filterRActive)}
                  className="border border-gray-200 rounded-md px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                >
                  <option value="all">Todas</option>
                  <option value="active">Activas</option>
                  <option value="inactive">Inactivas</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Modo</label>
                <select
                  value={filterRMode}
                  onChange={e => setFilterRMode(e.target.value as typeof filterRMode)}
                  className="border border-gray-200 rounded-md px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="Automática">Automática</option>
                  <option value="Asesor">Asesor</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Zona</label>
                <select
                  value={filterRZone}
                  onChange={e => setFilterRZone(e.target.value as typeof filterRZone)}
                  className="border border-gray-200 rounded-md px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                >
                  <option value="all">Todas</option>
                  <option value="Metro">Metro</option>
                  <option value="Foráneo">Foráneo</option>
                  <option value="Especial">Especial</option>
                </select>
              </div>

              <p className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                {filteredRoutes.length} / {routes.length} rutas
              </p>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="text-sm" style={{ minWidth: '1500px', width: '100%' }}>
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200">
                      {[
                        'ID cobertura', 'Estado', 'Ruta', 'Población', 'C.P.',
                        'L', 'M', 'X', 'J', 'V', 'S',
                        'Zona', 'Tarifa', 'Activa', 'Modo cotización', 'Acciones',
                      ].map(h => (
                        <th key={h} className="px-3 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredRoutes.map(r => {
                      const isRouteDuplicate = (routeIdCounts[r.ruta_id] ?? 0) > 1
                      const cpKey = r.estado.trim() && r.codigo_postal.trim()
                        ? `${normalizeEstado(r.estado)}|${r.codigo_postal.trim()}`
                        : ''
                      const isEstadoCpDuplicate = cpKey ? (routeEstadoCpCounts[cpKey] ?? 0) > 1 : false
                      const cpInvalid = r.codigo_postal !== '' && !/^\d{5}$/.test(r.codigo_postal)
                      const isDropdownOpen = openRouteDropdownId === r._rowKey
                      const incomplete = !isRouteRowComplete(r)
                      const dayKeys = [
                        ['lunes',     'lunes'],
                        ['martes',    'martes'],
                        ['miercoles', 'miércoles'],
                        ['jueves',    'jueves'],
                        ['viernes',   'viernes'],
                        ['sabado',    'sábado'],
                      ] as const
                      return (
                        <tr
                          key={r._rowKey}
                          className={[
                            'transition-colors hover:bg-slate-50',
                            !r.activo ? 'opacity-50' : '',
                          ].filter(Boolean).join(' ')}
                        >
                          {/* ID cobertura — readonly */}
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <div className="flex flex-col gap-0.5">
                              <span className={`font-mono text-[11px] ${isRouteDuplicate || r.ruta_id === 'COV_PENDIENTE' ? 'text-red-600' : 'text-slate-500'}`}>
                                {r.ruta_id}
                              </span>
                              {r.isNew && (
                                <Badge className="bg-sky-50 text-sky-700 border-sky-200 text-[10px] self-start">Nueva</Badge>
                              )}
                              {isRouteDuplicate && (
                                <Badge className="bg-red-50 text-red-600 border-red-200 text-[10px] self-start">ID duplicado</Badge>
                              )}
                              {isEstadoCpDuplicate && !isRouteDuplicate && (
                                <Badge className="bg-red-50 text-red-600 border-red-200 text-[10px] self-start">Estado+CP duplicado</Badge>
                              )}
                              {incomplete && r.isNew && (
                                <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] self-start">Incompleta</Badge>
                              )}
                            </div>
                          </td>

                          {/* Estado */}
                          <td className="px-3 py-2.5">
                            <input
                              type="text"
                              value={r.estado}
                              onChange={e => updateRoute(r._rowKey, { estado: e.target.value })}
                              className={`w-[110px] border rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white ${!r.estado.trim() ? 'border-red-300' : 'border-gray-200'}`}
                            />
                          </td>

                          {/* Ruta */}
                          <td className="px-3 py-2.5">
                            <input
                              type="text"
                              value={r.ruta}
                              onChange={e => updateRoute(r._rowKey, { ruta: e.target.value })}
                              className={`w-[140px] border rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white ${!r.ruta.trim() ? 'border-red-300' : 'border-gray-200'}`}
                            />
                          </td>

                          {/* Población */}
                          <td className="px-3 py-2.5">
                            <input
                              type="text"
                              value={r.poblacion}
                              onChange={e => updateRoute(r._rowKey, { poblacion: e.target.value })}
                              className={`w-[120px] border rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white ${!r.poblacion.trim() ? 'border-red-300' : 'border-gray-200'}`}
                            />
                          </td>

                          {/* C.P. */}
                          <td className="px-3 py-2.5">
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={5}
                              value={r.codigo_postal}
                              onChange={e => updateRoute(r._rowKey, { codigo_postal: e.target.value.replace(/\D/g, '').slice(0, 5) })}
                              className={`w-[68px] font-mono border rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white ${cpInvalid || !r.codigo_postal ? 'border-red-300' : 'border-gray-200'}`}
                            />
                          </td>

                          {/* Días — 6 checkboxes */}
                          {dayKeys.map(([key, label]) => (
                            <td key={key} className="px-2 py-2.5 text-center">
                              <input
                                type="checkbox"
                                aria-label={label}
                                checked={r[key]}
                                onChange={() => updateRoute(r._rowKey, { [key]: !r[key] } as Partial<AdminRouteRow>)}
                                className="w-4 h-4 accent-brand-orange cursor-pointer"
                              />
                            </td>
                          ))}

                          {/* Zona */}
                          <td className="px-3 py-2.5">
                            <select
                              value={r.zona}
                              onChange={e => updateRoute(r._rowKey, { zona: e.target.value as AdminRouteZone })}
                              className="border border-gray-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                            >
                              <option value="Metro">Metro</option>
                              <option value="Foráneo">Foráneo</option>
                              <option value="Especial">Especial</option>
                            </select>
                          </td>

                          {/* Tarifa */}
                          <td className="px-3 py-2.5">
                            <select
                              value={r.tipo_tarifa}
                              onChange={e => updateRoute(r._rowKey, { tipo_tarifa: e.target.value as AdminRouteTarifa })}
                              className="border border-gray-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white"
                            >
                              <option value="Local">Local</option>
                              <option value="Foránea">Foránea</option>
                            </select>
                          </td>

                          {/* Activa */}
                          <td className="px-3 py-2.5 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <Toggle
                                checked={r.activo}
                                onChange={() => updateRoute(r._rowKey, { activo: !r.activo })}
                              />
                              {!r.activo && (
                                <Badge className="bg-gray-100 text-gray-500 border-gray-200 text-[10px]">Inactiva</Badge>
                              )}
                            </div>
                          </td>

                          {/* Modo cotización */}
                          <td className="px-3 py-2.5">
                            <select
                              value={r.modo_cotizacion}
                              onChange={e => updateRoute(r._rowKey, { modo_cotizacion: e.target.value as AdminRouteMode })}
                              className={`border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand-orange/40 bg-white ${
                                r.modo_cotizacion === 'Automática'
                                  ? 'border-green-200 text-green-700'
                                  : 'border-yellow-200 text-yellow-700'
                              }`}
                            >
                              <option value="Automática">Automática</option>
                              <option value="Asesor">Asesor</option>
                            </select>
                          </td>

                          {/* Acciones — dropdown compacto */}
                          <td className="px-3 py-2.5 whitespace-nowrap text-right">
                            <div className="relative inline-block" data-route-actions>
                              <button
                                type="button"
                                onClick={() => setOpenRouteDropdownId(prev => prev === r._rowKey ? null : r._rowKey)}
                                aria-haspopup="menu"
                                aria-expanded={isDropdownOpen}
                                aria-label="Acciones de la ruta"
                                className="inline-flex items-center justify-center w-8 h-7 rounded border border-gray-200 text-slate-500 hover:bg-gray-50 hover:text-slate-700 transition-colors"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                              {isDropdownOpen && (
                                <div
                                  role="menu"
                                  className="absolute right-0 z-20 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1"
                                >
                                  <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                      duplicateRoute(r._rowKey)
                                      setOpenRouteDropdownId(null)
                                    }}
                                    className="block w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                                  >
                                    Duplicar
                                  </button>
                                  <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                      setDeleteRouteConfirmId(r._rowKey)
                                      setOpenRouteDropdownId(null)
                                    }}
                                    className="block w-full text-left px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  Fuente: seedRoutes.ts &nbsp;·&nbsp;
                  {routes.filter(r => r.isNew).length > 0
                    ? `${routes.filter(r => r.isNew).length} fila(s) nueva(s) sin persistir`
                    : 'Sin cambios pendientes'
                  }
                  &nbsp;·&nbsp; Cambios guardados en modo demo / pendiente backend.
                </p>
                <SaveBtn state={saveState.rutas} onClick={() => triggerSave('rutas')} />
              </div>
            </div>

            <TodoNote endpoint="GET/PATCH /api/admin/calculator/routes — POST /api/admin/calculator/routes/import" />

            {/* Modal: Importar cobertura desde Excel (visual / handoff) */}
            {showImportModal && (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="import-routes-title"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={() => setShowImportModal(false)}
              >
                <div
                  className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <Upload className="w-5 h-5 text-sky-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 id="import-routes-title" className="text-base font-bold text-slate-900">
                        Importar cobertura desde Excel
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        El archivo debe ser un Excel limpio, sin logos ni títulos, con pestañas por
                        estado/zona y la misma estructura en todas las hojas. La importación final
                        deberá conectarse al backend/AWS de BADA.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Columnas esperadas en cada hoja
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'ESTADO', 'RUTA', 'POBLACIÓN', 'C.P.',
                        'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO',
                        'ZONA', 'TARIFA', 'ACTIVA', 'MODO_COTIZACIÓN',
                      ].map(col => (
                        <Badge key={col} className="bg-slate-100 text-slate-700 border-slate-200 font-mono text-[10px]">
                          {col}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Versión de cobertura
                      </label>
                      <input
                        type="text"
                        value={importVersion}
                        onChange={e => setImportVersion(e.target.value)}
                        placeholder="cobertura-2025"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-mono
                                   focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-brand-orange
                                   transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Estado
                      </label>
                      <div className="border border-gray-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-500">
                        Pendiente backend
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 mt-4">
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>
                      Flujo visual / handoff. La lectura real del Excel y la persistencia se conectarán
                      con el backend/AWS de BADA en una fase posterior.
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowImportModal(false)}
                      className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-slate-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowImportModal(false)}
                      className="px-4 py-2 text-sm font-semibold rounded-lg bg-brand-orange text-white hover:opacity-90 transition-opacity"
                    >
                      Validar archivo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal: confirmación estricta para eliminar cobertura */}
            {deleteRouteConfirmId && (() => {
              const target = routes.find(r => r._rowKey === deleteRouteConfirmId)
              return (
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="delete-route-title"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                  onClick={() => setDeleteRouteConfirmId(null)}
                >
                  <div
                    className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 id="delete-route-title" className="text-base font-bold text-slate-900">
                          ¿Eliminar esta cobertura?
                        </h3>
                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                          Esta acción eliminará la cobertura{' '}
                          {target && (
                            <span className="font-mono text-[11px] text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                              {target.ruta_id}
                            </span>
                          )}{' '}
                          de la tabla del admin/demo. Si esta cobertura se usa en producción, podría
                          afectar la configuración del cotizador cuando se conecte al backend. Esta
                          acción no se puede deshacer en esta interfaz.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        type="button"
                        onClick={() => setDeleteRouteConfirmId(null)}
                        className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-slate-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteRoute(deleteRouteConfirmId)}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        Sí, eliminar cobertura
                      </button>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* ══ TAB: MENSAJES Y WHATSAPP ════════════════════════════ */}
        {activeTab === 'mensajes' && (
          <div className="max-w-3xl space-y-6">
            <HandoffBanner />

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-700">Mensajes del cotizador</h2>

              {([
                { key: 'fallbackAsesor',         label: 'Mensaje fallback — asesor general' },
                { key: 'rutaNoEncontrada',        label: 'Ruta no encontrada' },
                { key: 'rutaInactiva',            label: 'Ruta inactiva' },
                { key: 'rutaRequiereAsesor',      label: 'Ruta requiere asesor' },
                { key: 'limiteExcedido',          label: 'Límite de peso/dimensiones excedido' },
                { key: 'servicioRequiereAsesor',  label: 'Servicio requiere asesor' },
                { key: 'notaValidacion',          label: 'Nota de validación del precio estimado' },
              ] as { key: keyof MessagesState; label: string }[]).map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    {label}
                  </label>
                  <textarea
                    value={messages[key]}
                    rows={3}
                    onChange={e => setMsg(key, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-slate-900
                               resize-none
                               focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-brand-orange
                               transition-colors bg-white"
                  />
                </div>
              ))}

              <div className="pt-3 border-t border-gray-100">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">WhatsApp asesor</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Número WhatsApp asesor
                    </label>
                    <input
                      type="text"
                      value={messages.whatsappAsesor}
                      onChange={e => setMsg('whatsappAsesor', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-mono
                                 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-brand-orange
                                 transition-colors bg-white"
                      placeholder="5255XXXXXXXX"
                    />
                    {messages.whatsappAsesor.includes('PENDIENTE') && (
                      <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Número pendiente — el programador BADA debe reemplazar este valor.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Mensaje prellenado de WhatsApp
                    </label>
                    <textarea
                      value={messages.mensajePrellenado}
                      rows={2}
                      onChange={e => setMsg('mensajePrellenado', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-slate-900
                                 resize-none
                                 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-brand-orange
                                 transition-colors bg-white"
                    />
                  </div>
                </div>

                <div className="flex gap-2 items-start bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-sky-700 mt-4">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>
                    Regla: &ldquo;Hablar con un asesor&rdquo; siempre abre WhatsApp.
                    &ldquo;Cotizar servicio&rdquo; siempre va a /cotizar.
                    No usar &ldquo;Cotizar por WhatsApp&rdquo;.
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <SaveBtn state={saveState.mensajes} onClick={() => triggerSave('mensajes')} />
              </div>
            </div>

            <TodoNote endpoint="GET/PATCH /api/admin/calculator/messages" />
          </div>
        )}

      </div>
    </div>
  )
}
