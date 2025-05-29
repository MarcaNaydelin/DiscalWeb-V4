import React from 'react';
import Button from '../ui/Button';
import './Header.css';

function Header({ image }) {
  return (
    <section id="inicio" className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-info ">
            <h1>DiscalWeb</h1>
            <p className="header-description">
              Bienvenido a nuestra plataforma interactiva de aprendizaje para
              niños con discalculia. Potenciamos sus habilidades matemáticas de forma divertida y efectiva.
            </p>
            <div className="header-buttons">
              <Button href="#ayuda" type="primary" className="btn-lg">
                Conoce más
              </Button>
              <Button href="/register" type="secondary" className="btn-lg">
                Registro
              </Button>
            </div>
          </div>
          <div className="header-image">
            <div className="image-container">
              <img src={image} alt="Niños aprendiendo matemáticas" 
              style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;