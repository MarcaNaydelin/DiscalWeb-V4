import React from 'react';
import './Information.css';

function Information({ image, title, description }) {
  return (
    <div className='Information'>
      <div className="info-content">
        <img src={image} alt="info-img" />
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
