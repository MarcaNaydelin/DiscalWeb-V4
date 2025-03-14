import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer id="contactos">
      <div className="footer-container">
        <div className="footer-content">
          <div className="contacto">
            <h2>Contáctanos</h2>
            <p>Universidad privada Franz Tamayo</p>
            <p>Si tienes alguna pregunta o sugerencia, no dudes en contactarnos a través de los siguientes medios:</p>
            <p>Email: naydelingirl1234@gmail.com</p>
            <p>Teléfono: +591 68526105</p>
            <div className="social-links">
            <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
          <div className="ubicacion">
            <h2>Nos Ubicamos</h2> 
            <p>Calle: Av. Villarroel esq. c. Portales, No. 359</p>
            <p>Ciudad: Cochabamba</p>
            <p>Departamento: Cochabamba</p>
            <p>País: Bolivia</p>
            <a href="https://unifranz.edu.bo/sedes/cochabamba/" className="btn">Más Información</a>
          </div>
        </div>
        <div className="footer-bottom">
          <h3>© 2024 Proyecto de Enseñanza con Juegos Interactivos - Naydelin Marca Paco</h3>
        </div>  
      </div>
    </footer>
  );
}

export default Footer;