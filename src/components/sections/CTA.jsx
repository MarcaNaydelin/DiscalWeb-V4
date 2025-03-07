import React from 'react';
import Button from '../ui/Button';
import './CTA.css';

function CTA() {
  return (
    <section className="cta-section hidden">
      <div className="container">
        <div className="cta-content">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a nuestra plataforma y ayuda a tu hijo a desarrollar sus habilidades matemáticas de manera divertida y efectiva</p>
          <Button href="registro.html" type="primary" className="btn-lg">
            Registrarse ahora
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;