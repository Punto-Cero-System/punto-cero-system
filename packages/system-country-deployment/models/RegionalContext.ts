# models - RegionalContext.ts
/**
 * RegionalContext model for S39 Global Country Deployment Foundation.
 * Regional configuration within each country - no vertical data, no real regions.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S37 Global Administration,
 * S38 Multi-Tenant observer pattern, S29 Operations.
 * Regional identification only, observer pattern only, no new regions created.
 */

export interface RegionalContext {
  regionId: string;           // Universal region identifier
  countryId: string;          // S11 Identity reference to parent country
  regionName: string;         // Generic region name
  status: string;             // S12 Authorization status
  operatorTier: 'Global' | 'Regional' | 'Country' | 'Tenant';
  configuration: object;      // S31 Commercial regional config
  tenantCount: number;        // S38 Multi-Tenant link count
  operator: string;           // S11 Identity reference to regional operator
  createdAt?: string;         // Timestamp observer
  updatedAt?: string;         // Timestamp observer
}