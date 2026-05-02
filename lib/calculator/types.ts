export type ServiceId =
  | "mensajeria"
  | "paqueteria"
  | "rutas_dedicadas"
  | "logistica"
  | "ecommerce";

export type TariffType = "Local" | "Foránea";
export type ZoneType = "Área Metropolitana" | "Foráneo";

export interface CalculatorConfig {
  divisorVolumetrico: number;
  iva: number;
  precioKgAdicional: number;
  pesoMaxMensajeriaKg: number;
  pesoMaxPaqueteriaKg: number;
  largoMaximoCm: number;
  anchoMaximoCm: number;
  altoMaximoCm: number;
  rangosPesoKg: number[];
  rangoGuiasPublico: string;
  serviciosAutomaticos: ServiceId[];
  serviciosAsesor: ServiceId[];
  serviciosPendientesValidacion: ServiceId[];
  localAreaMetropolitana: string[];
  fuenteRutasCobertura: string;
  fuenteTarifario: string;
  prioridadBusquedaRuta: string;
  mensajeRequiereAsesor: string;
  whatsappAsesor: string;
  versionConfig: string;
  routesSource: "seedRoutes";
  tariffsSource: "seedTariffs";
  noHardcodedZones: true;
}

export interface TariffRow {
  tarifa_id: string;
  tipo_tarifa: TariffType;
  rango_guias: string;
  tarifa_5kg: number;
  tarifa_10kg: number;
  tarifa_15kg: number;
  tarifa_20kg: number;
  tarifa_30kg: number;
  precio_kg_adicional: number;
  precio_base_incluye_iva: boolean;
  activo: boolean;
  version_tarifario: string;
  vigencia_desde: string;
  vigencia_hasta: string | null;
  uso: "Público" | "Asesor";
  notas: string;
}

export interface RouteCoverageRow {
  ruta_id: string;
  fuente_hoja: string;
  estado: string;
  ruta: string;
  poblacion: string;
  codigo_postal: string;
  zona_operativa: ZoneType;
  tipo_tarifa: TariffType;
  activo: boolean;
  cotizacion_automatica: boolean;
  requiere_asesor: boolean;
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;
  mensaje_opcional: string | null;
  version_cobertura: string;
  fecha_actualizacion: string;
}
