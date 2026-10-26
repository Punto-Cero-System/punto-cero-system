/**
 * @fileoverview Punto Cero System - Context Engine Foundation
 * 
 * Universal context management providing:
 * - Context identity resolution
 * - Organization context
 * - Workspace context
 * - License context
 * - System context composition
 * 
 * Principles:
 * - No authentication implementation
 * - No user management
 * - No vertical integration (Legal/Medical/Business)
 * - No Core L1 modification
 * - Dependency only on punto-cero-contracts
 * 
 * Version: 0.1.0
 * Status: Foundation - models and types only
 */

// Export all context models and types
export * from './context';
export * from './models';
export * from './resolver';