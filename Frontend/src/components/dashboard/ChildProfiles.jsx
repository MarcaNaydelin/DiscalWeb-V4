import React, { useState } from 'react';
import './ChildProfiles.css';
import ChildCard from '../ui/ChildCard';
import Button from '../ui/Button';
import { FaPlus } from 'react-icons/fa';
import AddChildModal from './AddChildModal';
import { determineLevel } from '../../utils/childUtils';

const ChildProfiles = ({ children = [], onAddChild }) => {
  const [showAddChildModal, setShowAddChildModal] = useState(false);

  const handleEdit = (id) => {
    console.log(`Editar perfil con ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Eliminar perfil con ID: ${id}`);
  };

  const handleQR = (id) => {
    console.log(`Mostrar QR para ID: ${id}`);
  };

  return (
    <div className="child-profiles-container">
      <div className="profiles-header">
        <h2>Perfiles de Niños</h2>
        <Button 
          type="primary" 
          className="add-profile-button custom-add-button"
          onClick={() => setShowAddChildModal(true)}
        >
          <FaPlus className="plus-icon" /> Añadir Nuevo Perfil
        </Button>
      </div>

      {children.length === 0 ? (
        <div className="no-profiles">
          <p>No hay perfiles de niños registrados</p>
        </div>
      ) : (
        <div className="profiles-grid">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              name={child.name}
              progress={child.progress || 0}
              games={child.games || 0}
              lastActivity={child.lastActivity || 'Nuevo'}
              level={determineLevel(child.progress || 0)}
              avatar={child.avatar || '/src/assets/profileimg/default-avatar.svg'}
              onEdit={() => handleEdit(child.id)}
              onDelete={() => handleDelete(child.id)}
              onQR={() => handleQR(child.id)}
            />
          ))}
        </div>
      )}

      {showAddChildModal && (
        <AddChildModal
          onClose={() => setShowAddChildModal(false)}
          onAddChild={onAddChild}
        />
      )}
    </div>
  );
};

export default ChildProfiles;