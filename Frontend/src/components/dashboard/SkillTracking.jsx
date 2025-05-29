import React from 'react';
import './SkillTracking.css';

const SkillTracking = ({ children }) => {
  const skillNames = {
    attention: 'Atención',
    memory: 'Memoria',
    processing: 'Procesamiento',
    visualization: 'Visualización'
  };

  return (
    <div className="skill-tracking-container">
      <h2>Seguimiento de Habilidades</h2>
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
                  src={child.avatar || '/src/assets/default-avatar.svg'} 
                  alt={child.name} 
                  className="child-avatar"
                />
                <div className="child-info">
                  <h3>{child.name}</h3>
                  <p>Edad: {child.age}</p>
                </div>
              </div>
              <div className="skills-grid">
                {Object.entries(child.skills).map(([skill, value]) => (
                  <div key={skill} className="skill-item">
                    <div className="skill-header">
                      <span>{skillNames[skill]}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{
                          width: `${value}%`, 
                          backgroundColor: getSkillColor(value)
                        }}
                      ></div>
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
  if (value < 40) return '#D05471';  // Red
  if (value < 70) return '#DAA657';  // Yellow
  return '#4BD4D4';  // Green
};

export default SkillTracking;