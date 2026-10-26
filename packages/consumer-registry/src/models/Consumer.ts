// @fileoverview Punto Cero System - Consumer Model
// Universal consumer declaration: identity, type, version, status, capabilities
// No authentication implementation. No vertical integration.
// No connection to Core L1. Conceptual registry model only.

/**
 * Consumer - Main consumer model for registry
 * 
 * Principles:
 * - No authentication implementation
 * - No user management
 * - No vertical integration (Legal/Medical/Business)
 * - Dependency only on contracts (read-only)
 * - Version: 0.1.0
 * Status: Foundation - types and interfaces only
 */

export interface Consumer {
  id: string;
  identity: ConsumerIdentity;
  declaredCapabilities: string[];
  metadata: Record<string, any>;
}