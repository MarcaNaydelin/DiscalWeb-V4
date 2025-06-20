import React from 'react';
import './ChildProfiles.css';
import ChildCard from '../ui/ChildCard';
import Button from '../ui/Button';
import { FaPlus } from 'react-icons/fa';
import { determineLevel } from '../../utils/childUtils'; // Asumo que este util existe y funciona

const ChildProfiles = ({ children = [], onAddChild }) => {

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
        <Button type="primary" className="add-profile-button custom-add-button"onClick={onAddChild}>
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
              games={child.games || 0} // Asegúrate que 'games' es una propiedad que esperas en tus objetos 'child'
              lastActivity={child.lastActivity || 'Nuevo'}
              level={determineLevel(child.progress || 0)} // Asegúrate que determineLevel está definido y funciona
              avatar={child.avatar /* La imagen del avatar ya viene del objeto child */ || '/src/assets/profileimg/default-avatar.svg'} // Considera importar default-avatar.svg si está en src/
              onEdit={() => handleEdit(child.id)}
              onDelete={() => handleDelete(child.id)}
              onQR={() => handleQR(child.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildProfiles;