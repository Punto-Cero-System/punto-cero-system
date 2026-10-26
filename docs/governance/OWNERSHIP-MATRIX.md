# Ownership Matrix

**Estado:** clasificación arquitectónica documental. La existencia de una asignación no confirma que el componente esté implementado o migrado.

| Área / componente | Propietario | Responsabilidad | Límite |
|---|---|---|---|
| Core y contratos comunes | System L1 | Define contratos, políticas y servicios compartidos aprobados | No contiene reglas especializadas de vertical |
| Identity y authentication universal | System L1 | Autoridad de identidad global, autenticación y sesiones transversales | Los consumidores no mantienen una autoridad global paralela |
| Organization, tenant y workspace | System L1 | Contexto organizacional y aislamiento transversal | El consumidor conserva su estructura de dominio y pertenencias específicas |
| Authorization y capabilities | System L1 | Contratos y decisiones de acceso transversales | El consumidor define reglas de dominio adicionales sin sustituir la política global |
| Licenses y entitlements | System L1 | Derechos de acceso y habilitación de productos/funciones | No absorbe honorarios ni facturación especializada del consumidor |
| Gateway y consumer registry | System L1 | Integración mediada, registro y contratos de consumo | No concede acceso por la mera existencia de una ruta o registro |
| Audit y notifications transversales | System L1 | Capacidades comunes y convenciones compartidas | Eventos, contenido y semántica de dominio siguen siendo del producto propietario |
| One | Producto de System | Comunidad, feed, perfil social, descubrimiento y experiencia comercial propia | Consume identidad, autenticación, autorización y demás capacidades universales de System |
| Legal | Consumidor L2 | Clientes jurídicos, expedientes, documentos, abogados/firmas, procesos, agenda y facturación jurídica | Consume capacidades System; no es propietario del Core |
| Medical | Consumidor L2 | Datos, procesos y reglas clínicas propias | Consume capacidades System; no depende directamente de otras verticales |
| Business | Consumidor L2 | Datos, procesos y reglas empresariales propias | Consume capacidades System; no depende directamente de otras verticales |
| System AI / Darwin | Proyecto relacionado, propietario por confirmar en su repositorio | Capacidades de IA según su alcance aprobado | No se presume autoridad sobre identidad, tenant o autorización universal |

## Reglas de responsabilidad

1. El ownership se asigna por responsabilidad y contrato, no por nombre de carpeta, lenguaje o ubicación histórica.
2. La propiedad de una capacidad transversal corresponde a System; el consumo no transfiere esa propiedad.
3. Los datos y procesos de dominio pertenecen al consumidor que los produce y gobierna.
4. Un componente compartido requiere contrato, owner explícito, consumidores identificados y política de ciclo de vida.
5. Los componentes aún mezclados o no clasificados permanecen en estado por revisar; esta matriz no autoriza su extracción.
