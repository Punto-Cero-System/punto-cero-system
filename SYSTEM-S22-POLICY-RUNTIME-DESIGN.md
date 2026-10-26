# SYSTEM-S22-POLICY-RUNTIME-DESIGN.md

## S22 - Policy Runtime Foundation - Phase 2: Design

**Date:** 2026-10-23  
**Phase:** Fase 2 - Diseño  
**Status:** 🟡 In Progress  
**Previous Phase:** S22 Fase 1 Auditoría ✅ Complete  
### 2. Modelos Diseñados

#### 2.1 PolicyDefinition

| Campo | Tipo | Descripción | Validación |
|-------|------|-------------|------------|
| policyId | string | Identificador único de política | UUID v4, obligatorio |
| policyType | PolicyType | Tipo de política | Enum: ACCESS, EXECUTION, CONTEXT, GOVERNANCE |
#### 2.2 PolicyEvaluationContext

| Campo | Tipo | Descripción | Validación |
|-------|------|-------------|------------|
| policyId | string | Referencia a la política | Obligatorio, debe existir en PolicyRegistry |
| contextId | string | Identificador del contexto | Referencia a ContextRuntime S11.3 |
| consumerId | string | Identificador del consumidor L2 | Referencia a TenantUniversal S11.2+S18.1 |
| capabilityId | string | Identificador de la capacidad | Referencia a CapabilityRuntime S20 |
#### 2.3 PolicyDecision

| Campo | Tipo | Descripción | Validación |
|-------|------|-------------|------------|
| decisionId | string | Identificador único de decisión | UUID v4, obligatorio |
| decisionType | DecisionType | Tipo de decisión | Enum: ALLOW, DENY, REVIEW |
| reason | string | Justificación de la decisión | Obligatorio, system-agnostic text |
| createdAt | datetime | Fecha y hora de la decisión | Automático, UTC |
### 3. Enums Definidos

#### 3.1 PolicyType

| Valor | Categoría | Descripción |
|-------|-----------|-------------|
#### 3.2 Decision (EvaluationResult)

| Valor | Descripción |
|-------|-------------|
| ALLOW | Permitir la operación/acceso |
| DENY | Denegar la operación/acceso |
| REVIEW | Requerir revisión humana/manual |

### 4. Política de Responsabilidades

#### 4.1 Policy Runtime SOLO:

| Responsabilidad | Descripción |
|-----------------|-------------|
| define políticas universales | PolicyDefinition model con campos system-agnostic |
| evalúa contexto | PolicyEvaluationContext con referencias S11.3, S11.2+S18.1, S20 |
### 5. Flujo de Datos Diseñado

```
PolicyDefinition ←→ PolicyRegistry ←→ PolicyEvaluator ←→ PolicyResolver
         ↓                              ↓                              ↓
     PolicyType                   PolicyEvaluationContext      PolicyDecision
### 6. Dependencias Externas (Read-Only)

| Dependencia | Componente | Uso en Policy Runtime |
|-------------|------------|----------------------|
| contextId | ContextRuntime S11.3 | Validar contexto de evaluación |
| consumerId | TenantUniversal S11.2+S18.1 | Identificar consumidor L2 |
| capabilityId | CapabilityRuntime S20 | Validar capability en evaluation |
| governance events | GovernanceRuntime S21 | Auditoría de decisiones policy |
### 7. Conclusión del Diseño

**Estado:** ✅ Diseño completado, listo para Fase 3 - Integración

**Modelos creados:**
- ✅ PolicyDefinition (7 campos, PolicyType enum horizontal-only)
- ✅ PolicyEvaluationContext (5 campos, referencias a S11.3, S11.2+S18.1, S20)
- ✅ PolicyDecision (4 campos, decisionType enum: ALLOW/DENY/REVIEW)

**Enums definidos:**
- ✅ PolicyType: ACCESS, EXECUTION, CONTEXT, GOVERNANCE (4 valores, prohibidos verticales)
- ✅ Decision/EvaluationResult: ALLOW, DENY, REVIEW (3 valores, system-only)

**Restricciones verificadas:**
- ✅ Sin fields verticales (legal, medical, business, one)
- ✅ Sin modifications a componentes S10-S21
- ✅ Enum values system-agnostic only
- ✅ Read-only dependencies a certified components

**Próximo paso:** Fase 3 - Integración SYSTEM-S22-POLICY-RUNTIME-INTEGRATION.md
         ↓                              ↓                              ↓
     [ACCESS/EXECUTION/CONTEXT/GOVERNANCE]     [policyId, contextId, consumerId, capabilityId]     [ALLOW/DENY/REVIEW]
```
| retorna decisión | PolicyDecision con enum ALLOW/DENY/REVIEW |

#### 4.2 Policy Runtime NO:

| Restricción | Justificación |
|-------------|---------------|
| ejecuta acciones verticales | Absolute restriction maintained |
| conoce Legal | Legal domain S19 preservado, sin injerencia |
| conoce Medical | Medical domain preservado, sin injerencia |
| conoce Business | Business domain preservado, sin injerencia |
| conoce One | One domain preservado, sin injerencia |
| modifica componentes S10-S21 | Certified foundation intacto |
| crea SDK público | Maintain S19/S20 status |
| crea Gateway externo | Maintain S19/S20 status |
| implementa autenticación nueva | IdentityUniversal/TenantUniversal intacto |
**Restricciones:**
- ✅ Solo 3 valores: ALLOW, DENY, REVIEW
- ✅ Ningún valor vertical (legal, medical, business, one)
- ✅ DecisionType enum definido como string enum TypeScript
- ✅ evaluationResult en PolicyEvaluationContext usa mismo enum
| ACCESS | permitido | Política de acceso a recursos |
| EXECUTION | permitido | Política de ejecución de operaciones |
| CONTEXT | permitido | Política de contexto y condiciones |
| GOVERNANCE | permitido | Política de gobernanza y auditoría |

**Valores PROHIBIDOS (no incluir en PolicyType):**
- ❌ legal_permission
- ❌ medical_permission
- ❌ business_rule
- ❌ vertical_rule

**Restricciones:**
- ✅ PolicyType solo contiene 4 valores permitidos
- ✅ Todos son horizontal-only (system-agnostic)
- ✅ No hay valores Legal/Medical/Business/One
- ✅ Enum definido como string enum TypeScript

**Restricciones:**
- ✅ reason es system-agnostic (no contiene legal/medical/business references)
- ✅ decisionType enum puro: ALLOW|DENY|REVIEW
- ✅ decisionId UUID v4 único por decisión
- ✅ createdAt timestamp automático
| evaluationResult | EvaluationResult | Resultado de la evaluación | Enum: ALLOW, DENY, REVIEW |

**Restricciones:**
- ✅ Sin fields verticales
- ✅ contextId referencia a ContextRuntime S11.3 (sin modifications)
- ✅ consumerId referencia a TenantUniversal S11.2+S18.1 (sin modifications)
- ✅ capabilityId referencia a CapabilityRuntime S20 (sin modifications)
- ✅ evaluationResult enum: ALLOW|DENY|REVIEW (solo System decisions)
| policyName | string | Nombre descriptivo de política | Obligatorio, máximo 128 chars |
| status | PolicyStatus | Estado actual de la política | Enum: ACTIVE, INACTIVE, ARCHIVED |
| scope | string | Alcance de la política | Obligatorio, define qué consumidores aplican |
| createdAt | datetime | Fecha y hora de creación | Automático, UTC |
| updatedAt | datetime | Fecha y hora de última actualización | Automático, UTC |

**Restricciones:**
- ✅ Sin fields verticales (legal_permission, medical_permission, business_rule)
- ✅ policyType enum solo: ACCESS|EXECUTION|CONTEXT|GOVERNANCE
- ✅ scope es system-agnostic (no refiere a Legal/Medical/Business/One)
- ✅ status enum puro sin valores verticales
**Next Phase:** Fase 3 - Integración  

### 1. Objetivo del Diseño

Diseñar la estructura de la Policy Runtime Foundation siguiendo estrictamente las reglas:
- Policy Runtime NO controla dominios verticales
- Policy Runtime NO contiene reglas Legal, Medical, Business ni One
- Policy Runtime solamente administra políticas universales del Sistema
- No modificar código S10-S21
- No crear SDK, Gateway o autenticación System nueva