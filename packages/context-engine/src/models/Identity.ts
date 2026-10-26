/** 
 * @fileoverview Identity Universal Model
 * Represents universal identity for Punto Cero System.
 * 
 * Principles:
 * - Reference-only, no database persistence
 * - No auth state management
 * - No vertical-specific identity types
 * - Composable within SystemContext
 * - Extension of ContextIdentity
 * - System-only identity (institutional/base)
 * 
 * @version 0.1.1
 * @status Implementation
 */

export interface IdentityUniversal {
  /** Identificador único de identidad (System-wide) */
  identityId: string
  /** Tipo de identidad */
  identityType: string
  /** Status de identidad */
  status: 'active' | 'inactive' | 'pending' | 'deleted'
  /** Fuente de la identidad */
  source: 'system' | 'institutional' | 'base'
  /** Marca de tiempo de creación */
  createdAt: string
  /** Marca de tiempo de última actualización */
  updatedAt: string
}

/** 
 * createIdentityUniversal - Factory para crear IdentityUniversal válida
 * 
 * Principles:
 * - Validar campos requeridos
 * - Estructura invariante
 * - Sin autenticación
 * - Sin persistencia
 * - Sin conexión externa
 * 
 * @param options Opciones de creación
 * @returns IdentityUniversal validada
 */
export function createIdentityUniversal(
  options: {
    identityId: string
    identityType: string
    status?: 'active' | 'inactive' | 'pending' | 'deleted'
    source?: 'system' | 'institutional' | 'base'
    createdAt?: string
    updatedAt?: string
  }
): IdentityUniversal {
  const now = new Date().toISOString()
  
  // Validar campos requeridos
  if (!options.identityId || options.identityId.trim() === '') {
    throw new Error('identityId es requerido')
  }
  
  if (!options.identityType || options.identityType.trim() === '') {
    throw new Error('identityType es requerido')
  }
  
  return {
    identityId: options.identityId,
    identityType: options.identityType,
    status: options.status || 'active',
    source: options.source || 'system',
    createdAt: options.createdAt || now,
    updatedAt: options.updatedAt || now
  }
}