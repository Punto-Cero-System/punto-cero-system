# SYSTEM-S6 — CONSUMER REGISTRY FOUNDATION

## S6.1 Diseño del Registry

### Definición del Consumer Registry

El Consumer Registry será un registro conceptual que conocerá:

- Qué consumidores existen (identificadores, no conexiones activas)
- Identidad del consumidor
- Tipo de consumidor
- Versión
- Estado
- Metadata pública
- Capacidades declaradas

### Diseño de Interfaces (TypeScript)

```typescript
// Consumer identity and metadata types
export interface ConsumerIdentity {
  consumerId: string;
  type: ConsumerType;
  version: string;
  status: ConsumerStatus;
  metadata: ConsumerMetadata;
}

export interface ConsumerMetadata {
  name?: string;
  description?: string;
  capabilities?: string[];
  [key: string]: any;
}

export type ConsumerType = 'legal' | 'medical' | 'business' | 'general' | 'integration';

export type ConsumerStatus = 'registered' | 'pending' | 'active' | 'inactive' | 'suspended';

// Consumer interface for registry operations
export interface Consumer {
  id: string;
  identity: ConsumerIdentity;
  declaredCapabilities: string[];
}

// Registry interface - conceptual, no real storage
export interface ConsumerRegistry {
  getConsumer(id: string): Promise<Consumer | null>;
  listConsumers(): Promise<Consumer[]>;
  registerConsumer(consumer: Consumer): Promise<Consumer>;
  updateConsumerStatus(id: string, status: ConsumerStatus): Promise<Consumer>;
  validateConsumer(consumer: Consumer): boolean;
}
```

### Principios de Diseño S6.1

| Principio | Descripción |
|-----------|-------------|
| Sin autenticación | Solo metadata, sin validación de credenciales |
| Sin conexión Core | Solo lectura de contracts, sin comunicación directa |
| Sin integración vertical | Consumidor genérico, sin Legal/Medical/Business |
| Sin usuarios reales | Solo identidad de consumer |
| Sin sesiones | Solo estado estático |
| Sin lógica de negocio | Solo registro y declaración |
| Dependencia contracts | Solo lectura de tipos/contratos |

### Dependencias (planificado)

```
packages/consumer-registry/
  └── depends on: punto-cero-contracts (read-only)
```

### Archivos a crear en S6.1

1. `packages/consumer-registry/package.json` - Configuración base
2. `packages/consumer-registry/tsconfig.json` - Configuración TypeScript
3. `packages/consumer-registry/src/index.ts` - Exportaciones principales
4. `packages/consumer-registry/src/models/ConsumerIdentity.ts` - Modelo identidad
5. `packages/consumer-registry/src/models/Consumer.ts` - Modelo consumer
6. `packages/consumer-registry/src/registry/index.ts` - Interfaces del registry
7. `packages/consumer-registry/README.md` - Documentación

### Restricciones confirmadas S6.1

- ❌ No implementar autenticación real
- ❌ No implementar usuarios reales
- ❌ No implementar sesiones
- ❌ No integrar Legal/Medical/Business verticalmente
- ❌ No conectar directamente con Core L1
- ❌ No crear Adapter
- ❌ No crear SDK
- ❌ No implementar lógica de negocio
- ✅ Sí crear metadata conceptual de consumer
- ✅ Sí definir interfaces y tipos
- ✅ Sí depender solo de contracts
- ✅ Sí mantenerse en Foundation layer