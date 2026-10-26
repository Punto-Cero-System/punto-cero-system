/**
 * @module PuntoCeroContextEngine
 * 
 * Context models representing universal context without business logic.
 * 
 * These models provide the structural foundation for understanding:
 * - Who is interacting (identity)
 * - Under what organization
 * - In what workspace
 * - Under what license
 * - In what operational context
 * 
 * Key principles:
 * - Reference-only models (no database, no API integration)
 * - No authentication state
 * - No user session management
 * - No vertical-specific roles (Legal/Medical/Business)
 * - Composable via SystemContext
 */

/// <reference types="punto-cero-contracts" />

/**
 * ContextIdentity - Represents identity contextual.
 * 
 * Contains only references, no real identity data.
 * Used to understand who is interacting with the system
 * in a purely contextual manner.
 * 
 * @property identityId - Unique identifier for the context identity (reference)
 * @property type - Type of identity context (reference)
 * @property status - Status of the identity context (reference)
 */
export interface ContextIdentity {
  identityId: string;
  type: string;
  status: string;
}

/**
 * OrganizationContext - Represents organization.
 * 
 * Does NOT represent a vertical company.
 * Is universal and organization-agnostic.
 * Used to understand the organizational context
 * without tying to Legal/Medical/Business verticals.
 * 
 * @property organizationId - Unique identifier for the organization (reference)
 * @property name - Organization name (reference)
 * @property status - Organization context status (reference)
 */
export interface OrganizationContext {
  organizationId: string;
  name: string;
  status: string;
}

/**
 * WorkspaceContext - Represents operational space.
 * 
 * Does NOT create internal functions or operations.
 * Represents the workspace/environment context
 * where the system is operating.
 * 
 * @property workspaceId - Unique identifier for the workspace (reference)
 * @property organizationId - Associated organization (reference)
 * @property type - Workspace type (reference)
 * @property status - Workspace context status (reference)
 */
export interface WorkspaceContext {
  workspaceId: string;
  organizationId: string;
  type: string;
  status: string;
}

/**
 * LicenseContext - Represents license reference.
 * 
 * Does NOT implement commercial payments or real licensing.
 * Provides only the contextual reference of the license
 * under which the system is operating.
 * 
 * @property licenseId - Unique identifier for the license (reference)
 * @property type - License type (reference)
 * @property status - License context status (reference)
 */
export interface LicenseContext {
  licenseId: string;
  type: string;
  status: string;
}

/**
 * SystemContext - Model composed of all context elements.
 * 
 * Allows combining:
 * - Identity
 * - Organization
 * - Workspace
 * - License
 * 
 * Without business logic. Pure structural composition
 * for understanding the operational context of the system.
 * 
 * @property identity - Context identity reference
 * @property organization - Organization context reference
 * @property workspace - Workspace context reference
 * @property license - License context reference
 */
export interface SystemContext {
  identity: ContextIdentity;
  organization: OrganizationContext;
  workspace: WorkspaceContext;
  license: LicenseContext;
}