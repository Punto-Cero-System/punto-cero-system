/**
 * Commercial Validator for S31 Commercial Foundation
 * 
 * Validates commercial operations: consumer existence, contract validity,
 * country eligibility, currency validity, and S26++/S29/S30 compatibility
 * 
 * Constraint: NO lógica vertical, solo validaciones universales
 */

import { SystemPlan } from '../models/SystemPlan';
import { SystemLicense } from '../models/SystemLicense';
import { CommercialAccount } from '../models/CommercialAccount';
import { SubscriptionState } from '../models/SubscriptionState';

export interface CommercialValidatorConfig {
  /** Require consumer existence in ConsumerRegistry */
  requireConsumerExists: boolean;
  /** Require plan validity validation */
  requirePlanValidation: boolean;
  /** Require country eligibility check */
  requireCountryCheck: boolean;
  /** Require currency eligibility check */
  requireCurrencyCheck: boolean;
  /** Enable S26++ compatibility check */
  checkS26Compatibility: boolean;
  /** Enable S29/S30 integration check */
  checkS29S30Integration: boolean;
}

export interface ValidationResult {
  /** Overall validation status */
  valid: boolean;
  /** Validation timestamp */
  timestamp: Date;
  /** S10-S30 preservation flag */
  s10S30Preserved: boolean;
  /** Vertical isolation flag */
  verticalIsolation: 'maintained' | 'compromised' | 'unknown';
  /** Plan validation */
  planValidation: {
    valid: boolean;
    plan: SystemPlan | null;
    issues: Array<{
      type: 'planNotFound' | 'planInactive' | 'countryNotSupported' | 'currencyNotSupported' | 'consumerMismatch';
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  };
  /** License validation */
  licenseValidation: {
    valid: boolean;
    license: SystemLicense | null;
    issues: Array<{
      type: 'licenseNotFound' | 'licenseExpired' | 'consumerNotFound' | 'planMismatch';
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  };
  /** Account validation */
  accountValidation: {
    valid: boolean;
    account: CommercialAccount | null;
    issues: Array<{
      type: 'accountNotFound' | 'invalidCountry' | 'invalidCurrency' | 'consumerMismatch';
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  };
  /** Subscription validation */
  subscriptionValidation: {
    valid: boolean;
    state: SubscriptionState | null;
    issues: Array<{
      type: 'stateNotFound' | 'invalidTransition' | 'consumerMismatch';
      description: string;
      severity: 'critical' | 'warning' | 'info';
    }>;
  };
  /** S26++ compatibility */
  s26Compatibility: {
    compatible: boolean;
    details: string;
    billingIntegration: 'compatible' | 'partial' | 'incompatible';
  };
  /** S29/S30 integration */
  s29S30Integration: {
    operationsCompatible: boolean;
    productionCompatible: boolean;
    details: string;
  };
  /** Recommendations */
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    category: string;
    description: string;
    action: string;
  }>;
}

export interface CommercialValidator {
  /** Validate full commercial operation */
  validateCommercialOperation(
    planId: string,
    consumerId: string,
    country: string,
    currency: string
  ): Promise<ValidationResult>;
  
  /** Validate plan creation */
  validatePlanCreation(plan: Omit<SystemPlan, 'createdAt' | 'updatedAt'>): Promise<{
    valid: boolean;
    issues: Array<{type: string; description: string; severity: string}>;
    s10S30Preserved: boolean;
  }>;
  
  /** Validate license issuance */
  validateLicenseIssuance(
    licenseId: string,
    consumerId: string,
    planId: string
  ): Promise<{
    valid: boolean;
    issues: Array<{type: string; description: string; severity: string}>;
    s10S30Preserved: boolean;
  }>;
  
  /** Validate account creation */
  validateAccountCreation(
    account: Omit<CommercialAccount, 'createdAt' | 'updatedAt'>
  ): Promise<{
    valid: boolean;
    issues: Array<{type: string; description: string; severity: string}>;
    s10S30Preserved: boolean;
  }>;
  
  /** Validate subscription state change */
  validateSubscriptionStateChange(
    accountId: string,
    from: SubscriptionState,
    to: SubscriptionState
  ): Promise<{
    valid: boolean;
    issues: Array<{type: string; description: string; severity: string}>;
    s10S30Preserved: boolean;
  }>;
  
  /** Get validation summary */
  getValidationSummary(): Promise<{
    overall: 'pass' | 'warning' | 'critical';
    s10S30Preserved: boolean;
    verticalIsolation: 'maintained' | 'compromised' | 'unknown';
    readyForOperation: boolean;
  }>;
}

export default CommercialValidator;