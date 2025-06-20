import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../ui/Button";
import "./ChildProfileCreation.css"; // Mantendremos este CSS y lo adaptaremos

// Importar las imágenes de los avatares
import avatar1 from "../../assets/profileimg/avatar1.jpg";
import avatar2 from "../../assets/profileimg/avatar2.jpg";
import avatar3 from "../../assets/profileimg/avatar3.jpg";
import avatar4 from "../../assets/profileimg/avatar4.jpg";
import avatar5 from "../../assets/profileimg/avatar5.jpg";
import avatar6 from "../../assets/profileimg/avatar6.jpg";
import avatar7 from "../../assets/profileimg/avatar7.jpg";
import avatar8 from "../../assets/profileimg/avatar8.jpg";
import avatar9 from "../../assets/profileimg/avatar9.jpg";
import avatar10 from "../../assets/profileimg/avatar10.jpg";
import avatar11 from "../../assets/profileimg/avatar11.jpg";
import avatar12 from "../../assets/profileimg/avatar12.jpg";

const ChildProfileCreation = ({ isOpen, onClose, onProfileCreated, setAlert }) => {
  const [step, setStep] = useState(1);
  const [avatarPage, setAvatarPage] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [profileData, setProfileData] = useState({
    avatar: "",
    avatarImage: "",
    identificationType: "Nombre",
    name: "",
    initials: "",
    ageGroup: "",
    parentalConsent: false,
  });

  const avatars = [
    { name: "Astronauta", image: avatar1 }, { name: "Explorador", image: avatar2 },
    { name: "Científico", image: avatar3 }, { name: "Artista", image: avatar4 },
    { name: "Deportista", image: avatar5 }, { name: "Músico", image: avatar6 },
    { name: "Aventurero", image: avatar7 }, { name: "Inventor", image: avatar8 },
    { name: "Detective", image: avatar9 }, { name: "Superhéroe", image: avatar10 },
    { name: "Piloto", image: avatar11 }, { name: "Marinero", image: avatar12 },
  ];

  const avatarsPerPage = 6;
  const totalPages = Math.ceil(avatars.length / avatarsPerPage);

  const resetForm = () => {
    setStep(1);
    setAvatarPage(0);
    setSelectedAvatar(null);
    setProfileData({
      avatar: "",
      avatarImage: "",
      identificationType: "Nombre",
      name: "",
      initials: "",
      ageGroup: "",
      parentalConsent: false,
    });
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);


  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const handleNextPage = () => setAvatarPage((prev) => (prev + 1) % totalPages);
  const handlePrevPage = () => setAvatarPage((prev) => (prev - 1 + totalPages) % totalPages);
  const handleAvatarSelect = (avatar) => setSelectedAvatar(avatar.name);

  const handleNextStep = () => {
    setStep((prevStep) => {
      if (prevStep === 1 && !selectedAvatar) {
        setAlert({ show: true, message: "Debes seleccionar un avatar.", type: "warning" });
        return prevStep;
      }
      if (prevStep === 1 && selectedAvatar) {
        const selectedAvatarObj = avatars.find(avatar => avatar.name === selectedAvatar);
        setProfileData((prev) => ({ ...prev, avatar: selectedAvatar, avatarImage: selectedAvatarObj.image }));
      }
      if (prevStep === 2) {
        const hasValidIdentification = profileData.identificationType === "Nombre" ? profileData.name.trim() !== "" : profileData.initials.trim() !== "";
        if (!hasValidIdentification || !profileData.ageGroup) {
          setAlert({ show: true, message: "Completa el nombre/iniciales y grupo de edad.", type: "warning" });
          return prevStep;
        }
      }
      return Math.min(prevStep + 1, 3);
    });
  };

  const handlePreviousStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const handleNameChange = (e) => setProfileData((prev) => ({ ...prev, name: e.target.value }));
  const handleInitialsChange = (e) => setProfileData((prev) => ({ ...prev, initials: e.target.value.toUpperCase() }));
  const handleAgeGroupChange = (group) => setProfileData((prev) => ({ ...prev, ageGroup: group }));
  const handleIdentificationTypeChange = (type) => setProfileData((prev) => ({ ...prev, identificationType: type }));
  const handleParentalConsent = () => setProfileData((prev) => ({ ...prev, parentalConsent: !prev.parentalConsent }));

  const handleSubmit = () => {
    if (!profileData.parentalConsent) {
        setAlert({ show: true, message: "Debes dar tu consentimiento para crear el perfil.", type: "warning" });
        return;
    }
    try {
      const newChildProfile = {
        id: Date.now(),
        name: profileData.identificationType === "Nombre" ? profileData.name.trim() : profileData.initials.trim(),
        age: profileData.ageGroup,
        avatar: profileData.avatarImage,
        lastActivity: "Nuevo",
        progress: 0,
        skills: { attention: 0, memory: 0, processing: 0, visualization: 0 },
      };

      const existingChildren = JSON.parse(localStorage.getItem("children") || "[]");
      const updatedChildren = [...existingChildren, newChildProfile];
      localStorage.setItem("children", JSON.stringify(updatedChildren));

      onProfileCreated(newChildProfile); // Notificar al componente padre
      setAlert({ show: true, message: "¡Perfil creado exitosamente!", type: "success" });
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al crear perfil:", error);
      setAlert({ show: true, message: "Hubo un error al crear el perfil. Intenta de nuevo.", type: "error" });
    }
  };

  const canProceedFromStep2 = () => {
    const hasValidIdentification = profileData.identificationType === "Nombre" ? profileData.name.trim() !== "" : profileData.initials.trim() !== "";
    return hasValidIdentification && profileData.ageGroup !== "";
  };

  const renderAvatarGrid = () => (
    <div className="avatar-selection-container">
      <h2>Elige un avatar divertido</h2>
      <div className="avatar-carousel">
        <button className="avatar-nav-btn left" onClick={handlePrevPage} disabled={avatarPage === 0}><FaChevronLeft /></button>
        <div className="avatar-grid">
          {avatars.slice(avatarPage * avatarsPerPage, (avatarPage + 1) * avatarsPerPage).map((avatar) => (
            <div key={avatar.name} className={`avatar-option ${selectedAvatar === avatar.name ? "selected" : ""}`} onClick={() => handleAvatarSelect(avatar)}>
              <div className="avatar-placeholder"><img src={avatar.image} alt={avatar.name} className="avatar-image" /></div>
              <span>{avatar.name}</span>
            </div>
          ))}
        </div>
        <button className="avatar-nav-btn right" onClick={handleNextPage} disabled={avatarPage === totalPages - 1}><FaChevronRight /></button>
      </div>
      <div className="avatar-selection-controls">
        <Button type="primary" onClick={handleNextStep} disabled={!selectedAvatar}>Siguiente</Button>
      </div>
    </div>
  );

  const renderIdentificationStep = () => (
    <div className="profile-step">
      <h2>¿Cómo identificaremos a tu hijo/a?</h2>
      <p>Elige una opción que proteja su identidad</p>
      <div className="identification-type-buttons">
        <Button type={profileData.identificationType === "Nombre" ? "primary" : "option"} onClick={() => handleIdentificationTypeChange("Nombre")}>Nombre</Button>
        <Button type={profileData.identificationType === "Iniciales" ? "primary" : "option"} onClick={() => handleIdentificationTypeChange("Iniciales")}>Iniciales</Button>
      </div>
      {profileData.identificationType === "Nombre" ? (
        <div className="input-container">
          <label>Nombre (solo primer nombre)</label>
          <input type="text" placeholder="Ej: Ana" value={profileData.name} onChange={handleNameChange} maxLength="20" />
          <p className="hint">Solo utilizaremos el primer nombre para identificar a tu hijo/a en la plataforma</p>
        </div>
      ) : (
        <div className="input-container">
          <label>Iniciales</label>
          <input type="text" placeholder="Ej: A.B." value={profileData.initials} onChange={handleInitialsChange} maxLength="6" />
          <p className="hint">Puedes usar 2-4 caracteres como iniciales para mayor privacidad</p>
        </div>
      )}
      <div className="age-group-section">
        <label>Grupo de edad</label>
        <div className="age-group-buttons">
          {["6-7 años", "7-8 años", "8-9 años"].map((group) => (
            <Button key={group} type={profileData.ageGroup === group ? "primary" : "option"} onClick={() => handleAgeGroupChange(group)} className="age-button">{group}</Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConsentStep = () => (
    <div className="consent-step">
      <div className="consent-header">
        <svg className="shield-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        <h1 className="consent-title">Consentimiento Parental</h1>
      </div>
      <div className="consent-layout">
        <div className="consent-main">
          <div className="info-box">
            <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
            <div className="info-content">
              <h3>Información importante</h3>
              <p>En cumplimiento con las leyes de protección de datos de menores, necesitamos tu consentimiento explícito como padre, madre o tutor legal para crear un perfil para tu hijo/a en nuestra plataforma.</p>
            </div>
          </div>
          <div className="consent-details-modern">
            <p className="confirmation-text">Al dar mi consentimiento, confirmo que:</p>
            <ul className="consent-list">
              <li>Soy el padre/madre o tutor legal del menor</li>
              <li>Autorizo la creación de este perfil para mi hijo/a</li>
              <li>Comprendo que los datos recopilados son mínimos para proteger su privacidad</li>
              <li>He leído y acepto los términos y condiciones del servicio</li>
            </ul>
          </div>
        </div>
        <div className="profile-summary">
          <div className="profile-summary-header">Resumen del perfil</div>
          <div className="profile-content">
            <div className="avatar-circle">{profileData.avatarImage && <img src={profileData.avatarImage} alt={profileData.avatar} className="profile-avatar-image" />}</div>
            <div className="summary-details">
              <div className="summary-grid">
                <p><strong>Identificador:</strong> {profileData.identificationType === "Nombre" ? profileData.name : profileData.initials}</p>
                <p><strong>Tipo:</strong> {profileData.identificationType}</p>
                <p><strong>Avatar:</strong> {profileData.avatar}</p>
                <p><strong>Grupo de edad:</strong> {profileData.ageGroup}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="consent-checkbox-container">
        <label className="consent-checkbox-modern">
          <input type="checkbox" checked={profileData.parentalConsent} onChange={handleParentalConsent} />
          <span className="checkbox-custom"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
          <div className="checkbox-text">
            <span className="checkbox-title">Doy mi consentimiento como padre/madre o tutor legal</span>
            <span className="checkbox-description">Al marcar esta casilla, confirmo que soy el padre/madre o tutor legal del menor y autorizo la creación de este perfil.</span>
          </div>
        </label>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1: return renderAvatarGrid();
      case 2: return renderIdentificationStep();
      case 3: return renderConsentStep();
      default: return null;
    }
  };

  return (
    <div className={`child-profile-creation-wrapper ${isOpen ? "open" : ""}`} onClick={handleOverlayClick}>
      <div className="child-profile-creation-modal-content"> {/* Cambiado de child-profile-creation a esto para evitar conflictos y asegurar el estilo modal */}
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <div className="dots-container">
          <div className={`dot ${step >= 1 ? "active" : ""}`}></div>
          <div className={`dot ${step >= 2 ? "active" : ""}`}></div>
          <div className={`dot ${step >= 3 ? "active" : ""}`}></div>
        </div>
        <div className="creation-content">{renderStep()}</div>
        {step > 1 && (
          <div className="creation-navigation">
            <Button type="tertiary" onClick={handlePreviousStep}>Atrás</Button>
            {step === 2 && <Button type="primary" onClick={handleNextStep} disabled={!canProceedFromStep2()}>Siguiente</Button>}
            {step === 3 && <Button type="primary" onClick={handleSubmit} disabled={!profileData.parentalConsent}>Continuar</Button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildProfileCreation;