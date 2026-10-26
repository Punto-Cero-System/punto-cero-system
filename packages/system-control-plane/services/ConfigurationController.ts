/**
 * Configuration Controller Service for S32 Administration & Control Plane Foundation
 * 
 * Manages universal System configuration entries
 * 
 * Constraint: NO lógica vertical, solo configuraciones universales System
 */

import { SystemConfiguration } from '../models/SystemConfiguration';

export interface ConfigurationControllerConfig {
  /** Enable automatic config validation */
  autoValidate: boolean;
  /** Maximum configuration entries per scope */
  maxEntriesPerScope: number;
  /** Enable config change audit logging */
  auditChanges: boolean;
}

export interface ConfigurationController {
  /** Get configuration by key */
  getConfiguration(key: string): Promise<SystemConfiguration | null>;
  
  /** Set configuration value */
  setConfiguration(config: Omit<SystemConfiguration, 'configId' | 'updatedAt'>): Promise<SystemConfiguration>;
  
  /** Get configuration by scope */
  getConfigurationsByScope(scope: 'GLOBAL' | 'TENANT' | 'SYSTEM'): Promise<Array<SystemConfiguration>>;
  
  /** Update configuration value */
  updateConfiguration(configId: string, newValue: string): Promise<SystemConfiguration | null>;
  
  /** Remove configuration entry */
  removeConfiguration(configId: string): Promise<boolean>;
  
  /** List all configurations */
  listAllConfigurations(): Promise<Array<SystemConfiguration>>;
  
  /** Validate configuration key */
  validateConfigurationKey(key: string): Promise<{
    valid: boolean;
    isUniversal: boolean;
    reason?: string;
  }>;
}

export default ConfigurationController;