import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaChartBar, FaClock, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import Logo from '/src/assets/images/logopanelp.png';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    {
      id: 'overview',
      icon: <FaHome />,
      label: 'Inicio'
    },
    {
      id: 'child-profiles',
      icon: <FaUserFriends />,
      label: 'Perfiles'
    },
    {
      id: 'skill-tracking',
      icon: <FaChartBar />,
      label: 'Progreso'
    },
    {
      id: 'recent-activities',
      icon: <FaClock />,
      label: 'Actividades'
    },
    {
      id: 'settings',
      icon: <FaCog />,
      label: 'Configuración'
    }
  ];

  return (
    <aside className="parent-sidebar">
      <div className="sidebar-logo">
        <img src={Logo} alt="DiscalWeb Logo" className="logo" />
        <h2>DiscalWeb</h2>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-menu-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">JP</div>
          <div className="user-info">
            <h4>Juan Pérez</h4>
            <p>Padre/Madre</p>
          </div>
        </div>
        <button
          className="logout-btn"
          onClick={onLogout}
        >
          <FaSignOutAlt className="logout-icon" /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;