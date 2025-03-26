import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Dashboard from "./pages/Dashboard";

const MainLayout = ({ children, includeNav = true, includeFooter = true }) => (
  <>
    {includeNav && <Nav />}
    {children}
    {includeFooter && <Footer />}
  </>
);

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  // Función para animar elementos al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".hidden");

      elements.forEach((element) => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
          element.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/"  element={
                <MainLayout includeFooter={true}>
                  <Home />
                </MainLayout>
              }
            />
            <Route  path="/login"  element={
                <MainLayout includeNav={false} includeFooter={false}>
                  <Login />
                </MainLayout>
              }
            />
            <Route path="/register" element={
                <MainLayout includeNav={false} includeFooter={false}>
                  <Register />
                </MainLayout>
              }
            />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout includeNav={false} includeFooter={false}>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
