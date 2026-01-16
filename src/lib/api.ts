import axios from "axios";
import { parseUTCDate, toUTCISO, isValidISOString } from "./dateUtils";

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
  withCredentials: true
});

/**
 * Transforma recursivamente un objeto convirtiendo strings ISO UTC a Date objects
 * Solo transforma strings que parezcan fechas ISO (contienen 'T' y son válidos)
 */
function transformDatesFromBackend(data: unknown): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(transformDatesFromBackend);
  }

  if (typeof data === "string" && isValidISOString(data)) {
    // Convertir string ISO UTC a Date object
    const parsed = parseUTCDate(data);
    return parsed || data; // Si falla el parse, devolver el original
  }

  if (typeof data === "object" && data.constructor === Object) {
    const transformed: Record<string, unknown> = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        transformed[key] = transformDatesFromBackend((data as Record<string, unknown>)[key]);
      }
    }
    return transformed;
  }

  return data;
}

/**
 * Transforma recursivamente un objeto convirtiendo Date objects a strings ISO UTC
 */
function transformDatesToBackend(data: unknown): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  if (data instanceof Date) {
    return toUTCISO(data);
  }

  if (Array.isArray(data)) {
    return data.map(transformDatesToBackend);
  }

  if (typeof data === "object" && data.constructor === Object) {
    const transformed: Record<string, unknown> = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        transformed[key] = transformDatesToBackend((data as Record<string, unknown>)[key]);
      }
    }
    return transformed;
  }

  return data;
}

// Interceptor de respuesta: convierte strings ISO UTC del backend a Date objects
api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = transformDatesFromBackend(response.data);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

// Interceptor de request: convierte Date objects a strings ISO UTC antes de enviar
api.interceptors.request.use(
  (config) => {
    if (config.data && typeof config.data === "object") {
      config.data = transformDatesToBackend(config.data);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
