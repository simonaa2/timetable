import React from 'react';

const StaffView: React.FC = () => {
  return (
    <div className="view-container">
      <div className="header-section" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="gradient-text">Staff Roster</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage teacher availability and maximum load limits.</p>
        </div>
        <button className="btn-primary">+ Import Teachers CSV</button>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <p style={{ color: 'var(--text-muted)' }}>Staff list will populate here...</p>
      </div>
    </div>
  );
};

export default StaffView;
