import React, { useState, useEffect } from 'react';
import { FaHome, FaUserFriends, FaChartBar, FaClock, FaFileAlt, FaCog, FaSignOutAlt, FaChevronLeft} from 'react-icons/fa';
import './Sidebar.css';
import Logo from '../../assets/images/logopanelp.png';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      id: 'reports',
      icon: <FaFileAlt />,
      label: 'Reportes'
    },
    {
      id: 'settings',
      icon: <FaCog />,
      label: 'Configuración'
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuClick = (itemId) => {
    setActiveSection(itemId);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const handleOverlayClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isMobileOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
      />
      
      <aside className={`parent-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={Logo} alt="DiscalWeb Logo" className="logo" />
            <h2 className="logo-text">DiscalWeb</h2>
          </div>

          {/* Botón de colapso con flecha */}
          {!isMobile && (
            <button 
              className={`collapse-btn ${isCollapsed ? 'collapsed' : ''}`}
              onClick={handleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isCollapsed ? 'Expandir' : 'Contraer'}
            >
              <FaChevronLeft />
            </button>
          )}
        </div>

        <nav className="sidebar-menu">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-menu-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
              title={isCollapsed ? item.label : ''}
              aria-label={item.label}
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
            title={isCollapsed ? 'Cerrar Sesión' : ''}
            aria-label="Cerrar sesión"
          >
            <FaSignOutAlt className="logout-icon" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;