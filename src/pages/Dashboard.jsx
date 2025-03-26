import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importar componentes del dashboard
import Sidebar from "../components/dashboard/Sidebar";
import Overview from "../components/dashboard/Overview";
import ChildProfiles from "../components/dashboard/ChildProfiles";
import SkillTracking from "../components/dashboard/SkillTracking";
import RecentActivities from "../components/dashboard/RecentActivities";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [children, setChildren] = useState([
    {
      id: 1,
      name: "Ana García",
      age: 8,
      grade: "3° Primaria",
      avatar: "/src/assets/avatar-girl.svg",
      lastActivity: "Hace 2 días",
      progress: 75,
      skills: {
        attention: 80,
        memory: 65,
        processing: 70,
        visualization: 85
      }
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      age: 6,
      grade: "1° Primaria",
      avatar: "/src/assets/avatar-boy.svg",
      lastActivity: "Hoy",
      progress: 45,
      skills: {
        attention: 50,
        memory: 40,
        processing: 45,
        visualization: 60
      }
    }
  ]);

  useEffect(() => {
    // Verificar inicio de sesión
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddChild = (newChildData) => {
    const newChild = {
      id: children.length + 1,
      ...newChildData,
      avatar: "/src/assets/default-avatar.svg",
      lastActivity: "Nuevo",
      progress: 0,
      skills: {
        attention: 0,
        memory: 0,
        processing: 0,
        visualization: 0
      }
    };

    setChildren([...children, newChild]);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'overview':
        return <Overview children={children} onAddChild={handleAddChild} />;
      case 'child-profiles':
        return <ChildProfiles children={children} onAddChild={handleAddChild} />;
      case 'skill-tracking':
        return <SkillTracking children={children} />;
      case 'recent-activities':
        return <RecentActivities children={children} />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview children={children} onAddChild={handleAddChild} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={handleLogout}
      />
      
      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default Dashboard;