// @fileoverview Punto Cero System - ConsumerRegistry Service S13 Tests
import { DefaultConsumerRegistry } from './registry';
import { ConsumerUniversal } from '../models/ConsumerUniversal';

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
      expect(result).not.toBeNull();
      expect(result?.consumerId).toBe('consumer-001');
      expect(result?.consumerType).toBe('legal');
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
    });

    it('should return empty list when no consumers registered', async () => {
      const result = await registry.listConsumers();
      expect(result.length).toBe(0);
    });
  });

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