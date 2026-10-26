/**
 * Punto Cero System - Public Contracts
 * Contratos públicos base para comunicación System ↔ Core L1 ↔ Verticales L2
 * 
 * @version 0.1.0
 */
 
// ============================================================
// CONTRATOS BASE - Consumer
// ============================================================

/**
 * Representa un consumidor L2.
 */
export interface Consumer {
  name: string
  type: string
  version: string
  status: 'active' | 'inactive' | 'pending' | 'deprecated'
}
 
// ============================================================
// CONTRATOS BASE - Context
// ============================================================

/**
 * Representa contexto universal.
 */
export interface Context {
  userId: string
  organizationId: string
  workspace: string
  license: 'open' | 'pro' | 'enterprise' | 'custom'
}
 
// ============================================================
// CONTRATOS BASE - Capability
// ============================================================

/**
 * Representa una capacidad disponible.
 */
export interface Capability {
  name: string
  identification: string
  version: string
  available: boolean
}
 
// ============================================================
// CONTRATOS BASE - Contract Metadata
// ============================================================

/**
 * Metadatos del contrato.
 */
export interface ContractMetadata {
  version: string
  backwardCompatible: boolean
  status: 'draft' | 'approved' | 'deprecated' | 'superseded'
}
 
// ============================================================
// CONTRATOS BASE - Workspace
// ============================================================

/**
 * Información del workspace.
 */
export interface Workspace {
  name: string
  id: string
  type: 'development' | 'production' | 'staging' | 'testing'
  active: boolean
}

// ============================================================
// CONTRATOS BASE - Core Contract Reference
// ============================================================

/**
 * Referencia a contratos Core L1.
 */
export interface CoreContractReference {
  coreId: string
  coreVersion: string
  entryPoint: string
  relationshipStatus: 'connected' | 'disconnected' | 'pending'
}
/**
 * Punto Cero System - Public Contracts
 * 
 * Contratos públicos base para la comunicación entre:
 * - System (gestión de consumidores)
 * - Core L1 (contratos de sistema)
 * - Verticales L2 (Legal, Medical, Business)
 * 
 * Este package define tipos e interfaces conceptuales.
 * No contiene lógica de negocio.
 * 
 * @version 0.1.0
 */

// ============================================================
// CONTRATOS BASE - Consumer
// ============================================================

/**
 * Referencia a contratos del Core L1.
 * Mantiene separación entre System y Core.
 */
export interface CoreContractReference {
  /** Identificador del contrato Core L1 */
  coreId: string
  /** Versión del contrato Core */
  coreVersion: string
  /** Punto de entrada al Core L1 */
  entryPoint: string
  /** Estado de la relación */
  relationshipStatus: 'connected' | 'disconnected' | 'pending'
}
// ============================================================
// ============================================================
// EXPORTACIONES CENTRALES
// ============================================================

/**
 * Todas los tipos y exportados públicamente por este package.
 * Los consumidores L2 pueden importar estos tipos para
 * asegurar la interoperabilidad con Punto Cero System.
 */
export * from './types/index'

export * from './types/consumer'
export * from './types/context'
export * from './types/capability'
export * from './types/contract-metadata'
export * from './types/workspace'
export * from './types/core-contract-reference'

/**
 * Espacio de nombres para acceso organizado a los contratos.
 */
export const contracts = {
  Consumer,
  Context,
  Capability,
  ContractMetadata,
  Workspace,
  CoreContractReference,
  ConsumerContract,
  ContextContract,
  CapabilityContract,
  WorkspaceContract,
  CoreContractReferenceType,
}

/**
 * Versión del package de contratos públicos.
 */
export const VERSION = '0.1.0'

/**
 * Estado por defecto para nuevos contratos.
 */
export const DEFAULT_STATUS = 'draft' as const

/**
 * Tipos de consumidor soportados.
 */
export const CONSUMER_TYPES = [
  'legal',
  'medical',
  'business',
  'partner',
  'integrator',
] as const

/**
 * Estados posibles para contratos.
 */
export const CONTRACT_STATUSES = [
  'draft',
  'approved',
  'deprecated',
  'superseded',
] as const
// INTERFACES PÚBLICAS COMPOSITAS
// ============================================================

/**
 * Contrato completo de consumidor L2.
 * Combina estructura base con metadatos.
 */
export type ConsumerContract = Consumer & ContractMetadata

/**
 * Contrato completo de contexto.
 * Combina estructura de contexto con metadatos.
 */
export type ContextContract = Context & ContractMetadata

/**
 * Contrato completo de capacidad.
 * Combina definición de capacidad con metadatos.
 */
export type CapabilityContract = Capability & ContractMetadata

/**
 * Contrato de workspace con metadatos.
 */
export type WorkspaceContract = Workspace & ContractMetadata

/**
 * Referencia a contrato Core para consumo System.
 */
export type CoreContractReferenceType = CoreContractReference & ContractMetadata