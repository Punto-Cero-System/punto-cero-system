/**
 * Environment Manager Service for S30 Production Platform
 * 
 * Manages environment configuration, isolation, and lifecycle
 * 
 * Constraint: NO modifica S10-S29, solo agrega infraestructura operacional
 */

import { EnvironmentConfig } from '../models/Environment';

export interface EnvironmentManager {
  /** Get environment configuration */
  getEnvironmentConfig(name: 'development' | 'staging' | 'production'): Promise<EnvironmentConfig>;
  
  /** List all environment configurations */
  listEnvironments(): Promise<Array<{
    name: 'development' | 'staging' | 'production';
    version: string;
    status: 'active' | 'inactive' | 'deprecated';
  }>>;
  
  /** Validate environment isolation */
  validateEnvironmentIsolation(env1: 'development' | 'staging' | 'production', env2: 'development' | 'staging' | 'production'): Promise<{
    isolated: boolean;
    details: string;
  }>;
  
  /** Update environment configuration */
  updateEnvironmentConfig(config: EnvironmentConfig): Promise<EnvironmentConfig>;
  
  /** Add secret reference to environment */
  addSecretReference(envName: string, secretName: string, secretId: string): Promise<EnvironmentConfig>;
  
  /** Remove secret reference from environment */
  removeSecretReference(envName: string, secretName: string): Promise<EnvironmentConfig>;
  
  /** Verify environment S10-S29 compatibility */
  verifyEnvironmentCompatibility(envName: string): Promise<{
    compatible: boolean;
    s10S29Preserved: boolean;
    issues: Array<{
      type: string;
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  }>;
}

export default EnvironmentManager;