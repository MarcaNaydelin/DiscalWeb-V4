import React from 'react';
import './Information.css';

function Information({ image, title, description, className }) {
  return (
    <div className={`info-card ${className}`}>
      <div className="info-content">
        <div className="info-image">
          <img src={image} alt={`${title} ilustración`} />
        </div>
        <div className="info-text">
          <h3>{title}</h3>
          <p>{description}</p>
          <a href="#" className="btn">Más información</a>
        </div>
      </div>
    </div>
  );
}

export default Information;