/*
 * PolicyDefinition.ts
 * S22 - Policy Runtime Foundation
 * Modelo para políticas universales del Sistema
 * 
 * Restricciones:
 * - Sin fields verticales (legal_permission, medical_permission, business_rule, vertical_rule)
 * - policyType enum solo: ACCESS|EXECUTION|CONTEXT|GOVERNANCE
 * - status enum puro sin valores verticales
 * - scope es system-agnostic
 */

export enum PolicyType {
  ACCESS = 'ACCESS',
  EXECUTION = 'EXECUTION',
  CONTEXT = 'CONTEXT',
  GOVERNANCE = 'GOVERNANCE',
}

export enum PolicyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export interface PolicyDefinition {
  policyId: string;
  policyType: PolicyType;
  policyName: string;
  status: PolicyStatus;
  scope: string;
  createdAt: Date;
  updatedAt: Date;
}