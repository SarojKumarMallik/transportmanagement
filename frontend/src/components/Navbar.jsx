import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Compass, User, LogOut, BookmarkCheck, Menu, X, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, openAuthModal } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.2)',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
        padding: '16px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
            }}
          >
            <Compass size={24} />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
            Wander<span style={{ color: '#0d9488' }}>Sphere</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: isActive('/') ? '#0d9488' : '#475569',
              transition: 'color 0.2s',
            }}
          >
            Home
          </Link>
          <Link
            to="/tours"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: isActive('/tours') ? '#0d9488' : '#475569',
              transition: 'color 0.2s',
            }}
          >
            Explore Tours
          </Link>
          <Link
            to="/destinations"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: isActive('/destinations') ? '#0d9488' : '#475569',
              transition: 'color 0.2s',
            }}
          >
            Destinations
          </Link>

          {/* Admin Panel Direct Link */}
          <a
            href="http://localhost:5174"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#4f46e5',
              background: '#eef2ff',
              padding: '6px 12px',
              borderRadius: '20px',
            }}
          >
            <Shield size={14} /> Admin Portal
          </a>
        </div>

        {/* User Auth Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 12px',
                  borderRadius: '30px',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                }}
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={user.name}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {userDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '115%',
                    right: 0,
                    width: '210px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                    border: '1px solid #e2e8f0',
                    padding: '8px',
                    zIndex: 60,
                  }}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{user.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/my-bookings"
                    onClick={() => setUserDropdown(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      fontSize: '0.88rem',
                      color: '#334155',
                      borderRadius: '6px',
                      fontWeight: 500,
                    }}
                  >
                    <BookmarkCheck size={16} color="#0d9488" /> My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      fontSize: '0.88rem',
                      color: '#ef4444',
                      borderRadius: '6px',
                      fontWeight: 500,
                      textAlign: 'left',
                    }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => openAuthModal('login')}
                style={{
                  padding: '8px 18px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: '#0f172a',
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.9rem' }}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
