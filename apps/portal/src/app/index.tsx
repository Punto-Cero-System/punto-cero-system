/**
 * Punto Cero System - Portal
 * Universal entry point for the ecosystem.
 *
 * Responsibility: Entry universal del ecosistema Punto Cero.
 * No contiene lógica de negocio, solo estructura y navegación.
 *
 * @version 0.1.0
 */

import { React } from 'react';
import { ReactDOM } from 'react-dom';

/**
 * PuntoCeroPortal - Componente raíz del portal universal.
 * Representa la entrada al ecosistema Punto Cero System.
 */
export function PuntoCeroPortal(): React.ReactElement {
  return (
    <html lang="es">
      <body>
        <div id="root">
          {/* Portal content will be rendered here */}
        </div>

        <script
          dangerouslySetInnerHTML={{ __html: 'window.__PRELOADED_STATE__ = window.__PRELOADED_STATE__ || {};' }}
        />
      </body>
    </html>
  );
}

/**
 * Renderiza el portal en el DOM.
 * @param rootId ID del elemento raíz (por defecto 'root')
 */
export function renderPortal(rootId: string = 'root'): void {
  const root = document.getElementById(rootId);
  if (root) {
    ReactDOM.render(<PuntoCeroPortal />, root);
  }
}