import React from 'react';
import './About.css';

function About() {
  return (
    <section id="ayuda" className="about-section">
      <div className="container">
        <div className="section-title hidden">
          <h2>Acerca de nuestro Proyecto</h2>
        </div>
        <div className="about-content hidden">
          <div className="about-text">
            <p>
              Nuestro proyecto tiene como objetivo ayudar a los niños con
              discalculia a superar sus dificultades matemáticas a través de una
              plataforma interactiva y divertida. Utilizamos juegos educativos
              diseñados específicamente para abordar los desafíos que enfrentan
              los niños con discalculia, y nuestro sistema se adapta para
              proporcionar retroalimentación personalizada y efectiva.
            </p>
            <p>
              A través de actividades lúdicas y ejercicios adaptados al nivel de cada niño,
              logramos transformar el aprendizaje de las matemáticas en una experiencia 
              positiva y motivadora, fortaleciendo su confianza y desarrollando 
              habilidades numéricas fundamentales de manera progresiva.
            </p>
          </div>
          <div className="about-features">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-gamepad"></i>
              </div>
              <h3>Juegos Interactivos</h3>
              <p>Actividades divertidas diseñadas por profesionales de la educación especial</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Seguimiento de Progreso</h3>
              <p>Monitoreo detallado del avance y áreas de mejora para cada estudiante</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Comunidad de Apoyo</h3>
              <p>Recursos para padres y educadores para acompañar el proceso de aprendizaje</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;