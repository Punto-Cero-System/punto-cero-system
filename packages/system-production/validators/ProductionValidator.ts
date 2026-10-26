/**
 * Production Validator for S30 Production Platform
 * Validates operational readiness, deployment preparation, and security compliance
 * Constraint: NO modifica S10-S29, solo agrega infraestructura operacional
 */

export interface ProductionValidatorConfig {
  requireSCertification: boolean;
  requireVerticalIsolation: boolean;
  minHealthPassRate: number;
  maxErrorRate: number;
}

export interface ValidationResult {
  valid: boolean;
  timestamp: Date;
  s10S29Preserved: boolean;
  verticalIsolation: 'maintained' | 'compromised' | 'unknown';
  componentValidation: Array<{
    component: string;
    healthy: boolean;
    certifiedPreserved: boolean;
    details: string;
  }>;
  environmentValidation: {
    valid: boolean;
    details: string;
    environments: Array<{
      name: 'development' | 'staging' | 'production';
      valid: boolean;
    }>;
  };
  deploymentValidation: {
    valid: boolean;
    details: string;
    pendingDeployments: number;
    failedDeployments: number;
  };
  releaseValidation: {
    valid: boolean;
    details: string;
    pendingReleases: number;
    failedReleases: number;
  };
  securityValidation: {
    valid: boolean;
    details: string;
    activeAlerts: number;
    secretsManagement: 'compliant' | 'non-compliant' | 'unknown';
  };
  observabilityValidation: {
    valid: boolean;
    details: string;
    healthChecksConfigured: boolean;
    metricsExposed: boolean;
    alertsDefined: boolean;
  };
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    category: string;
    description: string;
    action: string;
  }>;
}

export interface ProductionValidator {
  validateProductionReadiness(): Promise<ValidationResult>;
  validateDeploymentPreparation(plan: any): Promise<{valid: boolean; s10S29Preserved: boolean; verticalIsolation: string; issues: Array<{type: string; description: string; severity: string}>}>;
  validateReleasePreparation(release: any): Promise<{valid: boolean; s10S29Preserved: boolean; verticalIsolation: string; issues: Array<{type: string; description: string; severity: string}>}>;
  validateHealthMonitoring(): Promise<{valid: boolean; healthChecks: Array<{name: string; configured: boolean; critical: boolean}>; metrics: Array<{name: string; exposed: boolean}>; alerts: Array<{name: string; defined: boolean}>}>;
  validateSecurityOperations(): Promise<{valid: boolean; secretsManagement: string; operatorAccess: string; auditLogging: string; backups: string}>;
  validateObservabilityFoundation(): Promise<{valid: boolean; logging: string; metrics: string; alerts: string; healthChecks: string}>;
  getValidationSummary(): Promise<{overall: string; s10S29Preserved: boolean; verticalIsolation: string; readyForProduction: boolean}>;
}

export default ProductionValidator;