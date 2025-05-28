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
      name: "Luis Pérez",
      age: 7,
      grade: "2° Primaria",
      avatar: "/src/assets/avatar-boy2.svg",
      lastActivity: "Nuevo",
      progress: 10, // 🟣 Nivel: beginner
      skills: {
        attention: 20,
        memory: 15,
        processing: 10,
        visualization: 25
      }
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      age: 6,
      grade: "1° Primaria",
      avatar: "/src/assets/avatar-boy.svg",
      lastActivity: "Hoy",
      progress: 45, // 🟡 Nivel: intermediate
      skills: {
        attention: 50,
        memory: 40,
        processing: 45,
        visualization: 60
      }
    },
    {
      id: 3,
      name: "Ana García",
      age: 8,
      grade: "3° Primaria",
      avatar: "/src/assets/avatar-girl.svg",
      lastActivity: "Hace 2 días",
      progress: 75, // 🔵 Nivel: advanced
      skills: {
        attention: 80,
        memory: 65,
        processing: 70,
        visualization: 85
      }
    },
    {
      id: 4,
      name: "Valentina Ríos",
      age: 9,
      grade: "4° Primaria",
      avatar: "/src/assets/avatar-girl2.svg",
      lastActivity: "Ayer",
      progress: 90, // 🌟 Nivel: excellent
      skills: {
        attention: 95,
        memory: 88,
        processing: 91,
        visualization: 92
      }
    }
  ]);

  useEffect(() => {
    // Verificar inicio de sesión
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      // Cargar perfiles de niños desde localStorage
      const savedChildren = JSON.parse(localStorage.getItem('children') || '[]');
      if (savedChildren.length > 0) {
        setChildren(savedChildren);
      }
    }
  }, [navigate]);

  const handleAddChild = () => {
    // Navigate to child profile creation page
    navigate("/create-child-profile");
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