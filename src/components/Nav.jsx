import React from 'react'
import './Nav.css'
import logo from '../assets/logo.png'; // Importa las imágenes

function Nav() {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <a href="#" className="logo">
          <img src={logo} alt="logo"/>
        </a>
      </div>
      <nav className='navbar'>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#ayuda">Te ayudamos</a></li>
          <li><a href="https://poolextremo.itch.io/juegos">Juegos</a></li>
          <li><a href="#contactos">Contacto</a></li>
        </ul>
      </nav>
    </div>
  )
}
export default Nav