import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./RegisterForm.css";
import AlertNotification, { alertMessages } from "../ui/AlertNotification";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder 50 caracteres")
      .required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Confirmar contraseña es obligatorio"),
    termsAccepted: Yup.boolean().oneOf(
      [true],
      "Debes aceptar los términos y condiciones"
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        // Manejo específico de errores del servidor
        let errorMessage = alertMessages.registerError;
        
        if (data.message?.includes("email") || data.message?.includes("correo")) {
          errorMessage = alertMessages.registerEmailExists;
        } else if (data.message?.includes("usuario") || data.message?.includes("user")) {
          errorMessage = alertMessages.registerUserExists;
        } else if (data.message) {
          errorMessage = data.message;
        }
        
        throw new Error(errorMessage);
      }

      // Éxito
      setAlert({ 
        type: "success", 
        message: alertMessages.registerSuccess 
      });
      
      // Redirigir después de 2 segundos
      setTimeout(() => navigate("/login"), 2000);
      
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
    <div className="register-form-container">
      {alert && (
        <AlertNotification
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="register-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <Field 
                  type="text" 
                  name="name" 
                  id="name"
                  className={`form-control ${errors.name && touched.name ? "error" : ""}`} 
                  placeholder="Tu nombre completo" 
                />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <Field 
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword"
                  className={`form-control ${errors.confirmPassword && touched.confirmPassword ? "error" : ""}`} 
                  placeholder="••••••••" 
                />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-terms">
              <label className="checkbox-container">
                <Field type="checkbox" name="termsAccepted" />
                <div className="terms-text">
                  Acepto los <a href="#" className="terms-link">términos y condiciones</a> y la <a href="#" className="terms-link">política de privacidad</a>
                </div>
              </label>
              <ErrorMessage name="termsAccepted" component="div" className="error-message" />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} style={{ color: "#fff" }} />
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;