import React from 'react';
import './RecentActivities.css';

const RecentActivities = ({ children }) => {
  const mockActivities = [
    {
      id: 1,
      childId: 1,
      date: '26/03/2025',
      activity: 'Completó el juego de sumas',
      icon: '➕'
    },
    {
      id: 2,
      childId: 2,
      date: '25/03/2025',
      activity: 'Practicó conteo regresivo',
      icon: '🔢'
    }
  ];

  return (
    <div className="recent-activities-container">
      <h2>Actividades Recientes</h2>
      {children.length === 0 ? (
        <div className="no-activities">
          <p>No hay actividades para mostrar</p>
        </div>
      ) : (
        <div className="activities-list">
          {mockActivities.map(activity => {
            const child = children.find(c => c.id === activity.childId);
            return (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-details">
                  <h3>{child.name}</h3>
                  <p>{activity.activity}</p>
                  <span className="activity-date">{activity.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentActivities;