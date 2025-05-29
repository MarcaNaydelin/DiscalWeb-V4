import React, { useState } from 'react';
import Button from '../ui/Button';
import './AddChildModal.css';

const AddChildModal = ({ onClose, onAddChild }) => {
  const [newChild, setNewChild] = useState({
    name: '',
    age: '',
    grade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewChild((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddChild(newChild);
    onClose();
  };

  return (
    <div className="add-child-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Añadir Nuevo Perfil</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nombre del Niño" value={newChild.name} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Edad" value={newChild.age} onChange={handleChange} required />
          <input type="text" name="grade" placeholder="Grado Escolar" value={newChild.grade} onChange={handleChange} required />
          <div className="modal-actions">
            <Button type="secondary" onClick={onClose}>Cancelar</Button>
            <Button type="primary">Guardar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildModal;