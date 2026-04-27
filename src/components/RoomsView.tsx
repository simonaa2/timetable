import React from 'react';

const RoomsView: React.FC = () => {
  return (
    <div className="view-container">
      <div className="header-section" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="gradient-text">Room Capacities</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Configure physical limits of classrooms (e.g. Science Labs vs General).</p>
        </div>
        <button className="btn-primary">+ Add Room</button>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <p style={{ color: 'var(--text-muted)' }}>Rooms list will populate here...</p>
      </div>
    </div>
  );
};

export default RoomsView;
