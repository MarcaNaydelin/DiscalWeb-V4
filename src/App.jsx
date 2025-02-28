import React from "react";
import "./App.css";
import img1 from "./assets/img1.png";
import Nav from "./components/Nav";
import Services from "./components/Services";
import habilidad from "./assets/habilidad.png";
import confianza from "./assets/confianza.png";
import motivacion from "./assets/motivacion.png";
import Information from "./components/Information";
import discalculia from "./assets/discalculia.png";
import Causas from "./assets/causa,png.jpg";
import Sintomas from "./assets/sintomas.png";
import Tratar from "./assets/tratar.png";

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="header-content">
          <Nav></Nav>
          <div className="header-info">
            <h1>DiscalWeb</h1>
            <p>
              Bienvenido a nuestra plataforma interactiva de aprendizaje para
              niños con discalculia
            </p>
          </div>
          <div className="header-registro">
            <a href="registro.html" className="btn">
              Registro
            </a>
          </div>
        </div>
        <img src={img1} alt="img1" className="img-size" />
      </div>
      <section className="help-container">
        <div className="help-content">
          <h2>Acerca de nuestro Proyecto</h2>
          <p>
            Nuestro proyecto tiene como objetivo ayudar a los niños con
            discalculia a superar sus dificultades matemáticas a través de una
            plataforma interactiva y divertida. Utilizamos juegos educativos
            diseñados específicamente para abordar los desafíos que enfrentan
            los niños con discalculia, y nuestro sistema se adapta para
            proporcionar retroalimentación personalizada y efectiva.
          </p>
        </div>
      </section>
      <section className="services-container">
        <div className="service-content">
          <Services
            image={habilidad}
            title="Te ayudamos a refuerza tus habilidades matemáticas"
            description="Nuestros juegos están diseñados para abordar los conceptos matemáticos de una manera divertida y atractiva. Podrás
            practicar operaciones, resolver problemas y desarrollar habilidades numéricas fundamentales."
          ></Services>
          <Services
            image={confianza}
            title="Te ayudamos a mejora tu confianza"
            description="Al trabajar en un entorno amigable y estimulante. Ganarás confianza en tus habilidades matemáticas y descubrirás que
            las matemáticas pueden ser emocionantes y accesibles para ti."
          ></Services>
          <Services
            image={motivacion}
            title="Te ayudamos a incrementa tu motivación"
            description="Nuestros juegos están diseñados para abordar los conceptos matemáticos de una manera divertida y atractiva. Podrás
            practicar operaciones, resolver problemas y desarrollar habilidades numéricas fundamentales."
          ></Services>
        </div>
      </section>
      <section className="info-container">
        <h2>La discalculia</h2>
        <div className="information-list">
          <Information
            image={discalculia}
            title="¿Qué es?"
            description="La discalculia es un trastorno específico del aprendizaje de origen neurobiológico caracterizado por dificultades en la
            correcta adquisición de las habilidades matemáticas."
            className="info-1"
          ></Information>
          <Information
            image={Causas}
            title="Causas de la discalculia"
            description="La discalculia está causada por anomalías en algunas estructuras del cerebro que apoyan la representación y el
            procesamiento de informaciones numéricas. Por lo tanto, se dice que este trastorno del aprendizaje tiene un origen
            neurobiológico."
            className="info-2"
          ></Information>
          <Information
            image={Sintomas}
            title="Sintomas a detectar"
            description="La discalculia puede presentarse de forma muy heterogénea pero, en general, los niños con discalculia experimentan
            dificultades en los aspectos más básicos del procesamiento numérico y del cálculo. Estas dificultades en el aprendizaje
            de las matemáticas se manifiestan de manera diferente en función de las edades."
            className="info-1"
          ></Information>
          <Information
            image={Tratar}
            title="Como tratar la discalculia"
            description="Tras el diagnóstico deberá realizarse una intervención específica e integral que incluya trabajo dedicado con un
            especialista en trastornos del aprendizaje.
            Los niños discalcúlicos necesitan un entrenamiento adaptado, diario, basado en la comprensión de conceptos y
            procedimientos y con uso de materiales manipulativos que faciliten la comprensión numérica."
            className="info-2"
          ></Information>
        </div>
      </section>
      <footer>
        <div className="contacto-container">
          <div className="contacto-content">
            <div className="contacto">
              <h2>Contactanos</h2>
              <p>Universidad privada franz tamayo</p>
              <p>Si tienes alguna pregunta o sugerencia, no dudes en contactarnos a través de los siguientes medios:</p>
              <p>Email: naydelingirl1234@gmail.com</p>
              <p>Telefono: +591 68526105</p>
            </div>
            <div className="ubicacion">
              <h2>Nos Ubicamos</h2> 
              <p>Calle: Av. Villarroel esq. c. Portales, No. 359</p>
              <p>Ciudad: Cochabamba</p>
              <p>Departamento: Cochabamba</p>
              <p>País: Bolivia</p>
              <a href="https://unifranz.edu.bo/sedes/cochabamba/" class="btn"> Mas Informacion</a>
            </div>
          </div>
          <div class = "pieDEpagina">
            <h3>© 2024 Proyecto de Enseñanza con Juegos Interactivos - Naydelin Marca Paco</h3>
          </div>  
        </div>
      </footer>
    </div>
  );
}

export default App;
