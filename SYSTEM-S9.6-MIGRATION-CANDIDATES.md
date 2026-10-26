# SYSTEM-S9.6 — MIGRATION CANDIDATES & RISK ASSESSMENT

## All migration proposals below operate under strict constraints:

- ✅ NO migrar archivos
- ✅ NO copiar código
- ✅ NO modificar Legal
- ✅ NO modificar System
- ✅ NO crear adapters
- ✅ NO crear SDK
- ✅ NO conectar Core
- ✅ NO conectar verticales

**Classification requires explicit Category A verification before any migration proceeds.**

---

## ---

### CATEGORY A Migration Candidates (Require explicit Category A verification)

| Element | Current Location | Proposed System Location | Risk Level | Prerequisite |
|---------|------------------|-------------------------|------------|-------------|
| identidad global patterns | Legal historical records | System global identity | 🟡 Medium | Category A verification, boundary review |
| contexto universal models | Legal context models | System universal context | 🟡 Medium | Category A verification, pattern review |
| gobierno mechanisms | Legal governance records | System system-level | 🟡 Medium | Category A verification, governance review |
| capacidades comunes patterns | Legal capability declarations | System common capabilities | 🟡 Medium | Category A verification, capability review |

### CATEGORY B — Remain in Legal (No Migration)

| Element | Current Location | Reason |
|---------|------------------|--------|
| expedientes jurídicos | Legal domain | Legal-specific; remain in Legal |
| procesos legales | Legal domain | Legal-specific workflows; remain in Legal |
| documentos jurídicos | Legal domain | Legal-specific documents; remain in Legal |
| lógica jurídica | Legal domain | Legal-specific reasoning; remain in Legal |
| usuarios profesionales | Legal domain | Legal-specific professional roles; remain in Legal |
| normativa jurídica | Legal domain | Laws/regulations specific to legal domain; remain in Legal |
| casos legales | Legal domain | Specific legal cases/precedents; remain in Legal |

### CATEGORY C — Must Be Eliminated (Contamination)

| Element | Current Location | Elimination Required | Rationale |
|---------|------------------|---------------------|-----------|
| Legal types in universal-adapter | packages/universal-adapter/src | YES | Vertical types contaminating foundation; must be removed/replaced |
| Legal-specific consumers | packages/consumer-registry/src | YES | Legal types in generic registry; boundary violation |
| Mixed/logic contaminants | packages/context-engine/src | YES | Legal-specific logic in universal foundation |
| Vertical imports in adapter | packages/universal-adapter/src | YES | Any Legal/Medical/Biz imports in foundation layers |

---

⚠️ All migration decisions require explicit Category A classification per S9.6 audit findings.

✅ No migrations proceed without verified Category A classification.

✅ System and Legal domains remain separated per architectural design.

**Ready for S9.7+ explicit migration decisions when Category A classifications are confirmed.**