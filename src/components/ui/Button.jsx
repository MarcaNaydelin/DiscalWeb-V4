import React from 'react';
import './Button.css';

function Button({ children, type = 'primary', onClick, href, className }) {
  // Si se proporciona un href
  if (href) {
    return (
      <a 
        href={href} 
        className={`btn btn-${type} ${className || ''}`}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  // Si no hay href
  return (
    <button 
      className={`btn btn-${type} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;