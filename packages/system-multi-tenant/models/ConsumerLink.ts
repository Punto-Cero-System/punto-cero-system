# models - ConsumerLink.ts
/**
 * Consumer link model for S38 Multi-Tenant.
 * Universal model only - no vertical data, no SDK, no gateway.
 * Reuses existing S13 ConsumerRegistry, links to S29-S31 L2 consumers.
 * Observer pattern only, no direct data access.
 */

export interface ConsumerLink {
  id: string; // S13 reference
  tenantId: string; // S11/S13 tenant reference
  consumerL2Id: string; // S29-S31 L2 consumer reference
  linkType: 'operations' | 'production' | 'commercial' | 'control-plane' | 'intelligence';
  status: 'active' | 'inactive' | 'observed';
  created: string;
  lastModified: string;
}