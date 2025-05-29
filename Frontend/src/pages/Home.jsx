import React from 'react';
import Header from '../components/sections/Header';
import About from '../components/sections/About';
import CTA from '../components/sections/CTA';
import './Home.css';

// Imágenes
import headerImage from '../assets/images/img1.png';
import habilidad from '../assets/images/habilidad.png';
import confianza from '../assets/images/confianza.png';
import motivacion from '../assets/images/motivacion.png';
import discalculia from '../assets/images/discalculia.png';
import causas from '../assets/images/causa,png.jpg';
import sintomas from '../assets/images/sintomas.png';
import tratar from '../assets/images/tratar.png';

// Componentes
import Services from '../components/sections/Services';
import Information from '../components/sections/Information';

function Home() {
  // Datos para los servicios
  const servicesData = [
    {
      image: habilidad,
      title: "Refuerza tus habilidades matemáticas",
      description: "Nuestros juegos están diseñados para abordar los conceptos matemáticos de una manera divertida y atractiva. Podrás practicar operaciones, resolver problemas y desarrollar habilidades numéricas fundamentales."
    },
    {
      image: confianza,
      title: "Mejora tu confianza",
      description: "Al trabajar en un entorno amigable y estimulante, ganarás confianza en tus habilidades matemáticas y descubrirás que las matemáticas pueden ser emocionantes y accesibles para ti."
    },
    {
      image: motivacion,
      title: "Incrementa tu motivación",
      description: "Con nuestro sistema de recompensas y progresión, mantendrás la motivación alta mientras aprendes. Celebramos cada logro, por pequeño que sea, para mantener tu entusiasmo por aprender."
    }
  ];

  // Datos para la sección de información
  const infoData = [
    {
      image: discalculia,
      title: "¿Qué es la discalculia?",
      description: "La discalculia es un trastorno específico del aprendizaje de origen neurobiológico caracterizado por dificultades en la correcta adquisición de las habilidades matemáticas. Afecta la capacidad para comprender y trabajar con números y conceptos matemáticos.",
      className: "info-1"
    },
    {
      image: causas,
      title: "Causas de la discalculia",
      description: "La discalculia está causada por anomalías en algunas estructuras del cerebro que apoyan la representación y el procesamiento de informaciones numéricas. Por lo tanto, se dice que este trastorno del aprendizaje tiene un origen neurobiológico.",
      className: "info-2"
    },
    {
      image: sintomas,
      title: "Síntomas a detectar",
      description: "La discalculia puede presentarse de forma muy heterogénea pero, en general, los niños experimentan dificultades en los aspectos más básicos del procesamiento numérico y del cálculo. Estas dificultades se manifiestan de manera diferente según la edad, como problemas para contar, reconocer patrones numéricos o realizar operaciones básicas.",
      className: "info-1"
    },
    {
      image: tratar,
      title: "Cómo tratar la discalculia",
      description: "Tras el diagnóstico deberá realizarse una intervención específica e integral que incluya trabajo dedicado con un especialista en trastornos del aprendizaje. Los niños discalcúlicos necesitan un entrenamiento adaptado, diario, basado en la comprensión de conceptos y procedimientos y con uso de materiales manipulativos que faciliten la comprensión numérica.",
      className: "info-2"
    }
  ];

  return (
    <div className="home-page">
      {/* Header con imagen principal */}
      <Header image={headerImage} />
      
      {/* Sección Acerca de */}
      <About />
      
      {/* Sección de Servicios */}
      <section id="servicios" className="services-section">
        <div className="container">
          <div className="section-title">
            <h2>Cómo te ayudamos</h2>
            <p className="subtitle">Herramientas adaptadas a tus necesidades para superar la discalculia</p>
          </div>
          <div className="services-container">
            {servicesData.map((service, index) => (
              <Services
                key={index}
                image={service.image}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Sección de Información sobre Discalculia */}
      <section id="discalculia" className="info-section">
        <div className="container">
          <div className="section-title">
            <h2>La Discalculia</h2>
            <p className="subtitle">Conoce más sobre este trastorno del aprendizaje</p>
          </div>
          <div className="information-list">
            {infoData.map((info, index) => (
              <Information
                key={index}
                image={info.image}
                title={info.title}
                description={info.description}
                className={info.className}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Sección CTA (Call to Action) */}
      <CTA />
    </div>
  );
}

export default Home;