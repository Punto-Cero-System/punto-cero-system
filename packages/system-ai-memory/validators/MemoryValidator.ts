/*
 * MemoryValidator.ts - S49 Enforcer
 * bypassAuthorization: false, rejects vertical/personal memory, observer pattern only
 * NO ejecuta acciones, NO toma decisiones, NO aprendizaje autónomo
 */
export class MemoryValidator {
  // Validate memory entry
  static validateMemoryEntry(m: any) {
    const errors: string[] = [];
    if (m.authorizationContext.bypassAuthorization !== false) errors.push(`bypassAuthorization must be false`);
    const prohibitedTypes = /USER_PRIVATE|LEGAL|MEDICAL|BUSINESS|VERTICAL/i;
    if (prohibitedTypes.test(m.memoryType)) errors.push(`vertical/personal memory type detected: ${m.memoryType}`);
    const validStatus = ['CREATED', 'VALIDATED', 'AVAILABLE', 'USED', 'ARCHIVED', 'RETIRED'];
    if (!validStatus.includes(m.lifecycleStatus)) errors.push(`invalid lifecycle status: ${m.lifecycleStatus}`);
    if (typeof m.retentionPolicy !== 'string') errors.push(`retentionPolicy must be string`);
    return { valid: errors.length === 0, errors };
  }

  // Validate context relationship
  static validateRelationship(r: any) {
    const errors: string[] = [];
    if (r.authorizationRequirement.bypassAuthorization !== false) errors.push(`bypassAuthorization must be false`);
    const prohibited = /USER_PRIVATE|LEGAL|MEDICAL|BUSINESS|VERTICAL/i;
    if (prohibited.test(r.sourceMemory.memoryType) || prohibited.test(r.targetMemory.memoryType)) errors.push(`vertical/personal memory in relationship`);
    const validStatus = ['UNVALIDATED', 'VALIDATED', 'VALIDATION_PENDING', 'ARCHIVED'];
    if (!validStatus.includes(r.validationStatus)) errors.push(`invalid validation status: ${r.validationStatus}`);
    return { valid: errors.length === 0, errors };
  }

  // Validate memory lifecycle transition
  static validateLifecycleTransition(from: string, to: string): boolean {
    const validTransitions: any = {
      CREATED: ['VALIDATED', 'RETIRED'],
      VALIDATED: ['AVAILABLE', 'RETIRED'],
      AVAILABLE: ['USED', 'RETIRED'],
      USED: ['ARCHIVED', 'RETIRED'],
      ARCHIVED: [],
    };
    return validTransitions[from]?.includes(to) || false;
  }

  // Check zero vertical/personal contamination
  static checkZeroVertical(data: any) {
    const prohibitedPatterns = ['legal', 'medical', 'business', 'one', 'personal', 'user_private', 'vertical'];
    const issues: string[] = [];
    for (const pattern of prohibitedPatterns) {
      const check = (obj: any) => {
        if (!obj) return;
        const keys = Object.keys(obj).filter(k => k.toLowerCase().includes(pattern));
        if (keys.length > 0) issues.push(`found ${pattern} related keys: ${keys.join(', ')}`);
      };
      if (typeof data === 'object' && data !== null) check(data);
      else if (typeof data === 'string' && data.toLowerCase().includes(pattern)) issues.push(`found ${pattern} in data`);
    }
    return { zeroVertical: issues.length === 0, issues };
  }
}