import React from 'react';
import Button from '../ui/Button';
import './Header.css';

function Header({ image }) {
  return (
    <section id="inicio" className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-info hidden">
            <h1>DiscalWeb</h1>
            <p>
              Bienvenido a nuestra plataforma interactiva de aprendizaje para
              niños con discalculia. Potenciamos sus habilidades matemáticas de forma divertida y efectiva.
            </p>
            <div className="header-buttons">
              <Button href="#ayuda" type="primary">
                Conoce más
              </Button>
              <Button href="#registro" type="secondary">
                Registro
              </Button>
            </div>
          </div>
          <div className="header-image hidden">
            <img src={image} alt="Niños aprendiendo matemáticas" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;