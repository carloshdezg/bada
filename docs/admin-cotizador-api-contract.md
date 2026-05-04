# API Contract — Admin Cotizador BADA

> **Estado:** Frontend scaffold listo para handoff.  
> El programador de BADA deberá implementar estos endpoints en su infraestructura AWS y conectarlos a la interfaz administrativa en `app/admin/cotizador/page.tsx`.

---

## Contexto

La interfaz administrativa en `/admin/cotizador` actualmente usa datos locales (seed files):

| Dato | Fuente actual (seed) | Debe reemplazarse por |
|---|---|---|
| Configuración general | `lib/calculator/config.ts` → `calculatorConfig` | `GET /api/admin/calculator/settings` |
| Servicios cotizables | definición local en `page.tsx` | `GET /api/admin/calculator/services` |
| Tarifario de precios | `lib/calculator/seedTariffs.ts` → `seedTariffs` | `GET /api/admin/calculator/tariffs` |
| Rutas y cobertura | `lib/calculator/seedRoutes.ts` → `seedRoutes` | `GET /api/admin/calculator/routes` |
| Mensajes del cotizador | `lib/calculator/config.ts` + defaults locales | `GET /api/admin/calculator/messages` |

---

## Autenticación

Todos los endpoints `/api/admin/*` deben requerir autenticación real.  
El login visual está en `/admin/login` — actualmente redirige directo como demo.

**TODO:** Implementar autenticación real (JWT / sesión / Cognito / etc.) en backend AWS y proteger estas rutas.

---

## Endpoints

### 1. Configuración general

#### `GET /api/admin/calculator/settings`

Retorna la configuración actual del cotizador.

**Response 200:**
```json
{
  "divisorVolumetrico": 5000,
  "iva": 0.16,
  "precioKgAdicional": 8.50,
  "pesoMaxMensajeriaKg": 30,
  "pesoMaxPaqueteriaKg": 1500,
  "largoMaximoCm": 300,
  "anchoMaximoCm": 140,
  "altoMaximoCm": 180,
  "rangoGuiasPublico": "1-15",
  "versionConfig": "v2026"
}
```

#### `PATCH /api/admin/calculator/settings`

Actualiza uno o más campos de configuración.

**Body (campos a actualizar):**
```json
{
  "precioKgAdicional": 9.00,
  "rangoGuiasPublico": "1-15"
}
```

**Response 200:** objeto con la configuración actualizada.

**Reglas de negocio:**
- `divisorVolumetrico` debe ser > 0
- `iva` debe estar entre 0 y 1 (ej. 0.16 = 16%)
- `rangoGuiasPublico` determina qué rango de tarifas ve el cotizador público
- Cambios en configuración afectan el cotizador público inmediatamente

---

### 2. Servicios cotizables

#### `GET /api/admin/calculator/services`

Retorna todos los servicios configurados.

**Response 200:**
```json
[
  {
    "id": "mensajeria",
    "nombre": "Mensajería",
    "descripcion": "Documentos y paquetes pequeños.",
    "modo": "automatic",
    "activo": true,
    "orden": 1
  },
  {
    "id": "paqueteria",
    "nombre": "Paquetería",
    "descripcion": "Cajas y bultos con cálculo por peso cobrable.",
    "modo": "automatic",
    "activo": true,
    "orden": 2
  },
  {
    "id": "rutas_dedicadas",
    "nombre": "Rutas Dedicadas",
    "descripcion": "Unidades o rutas exclusivas.",
    "modo": "advisor",
    "activo": true,
    "orden": 3
  },
  {
    "id": "logistica",
    "nombre": "Logística",
    "descripcion": "Soluciones operativas a la medida.",
    "modo": "advisor",
    "activo": true,
    "orden": 4
  },
  {
    "id": "ecommerce",
    "nombre": "Envíos para e-commerce",
    "descripcion": "Revisión de envíos recurrentes para tiendas online.",
    "modo": "pending",
    "activo": true,
    "orden": 5
  }
]
```

#### `PATCH /api/admin/calculator/services`

Actualiza uno o más servicios.

**Body:**
```json
[
  { "id": "ecommerce", "modo": "advisor", "activo": true }
]
```

**Response 200:** lista actualizada.

**Valores para `modo`:**
| Valor | Comportamiento |
|---|---|
| `automatic` | Cotiza automáticamente si ruta y dimensiones son válidas |
| `advisor` | Siempre manda al flujo de asesor |
| `pending` | Pendiente de validación — fallback asesor |
| `disabled` | No aparece en el cotizador público |

---

### 3. Tarifario

#### `GET /api/admin/calculator/tariffs`

Retorna todas las filas del tarifario.

**Response 200:**
```json
[
  {
    "tarifa_id": "T_LOCAL_1_15",
    "tipo_tarifa": "Local",
    "rango_guias": "1-15",
    "tarifa_5kg": 213.00,
    "tarifa_10kg": 287.55,
    "tarifa_15kg": 313.64,
    "tarifa_20kg": 322.77,
    "tarifa_30kg": 325.97,
    "precio_kg_adicional": 8.50,
    "precio_base_incluye_iva": false,
    "activo": true,
    "version_tarifario": "v2026",
    "vigencia_desde": "2026-01-01",
    "vigencia_hasta": null,
    "uso": "Público",
    "notas": "Tarifa visible en cotizador público."
  }
]
```

#### `PATCH /api/admin/calculator/tariffs`

Actualiza una o más filas del tarifario.

**Body:**
```json
[
  {
    "tarifa_id": "T_LOCAL_1_15",
    "tarifa_5kg": 220.00,
    "activo": true
  }
]
```

**Response 200:** filas actualizadas.

**Reglas de negocio:**
- El cotizador público solo usa filas donde `rango_guias === rangoGuiasPublico` (valor en settings) y `uso === "Público"` y `activo === true`
- Las filas de asesor (`uso === "Asesor"`) no se exponen al cotizador público
- `precio_base_incluye_iva: false` significa que el precio mostrado tiene IVA sumado por el cotizador usando el `iva` de settings
- Se recomienda soporte de versiones/vigencia en el backend real para auditoría

**TODO:** Implementar soporte de versiones y vigencia (`vigencia_desde`/`vigencia_hasta`) en backend para historial de precios.

---

### 4. Rutas y cobertura

#### `GET /api/admin/calculator/routes`

Retorna todas las rutas de cobertura.

**Query params opcionales:**
- `cp` — filtrar por código postal
- `estado` — filtrar por estado
- `activo` — `true` / `false`
- `cotizacion_automatica` — `true` / `false`
- `tipo_tarifa` — `Local` / `Foránea`

**Response 200:**
```json
[
  {
    "ruta_id": "S0001",
    "fuente_hoja": "SEED",
    "estado": "CDMX",
    "ruta": "BENITO JUÁREZ",
    "poblacion": "DEL VALLE CENTRO",
    "codigo_postal": "03100",
    "zona_operativa": "Área Metropolitana",
    "tipo_tarifa": "Local",
    "activo": true,
    "cotizacion_automatica": true,
    "requiere_asesor": false,
    "lunes": true,
    "martes": true,
    "miercoles": true,
    "jueves": true,
    "viernes": true,
    "sabado": false,
    "mensaje_opcional": null,
    "version_cobertura": "v2026",
    "fecha_actualizacion": "2026-05-01"
  }
]
```

#### `PATCH /api/admin/calculator/routes`

Actualiza una o más rutas.

**Body:**
```json
[
  {
    "ruta_id": "S0015",
    "activo": true,
    "cotizacion_automatica": true,
    "requiere_asesor": false
  }
]
```

**Response 200:** rutas actualizadas.

#### `POST /api/admin/calculator/routes/import`

Importa rutas desde un archivo Excel (fase 2).

**Body:** `multipart/form-data` con campo `file` (xlsx).

**Response 200:**
```json
{
  "imported": 150,
  "updated": 12,
  "skipped": 3,
  "errors": []
}
```

**Reglas de negocio:**
- `activo: false` → el cotizador no encontrará esta ruta, fallback asesor
- `cotizacion_automatica: false` → ruta activa pero no cotizable; manda a asesor
- `requiere_asesor: true` → aunque sea cotizable, siempre manda a asesor
- Lógica del cotizador: `activo && cotizacion_automatica && !requiere_asesor` → cotizar; de lo contrario → asesor
- No hardcodear estados, zonas ni CPs en el frontend — todo debe venir de esta fuente
- Importación Excel debe validar: columnas requeridas, CPs válidos (5 dígitos), duplicados por `codigo_postal`, conflictos de zona/tarifa

**TODO:** Implementar importación real con validación de columnas, CPs, duplicados y conflictos.

---

### 5. Mensajes del cotizador

#### `GET /api/admin/calculator/messages`

Retorna todos los mensajes configurables del cotizador.

**Response 200:**
```json
{
  "fallbackAsesor": "Tu envío requiere validación con un asesor...",
  "rutaNoEncontrada": "La ruta ingresada no se encuentra en la cobertura disponible...",
  "rutaInactiva": "La ruta seleccionada está temporalmente inactiva...",
  "rutaRequiereAsesor": "Esta ruta requiere validación con un asesor...",
  "limiteExcedido": "El peso o dimensiones del envío exceden los límites...",
  "servicioRequiereAsesor": "Este servicio no puede cotizarse automáticamente...",
  "notaValidacion": "El precio mostrado es un estimado sujeto a cobertura...",
  "whatsappAsesor": "5255XXXXXXXX",
  "mensajePrellenado": "Hola, quiero información sobre los servicios de Transportes BADA."
}
```

#### `PATCH /api/admin/calculator/messages`

Actualiza uno o más mensajes.

**Body:**
```json
{
  "whatsappAsesor": "5215500000000",
  "fallbackAsesor": "Texto actualizado..."
}
```

**Response 200:** objeto con mensajes actualizados.

**Reglas de negocio:**
- `whatsappAsesor` debe ser un número válido para `wa.me` (sin `+`, sin espacios, ej. `5215500000000`)
- El CTA "Hablar con un asesor" siempre abre WhatsApp — nunca debe ir a `/cotizar`
- El CTA "Cotizar servicio" siempre va a `/cotizar` — nunca a WhatsApp
- No usar el texto "Cotizar por WhatsApp" en ningún mensaje

---

## Archivos seed a reemplazar

Una vez que el backend esté listo, el programador de BADA deberá:

1. **Reemplazar `lib/calculator/config.ts`** — leer desde `GET /api/admin/calculator/settings`
2. **Reemplazar `lib/calculator/seedTariffs.ts`** — leer desde `GET /api/admin/calculator/tariffs`
3. **Reemplazar `lib/calculator/seedRoutes.ts`** — leer desde `GET /api/admin/calculator/routes`
4. **Conectar admin page** — reemplazar `useState(seedData)` por fetch real en `app/admin/cotizador/page.tsx`

El cotizador público (`app/cotizar/page.tsx` y `components/calculator/`) **no debe modificarse** hasta que los endpoints estén disponibles y validados. Solo entonces se migra de seed a API.

---

## Notas de infraestructura

- El backend real vivirá en **AWS** (infraestructura de BADA)
- Este documento es la fuente única de verdad para el contrato de API
- El frontend está en Next.js 16 (App Router) — los fetches deben respetar el modelo de server/client components
- Autenticación sugerida: JWT Bearer token o cookie de sesión segura
- Todos los endpoints `/api/admin/*` deben rechazar requests sin autenticación válida (401)
- Considerar rate limiting y logging de auditoría para cambios en tarifas y rutas
