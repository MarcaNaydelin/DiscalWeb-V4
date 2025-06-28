// src/components/dashboard/reports/CompareReport.jsx
import React, { useState, useEffect } from 'react';
import './Reports.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title } from 'chart.js';
import { FaUsers, FaBalanceScale, FaUserFriends, FaChartBar, FaUserCircle } from 'react-icons/fa'; // Agregado FaUserCircle
import MultiSelect from '../../ui/MultiSelect';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const SKILL_NAMES_COMPARE = {
  numberRecognition: 'Reconocimiento',
  counting: 'Conteo',
  operations: 'Operaciones',
  comparison: 'Comparación',
  problemas: 'Problemas',
  shapes: 'Formas',
  patterns: 'Patrones',
};

// Mueve getSkillLevel fuera del componente para que sea una función helper reutilizable
const getSkillLevel = (value) => {
  if (value >= 75) return { text: 'Avanzado', color: 'var(--status-advanced, #10A19D)' };
  if (value >= 45) return { text: 'Intermedio', color: 'var(--status-intermediate, #FFBF00)' };
  return { text: 'Principiante', color: 'var(--status-beginner, #4BD4D4)' };
};

const CompareReport = ({ childrenData = [] }) => {
  const [selectedChildrenIds, setSelectedChildrenIds] = useState([]);
  const [comparisonChartData, setComparisonChartData] = useState({ labels: [], datasets: [] });
  const [childrenOptions, setChildrenOptions] = useState([]);

  useEffect(() => {
    const options = childrenData.map(child => ({ value: child.id, label: child.name }));
    setChildrenOptions(options);
    if (childrenData.length > 0) {
      setSelectedChildrenIds(childrenData.slice(0, Math.min(childrenData.length, 2)).map(c => c.id)); // Solo IDs
    }
  }, [childrenData]);

  useEffect(() => {
    if (selectedChildrenIds.length > 0 && childrenData.length > 0) {
      const selectedChildrenDetails = childrenData.filter(child => selectedChildrenIds.includes(child.id));
      
      const skillLabels = Object.values(SKILL_NAMES_COMPARE);
      const skillKeys = Object.keys(SKILL_NAMES_COMPARE);

      setComparisonChartData({
        labels: skillLabels,
        datasets: selectedChildrenDetails.map((child, index) => {
          const childSkills = child.skills || {};
          let operationsScore = 0;
          let opCount = 0;
          if (childSkills.sumas !== undefined) { operationsScore += childSkills.sumas; opCount++; }
          if (childSkills.restas !== undefined) { operationsScore += childSkills.restas; opCount++; }
          const processedChildSkills = {...childSkills}; // Copia para no mutar el original
          if (opCount > 0) processedChildSkills.operations = Math.round(operationsScore / opCount);

          return {
            label: child.name,
            data: skillKeys.map(key => processedChildSkills[key] || Math.floor(Math.random() * 20) + 30),
            backgroundColor: index % 2 === 0 ? 'rgba(80, 33, 173, 0.8)' : 'rgba(208, 84, 113, 0.8)',
            borderColor: index % 2 === 0 ? 'rgb(80, 33, 173)' : 'rgb(208, 84, 113)',
            borderWidth: 1,
          };
        }),
      });
    } else {
      setComparisonChartData({ labels: [], datasets: [] });
    }
  }, [selectedChildrenIds, childrenData]);

  const handleSelectedChildrenChange = (selectedOptions) => {
    setSelectedChildrenIds(selectedOptions.map(option => option.value));
  };

  const chartOptions = { /* ... (sin cambios) ... */ };

  if (childrenData.length === 0) {
    return <div className="report-container no-data">No hay perfiles de niños para comparar.</div>;
  }

  return (
    <div className="report-container compare-report">
      <header className="report-header">
        <h1><FaBalanceScale /> Comparar Reportes de Progreso</h1>
        <div className="report-filters">
          <div className="filter-group multi-select-filter">
            <FaUsers />
            <MultiSelect
                options={childrenOptions}
                value={childrenOptions.filter(opt => selectedChildrenIds.includes(opt.value))}
                onChange={handleSelectedChildrenChange}
                labelledBy="Seleccionar Niños"
                hasSelectAll={true} // Permitir seleccionar/deseleccionar todos
                overrideStrings={{
                    selectSomeItems: "Seleccionar niños...",
                    allItemsAreSelected: "Todos seleccionados",
                    selectAll: "Seleccionar Todos",
                    clearAll: "Limpiar Selección"
                }}
            />
          </div>
        </div>
      </header>

      {selectedChildrenIds.length === 0 && <div className="select-child-prompt">Por favor, selecciona al menos un niño para comparar.</div>}
      
      {selectedChildrenIds.length > 0 && (
        <main className="report-content">
          <section className="report-chart-item card-style full-width-chart">
            <h3><FaChartBar /> Comparativa de Habilidades</h3>
            <p className="chart-item-subtitle">Comparación de habilidades entre los niños seleccionados</p>
            <div className="report-chart-wrapper large-chart">
              <Bar data={comparisonChartData} options={chartOptions} />
            </div>
          </section>

          <section className="profiles-overview-comparison card-style">
             <h3><FaUserFriends/> Perfiles Seleccionados</h3>
             <div className="profiles-list-compare">
                {childrenData
                    .filter(child => selectedChildrenIds.includes(child.id))
                    .map(child => {
                        // Calcula overallProgress para este child
                        const skillsObject = child.skills || {};
                        const skillValues = Object.values(skillsObject);
                        const overallProgress = skillValues.length > 0 
                            ? Math.round(skillValues.reduce((a,b) => a + b, 0) / skillValues.length)
                            : child.progress || 0; // Fallback a child.progress si no hay skills
                        
                        // Llama a getSkillLevel aquí para obtener levelData para este child
                        const levelData = getSkillLevel(overallProgress); 
                        
                        return (
                            <div key={child.id} className="profile-item-compare">
                                {child.avatar ?
                                    <img src={child.avatar} alt={child.name} className="profile-avatar-compare"/>
                                    : <div className="profile-avatar-placeholder-compare"><FaUserCircle/></div> // Asegúrate de importar FaUserCircle
                                }
                                <div className="profile-info-compare">
                                    <h4>{child.name}</h4>
                                    {/* Ahora levelData.text y levelData.color estarán definidos */}
                                    <p>{child.age} • {child.grade || 'N/A'} • Nivel {levelData.text}</p>
                                    <div className="profile-progress-bar-container-compare">
                                        <div className="profile-progress-bar-fill-compare" style={{ width: `${overallProgress}%`, backgroundColor: levelData.color }}></div>
                                    </div>
                                </div>
                                <span className="profile-progress-tag-compare" style={{backgroundColor: levelData.color}}>{overallProgress}% Progreso</span>
                            </div>
                        )
                    })
                }
             </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default CompareReport;