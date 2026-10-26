/**
 * Subscription Manager Service for S31 Commercial Foundation
 * 
 * Manages subscription states for commercial accounts
 * 
 * Constraint: NO lógica vertical, solo estados ACTIVE/SUSPENDED/EXPIRED/CANCELLED
 */

import { CommercialAccount } from '../models/CommercialAccount';
import { SubscriptionState } from '../models/SubscriptionState';

export interface SubscriptionManagerConfig {
  /** Auto-reactivation enabled */
  autoReactivation: boolean;
  /** Maximum suspension duration in days */
  maxSuspensionDays: number;
  /** Health check required before reactivation */
  requireHealthCheck: boolean;
}

export interface SubscriptionManager {
  /** Set subscription state for a commercial account */
  setSubscriptionState(accountId: string, state: SubscriptionState, reason?: string): Promise<{
    success: boolean;
    previousState: SubscriptionState;
    newState: SubscriptionState;
    reason?: string;
  }>;
  
  /** Get current subscription state */
  getSubscriptionState(accountId: string): Promise<{
    state: SubscriptionState;
    startDate: Date;
    reason?: string;
    lastChanged: Date;
  }>;
  
  /** Suspend a subscription */
  suspendSubscription(accountId: string, reason: string): Promise<{
    success: boolean;
    previousState: SubscriptionState;
    newState: SubscriptionState.SUSPENDED;
  }>;
  
  /** Reactivate a suspended subscription */
  reactivateSubscription(accountId: string): Promise<{
    success: boolean;
    previousState: SubscriptionState.SUSPENDED;
    newState: SubscriptionState.ACTIVE;
  }>;
  
  /** Cancel a subscription */
  cancelSubscription(accountId: string, reason: string): Promise<{
    success: boolean;
    previousState: SubscriptionState;
    newState: SubscriptionState.CANCELLED;
  }>;
  
  /** Check if subscription can be transitioned */
  canTransitionState(
    from: SubscriptionState,
    to: SubscriptionState,
    accountId: string
  ): Promise<{
    allowed: boolean;
    reasons: Array<string>;
  }>;
  
  /** List subscription history for an account */
  listSubscriptionHistory(accountId: string): Promise<Array<{
    from: SubscriptionState;
    to: SubscriptionState;
    changedAt: Date;
    reason?: string;
    changedBy: string;
  }>>;
}

export default SubscriptionManager;