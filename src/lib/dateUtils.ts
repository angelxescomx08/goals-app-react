import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

// Configurar dayjs con plugins UTC, timezone y relativeTime
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

/**
 * Utilidades para manejo correcto de fechas UTC/Local
 * 
 * REGLAS:
 * - Backend envía fechas en UTC (ISO 8601)
 * - Frontend muestra fechas en hora local del usuario
 * - Frontend envía fechas en UTC al backend
 */

/**
 * Convierte una fecha UTC (string ISO) del backend a Date object
 * La fecha se parsea como UTC y se mantiene como tal internamente
 */
export function parseUTCDate(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;

  // Parsear como UTC - dayjs interpreta ISO strings correctamente
  const date = dayjs.utc(dateString).toDate();
  return date;
}

/**
 * Convierte un Date object a string ISO UTC para enviar al backend
 * Si la fecha es Date, se asume que está en hora local y se convierte a UTC
 */
export function toUTCISO(date: Date | null | undefined): string | null {
  if (!date) return null;

  // Si date es un objeto Date en hora local, lo convertimos a UTC
  return dayjs(date).utc().toISOString();
}

/**
 * Convierte una fecha UTC a hora local para mostrar en la UI
 * Retorna string formateado según locale del usuario
 */
export function formatLocalDateTime(date: Date | string | null | undefined): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? parseUTCDate(date) : date;
  if (!dateObj) return "";

  // Convertir UTC a hora local y formatear
  return dayjs(dateObj).format("DD/MM/YYYY HH:mm");
}

/**
 * Convierte una fecha UTC a fecha local (solo fecha, sin hora) para mostrar en la UI
 */
export function formatLocalDate(date: Date | string | null | undefined): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? parseUTCDate(date) : date;
  if (!dateObj) return "";

  return dayjs(dateObj).format("DD/MM/YYYY");
}

/**
 * Convierte una fecha UTC a hora relativa para mostrar en la UI
 * Ej: "hace 2 horas", "hace 3 días"
 */
export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? parseUTCDate(date) : date;
  if (!dateObj) return "";

  return dayjs(dateObj).fromNow();
}

/**
 * Convierte un valor de input datetime-local (hora local sin zona) a ISO UTC
 * El input datetime-local devuelve un string "YYYY-MM-DDTHH:mm" en hora local
 */
export function datetimeLocalToUTC(datetimeLocal: string): string {
  if (!datetimeLocal) return "";

  // Parsear como hora local y convertir a UTC
  return dayjs(datetimeLocal).utc().toISOString();
}

/**
 * Convierte una fecha UTC a formato para input datetime-local
 * Retorna string "YYYY-MM-DDTHH:mm" en hora local
 */
export function utcToDatetimeLocal(utcDate: Date | string | null | undefined): string {
  if (!utcDate) return "";

  const dateObj = typeof utcDate === "string" ? parseUTCDate(utcDate) : utcDate;
  if (!dateObj) return "";

  // Convertir UTC a hora local y formatear para input
  return dayjs(dateObj).format("YYYY-MM-DDTHH:mm");
}

/**
 * Convierte una fecha local Date a string "YYYY-MM-DD" para filtros por día
 * NO incluye conversión a UTC - se usa directamente como string
 */
export function dateToDayString(date: Date | dayjs.Dayjs): string {
  return dayjs(date).format("YYYY-MM-DD");
}

/**
 * Convierte un string "YYYY-MM-DD" (día en hora local) al inicio del día en UTC
 * Retorna string ISO 8601 UTC para enviar al backend
 * Ejemplo: "2024-01-15" (en hora local) -> "2024-01-15T00:00:00.000Z" (UTC)
 */
export function dayStringToStartUtc(dayString: string): string {
  if (!dayString) return "";

  // Parsear como fecha local y convertir el inicio del día a UTC
  return dayjs(dayString).startOf("day").utc().toISOString();
}

/**
 * Convierte un string "YYYY-MM-DD" (día en hora local) al final del día en UTC
 * Retorna string ISO 8601 UTC para enviar al backend
 * Ejemplo: "2024-01-15" (en hora local) -> "2024-01-15T23:59:59.999Z" (UTC)
 */
export function dayStringToEndUtc(dayString: string): string {
  if (!dayString) return "";

  // Parsear como fecha local y convertir el final del día a UTC
  return dayjs(dayString).endOf("day").utc().toISOString();
}

/**
 * Convierte un string ISO UTC a string "YYYY-MM-DD" en hora local
 * Útil para inicializar inputs de tipo date
 */
export function utcToDayString(utcString: string): string {
  if (!utcString) return "";
  
  // Parsear como UTC y convertir a hora local, luego formatear como YYYY-MM-DD
  return dayjs.utc(utcString).local().format("YYYY-MM-DD");
}

/**
 * Valida si un string es una fecha ISO válida
 */
export function isValidISOString(dateString: string): boolean {
  return dayjs(dateString).isValid() && dateString.includes("T");
}
