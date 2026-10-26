/**
 * @fileoverview Organization Context Model
 * 
 * Represents organization - does NOT represent a vertical company.
 * Is universal and organization-agnostic.
 * Does NOT tie to Legal/Medical/Business verticals.
 * 
 * Principles:
 * - Universal, not vertical-specific
 * - Reference-only, no business data
 * - Composable within SystemContext
 * 
 * @version 0.1.0
 * @status Foundation
 */

export interface OrganizationContext {
  organizationId: string;
  name: string;
  status: string;
}