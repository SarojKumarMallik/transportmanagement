import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, DollarSign, Compass, Sparkles } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('All');
  const [budget, setBudget] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('search', destination);
    if (category && category !== 'All') params.append('category', category);
    if (budget) params.append('maxPrice', budget);
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingBottom: '60px',
        background: 'linear-gradient(180deg, #f0fdfa 0%, #f8fafc 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Gradient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Floating Top Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            borderRadius: '999px',
            background: 'rgba(13, 148, 136, 0.1)',
            color: '#0d9488',
            fontWeight: 700,
            fontSize: '0.88rem',
            marginBottom: '24px',
            border: '1px solid rgba(13, 148, 136, 0.2)',
          }}
        >
          <Sparkles size={16} /> Curated Luxury & Adventure Expeditions
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            maxWidth: '900px',
            margin: '0 auto 20px',
          }}
        >
          Explore The World’s Most Extraordinary <span style={{ color: '#0d9488' }}>Destinations</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#64748b',
            maxWidth: '680px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          Handcrafted travel itineraries, 5-star local guides, transparent pricing, and seamless bookings for unforgettable memories.
        </p>

        {/* Interactive Search Floating Card */}
        <form
          onSubmit={handleSearch}
          style={{
            maxWidth: '980px',
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
            padding: '16px 24px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          {/* Destination Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRight: '1px solid #f1f5f9' }}>
            <div style={{ color: '#0d9488' }}><MapPin size={22} /></div>
            <div style={{ textAlign: 'left', width: '100%' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Where To?
              </label>
              <input
                type="text"
                placeholder="e.g. Santorini, Japan, Bali"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  background: 'transparent',
                }}
              />
            </div>
          </div>

          {/* Tour Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRight: '1px solid #f1f5f9' }}>
            <div style={{ color: '#0d9488' }}><Compass size={22} /></div>
            <div style={{ textAlign: 'left', width: '100%' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Tour Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <option value="All">All Categories</option>
                <option value="Luxury">Luxury</option>
                <option value="Cultural">Cultural</option>
                <option value="Beach & Island">Beach & Island</option>
                <option value="Mountain & Trekking">Mountain & Trekking</option>
                <option value="Wildlife & Safari">Wildlife & Safari</option>
              </select>
            </div>
          </div>

          {/* Max Budget */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px' }}>
            <div style={{ color: '#0d9488' }}><DollarSign size={22} /></div>
            <div style={{ textAlign: 'left', width: '100%' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Max Budget ($)
              </label>
              <input
                type="number"
                placeholder="e.g. 2500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  background: 'transparent',
                }}
              />
            </div>
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="btn-primary"
            style={{
              height: '54px',
              padding: '0 28px',
              borderRadius: '16px',
              fontSize: '1rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Search size={20} /> Find Tours
          </button>
        </form>

        {/* Quick Stat Badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '48px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>50+</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Curated Destinations</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>12,000+</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Happy Travelers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>4.9 ★</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Customer Rating</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>100%</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Guaranteed Departures</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
