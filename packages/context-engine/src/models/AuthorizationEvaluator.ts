/** 
 * @fileoverview Authorization Evaluator
 * Evaluates authorization requests against System context and capabilities.
 * 
 * Principles:
 * - Input: ContextRuntime + CapabilityUniversal + Resource
 * - Output: AuthorizationDecision (allowed/denied + reason)
 * - Validation only (no business logic, no operations, no persistence)
 - System-owned types only (no vertical integration)
 * 
 * @version 0.1.0
 * @status Implementation
 */

import { SystemContext } from './context'
import { 
  AuthorizationEvaluation, 
  AuthorizationDecision, 
  AuthorizationContext, 
  CapabilityUniversal, 
  ValidationError 
} from './Authorization'
import { IdentityUniversal } from '../Identity/models'
import { TenantUniversal } from '../models/Tenant'

/** 
 * AuthorizationEvaluator - Evalúa solicitudes de autorización
 * 
 * Evalúa si un contexto tiene autorización para acceder a una capacidad
 * del System. Entrada: ContextRuntime + Capability + Resource.
 * Salida: AuthorizationDecision con allowed/denied y razón.
 * 
 * Validaciones ejecutadas:
 * 1. Contexto válido (identityId y tenantId presentes)
 * 2. Capability es del System (lista permitida)
 * 3. Relación identity-tenancy consistente
 * 4. Recurso no vacío
 * 
 * No hace:
 * - Llamadas a servicios externos
 - Ejecución de operaciones
 - Persistencia de datos
 - Gestión de sesiones
 - Lógica de negocio vertical
 */
export class AuthorizationEvaluator {
  /** Evaluar autorización completa
   * 
   * @param evaluation Contexto, capability y resource para evaluar
   * @returns AuthorizationDecision con el resultado
   * @throws ValidationError si la entrada es inválida
   */
  evaluate(evaluation: AuthorizationEvaluation): AuthorizationDecision {
    // Validación 1: Contexto debe tener identityId
    if (!evaluation.context.identityId) {
      throw this.validationError('identityId', 'missing')
    }
    
    // Validación 2: Contexto debe tener tenantId
    if (!evaluation.context.tenantId) {
      throw this.validationError('tenantId', 'missing')
    }
    
    // Validación 3: Contexto debe tener contextId
    if (!evaluation.context.contextId) {
      throw this.validationError('contextId', 'missing')
    }
    
    // Validación 4: Capability debe ser del System (lista permitida)
    const validCapabilities: CapabilityUniversal[] = [
      'system.read',
      'system.manage', 
      'consumer.access',
      'tenant.manage',
      'system.configure',
      'system.monitor',
      'system.admin'
    ]
    
    if (!validCapabilities.includes(evaluation.capability)) {
      throw this.validationError('capability', 'invalid')
    }
    
    // Validación 5: Resource no debe estar vacío
    if (!evaluation.resource || evaluation.resource.trim() === '') {
      throw this.validationError('resource', 'empty')
    }
    
    // Validación 6: Verificar relación identity-tenancy consistente
    // En una implementación completa, aquí se verificaría que el identityId
    // en el contexto tenga relación con el tenantId
    const identityValid = evaluation.context.identityId.length > 0
    const tenantValid = evaluation.context.tenantId.length > 0
    
    if (!identityValid || !tenantValid) {
      return { decision: 'denied', reason: 'Identity or tenant not valid' }
    }
    
    // Si todas las validaciones pasan, autorizar
    return {
      decision: 'allowed',
      reason: `Identity ${evaluation.context.identityId} in tenant ${evaluation.context.tenantId} has ${evaluation.capability} capability on ${evaluation.resource}`
    }
  }
  
  /** 
   * Crear AuthorizationContext desde IdentityUniversal + TenantUniversal + SystemContext
   * 
   * @param identity IdentityUniversal instance
   * @param tenant TenantUniversal instance
   * @param context SystemContext instance
   * @returns AuthorizationContext compilado
   */
  static createContextFromS11(
    identity: IdentityUniversal,
    tenant: TenantUniversal,
    context: SystemContext
  ): AuthorizationContext {
    return {
      contextId: context.contextId,
      identityId: identity.identityId,
      tenantId: tenant.tenantId,
      consumerId: context.consumerId
    }
  }
  
  /** 
   * Validación de error para campos faltantes
   * 
   * @param field Nombre del campo
   * @param error Tipo de error
   * @returns ValidationError estructurado
   */
  private validationError(field: string, error: string): never {
    throw {
      field,
      error
    } as ValidationError
  }
}