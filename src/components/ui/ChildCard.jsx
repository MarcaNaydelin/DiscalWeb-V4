import React, { useState } from 'react';
import { FaQrcode, FaPen, FaTrash } from 'react-icons/fa';
import Button from './Button';
import './ChildCard.css';

const levelLabels = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
  excellent: 'Excelente'
};

const levelColors = {
  beginner: 'var(--status-beginner)',     // Color celeste para principiante
  intermediate: 'var(--accent-color)',    // Amarillo/naranja para intermedio
  advanced: 'var(--primary-color)',       // Morado
  excellent: 'var(--status-excellent)'    // Azul pastel
};

const ChildCard = ({
  name,
  progress,
  games,
  lastActivity,
  level,
  avatar,
  onEdit,
  onDelete,
  onQR
}) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = () => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };
  
  return (
    <div className="child-card">
      <div className="child-card-header">
        <div className="level-badge" style={{ backgroundColor: levelColors[level] }}>
          {levelLabels[level]}
        </div>
        <div className="card-actions">
          <button className="icon-button" onClick={onQR}><FaQrcode /></button>
          <button className="icon-button" onClick={onEdit}><FaPen /></button>
          <button className="icon-button" onClick={onDelete}><FaTrash /></button>
        </div>
      </div>
      
      <div className="child-avatar">
        {!imageError ? (
          <img 
            src={avatar} 
            alt={name} 
            onError={handleImageError}
          />
        ) : (
          <div className="avatar-fallback" style={{ backgroundColor: levelColors[level] }}>
            {getInitials()}
          </div>
        )}
      </div>
      
      <h3 className="child-name">{name}</h3>
      
      <div className="progress-section">
        <div className="progress-label">Progreso general</div>
        <div className="progress-value">{progress}%</div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: levelColors[level]
          }}
        />
      </div>
      
      <div className="stats-container">
        <div className="stat-row">
          <span className="stat-label">Juegos completados</span>
          <span className="stat-value">{games}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Última actividad</span>
          <span className="stat-value">{lastActivity}</span>
        </div>
      </div>
      
      <Button className="details-button btn-gradient-excellent" type="success">
        Ver Detalles
      </Button>
    </div>
  );
};

export default ChildCard;