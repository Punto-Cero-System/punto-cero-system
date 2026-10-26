// @fileoverview Punto Cero System - Universal Consumer Adapter
// Standard adapter layer for connecting L2 consumers with Punto Cero System.
// No vertical integration, no Core modification, declarations only.
// Version: 0.1.0
// Status: Foundation - interfaces and types only

/**
 * ConsumerAdapter - Standard interface for all consumer adapters
 * 
 * Principles:
 * - No vertical integration (Legal/Medical/Business)
 * - No Core L1 modification
 * - Dependency only on contracts and consumer-registry
 * - Lifecycle and capability declarations only
 * - Version: 0.1.0
 * Status: Foundation - interfaces and types only
 */

export interface ConsumerAdapter {
  /** Initialize the adapter */
  initialize(): Promise<void>;

  /** Get consumer metadata */
  getMetadata(): ConsumerMetadata;

  /** Get declared capabilities */
  getCapabilities(): Capability[];

  /** Get current adapter status */
  getStatus(): ConsumerStatus;
}

/**
 * ConsumerMetadata - Metadata for consumer identification
 * 
 * Principles:
 * - No user management
 * - No authentication data
 * - Consumer identification only
 * - Version and status tracking
 * - Version: 0.1.0
 * Status: Foundation - types only
 */

export interface ConsumerMetadata {
  consumerId: string;
  type: string;
  version: string;
  status: ConsumerStatus;
  description?: string;
  [key: string]: any;
}

/**
 * Capability - Declared capability by a consumer
 * 
 * Principles:
 * - Solo declaración, no acceso a datos
 * - Sin lógica de negocio
 * - Tipos estáticos solo
 * - Version: 0.1.0
 * Status: Foundation - types only
 */

export type Capability = string;

/**
 * CapabilitySet - Set of declared capabilities
 * 
 * Principles:
 * - Mapeo string->boolean para capabilities
 * - Sin acceso a datos internos
 * - Version: 0.1.0
 * Status: Foundation - types only
 */

export interface CapabilitySet {
  [key: string]: boolean;
}

/**
 * ConsumerStatus - Status of the consumer adapter
 * 
 * Lifecycle states (no real connection):
 * registered -> validated -> available -> connected
 *                            ↑
 *                          rejected
 * 
 * Principles:
 * - No conexión real todavía
 * - Estados conceptuales solo
 * - Sin autenticación
 * - Version: 0.1.0
 * Status: Foundation - types only
 */

export type ConsumerStatus = 
  | 'registered' 
  | 'validated' 
  | 'available' 
  | 'connected' 
  | 'rejected'
  | 'disconnected';