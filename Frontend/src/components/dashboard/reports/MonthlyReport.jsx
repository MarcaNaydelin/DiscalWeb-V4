// src/components/dashboard/reports/MonthlyReport.jsx
import React, { useState, useEffect } from 'react';
import './Reports.css'; // Usaremos un CSS común para los reportes
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title } from 'chart.js';
import { FaCalendarAlt, FaFilter, FaDownload, FaUserCircle, FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaChartLine, FaClock, FaClipboardCheck, FaBullseye } from 'react-icons/fa';
import Button from '../../ui/Button'; // Asumiendo que tienes este componente

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const BASE_SKILLS_REPORTS = {
  numberRecognition: 'Reconocimiento Numérico',
  counting: 'Conteo',
  comparison: 'Comparación',
  shapes: 'Formas',
  patterns: 'Patrones',
  sumas: 'Operaciones Básicas (Sumas)', // Agrupamos
  restas: 'Operaciones Básicas (Restas)',
  problemas: 'Resolución de Problemas',
  // geometria: 'Geometría'
};


const MonthlyReport = ({ childrenData = [] }) => {
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('last-month'); // o 'last-3-months', 'last-6-months'
  const [reportData, setReportData] = useState(null);
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Si hay niños y no hay ninguno seleccionado, selecciona el primero
    if (childrenData.length > 0 && !selectedChildId) {
      setSelectedChildId(childrenData[0].id);
    }
  }, [childrenData, selectedChildId]);

  useEffect(() => {
    if (selectedChildId) {
      const child = childrenData.find(c => c.id === selectedChildId);
      if (child) {
        // --- Simular carga de datos para el reporte ---
        const today = new Date();
        const startDate = new Date();
        if (selectedPeriod === 'last-month') startDate.setMonth(today.getMonth() - 1);
        else if (selectedPeriod === 'last-3-months') startDate.setMonth(today.getMonth() - 3);
        else startDate.setMonth(today.getMonth() - 6);

        const periodString = `${startDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })} - ${today.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}`;
        
        const overallProgress = child.progress || Math.floor(Math.random() * 30) + 70; // 70-100
        const improvement = Math.floor(Math.random() * 15) + 5; // 5-20%
        
        // Simular fortalezas y áreas de mejora
        const skillKeys = Object.keys(child.skills || BASE_SKILLS_REPORTS);
        const strengths = skillKeys.sort(() => 0.5 - Math.random()).slice(0, 2).map(key => ({
            name: BASE_SKILLS_REPORTS[key] || key,
            improvement: Math.floor(Math.random() * 10) + 5
        }));
        const weaknesses = skillKeys.filter(k => !strengths.find(s => s.name === (BASE_SKILLS_REPORTS[k] || k)))
                                  .sort(() => 0.5 - Math.random()).slice(0, 2).map(key => ({
            name: BASE_SKILLS_REPORTS[key] || key,
            deficit: Math.floor(Math.random() * 10) + 1
        }));


        setReportData({
          childName: child.name,
          childAvatar: child.avatar,
          childAge: child.age, // Asume que 'age' es 'X años' o un número
          childGrade: child.grade || 'N/A', // Asume que tienes 'grade'
          period: periodString,
          overallProgress: overallProgress,
          status: overallProgress > 85 ? 'Excelente' : overallProgress > 65 ? 'Avanzando bien' : 'Necesita apoyo',
          statusColor: overallProgress > 85 ? 'var(--status-excellent)' : overallProgress > 65 ? 'var(--status-advanced)' : 'var(--status-intermediate)',
          summaryText: `${child.name} ha mostrado un progreso ${overallProgress > 75 ? 'constante' : 'variable'} durante los últimos meses, con una mejora significativa en ${strengths.length > 0 ? strengths[0].name : 'habilidades generales'}. Las áreas que requieren más atención son ${weaknesses.length > 0 ? weaknesses.map(w=>w.name).join(' y ') : 'ninguna en particular'}.`,
          kpis: [
            { label: 'Total de Sesiones', value: Math.floor(Math.random() * 30) + 20, change: `+${Math.floor(Math.random() * 10) + 1}%` , icon: <FaClipboardCheck/> },
            { label: 'Tiempo Total', value: `${Math.floor(Math.random() * 40) + 10}h ${Math.floor(Math.random() * 59)}m`, change: `+${Math.floor(Math.random() * 10) + 1}%`, icon: <FaClock/> },
            { label: 'Puntuación Media', value: `${Math.floor(Math.random() * 20) + 65}%`, change: `+${Math.floor(Math.random() * 5) + 1}%` , icon: <FaBullseye/>},
            { label: 'Mejora General', value: `+${improvement}%`, change: `+${Math.floor(Math.random() * 5)}%`, icon: <FaChartLine/> },
          ],
          strengths,
          weaknesses,
          recommendations: {
            problems: weaknesses.find(w => w.name.toLowerCase().includes('problemas')) ? [
                "Dedicar 15 minutos diarios a ejercicios de resolución de problemas.",
                "Utilizar el juego 'Aventura Matemática' en nivel intermedio.",
                "Practicar la descomposición de problemas en pasos más pequeños."
            ] : [],
            operations: weaknesses.find(w => w.name.toLowerCase().includes('operaciones')) ? [
                "Sesiones cortas pero frecuentes (3-5 minutos) de práctica de cálculo.",
                "Utilizar el juego 'Carrera de Sumas' para mejorar la velocidad.",
                "Practicar con tarjetas de operaciones durante 10 minutos al día."
            ] : [],
            strengthsMaintenance: strengths.map(s => `Continuar con actividades de ${s.name.toLowerCase()} en nivel avanzado.`)
          }
        });

        // Line Chart Data (Comparativa de Progreso del niño vs Promedio)
        const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']; // O meses dinámicos
        setLineChartData({
          labels,
          datasets: [
            {
              label: child.name,
              data: labels.map(() => Math.floor(Math.random() * 30) + 40),
              borderColor: 'var(--primary-color)',
              backgroundColor: 'rgba(80, 33, 173, 0.1)',
              tension: 0.2,
              fill: false,
            },
            {
              label: 'Promedio',
              data: labels.map(() => Math.floor(Math.random() * 20) + 30),
              borderColor: 'var(--info-color)', // Turquesa
              backgroundColor: 'rgba(64, 224, 208, 0.1)',
              tension: 0.2,
              borderDash: [5, 5], // Línea punteada para promedio
              fill: false,
            },
          ],
        });
      }
    } else {
      setReportData(null); // Limpiar datos si no hay niño seleccionado
    }
  }, [selectedChildId, selectedPeriod, childrenData]);

  const handleChildChange = (e) => setSelectedChildId(parseInt(e.target.value));
  const handlePeriodChange = (e) => setSelectedPeriod(e.target.value);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' }, title: { display: false } },
    scales: { y: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } },
  };

  if (childrenData.length === 0) {
    return <div className="report-container no-data">No hay perfiles de niños para generar reportes.</div>;
  }
  
  return (
    <div className="report-container monthly-report">
      <header className="report-header">
        <h1>Reportes y Análisis</h1>
        <div className="report-filters">
          <div className="filter-group">
            <FaUserCircle />
            <select value={selectedChildId || ''} onChange={handleChildChange}>
              <option value="" disabled>Seleccionar Niño</option>
              {childrenData.map(child => (
                <option key={child.id} value={child.id}>{child.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <FaCalendarAlt />
            <select value={selectedPeriod} onChange={handlePeriodChange}>
              <option value="last-month">Último Mes</option>
              <option value="last-3-months">Últimos 3 Meses</option>
              <option value="last-6-months">Últimos 6 Meses</option>
            </select>
          </div>
          <Button type="primary" className="export-button">
            <FaDownload /> Exportar
          </Button>
        </div>
      </header>

      {!reportData && selectedChildId && <div className="loading-report">Generando reporte...</div>}
      {!selectedChildId && <div className="select-child-prompt">Por favor, selecciona un niño para ver su reporte.</div>}

      {reportData && (
        <main className="report-content">
          <section className="report-main-summary card-style">
            <div className="report-child-info">
              {reportData.childAvatar ? 
                <img src={reportData.childAvatar} alt={reportData.childName} className="report-avatar" /> :
                <div className="report-avatar-placeholder"><FaUserCircle/></div>
              }
              <h2>Reporte de Progreso: {reportData.childName}</h2>
              <span className="report-status-badge" style={{backgroundColor: reportData.statusColor}}>{reportData.status}</span>
            </div>
            <p className="report-period-info">
              <strong>Periodo:</strong> {reportData.period} • <strong>Edad:</strong> {reportData.childAge} • <strong>Grado:</strong> {reportData.childGrade}
            </p>
            <p className="report-text-summary">{reportData.summaryText}</p>
            <div className="report-overall-progress">
              <span>Progreso general</span>
              <strong>{reportData.overallProgress}%</strong>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${reportData.overallProgress}%` }}></div>
            </div>
          </section>

          <section className="report-kpis-grid">
            {reportData.kpis.map(kpi => (
              <div key={kpi.label} className="kpi-item-report card-style">
                <div className="kpi-icon-report">{kpi.icon}</div>
                <div className="kpi-data-report">
                    <span className="kpi-value-report">{kpi.value}</span>
                    <span className="kpi-label-report">{kpi.label}</span>
                </div>
                <span className="kpi-change-report">{kpi.change} vs periodo anterior</span>
              </div>
            ))}
          </section>
          
          <div className="report-charts-comparison">
            <section className="report-chart-item card-style">
              <h3>Comparativa de Progreso</h3>
              <p className="chart-item-subtitle">Velocidad de progreso comparada</p>
              <div className="report-chart-wrapper">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </section>

            <section className="report-analysis-item card-style">
              <h3>Análisis Comparativo</h3>
              <p className="chart-item-subtitle">Fortalezas y áreas de mejora en comparación</p>
              <div className="analysis-box strengths-box">
                <h4><FaCheckCircle /> Fortalezas destacadas</h4>
                <p><strong>{reportData.childName}</strong> muestra un desempeño por encima del promedio en:</p>
                <ul>
                  {reportData.strengths.map(s => <li key={s.name}>{s.name} (+{s.improvement}% sobre el promedio)</li>)}
                </ul>
              </div>
              <div className="analysis-box weaknesses-box">
                <h4><FaExclamationTriangle /> Áreas por debajo del promedio</h4>
                <p>Las siguientes áreas requieren atención adicional:</p>
                <ul>
                  {reportData.weaknesses.map(w => <li key={w.name}>{w.name} (-{w.deficit}% bajo el promedio)</li>)}
                </ul>
              </div>
            </section>
          </div>

          <section className="report-recommendations card-style">
            <h3><FaLightbulb /> Recomendaciones Personalizadas</h3>
            <p className="chart-item-subtitle">Sugerencias basadas en el análisis comparativo</p>
            
            {reportData.recommendations.problems.length > 0 && (
              <div className="recommendation-category">
                <h4>Plan de acción para {reportData.weaknesses.find(w => w.name.toLowerCase().includes('problemas'))?.name || 'resolución de problemas'}</h4>
                <ul>{reportData.recommendations.problems.map((rec, i) => <li key={i}>{rec}</li>)}</ul>
              </div>
            )}
             {reportData.recommendations.operations.length > 0 && (
              <div className="recommendation-category">
                <h4>Mejora de {reportData.weaknesses.find(w => w.name.toLowerCase().includes('operaciones'))?.name || 'operaciones básicas'}</h4>
                <ul>{reportData.recommendations.operations.map((rec, i) => <li key={i}>{rec}</li>)}</ul>
              </div>
            )}
            {reportData.recommendations.strengthsMaintenance.length > 0 && (
                <div className="recommendation-category maintain-strengths">
                    <h4>Mantener el progreso en áreas fuertes</h4>
                    <ul>{reportData.recommendations.strengthsMaintenance.map((rec, i) => <li key={i}>{rec}</li>)}</ul>
                </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
};

export default MonthlyReport;