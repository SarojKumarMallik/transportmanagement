import React from 'react';
import { Compass, Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', paddingTop: '70px', paddingBottom: '30px' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '50px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Compass size={22} />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
                Wander<span style={{ color: '#2dd4bf' }}>Sphere</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '20px' }}>
              Crafting extraordinary journeys and luxury expeditions across 50+ countries. Experience the world in unmatched style and comfort.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{ color: '#cbd5e1' }}><Instagram size={18} /></a>
              <a href="#" style={{ color: '#cbd5e1' }}><Twitter size={18} /></a>
              <a href="#" style={{ color: '#cbd5e1' }}><Facebook size={18} /></a>
              <a href="#" style={{ color: '#cbd5e1' }}><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Home</Link></li>
              <li><Link to="/tours" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>All Tour Packages</Link></li>
              <li><Link to="/destinations" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Top Destinations</Link></li>
              <li><Link to="/my-bookings" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>My Bookings</Link></li>
              <li><a href="http://localhost:5174" target="_blank" rel="noreferrer" style={{ color: '#818cf8', fontWeight: 600 }}>Admin Portal →</a></li>
            </ul>
          </div>

          {/* Tour Categories */}
          <div>
            <h4 style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>
              Popular Styles
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li><Link to="/tours?category=Luxury" style={{ color: '#94a3b8' }}>Luxury Getaways</Link></li>
              <li><Link to="/tours?category=Mountain+%26+Trekking" style={{ color: '#94a3b8' }}>Alpine & Mountain Treks</Link></li>
              <li><Link to="/tours?category=Beach+%26+Island" style={{ color: '#94a3b8' }}>Beach & Island Resorts</Link></li>
              <li><Link to="/tours?category=Cultural" style={{ color: '#94a3b8' }}>Cultural Heritage</Link></li>
              <li><Link to="/tours?category=Wildlife+%26+Safari" style={{ color: '#94a3b8' }}>African Safaris</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>
              Get In Touch
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MapPin size={18} color="#2dd4bf" /> 742 Evergreen Terrace, San Francisco, CA
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} color="#2dd4bf" /> +1 (800) 459-WANDER
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={18} color="#2dd4bf" /> concierge@wandersphere.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: '#64748b',
          }}
        >
          <p>© {new Date().getFullYear()} WanderSphere Travel Inc. Built with MERN Stack.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#64748b' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#64748b' }}>Terms of Service</a>
            <a href="#" style={{ color: '#64748b' }}>Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
