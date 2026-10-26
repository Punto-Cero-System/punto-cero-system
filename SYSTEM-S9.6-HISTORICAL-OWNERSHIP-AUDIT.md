# SYSTEM-S9.6 — HISTORICAL OWNERSHIP AUDIT & SYSTEM BOUNDARY DISCOVERY

## Audit Execution — Mode: AUDIT ONLY ✅

**Constraints Obeyed:**
- ✅ NO modificar código
- ✅ NO mover archivos
- ✅ NO eliminar archivos
- ✅ NO crear integraciones
- ✅ NO copiar código
- ✅ NO modificar Legal
- ✅ NO modificar System
- ✅ NO crear adapters
- ✅ NO crear SDK
- ✅ NO conectar Core
- ✅ NO conectar verticales

**Context:** S1-S9 approved. System possesses: frozen contracts 0.1.0, core-client foundation, context-engine, consumer-registry, universal-adapter.

**Objective:** Determine what historical Legal components belong to System nucleus vs Legal domain vs should be eliminated.

**Classification Framework:**
- **CATEGORY A**: Should migrate to SYSTEM (global/universal artifacts)
- **CATEGORY B**: Should remain in LEGAL (domain-specific artifacts)
- **CATEGORY C**: Should be eliminated (architectural contamination)

---

## Classification Results

### CATEGORY A — Should Migrate to SYSTEM (Global/Universal)

| # | Element Type | Current File/Location | Current Responsibility | Future Owner | Reason for Classification |
|---|-------------|----------------------|------------------------|--------------|---------------------------|
| A1 | identidad global | Legal historical records | Legal domain identity | System (global) | Identity frameworks that are domain-agnostic; applicable across all punto cero domains |
| A2 | contexto universal | Legal historical context models | Legal domain context | System (universal) | Context models not specific to Legal; OrganizationContext, WorkspaceContext patterns |
| A3 | gobierno | Legal governance records | Legal domain governance | System (system-level) | System-level governance mechanisms applicable to all domains |
| A4 | capacidades comunes | Legal capability declarations | Legal domain capabilities | System (common) | Common capabilities any consumer can declare; patterns in universal-adapter |
| A5 | infraestructura transversal | Legal transversal infrastructure | Legal domain infrastructure | System (cross-cutting) | Cross-cutting system infrastructure; Registry patterns, adapter patterns |
| A6 | configuraciones globales | Legal global configs | Legal domain configs | System (global) | Global configuration patterns that are domain-agnostic |

**Total CATEGORY A:** 6 element types

### CATEGORY B — Should Remain in LEGAL (Domain-Specific)

| # | Element Type | Current File/Location | Current Responsibility | Future Owner | Reason for Classification |
|---|-------------|----------------------|------------------------|--------------|---------------------------|
| B1 | expedientes jurídicos | Legal case files, documentation | Legal domain content | Legal (domain) | Legal-specific case files and documentation; procedural to legal domain |
| B2 | procesos legales | Legal process workflows | Legal domain content | Legal (domain) | Legal-specific process workflows; jurisdictional to legal domain |
| B3 | documentos jurídicos | Legal documents, briefs, filings | Legal domain content | Legal (domain) | Legal-specific documents; substantive to legal domain |
| B4 | lógica jurídica | Legal reasoning, argumentation | Legal domain content | Legal (domain) | Legal-specific reasoning patterns; domain-specific logic |
| B5 | usuarios profesionales | Lawyers, legal professionals | Legal domain content | Legal (domain) | Professional roles specific to legal domain |
| B6 | normativa jurídica | Laws, regulations, codes | Legal domain content | Legal (domain) | Laws, regulations specific to legal domain |
| B7 | casos legales | Legal cases and precedents | Legal domain content | Legal (domain) | Specific legal cases and precedents; jurisprudence |

**Total CATEGORY B:** 7 element types

### CATEGORY C — Should Be Eliminated (Architectural Contamination)

| # | Element Type | Current File/Location | Current Responsibility | Future Owner | Reason for Classification |
|---|-------------|----------------------|------------------------|--------------|---------------------------|
| C1 | Legal types in universal-adapter | packages/universal-adapter/src | Universal adapter layer | System (remove) | Vertical types contaminating universal foundation; boundary violation |
| C2 | Legal-specific consumers | packages/consumer-registry/src | Consumer registry | System (remove) | Legal-specific consumer types in generic registry; boundary violation |
| C3 | Mixed/logic contaminants | packages/context-engine/src | Context engine | System (remove) | Any Legal-specific logic in universal foundation |
| C4 | Vertical imports in adapter | packages/universal-adapter/src | Universal adapter | System (remove) | Any imports from Legal/Medical/Business in foundation layers |

**Total CATEGORY C:** 4 contamination risk entries