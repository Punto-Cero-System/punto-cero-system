// @fileoverview Punto Cero System - Consumer Universal Model (S13)
// Universal consumer declaration for L2 registry
// No authentication implementation. No vertical integration.
// No connection to Core L1. Conceptual registry model only.

/**
 * ConsumerUniversal - S13 Universal consumer model
 * 
 * Principles:
 * - No authentication implementation
 * - No user management
 * - No vertical integration (Legal/Medical/Business)
 * - Dependency only on contracts (read-only)
 * - Version: 0.1.0
 * Status: S13 - Universal consumer registry model
 * 
 * Fields are minimal and System-owned only:
 * - consumerId: System-generated unique identifier
 * - consumerType: declared type (legal/medical/business/One) - System knows type but not logic
 * - consumerName: human-readable name
 * - status: current state (active/pending/inactive)
 * - version: consumer version declaration
 * - registeredAt: registration timestamp
 * - capabilities: declarative only - what consumer claims, System doesn't implement
 */

export interface ConsumerUniversal {
  consumerId: string;
  consumerType: 'legal' | 'medical' | 'business' | 'One';
  consumerName: string;
  status: 'active' | 'pending' | 'inactive';
  version: string;
  registeredAt: string; // ISO date string
  capabilities: string[]; // Declarative only, no vertical logic
}