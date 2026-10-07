import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SidebarContext = createContext({
  isOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
  openSidebar: () => {},
  isCollapsed: false,
  toggleCollapse: () => {},
});

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });
  const location = useLocation();

  // Automatically close sidebar drawer when navigating to a new route/module on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  // Handle ESC key to close sidebar on mobile
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);
  const openSidebar = () => setIsOpen(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar,
        closeSidebar,
        openSidebar,
        isCollapsed,
        toggleCollapse,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
