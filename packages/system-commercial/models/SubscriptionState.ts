/**
 * SubscriptionState Model for S31 Commercial Foundation
 * 
 * Defines subscription states for commercial accounts
 * 
 * Constraint: ESTADOS UNIVERSALES, no lógica vertical
 */

export enum SubscriptionState {
  /** Suscripción activa, servicios disponibles */
  ACTIVE = 'ACTIVE';
  /** Suspendida temporalmente (por mora, mantenimiento) */
  SUSPENDED = 'SUSPENDED';
  /** Suscripción expirada (fecha fin pasada) */
  EXPIRED = 'EXPIRED';
  /** Cancelada permanentemente */
  CANCELLED = 'CANCELLED';
}