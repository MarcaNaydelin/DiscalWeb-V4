import React, { useState, useEffect } from 'react';
import {
  FaHome, FaUserFriends, FaChartBar, FaClock, FaFileAlt, FaCog,
  FaSignOutAlt, FaChevronLeft, FaCalendarAlt, FaListAlt, FaCalendar, 
  FaBalanceScale, FaChevronDown, FaChevronRight, FaTasks, FaHistory,
  FaChartLine, FaBars, FaTimes, FaClipboardList
} from 'react-icons/fa';
import './Sidebar.css';
import Logo from '../../assets/images/logopanelp.png';

const Sidebar = ({ activeSection, setActiveSection, onLogout, onCollapseToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(new Set());

  // Obtener el nombre del usuario desde localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user?.name || "Usuario";

  const menuItems = [
    { id: 'overview', icon: <FaHome />, label: 'Inicio' },
    { id: 'child-profiles', icon: <FaUserFriends />, label: 'Perfiles' },
    {
      id: 'progress',
      icon: <FaChartBar />,
      label: 'Progreso',
      subItems: [
        { id: 'progress-summary', label: 'Resumen', icon: <FaClipboardList /> },
        { id: 'progress-by-skill', label: 'Por Habilidad', icon: <FaTasks /> },
      ]
    },
    {
      id: 'recent-activities',
      icon: <FaHistory />,
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
      if (!mobile && isMobileOpen) setIsMobileOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobileOpen]);

  useEffect(() => {
    let parentToExpand = null;
    menuItems.forEach(item => {
      if (item.subItems && item.subItems.some(sub => sub.id === activeSection)) {
        parentToExpand = item.id;
      }
    });
    if (parentToExpand && !isCollapsed) {
      setExpandedMenus(prev => new Set(prev).add(parentToExpand));
    } else if (isCollapsed) {
      setExpandedMenus(new Set());
    }
  }, [activeSection, isCollapsed]);

  const handleCollapse = () => {
    if (isMobile) return;
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseToggle) onCollapseToggle(newCollapsedState);
    if (newCollapsedState) setExpandedMenus(new Set());
  };

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const handleOverlayClick = () => { if (isMobileOpen) setIsMobileOpen(false); };

  const handleMenuClick = (item) => {
    if (item.subItems && item.subItems.length > 0) {
      if (!isCollapsed) {
        setExpandedMenus(prev => {
          const newSet = new Set(prev);
          if (newSet.has(item.id)) {
            newSet.delete(item.id);
          } else {
            newSet.add(item.id);
          }
          return newSet;
        });
      }
    } else {
      setActiveSection(item.id);
    }

    if (isMobile && (!item.subItems || item.subItems.length === 0)) {
      setIsMobileOpen(false);
    }
  };

  const handleSubMenuClick = (subItemId) => {
    setActiveSection(subItemId);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const isMenuExpanded = (menuId) => expandedMenus.has(menuId) && !isCollapsed;
  const isActiveParent = (item) => item.subItems && item.subItems.some(sub => sub.id === activeSection);

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
            const directActive = activeSection === item.id && !hasSubItems;

            return (
              <div key={item.id} className="menu-block">
                <button
                  className={`sidebar-menu-item ${
                    directActive || (parentActive && !isCollapsed) ? 'active' : ''
                  } ${hasSubItems ? 'has-submenu' : ''}`}
                  onClick={() => handleMenuClick(item)}
                  title={isCollapsed && !isMobileOpen ? item.label : ''}
                  aria-expanded={hasSubItems ? isExpanded : undefined}
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
                        className={`sidebar-submenu-item ${activeSection === sub.id ? 'active' : ''}`}
                        onClick={() => handleSubMenuClick(sub.id)}
                        role="menuitem"
                        title={isCollapsed && !isMobileOpen ? sub.label : ''}
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
          <div className="user-profile" role="button" tabIndex="0" title={isCollapsed && !isMobileOpen ? `Perfil de ${userName}` : ""}>
            <div className="user-avatar" aria-hidden="true">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="user-info">
                <h4>{userName}</h4>
                <p>Padre/Madre</p>
              </div>
            )}
          </div>

          <button 
            className="logout-btn" 
            onClick={onLogout}
            title="Cerrar Sesión"
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