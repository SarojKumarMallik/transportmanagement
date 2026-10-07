import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Users, Phone, CheckCircle, RefreshCw } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import api from '../services/api';

const BookingsManagementPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/bookings?status=${statusFilter}`);
      if (res.data && res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { bookingStatus: newStatus });
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.bookingReference?.toLowerCase().includes(search.toLowerCase()) ||
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.tourPackage?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminHeader
        title="Reservations & Bookings"
        subtitle="Manage customer orders, travel dates, status changes, and payments"
        actionButton={
          <button onClick={fetchBookings} className="btn-outline">
            <RefreshCw size={16} /> Refresh
          </button>
        }
      />

      <div className="admin-content">
        {/* Filter and search bar */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '8px 16px',
              flex: '1 1 300px',
              maxWidth: '400px',
            }}
          >
            <Search size={18} color="#94a3b8" style={{ marginRight: '10px' }} />
            <input
              type="text"
              placeholder="Search reference, customer, tour..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', border: 'none', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  background: statusFilter === st ? '#4f46e5' : '#ffffff',
                  color: statusFilter === st ? '#ffffff' : '#64748b',
                  border: statusFilter === st ? '1px solid #4f46e5' : '1px solid #e2e8f0',
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table Card */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Booking Ref</th>
                  <th>Customer Info</th>
                  <th>Tour Package</th>
                  <th>Travel Date</th>
                  <th>Travelers</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                      Loading reservations...
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b._id}>
                      <td>
                        <strong style={{ color: '#4f46e5', fontSize: '0.95rem' }}>
                          {b.bookingReference}
                        </strong>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>
                          {new Date(b.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{b.user?.name || 'Customer'}</div>
                        <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block' }}>{b.user?.email}</span>
                        <span style={{ fontSize: '0.75rem', color: '#0d9488' }}>{b.contactPhone}</span>
                      </td>
                      <td>
                        <div style={{ maxWidth: '180px' }}>
                          <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {b.tourPackage?.title || 'Tour'}
                          </strong>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {b.tourPackage?.destination}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                          {new Date(b.travelDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{b.numberOfTravelers}</span>
                      </td>
                      <td>
                        <strong style={{ fontSize: '1rem', color: '#0d9488' }}>
                          ${b.totalAmount}
                        </strong>
                      </td>
                      <td>
                        <span className={`status-badge status-${b.bookingStatus}`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                      <td>
                        <select
                          value={b.bookingStatus}
                          onChange={(e) => handleStatusChange(b._id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: '#f8fafc',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsManagementPage;
