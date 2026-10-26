/**
 * SYSTEM-S21 GOVERNANCE RUNTIME
 * RuntimeState - Modelo de estado operacional en tiempo real
 * 
 * Estados puros sin asociación vertical: ACTIVE, INACTIVE, DEGRADED, SUSPENDED
 * health: system-agnostic health indicators
 */

export interface RuntimeState {
  runtimeId: string;            // UUID - identificador único del runtime instance
  consumerId: string;           // String - referencia ConsumerRegistry S13
  status: 'ACTIVE' | 'INACTIVE' | 'DEGRADED' | 'SUSPENDED'; // Enum operational states
  lastActivity: Date;           // DateTime - marca de tiempo última actividad
  health: 'HEALTHY' | 'DEGRADED' | 'CRITICAL'; // Enum health states system-agnostic
}