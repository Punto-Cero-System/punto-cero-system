/** 
 * @fileoverview Authorization Foundation Model
 * Core authorization types for System context evaluation.
 * 
 * Principles:
 * - System-owned only (no vertical types)
 - Capability-only model (no RBAC roles)
 - Composable with IdentityUniversal + TenantUniversal + ContextRuntime
 - Reference-only, no auth state, no persistence
 - Minimal fields for access decision
 * 
 * @version 0.1.0
 * @status Implementation
 */

import { SystemContext } from './context'
import { IdentityUniversal } from '../Identity/models'
import { TenantUniversal } from '../models/Tenant'

/** 
 * Capability Universal - Tipos de capacidad del System (solo system-owned)
 * 
 * Capabilities system-only. No vertical types allowed (legal/medical/business/One).
 * 
 * Formato: system.{action} | consumer.{resource} | tenant.{operation}
 */
export type CapabilityUniversal =
  | 'system.read'
  | 'system.manage'
  | 'consumer.access'
  | 'tenant.manage'
  | 'system.configure'
  | 'system.monitor'
  | 'system.admin'

/** 
 * AuthorizationDecision - Resultado de la evaluación de autorización
 * 
 * Principios:
 * - allowed: acceso concedido
 * - denied: acceso denegado con razón
 * - reason: explicación opcional denegación
 * - System-owned only (no vertical reasons)
 */
export type AuthorizationDecision =
  | { decision: 'allowed'; reason?: string | undefined }
  | { decision: 'denied'; reason: string }

/** 
 * AuthorizationContext - Contexto para evaluación de autorización
 * 
 * Contexto compuesto desde las fundaciones S11:
 * IdentityUniversal + TenantUniversal + ContextRuntime
 * 
 * NO contiene:
 * - roles verticales
 * - permisos Legal/Medical/Business
 * - datos de autenticación
 * - estado de sesión
 */
export interface AuthorizationContext {
  /** Identificador único de contexto */
  contextId: string
  /** Referencia a IdentityUniversal */
  identityId: string
  /** Referencia a TenantUniversal */
  tenantId: string
  /** Identificador de consumidor (opcional) */
  consumerId?: string
}

/** 
 * AuthorizationEvaluation - Entrada para el evaluador de autorización
 * 
 * Contiene todos los elementos necesarios para evaluar una decisión de autorización.
 * 
 * Principios:
 * - Sin lógica de negocio
 * - Sin operaciones externas
 * - Sin persistencia
 * - Solo validación de estructura y toma de decisión
 */
export interface AuthorizationEvaluation {
  /** Contexto de autorización compilado */
  context: AuthorizationContext
  /** Capabilidad a evaluar (solo system-owned) */
  capability: CapabilityUniversal
  /** Recurso objetivo */
  resource: string
}

/** 
 * AuthorizationResult - Resultado estructurado de la evaluación
 * 
 * Representa la decisión final de autorización.
 */
export type AuthorizationResult = AuthorizationDecision

/** 
 * ValidationError - Errores de validación de entrada
 * 
 * Errors que pueden ocurrir durante la evaluación de autorización.
 * Todos son del System, ningún error vertical.
 */
export type ValidationError =
  | { field: 'identityId'; error: 'missing' }
  | { field: 'tenantId'; error: 'missing' }
  | { field: 'capability'; error: 'invalid' }
  | { field: 'resource'; error: 'empty' }
  | { field: 'contextId'; error: 'missing' }