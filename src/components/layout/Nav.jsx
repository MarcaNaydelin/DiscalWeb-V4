import React, { useState, useEffect } from 'react';
import './Nav.css'
import logo from '../../assets/images/logo.png'; // Importa las imágenes

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`nav-container ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'active' : ''}`}>
      <div className="logo-container">
        <a href="#" className="logo">
          <img src={logo} alt="DiscalWeb logo" />
        </a>
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a></li>
          <li><a href="#ayuda" onClick={() => setMenuOpen(false)}>Te ayudamos</a></li>
          <li><a href="#discalculia" onClick={() => setMenuOpen(false)}>Discalculia</a></li>
          <li><a href="#contactos" onClick={() => setMenuOpen(false)}>Contacto</a></li>
        </ul>
      </nav>
      <div className="mobile-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Nav;