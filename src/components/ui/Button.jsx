import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

function Button({ 
  children, 
  type = 'primary', 
  onClick, 
  href, 
  className, 
  disabled = false 
}) {
  const buttonClasses = `btn btn-${type} ${className || ''} ${disabled ? 'btn-disabled' : ''}`;

  // If it's an internal route starting with "/"
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

  // If an external href is provided
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

  // Standard button
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;