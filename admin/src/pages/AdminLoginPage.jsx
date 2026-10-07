import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Compass, Eye, EyeOff, Sparkles, Check, Copy } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const DUMMY_ADMIN = {
  email: 'admin@travel.com',
  password: 'password123',
};

const AdminLoginPage = () => {
  const { loginAdmin, adminUser } = useAdminAuth();
  const navigate = useNavigate();

  // If already logged in, redirect immediately to dashboard
  useEffect(() => {
    if (adminUser) {
      navigate('/', { replace: true });
    }
  }, [adminUser, navigate]);

  // Load stored credentials from localStorage or fallback to default dummy credentials
  const [email, setEmail] = useState(() => {
    try {
      const saved = localStorage.getItem('saved_admin_credentials');
      return saved ? JSON.parse(saved).email : DUMMY_ADMIN.email;
    } catch {
      return DUMMY_ADMIN.email;
    }
  });

  const [password, setPassword] = useState(() => {
    try {
      const saved = localStorage.getItem('saved_admin_credentials');
      return saved ? JSON.parse(saved).password : DUMMY_ADMIN.password;
    } catch {
      return DUMMY_ADMIN.password;
    }
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Ensure default dummy credentials are saved in localStorage on first load
  useEffect(() => {
    try {
      if (!localStorage.getItem('saved_admin_credentials')) {
        localStorage.setItem('saved_admin_credentials', JSON.stringify(DUMMY_ADMIN));
      }
    } catch (e) {
      console.warn('Storage access warning:', e);
    }
  }, []);

  const handleSaveCredentials = (emailVal, passVal) => {
    try {
      if (rememberMe) {
        localStorage.setItem(
          'saved_admin_credentials',
          JSON.stringify({ email: emailVal, password: passVal })
        );
      }
    } catch (e) {
      console.warn('Failed to save credentials to localStorage:', e);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setError('');

    handleSaveCredentials(email, password);

    const res = await loginAdmin(email, password);
    setSubmitting(false);

    if (!res.success) {
      setError(res.message);
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleFillDemo = () => {
    setEmail(DUMMY_ADMIN.email);
    setPassword(DUMMY_ADMIN.password);
    setError('');
    handleSaveCredentials(DUMMY_ADMIN.email, DUMMY_ADMIN.password);
  };

  const handleQuickDemoLogin = async () => {
    setEmail(DUMMY_ADMIN.email);
    setPassword(DUMMY_ADMIN.password);
    setError('');
    handleSaveCredentials(DUMMY_ADMIN.email, DUMMY_ADMIN.password);
    setSubmitting(true);

    const res = await loginAdmin(DUMMY_ADMIN.email, DUMMY_ADMIN.password);
    setSubmitting(false);

    if (!res.success) {
      setError(res.message);
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1800);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="login-card-container"
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '580px',
          borderRadius: '24px',
          padding: '44px 44px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              margin: '0 auto 16px',
              boxShadow: '0 8px 16px rgba(79, 70, 229, 0.3)',
            }}
          >
            <Compass size={32} />
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '4px' }}>
            Sign in to manage tours, bookings, and platform analytics.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f8faff 0%, #eef2ff 100%)',
            border: '1.5px solid #c7d2fe',
            borderRadius: '14px',
            padding: '14px 16px',
            marginBottom: '22px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#3730a3' }}>
              <Sparkles size={15} style={{ color: '#4f46e5' }} />
              <span>Stored Dummy Credentials</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={handleFillDemo}
                style={{
                  background: '#e0e7ff',
                  color: '#4338ca',
                  border: 'none',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '4px 9px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                title="Fill inputs with dummy credentials"
              >
                Auto Fill
              </button>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                disabled={submitting}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.25)',
                }}
                title="1-Click immediate login"
              >
                1-Click Login
              </button>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>
                <strong>ID:</strong> <code style={{ color: '#4338ca', background: '#ffffff', padding: '1px 6px', borderRadius: '4px', border: '1px solid #e0e7ff' }}>admin@travel.com</code>
              </span>
              <button
                type="button"
                onClick={() => handleCopy('admin@travel.com', 'email')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', padding: '2px' }}
                title="Copy ID"
              >
                {copiedField === 'email' ? <Check size={13} style={{ color: '#16a34a' }} /> : <Copy size={13} />}
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>
                <strong>Pass:</strong> <code style={{ color: '#4338ca', background: '#ffffff', padding: '1px 6px', borderRadius: '4px', border: '1px solid #e0e7ff' }}>password123</code>
              </span>
              <button
                type="button"
                onClick={() => handleCopy('password123', 'pass')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', padding: '2px' }}
                title="Copy Password"
              >
                {copiedField === 'pass' ? <Check size={13} style={{ color: '#16a34a' }} /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#dc2626',
              fontSize: '0.85rem',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
              Admin Email / ID
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: '#94a3b8' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@travel.com"
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
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password123"
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.92rem',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#475569' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#4f46e5', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span>Store credentials on this page</span>
            </label>
            <button
              type="button"
              onClick={handleFillDemo}
              style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, cursor: 'pointer' }}
            >
              Reset to Dummy
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-admin"
            style={{
              width: '100%',
              padding: '14px',
              justifyContent: 'center',
              fontSize: '0.95rem',
              fontWeight: 700,
              marginTop: '4px',
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? 'Verifying...' : 'Sign In to Dashboard'}
            <ArrowRight size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLoginPage;
