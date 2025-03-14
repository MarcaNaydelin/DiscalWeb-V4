import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/variables.css";
import "./styles/globals.css";

// Componentes
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Layout wrapper component to control which pages get the footer
const MainLayout = ({ children, includeFooter = true }) => (
  <>
    {children}
    {includeFooter && <Footer />}
  </>
);

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
    // Execute once on load to animate initially visible elements
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={
              <MainLayout includeFooter={true}>
                <Home />
              </MainLayout>
            } />
            <Route path="/login" element={
              <MainLayout includeFooter={false}>
                <Login />
              </MainLayout>
            } />
            <Route path="/register" element={
              <MainLayout includeFooter={false}>
                <Register />
              </MainLayout>
            } />
            {/* Agregar más rutas según sea necesario */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;