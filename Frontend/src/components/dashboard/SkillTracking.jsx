import React from 'react';
import './SkillTracking.css';
import { LineChart } from '../charts/LineChart';
import { RadarChart } from '../charts/RadarChart';
import { timeSeriesData, radarSkillsData, defaultOptions } from '../../utils/chartUtils';

const SkillTracking = ({ children }) => {
  // Nuevas habilidades matemáticas específicas
  const skillNames = {
    numberRecognition: 'Reconocimiento de Números',
    counting: 'Conteo y Cantidad',
    comparison: 'Comparación de Cantidades',
    shapes: 'Formas Geométricas Básicas',
    patterns: 'Patrones y Secuencias'
  };

  // Iconos para cada habilidad
  const skillIcons = {
    numberRecognition: '🔢',
    counting: '🦶',
    comparison: '⚖️',
    shapes: '🔺',
    patterns: '🧩'
  };

  return (
    <div className="skill-tracking-container">
      <h2>Seguimiento de Habilidades Matemáticas</h2>
      
      {/* GRÁFICOS UNO AL LADO DEL OTRO */}
      <div className="charts-wrapper">
        <div className="chart-card">
          <div className="chart-title">
            📈 Progreso a lo Largo del Tiempo
          </div>
          <LineChart data={timeSeriesData} options={defaultOptions} />
        </div>
        
        <div className="chart-card">
          <div className="chart-title">
            🧠 Mapa de Habilidades Matemáticas
          </div>
          <RadarChart data={radarSkillsData} options={defaultOptions} />
        </div>
      </div>

      {/* HABILIDADES INDIVIDUALES */}
      {children.length === 0 ? (
        <div className="no-children">
          <p>No hay perfiles de niños para mostrar habilidades</p>
        </div>
      ) : (
        <div className="skills-overview">
          {children.map(child => (
            <div key={child.id} className="child-skills-card">
              <div className="child-header">
                <img 
                  src={child.avatar || '/default-avatar.png'} 
                  alt={child.name} 
                  className="child-avatar"
                />
                <div className="child-info">
                  <h3>{child.name}</h3>
                  <p>Edad: {child.age}</p>
                </div>
              </div>
              
              <div className="skills-grid">
                {Object.entries(child.skills || {}).map(([skill, value]) => (
                  <div key={skill} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">
                        {skillIcons[skill]} {skillNames[skill] || skill}
                      </span>
                      <span className="skill-percentage">{value}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{
                          width: `${value}%`,
                          backgroundColor: getSkillColor(value)
                        }}
                      />
                    </div>
                    <div className="skill-description">
                      {getSkillDescription(skill, value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getSkillColor = (value) => {
  if (value < 40) return '#D05471';  // rojo
  if (value < 70) return '#DAA657';  // amarillo
  return '#4BD4D4';                  // verde
};

const getSkillDescription = (skill, value) => {
  const descriptions = {
    numberRecognition: {
      low: 'Progreso en identificar números 0-5',
      medium: 'Progreso en identificar números 0-9',
      high: 'Progreso en identificar y escribir 0-20'
    },
    counting: {
      low: 'Cuenta objetos hasta 5',
      medium: 'Cuenta objetos hasta 10 y asocia con numeral',
      high: 'Cuenta objetos hasta 20 con precisión'
    },
    comparison: {
      low: 'Identifica "más" y "menos" básico',
      medium: 'Compara cantidades pequeñas',
      high: 'Domina "más que", "menos que", "igual a"'
    },
    shapes: {
      low: 'Reconoce círculo y cuadrado',
      medium: 'Identifica círculo, cuadrado, triángulo',
      high: 'Identifica formas básicas y sus propiedades'
    },
    patterns: {
      low: 'Reconoce patrones simples AB',
      medium: 'Continúa patrones ABC',
      high: 'Crea y completa patrones complejos'
    }
  };

  const skillDesc = descriptions[skill];
  if (!skillDesc) return '';

  if (value < 40) return skillDesc.low;
  if (value < 70) return skillDesc.medium;
  return skillDesc.high;
};

export default SkillTracking;