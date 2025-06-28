import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import Sidebar from "../components/dashboard/Sidebar";
import Overview from "../components/dashboard/Overview";
import ChildProfiles from "../components/dashboard/ChildProfiles";
import RecentActivities from "../components/dashboard/RecentActivities";
import ChildProfileCreation from "../components/dashboard/ChildProfileCreation";
import AlertNotification from "../components/ui/AlertNotification";

// Progreso
import ProgressSummary from '../components/dashboard/progress/ProgressSummary';
import ProgressBySkill from '../components/dashboard/progress/ProgressBySkill';
import MonthlyReport from '../components/dashboard/reports/MonthlyReport';
import CompareReport from '../components/dashboard/reports/CompareReport';

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [children, setChildren] = useState([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: "", type: "success" });
  const [isSidebarActuallyCollapsed, setIsSidebarActuallyCollapsed] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const savedChildren = JSON.parse(localStorage.getItem('children') || '[]');
      setChildren(savedChildren);
    }
  }, [navigate]);

  const handleAddChildClick = () => setIsProfileModalOpen(true);
  const handleProfileCreated = (newProfile) => setChildren(prev => [...prev, newProfile]);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const renderSection = () => {
    console.log("Current activeSection:", activeSection);
    switch(activeSection) {
      case 'overview':
        return <Overview children={children} onAddChild={handleAddChildClick} />;
      case 'child-profiles':
        return <ChildProfiles children={children} onAddChild={handleAddChildClick} />;
      case 'progress-summary':
        return <ProgressSummary childrenData={children} />;
      case 'progress-by-skill':
        return <ProgressBySkill childrenData={children} />;

      // Submenús de Actividades
      case 'recent-activities':
      case 'today-activities':
      case 'week-activities':
      case 'all-activities':
        return <RecentActivities children={children} />;

      // Secciones de Reportes
      case 'monthly-report': // ID del submenú
        return <MonthlyReport childrenData={children} />;
      case 'compare-report': // ID del submenú
        return <CompareReport childrenData={children} />;
      
      // case 'settings': // Si tienes esta sección
      //   return <SettingsComponent />; 
      default:
        console.warn("Unhandled activeSection:", activeSection, "defaulting to Overview.");
        return <Overview children={children} onAddChild={handleAddChildClick} />;
    }
  };

  return (
    <div className={`dashboard ${isSidebarActuallyCollapsed ? 'sidebar-is-collapsed' : 'sidebar-is-expanded'}`}>
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
        onCollapseToggle={setIsSidebarActuallyCollapsed}
      />
      <div className="dashboard-content">
        {renderSection()}
      </div>

      <ChildProfileCreation
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onProfileCreated={handleProfileCreated}
        setAlert={setAlertInfo}
      />

      {alertInfo.show && (
        <AlertNotification
          message={alertInfo.message}
          type={alertInfo.type}
          onClose={() => setAlertInfo({ ...alertInfo, show: false })}
        />
      )}
    </div>
  );
};

export default Dashboard;