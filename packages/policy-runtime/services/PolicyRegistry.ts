/*
 * PolicyRegistry.ts
 * S22 - Policy Runtime Foundation
 * Servicio para registrar y gestionar políticas universales
 * 
 * Restricciones:
 * - Solo define políticas, no ejecuta acciones verticales
 * - No conoce Legal, Medical, Business, One
 * - Read-only acceso a PolicyDefinition models
 */

export interface PolicyRegistry {
  /**
   * Registrar una nueva política en el runtime
   * @param policy PolicyDefinition a registrar
   * @returns policyId de la política registrada
   */
  registerPolicy(policy: PolicyDefinition): string;

  /**
   * Obtener una política por su ID
   * @param policyId Identificador de la política
   * @returns PolicyDefinition o undefined si no existe
   */
  getPolicy(policyId: string): PolicyDefinition | undefined;

  /**
   * Listar todas las políticas registradas
   * @returns Array de PolicyDefinition
   */
  listPolicies(): PolicyDefinition[];

  /**
   * Verificar si una política existe
   * @param policyId Identificador de la política
   * @returns boolean
   */
  hasPolicy(policyId: string): boolean;
}