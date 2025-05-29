import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  // Esquema de validación
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Aquí implementarías la llamada a tu API
      console.log("Login values:", values);
      
      // Simulación de login exitoso después de 1 segundo
      setTimeout(() => {
        // Guardar el token o información de sesión
        localStorage.setItem("isLoggedIn", "true");
        
        // Redireccionar al dashboard
        navigate("/dashboard");
        setSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Error al iniciar sesión. Por favor, intenta de nuevo.");
      setSubmitting(false);
    }
  };

  return (
    <div className="login-form-container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="login-form">
            {loginError && <div className="form-error">{loginError}</div>}
            
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
              {isSubmitting ? "Procesando..." : "Iniciar Sesión"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;