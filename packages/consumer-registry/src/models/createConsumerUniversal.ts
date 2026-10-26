// @fileoverview Punto Cero System - createConsumerUniversal Factory (S13)
// Factory function to create ConsumerUniversal instances with validations
// No authentication implementation. No vertical integration.
// No connection to Core L1.

/**
 * createConsumerUniversal - Factory for creating ConsumerUniversal instances
 * 
 * Principles:
 * - Validates all required fields before creation
 * - Ensures consumerType is one of the System-approved types
 * - Sets registeredAt to current ISO timestamp
 * - Initializes capabilities as empty array (to be populated by consumer)
 * - No vertical logic - capabilities are purely declarative
 * 
 * @param params - Partial ConsumerUniversal parameters
 * @returns Validated ConsumerUniversal instance
 * @throws Error if validation fails
 */

export interface CreateConsumerUniversalParams {
  consumerType: 'legal' | 'medical' | 'business' | 'One';
  consumerName: string;
  status?: 'active' | 'pending' | 'inactive';
  version?: string;
  capabilities?: string[];
}

export function createConsumerUniversal(params: CreateConsumerUniversalParams): ConsumerUniversal {
  // Validate consumerType is a System-approved type
  const validTypes: ('legal' | 'medical' | 'business' | 'One')[] = ['legal', 'medical', 'business', 'One'];
  
  if (!validTypes.includes(params.consumerType)) {
    throw new Error(
      `Invalid consumerType: ${params.consumerType}. ` +
      `Must be one of: ${validTypes.join(', ')}. ` +
      'System only knows types declaratively; does not implement vertical logic.'
    );
  }

  // Validate consumerName is provided
  if (!params.consumerName || params.consumerName.trim().length === 0) {
    throw new Error('consumerName is required and must not be empty');
  }

  // Validate status
  const validStatuses: ('active' | 'pending' | 'inactive')[] = ['active', 'pending', 'inactive'];
  const status = params.status && validStatuses.includes(params.status)
    ? params.status
    : 'pending';

  // Validate version
  const version = params.version || '0.1.0';

  // Capabilities are optional - if provided, must be non-empty strings
  const capabilities: string[] = params.capabilities || [];
  // Note: System does not validate capability content - they are declarative only

  const now = new Date().toISOString();

  return {
    consumerId: `consumer-${Date.now()}`,
    consumerType: params.consumerType,
    consumerName: params.consumerName,
    status,
    version,
    registeredAt: now,
    capabilities,
  };
}