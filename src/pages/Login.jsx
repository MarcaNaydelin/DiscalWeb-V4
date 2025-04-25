import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import "./Login.css";

import loginImage from "../assets/register_login/login.png";

const Login = () => {
  return (
    <section className="login-section">
      <div className="container">
        <div className="login-container">
          <div className="login-image">
            <div className="image-container">
              <img
                src={loginImage}
                alt="Educación ilustración"
                className="login-illustration"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/500x400?text=DISCAL+Login";
                }}
              />
            </div>
          </div>
          <div className="login-content">
            <h2>Iniciar Sesión</h2>
            <p>Ingresa a tu cuenta para ver el progreso de tus hijos</p>
            <LoginForm />
            <div className="login-footer">
              <p>
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="login-link">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="background-decoration"></div>
    </section>
  );
};

export default Login;