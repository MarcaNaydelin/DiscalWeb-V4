import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import "./Register.css";
// Importar la imagen directamente para garantizar que se cargue correctamente
import loginImage from "../assets/register_login/login.png";

const Register = () => {
  return (
    <section className="register-section">
      <div className="container">
        <div className="register-container">
          <div className="register-content">
            <h2>Crear Cuenta</h2>
            <p>Regístrate para acceder a la plataforma y monitorear el progreso de tus hijos</p>
            <RegisterForm />
            <div className="register-footer">
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="register-link">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
          <div className="register-image">
            <div className="image-container">
              <img
                src={loginImage}
                alt="Educación ilustración"
                className="register-illustration"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/500x400?text=DISCAL+Register";
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="background-decoration"></div>
    </section>
  );
};

export default Register;