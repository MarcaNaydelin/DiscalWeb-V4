import React from 'react';
import { FaUserPlus, FaCog, FaMobileAlt, FaChartBar } from 'react-icons/fa';
import './Overview.css';
import Button from '../ui/Button'; // Asegúrate que esta ruta es correcta

const Overview = ({ children, onAddChild }) => {
  return (
    <div className="overview-container">
      <header className="overview-header">
        <div className="header-branding">
          <img 
            src="/src/assets/images/logopanelp.png" // Asegúrate que la ruta al logo es correcta
            alt="DiscalWeb Logo" 
            className="header-logo" 
          />
          <h1>DiscalWeb</h1>
        </div>
        <Button 
          onClick={onAddChild} 
          type="primary" // Asumo que tu Button tiene una prop 'type'
          className="add-profile-btn-header" // Clase específica para este botón
        >
          <FaUserPlus className="btn-icon" /> Añadir Perfil de Niño
        </Button>
      </header>

      <section className="welcome-section">
        <div className="welcome-content">
          <h2>¡Bienvenido a DiscalWeb!</h2>
          <p>Comienza a monitorear el progreso de aprendizaje matemático de tus hijos.</p>
          
          <div className="first-steps">
            {[
              { text: "Crea un perfil para tu hijo/a", icon: <FaUserPlus /> },
              { text: "Configura sus datos básicos", icon: <FaCog /> },
              { text: "Accede a los juegos desde el dispositivo móvil", icon: <FaMobileAlt /> },
              { text: "Monitorea su progreso desde este panel", icon: <FaChartBar /> }
            ].map((step, index) => (
              <div key={index} className="step">
                <span className="step-number">{index + 1}</span>
                <div className="step-icon-wrapper">{step.icon}</div>
                <p className="step-text">{step.text}</p>
              </div>
            ))}
          </div>

          <Button 
            onClick={onAddChild} 
            type="primary"
            className="create-profile-btn-welcome" // Clase específica
          >
            <FaUserPlus className="btn-icon" /> Crear Perfil de Niño
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Overview;