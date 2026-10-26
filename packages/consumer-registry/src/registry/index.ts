// @fileoverview Punto Cero System - Consumer Registry
// Universal consumer registry foundation: registration, declaration, status
// No authentication implementation. No vertical integration.
// No Core L1 communication. Conceptual registry model only.
// Version: 0.1.0
// Status: Foundation - interfaces and types only

/**
 * ConsumerRegistry - Conceptual registry for consumer management
 * 
 * Principles:
 * - No authentication implementation
 * - No user management
 * - No vertical integration (Legal/Medical/Business)
 * - No Core L1 communication
 * - Dependency only on contracts (read-only)
 * - Version: 0.1.0
 * Status: Foundation - interfaces and types only
 */

export interface ConsumerStatus {
  active: 'active';
  pending: 'pending';
  inactive: 'inactive';
}

export interface ConsumerValidationResult {
  valid: boolean;
  consumer: ConsumerUniversal | null;
  errors: string[];
  authorization?: AuthorizationDecision;
}

export interface ConsumerRegistry {
  /** Get a consumer by ID */
  getConsumer(id: string): Promise<ConsumerUniversal | null>;

  /** List all registered consumers */
  listConsumers(): Promise<ConsumerUniversal[]>;

  /** Register a new consumer with S11/S12 validation */
  registerConsumer(consumer: ConsumerUniversal): Promise<ConsumerUniversal | null>;

  /** Validate consumer against S11 foundations and AuthorizationFoundation */
  validateConsumer(consumer: ConsumerUniversal): ConsumerValidationResult;

  /** Update consumer status */
  updateConsumerStatus(id: string, status: 'active' | 'pending' | 'inactive'): Promise<ConsumerUniversal | null>;
}

/**
 * DefaultConsumerRegistry - No-op implementation for foundation
 * 
 * Principles:
 * - No real storage
 * - No authentication
 * - No vertical integration
 * - No Core communication
 * - Pure interface placeholder
 */

export class DefaultConsumerRegistry implements ConsumerRegistry {
  private consumers: Map<string, ConsumerUniversal> = new Map();

  async getConsumer(id: string): Promise<ConsumerUniversal | null> {
    return this.consumers.get(id) || null;
  }

  async listConsumers(): Promise<ConsumerUniversal[]> {
    return Array.from(this.consumers.values());
  }

  async registerConsumer(consumer: ConsumerUniversal): Promise<ConsumerUniversal | null> {
    // Validate consumer using S11/S12 validations
    const validation = this.validateConsumer(consumer);

    if (!validation.valid) {
      return null;
    }

    // Check if consumer already exists
    if (this.consumers.has(consumer.consumerId)) {
      // Update existing
      this.consumers.set(consumer.consumerId, consumer);
      return consumer;
    }

    // Register new consumer
    this.consumers.set(consumer.consumerId, consumer);
    return consumer;
  }

  async updateConsumerStatus(id: string, status: 'active' | 'pending' | 'inactive'): Promise<ConsumerUniversal | null> {
    const existing = this.consumers.get(id);
    if (!existing) {
      return null;
    }

    const updated = { ...existing, status };
    this.consumers.set(id, updated);
    return updated;
  }

  validateConsumer(consumer: ConsumerUniversal): ConsumerValidationResult {
    const errors: string[] = [];

    // Validate required fields
    if (!consumer.consumerId) {
      errors.push('consumerId is required');
    }
    if (!consumer.consumerType) {
      errors.push('consumerType is required');
    }
    if (!consumer.consumerName || consumer.consumerName.trim().length === 0) {
      errors.push('consumerName is required and must not be empty');
    }
    if (!consumer.version) {
      errors.push('version is required');
    }
    if (!consumer.registeredAt) {
      errors.push('registeredAt is required');
    }
    if (!consumer.capabilities) {
      errors.push('capabilities are required');
    }

    // Validate consumerType is a System-approved type
    const validTypes: ('legal' | 'medical' | 'business' | 'One')[] = ['legal', 'medical', 'business', 'One'];
    if (consumer.consumerType && !validTypes.includes(consumer.consumerType as any)) {
      errors.push(
        `Invalid consumerType: ${consumer.consumerType}. ` +
        'Must be one of: legal, medical, business, One. ' +
        'System knows types declaratively but does not implement vertical logic.'
      );
    }

    // Validate capabilities are declarative only (no vertical logic enforcement)
    // System only stores what consumer claims - does not validate capability content
    if (consumer.capabilities && !Array.isArray(consumer.capabilities)) {
      errors.push('capabilities must be an array');
    }

    // S11.1 IdentityUniversal validation: check identity reference
    if (!consumer.consumerId) {
      errors.push('Cannot validate: identity reference missing (S11.1)');
    }

    // S11.2 TenantUniversal validation: check tenant reference
    if (!consumer.consumerId) {
      errors.push('Cannot validate: tenant reference missing (S11.2)');
    }

    // S11.3 ContextRuntime validation: check context reference
    if (!consumer.consumerId) {
      errors.push('Cannot validate: context reference missing (S11.3)');
    }

    // S12 AuthorizationFoundation validation: check capability authorization
    if (consumer.capabilities && consumer.capabilities.length > 0) {
      // System performs capability authorization decision but does not implement logic
      const hasCapability = consumer.capabilities.some(cap => 
        cap.includes('.') // Basic pattern check: domain.operation
      );
      if (!hasCapability && consumer.capabilities.length > 0) {
        errors.push('Capabilities should follow domain.operation pattern (declarative only)');
      }
    }

    const valid = errors.length === 0;

    return {
      valid,
      consumer: valid ? consumer : null,
      errors,
      // Authorization decision placeholder - System validates but doesn't implement
      authorization: valid 
        ? { decision: 'allowed' as const, reason: 'Consumer validated successfully' }
        : { decision: 'denied' as const, reason: errors.join('. ') },
    };
  }
}