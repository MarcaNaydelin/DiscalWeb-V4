import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginForm.css";
import AlertNotification, { alertMessages } from "../ui/AlertNotification";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const LoginForm = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      
      if (!res.ok) {
        // Manejo específico de errores del servidor
        let errorMessage = alertMessages.loginError;
        
        if (res.status === 404 || data.message?.includes("not found") || data.message?.includes("no encontrado")) {
          errorMessage = alertMessages.userNotFound;
        } else if (res.status === 401 || data.message?.includes("credencial") || data.message?.includes("password")) {
          errorMessage = alertMessages.loginError;
        } else if (res.status >= 500) {
          errorMessage = alertMessages.serverError;
        } else if (data.message) {
          errorMessage = data.message;
        }
        
        throw new Error(errorMessage);
      }

      // Guardar datos de usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.parent || data.user));
      localStorage.setItem("isLoggedIn", "true");

      // Mostrar mensaje de éxito
      setAlert({ 
        type: "success", 
        message: alertMessages.loginSuccess 
      });
      
      // Redirigir después de 1.5 segundos
      setTimeout(() => navigate("/dashboard"), 1500);
      
    } catch (error) {
      // Manejo de errores de red
      let errorMessage = error.message;
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = alertMessages.connectionError;
      } else if (!error.message || error.message === 'Failed to fetch') {
        errorMessage = alertMessages.networkError;
      }
      
      setAlert({ 
        type: "error", 
        message: errorMessage 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-form-container">
      {alert && (
        <AlertNotification
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`form-control ${errors.email && touched.email ? "error" : ""}`}
                placeholder="tucorreo@ejemplo.com"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <Field
                type="password"
                name="password"
                id="password"
                className={`form-control ${errors.password && touched.password ? "error" : ""}`}
                placeholder="••••••••"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-footer">
              <div className="remember-forgot">
                <label className="checkbox-container">
                  <Field type="checkbox" name="remember" />
                  <span className="checkmark"></span>
                  Recordarme
                </label>
                <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={22} style={{ color: "#fff" }} />
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;