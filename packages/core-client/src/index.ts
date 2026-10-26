/**
 * Punto Cero System - Core Client
 * Official client communication between Punto Cero System and Core L1
 *
 * @version 0.2.0-next
 */

/** Espacio de nombres para tipos y exportaciones principales. */
export * from './types'
export * from './client'
export * from './errors'

/** Versión del paquete core-client. */
export const VERSION = '0.2.0-next'

/** Estado por defecto para nuevos clientes. */
export const DEFAULT_STATUS = 'disconnected' as const