/**
 * Commercial Manager Service for S31 Commercial Foundation
 * 
 * Manages commercial plans, licensing, and commercial account lifecycle
 * 
 * Constraint: NO lógica vertical, solo administración comercial universal
 */

import { SystemPlan } from '../models/SystemPlan';
import { SystemLicense } from '../models/SystemLicense';
import { CommercialAccount } from '../models/CommercialAccount';
import { SubscriptionState } from '../models/SubscriptionState';

export interface CommercialManagerConfig {
  /** Default license duration in days */
  defaultLicenseDuration: number;
  /** Maximum active subscriptions per consumer */
  maxActiveSubscriptions: number;
  /** Enable plan validation against ConsumerRegistry */
  validatePlanCompatibility: boolean;
}

export interface CommercialManager {
  /** Create a new commercial plan */
  createPlan(plan: Omit<SystemPlan, 'createdAt' | 'updatedAt'>): Promise<SystemPlan>;
  
  /** Get plan by ID */
  getPlan(planId: string): Promise<SystemPlan | null>;
  
  /** List all active plans */
  listPlans(): Promise<Array<SystemPlan>>;
  
  /** Update a commercial plan */
  updatePlan(planId: string, updates: Partial<SystemPlan>): Promise<SystemPlan | null>;
  
  /** Suspend a commercial plan */
  suspendPlan(planId: string, reason: string): Promise<SystemPlan | null>;
  
  /** Issue a new license to L2 Consumer */
  issueLicense(license: Omit<SystemLicense, 'createdAt' | 'updatedAt'>): Promise<SystemLicense>;
  
  /** Get license by ID */
  getLicense(licenseId: string): Promise<SystemLicense | null>;
  
  /** List licenses for a consumer */
  listConsumerLicenses(consumerId: string): Promise<Array<SystemLicense>>;
  
  /** Create a commercial account */
  createAccount(account: Omit<CommercialAccount, 'createdAt' | 'updatedAt'>): Promise<CommercialAccount>;
  
  /** Get commercial account by ID */
  getAccount(accountId: string): Promise<CommercialAccount | null>;
  
  /** List accounts for a consumer */
  listConsumerAccounts(consumerId: string): Promise<Array<CommercialAccount>>;
  
  /** Update commercial account */
  updateAccount(accountId: string, updates: Partial<CommercialAccount>): Promise<CommercialAccount | null>;
  
  /** Change subscription state */
  setSubscriptionState(accountId: string, state: SubscriptionState, reason?: string): Promise<CommercialAccount | null>;
  
  /** Validate plan-consumer compatibility */
  validatePlanConsumerCompatibility(planId: string, consumerId: string): Promise<{
    compatible: boolean;
    reasons: Array<string>;
  }>;
}

export default CommercialManager;