/**
 * @fileoverview Punto Cero System - Universal Adapter Implementation S14
 * Universal Adapter: Frontera oficial entre System Core y consumidores L2
 * No implementa lógica vertical. Solo validación, routing y normalización.
 * Version: 0.1.0
 * Status: S14 - Universal Adapter implementation
 */

import { AdapterRequest, AdapterResponse } from './models/AdapterModels';
import { ConsumerRegistry } from '../consumer-registry/src/models/registry';
import { ContextEngine } from '../context-engine';
import { AuthorizationFoundation } from '../authorization-foundation';

export class UniversalAdapter {
  private registry: ConsumerRegistry;
  private contextEngine: ContextEngine;
  private authFoundation: AuthorizationFoundation;
  private initialized: boolean = false;

  constructor() {
    this.registry = new ConsumerRegistry();
    this.contextEngine = new ContextEngine();
    this.authFoundation = new AuthorizationFoundation();
  }

  async initialize(): Promise<void> {
    this.initialized = true;
  }

  async validateConsumer(consumerId: string, consumerType: 'legal' | 'medical' | 'business' | 'One'): Promise<boolean> {
    if (!this.initialized) await this.initialize();
    const consumer = this.registry.getConsumer(consumerId);
    if (!consumer || consumer.consumerType !== consumerType) return false;
    const validation = this.registry.validateConsumer(consumer as any);
    return validation.valid;
  }

  async validateContext(contextId: string): Promise<boolean> {
    if (!this.initialized) await this.initialize();
    return contextId && contextId.trim().length > 0;
  }

  async checkAuthorization(consumerId: string, capability: string): Promise<{ decision: 'allowed' | 'denied'; reason: string }> {
    if (!this.initialized) await this.initialize();
    const consumer = this.registry.getConsumer(consumerId);
    if (!consumer) return { decision: 'denied', reason: 'Consumer not found' };
    const validation = this.registry.validateConsumer(consumer as any);
    return validation.authorization ?? { decision: 'denied', reason: 'Authorization check failed' };
  }

  async executeCapability(request: AdapterRequest): Promise<AdapterResponse> {
    if (!this.initialized) await this.initialize();

    // Step 1: Validate consumer
    const consumerValid = await this.validateConsumer(request.consumerId, request.consumerType);
    if (!consumerValid) {
      return {
        success: false,
        requestId: request.requestId,
        consumerId: request.consumerId,
        capability: request.capability,
        error: 'Consumer validation failed',
        authorization: { decision: 'denied', reason: 'Invalid consumer' },
        timestamp: new Date().toISOString()
      };
    }

    // Step 2: Validate context
    const contextValid = await this.validateContext(request.contextId);
    if (!contextValid) {
      return {
        success: false,
        requestId: request.requestId,
        consumerId: request.consumerId,
        capability: request.capability,
        error: 'Context validation failed',
        authorization: { decision: 'denied', reason: 'Invalid context' },
        timestamp: new Date().toISOString()
      };
    }

    // Step 3: Check authorization
    const authResult = await this.checkAuthorization(request.consumerId, request.capability);
    if (authResult.decision !== 'allowed') {
      return {
        success: false,
        requestId: request.requestId,
        consumerId: request.consumerId,
        capability: request.capability,
        error: authResult.reason,
        authorization: authResult,
        timestamp: new Date().toISOString()
      };
    }

    // Step 4: Execute capability routing (opaque payload, no business interpretation)
    return {
      success: true,
      requestId: request.requestId,
      consumerId: request.consumerId,
      capability: request.capability,
      data: { routed: true, payloadType: typeof request.payload },
      authorization: { decision: 'allowed', reason: 'Capability executed successfully' },
      timestamp: new Date().toISOString()
    };
  }

  normalizeResponse(response: any): AdapterResponse {
    return {
      success: response.success ?? false,
      requestId: requestId || '',
      consumerId: response.consumerId || '',
      capability: response.capability || '',
      data: response.data,
      error: response.error,
      authorization: response.authorization || { decision: 'denied', reason: 'Unknown error' },
      timestamp: response.timestamp || new Date().toISOString()
    };
  }
}