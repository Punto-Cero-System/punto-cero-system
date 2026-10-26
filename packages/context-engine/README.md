# Paquete: context-engine

## Responsabilidad: Motor de Contexto Universal

### Propósito

El `packages/context-engine` es la capa responsable del contexto universal del ecosistema Punto Cero System. Proporciona modelos y estructuras para comprender:

- **Quién** interactúa con el sistema (identity)
- **Bajo qué organización** operan
- **En qué workspace** están operando
- **Bajo qué licencia** funciona el sistema
- **En qué contexto operativo** se encuentra el sistema

### Límites y Restricciones

Esta capa está diseñada estrictamente para **administrar contexto** y **ninguna otra cosa**:

| Restricción | Estado |
|------------|--------|
| No autenticación | ✅ Implementado (solo tipos, sin flujo real) |
| No usuarios reales | ✅ Sin gestión de usuarios |
| No sesiones | ✅ Sin sesión management |
| No login | ✅ Sin implementación |
| No permisos | ✅ Sin permisos |
| No roles verticales | ✅ Legal/Medical/Business no aplican |
| No pacientes | ✅ Sin datos de pacientes |
| No abogados | ✅ Sin datos de abogados |
| No negocios | ✅ Sin datos de negocios |
| No facturación | ✅ Sin lógica de facturación |
| No licencias comerciales reales | ✅ Referencia solo |
| No integración Legal | ✅ Placeholder visual solo |
| No integración Medical | ✅ Placeholder visual solo |
| No integración Business | ✅ Placeholder visual solo |
| No conexión directa Core | ✅ Sin comunicación directa |
| No SDK | ✅ No SDK creado |
| No Adapter | ✅ No Adapter creado |

### Estructura Actual

```
packages/context-engine/
├── package.json          # v0.1.0, depends: punto-cero-contracts
├── tsconfig.json         # TypeScript ES2020 configuration
├── src/
│   ├── index.ts          # Exportaciones principales
│   ├── context.ts        # Modelos de contexto (ContextIdentity, OrganizationContext, WorkspaceContext, LicenseContext, SystemContext)
│   ├── models/
│   │   ├── ContextIdentity.ts
│   │   ├── OrganizationContext.ts
│   │   ├── WorkspaceContext.ts
│   │   ├── LicenseContext.ts
│   │   └── SystemContext.ts
│   └── resolver/
│       └── index.ts      # Context resolver foundation (abstract interfaces)
├── README.md             # Esta documentación
└── tsconfig.json         # TypeScript config con paths aliases
```

### Modelos Definidos

| Modelo | Descripción |
|--------|-------------|
| `ContextIdentity` | Identidad contextual - referencias solo |
| `OrganizationContext` | Organización - agnóstica a verticales |
| `WorkspaceContext` | Espacio operativo - sin funciones internas |
| `LicenseContext` | Referencia de licencia - sin pagos |
| `SystemContext` | Composición completa: Identity + Organization + Workspace + License |

### Dependencias

| Dependencia | Versión | Rol |
|-------------|---------|-----|
| `punto-cero-contracts` | `workspace:^` | Contratos frozen 0.1.0 (lectura only) |
| TypeScript | `^5.0.0` | Compilación type-safe |
| Nadie más | - | Isolated, no vertical, no Core |

### Exportaciones Públicas

Los siguientes tipos e interfaces son exportados públicamente desde `src/index.ts`:

```typescript
// Modelos de contexto
ContextIdentity
OrganizationContext
WorkspaceContext
LicenseContext
SystemContext

// Resolvedor de contexto
ContextResolver
DefaultResolver
```

### Relación con el Monorepo

```
packages/contracts (frozen 0.1.0)
          ↑ (lectura only, sin modificar)
packages/context-engine (0.1.0)
          ↑ (depende de contracts, no al revés)
packages/core-client (0.1.0)
          ↑ (S3 foundation, intacto)
System Core L1 (frozen)
```

### Principios S5 Cumplidos

✅ Modelos contextuales creados  
✅ Workspace válido mantenido  
✅ Dependencia correcta hacia contracts  
✅ Sin lógica vertical (Legal/Medical/Business)  
✅ Sin autenticación implementada  
✅ Sin usuarios reales  
✅ Sin sesiones  
✅ Sin Core modification  
✅ Documentación generada  

### Próximos Pasos (después de S5)

1. Esperar aprobación oficial para SYSTEM-S6 — CONSUMER REGISTRY FOUNDATION
2. No iniciar Consumer Registry, Adapter, SDK o integraciones verticales
3. Continuar validando build y TypeScript check
4. Mantener context-engine como capa de contexto universal sin integraciones profundas hasta aprobación

### Validación Técnica

- ✅ Package válido con package.json correcto
- ✅ TypeScript check passing (estructura validada)
- ✅ Depende únicamente de punto-cero-contracts
- ✅ Sin dependencias externas innecesarias
- ✅ No modifica Core L1
- ✅ No conecta verticales