import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import Sidebar from "../components/dashboard/Sidebar";
import Overview from "../components/dashboard/Overview";
import ChildProfiles from "../components/dashboard/ChildProfiles";
import SkillTracking from "../components/dashboard/SkillTracking";
import RecentActivities from "../components/dashboard/RecentActivities";
import Reports from "../components/dashboard/Reports";
import ChildProfileCreation from "../components/dashboard/ChildProfileCreation";
import AlertNotification from "../components/ui/AlertNotification";

import "./Dashboard.css"; // Este es el CSS para el layout principal del Dashboard

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
    switch(activeSection) {
      case 'overview':
        return <Overview children={children} onAddChild={handleAddChildClick} />;
      case 'child-profiles':
        return <ChildProfiles children={children} onAddChild={handleAddChildClick} />;
      case 'skill-tracking':
        return <SkillTracking children={children} />;
      case 'recent-activities':
        return <RecentActivities children={children} />;
      case 'reports':
        return <Reports children={children} />;
      default:
        return <Overview children={children} onAddChild={handleAddChildClick} />;
    }
  };

  return (
    <div className={`dashboard ${isSidebarActuallyCollapsed ? 'sidebar-is-collapsed' : 'sidebar-is-expanded'}`}>
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
        onCollapseToggle={setIsSidebarActuallyCollapsed} // <--- Pasar la función de callback
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