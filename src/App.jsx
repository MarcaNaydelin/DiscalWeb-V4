import React, { useEffect } from "react";
import "./App.css";
import "./styles/variables.css";
import "./styles/globals.css";

// Componentes
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

function App() {
  // Función para animar elementos al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.hidden');
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
          element.classList.add('show');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Ejecutar una vez al cargar para animar elementos visibles inicialmente
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <Nav />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;