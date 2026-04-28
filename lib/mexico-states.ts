export interface MexicoState {
  value:  string
  label:  string
  cities: string[]
}

export const MEXICO_STATES: MexicoState[] = [
  { value: 'AGS', label: 'Aguascalientes',    cities: ['Aguascalientes', 'Calvillo', 'Jesús María', 'Pabellón de Arteaga'] },
  { value: 'BCN', label: 'Baja California',   cities: ['Tijuana', 'Mexicali', 'Ensenada', 'Tecate', 'Playas de Rosarito'] },
  { value: 'BCS', label: 'Baja California Sur', cities: ['La Paz', 'Los Cabos', 'Loreto', 'Mulegé', 'Comondú'] },
  { value: 'CAM', label: 'Campeche',          cities: ['Campeche', 'Ciudad del Carmen', 'Escárcega', 'Calkiní'] },
  { value: 'CDMX', label: 'Ciudad de México', cities: ['Álvaro Obregón', 'Azcapotzalco', 'Benito Juárez', 'Coyoacán', 'Cuauhtémoc', 'Gustavo A. Madero', 'Iztacalco', 'Iztapalapa', 'Miguel Hidalgo', 'Tlalpan', 'Venustiano Carranza', 'Xochimilco'] },
  { value: 'CHP', label: 'Chiapas',           cities: ['Tuxtla Gutiérrez', 'San Cristóbal de las Casas', 'Tapachula', 'Comitán', 'Palenque', 'Ocosingo'] },
  { value: 'CHH', label: 'Chihuahua',         cities: ['Chihuahua', 'Ciudad Juárez', 'Delicias', 'Cuauhtémoc', 'Hidalgo del Parral', 'Nuevo Casas Grandes'] },
  { value: 'COA', label: 'Coahuila',          cities: ['Saltillo', 'Torreón', 'Monclova', 'Piedras Negras', 'Ciudad Acuña', 'Ramos Arizpe'] },
  { value: 'COL', label: 'Colima',            cities: ['Colima', 'Manzanillo', 'Tecomán', 'Villa de Álvarez'] },
  { value: 'DGO', label: 'Durango',           cities: ['Durango', 'Gómez Palacio', 'Lerdo', 'Santiago Papasquiaro', 'Guadalupe Victoria'] },
  { value: 'GTO', label: 'Guanajuato',        cities: ['León', 'Irapuato', 'Celaya', 'Salamanca', 'Guanajuato', 'San Luis de la Paz', 'Silao', 'Pénjamo'] },
  { value: 'GRO', label: 'Guerrero',          cities: ['Acapulco', 'Chilpancingo', 'Iguala', 'Zihuatanejo', 'Taxco', 'Chilapa'] },
  { value: 'HGO', label: 'Hidalgo',           cities: ['Pachuca', 'Tulancingo', 'Tizayuca', 'Tula de Allende', 'Ixmiquilpan', 'Huejutla'] },
  { value: 'JAL', label: 'Jalisco',           cities: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Puerto Vallarta', 'Lagos de Moreno', 'Tepatitlán', 'Ocotlán'] },
  { value: 'MEX', label: 'Estado de México',  cities: ['Toluca', 'Ecatepec', 'Naucalpan', 'Nezahualcóyotl', 'Tlalnepantla', 'Chimalhuacán', 'Texcoco', 'Cuautitlán Izcalli'] },
  { value: 'MIC', label: 'Michoacán',         cities: ['Morelia', 'Uruapan', 'Zamora', 'Apatzingán', 'Lázaro Cárdenas', 'Sahuayo', 'Zitácuaro'] },
  { value: 'MOR', label: 'Morelos',           cities: ['Cuernavaca', 'Jiutepec', 'Cuautla', 'Temixco', 'Yautepec'] },
  { value: 'NAY', label: 'Nayarit',           cities: ['Tepic', 'Bahía de Banderas', 'Compostela', 'Santiago Ixcuintla', 'Xalisco'] },
  { value: 'NLE', label: 'Nuevo León',        cities: ['Monterrey', 'San Nicolás de los Garza', 'Guadalupe', 'San Pedro Garza García', 'Apodaca', 'General Escobedo', 'Linares', 'Montemorelos'] },
  { value: 'OAX', label: 'Oaxaca',            cities: ['Oaxaca de Juárez', 'Salina Cruz', 'San Juan Bautista Tuxtepec', 'Juchitán', 'Puerto Escondido', 'Tehuantepec'] },
  { value: 'PUE', label: 'Puebla',            cities: ['Puebla', 'Tehuacán', 'San Martín Texmelucan', 'Atlixco', 'Izúcar de Matamoros', 'Cholula', 'Amozoc'] },
  { value: 'QRO', label: 'Querétaro',         cities: ['Querétaro', 'San Juan del Río', 'El Marqués', 'Corregidora', 'Cadereyta de Montes'] },
  { value: 'ROO', label: 'Quintana Roo',      cities: ['Cancún', 'Playa del Carmen', 'Chetumal', 'Cozumel', 'Tulum', 'Felipe Carrillo Puerto'] },
  { value: 'SLP', label: 'San Luis Potosí',   cities: ['San Luis Potosí', 'Soledad de Graciano Sánchez', 'Ciudad Valles', 'Matehuala', 'Rioverde'] },
  { value: 'SIN', label: 'Sinaloa',           cities: ['Culiacán', 'Mazatlán', 'Los Mochis', 'Guasave', 'Navolato', 'Guamúchil'] },
  { value: 'SON', label: 'Sonora',            cities: ['Hermosillo', 'Ciudad Obregón', 'Nogales', 'San Luis Río Colorado', 'Navojoa', 'Guaymas'] },
  { value: 'TAB', label: 'Tabasco',           cities: ['Villahermosa', 'Cárdenas', 'Comalcalco', 'Macuspana', 'Paraíso', 'Tenosique'] },
  { value: 'TAM', label: 'Tamaulipas',        cities: ['Tampico', 'Reynosa', 'Matamoros', 'Nuevo Laredo', 'Victoria', 'Altamira', 'Madero'] },
  { value: 'TLX', label: 'Tlaxcala',          cities: ['Tlaxcala', 'Apizaco', 'San Pablo del Monte', 'Huamantla', 'Chiautempan'] },
  { value: 'VER', label: 'Veracruz',          cities: ['Veracruz', 'Xalapa', 'Coatzacoalcos', 'Boca del Río', 'Orizaba', 'Poza Rica', 'Minatitlán', 'Córdoba'] },
  { value: 'YUC', label: 'Yucatán',           cities: ['Mérida', 'Valladolid', 'Kanasín', 'Progreso', 'Umán', 'Motul'] },
  { value: 'ZAC', label: 'Zacatecas',         cities: ['Zacatecas', 'Guadalupe', 'Fresnillo', 'Jerez', 'Río Grande', 'Loreto'] },
]

export function getCities(stateValue: string): string[] {
  return MEXICO_STATES.find(s => s.value === stateValue)?.cities ?? []
}
