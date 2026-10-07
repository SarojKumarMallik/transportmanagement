import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Users,
  Star,
  CheckCircle,
  XCircle,
  Calendar,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import api from '../services/api';

const TourDetailPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await api.get(`/tours/${id}`);
        if (res.data && res.data.success) {
          setTour(res.data.tour);
        }
      } catch (err) {
        console.error('Failed to load tour:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', minHeight: '80vh', color: '#64748b' }}>
        Loading expedition details...
      </div>
    );
  }

  if (!tour) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', minHeight: '80vh' }}>
        <h2>Tour not found</h2>
        <Link to="/tours" className="btn-primary" style={{ marginTop: '20px' }}>
          Back to Tours
        </Link>
      </div>
    );
  }

  const allImages = [tour.coverImage, ...(tour.images || [])];
  const price = tour.discountPrice > 0 ? tour.discountPrice : tour.price;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', background: '#f8fafc' }}>
      <div className="container">
        {/* Back Link */}
        <Link
          to="/tours"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#64748b',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '24px',
          }}
        >
          <ArrowLeft size={16} /> Back to all tours
        </Link>

        {/* Title & Metadata */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">{tour.category}</span>
            <span className="badge badge-dark">
              <MapPin size={13} color="#38bdf8" /> {tour.destination}, {tour.country}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
            {tour.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 700 }}>
              <Star size={18} fill="#f59e0b" />
              <span>{tour.rating || 4.9}</span>
              <span style={{ color: '#64748b', fontWeight: 500 }}>({tour.reviewCount || 24} reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontWeight: 600 }}>
              <Clock size={16} /> {tour.durationDays} Days / {tour.durationNights} Nights
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontWeight: 600 }}>
              <Users size={16} /> Max Group: {tour.groupSize || 12} people
            </div>
          </div>
        </div>

        {/* Image Showcase Gallery */}
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              height: '460px',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '14px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            }}
          >
            <img
              src={allImages[activeImage]}
              alt={tour.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {allImages.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  style={{
                    width: '110px',
                    height: '75px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: activeImage === idx ? '3px solid #0d9488' : '2px solid transparent',
                    opacity: activeImage === idx ? 1 : 0.65,
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Layout Grid (Details + Sticky Booking Card) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Main Left Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {/* Overview */}
            <div style={{ background: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
                Trip Overview
              </h2>
              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.8 }}>
                {tour.overview}
              </p>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div style={{ background: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                  Tour Highlights
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  {tour.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ color: '#0d9488', marginTop: '2px' }}><Sparkles size={18} /></div>
                      <span style={{ fontSize: '0.95rem', color: '#334155', fontWeight: 500 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day-by-Day Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div style={{ background: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>
                  Day-by-Day Itinerary
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {tour.itinerary.map((dayItem) => (
                    <div
                      key={dayItem.day}
                      style={{
                        padding: '20px',
                        borderRadius: '16px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span
                          style={{
                            background: '#0d9488',
                            color: '#fff',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            padding: '4px 12px',
                            borderRadius: '999px',
                          }}
                        >
                          DAY {dayItem.day}
                        </span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                          {dayItem.title}
                        </h4>
                      </div>
                      <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, paddingLeft: '8px' }}>
                        {dayItem.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {/* Inclusions */}
              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#16a34a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={20} /> What's Included
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tour.inclusions?.map((inc, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#475569', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#16a34a' }}>✓</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#dc2626', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XCircle size={20} /> What's Excluded
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tour.exclusions?.map((exc, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#475569', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#dc2626' }}>✕</span> {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar Card */}
          <div
            style={{
              position: 'sticky',
              top: '100px',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '32px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Price per person</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0d9488' }}>
                    ${price}
                  </span>
                  {tour.discountPrice > 0 && (
                    <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                      ${tour.price}
                    </span>
                  )}
                </div>
              </div>
              <span className="badge badge-accent">Best Price Guarantee</span>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', fontSize: '0.9rem', color: '#475569' }}>
                <Calendar size={18} color="#0d9488" /> Instant Online Booking Confirmation
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', fontSize: '0.9rem', color: '#475569' }}>
                <ShieldCheck size={18} color="#0d9488" /> Free Cancellation up to 7 days before
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: '16px',
              }}
            >
              Book This Journey Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal Instance */}
      <BookingModal
        tour={tour}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default TourDetailPage;
