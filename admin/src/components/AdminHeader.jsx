import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  ChevronDown,
  User,
  ShieldCheck,
  Mail,
  Phone,
  X,
  Compass,
  Menu,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useSidebar } from '../context/SidebarContext';

const AdminHeader = ({ title, subtitle, eyebrow, actionButton }) => {
  const { adminUser, logout } = useAdminAuth();
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenProfile = () => {
    setDropdownOpen(false);
    setProfileModalOpen(true);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  return (
    <>
      <header
        className="admin-header"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div className="admin-header-left" style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <button
            type="button"
            className="mobile-menu-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </button>
          <div style={{ minWidth: 0 }}>
            {eyebrow && (
              <p
                className="admin-header-eyebrow"
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: '2px',
                }}
              >
                {eyebrow}
              </p>
            )}
            <h2 className="admin-header-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', margin: 0, whiteSpace: 'nowrap' }}>
              {title}
            </h2>
            {subtitle && !eyebrow && (
              <p className="admin-header-subtitle" style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '2px' }}>{subtitle}</p>
            )}
          </div>
        </div>

        <div className="admin-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'nowrap', flexShrink: 0 }}>
          {actionButton}

          {/* Divider */}
          <div className="header-divider" style={{ width: '1px', height: '28px', background: '#e2e8f0', flexShrink: 0 }} />

          {/* Clickable Profile Trigger with Dropdown */}
          <div style={{ position: 'relative', flexShrink: 0 }} ref={dropdownRef}>
            <button
              type="button"
              className="admin-header-profile-btn"
              onClick={() => setDropdownOpen((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: dropdownOpen ? '#f1f5f9' : '#f8fafc',
                border: dropdownOpen ? '1px solid #cbd5e1' : '1px solid #e2e8f0',
                padding: '4px 10px 4px 5px',
                borderRadius: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!dropdownOpen) e.currentTarget.style.background = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                if (!dropdownOpen) e.currentTarget.style.background = '#f8fafc';
              }}
            >
              <img
                src={
                  adminUser?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                }
                alt={adminUser?.name}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #e0e7ff',
                }}
              />
              <div className="admin-profile-info" style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <p
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {adminUser?.name || 'Admin Manager'}
                </p>
                <p style={{ fontSize: '0.74rem', color: '#4f46e5', fontWeight: 600 }}>Super Admin</p>
              </div>

              <ChevronDown
                size={16}
                style={{
                  color: '#64748b',
                  transition: 'transform 0.2s',
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '240px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.15)',
                  padding: '8px',
                  zIndex: 100,
                  animation: 'fadeIn 0.15s ease-out',
                }}
              >
                {/* User Info Header inside menu */}
                <div
                  style={{
                    padding: '10px 12px 12px',
                    borderBottom: '1px solid #f1f5f9',
                    marginBottom: '6px',
                  }}
                >
                  <p style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {adminUser?.name || 'Admin Manager'}
                  </p>
                  <p
                    style={{
                      fontSize: '0.76rem',
                      color: '#64748b',
                      margin: '2px 0 0',
                      wordBreak: 'break-all',
                    }}
                  >
                    {adminUser?.email || 'admin@travel.com'}
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '6px',
                      background: '#e0e7ff',
                      color: '#4338ca',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    Administrator
                  </span>
                </div>

                {/* Profile Option */}
                <button
                  type="button"
                  onClick={handleOpenProfile}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: '#334155',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <User size={16} color="#4f46e5" />
                  <span>My Profile</span>
                </button>

                {/* Roles / Users Management shortcut */}
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/users');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: '#334155',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <ShieldCheck size={16} color="#0d9488" />
                  <span>User Roles & Access</span>
                </button>

                <div style={{ height: '1px', background: '#f1f5f9', margin: '6px 0' }} />

                {/* Logout Option */}
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: '#ef4444',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fee2e2')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <LogOut size={16} color="#ef4444" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Admin Profile Modal */}
      {profileModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setProfileModalOpen(false)}
        >
          <div
            className="responsive-modal-box"
            style={{
              background: '#ffffff',
              width: '100%',
              maxWidth: '440px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setProfileModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            {/* Profile Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <img
                src={
                  adminUser?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                }
                alt={adminUser?.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #4f46e5',
                  boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)',
                  margin: '0 auto 12px',
                }}
              />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {adminUser?.name || 'Admin Manager'}
              </h3>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '6px',
                  background: '#e0e7ff',
                  color: '#4338ca',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '3px 12px',
                  borderRadius: '999px',
                }}
              >
                Super Administrator
              </span>
            </div>

            {/* Profile Info Details */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                <Mail size={16} color="#64748b" />
                <span style={{ color: '#64748b' }}>Email:</span>
                <strong style={{ color: '#0f172a', marginLeft: 'auto' }}>
                  {adminUser?.email || 'admin@travel.com'}
                </strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                <Phone size={16} color="#64748b" />
                <span style={{ color: '#64748b' }}>Phone:</span>
                <strong style={{ color: '#0f172a', marginLeft: 'auto' }}>
                  {adminUser?.phone || '+1 555-0199'}
                </strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                <Compass size={16} color="#64748b" />
                <span style={{ color: '#64748b' }}>Portal:</span>
                <strong style={{ color: '#0f172a', marginLeft: 'auto' }}>WanderSphere Console</strong>
              </div>
            </div>

            <button
              onClick={() => setProfileModalOpen(false)}
              className="btn-admin"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
