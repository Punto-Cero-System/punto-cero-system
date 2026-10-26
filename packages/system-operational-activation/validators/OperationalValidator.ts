# validators - OperationalValidator.ts
/**
 * Operational validator for S36 Operational Activation.
 * Universal validator only - no vertical data, no SDK, no gateway.
 * Observed by S34 Intelligence, governed by Core L1.
 * 
 * Validates environment, deployment, health against certified contracts.
 * All findings advisory only (STATUS: GENERATED → REVIEWED → ACCEPTED/REJECTED).
 * Hard constraint: bypassAuthorization: false never permitted.
 */

import { Environment, DeploymentState, OperationalHealth } from '../models';

export interface OperationalValidator {
  validateEnvironment(env: Environment): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }>;
  validateDeployment(deploy: DeploymentState): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }>;
  validateHealth(health: OperationalHealth): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }>;
  checkVerticalProhibition(data: any): { prohibited: boolean; categories: string[] };
}

export const OperationalValidatorDefault: OperationalValidator = {
  async validateEnvironment(env: Environment): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }> {
    const verticalCheck = this.checkVerticalProhibition(env);
    return {
      valid: !verticalCheck.prohibited && env.status !== 'invalid',
      issues: verticalCheck.prohibited ? ['Vertical data prohibited'] : [],
      recommendations: [],
      verticalProhibited: verticalCheck.prohibited
    };
  },
  async validateDeployment(deploy: DeploymentState): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }> {
    const verticalCheck = this.checkVerticalProhibition(deploy);
    return {
      valid: !verticalCheck.prohibited,
      issues: verticalCheck.prohibited ? ['Vertical data prohibited in deployment'] : [],
      recommendations: [],
      verticalProhibited: verticalCheck.prohibited
    };
  },
  async validateHealth(health: OperationalHealth): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }> {
    const verticalCheck = this.checkVerticalProhibition(health);
    return {
      valid: !verticalCheck.prohibited,
      issues: verticalCheck.prohibited ? ['Vertical data prohibited in health check'] : [],
      recommendations: [],
      verticalProhibited: verticalCheck.prohibited
    };
  },
  checkVerticalProhibition(data: any): { prohibited: boolean; categories: string[] } {
    // Reject Legal, Medical, Business, One at validator level
    const prohibitedCategories = ['legal', 'medical', 'business', 'one'];
    const categoriesFound: string[] = [];
    
    const scan = (obj: any) => {
      if (obj === null || obj === undefined) return;
      if (typeof obj === 'string') {
        const lower = obj.toLowerCase();
        if (prohibitedCategories.some(c => lower.includes(c))) {
          if (!categoriesFound.includes(obj)) categoriesFound.push(obj);
        }
      } else if (typeof obj === 'object') {
        for (const key of Object.keys(obj)) {
          scan(obj[key]);
        }
      }
    };
    
    scan(data);
    
    return {
      prohibited: categoriesFound.length > 0,
      categories: categoriesFound
    };
  }
};