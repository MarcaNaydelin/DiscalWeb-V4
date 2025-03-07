import React, { useState, useEffect } from 'react';
import './Nav.css'
import logo from '../assets/logo.png'; // Importa las imágenes

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo-container">
        <a href="#" className="logo">
          <img src={logo} alt="DiscalWeb logo" />
        </a>
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#ayuda">Te ayudamos</a></li>
          <li><a href="#discalculia">Discalculia</a></li>
          <li><a href="https://poolextremo.itch.io/juegos">Juegos</a></li>
          <li><a href="#contactos">Contacto</a></li>
        </ul>
      </nav>
      <div className="mobile-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
export default Nav