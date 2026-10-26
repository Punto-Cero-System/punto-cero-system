# validators - CountryDeploymentValidator.ts
/**
 * CountryDeployment validator for S39 Global Country Deployment Foundation.
 * Universal validator only - no vertical data, no SDK, no gateway.
 * Enforces bypassAuthorization: false, rejects vertical data.
 * Governed by Core L1 (S10-S23), reuses S11 Identity, S12 AuthorizationFoundation, S13 ConsumerRegistry, S31 Commercial, S37 Global Administration, S38 Multi-Tenant.
 */
export interface CountryValidationResult {
  valid: boolean;
  reason?: string;
  verticalProhibited: boolean;
  bypassAuthorization: boolean;
}