import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

function Button({
  children,
  type = 'primary',   
  color,                 
  onClick,
  href,
  className,
  disabled = false
}) {
  const buttonClasses = [
    'btn',
    `btn-${type}`,
    color ? `btn-color-${color}` : '',
    className,
    disabled ? 'btn-disabled' : ''
  ].filter(Boolean).join(' ');

  if (href && href.startsWith('/')) {
    return (
      <Link to={href} className={buttonClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={buttonClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
