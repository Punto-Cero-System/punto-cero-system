/**
 * @fileoverview Punto Cero System - Universal Adapter Models S14
 * Universal Adapter request/response models with universal fields only.
 * No vertical business logic. Declarative capabilities only.
 * Version: 0.1.0
 * Status: S14 - Universal Adapter models
 */

export interface AdapterRequest {
  requestId: string;
  consumerId: string;
  consumerType: 'legal' | 'medical' | 'business' | 'One';
  contextId: string;
  capability: string;
  payload: any; // Opaque - no business interpretation
  timestamp: string; // ISO date string
  headers?: Record<string, string>;
}

export interface AdapterResponse {
  success: boolean;
  requestId: string;
  consumerId: string;
  capability: string;
  data?: any; // Opaque response data
  error?: string;
  authorization: {
    decision: 'allowed' | 'denied';
    reason: string;
  };
  timestamp: string; // ISO date string
}