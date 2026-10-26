# Versioning Policy

**Estado:** política documental prospectiva. No se ha publicado aquí un contrato, SDK o API con una versión operativa.

## 1. Alcance

Esta política aplica a contratos de System consumidos por One, Legal, Medical, Business y otros consumidores registrados: esquemas, APIs, eventos, snapshots, manifests y paquetes de integración.

Cada artefacto versionado debe identificar owner, nombre estable, versión, estado de soporte y consumidores afectados. La versión de implementación interna no sustituye la versión del contrato público.

## 2. Esquema de versión

Como convención futura, usar SemVer MAJOR.MINOR.PATCH:

- **MAJOR:** cambio incompatible, eliminación/cambio de semántica o requisito que obliga al consumidor a migrar.
- **MINOR:** capacidad aditiva compatible con consumidores existentes.
- **PATCH:** corrección compatible que no cambia el contrato observable.

Los esquemas de datos pueden llevar además una versión explícita propia cuando evolucionen independientemente del API o del paquete.

## 3. Compatibilidad y evolución

- Las versiones menores y patch deben preservar el comportamiento contractual previo documentado.
- No se permite cambiar silenciosamente el significado de campos, permisos, errores o eventos.
- Cambios breaking requieren versión mayor, guía de migración, consumidores afectados y estrategia de convivencia.
- Cuando sea viable, mantener versiones soportadas durante una ventana de deprecación publicada.
- La retirada requiere fecha de deprecación, fecha de sunset, reemplazo y evidencia de migración de consumidores.
- Los consumidores deben declarar la versión que implementan y probar compatibilidad antes de adoptar una versión nueva.

## 4. APIs

El esquema de versión de API (por ejemplo, prefijo de ruta o media type), las ventanas de soporte y los códigos de error estándar deben definirse en un contrato técnico específico. Esta política no selecciona un mecanismo de routing ni declara una API existente.

## 5. Aprobación y registro

Los cambios contractuales requieren revisión del owner System y de consumidores afectados; deben quedar registrados en docs/decisions/ y reflejados en el catálogo contractual. Hasta aprobar esos mecanismos, estas reglas son base documental y no certifican releases existentes.
