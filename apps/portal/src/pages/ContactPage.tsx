/** ContactPage - Página de contacto institucional, solo lectura. */
import { React } from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function ContactPage(): React.ReactElement {
  return (
    <main className="page-contact" aria-label="Página contacto institucional">
      <Header />
      <Navigation />
      <section className="page-content" aria-section="contact-content">
        <h2 className="page-title">Contacto</h2>
        <p className="page-intro">Datos institucionales y contacto básico.</p>
        <div className="contact-info">
          <h3>Institutional Contact</h3>
          <ul>
            <li>
              <strong>Email:</strong> contacto@puntocerosystem.example
            </li>
            <li>
              <strong>Formulario:</strong> Disponible en modo solo lectura
            </li>
          </ul>
        </div>
        <p className="contact-disclaimer">
          Este es un formulario de solo lectura. Sin envío de datos propios.
        </p>
      </section>
      <Footer />
    </main>
  );
}