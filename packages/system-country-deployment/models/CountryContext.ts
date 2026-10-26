# models - CountryContext.ts
/**
 * CountryContext model for S39 Global Country Deployment Foundation.
 * Universal model only - no vertical data, no real countries, no real companies.
 * Reuses existing S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration.
 * Country identification only, observer pattern only, no new countries created.
 */

export interface CountryContext {
  countryId: string;          // S11 Identity universal
  countryCode: string;        // ISO-3166 universal (no real country)
  countryName: string;        // Generic country name
  status: string;             // S12 Authorization status
  configuration: object;      // S31 Commercial configuration
  currencyContext: object;    // S31 currency universal
  timezoneContext: string;    // S37 Administration
  lifecycleState: string;     // S37 lifecycle
  tenantLinkCount: number;    // S38 Multi-Tenant link count
  regionCount: number;        // S37 region count
  createdAt?: string;         // Timestamp observer
  updatedAt?: string;         // Timestamp observer
}