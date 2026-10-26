# models - CountryConfiguration.ts
/**
 * CountryConfiguration model for S39 Global Country Deployment Foundation.
 * Universal configuration only - no vertical data, no real taxes, no real laws.
 * Reuses existing S31 Commercial Foundation, S11 Identity, S12 AuthorizationFoundation.
 * Configuration identification only, observer pattern only, no new configuration created.
 */

export interface CountryConfiguration {
  countryId: string;          // S11 Identity reference
  language: string;           // Universal language code (no real locale)
  currency: string;           // Universal currency code (no real currency)
  timezone: string;           // Universal timezone (UTC default)
  operationalConfig: object;  // S31 Commercial operational config
  commercialConfig: object;   // S31 Commercial configuration
  status: string;             // S12 Authorization bypassAuthorization: false
  isActive: boolean;          // Observer pattern flag
  configurationId: string;    // Unique config identifier
  createdAt?: string;         // Timestamp observer
  updatedAt?: string;         // Timestamp observer
}