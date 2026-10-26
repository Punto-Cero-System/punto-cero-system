// @fileoverview Punto Cero System - Consumer Identity Model
// Universal consumer identity: consumerId, type, version, status, metadata
// No authentication implementation. No vertical integration.
// No connection to Core L1. Conceptual registry model only.

/**
 * ConsumerIdentity - Model for consumer identification
 * 
 * Principles:
 * - No authentication implementation
 * - No user management
 * - No vertical integration (Legal/Medical/Business)
 * - Dependency only on contracts (read-only)
 * - Version: 0.1.0
 * Status: Foundation - types and interfaces only
 */

export interface ConsumerIdentity {
  consumerId: string;
  type: string;
  version: string;
  status: string;
  metadata: Record<string, any>;
}