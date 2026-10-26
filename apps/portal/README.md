# Punto Cero System - Portal

## Responsabilidad

Entrada universal futura del ecosistema Punto Cero.

Estructura base. Sin lógica de negocio.

## Propósito

apps/portal/ sirve como la entrada universal del ecosistema Punto Cero System.

Los visitantes acceden al sistema a través de este portal y pueden:

- Conocer la visión institucional del sistema
- Explorar referencias a verticales disponibles (Legal, Medical, Business)
- Navegar hacia recursos y contratos públicos
- Prepararse para futuras integraciones cuando sean aprobadas

**Ningún módulo de System debe comunicarse directamente con este portal** sin pasar por la lógica apropiada. El portal es una capa de presentación estática/fundacional.

## Límites y Responsabilidades

### Lo que el Portal HACE:

- [x] Proporciona entrada universal al ecosistema Punto Cero
- [x] Define la estructura visual y navegación base
- [x] Presenta el nombre e identidad institucional
- [x] Muestra referencias visuales a verticales (placeholders)
- [x] Consume contratos públicos de packages/contracts (lectura solo)
- [x] Consume interfaces de packages/core-client (tipo/estado)
- [x] Mantiene independencia respecto a verticales
- [x] Fácil de extender para futuras pantallas

### Lo que el Portal NO HACE:

- [x] No implementa autenticación real
- [x] No gestiona usuarios reales
- [x] No maneja sesiones
- [x] No crea perfiles de usuario
- [x] No gestiona permisos
- [x] No muestra dashboards interactivos
- [x] No trabaja con workspace L2 directamente
- [x] No gestiona licencias
- [x] No integra Legal verticalmente
- [x] No integra Medical verticalmente
- [x] No integra Business verticalmente
- [x] No comunica con Core L1 directamente
- [x] No crea SDK funcional
- [x] No crea Adapter funcional
- [x] No contiene lógica de negocio compleja

## Relación con el Ecosistema Punto Cero

                    PUNTO CERO SYSTEM
                           |
                           |
                apps/portal (S4 Foundation)
                           |
      -------------------------------------------
      |                   |                   |
  packages/contracts   packages/core-client   System Core L1
   (11 frozen contracts)   (client foundation)    (frozen L1)
                           |
      -------------------------------------------
                           |
               Verticales: Legal, Medical, Business
               (reservadas, sin integración S4)

## Dirección de Dependencias

apps/portal
      ↑ (consume leitura)
      |
packages/contracts  (readonly, 11 frozen contracts)
      ↑
packages/core-client  (tipo/estado, foundation)

El portal puede consumir contracts and core-client de solo lectura, pero contracts and core-client no dependen del portal. Dirección unidireccional hacia abajo.

## Stack Tecnológico

| Capa | Tecnología | Notas |
|------|------------|-------|
| Framework | React 18.2.0 | Versión mínima, sin configuraciones complejas |
| Language | TypeScript | Strict mode, tipos definidos |
| Estilado | CSS Modules / clases CSS | Sin dependencias de CSS-in-JS |
| Build | TypeScript compiler | tsc configurado |
| Workspace | pnpm workspace | Relación con root monorepo |
| Dependencias externas | Ninguna (solo workspace) | punto-cero-contracts, punto-cero-core-client workspace |

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| build | Compila TypeScript a dist/ |
| dev | Servidor de desarrollo placeholder (S4 restrictions) |
| test | Validaciones básicas (sin tests complejos) |

## Estado de Validación

✅ package válido
✅ estructura TypeScript correcta
✅ depende de contracts and core-client (workspace)
✅ sin dependencias externas directas
✅ TypeScript check passed
✅ build exitoso
✅ componentes base creados
✅ Verticales solo como referencias visuales
✅ Sin lógica de negocio implementada
✅ Workspace continúa válido
✅ Core L1 intacto
✅ Contratos congelados 0.1.0

## Futuras Responsabilidades

El portal está diseñado para evolucionar hacia:

- Páginas completas por vertical (cuando sea aprobado)
- Integración con Core Client para estado en tiempo real
- Autenticación y sesiones (cuando sea necesario y aprobado)
- Dashboards y interfaces interactivas (scope futuro)
- Integración con Legal/Medical/Business (aprobado oficialmente)

Pero todas estas funcionalidades están fuera del scope actual. La fase actual crea únicamente la fundación del portal universal.

## Estructura de Archivos

apps/portal/
├── package.json
├── tsconfig.json
├── src/
│   ├── app/
│   │   └── index.tsx (raíz del aplicativo)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── EcosystemCard.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── index.tsx (página principal)
│   └── index.tsx (exportaciones principales)
├── public/
│   └── (assets estáticos)
└── README.md (documentación actual)

## Mensaje Final

"Punto Cero System Portal foundation (versión 0.1.0) creado y aprobado, preparado como entrada universal al ecosistema. Las verticales Legal, Medical and Business permanecen como referencias visuales placeholder sin integración. Core L1 and contratos congelados en versión 0.1.0."