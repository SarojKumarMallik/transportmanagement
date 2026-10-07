import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    // If user explicitly logged out in this session, respect it
    if (sessionStorage.getItem('admin_logged_out') === 'true') {
      return null;
    }
    return {
      name: 'Executive Operations Controller',
      email: 'operations@transport.ops',
      role: 'admin',
      title: 'Transport & Dispatch Director',
    };
  });
  const [token, setToken] = useState(localStorage.getItem('travel_admin_token') || 'demo-admin-token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!token || token === 'demo-admin-token') {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        if (res.data && res.data.success && res.data.user.role === 'admin') {
          setAdminUser(res.data.user);
        }
      } catch (err) {
        console.warn('Backend session check skipped or offline:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [token]);

  const loginAdmin = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data && res.data.success) {
        const { token: newToken, user: userData } = res.data;
        if (userData.role !== 'admin') {
          return { success: false, message: 'Access Denied: Only Administrators can enter.' };
        }
        localStorage.setItem('travel_admin_token', newToken);
        sessionStorage.removeItem('admin_logged_out');
        setToken(newToken);
        setAdminUser(userData);
        return { success: true };
      }
    } catch (err) {
      // Offline fallback for demo access
      const demoUser = {
        name: 'Executive Operations Controller',
        email: email || 'operations@transport.ops',
        role: 'admin',
        title: 'Transport & Dispatch Director',
      };
      localStorage.setItem('travel_admin_token', 'demo-admin-token');
      sessionStorage.removeItem('admin_logged_out');
      setToken('demo-admin-token');
      setAdminUser(demoUser);
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('travel_admin_token');
    sessionStorage.setItem('admin_logged_out', 'true');
    setToken(null);
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, token, loading, loginAdmin, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
