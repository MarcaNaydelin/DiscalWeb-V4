import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

function Button({ children, type = 'primary', onClick, href, className }) {
  const buttonClasses = `btn btn-${type} ${className || ''}`;
  
  // Si es una ruta interna que comienza con "/", usa Link de react-router-dom
  if (href && href.startsWith('/')) {
    return (
      <Link 
        to={href}
        className={buttonClasses}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  
  // Si se proporciona un href que no comienza con "/" (enlace externo o ancla)
  if (href) {
    return (
      <a 
        href={href}
        className={buttonClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  // Si no hay href
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;