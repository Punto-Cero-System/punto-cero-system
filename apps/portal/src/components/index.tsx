/**
 * Punto Cero System - Componentes Base
 * Componentes reutilizables para el portal.
 * Sin lógica compleja, solo estructura y presentación.
 *
 * @version 0.1.0
 */

import { React } from 'react';

/**
 * Header - Componente de encabezado del portal.
 * Muestra el nombre del sistema y navegación principal.
 */
export function Header(): React.ReactElement {
  return (
    <header className="main-header">
      <div className="container">
        <h1>
          <a href="/" className="header-link">
            Punto Cero System
          </a>
        </h1>
        <nav className="main-nav">
          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>
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
    </header>
  );
}

/**
 * Navigation - Componente de navegación secundario.
 * Navegación suplementaria dentro de secciones.
 */
export function Navigation(): React.ReactElement {
  return (
    <nav className="secondary-nav">
      <ul>
        <li>
          <a href="/">Inicio</a>
        </li>
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
  );
}

/**
 * EcosystemCard - Tarjeta del ecosistema.
 * Referencia visual a una vertical, sin lógica ni integración.
 *
 * @param title - Título de la vertical
 * @param description - Descripción placeholder
 */
export function EcosystemCard({
  title,
  description,
}: {
  title: string;
  description: string;
}): React.ReactElement {
  return (
    <article className="ecosystem-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

/**
 * Footer - Componente de pie de página del portal.
 * Información institucional y enlaces.
 */
export function Footer(): React.ReactElement {
  return (
    <footer className="main-footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Punto Cero System. Todos los derechos reservados.
        </p>
        <nav className="footer-nav">
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
        <p className="footer-disclaimer">
          Sistema operativo global - Versión 0.1.0 - Sin lógica de negocio implementada
        </p>
      </div>
    </footer>
  );
}