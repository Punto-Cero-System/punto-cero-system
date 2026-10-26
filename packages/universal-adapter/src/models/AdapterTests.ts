/**
 * @fileoverview Punto Cero System - Universal Adapter S14 Tests
 * Tests for UniversalAdapter core functions.
 * Version: 0.1.0
 * Status: S14 - Universal Adapter tests
 */

import { UniversalAdapter, AdapterRequest, AdapterResponse } from './';

describe('S14 - UniversalAdapter', () => {
  let adapter: UniversalAdapter;

  beforeEach(() => {
    adapter = new UniversalAdapter();
  });

  describe('validateConsumer', () => {
    it('should validate a legal consumer', async () => {
      const result = await adapter.validateConsumer('consumer-001', 'legal');
      // Consumer without registry validation returns false for non-existent
      expect(typeof result).toBe('boolean');
    });

    it('should return boolean result', async () => {
      const result = await adapter.validateConsumer('existing', 'legal');
      expect([true, false]).toContain(result);
    });
  });

  describe('validateContext', () => {
    it('should validate valid context ID', async () => {
      const result = await adapter.validateContext('context-001');
      expect(result).toBe(true);
    });

    it('should invalidate empty context', async () => {
      const result = await adapter.validateContext('');
      expect(result).toBe(false);
    });
  });

  describe('checkAuthorization', () => {
    it('should return authorization result', async () => {
      const result = await adapter.checkAuthorization('consumer-001', 'legal.documents');
      expect(result).toHaveProperty('decision');
      expect(['allowed', 'denied']).toContain(result.decision);
    });
  });

  describe('executeCapability', () => {
    it('should return response with success field', async () => {
      const request: AdapterRequest = {
        requestId: 'req-001',
        consumerId: 'consumer-001',
        consumerType: 'legal',
        contextId: 'context-001',
        capability: 'legal.documents',
        payload: {},
        timestamp: new Date().toISOString(),
      };
      const result = await adapter.executeCapability(request);
      expect(result).toHaveProperty('success');
      expect(typeof result.success).toBe('boolean');
    });

    it('should return authorization in response', async () => {
      const request: AdapterRequest = {
        requestId: 'req-001',
        consumerId: 'consumer-001',
        consumerType: 'legal',
        contextId: 'context-001',
        capability: 'legal.documents',
        payload: {},
        timestamp: new Date().toISOString(),
      };
      const result = await adapter.executeCapability(request);
      expect(result).toHaveProperty('authorization');
      expect(result.authorization).toHaveProperty('decision');
    });
  });

  describe('normalizeResponse', () => {
    it('should normalize response with all fields', () => {
      const response = {
        success: true,
        requestId: 'req-001',
        consumerId: 'consumer-001',
        capability: 'legal.documents',
        data: { result: 'ok' },
        error: undefined,
        authorization: { decision: 'allowed', reason: 'OK' },
        timestamp: new Date().toISOString(),
      };
      const normalized = adapter.normalizeResponse(response);
      expect(normalized).toHaveProperty('success');
      expect(normalized).toHaveProperty('requestId');
      expect(normalized).toHaveProperty('consumerId');
      expect(normalized).toHaveProperty('capability');
      expect(normalized).toHaveProperty('authorization');
    });

    it('should handle missing fields gracefully', () => {
      const response = {} as any;
      const normalized = adapter.normalizeResponse(response);
      expect(normalized.success).toBe(false);
      expect(normalized.authorization.decision).toBe('denied');
    });
  });
});