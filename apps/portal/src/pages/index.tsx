/**
 * Punto Cero System - Página Inicial
 * Representa la entrada universal al ecosistema.
 *
 * Debe incluir:
 * - nombre del sistema.
 * - descripción institucional.
 * - navegación preparada.
 *
 * @version 0.1.0
 */

import { React } from 'react';

/**
 * PuntoCeroHome - Página de inicio del portal.
 * Experiencia base sin lógica compleja.
 */
export function PuntoCeroHome(): React.ReactElement {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Punto Cero System</h1>
          <p>Sistema operativo global</p>
          <nav>
            <ul>
              <li>
                <a href="#ecosistema">Ecosistema</a>
              </li>
              <li>
                <a href="#verticales">Verticales</a>
              </li>
              <li>
                <a href="#recursos">Recursos</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}

/**
 * PuntoCeroEcosystem - Sección del ecosistema.
 * Muestra referencias visuales a verticales (placeholders).
 */
export function PuntoCeroEcosystem(): React.ReactElement {
  return (
    <section id="ecosistema" className="ecosystem">
      <div className="container">
        <h2>Ecosistema Punto Cero</h2>
        <div className="ecosystem-cards">
          {/* Placeholder cards - no funcional, solo visual */}
          <article className="ecosystem-card">
            <h3>Punto Cero Legal</h3>
            <p>Vertical futura - placeholder arquitectónico</p>
          </article>
          <article className="ecosystem-card">
            <h3>Punto Cero Medical</h3>
            <p>Vertical futura - placeholder arquitectónico</p>
          </article>
          <article className="ecosystem-card">
            <h3>Punto Cero Business</h3>
            <p>Vertical futura - placeholder arquitectónico</p>
          </article>
        </div>
      </div>
    </section>
  );
}

/**
 * PuntoCeroVerticals - Sección de verticales.
 * Referencias visuales sin integración real.
 */
export function PuntoCeroVerticals(): React.ReactElement {
  return (
    <section id="verticales" className="verticals">
      <div className="container">
        <h2>Verticales Disponibles</h2>
        <p>
          Las verticales Legal, Medical y Business están reservadas y
          disponibles para futuras integraciones aprobadas. Actualmente
          funcionan como referencias arquitectónicas solamente.
        </p>
      </div>
    </section>
  );
}

/**
 * PuntoCeroResources - Sección de recursos.
 * Enlaces y recursos institucionales.
 */
export function PuntoCeroResources(): React.ReactElement {
  return (
    <section id="recursos" className="resources">
      <div className="container">
        <h2>Recursos</h2>
        <ul>
          <li>
            <a href="https://puntozerosystem.com" target="_blank">
              Punto Cero System Official
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Contratos Públicos
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Core Client Foundation
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}