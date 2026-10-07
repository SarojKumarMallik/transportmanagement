import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, CheckCircle, Clock, AlertTriangle, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const MyBookingsPage = () => {
  const { user, openAuthModal } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/my');
      if (res.data && res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const res = await api.put(`/bookings/${bookingId}/cancel`);
      if (res.data && res.data.success) {
        fetchBookings();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Cancellation failed');
    }
  };

  if (!user) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <Compass size={48} color="#0d9488" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
            Please Sign In
          </h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Sign in to view your booked journeys, itineraries, and reservation status.
          </p>
          <button onClick={() => openAuthModal('login')} className="btn-primary">
            Sign In to Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
            My Account
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
            My Travel Reservations
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>
            Manage upcoming adventures, review references, and trip details.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            Loading your bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <Compass size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
              No Travel Bookings Found
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px', marginBottom: '20px' }}>
              You haven't reserved any tours yet. Ready for your next journey?
            </p>
            <Link to="/tours" className="btn-primary">
              Explore Tours
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {bookings.map((booking) => {
              const tour = booking.tourPackage;
              const isConfirmed = booking.bookingStatus === 'confirmed';
              const isCancelled = booking.bookingStatus === 'cancelled';

              return (
                <div
                  key={booking._id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '24px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Left info */}
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: '1 1 340px' }}>
                    {tour?.coverImage && (
                      <img
                        src={tour.coverImage}
                        alt={tour.title}
                        style={{
                          width: '100px',
                          height: '90px',
                          borderRadius: '14px',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: '#0d9488',
                            background: '#ccfbf1',
                            padding: '2px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          {booking.bookingReference}
                        </span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: isConfirmed ? '#16a34a' : isCancelled ? '#dc2626' : '#d97706',
                            background: isConfirmed ? '#dcfce7' : isCancelled ? '#fee2e2' : '#fef3c7',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            textTransform: 'uppercase',
                          }}
                        >
                          {booking.bookingStatus}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                        {tour?.title || 'Tour Expedition'}
                      </h3>

                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#64748b' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={14} /> {new Date(booking.travelDate).toLocaleDateString()}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Users size={14} /> {booking.numberOfTravelers} traveler(s)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Price & Actions */}
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Paid</span>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0d9488' }}>
                        ${booking.totalAmount}
                      </div>
                    </div>

                    {!isCancelled && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        style={{
                          fontSize: '0.82rem',
                          color: '#ef4444',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid #fecaca',
                          background: '#fff',
                        }}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
