# SYSTEM-REPOSITORY-FOUNDATION.md

## Estructura del Repositorio Punto Cero System

### Directorio Raíz
- `package.json` - Configuración del monorepo (pnpm workspace)
- `pnpm-workspace.yaml` - Definición de workspaces
- `README.md` - Descripción general del proyecto

### Apps
- `apps/portal/` - Entrada universal del usuario (base, sin lógica)
- `apps/gateway/` - Comunicación técnica futura (base, sin APIs)

### Packages
- `packages/contracts/` - Contratos públicos (base, sin contratos definitivos)
- `packages/core-client/` - Cliente oficial hacia Core L1 (base, sin conexión)
- `packages/context-engine/` - Contexto universal (base, sin modelos funcionales)
- `packages/consumer-registry/` - Registro de consumidores (base, sin registro L2)
- `packages/universal-adapter/` - Adaptador estándar (base, sin implementación)
- `packages/sdk/` - Reservado para SDK futuro (estructura vacía)

### Consumers
- `consumers/legal/` - Espacio reservado (sin código, sin migración)
- `consumers/medical/` - Espacio reservado (sin código, sin migración)
- `consumers/business/` - Espacio reservado (sin código, sin migración)

### Docs
- `docs/architecture/` - Arquitectura del sistema y carpetas
- `docs/governance/` - Gobernanza y políticas
- `docs/contracts/` - Contratos y acuerdos
- `docs/security/` - Seguridad y mejores prácticas
- `docs/roadmap/` - Roadmap SYSTEM-S1 a SYSTEM-8

### Límites Actuales
- ✅ Monorepo creado con pnpm workspace
- ✅ Estructura de carpetas definida
- ✅ README base en todos los módulos
- ✅ Sin código de negocio implementado
- ✅ Sin SDK, Adapter, Gateway funcional
- ✅ Core L1 sin modificar
- ✅ Verticales (Legal/Medical/Business) sin integración

### Próximas Fases
- SYSTEM-S2: PUBLIC CONTRACTS (pending approval)
- Desarrollo de contratos públicos
- Implementación progresiva de capacidades