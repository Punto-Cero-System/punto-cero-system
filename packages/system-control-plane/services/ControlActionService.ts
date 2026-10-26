/**
 * Control Action Service for S32 Administration & Control Plane Foundation
 * 
 * Registers and manages administrative control actions
 * 
 * Constraint: NO lógica vertical, solo acciones y resultados universales System
 */

import { SystemControlAction, SystemControlActionResult } from '../models/SystemControlAction';

export interface ControlActionServiceConfig {
  /** Enable automatic action audit logging */
  autoAudit: boolean;
  /** Maximum pending actions per operator */
  maxPendingActions: number;
  /** Enable action result validation */
  validateResults: boolean;
}

export interface ControlActionService {
  /** Register a new control action */
  registerAction(action: Omit<SystemControlAction, 'actionId' | 'timestamp' | 'result'>): Promise<SystemControlAction>;
  
  /** Get action by ID */
  getAction(actionId: string): Promise<SystemControlAction | null>;
  
  /** List actions by operator */
  listActionsByOperator(operatorId: string): Promise<Array<SystemControlAction>>;
  
  /** List actions by target */
  listActionsByTarget(target: string): Promise<Array<SystemControlAction>>;
  
  /** List pending actions */
  listPendingActions(): Promise<Array<SystemControlAction>>;
  
  /** Update action result */
  updateActionResult(actionId: string, result: SystemControlActionResult, failureReason?: string): Promise<SystemControlAction | null>;
  
  /** Get action statistics */
  getActionStatistics(): Promise<{
    total: number;
    byResult: Record<SystemControlActionResult, number>;
    byType: Record<string, number>;
    recent: Array<SystemControlAction>;
  }>;
}

export default ControlActionService;