/**
 * CommercialAccount Model for S31 Commercial Foundation
 * 
 * Defines commercial accounts between System and L2 Consumers
 * 
 * Constraint: NO lógica vertical, países y monedas son códigos ISO universales
 */

export interface CommercialAccount {
  /** Account unique identifier */
  accountId: string;
  /** Tenant ID (S11.2) */
  tenantId: string;
  /** Consumer L2 ID (referencia a ConsumerRegistry S13) */
  consumerId: string;
  /** Country ISO code (universal, no vertical-specific) */
  country: 'US' | 'CA' | 'UK' | 'DE' | 'FR' | 'JP' | 'AU' | 'SG' | 'ZA' | string;
  /** Currency ISO code (universal) */
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | string;
  /** Account status */
  status: 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
  /** Associated plan */
  planId: string;
  /** Subscription state */
  subscriptionState: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED' | 'CANCELLED';
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}