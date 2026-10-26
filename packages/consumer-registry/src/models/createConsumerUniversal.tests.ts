// @fileoverview Punto Cero System - createConsumerUniversal Factory S13 Tests
import { createConsumerUniversal } from './createConsumerUniversal';

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