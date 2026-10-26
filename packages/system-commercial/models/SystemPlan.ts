/**
 * SystemPlan Model for S31 Commercial Foundation
 * 
 * Defines universal commercial plans for System administration
 * 
 * Constraint: NO lógica vertical (Legal/Medical/Business/One)
 * S31: Planes universales solo, códigos ISO para países/monedas
 */

export interface SystemPlan {
  /** Plan unique identifier */
  planId: string;
  /** Plan name (universal, no vertical-specific) */
  name: string;
  /** Plan type (universal codes only) */
  type: 'STANDARD' | 'PREMIUM' | 'ENTERPRISE' | 'BASIC';
  /** Plan status */
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  /** Country availability (ISO universal codes, no vertical-specific) */
  countryAvailability: Array<'US' | 'CA' | 'UK' | 'DE' | 'FR' | 'JP' | 'AU' | 'SG' | 'ZA' | string>;
  /** Currency support (ISO universal codes) */
  currencySupport: Array<'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY'>;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}