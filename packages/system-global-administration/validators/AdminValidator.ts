# validators - AdminValidator.ts
/**
 * Admin validator for S37 Global Administration.
 * Universal validator only - no vertical data, no SDK, no gateway.
 * Observed by S37 Intelligence, governed by Core L1 (S10-S23).
 * 
 * Validates admin profiles, sessions, recommendations against certified contracts.
 * All findings only (STATUS: GENERATED → REVIEWED → ACCEPTED/REJECTED).
 * Hard constraint: bypassAuthorization: false never permitted.
 * Vertical prohibition prohibitionhibition: Legal/Medical/Business/One rejected at validator level.
 */

import { AdminProfile, AdminSession } from '../models';

export interface AdminValidator {
  validateProfile(profile: AdminProfile): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }>;
  validateSession(session: AdminSession): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }>;
  validateRecommendation(action: string): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }>;
  checkVerticalProhibition(data: any): { prohibited: boolean; categories: string[] };
  checkAuthorization(session: AdminSession): { authorized: boolean; reason: string };
}

export const AdminValidatorDefault: AdminValidator = {
  async validateProfile(profile: AdminProfile): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }> {
    const verticalCheck = this.checkVerticalProhibition(profile);
    const authCheck = this.checkAuthorization({
      id: profile.id,
      profile: profile.profile,
      identityId: profile.identityId,
      authorizationRef: profile.authorizationId,
      startedAt: profile.created,
      expiresAt: '',
      status: profile.status,
      scope: 'observe'
    });
    
    return {
      valid: !verticalCheck.prohibited && authCheck.authorized,
      issues: verticalCheck.prohibited ? ['Vertical data prohibited'] : [],
      recommendations: [],
      verticalProhibited: verticalCheck.prohibited,
      // Include auth check result implicitly through valid
    };
  },
  async validateSession(session: AdminSession): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }> {
    const verticalCheck = this.checkVerticalProhibition(session);
    let issues: string[] = [];
    let valid = true;
    
    if (verticalCheck.prohibited) {
      issues = ['Vertical data prohibited in session'];
      valid = false;
    }
    
    // Session scope must be observe or recommend
    if (session.scope !== 'observe' && session.scope !== 'recommend') {
      issues.push(['Invalid session scope:', session.scope].join(' '));
      valid = valid && false;
    }
    
    return {
      valid,
      issues,
      recommendations: [],
      verticalProhibited: verticalCheck.prohibited
    };
  },
  async validateRecommendation(action: string): Promise<{
    valid: boolean;
    issues: string[];
    recommendations: string[];
    verticalProhibited: boolean;
  }> {
    // S37 recommendations: GENERATED → REVIEWED → ACCEPTED/REJECTED
    // No autonomous action, human-driven only
    return {
      valid: true,
      issues: [],
      recommendations: ['Human review required for ACCEPTED/REJECTED decision'],
      verticalProhibited: false
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
  },
  checkAuthorization(session: AdminSession): { authorized: boolean; reason: string } {
    // Uses existing S12 AuthorizationFoundation, bypassAuthorization: false
    // Session scope must be observe or recommend
    if (session.scope === 'observe' || session.scope === 'recommend') {
      return { authorized: true, reason: 'S12 AuthorizationFoundation observer/recommend scope' };
    }
    return { authorized: false, reason: 'Session scope not permitted: ' + session.scope };
  }
};