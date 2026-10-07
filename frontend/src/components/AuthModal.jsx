import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Compass, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, setAuthModalMode, login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    let res;
    if (authModalMode === 'login') {
      res = await login(formData.email, formData.password);
    } else {
      res = await register(formData);
    }

    setSubmitting(false);
    if (!res.success) {
      setError(res.message);
    }
  };

  const handleFillDemoUser = () => {
    setFormData((prev) => ({
      ...prev,
      email: 'sophia@example.com',
      password: 'password123',
    }));
    setError('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={closeAuthModal}
    >
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '440px',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          animation: 'fadeIn 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              margin: '0 auto 16px',
            }}
          >
            <Compass size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            {authModalMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '4px' }}>
            {authModalMode === 'login'
              ? 'Access your booked itineraries & wanderlust journeys'
              : 'Join thousands of adventurers around the world'}
          </p>
        </div>

        {/* Quick Demo Credentials Tip */}
        <div
          style={{
            background: '#f0fdfa',
            border: '1px dashed #0d9488',
            borderRadius: '12px',
            padding: '10px 14px',
            fontSize: '0.8rem',
            color: '#0f766e',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <strong>Demo User:</strong> <br />
            <code>sophia@example.com</code> / <code>password123</code>
          </div>
          <button
            type="button"
            onClick={handleFillDemoUser}
            style={{
              background: '#0d9488',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 11px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#dc2626',
              fontSize: '0.85rem',
              marginBottom: '18px',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {authModalMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: '#94a3b8' }} />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: '#94a3b8' }} />
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.92rem',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: '#94a3b8' }} />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.92rem',
                }}
              />
            </div>
          </div>

          {authModalMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Phone Number (Optional)
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: '#94a3b8' }} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                  }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1rem',
              fontWeight: 700,
              marginTop: '8px',
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting
              ? 'Processing...'
              : authModalMode === 'login'
              ? 'Sign In to Account'
              : 'Create Account'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.88rem', color: '#64748b' }}>
          {authModalMode === 'login' ? (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('register')}
                style={{ color: '#0d9488', fontWeight: 700, textDecoration: 'underline' }}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                style={{ color: '#0d9488', fontWeight: 700, textDecoration: 'underline' }}
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
