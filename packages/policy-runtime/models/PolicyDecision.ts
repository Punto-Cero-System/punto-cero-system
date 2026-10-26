/*
 * PolicyDecision.ts
 * S22 - Policy Runtime Foundation
 * Modelo para decisiones de Policy Runtime
 * 
 * Restricciones:
 * - decisionType enum puro: ALLOW|DENY|REVIEW
 * - reason es system-agnostic (no contiene legal/medical/business references)
 * - decisionId UUID v4 único por decisión
 * - createdAt timestamp automático
 */

export interface PolicyDecision {
  decisionId: string;
  decisionType: DecisionType;
  reason: string;
  createdAt: Date;
}

export enum DecisionType {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
  REVIEW = 'REVIEW',
}