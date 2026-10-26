/**
 * SystemConfiguration Model for S32 Administration & Control Plane Foundation
 * 
 * Defines universal System configuration entries
 * 
 * Constraint: NO lógica vertical, solo configuraciones universales System
 */

export interface SystemConfiguration {
  /** Config unique identifier */
  configId: string;
  /** Llave de configuración universal */
  key: 'system.timezone' | 'system.currency.default' | 'system.country.default' | 'operator.session.timeout' | 'audit.retention.days' | string;
  /** Valor de configuración universal */
  value: string;
  /** Scope de configuración */
  scope: 'GLOBAL' | 'TENANT' | 'SYSTEM';
  /** Fecha última actualización */
  updatedAt: Date;
  /** Admin profile que realizó la última actualización */
  lastUpdatedBy?: string;
}