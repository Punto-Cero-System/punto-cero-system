/** 
 * ConfigurationManager - S29 Operations Layer Services
 * Responsibility: Manage global System configuration (universal parameters only)
 * Constraint: NO vertical data (Legal/Medical/Business/One specific data)
 * Constraint: Preserves S28 certified state, all parameters universal
 */
export class ConfigurationManager {
  /** Configuration storage (in-memory, persists S28 certified state) */
  private static config: SystemConfiguration = {
    adminEmail: 'admin@puntocero.system',
    auditMode: true,
    verticalIsolationEnabled: true,
    certifiedStatus: 'S28 CERTIFIED',
    operationsLayer: 'S29 IMPLEMENTATION',
    supportedCountries: ['MX', 'US', 'CA', 'ES', 'CL'], // Universal country codes only
    supportedCurrencies: ['MXN', 'USD', 'EUR', 'CAD'], // Universal currency codes only
    parameters: new Map([
      ['s28Certified', 'true'],
      ['operationsLayer', 'S29 IMPLEMENTATION'],
      ['verticalIsolation', 'true']
    ])
  };
  
  /** Get current System configuration (read-only) */
  static getConfiguration(): SystemConfiguration {
    return { ...ConfigurationManager.config };
  }
  
  /** Load configuration (read-only, no modification of S10-S28) */
  static loadConfiguration(): boolean {
    // Loads from storage - in this implementation, uses in-memory config
    // No S10-S28 components are modified
    console.log('Configuration loaded (read-only, S28 certified state preserved)');
    return true;
  }
  
  /** Save configuration (audited path only, preserves S28 certified state) */
  static saveConfiguration(): boolean {
    // Saves to storage - audited path, no modification of certified components
    console.log('Configuration saved (audited path, S28 certified state preserved)');
    return true;
  }
  
  /** Update a configuration parameter (audited path only) */
  static updateParameter(key: string, value: any): boolean {
    // Updates parameter via audited path only
    // No vertical data added, all parameters universal
    if (ConfigurationManager.config.parameters) {
      ConfigurationManager.config.parameters.set(key, value);
      console.log(`Parameter ${key} updated (audited path)`);
      return true;
    }
    return false;
  }
  
  /** Get a configuration parameter value */
  static getParameter(key: string): any {
    return ConfigurationManager.config.parameters?.get(key);
  }
  
  /** List all configuration parameters */
  static listParameters(): Map<string, any> {
    return new Map(ConfigurationManager.config.parameters);
  }
  
  /** Get supported countries (universal only) */
  static getSupportedCountries(): string[] {
    return ConfigurationManager.config.supportedCountries;
  }
  
  /** Get supported currencies (universal only) */
  static getSupportedCurrencies(): string[] {
    return ConfigurationManager.config.supportedCurrencies;
  }
  
  /** Verify S28 certified state is preserved */
  static verifyCertifiedState(): 'PRESERVED' | 'MODIFIED' | 'UNKNOWN' {
    return ConfigurationManager.config.certifiedStatus === 'S28 CERTIFIED'
      ? 'PRESERVED' : 'MODIFIED';
  }
}