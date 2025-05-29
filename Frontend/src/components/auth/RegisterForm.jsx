import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

  // Esquema de validación
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "El nombre es muy corto")
      .max(50, "El nombre es muy largo")
      .required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required("Confirmar la contraseña es obligatorio"),
    termsAccepted: Yup.boolean()
      .oneOf([true], "Debes aceptar los términos y condiciones")
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Aquí implementarías la llamada a tu API
      console.log("Register values:", values);
      
      // Simulación de registro exitoso después de 1 segundo
      setTimeout(() => {
        // Guardar el token o información de sesión
        localStorage.setItem("isLoggedIn", "true");
        
        // Redireccionar al dashboard
        navigate("/dashboard");
        setSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error("Register error:", error);
      setRegisterError("Error al crear la cuenta. Por favor, intenta de nuevo.");
      setSubmitting(false);
    }
  };

  return (
    <div className="register-form-container">
      <Formik
        initialValues={{ name: "", email: "", password: "", confirmPassword: "", termsAccepted: false }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="register-form">
            {registerError && <div className="form-error">{registerError}</div>}
            
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
              {isSubmitting ? "Procesando..." : "Crear Cuenta"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;