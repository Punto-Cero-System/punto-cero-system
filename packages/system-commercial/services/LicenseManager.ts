/**
 * License Manager Service for S31 Commercial Foundation
 * 
 * Controls license lifecycle, validation, and compliance
 * 
 * Constraint: NO lógica vertical, solo control System↔L2 Consumer
 */

import { SystemLicense } from '../models/SystemLicense';
import { CommercialAccount } from '../models/CommercialAccount';
import { SystemPlan } from '../models/SystemPlan';

export interface LicenseManagerConfig {
  /** Maximum license duration in days */
  maxLicenseDuration: number;
  /** Enable automatic license expiration check */
  autoExpire: boolean;
  /** Require plan validation before license issuance */
  requirePlanValidation: boolean;
}

export interface LicenseManager {
  /** Issue a new license */
  issueLicense(license: Omit<SystemLicense, 'createdAt' | 'updatedAt'>): Promise<SystemLicense>;
  
  /** Renew an existing license */
  renewLicense(licenseId: string, newEndDate: Date): Promise<SystemLicense | null>;
  
  /** Suspend a license */
  suspendLicense(licenseId: string, reason: string): Promise<SystemLicense | null>;
  
  /** Reactivate a suspended license */
  reactivateLicense(licenseId: string): Promise<SystemLicense | null>;
  
  /** Expire a license */
  expireLicense(licenseId: string, reason: string): Promise<SystemLicense | null>;
  
  /** Get license status */
  getLicenseStatus(licenseId: string): Promise<{
    status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED' | 'CANCELLED';
    currentPeriodEnd?: Date;
    daysRemaining?: number;
  }>;
  
  /** List all licenses */
  listAllLicenses(): Promise<Array<{
    licenseId: string;
    consumerId: string;
    planId: string;
    status: string;
    startDate: Date;
    endDate: Date;
  }>>;
  
  /** Validate license-connection compatibility */
  validateLicenseCompatibility(licenseId: string): Promise<{
    valid: boolean;
    consumerExists: boolean;
    planExists: boolean;
    consumerMatch: boolean;
  }>;
  
  /** Check license expiration */
  checkExpiration(licenseId: string): Promise<{
    expired: boolean;
    daysUntilExpiration: number;
    status: 'VALID' | 'EXPIRED' | 'SOON';
  }>;
}

export default LicenseManager;