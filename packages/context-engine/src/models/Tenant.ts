/** 
 * @fileoverview Tenant Universal Model
 * Represents universal tenant for Punto Cero System.
 * 
 * Principles:
 * - Reference-only, no database persistence
 * - No auth state management
 * - No vertical-specific tenant types
 * - Composable within SystemContext
 * - Extension of ContextIdentity (via identity reference)
 * - System-only tenant (institutional/base)
 * - Spatial/contextual identity, not business data
 * 
 * @version 0.1.1
 * @status Implementation
 */

export interface TenantUniversal {
  /** Identificador único de tenant (System-wide) */
  tenantId: string
  /** Tipo de tenant */
  tenantType: string
  /** Status de tenant */
  status: 'active' | 'inactive' | 'pending' | 'deleted'
  /** Relación con IdentityUniversal */
  identityId: string
  /** Fuente de la identidad */
  source: 'system' | 'institutional' | 'base'
  /** Marca de tiempo de creación */
  createdAt: string
  /** Marca de tiempo de última actualización */
  updatedAt: string
}

/** 
 * createTenantUniversal - Factory para crear TenantUniversal válido
 * 
 * Principles:
 * - Validar campos requeridos
 * - Estructura invariante
 * - Sin autenticación
 * - Sin persistencia
 * - Sin conexión externa
 * 
 * @param options Opciones de creación
 * @returns TenantUniversal validado
 */
export function createTenantUniversal(
  options: {
    tenantId: string
    tenantType: string
    status?: 'active' | 'inactive' | 'pending' | 'deleted'
    identityId: string
    source?: 'system' | 'institutional' | 'base'
    createdAt?: string
    updatedAt?: string
  }
): TenantUniversal {
  const now = new Date().toISOString()
  
  // Validar campos requeridos
  if (!options.tenantId || options.tenantId.trim() === '') {
    throw new Error('tenantId es requerido')
  }
  
  if (!options.tenantType || options.tenantType.trim() === '') {
    throw new Error('tenantType es requerido')
  }
  
  if (!options.identityId || options.identityId.trim() === '') {
    throw new Error('identityId es requerido')
  }
  
  return {
    tenantId: options.tenantId,
    tenantType: options.tenantType,
    status: options.status || 'active',
    identityId: options.identityId,
    source: options.source || 'system',
    createdAt: options.createdAt || now,
    updatedAt: options.updatedAt || now
  }
}