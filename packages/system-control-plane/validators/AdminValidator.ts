/**
 * Admin Validator for S32 Administration & Control Plane Foundation
 * 
 * Validates administrative operations using PolicyRuntime S22
 * 
 * Constraint: NO lógica vertical, solo validaciones universales System
 */

import { SystemAdminProfile } from '../models/SystemAdminProfile';
import { SystemConfiguration } from '../models/SystemConfiguration';
import { SystemControlAction, SystemControlActionResult } from '../models/SystemControlAction';

export interface AdminValidatorConfig {
  /** Require profile existence validation */
  requireProfileExists: boolean;
  /** Require configuration validation */
  requireConfigValidation: boolean;
  /** Enable PolicyRuntime S22 integration */
  enablePolicyIntegration: boolean;
  /** Enable governance S21 audit logging */
  enableGovernanceAudit: boolean;
}

export interface ValidationResult {
  /** Overall valid flag */
  valid: boolean;
  /** Validation timestamp */
  timestamp: Date;
  /** S10-S31 preservation flag */
  s10S31Preserved: boolean;
  /** Vertical isolation flag */
  verticalIsolation: 'maintained' | 'compromised' | 'unknown';
  /** Profile validation */
  profileValidation: {
    valid: boolean;
    profile: SystemAdminProfile | null;
    issues: Array<{
      type: 'profileNotFound' | 'profileInactive' | 'insufficientPermissions' | 'consumerMismatch';
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  };
  /** Configuration validation */
  configValidation: {
    valid: boolean;
    configuration: SystemConfiguration | null;
    issues: Array<{
      type: 'configNotFound' | 'invalidKey' | 'invalidScope' | 'consumerMismatch';
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  };
  /** Action validation */
  actionValidation: {
    valid: boolean;
    action: SystemControlAction | null;
    issues: Array<{
      type: 'actionNotFound' | 'invalidType' | 'invalidTarget' | 'consumerMismatch';
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  };
  /** Policy S22 integration */
  policyS22Integration: {
    compatible: boolean;
    details: string;
    policyEvaluation: 'pass' | 'warning' | 'critical';
  };
  /** Governance S21 integration */
  governanceS21Integration: {
    compatible: boolean;
    details: string;
    auditTrail: 'complete' | 'partial' | 'missing';
  };
  /** Recommendations */
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    category: string;
    description: string;
    action: string;
  }>;
}

export interface AdminValidator {
  /** Validate admin profile operation */
  validateAdminProfile(
    adminId: string,
    requiredPermissions: Array<string>
  ): Promise<ValidationResult>;
  
  /** Validate configuration operation */
  validateConfigurationOperation(
    key: string,
    newValue: string,
    scope: 'GLOBAL' | 'TENANT' | 'SYSTEM'
  ): Promise<ValidationResult>;
  
  /** Validate control action */
  validateControlAction(
    actionId: string,
    operatorId: string
  ): Promise<ValidationResult>;
  
  /** Full administrative operation validation */
  validateAdministrativeOperation(
    operatorId: string,
    actionType: string,
    target: string
  ): Promise<ValidationResult>;
  
  /** Get validation summary */
  getValidationSummary(): Promise<{
    overall: 'pass' | 'warning' | 'critical';
    s10S31Preserved: boolean;
    verticalIsolation: 'maintained' | 'compromised' | 'unknown';
    readyForOperation: boolean;
  }>;
}

export default AdminValidator;