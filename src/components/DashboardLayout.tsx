import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout: React.FC = () => {
  const { userData, logout } = useAuth();

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar glass-panel">
        <div className="sidebar-header">
          <h2 className="gradient-text">Timetable OS</h2>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
            📅 Master Schedule
          </NavLink>
          {userData?.role === 'manager' && (
            <>
              <NavLink to="/staff" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
                🧑‍🏫 Staff Roster
              </NavLink>
              <NavLink to="/rooms" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
                🏫 Rooms & Capacities
              </NavLink>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-name">{userData?.name || 'User'}</div>
            <div className="user-role">{userData?.role}</div>
          </div>
          <button className="btn-danger" style={{ width: '100%' }} onClick={logout}>Sign Out</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
