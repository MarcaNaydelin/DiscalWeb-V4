import React, { useState, useEffect } from 'react';
import {
  FaHome, FaUserFriends, FaChartBar, FaClock, FaFileAlt, FaCog,
  FaSignOutAlt, FaChevronLeft, FaCalendarAlt, FaListAlt, FaCalendar, 
  FaBalanceScale, FaChevronDown, FaChevronRight, FaTasks, FaHistory,
  FaChartLine, FaBars, FaTimes
} from 'react-icons/fa';
import './Sidebar.css'; // Asegúrate que la ruta a Sidebar.css es correcta
import Logo from '../../assets/images/logopanelp.png'; // Asegúrate que la ruta al logo es correcta

const Sidebar = ({ activeSection, setActiveSection, onLogout, onCollapseToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(new Set());

  const menuItems = [
    { id: 'overview', icon: <FaHome />, label: 'Inicio' },
    { id: 'child-profiles', icon: <FaUserFriends />, label: 'Perfiles' },
    {
      id: 'skill-tracking',
      icon: <FaChartBar />,
      label: 'Progreso',
      subItems: [
        { id: 'progress-overview', label: 'Resumen', icon: <FaChartLine /> },
        { id: 'progress-by-skill', label: 'Por habilidad', icon: <FaTasks /> },
        { id: 'progress-timeline', label: 'Cronograma', icon: <FaClock /> }
      ]
    },
    {
      id: 'recent-activities',
      icon: <FaHistory />, // Cambiado a FaHistory para diferenciar de Progreso
      label: 'Actividades',
      subItems: [
        { id: 'today-activities', label: 'Hoy', icon: <FaClock /> },
        { id: 'week-activities', label: 'Esta semana', icon: <FaCalendarAlt /> },
        { id: 'all-activities', label: 'Todas', icon: <FaListAlt /> }
      ]
    },
    {
      id: 'reports',
      icon: <FaFileAlt />,
      label: 'Reportes',
      subItems: [
        { id: 'monthly-report', label: 'Mensual', icon: <FaCalendar /> },
        { id: 'compare-report', label: 'Comparar', icon: <FaBalanceScale /> }
      ]
    },
    { id: 'settings', icon: <FaCog />, label: 'Configuración' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile && isMobileOpen) {
        setIsMobileOpen(false); // Cierra el menú móvil si se redimensiona a desktop
      }
      if (!mobile && isCollapsed) {
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobileOpen, isCollapsed, onCollapseToggle]); // Añadir onCollapseToggle a dependencias

  useEffect(() => {
    menuItems.forEach(item => {
      if (item.subItems) {
        const hasActiveSubItem = item.subItems.some(sub => sub.id === activeSection);
        if (hasActiveSubItem && !isCollapsed) { // Solo auto-expande si no está colapsado
          setExpandedMenus(prev => new Set(prev).add(item.id));
        }
      }
    });
  }, [activeSection, isCollapsed]); // Añadir isCollapsed

  const handleCollapse = () => {
    if (isMobile) return; // En móvil, el colapso se maneja con el toggle de apertura/cierre
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseToggle) {
      onCollapseToggle(newCollapsedState);
    }
    if (newCollapsedState) { // Si se está colapsando
      setExpandedMenus(new Set()); // Cierra todos los submenús
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleMenuClick = (itemId, hasSubItems = false) => {
    if (hasSubItems && !isCollapsed) { // Solo gestiona expansión de submenú si no está colapsado
      setExpandedMenus(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
      if (!isCollapsed) {
        if (expandedMenus.has(itemId)) return;
      }
    }
    
    setActiveSection(itemId);
    
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const handleSubMenuClick = (subItemId) => {
    setActiveSection(subItemId);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const handleOverlayClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };
  
  const isMenuExpanded = (menuId) => {
    return expandedMenus.has(menuId) && !isCollapsed;
  };

  const isActiveParent = (item) => {
    if (item.subItems) {
      return item.subItems.some(sub => sub.id === activeSection);
    }
    return false;
  };

  return (
    <>
      {isMobile && (
        <button 
          className={`mobile-menu-toggle ${isMobileOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      <div
        className={`sidebar-overlay ${isMobileOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
        aria-hidden={!isMobileOpen}
      />

      <aside className={`parent-sidebar ${isCollapsed && !isMobile ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={Logo} alt="DiscalWeb Logo" className="logo" />
            {(!isCollapsed || isMobileOpen) && <h2 className="logo-text">DiscalWeb</h2>}
          </div>

          {!isMobile && (
            <button
              className={`collapse-btn ${isCollapsed ? 'collapsed' : ''}`}
              onClick={handleCollapse}
              title={isCollapsed ? 'Expandir' : 'Contraer'}
              aria-label={isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
            >
              <FaChevronLeft />
            </button>
          )}
        </div>

        <nav className="sidebar-menu" role="navigation">
          {menuItems.map(item => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = isMenuExpanded(item.id);
            const parentActive = isActiveParent(item);
            const directActive = activeSection === item.id;

            return (
              <div key={item.id} className="menu-block">
                <button
                  className={`sidebar-menu-item ${
                    (directActive && !hasSubItems) || (parentActive && !isCollapsed) || (directActive && isCollapsed && hasSubItems) ? 'active' : ''
                  } ${hasSubItems ? 'has-submenu' : ''}`}
                  onClick={() => handleMenuClick(item.id, hasSubItems)}
                  title={isCollapsed && !isMobileOpen ? item.label : ''}
                  aria-expanded={hasSubItems ? isExpanded : undefined}
                  aria-haspopup={hasSubItems ? 'menu' : undefined}
                >
                  <span className="menu-icon">{item.icon}</span>
                  {(!isCollapsed || isMobileOpen) && (
                    <>
                      <span className="menu-label">{item.label}</span>
                      {hasSubItems && (
                        <span className="submenu-toggle">
                          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {hasSubItems && isExpanded && (!isCollapsed || isMobileOpen) && (
                  <div className="sidebar-submenu" role="menu">
                    {item.subItems.map(sub => (
                      <button
                        key={sub.id}
                        className={`sidebar-submenu-item ${
                          activeSection === sub.id ? 'active' : ''
                        }`}
                        onClick={() => handleSubMenuClick(sub.id)}
                        title={isCollapsed && !isMobileOpen ? sub.label : ''} // No debería mostrarse si el padre no está colapsado
                        role="menuitem"
                      >
                        <span className="submenu-icon">{sub.icon}</span>
                        <span className="submenu-label">{sub.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile" role="button" tabIndex="0" title={isCollapsed && !isMobileOpen ? "Perfil de Juan Pérez" : ""}>
            <div className="user-avatar" aria-hidden="true">JP</div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="user-info">
                <h4>Juan Pérez</h4>
                <p>Padre/Madre</p>
              </div>
            )}
          </div>

          <button 
            className="logout-btn" 
            onClick={onLogout}
            title={isCollapsed && !isMobileOpen ? "Cerrar Sesión" : "Cerrar Sesión"}
          >
            <FaSignOutAlt className="logout-icon" />
            {(!isCollapsed || isMobileOpen) && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;