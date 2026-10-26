// @fileoverview Punto Cero System - Consumer Registry S13 Tests
import { ConsumerUniversal } from './ConsumerUniversal';
import { createConsumerUniversal } from './createConsumerUniversal';
import { DefaultConsumerRegistry } from '../registry';

describe('S13 - ConsumerUniversal Model', () => {
  it('should create ConsumerUniversal with all required fields', () => {
    const consumer: ConsumerUniversal = {
      consumerId: 'consumer-001',
      consumerType: 'legal' as const,
      consumerName: 'LegalDocs',
      status: 'active',
      version: '0.1.0',
      registeredAt: '2026-10-23T10:00:00Z',
      capabilities: ['legal.documents'],
    };

    expect(consumer.consumerId).toBe('consumer-001');
    expect(consumer.consumerType).toBe('legal');
describe('S13 - createConsumerUniversal Factory', () => {
  it('should create a ConsumerUniversal with legal type', () => {
    const consumer = createConsumerUniversal({
      consumerType: 'legal',
      consumerName: 'LegalDocs',
    });

    expect(consumer.consumerType).toBe('legal');
    expect(consumer.consumerName).toBe('LegalDocs');
    expect(consumer.consumerId).toBeDefined();
    expect(consumer.registeredAt).toBeDefined();
    expect(Array.isArray(consumer.capabilities)).toBe(true);
  });

  it('should create a ConsumerUniversal with medical type', () => {
    const consumer = createConsumerUniversal({
      consumerType: 'medical',
      consumerName: 'MedicalRecords',
      capabilities: ['medical.records'],
    });
describe('S13 - ConsumerRegistry Service', () => {
  let registry: DefaultConsumerRegistry;

  beforeEach(() => {
    registry = new DefaultConsumerRegistry();
  });

  describe('registerConsumer', () => {
    it('should register a valid consumer', async () => {
      const consumer: ConsumerUniversal = {
        consumerId: 'consumer-001',
        consumerType: 'legal' as const,
        consumerName: 'LegalDocs',
        status: 'active',
        version: '0.1.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: ['legal.documents'],
      };

      const result = await registry.registerConsumer(consumer);
describe('validateConsumer', () => {
    it('should validate a valid consumer', () => {
      const consumer: ConsumerUniversal = {
        consumerId: 'consumer-001',
        consumerType: 'legal' as const,
        consumerName: 'LegalDocs',
        status: 'active',
        version: '0.1.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: ['legal.documents'],
      };

      const result = registry.validateConsumer(consumer);
      expect(result.valid).toBe(true);
      expect(result.consumer).not.toBeNull();
      expect(result.errors.length).toBe(0);
      expect(result.authorization?.decision).toBe('allowed');
    });

    it('should invalidate a consumer with invalid consumerType', () => {
      const consumer: any = {
        consumerId: 'consumer-001',
        consumerType: 'invalid_type' as any,
        consumerName: 'LegalDocs',
        status: 'active',
        version: '0.1.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: ['legal.documents'],
      };

      const result = registry.validateConsumer(consumer as ConsumerUniversal);
      expect(result.valid).toBe(false);
      expect(result.errors.includes('Invalid consumerType')).toBe(true);
      expect(result.authorization?.decision).toBe('denied');
    });

    it('should provide authorization decision for denied consumers', () => {
      const consumer: any = {
        consumerId: 'consumer-001',
        consumerType: 'invalid_type' as any,
        consumerName: 'LegalDocs',
        status: 'active',
        version: '0.1.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: [],
      };

      const result = registry.validateConsumer(consumer as ConsumerUniversal);
      expect(result.authorization).toBeDefined();
      expect(result.authorization?.decision).toBe('denied');
      expect(typeof result.authorization?.reason).toBe('string');
    });
  });

  describe('updateConsumerStatus', () => {
    it('should update consumer status to active', async () => {
      const consumer: ConsumerUniversal = {
        consumerId: 'consumer-001',
        consumerType: 'business' as const,
        consumerName: 'BusinessInv',
        status: 'pending',
        version: '0.1.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: ['business.inventory'],
      };

      await registry.registerConsumer(consumer);
      const result = await registry.updateConsumerStatus('consumer-001', 'active');

      expect(result).not.toBeNull();
      expect(result?.status).toBe('active');
    });

    it('should return null when updating non-existent consumer', async () => {
      const result = await registry.updateConsumerStatus('non-existent', 'active');
      expect(result).toBeNull();
    });
  });
});
      expect(result).not.toBeNull();
      expect(result?.consumerId).toBe('consumer-001');
      expect(result?.consumerType).toBe('legal');
    });

    it('should update existing consumer when re-registered', async () => {
      const consumer1: ConsumerUniversal = {
        consumerId: 'consumer-001',
        consumerType: 'legal' as const,
        consumerName: 'LegalDocs',
        status: 'active',
        version: '0.1.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: ['legal.documents'],
      };

      const consumer2: ConsumerUniversal = {
        consumerId: 'consumer-001',
        consumerType: 'legal' as const,
        consumerName: 'LegalDocsUpdated',
        status: 'pending',
        version: '0.2.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: ['legal.documents', 'legal.filings'],
      };

      await registry.registerConsumer(consumer1);
      const result = await registry.registerConsumer(consumer2);

      expect(result).not.toBeNull();
      expect(result?.consumerName).toBe('LegalDocsUpdated');
      expect(result?.status).toBe('pending');
      expect(result?.version).toBe('0.2.0');
      expect(result?.capabilities).toEqual(['legal.documents', 'legal.filings']);
    });
  });

  describe('getConsumer', () => {
    it('should get a registered consumer by ID', async () => {
      const consumer: ConsumerUniversal = {
        consumerId: 'consumer-001',
        consumerType: 'medical' as const,
        consumerName: 'MedicalRecords',
        status: 'active',
        version: '1.0.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: ['medical.records'],
      };

      await registry.registerConsumer(consumer);
      const result = await registry.getConsumer('consumer-001');

      expect(result).not.toBeNull();
      expect(result?.consumerId).toBe('consumer-001');
      expect(result?.consumerName).toBe('MedicalRecords');
    });

    it('should return null for non-existent consumer', async () => {
      const result = await registry.getConsumer('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('listConsumers', () => {
    it('should list all registered consumers', async () => {
      const consumer1: ConsumerUniversal = {
        consumerId: 'consumer-001',
        consumerType: 'legal' as const,
        consumerName: 'LegalDocs',
        status: 'active',
        version: '0.1.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: ['legal.documents'],
      };

      const consumer2: ConsumerUniversal = {
        consumerId: 'consumer-002',
        consumerType: 'business' as const,
        consumerName: 'BusinessInv',
        status: 'pending',
        version: '0.1.0',
        registeredAt: '2026-10-23T10:00:00Z',
        capabilities: ['business.inventory'],
      };

      await registry.registerConsumer(consumer1);
      await registry.registerConsumer(consumer2);

      const result = await registry.listConsumers();
      expect(result.length).toBe(2);
      expect(result).toContain(consumer1);
      expect(result).toContain(consumer2);
    });

    it('should return empty list when no consumers registered', async () => {
      const result = await registry.listConsumers();
      expect(result.length).toBe(0);
    });
  });
});

    expect(consumer.consumerType).toBe('medical');
    expect(consumer.consumerName).toBe('MedicalRecords');
    expect(consumer.capabilities).toEqual(['medical.records']);
  });

  it('should create a ConsumerUniversal with business type', () => {
    const consumer = createConsumerUniversal({
      consumerType: 'business',
      consumerName: 'BusinessInv',
    });

    expect(consumer.consumerType).toBe('business');
    expect(consumer.consumerName).toBe('BusinessInv');
  });

  it('should create a ConsumerUniversal with One type', () => {
    const consumer = createConsumerUniversal({
      consumerType: 'One',
      consumerName: 'OneProfile',
    });

    expect(consumer.consumerType).toBe('One');
    expect(consumer.consumerName).toBe('OneProfile');
  });
});
    expect(consumer.consumerName).toBe('LegalDocs');
    expect(consumer.status).toBe('active');
    expect(consumer.version).toBe('0.1.0');
    expect(consumer.registeredAt).toBe('2026-10-23T10:00:00Z');
    expect(consumer.capabilities).toEqual(['legal.documents']);
  });
});