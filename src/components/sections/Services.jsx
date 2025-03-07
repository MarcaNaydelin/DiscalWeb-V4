import React from 'react'
import './Services.css'

function Services({ image, title, description }) {
  return (
    <div className='service-card'>
      <div className="service-image-container">
        <img src={image} alt={`${title} ilustración`} />
      </div>
      <div className="service-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Services

