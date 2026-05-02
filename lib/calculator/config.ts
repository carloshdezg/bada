import type { CalculatorConfig } from "./types";

export const calculatorConfig: CalculatorConfig = {
  "divisorVolumetrico": 5000,
  "iva": 0.16,
  "precioKgAdicional": 8.5,
  "pesoMaxMensajeriaKg": 30,
  "pesoMaxPaqueteriaKg": 1500,
  "largoMaximoCm": 300,
  "anchoMaximoCm": 140,
  "altoMaximoCm": 180,
  "rangosPesoKg": [
    5,
    10,
    15,
    20,
    30
  ],
  "rangoGuiasPublico": "1-15",
  "serviciosAutomaticos": [
    "mensajeria",
    "paqueteria"
  ],
  "serviciosAsesor": [
    "rutas_dedicadas",
    "logistica"
  ],
  "localAreaMetropolitana": [
    "CDMX",
    "EDO MEX",
    "TOLUCA"
  ],
  "fuenteRutasCobertura": "Rutas_Cobertura",
  "fuenteTarifario": "Tarifario_Precios",
  "prioridadBusquedaRuta": "codigo_postal,poblacion,ruta,estado",
  "mensajeRequiereAsesor": "Tu envío requiere validación con un asesor. Podemos ayudarte a revisar cobertura, condiciones y la mejor opción disponible.",
  "whatsappAsesor": "PENDIENTE_WHATSAPP_ASESOR",
  "versionConfig": "seed-v1.3",
  "serviciosPendientesValidacion": [
    "ecommerce"
  ],
  "routesSource": "seedRoutes",
  "tariffsSource": "seedTariffs",
  "noHardcodedZones": true
};

export const ADVISOR_WHATSAPP_TODO = "PENDIENTE_WHATSAPP_ASESOR";

// Important implementation note:
// Do not hardcode states, zones, or special routes in the calculator UI.
// Route behavior must come from seedRoutes/admin data:
// active + automatic quote => calculate quote.
// inactive / requires advisor / not found => advisor fallback.
