import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Shield, Award, Headphones, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import TourCard from '../components/TourCard';
import BookingModal from '../components/BookingModal';
import api from '../services/api';

const HomePage = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState(null);

  useEffect(() => {
    const loadFeaturedData = async () => {
      try {
        const res = await api.get('/tours/featured/list');
        if (res.data && res.data.success) {
          setFeaturedTours(res.data.featured);
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.error('Failed to load featured data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedData();
  }, []);

  return (
    <div>
      {/* Hero Section with Search */}
      <Hero />

      {/* Featured Tour Packages Section */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
                Handpicked Collections
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
                Featured Tour Packages
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px' }}>
                Most popular luxury expeditions rated 4.8+ by travelers worldwide.
              </p>
            </div>
            <Link
              to="/tours"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#0d9488',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              View All Tours <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              Loading luxury packages...
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '30px',
              }}
            >
              {featuredTours.map((tour) => (
                <TourCard
                  key={tour._id}
                  tour={tour}
                  onBookNow={() => setSelectedTourForBooking(tour)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Value Propositions / Why Choose Us */}
      <section style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 60px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
              Why WanderSphere
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
              Designed For The Discerning Traveler
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px' }}>
              We orchestrate every detail so you can immerse fully in the joy of discovery.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
            }}
          >
            <div
              style={{
                background: '#f8fafc',
                padding: '36px 28px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#ccfbf1',
                  color: '#0d9488',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                Handcrafted Itineraries
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Carefully tested routes designed by veteran expedition leaders for maximum depth & comfort.
              </p>
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: '36px 28px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <Shield size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                100% Price Transparency
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                No hidden surprises or surprise surcharges. Includes boutique stays, transfers, and guides.
              </p>
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: '36px 28px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#e0e7ff',
                  color: '#4f46e5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <Headphones size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                24/7 Dedicated Concierge
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Around-the-clock support from travel advisors before, during, and after your trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal Instance */}
      {selectedTourForBooking && (
        <BookingModal
          tour={selectedTourForBooking}
          isOpen={Boolean(selectedTourForBooking)}
          onClose={() => setSelectedTourForBooking(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
