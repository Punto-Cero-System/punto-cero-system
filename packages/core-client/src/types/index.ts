/**
 * Types - Tipos reutilizables del Core Client.
 */
export type { CoreClient, CoreClientConfig, CoreResponse, CoreClientError }
export type { ClientStatus }

export interface Request {
  /** Identificador único de la solicitud */
  id: string
  /** operación solicitada */
  operation: string
  /** contexto adjunto */
  context: Record<string, unknown>
  /** payload de la solicitud */
  payload: Record<string, unknown>
}

export interface Response<T = any> {
  /** Identificador de la solicitud correlacionada */
  id: string
  /** Indica si la operación fue exitosa */
  success: boolean
  /** Resultado de la operación (opcional) */
  result: T | null
  /** Error si la operación falló (opcional) */
  error: CoreClientError | null
}

export interface CoreClientError {
  /** Código de error */
  code: string
  /** Mensaje descriptivo */
  message: string
  /** Contexto adicional del error (opcional) */
  context?: Record<string, unknown>
}