/**
 * Errors - Modelos de error estandarizados para Core Client.
 */
export interface CoreClientError {
  /** Código de error */
  code: string
  /** Mensaje descriptivo */
  message: string
  /** Contexto adicional del error (opcional) */
  context?: Record<string, unknown>
}

/** Error de validación contractual. */
export interface ContractValidationError extends CoreClientError {
  /** Tipo de error de validación */
  type: 'schema' | 'type' | 'required' | 'version'
  /** Ruta del campo inválido (opcional) */
  path?: string[]
}

/** Error de comunicación con Core L1. */
export interface CommunicationError extends CoreClientError {
  /** Código de error de transporte */
  transportCode: 'CONNECTION' | 'TIMEOUT' | 'UNKNOWN'
  /** Información adicional del transporte */
  transportInfo?: Record<string, unknown>
}

/** Error interno del cliente. */
export interface SystemError extends CoreClientError {
  /** Código de error interno */
  internalCode: 'INITIALIZATION' | 'VALIDATION' | 'TRANSPORT' | 'UNKNOWN'
}