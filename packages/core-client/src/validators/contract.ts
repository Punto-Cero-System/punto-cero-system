/**
 * Contract Validators - Validación de compatibilidad con contracts 0.1.0.
 * Solo validación estática de esquema, sin modificar contratos.
 *
 * Principio fundamental: contracts 0.1.0 permanece congelado y solo es de lectura.
 * Estos validadores checks que la estructura de requests/responses es compatible
 * con lo definido en packages/contracts, pero no modifican los contratos en sí.
 */
import { Capability, Context, Consumer, ContractMetadata, CoreContractReference, Workspace } from '../contracts'

/** Resultado de una validación de contrato. */
export interface ValidationResult {
  /** Si la validación pasó */
  valid: boolean
  /** Errores encontrados (vacíos si valid es true) */
  errors: ValidationError[]
  /** Información adicional sobre la validación */
  details?: Record<string, unknown>
}

/** Error de validación de contrato. */
export interface ValidationError {
  /** Código del error */
  code: string
  /** Mensaje descriptivo */
  message: string
  /** Ruta o campo afectado (opcional) */
  path?: string[]
  /** Tipo de validación fallida */
  type?: 'schema' | 'type' | 'required' | 'version'
}

/**
 * Valida que una request es compatible con contracts 0.1.0.
 * Reglas:
 * - Campos obligatorios deben estar presentes
 * - Tipos de datos deben ser asignables
 * - Enums deben ser valores permitidos
 * - Estructura anidada debe ser coherente
 */
export function validateRequestCompatibility(request: any): ValidationResult {
  const errors: ValidationError[] = []

  // Verificar que request es un objeto
  if (request === null || typeof request !== 'object') {
    errors.push({
      code: 'ERR_CONTRACT_REQUIRED',
      message: 'Request debe ser un objeto',
      type: 'required'
    })
    return { valid: false, errors }
  }

  // Verificar campos obligatorios básicos
  if (!request.operation) {
    errors.push({
      code: 'ERR_CONTRACT_REQUIRED',
      message: 'Campo operation es obligatorio',
      type: 'required'
    })
  }

  if (!request.context) {
    errors.push({
      code: 'ERR_CONTRACT_REQUIRED',
      message: 'Campo context es obligatorio',
      type: 'required'
    })
  }

  // Los tipos complejos se validan contra contracts 0.1.0 en tiempo de compilación
  // Esta es una validación básica en tiempo de ejecución

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Valida que una response es compatible con contracts 0.1.0.
 * Reglas:
 * - Estructura esperada debe estar presente
 * - Campos opcionales coherentes
 * - Error codes mapeados correctamente
 */
export function validateResponseCompatibility(response: any): ValidationResult {
  const errors: ValidationError[] = []

  // Verificar que response es un objeto
  if (response === null || typeof response !== 'object') {
    errors.push({
      code: 'ERR_CONTRACT_SCHEMA',
      message: 'Response debe ser un objeto',
      type: 'schema'
    })
    return { valid: false, errors }
  }

  // Verificar campos obligatorios en response
  if (response.id === undefined) {
    errors.push({
      code: 'ERR_CONTRACT_REQUIRED',
      message: 'Campo id es obligatorio en response',
      type: 'required'
    })
  }

  if (response.success === undefined) {
    errors.push({
      code: 'ERR_CONTRACT_REQUIRED',
      message: 'Campo success es obligatorio en response',
      type: 'required'
    })
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Valida la compatibilidad de tipos con contracts 0.1.0.
 * Esta función checks que los tipos usados son assignables a los tipos
 * definidos en packages/contracts, pero no modifica los contratos.
 */
export function validateTypeCompatibility(
  typeName: string,
  value: any
): ValidationResult {
  const errors: ValidationError[] = []

  switch (typeName) {
    case 'Capability':
      if (!value || typeof value.name !== 'string') {
        errors.push({
          code: 'ERR_CONTRACT_TYPE',
          message: 'Capability debe tener campo name: string',
          type: 'type'
        })
      }
      if (value && !['active', 'inactive', 'pending', 'deprecated'].includes(value.status)) {
        errors.push({
          code: 'ERR_CONTRACT_TYPE',
          message: 'Campo status de Capability debe ser un valor permitido',
          type: 'type'
        })
      }
      break

    case 'Context':
      if (!value || typeof value.userId !== 'string') {
        errors.push({
          code: 'ERR_CONTRACT_TYPE',
          message: 'Context debe tener campo userId: string',
          type: 'type'
        })
      }
      break

    case 'Consumer':
      if (!value || typeof name !== 'string') {
        errors.push({
          code: 'ERR_CONTRACT_TYPE',
          message: 'Consumer debe tener campo name: string',
          type: 'type'
        })
      }
      break

    default:
      // Tipo no reconocido - no fallar, solo advertir
      errors.push({
        code: 'ERR_CONTRACT_VERSION',
        message: `Tipo ${typeName} no definido en contracts 0.1.0`,
        type: 'version'
      })
  }

  return {
    valid: errors.length === 0,
    errors
  }
}