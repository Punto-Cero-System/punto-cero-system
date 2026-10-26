/**
 * SystemControlAction Model for S32 Administration & Control Plane Foundation
 * 
 * Defines administrative actions with universal action types and results
 * 
 * Constraint: NO lógica vertical, solo acciones y resultados universales System
 */

export enum SystemControlActionResult {
  /** Acción completada exitosamente */
  SUCCESS = 'SUCCESS';
  /** Acción fallida (con razón) */
  FAILED = 'FAILED';
  /** Acción en proceso */
  PENDING = 'PENDING';
}

export interface SystemControlAction {
  /** Acción única identifier */
  actionId: string;
  /** ID del administrador que ejecutó la acción */
  operatorId: string;
  /** Tipo de acción universal */
  actionType: 'CONFIG_UPDATE' | 'SYSTEM_RESTART' | 'COMPONENT_ENABLE' | 'COMPONENT_DISABLE' | 'POLICY_DEPLOY' | 'POLICY_REVOKE' | 'ACCOUNT_SUSPEND' | 'ACCOUNT_REACTIVATE' | 'SUBSCRIPTION_MODIFY' | 'LOG_CLEAR' | string;
  /** Objeto/Recurso afectado (código universal) */
  target: string;
  /** Momento de ejecución */
  timestamp: Date;
  /** Resultado de la acción */
  result: SystemControlActionResult;
  /** Razón de fallo (si aplica) */
  failureReason?: string;
  /** Metadatos adicionales */
  metadata?: Record<string, any>;
}