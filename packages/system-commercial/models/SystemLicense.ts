/**
 * SystemLicense Model for S31 Commercial Foundation
 * 
 * Defines license management between System and L2 Consumers
 * 
 * Constraint: NO lógica vertical, solo relación System↔L2 Consumer
 */

export interface SystemLicense {
  /** License unique identifier */
  licenseId: string;
  /** Consumer L2 ID (referencia a ConsumerRegistry S13) */
  consumerId: string;
  /** Plan reference */
  planId: string;
  /** License start date */
  startDate: Date;
  /** License end date */
  endDate: Date;
  /** License status */
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED' | 'CANCELLED';
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}