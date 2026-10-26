/**
 * SystemAdminProfile Model for S32 Administration & Control Plane Foundation
 * 
 * Defines System administrator profiles with universal roles and permissions
 * 
 * Constraint: NO lógica vertical, solo roles y permisos universales System
 */

export interface SystemAdminProfile {
  /** Admin unique identifier */
  adminId: string;
  /** IdentityUniversal ID (S11.1) */
  identityId: string;
  /** Role administrativo universal */
  role: 'ADMIN' | 'OPERATOR' | 'AUDITOR' | 'VIEWER' | 'SUPERADMIN';
  /** Permisos universales (codes System-only) */
  permissions: Array<'SYSTEM_CONFIG_READ' | 'SYSTEM_CONFIG_WRITE' | 'SYSTEM_OPERATION_READ' | 'SYSTEM_OPERATION_WRITE' | 'SYSTEM_AUDIT_READ' | 'SYSTEM_ADMINISTRATION_READ' | 'SYSTEM_ADMINISTRATION_WRITE'>;
  /** Status del perfil */
  status: 'ACTIVE' | 'SUSPENDED' | 'DEPROACTIVATED';
  /** Fecha creación */
  createdAt: Date;
  /** Última actualización */
  updatedAt: Date;
}