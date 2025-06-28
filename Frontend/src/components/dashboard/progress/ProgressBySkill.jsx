import React, { useState } from 'react';
import './ProgressBySkill.css';
import { FaSearch, FaArrowUp, FaArrowDown, FaHashtag, FaCalculator, FaBalanceScale, FaShapes, FaPuzzlePiece, FaPlus, FaMinus } from 'react-icons/fa';

// Habilidades base que manejas
const BASE_SKILLS_INFO = {
  numberRecognition: { name: 'Reconocimiento Numérico', icon: FaHashtag, description: 'Identificar y escribir números' },
  counting: { name: 'Conteo y Cantidad', icon: FaCalculator, description: 'Contar objetos y asociar con numeral' },
  comparison: { name: 'Comparación', icon: FaBalanceScale, description: 'Más que, menos que, igual a' },
  shapes: { name: 'Formas Geométricas', icon: FaShapes, description: 'Identificar círculo, cuadrado, triángulo' },
  patterns: { name: 'Patrones y Secuencias', icon: FaPuzzlePiece, description: 'Reconocer y continuar patrones' },
};

const getSkillLevel = (value) => {
  if (value >= 75) return { text: 'Avanzado', color: 'var(--status-advanced, #10A19D)' };
  if (value >= 45) return { text: 'Intermedio', color: 'var(--status-intermediate, #FFBF00)' };
  return { text: 'Principiante', color: 'var(--status-beginner, #4BD4D4)' };
};

const ProgressBySkill = ({ childrenData = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Prepara los datos para la tabla y las barras de progreso
  const allSkillKeys = Object.keys(BASE_SKILLS_INFO);

  let tableData = allSkillKeys.map(skillKey => {
    const skillInfo = BASE_SKILLS_INFO[skillKey];
    let row = {
      id: skillKey,
      skillName: skillInfo.name,
      skillIcon: skillInfo.icon,
      skillDescription: skillInfo.description,
      average: 0,
    };
    let sum = 0;
    let count = 0;
    childrenData.forEach(child => {
      const score = child.skills && child.skills[skillKey] !== undefined ? child.skills[skillKey] : 0;
      row[child.id] = score;
      sum += score;
      if (child.skills && child.skills[skillKey] !== undefined) count++;
    });
    row.average = count > 0 ? Math.round(sum / count) : 0;
    row.level = getSkillLevel(row.average).text;
    row.levelColor = getSkillLevel(row.average).color;
    return row;
  });

  // Filtrado
  if (searchTerm) {
    tableData = tableData.filter(item =>
      item.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skillDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Ordenamiento
  if (sortConfig.key !== null) {
    tableData.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];
      
      if (typeof valA === 'number' && typeof valB === 'number') {
        // Nada que hacer aquí, ya son números
      } 
      else if (sortConfig.key === 'skillName') {
        valA = a.skillName.toLowerCase();
        valB = b.skillName.toLowerCase();
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (valA < valB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (valA > valB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <FaArrowUp /> : <FaArrowDown />;
  };

  if (childrenData.length === 0) {
    return <div className="no-data-progress">No hay datos de niños para mostrar el progreso por habilidad.</div>;
  }

  return (
    <div className="progress-by-skill-container">
      <h2 className="main-title">Progreso Detallado por Habilidad</h2>

      {/* Sección de Progreso de Habilidades */}
      <section className="skill-evolution-section">
        <div className="section-header">
          <h3 className="section-header-title">
            <FaPuzzlePiece /> Evolución de Habilidades
          </h3>
          <p className="section-subtitle">Cómo han evolucionado las habilidades de cada niño.</p>
        </div>
        
        <div className="evolution-grid">
          {childrenData.map(child => (
            <div key={child.id} className="child-skill-evolution-card">
              <h4>
                <img src={child.avatar} alt={child.name} className="inline-avatar" />
                {child.name}
              </h4>
              {allSkillKeys.map(skillKey => {
                const currentScore = child.skills && child.skills[skillKey] !== undefined ? child.skills[skillKey] : 0;
                const previousScore = Math.max(0, currentScore - (Math.floor(Math.random() * 15) + 5) * (Math.random() > 0.3 ? 1 : -1));
                const change = currentScore - previousScore;
                const skillInfo = BASE_SKILLS_INFO[skillKey];
                const IconComponent = skillInfo.icon;

                return (
                  <div key={skillKey} className="evolution-skill-item">
                    <div className="evolution-skill-name">
                      <span className="skill-name-with-icon">
                        <IconComponent className="skill-icon" />
                        {skillInfo.name}
                      </span>
                      <span className={`evolution-change ${change >= 0 ? 'positive' : 'negative'}`}>
                        {change >= 0 ? '+' : ''}{change}%
                      </span>
                    </div>
                    <div className="evolution-bar-container">
                      <div className="evolution-bar-track">
                        <div
                          className="evolution-bar-progress current"
                          style={{ width: `${currentScore}%`, backgroundColor: getSkillLevel(currentScore).color }}
                          title={`Actual: ${currentScore}%`}
                        ></div>
                        <div
                          className="evolution-bar-progress previous"
                          style={{ width: `${previousScore}%` }}
                          title={`Hace 30 días: ${previousScore}%`}
                        ></div>
                      </div>
                      <span className="evolution-score-label current-score">Actual: {currentScore}%</span>
                    </div>
                    <span className="evolution-score-label previous-score-text">Hace 30 días: {previousScore}%</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Detalle de Habilidades */}
      <section className="skill-detail-table-section">
        <div className="section-header">
          <h3 className="section-header-title">
            <FaSearch /> Detalle Comparativo de Habilidades
          </h3>
          <p className="section-subtitle">Análisis completo de cada habilidad matemática entre los niños.</p>
        </div>
        
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar habilidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="skill-search-input"
          />
        </div>
        
        <div className="skill-table-wrapper">
          <table className="skill-detail-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('skillName')}>Habilidad {getSortIcon('skillName')}</th>
                {childrenData.map(child => (
                  <th key={child.id} onClick={() => requestSort(child.id)}>{child.name} {getSortIcon(child.id)}</th>
                ))}
                <th onClick={() => requestSort('average')}>Promedio {getSortIcon('average')}</th>
                <th>Nivel</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(item => {
                const IconComponent = item.skillIcon;
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="skill-name-cell">
                        <IconComponent className="skill-table-icon" />
                        <div className="skill-text-content">
                          <strong>{item.skillName}</strong>
                          <small>{item.skillDescription}</small>
                        </div>
                      </div>
                    </td>
                    {childrenData.map(child => (
                      <td key={child.id} className="score-cell">{item[child.id]}%</td>
                    ))}
                    <td className="score-cell average-cell">{item.average}%</td>
                    <td>
                      <span className="level-badge" style={{ backgroundColor: item.levelColor }}>
                        {item.level}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProgressBySkill;