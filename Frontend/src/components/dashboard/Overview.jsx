import React from 'react';
import { FaUserPlus, FaCog, FaMobileAlt, FaChartBar } from 'react-icons/fa';
import './Overview.css';

const Overview = ({ children, onAddChild }) => {
  return (
    <div className="overview-container">
      <header className="overview-header">
        <div className="header-branding">
          <img 
            src="/src/assets/images/logopanelp.png" 
            alt="DiscalWeb Logo" 
            className="header-logo" 
          />
          <h1>DiscalWeb</h1>
        </div>
        <button 
          onClick={onAddChild} 
          className="btn btn-primary add-profile-btn"
        >
          <FaUserPlus className="btn-icon" /> Añadir Perfil de Niño
        </button>
      </header>

      <section className="welcome-section">
        <div className="welcome-content">
          <h2>¡Bienvenido a DiscalWeb!</h2>
          <p>Comienza a monitorear el progreso de aprendizaje matemático de tus hijos.</p>
          
          <div className="first-steps">
            {[
              { 
                text: "Crea un perfil para tu hijo/a", 
                icon: <FaUserPlus /> 
              },
              { 
                text: "Configura sus datos básicos", 
                icon: <FaCog /> 
              },
              { 
                text: "Accede a los juegos desde el dispositivo móvil", 
                icon: <FaMobileAlt /> 
              },
              { 
                text: "Monitorea su progreso desde este panel", 
                icon: <FaChartBar /> 
              }
            ].map((step, index) => (
              <div key={index} className="step">
                <span className="step-number">{index + 1}</span>
                <div className="step-content">
                  <div className="step-icon">{step.icon}</div>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={onAddChild} 
            className="btn btn-primary create-profile-btn"
          >
            <FaUserPlus className="btn-icon" /> Crear Perfil de Niño
          </button>
        </div>
      </section>
    </div>
  );
};

export default Overview;