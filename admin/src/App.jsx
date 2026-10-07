import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { SidebarProvider } from './context/SidebarContext';
import AdminSidebar from './components/AdminSidebar';
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardPage from './pages/DashboardPage';
import ToursManagementPage from './pages/ToursManagementPage';
import BookingsManagementPage from './pages/BookingsManagementPage';
import UsersManagementPage from './pages/UsersManagementPage';

// Protected Route for Admin
const ProtectedAdminLayout = () => {
  const { adminUser, loading } = useAdminAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Verifying administrator session...
      </div>
    );
  }

  if (!adminUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tours" element={<ToursManagementPage />} />
            <Route path="/bookings" element={<BookingsManagementPage />} />
            <Route path="/users" element={<UsersManagementPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/*" element={<ProtectedAdminLayout />} />
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
