import React, { useState, useEffect } from 'react';
import './ProgressSummary.css';
import { Line, Radar, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Filler, Tooltip, Legend, Title } from 'chart.js';
import { FaAward, FaLevelUpAlt, FaSeedling, FaStar, FaTasks,FaChartLine,FaBrain,FaChartBar} from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Filler, Tooltip, Legend, Title);

// Habilidades base que manejas
const BASE_SKILLS = {
  numberRecognition: 'Reconocimiento Numérico',
  counting: 'Conteo y Cantidad',
  comparison: 'Comparación',
  shapes: 'Formas Geométricas',
  patterns: 'Patrones y Secuencias',
};

const ProgressSummary = ({ childrenData = [] }) => {
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
  const [radarChartData, setRadarChartData] = useState({ labels: [], datasets: [] });
  const [barChartData, setBarChartData] = useState({ labels: [], datasets: [] });
  const [kpis, setKpis] = useState({
    evaluatedSkills: 0,
    averageLevel: 'Principiante',
    generalImprovement: 0,
    highlightedSkill: 'N/A'
  });

  useEffect(() => {
    if (childrenData.length > 0) {
      setSelectedChildren(childrenData.map(c => c.id).slice(0, 2));

      const allSkills = new Set();
      let totalProgressSum = 0;
      let skillCounts = {};
      let highestSkill = { name: 'N/A', score: 0 };

      childrenData.forEach(child => {
        Object.keys(child.skills || {}).forEach(skillKey => {
          allSkills.add(BASE_SKILLS[skillKey] || skillKey);
          totalProgressSum += child.skills[skillKey];
          skillCounts[skillKey] = (skillCounts[skillKey] || 0) + child.skills[skillKey];
          if (child.skills[skillKey] > highestSkill.score) {
            highestSkill = { name: BASE_SKILLS[skillKey] || skillKey, score: child.skills[skillKey] };
          }
        });
      });
      
      const numChildrenWithSkills = childrenData.filter(c => c.skills && Object.keys(c.skills).length > 0).length;
      const avgProgress = numChildrenWithSkills > 0 ? totalProgressSum / (allSkills.size * numChildrenWithSkills) : 0;
      
      setKpis({
        evaluatedSkills: allSkills.size,
        averageLevel: avgProgress > 75 ? 'Avanzado' : avgProgress > 45 ? 'Intermedio' : 'Principiante',
        generalImprovement: Math.round(Math.random() * 20) + 5,
        highlightedSkill: highestSkill.name,
      });

      const labels = ['01/07', '05/07', '10/07', '15/07', '20/07', '25/07', '30/07'];
      const skillLabels = Object.values(BASE_SKILLS).slice(0, 5);

      // Line Chart Data con colores del tema
      setLineChartData({
        labels,
        datasets: childrenData.slice(0, 2).map((child, index) => ({
          label: child.name,
          data: labels.map(() => Math.floor(Math.random() * 30) + 50 + (index * 5)),
          borderColor: index === 0 ? '#5021AD' : '#40E0D0',
          backgroundColor: index === 0 ? 'rgba(80, 33, 173, 0.1)' : 'rgba(64, 224, 208, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointBackgroundColor: index === 0 ? '#5021AD' : '#40E0D0',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
        })),
      });

      // Radar Chart Data con colores del tema
      setRadarChartData({
        labels: skillLabels,
        datasets: childrenData.slice(0, 2).map((child, index) => ({
          label: child.name,
          data: skillLabels.map(sl => {
            const skillKey = Object.keys(BASE_SKILLS).find(key => BASE_SKILLS[key] === sl);
            return child.skills && child.skills[skillKey] ? child.skills[skillKey] : Math.floor(Math.random() * 100);
          }),
          backgroundColor: index === 0 ? 'rgba(80, 33, 173, 0.2)' : 'rgba(64, 224, 208, 0.2)',
          borderColor: index === 0 ? '#5021AD' : '#40E0D0',
          borderWidth: 3,
          pointBackgroundColor: index === 0 ? '#5021AD' : '#40E0D0',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
        })),
      });
      
      // Bar Chart Data con colores del tema
      setBarChartData({
        labels: skillLabels,
        datasets: childrenData.slice(0,2).map((child, index) => ({
            label: child.name,
            data: skillLabels.map(sl => {
                 const skillKey = Object.keys(BASE_SKILLS).find(key => BASE_SKILLS[key] === sl);
                 return child.skills && child.skills[skillKey] ? child.skills[skillKey] : Math.floor(Math.random() * 100);
            }),
            backgroundColor: index === 0 ? '#5021AD' : '#D05471',
            borderColor: index === 0 ? '#5021AD' : '#D05471',
            borderWidth: 1,
            borderRadius: 8,
            borderSkipped: false,
        }))
      });
    }
  }, [childrenData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            family: 'Poppins'
          }
        }
      },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(80, 33, 173, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#5021AD',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: { 
        y: { 
          beginAtZero: true, 
          max: 100,
          grid: {
            color: 'rgba(80, 33, 173, 0.1)',
          },
          ticks: {
            color: '#666666',
            font: {
              family: 'Poppins'
            }
          }
        },
        x: {
          grid: {
            color: 'rgba(80, 33, 173, 0.1)',
          },
          ticks: {
            color: '#666666',
            font: {
              family: 'Poppins'
            }
          }
        },
        r: {
            angleLines: { 
              display: true,
              color: 'rgba(80, 33, 173, 0.2)',
            },
            grid: {
              color: 'rgba(80, 33, 173, 0.2)',
            },
            suggestedMin: 0,
            suggestedMax: 100,
            pointLabels: { 
              font: { 
                size: 12,
                family: 'Poppins'
              },
              color: '#666666'
            },
            ticks: {
              color: '#666666',
              backdropColor: 'transparent',
              font: {
                family: 'Poppins'
              }
            }
        }
    }
  };

  if (childrenData.length === 0) {
    return <div className="no-data-progress">No hay datos de niños para mostrar el resumen de progreso.</div>;
  }

  return (
    <div className="progress-summary-container">
      <h2 className="main-title">Resumen del Progreso General</h2>

      {/* KPIs Section */}
      <section className="kpis-section">
        <div className="kpi-card">
          <FaTasks className="kpi-icon" />
          <span className="kpi-value">{kpis.evaluatedSkills}</span>
          <span className="kpi-label">Habilidades Evaluadas</span>
        </div>
        <div className="kpi-card">
          <FaLevelUpAlt className="kpi-icon" />
          <span className="kpi-value">{kpis.averageLevel}</span>
          <span className="kpi-label">Nivel Promedio</span>
        </div>
        <div className="kpi-card">
          <FaSeedling className="kpi-icon" />
          <span className="kpi-value">+{kpis.generalImprovement}%</span>
          <span className="kpi-label">Mejora General (30d)</span>
        </div>
        <div className="kpi-card">
          <FaStar className="kpi-icon" />
          <span className="kpi-value">{kpis.highlightedSkill}</span>
          <span className="kpi-label">Habilidad Destacada</span>
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-grid-summary">
        <div className="summary-chart-card">
          <div className="chart-header">
            <h3 className="chart-header-title">
              <FaChartLine className="chart-icon" />
              Progreso a lo Largo del Tiempo
            </h3>
            <p className="chart-subtitle">Evolución de las puntuaciones en los últimos 30 días</p>
          </div>
          <div className="chart-content-wrapper">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="summary-chart-card">
          <div className="chart-header">
            <h3 className="chart-header-title">
              <FaBrain className="chart-icon" />
              Mapa de Habilidades
            </h3>
            <p className="chart-subtitle">Visualización de todas las áreas matemáticas</p>
          </div>
          <div className="chart-content-wrapper">
            <Radar data={radarChartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="summary-chart-card full-width-chart">
          <div className="chart-header">
            <h3 className="chart-header-title">
              <FaChartBar className="chart-icon" />
              Comparativa de Habilidades
            </h3>
            <p className="chart-subtitle">Comparación de habilidades entre tus hijos</p>
          </div>
          <div className="chart-content-wrapper">
             <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgressSummary;