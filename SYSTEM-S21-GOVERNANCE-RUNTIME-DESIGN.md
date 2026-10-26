# SYSTEM-S21-GOVERNANCE-RUNTIME-DESIGN.md

## S21 Fase 2: Diseño de Governance Runtime

**Fecha:** 2026-10-23  
**Status:** ✅ Complete - Diseño completado, listo para implementación S21  
**Previous:** SYSTEM-S21-GOVERNANCE-RUNTIME-AUDIT.md  
#### 1.3 eventType Enum Definición S21 (Horizontal-Only)

| Value | Description | Legal | Medical | Business | Validación |
|-------|-------------|-------|---------|----------|------------|
| **CREATE** | Resource creation event | ❌ | ❌ | ❌ | ✅ Horizontal-only |
| **UPDATE** | Resource update event | ❌ | ❌ | ❌ | ✅ Horizontal-only |
| **EXECUTE** | Capability execution event | ❌ | ❌ | ❌ | ✅ Horizontal-only |
| **VALIDATE** | Capability validation event | ❌ | ❌ | ❌ | ✅ Horizontal-only |
| **FAILURE** | Event failure record | ❌ | ❌ | ❌ | ✅ Horizontal-only |
| **CLOSE** | Event close/termination | ❌ | ❌ | ❌ | ✅ Horizontal-only |

**NOTA:** eventType enum values son SOLO system/universales.  
⚠️ Prohibido: case_management (legal), patient_records (medical), inventory (business),  
⚠️ Prohibido naming que incluya vertical terms.  
✅ Solo: CREATE, UPDATE, EXECUTE, VALIDATE, FAILURE, CLOSE

#### 1.4 status Enum Definición S21 (Pending)

- **Pendiente:** Definir enum status para GovernanceEvent
- **Valores esperados:** pending, completed, cancelled, failed (system-only)
- **Validación:** status values must not reference legal/medical/business concepts

### 2. SystemAuditRecord - Modelo de Trazabilidad Universal

#### 2.1 Definición y Propósito
- **Objeto:** SystemAuditRecord
- **Propósito:** Crear record de auditoría universal para todas las actions del system
- **Alcance:** System-only, audit trail sin conocer lógica vertical
- **Inmutabilidad:** Record creado es immutable; solo append-new-record

#### 2.2 Campos Obligatorios

| Campo | Tipo | Descripción | Validación S21 |
|-------|------|-------------|----------------|
| **auditId** | UUID | Identificador único del record de auditoría | Obligatorio; generation System-owned |
| **eventId** | UUID | Reference al GovernanceEvent asociado | Obligatorio; reference GovernanceEvent eventId |
| **actorType** | String | Tipo de actor que generó el evento | Obligatorio; system-agnostic type |
| **action** | String | Acción realizada | Obligatorio; system-agnostic action description |
| **timestamp** | DateTime | Marca de tiempo de la acción | Obligatorio; System time at action time |
| **result** | Enum | Resultado de la acción | Obligatorio; enum: SUCCESS, FAILURE, REVIEW_PENDING |

#### 2.3 actorType Definición (System-Agnostic)

- **Propósito:** Identificar el tipo de componente system que realizó la acción
- **Valores permitidos:** system-generated identifiers, component names
- **Ejemplos:** "identity_universal", "tenant_universal", "context_runtime", "capability_runtime", "authorization_foundation", "universal_adapter", "governance_runtime"
- **Validación:** Valores must be pre-defined enum, no dynamic/vertical values

#### 2.4 action Definición (System-Agnostic)

- **Propósito:** Describir la acción realizada en forma system-agnostic
- **Valores permitidos:** Acciones operativas universales
- **Ejemplos:** "capability_registry_insert", "capability_resolution", "context_validation", "authorization_decision", "event_registration", "state_transition"
- **Validación:** Valores must not include legal/medical/business terms

#### 2.5 result Enum Definición S21

- **SUCCESS:** Acción completada exitosamente
- **FAILURE:** Acción fallida - requiere atención
- **REVIEW_PENDING:** Acción requiere revisión additional

#### 2.6 System Boundary - SystemAuditRecord

- ✅ Perteneciente al System Core
- ✅ auditId y timestamp generados por System
- ✅ eventId es reference a GovernanceEvent creado por GovernanceRecorder
- ✅ actorType y action son system-agnostic descriptions
- ✅ result es enum system-only: SUCCESS/FAILURE/REVIEW_PENDING
- ❌ No contiene lógica vertical en ningun campo
- ❌ No incluye casos de uso verticales
#### 1.5 System Boundary - GovernanceEvent

- ✅ Perteneciente al System Core
- ✅ eventId y timestamp generados por System
- ✅ consumerId y tenantId son referencias a componentes S13/S11.2 certificados
- ✅ contextId es referencia a ContextRuntime S11.3 certificado
- ✅ capabilityId es referencia a CapabilityUniversal S20 certificado
- ✅ eventType y status son enum puros system-only
- ❌ No contiene lógica vertical en ningun campo
- ❌ No incluye casos, pacientes, clientes legales, documentos verticales
**Next:** S21 Fase 3 - Integración Arquitectónica (pending)

### 1. GovernanceEvent - Modelo Universal de Evento Operativo

#### 1.1 Definición y Propósito
- **Objeto:** GovernanceEvent
- **Propósito:** Registrar eventos operativos universales en el System Runtime
- **Alcance:** System-only, sin conocimiento de verticales (legal/medical/business/one)
- **Validación:** eventType debe ser horizontal-only; campos system-agnostic

#### 1.2 Campos Mínimos Obligatorios

| Campo | Tipo | Descripción | Validación S21 |
|-------|------|-------------|----------------|
| **eventId** | UUID | Identificador único del evento System | Obligatorio; génération System-owned |
| **eventType** | Enum | Tipo de evento operativo | Obligatorio; enum: CREATE, UPDATE, EXECUTE, VALIDATE, FAILURE, CLOSE |
| **consumerId** | String | Referencia al consumer L2 | Obligatorio; reference a ConsumerRegistry S13 entry |
| **tenantId** | String | Referencia al tenant Universal | Obligatorio; reference a TenantUniversal S11.2 entry |
| **contextId** | UUID | Referencia al ContextRuntime activo | Obligatorio; reference a ContextRuntime S11.3 entry |
| **capabilityId** | UUID | Referencia a capability CapabilityUniversal | Obligatorio; reference a CapabilityUniversal S20 entry |
| **timestamp** | DateTime | Marca de tiempo del evento | Obligatorio; System time at event creation |
| **status** | Enum | Estado del evento | Obligatorio; pending definition |