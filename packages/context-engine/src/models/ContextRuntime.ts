/** 
 * @fileoverview Context Runtime Model
 * Represents the runtime context composed from IdentityUniversal + TenantUniversal.
 * 
 * Principles:
 * - Composed from IdentityUniversal + TenantUniversal
 * - Reference-only, no auth state
 * - No vertical-specific data
 * - Produces SystemContext for downstream consumption
 * - Validates basic consistency of identity + tenant relationship
 * 
 * @version 0.1.1
 * @status Implementation
 */

import { TenantUniversal, createTenantUniversal } from './models'
import { IdentityUniversal, createIdentityUniversal } from './Identity'

/** 
 * SystemContext - Contexto del sistema compuesto por Identity + Tenant
 * 
 * Contiene los campos esenciales para identificar quién opera,
 * en qué tenant y el contexto actual del sistema.
 * 
 * NO contiene:
 * - roles verticales
 * - permisos Legal/Medical/Business
 * - datos de usuarios internos
 * - datos de autenticación
 */
export interface SystemContext {
  /** Identificador único de contexto */
  contextId: string
  /** Referencia a IdentityUniversal */
  identityId: string
  /** Referencia a TenantUniversal */
  tenantId: string
  /** Identificador de consumidor (opcional, si aplica) */
  consumerId?: string
  /** Marca de tiempo de creación */
  createdAt: string
  /** Status del contexto */
  status: 'active' | 'inactive' | 'pending'
}

/** 
 * createContextRuntime - Factory para construir SystemContext desde Identity + Tenant
 * 
 * Principios:
 * - Recibir IdentityUniversal y TenantUniversal
 * - Construir contexto activo validado
 * - Validar consistencia basic de identity-tenancy
 * - No auth state, no persistence
 * - No vertical data
 * 
 * @param identity IdentityUniversal instance
 * @param tenant TenantUniversal instance
 * @returns SystemContext validado y compuesto
 * @throws Error si identity o tenant son inválidos
 */
export function createContextRuntime(
  identity: IdentityUniversal,
  tenant: TenantUniversal
): SystemContext {
  // Validar que identity existe y tiene los campos requeridos
  if (!identity.identityId || identity.identityId.trim() === '') {
    throw new Error('IdentityUniversal debe tener identityId definido')
  }
  
  // Validar que tenant existe y tiene los campos requeridos
  if (!tenant.tenantId || tenant.tenantId.trim() === '') {
    throw new Error('TenantUniversal debe tener tenantId definido')
  }
  
  // Validar relación identity-tenancy: el tenant debe referenciar una identidad válida
  // El identityId del tenant debe coincidir con la identidad proporcionada
  if (tenant.identityId !== identity.identityId) {
    throw new Error(
      `Relación identity-tenancy inválida: tenant identityId (${tenant.identityId}) ` +
      `no coincide con identity identityId (${identity.identityId})`
    )
  }
  
  const now = new Date().toISOString()
  const contextId = `ctx-${identity.identityId}-${tenant.tenantId}`
  
  return {
    contextId,
    identityId: identity.identityId,
    tenantId: tenant.tenantId,
    consumerId: tenant.metadata?.consumerId,
    createdAt: now,
    status: 'active'
  }
}

/** 
 * SystemContext Builder - Builder pattern para construir SystemContext de forma fluida
 * 
 * Principles:
 - Fluent interface for context construction
 - Optional fields with defaults
 - Validation at build time
 - No vertical data injection
 */
export interface SystemContextBuilder {
  /** Contexto ID */
  contextId: string
  /** Identity ID */
  identityId: string
  /** Tenant ID */
  tenantId: string
  /** Consumer ID (optional) */
  consumerId?: string
  /** Created at timestamp */
  createdAt: string
  /** Status */
  status: 'active' | 'inactive' | 'pending'
  
  /** Build the SystemContext */
  build(): SystemContext
  
  /** Set context ID */
  withContextId(contextId: string): SystemContextBuilder
  
  /** Set identity ID */
  withIdentityId(identityId: string): SystemContextBuilder
  
  /** Set tenant ID */
  withTenantId(tenantId: string): SystemContextBuilder
  
  /** Set consumer ID */
  withConsumerId(consumerId: string): SystemContextBuilder
  
  /** Set status */
  withStatus(status: 'active' | 'inactive' | 'pending'): SystemContextBuilder
}

/** 
 * createSystemContextBuilder - Factory para crear un builder de SystemContext
 */
export function createSystemContextBuilder(
  identityId: string,
  tenantId: string
): SystemContextBuilder {
  const now = new Date().toISOString()
  
  return {
    contextId: `ctx-${identityId}-${tenantId}`,
    identityId,
    tenantId,
    consumerId: undefined,
    createdAt: now,
    status: 'active',
    
    build(): SystemContext {
      return {
        contextId: this.contextId,
        identityId: this.identityId,
        tenantId: this.tenantId,
        consumerId: this.consumerId,
        createdAt: this.createdAt,
        status: this.status
      }
    },
    
    withContextId(contextId: string): SystemContextBuilder {
      this.contextId = contextId
      return this
    },
    
    withIdentityId(identityId: string): SystemContextBuilder {
      this.identityId = identityId
      return this
    },
    
    withTenantId(tenantId: string): SystemContextBuilder {
      this.tenantId = tenantId
      return this
    },
    
    withConsumerId(consumerId: string): SystemContextBuilder {
      this.consumerId = consumerId
      return this
    },
    
    withStatus(status: 'active' | 'inactive' | 'pending'): SystemContextBuilder {
      this.status = status
      return this
    }
  }
}