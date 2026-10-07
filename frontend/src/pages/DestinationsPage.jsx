import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import api from '../services/api';

const destinationsData = [
  {
    name: 'Santorini',
    country: 'Greece',
    description: 'Iconic white-washed cliffside villages overlooking the azure Aegean sea.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    toursCount: 4,
    season: 'May - October',
  },
  {
    name: 'Kyoto & Tokyo',
    country: 'Japan',
    description: 'Immerse in cherry blossoms, ancient shrines, and futuristic neon skylines.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    toursCount: 6,
    season: 'Year-Round',
  },
  {
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Majestic snowy peaks, alpine lakes, and panoramic scenic train rides.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
    toursCount: 5,
    season: 'Dec - April & June - Sept',
  },
  {
    name: 'Bali & Nusa Penida',
    country: 'Indonesia',
    description: 'Tropical paradise featuring lush rice terraces, sacred temples, and turquoise waves.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    toursCount: 8,
    season: 'April - October',
  },
  {
    name: 'Serengeti Safari',
    country: 'Tanzania',
    description: 'Witness the Great Migration, Big Five, and glorious African sunsets.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    toursCount: 3,
    season: 'June - October',
  },
];

const DestinationsPage = () => {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '90vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
            Inspiring Locales
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>
            Top World Destinations
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px' }}>
            Handpicked gems across Europe, Asia, Africa, and beyond.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {destinationsData.map((dest, idx) => (
            <Link
              key={idx}
              to={`/tours?search=${encodeURIComponent(dest.name)}`}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                height: '380px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(15,23,42,0.1) 30%, rgba(15,23,42,0.85) 100%)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#fff',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-primary">{dest.toursCount} Tours Available</span>
                  <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Best: {dest.season}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>
                  {dest.name}, {dest.country}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.4, marginBottom: '14px' }}>
                  {dest.description}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2dd4bf', fontWeight: 700, fontSize: '0.9rem' }}>
                  Explore Packages <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
