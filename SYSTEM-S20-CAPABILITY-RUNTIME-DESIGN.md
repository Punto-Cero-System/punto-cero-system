# SYSTEM-S20-CAPABILITY-RUNTIME-DESIGN.md

## S20 Fase 2: Diseño de Capability Runtime

**Fecha:** 2026-10-23
**Status:** ✅ Complete - Diseño completado, listo para implementación S20
**Previous:** SYSTEM-S20-CAPABILITY-RUNTIME-AUDIT.md
**Next:** S20 Fase 3 - Integración Arquitectónica (pending)
### 1. CapabilityUniversal Modelo Mínimo

```typescript
interface CapabilityUniversal {
  capabilityId: string;       // UUID - identificador único System
  capabilityType: string;     // Enum horizontal-only (S20 definir)
  capabilityName: string;     // Nombre descriptivo System
### 1.1 capabilityType Enum Definición S20 (Horizontal-Only)

| Value | Category | Description | Legal | Medical | Business |
|-------|----------|-------------|-------|---------|----------|
| **case_management** | System | Caso management capability | ❌ | ❌ | ❌ |
| **document_generation** | System | Document generation capability | ❌ | ❌ | ❌ |
| **calendar_scheduling** | System | Scheduling/calendar capability | ❌ | ❌ | ❌ |
### 1.2 source Field Definición S20

| Value | Description | S20 Assignment |
|-------|-------------|----------------|
| **System** | Capability nativa System | S20 default assignment |
| **Legal** | Capability proveniente Legal domain | S20 read-only mapping |
| **External** | Capability de sistemas externos | S20 integration mapping |
### 2. CapabilityContext Modelo

```typescript
interface CapabilityContext {
  contextId: string;          // UUID - referencia ContextRuntime S11.3
  consumerId: string;         // String - referencia ConsumerRegistry S13
  capabilities: CapabilityUniversal[]; // Array capability tracking S20
### 2.1 CapabilityContext Field Descriptions

| Campo | Tipo | Descripción | Validación S20 |
|-------|------|-------------|----------------|
| **contextId** | UUID | Referencia al ContextRuntime activo | Obligatorio; debe existir en ContextRuntime S11.3 actual |
| **consumerId** | String | Referencia al ConsumerRegistry L2 | Obligatorio; debe existir en ConsumerRegistry S13 |
| **capabilities** | Array | Lista de CapabilityUniversal asignadas | Obligatorio; array no vacío; items validar CapabilityUniversal modelo |
### 3. CapabilityExecutionPermission Modelo

```typescript
interface CapabilityExecutionPermission {
  capabilityId: string;          // UUID - referencia CapabilityUniversal capabilityId
  authorizationDecision: string; // Enum: allow, deny, review
  decisionAt: Date;              // Timestamp decisión authorization
### 3.1 authorizationDecision Enum Definición S20 (System-Only)

| Value | Description | Legal Permissions | S20 Validation |
|-------|-------------|-------------------|----------------|
| **allow** | Permission granted | ❌ Sin permisos jurídicos | ✅ Validación system-only |
| **deny** | Permission denied | ❌ Sin permisos jurídicos | ✅ Validación system-only |
| **review** | Requires review | ❌ Sin permisos jurídicos | ✅ Validación system-only |
### 4. Integración Arquitectónica Flujo Oficial S20

```
IdentityUniversal
        ↓
TenantUniversal
        ↓
### 4.1 Flujo S20 Validated

1. **IdentityUniversal** - identityId referencia validate S17.2 certified
2. **TenantUniversal** - tenantId referencia validate S11.2+S18.1 certified
3. **ContextRuntime** - contextId validate S11.3 certified; capabilities tracking S20 nuevo
4. **CapabilityRuntime** - CapabilityUniversal lookup S20; CapabilityContext retrieve; CapabilityExecutionPermission decision
5. **AuthorizationFoundation** - authorizationContext validate S12 read dependency; authorizationDecision S20 system-only check
### 5. CapabilityRegistry Implementación S20

#### 5.1 CapabilityRegistry Responsabilidades

| Responsabilidad | Descripción | S20 Scope |
|----------------|-------------|-----------|
| **registerCapability** | Register new CapabilityUniversal | System-only; ConsumerRegistry S13 read-only |
### 5.2 CapabilityRegistry Integration Points

| Integración | Componente | S20 Action |
|-------------|-----------|-----------|
| **CapabilityRegistry → CapabilityUniversal** | modelo definition | CapabilityRegistry usa modelo CapabilityUniversal definido S20 |
| **CapabilityRegistry → ContextRuntime** | contextId tracking | Cada capability registration debe include contextId referencia ContextRuntime activo |
| **CapabilityRegistry → ConsumerRegistry** | read dependency | ConsumerRegistry S13 sin modifications; CapabilityRegistry nuevo módulo read consumerId mapping |
### 6. CapabilityResolver Implementación S20

#### 6.1 CapabilityResolver Responsabilidades

| Responsabilidad | Descripción | S20 Scope |
|----------------|-------------|-----------|
| **resolveCapabilities** | Resolver capabilities disponibles dentro de ContextRuntime | system-only; identityId + tenantId + contextId mapping |
### 6.2 CapabilityResolver Flow S20

```
Resolver Flow:
1. Input: contextId, consumerId, optional capabilityType filter
2. Validate: contextId existe en ContextRuntime S11.3 actual
3. Validate: consumerId existe en ConsumerRegistry S13
### 7. CapabilityValidator Implementación S20

#### 7.1 CapabilityValidator Responsabilidades

| Responsabilidad | Descripción | S20 Scope |
|----------------|-------------|-----------|
| **validateCapabilityExists** | Verificar capabilityId existe en CapabilityRegistry | system-only; registry lookup |
### 7.2 CapabilityValidator Triple Check S20

```
Triple Check Flow:
1. ✅ validateCapabilityExists(capabilityId) - CapabilityRegistry lookup
2. ✅ validateConsumerAccess(capabilityId, consumerId) - ConsumerRegistry + permission check
3. ✅ validateAuthorization(capabilityId, consumerId, contextId) - authorizationDecision system-only
### 8. Restricciones Absolutas S20

| Restricción | Status | Validación |
|-------------|--------|------------|
| ✅ Sin lógica jurídica en ningún capabilityType | ✅ Por definir S20 | capabilityType enum validation horizontal-only |
| ✅ Sin lógica médica en ningún capabilityType | ✅ Por definir S20 | capabilityType enum validation horizontal-only |
| ✅ Sin lógica empresarial en ningún capabilityType | ✅ Por definir S20 | capabilityType enum validation horizontal-only |
| ✅ Sin one community logic | ✅ Por definir S20 | capabilityType enum validation; naming validation |
| ✅ Sin datos internos de ninguna vertical | ✅ Por definir S20 | capabilityType + naming validation |
| ✅ Sin usuarios globales | ✅ Verified S19 | Sin modifications a user models |
| ✅ Sin login System nuevo | ✅ Verified S19 | Sin modifications a auth models |
| ✅ Sin JWT global | ✅ Verified S19 | Sin modifications to token models |
| ✅ Sin ERP creado | ✅ Verified S19 | Sin modules ERP/business vertical |
| ✅ Sin CRM creado | ✅ Verified S19 | Sin modules CRM/vertical |
### 9. Dependencias S20 (S10-S19 Certified)

| Dependencia | Componente | Status S19 | S20 Extensión |
|-------------|-----------|-----------|---------------|
| **IdentityUniversal → CapabilityRuntime** | identityId mapping | ✅ Certified S17.2 | identityId reference maintain S20 flow |
| **TenantUniversal → CapabilityRuntime** | tenantId mapping | ✅ Certified S11.2+S18.1 | tenantId reference maintain S20 flow |
| **ContextRuntime → CapabilityRuntime** | contextId mapping | ⚠️ Partial S11.3 | S20 CapabilityRuntime integration sobre ContextRuntime foundation |
| **AuthorizationFoundation → CapabilityRuntime** | authorizationDecision | ✅ Certified S12 | S20 authorizationDecision system-only extension |
| **ConsumerRegistry → CapabilityRegistry** | consumerId mapping | ❌ Ausente S13 | S20 CapabilityRegistry nuevo; ConsumerRegistry sin modifications |
| **UniversalAdapter → CapabilityRuntime** | capability resolution | ⚠️ Partial S14 | S20 UniversalAdapter frontier extension capability-aware operations |
```
| ✅ Sin permisos jurídicos universales | ✅ Por definir S20 | authorizationDecision enum system-only |
| ✅ Sin SDK público | ✅ Verified S19 | Sin SDK generation S20 |
| ✅ Sin Gateway externo | ✅ Verified S19 | Sin gateway generation S20 |
### 10. Recomendaciones Post-Diseño

1. ✅ **Probar capabilityType enum** horizontal-only validation pre-implementation
2. ✅ **Probar authorizationDecision enum** system-only validation pre-implementation
3. ✅ **Backup context-engine modelos** pre-S20 modification (pattern S16/Fase A)
4. ✅ **Documentar rollback procedure** pattern S16/Fase A pre-S20 implementation
5. ✅ **CapabilityRegistry tests** 100% pass rate target (S19: 31/31 tests pattern)
6. ✅ **CapabilityResolver tests** identity-tenant-capability mapping validation
7. ✅ **CapabilityValidator tests** triple check validation pattern
8. ⚠️ **Revisar capabilityType naming** post-S20 implementation para asegurar horizontal-only
9. ⚠️ **Revisar authorizationDecision usage** post-S20 implementation para asegurar system-only
10. ✅ **Siguiente paso:** S20 Fase 3 - Integración Arquitectónica

---
```
```
| **validateConsumerAccess** | Verificar consumerId puede solicitar capability | triple check: capabilityId + consumerId + authorizationDecision |
| **validateAuthorization** | Verificar authorizationDecision permite ejecución | system-only; allow/deny/review enum validation |
| **validateContextCompatibility** | Verificar capability compatible con ContextRuntime estado | contextId + status validation |
| **validateNoVerticalDependencies** | Verificar capability sin lógica vertical | capabilityType enum validation; naming validation |
```
4. Retrieve: CapabilityContext para contextId + consumerId
5. Filter: capabilities array por capabilityType (if filter provided)
6. Validate: cada capability validada por CapabilityExecutionPermission
7. Output: CapabilityUniversal[] approved capabilities for execution
```
| **checkCapabilityAccess** | Verificar consumer puede solicitar capability | triple check: capabilityId existe, consumerId válido, authorizationDecision allow |
| **getCapabilitiesByType** | Obtener capabilities por tipo (capabilityType) | System-only; horizontal types only |
| **getCapabilitiesByContext** | Obtener capabilities por contextId | System-only; contextId validation |
```
| **CapabilityRegistry → AuthorizationFoundation** | authorizationDecision validation | AuthorizationFoundation S12 read dependency; authorizationDecision S20 system-only validation |
```
| **updateCapability** | Update capability status/type/name | System-only; sin modifications ConsumerRegistry |
| **listCapabilities** | List all active capabilities | System-wide; read operation |
| **getCapability** | Get capability by capabilityId | System-wide; read operation |
| **deleteCapability** | Soft-delete capability (set status=deprecated) | System-only; ConsumerRegistry sin modifications |
```
6. **UniversalAdapter** - capability resolution frontier Legal↔System; L2 Consumer access
```
ContextRuntime
        ↓
CapabilityRuntime (S20 nuevo)
        ↓
AuthorizationFoundation (S12 - read dependency)
        ↓
UniversalAdapter (S14 - frontier Legal↔System)
        ↓
L2 Consumer
```

**NOTA:** authorizationDecision enum values son SOLO system-only.
⚠️ Prohibido: "legal_allow", "legal_deny", "medical_grant", "jurisdiction_approve" etc.
✅ Solo: allow, deny, review - decisiones RBAC horizontales.
```
  decidedBy: string;             // String - identityId referencia IdentityUniversal
  contextId: string;             // UUID - referencia ContextRuntime activo
  consumerId: string;            // String - referencia ConsumerRegistry L2
}
```
| **grantedAt** | Date | Cuándo se otorgó capability al consumer | Optional; set al assignment time |
| **expiresAt** | Date | Cuándo expira capability assignment | Optional; default: null (permanent) |
```
  grantedAt?: Date;           // Timestamp asignación capability al consumer
  expiresAt?: Date;           // Timestamp expiración capability (optional)
}
```
| **billing_invoice** | System | Billing/invoice processing | ❌ | ❌ | ❌ |
| **notification** | System | Notification delivery capability | ✅ Horizontal | ✅ Horizontal | ✅ Horizontal |
| **reporting** | System | Reporting/analytics capability | ✅ Horizontal | ✅ Horizontal | ✅ Horizontal |
| **search_lookup** | System | Search and lookup capability | ✅ Horizontal | ✅ Horizontal | ✅ Horizontal |

**NOTA:** capabilityType enum values son SOLO horizontales/universales. 
⚠️ Prohibido: case_management (legal), patient_records (medical), inventory (business), 
⚠️ Prohibido naming que incluya vertical terms.
  status: string;             // Enum: active, inactive, deprecated
  source: string;             // System | Legal | External
  createdAt: Date;            // Timestamp creación System
  updatedAt: Date;            // Timestamp actualización System
}
```