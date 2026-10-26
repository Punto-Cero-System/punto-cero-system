/**
 * @fileoverview System Context Model
 * 
 * Model composed of all context elements: Identity + Organization + Workspace + License.
 * Allows combining all context components without business logic.
 * Pure structural composition for understanding the operational context of the system.
 * 
 * Principles:
 * - Composition of all context types
 * - No business logic implementation
 * - Composable reference structure
 * - Foundation for context resolution
 * 
 * @version 0.1.0
 * @status Foundation
 */

export interface SystemContext {
  identity: ContextIdentity;
  organization: OrganizationContext;
  workspace: WorkspaceContext;
  license: LicenseContext;
}