import React from 'react'
import './Services.css'

function Services({image, title, description}) {
  return (
    <div className='Services'>
        <img src={image} alt="service-img" />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
  )
}

export default Services

