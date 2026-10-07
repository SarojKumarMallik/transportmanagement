import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  Fuel,
  Send,
  Package,
  Users,
  Wrench,
  BarChart3,
  Compass,
  CalendarCheck,
  PlusCircle,
  Clock,
  Truck,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

const AdminSidebar = () => {
  const { isOpen, closeSidebar, isCollapsed, toggleCollapse } = useSidebar();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentModule = searchParams.get('module');

  const costingNav = [
    { name: 'Trip Costing', path: '/?module=trip-costing', id: 'trip-costing', icon: DollarSign },
    { name: 'Freight & Route', path: '/?module=freight-route', id: 'freight-route', icon: TrendingUp },
    { name: 'Fuel & Vehicle', path: '/?module=fuel-vehicle', id: 'fuel-vehicle', icon: Fuel },
  ];

  const dispatchNav = [
    { name: 'Dispatch Board', path: '/?module=dispatch', id: 'dispatch', icon: Send },
    { name: 'Shipment Tracking', path: '/?module=shipments', id: 'shipments', icon: Package },
    { name: 'Fleet & Drivers', path: '/?module=fleet-drivers', id: 'fleet-drivers', icon: Users },
  ];

  const controlNav = [
    { name: 'Maintenance & Health', path: '/?module=maintenance', id: 'maintenance', icon: Wrench },
    { name: 'Delivery & Operations', path: '/?module=delivery-operations', id: 'delivery-operations', icon: BarChart3 },
  ];

  const managementNav = [
    { name: 'Tour Packages', path: '/tours', icon: Compass },
    { name: 'Reservations', path: '/bookings', icon: CalendarCheck },
  ];

  const quickNav = [
    { name: 'New Trip Dispatch', path: '/?action=dispatch', icon: PlusCircle },
    { name: 'Delayed Trips (15)', path: '/?filter=delayed', icon: Clock },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={closeSidebar}
          aria-label="Close navigation menu overlay"
        />
      )}

      <aside
        className={`admin-sidebar ${isOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        style={{
          width: isCollapsed ? '72px' : '260px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          backgroundColor: '#0f172a',
          color: '#94a3b8',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
          zIndex: 50,
        }}
      >
        {/* Brand Header */}
        {!isCollapsed ? (
          <div
            style={{
              padding: '18px 16px 18px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link
              to="/"
              onClick={closeSidebar}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                  flexShrink: 0,
                }}
              >
                <Truck size={22} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                  TransportOps
                </h1>
                <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', whiteSpace: 'nowrap' }}>
                  Control Toolkit
                </span>
              </div>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Collapse Icon Button on Desktop */}
              <button
                type="button"
                className="sidebar-collapse-btn"
                onClick={toggleCollapse}
                title="Collapse sidebar (show icons only)"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={17} />
              </button>

              {/* Close button on mobile/tablet drawer */}
              <button
                type="button"
                className="sidebar-close-btn"
                onClick={closeSidebar}
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: '16px 8px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Link
              to="/"
              onClick={closeSidebar}
              title="TransportOps Control Toolkit"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                }}
              >
                <Truck size={22} />
              </div>
            </Link>

            {/* Expand Icon Button */}
            <button
              type="button"
              className="sidebar-collapse-btn"
              onClick={toggleCollapse}
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}

        {/* Navigation Links Area */}
        <div
          className="sidebar-scroll"
          style={{
            padding: isCollapsed ? '14px 8px' : '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: isCollapsed ? '10px' : '16px',
            flex: 1,
            overflowY: 'auto',
          }}
        >
          {/* Executive Overview */}
          <div>
            <Link
              to="/"
              onClick={closeSidebar}
              title="Executive Dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '12px',
                padding: isCollapsed ? '10px 0' : '10px 14px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: (!currentModule && location.pathname === '/') ? '#ffffff' : '#94a3b8',
                backgroundColor: (!currentModule && location.pathname === '/') ? '#0284c7' : 'transparent',
                boxShadow: (!currentModule && location.pathname === '/') ? '0 4px 12px rgba(2, 132, 199, 0.35)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              <LayoutDashboard size={18} />
              {!isCollapsed && <span>Executive Dashboard</span>}
            </Link>
          </div>

          {/* Section: Costing Modules */}
          <div>
            {!isCollapsed ? (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#64748b',
                  letterSpacing: '0.8px',
                  paddingLeft: '12px',
                  marginBottom: '6px',
                  display: 'block',
                }}
              >
                Costing Tools
              </span>
            ) : (
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 6px' }} />
            )}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {costingNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={closeSidebar}
                    title={item.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      gap: '12px',
                      padding: isCollapsed ? '9px 0' : '9px 14px',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      backgroundColor: isActive ? 'rgba(2, 132, 199, 0.25)' : 'transparent',
                      border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Icon size={17} color={isActive ? '#38bdf8' : '#94a3b8'} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Section: Dispatch & Tracking */}
          <div>
            {!isCollapsed ? (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#64748b',
                  letterSpacing: '0.8px',
                  paddingLeft: '12px',
                  marginBottom: '6px',
                  display: 'block',
                }}
              >
                Dispatch & Tracking
              </span>
            ) : (
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 6px' }} />
            )}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {dispatchNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={closeSidebar}
                    title={item.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      gap: '12px',
                      padding: isCollapsed ? '9px 0' : '9px 14px',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      backgroundColor: isActive ? 'rgba(2, 132, 199, 0.25)' : 'transparent',
                      border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Icon size={17} color={isActive ? '#38bdf8' : '#94a3b8'} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Section: Control & Audits */}
          <div>
            {!isCollapsed ? (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#64748b',
                  letterSpacing: '0.8px',
                  paddingLeft: '12px',
                  marginBottom: '6px',
                  display: 'block',
                }}
              >
                Control & Audits
              </span>
            ) : (
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 6px' }} />
            )}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {controlNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={closeSidebar}
                    title={item.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      gap: '12px',
                      padding: isCollapsed ? '9px 0' : '9px 14px',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      backgroundColor: isActive ? 'rgba(2, 132, 199, 0.25)' : 'transparent',
                      border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Icon size={17} color={isActive ? '#38bdf8' : '#94a3b8'} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Section: Platform Management */}
          <div>
            {!isCollapsed ? (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#64748b',
                  letterSpacing: '0.8px',
                  paddingLeft: '12px',
                  marginBottom: '6px',
                  display: 'block',
                }}
              >
                Platform Management
              </span>
            ) : (
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 6px' }} />
            )}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {managementNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={closeSidebar}
                    title={item.name}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      gap: '12px',
                      padding: isCollapsed ? '9px 0' : '9px 14px',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: isActive ? '#ffffff' : '#94a3b8',
                      backgroundColor: isActive ? '#334155' : 'transparent',
                      transition: 'all 0.15s',
                    })}
                  >
                    <Icon size={17} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Section: Quick Shortcuts */}
          <div>
            {!isCollapsed ? (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#64748b',
                  letterSpacing: '0.8px',
                  paddingLeft: '12px',
                  marginBottom: '6px',
                  display: 'block',
                }}
              >
                Quick Actions
              </span>
            ) : (
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 6px' }} />
            )}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {quickNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeSidebar}
                    title={item.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      gap: '12px',
                      padding: isCollapsed ? '9px 0' : '9px 14px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: '#cbd5e1',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.15)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.color = '#cbd5e1';
                    }}
                  >
                    <Icon size={17} color="#818cf8" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
