import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';

const TourCard = ({ tour, onBookNow }) => {
  const currentPrice = tour.discountPrice > 0 ? tour.discountPrice : tour.price;
  const hasDiscount = tour.discountPrice > 0 && tour.discountPrice < tour.price;

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 35px rgba(13, 148, 136, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
      }}
    >
      {/* Image Thumbnail with Badges */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img
          src={tour.coverImage}
          alt={tour.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Category Pill */}
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
          <span className="badge badge-dark">{tour.category}</span>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
            <span
              style={{
                background: '#ef4444',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '999px',
              }}
            >
              SAVE ${tour.price - tour.discountPrice}
            </span>
          </div>
        )}

        {/* Destination Location Label */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
          }}
        >
          <MapPin size={15} color="#38bdf8" /> {tour.destination}, {tour.country}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Rating and Group */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.88rem', fontWeight: 700 }}>
            <Star size={16} fill="#f59e0b" />
            <span>{tour.rating || 4.9}</span>
            <span style={{ color: '#94a3b8', fontWeight: 500 }}>({tour.reviewCount || 24})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.82rem', fontWeight: 600 }}>
            <Clock size={14} /> {tour.durationDays}D / {tour.durationNights}N
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.35,
            marginBottom: '10px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tour.title}
        </h3>

        {/* Overview snippet */}
        <p
          style={{
            fontSize: '0.88rem',
            color: '#64748b',
            lineHeight: 1.5,
            marginBottom: '18px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tour.overview}
        </p>

        {/* Card Footer: Price & Action */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>
              From / Person
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0d9488' }}>
                ${currentPrice}
              </span>
              {hasDiscount && (
                <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ${tour.price}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to={`/tours/${tour._id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderRadius: '12px',
                background: '#f0fdfa',
                color: '#0d9488',
                fontWeight: 700,
                fontSize: '0.88rem',
              }}
            >
              Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
