import React, { useState } from 'react';
import './ChildProfiles.css';

const ChildProfiles = ({ children, onAddChild }) => {
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChild, setNewChild] = useState({
    name: '',
    age: '',
    grade: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChild(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddChild(newChild);
    setShowAddChildModal(false);
    setNewChild({ name: '', age: '', grade: '' });
  };

  return (
    <div className="child-profiles-container">
      <div className="profiles-header">
        <h2>Perfiles de Niños</h2>
        <button 
          className="btn btn-primary add-child-btn"
          onClick={() => setShowAddChildModal(true)}
        >
          + Añadir Perfil
        </button>
      </div>

      {children.length === 0 ? (
        <div className="no-profiles">
          <p>No hay perfiles de niños registrados</p>
        </div>
      ) : (
        <div className="profiles-grid">
          {children.map(child => (
            <div key={child.id} className="child-profile-card">
              <img 
                src={child.avatar || '/src/assets/default-avatar.svg'} 
                alt={child.name} 
                className="child-avatar"
              />
              <div className="child-info">
                <h3>{child.name}</h3>
                <p>Edad: {child.age} años</p>
                <p>Grado: {child.grade}</p>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{width: `${child.progress}%`}}
                  ></div>
                </div>
                <span className="progress-text">
                  Progreso: {child.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddChildModal && (
        <div className="add-child-modal">
          <div className="modal-content">
            <h2>Añadir Nuevo Perfil</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nombre del Niño"
                value={newChild.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Edad"
                value={newChild.age}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="grade"
                placeholder="Grado Escolar"
                value={newChild.grade}
                onChange={handleInputChange}
                required
              />
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowAddChildModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildProfiles;