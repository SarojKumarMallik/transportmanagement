import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Users, Phone, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const BookingModal = ({ tour, isOpen, onClose, onSuccess }) => {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const [travelDate, setTravelDate] = useState('');
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [contactPhone, setContactPhone] = useState(user?.phone || '');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Instant)');
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen || !tour) return null;

  const pricePerPerson = tour.discountPrice > 0 ? tour.discountPrice : tour.price;
  const totalAmount = pricePerPerson * numberOfTravelers;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('login');
      return;
    }

    if (!travelDate) {
      setError('Please select a departure travel date');
      return;
    }
    if (!contactPhone) {
      setError('Please provide a contact phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/bookings', {
        tourPackageId: tour._id,
        travelDate,
        numberOfTravelers,
        contactPhone,
        specialRequests,
        paymentMethod,
      });

      if (res.data && res.data.success) {
        setConfirmedBooking(res.data.booking);
        if (onSuccess) onSuccess(res.data.booking);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '560px',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'fadeIn 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
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

        {confirmedBooking ? (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle size={40} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Booking Confirmed!
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>
              Your reservation is locked in. We have sent the confirmation & itinerary pack to your email.
            </p>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'left',
                marginBottom: '28px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#64748b', fontSize: '0.88rem' }}>Booking Reference</span>
                <strong style={{ color: '#0d9488', fontSize: '1rem' }}>{confirmedBooking.bookingReference}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#64748b', fontSize: '0.88rem' }}>Tour Package</span>
                <strong style={{ color: '#0f172a', fontSize: '0.9rem', maxWidth: '60%', textAlign: 'right' }}>
                  {tour.title}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#64748b', fontSize: '0.88rem' }}>Travel Date</span>
                <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                  {new Date(confirmedBooking.travelDate).toLocaleDateString()}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #cbd5e1', paddingTop: '10px' }}>
                <span style={{ color: '#64748b', fontSize: '0.88rem' }}>Total Paid</span>
                <strong style={{ color: '#0d9488', fontSize: '1.2rem' }}>${confirmedBooking.totalAmount}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  onClose();
                  navigate('/my-bookings');
                }}
                className="btn-primary"
                style={{ flex: 1, padding: '14px' }}
              >
                View My Bookings
              </button>
              <button
                onClick={onClose}
                className="btn-secondary"
                style={{ flex: 1, padding: '14px' }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
                Secure Reservation
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                {tour.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>
                ${pricePerPerson} / traveler • {tour.durationDays} Days / {tour.durationNights} Nights
              </p>
            </div>

            {error && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#dc2626',
                  fontSize: '0.85rem',
                  marginBottom: '16px',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Departure Date */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  Select Departure Date *
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: '#94a3b8' }} />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
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

              {/* Number of Travelers */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  Number of Travelers
                </label>
                <div style={{ position: 'relative' }}>
                  <Users size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: '#94a3b8' }} />
                  <select
                    value={numberOfTravelers}
                    onChange={(e) => setNumberOfTravelers(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                      background: '#fff',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} Traveler{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Phone */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  Primary Contact Phone *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: '#94a3b8' }} />
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
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

              {/* Special Requests */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  Special Requests / Dietary Requirements
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Vegetarian diet, anniversary setup, airport pick-up details..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    resize: 'none',
                  }}
                />
              </div>

              {/* Price Calculation Summary */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '16px',
                  marginTop: '4px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem', color: '#64748b' }}>
                  <span>${pricePerPerson} × {numberOfTravelers} traveler(s)</span>
                  <span>${totalAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem', color: '#64748b' }}>
                  <span>Taxes & Booking Fees</span>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>FREE ($0)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                  <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Total Amount</strong>
                  <strong style={{ fontSize: '1.3rem', color: '#0d9488' }}>${totalAmount}</strong>
                </div>
              </div>

              {/* Booking CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                <ShieldCheck size={20} />
                {loading ? 'Processing Reservation...' : `Confirm & Pay $${totalAmount}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
