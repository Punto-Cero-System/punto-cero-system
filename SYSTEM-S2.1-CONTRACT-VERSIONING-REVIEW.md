# SYSTEM-S2.1-CONTRACT-VERSIONING-REVIEW.md

## OBJETIVO

Evaluar:
- VERSION actual (0.1.0)
- compatibilidad futura
- estrategia de evolución

Definir reglas para cambios futuros, compatibilidad hacia atrás, control de breaking changes.

---

## 4.1 VERSION Actual

### Configuración Actual

| Ubicación | Valor | Comentario |
|---|---|---|
| `package.json` `"version"` | `"0.1.0"` | SemVer inicial |
| `src/index.ts` `export const VERSION` | `'0.1.0'` | Constante pública |
| `SYSTEM-S2-PUBLIC-CONTRACTS-REPORT.md` | `0.1.0` | Reporte S2 original |

### Tipo Semántico

```
MAJOR.MINOR.PATCH
0.1.0
  ↑   ↑   ↑
  |   |   └── Patch: arreglos, no breaking
  |   └────── Minor: funcionalidades nuevas, breaking menores
  └────────── Major: cambios breaking mayores
```

### Estratégia Actual

- **0.1.0** = Versión inicial de contrato públicos
- Sin cambios breaking aún (es la primera versión)
- Estado: `draft` por defecto (`DEFAULT_STATUS`)

---

## 4.2 Compatibilidad Futura

### Estrategia de Compatibilidad

| Tipo de Cambio | Impacto | Estrategia |
|---|---|---|
| Agregar nueva interfaz | ❌ Breaking si se importa | Documentar como opcional |
| Agregar nuevo campo a interface | ⚠️ Breaking para tipos exactos | Usar type optional `?` |
| Agregar nuevo type | ✅ No breaking | Siguiente patch |
| Cambiar enum values | ⚠️ Breaking si se hace match | Mantener valores anteriores |
| Cambiar DEFAULT_STATUS | ⚠️ Breaking consumidores | Documentar migración |
| Nuevo contrato tipo | ✅ No breaking | Minor version |

### Compatibilidad Hacia Atrás (Backward Compatible)

- **Patch** (0.x.0 → 0.x.1): Agregar tipos, interfaces, constantes nuevas. NO romperá código existente que use tipos actuales.
- **Minor** (0.1.x → 0.2.0): Nuevas capabilities, nuevos consumer types. Los existentes continúan funcionando.
- **Major** (1.0.0): Romper cambios estructurales. Requiere migración explícita.

---

## 4.3 Reglas para Cambios Futuros

### 🟢 Permitido (sin versión mayor):

1. Agregar nuevas interfaces
2. Agregar nuevos types compuestos
3. Agregar nuevos valores a `CONSUMER_TYPES` array
4. Agregar nuevos valores a `CONTRACT_STATUSES` array
5. Agregar nuevos campos opcionales (`?`) a interfaces existentes
6. Agregar nuevas capabilities (types)
7. Cambiar `DEFAULT_STATUS` con migración documentada
8. Actualizar `VERSION` a 0.1.x (patch)

### 🟡 Cuidado (requiere anuncio):

1. Quitar campos de interfaces
2. Cambiar tipos de campos existentes
3. Remover valores de enums
4. Cambiar `DEFAULT_STATUS` sin documentación

### 🔴 Breaking Change (requiere Major version):

1. Remover interfaces o types existentes
2. Cambiar firmas de tipo que rompan importaciones
3. Mover de 0.x.y a 1.0.0 sin camino de migración

---

## 4.4 Control de Breaking Changes

### Mechanisms

| Mechanic | Descripción | Cuándo usar |
|---|---|---|
| `export type` en lugar de `interface` cuando sea posible | Types son más flexibles para extensiones | Nuevas adiciones |
| Campos opcionales `?` | Agregar sin romper | Cuando haya necesidad futura |
| `CONSUMER_TYPES` y `CONTRACT_STATUSES` como arrays extensibles | Agregar valores nuevos | Siempre que sea posible |
| `DEFAULT_STATUS` con deprecated path | Transición suave | Cuando cambie estado por defecto |

### Documentación Requerida

Para cualquier cambio que pueda ser breaking:

1. Actualizar `SYSTEM-S2.1-CONTRACT-REVIEW-REPORT.md`
2. Anunciar en changelog interno
3. Documentar estrategia de migración si aplica
4. Considerar bump a MINOR o MAJOR según impacto

---

## 4.5 Versionamiento Resumido

| Aspecto | Decisión |
|---|---|
| **Versión actual** | `0.1.0` |
| **Estrategia** | SemVer inicial, patch para nuevas adiciones, minor para nuevas capabilities, major para breaking |
| **DEFAULT_STATUS** | `'draft'` (constante, configurable) |
| **CONSUMER_TYPES** | `['legal', 'medical', 'business', 'partner', 'integrator']` - extensible |
| **CONTRACT_STATUSES** | `['draft', 'approved', 'deprecated', 'superseded']` - extensible |
| **Version bump strategy** | Patch: nuevas adiciones ✅, Minor: nuevas capabilities ✅, Major: breaking changes ⚠️ |
| **Compatibilidad** | Versiones 0.x.y son compatibles entre sí para código existente |

**Siguiente paso: TAREFA 5 — Ajustes Permitidos**