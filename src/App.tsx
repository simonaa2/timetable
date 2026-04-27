import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import ScheduleView from './components/ScheduleView';
import StaffView from './components/StaffView';
import RoomsView from './components/RoomsView';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '20vh' }}>Loading Secure Engine...</div>;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!currentUser ? <Login /> : <Navigate to="/" />} 
      />
      
      {/* Protected Dashboard Routes */}
      <Route 
        path="/" 
        element={currentUser ? <DashboardLayout /> : <Navigate to="/login" />} 
      >
        <Route index element={<ScheduleView />} />
        <Route path="staff" element={<StaffView />} />
        <Route path="rooms" element={<RoomsView />} />
      </Route>
    </Routes>
  );
}

export default App;
