import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PlusCircle,
  Edit2,
  Trash2,
  Search,
  MapPin,
  Clock,
  X,
  Check,
  Star,
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import api from '../services/api';

const defaultTourForm = {
  title: '',
  destination: '',
  country: '',
  category: 'Adventure',
  durationDays: 5,
  durationNights: 4,
  price: 1200,
  discountPrice: 0,
  groupSize: 10,
  featured: false,
  status: 'active',
  coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
  overview: '',
  highlights: 'Scenic Guided Excursion, Luxury 5-Star Stays, All Local Transfers',
  inclusions: 'Hotel accommodations, Daily breakfast, Local tour guide',
  exclusions: 'Flights, Visa fees',
};

const ToursManagementPage = () => {
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTourId, setEditingTourId] = useState(null);
  const [formData, setFormData] = useState(defaultTourForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTours();
    if (searchParams.get('action') === 'new') {
      openCreateModal();
    }
  }, [searchParams]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tours?limit=50');
      if (res.data && res.data.success) {
        setTours(res.data.tours);
      }
    } catch (err) {
      console.error('Failed to load tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingTourId(null);
    setFormData(defaultTourForm);
    setIsModalOpen(true);
  };

  const openEditModal = (tour) => {
    setEditingTourId(tour._id);
    setFormData({
      title: tour.title,
      destination: tour.destination,
      country: tour.country,
      category: tour.category,
      durationDays: tour.durationDays,
      durationNights: tour.durationNights,
      price: tour.price,
      discountPrice: tour.discountPrice || 0,
      groupSize: tour.groupSize || 10,
      featured: tour.featured || false,
      status: tour.status || 'active',
      coverImage: tour.coverImage,
      overview: tour.overview,
      highlights: tour.highlights?.join(', ') || '',
      inclusions: tour.inclusions?.join(', ') || '',
      exclusions: tour.exclusions?.join(', ') || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour package?')) return;
    try {
      await api.delete(`/tours/${id}`);
      fetchTours();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      highlights: typeof formData.highlights === 'string'
        ? formData.highlights.split(',').map((s) => s.trim()).filter(Boolean)
        : formData.highlights,
      inclusions: typeof formData.inclusions === 'string'
        ? formData.inclusions.split(',').map((s) => s.trim()).filter(Boolean)
        : formData.inclusions,
      exclusions: typeof formData.exclusions === 'string'
        ? formData.exclusions.split(',').map((s) => s.trim()).filter(Boolean)
        : formData.exclusions,
    };

    try {
      if (editingTourId) {
        await api.put(`/tours/${editingTourId}`, payload);
      } else {
        await api.post('/tours', payload);
      }
      setIsModalOpen(false);
      fetchTours();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTours = tours.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase()) ||
      t.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminHeader
        title="Tour Packages Management"
        subtitle="Create, update itineraries, pricing, and availability"
        actionButton={
          <button onClick={openCreateModal} className="btn-admin">
            <PlusCircle size={18} /> Add New Tour
          </button>
        }
      />

      <div className="admin-content">
        {/* Search & Stats Filter */}
        <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '8px 16px',
              width: '100%',
              maxWidth: '380px',
            }}
          >
            <Search size={18} color="#94a3b8" style={{ marginRight: '10px' }} />
            <input
              type="text"
              placeholder="Search tours by name, destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', border: 'none', fontSize: '0.9rem' }}
            />
          </div>
          <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>
            Showing {filteredTours.length} tours
          </span>
        </div>

        {/* Tours Table Card */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Tour Details</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                      Loading tour catalog...
                    </td>
                  </tr>
                ) : filteredTours.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                      No tour packages found.
                    </td>
                  </tr>
                ) : (
                  filteredTours.map((tour) => (
                    <tr key={tour._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img
                            src={tour.coverImage}
                            alt={tour.title}
                            style={{ width: '60px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div>
                            <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block' }}>
                              {tour.title}
                            </strong>
                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                              {tour.destination}, {tour.country}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            background: '#e0e7ff',
                            color: '#4338ca',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: '8px',
                          }}
                        >
                          {tour.category}
                        </span>
                      </td>
                      <td>
                        {tour.durationDays}D / {tour.durationNights}N
                      </td>
                      <td>
                        <strong style={{ color: '#0d9488', fontSize: '1rem' }}>
                          ${tour.discountPrice > 0 ? tour.discountPrice : tour.price}
                        </strong>
                        {tour.discountPrice > 0 && (
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through', display: 'block' }}>
                            ${tour.price}
                          </span>
                        )}
                      </td>
                      <td>
                        <span className={`status-badge status-${tour.status}`}>
                          {tour.status}
                        </span>
                      </td>
                      <td>
                        {tour.featured ? (
                          <span style={{ color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
                            <Star size={14} fill="#f59e0b" /> Yes
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>No</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => openEditModal(tour)}
                            title="Edit Tour"
                            style={{
                              padding: '8px',
                              background: '#f1f5f9',
                              borderRadius: '8px',
                              color: '#4f46e5',
                            }}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(tour._id)}
                            title="Delete Tour"
                            style={{
                              padding: '8px',
                              background: '#fee2e2',
                              borderRadius: '8px',
                              color: '#dc2626',
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal Form */}
      {isModalOpen && (
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              width: '100%',
              maxWidth: '680px',
              borderRadius: '24px',
              padding: '32px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
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

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
              {editingTourId ? 'Edit Tour Package' : 'Create New Tour Package'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Tour Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Amalfi Coast Sailing & Cooking Retreat"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Destination / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Amalfi Coast"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Italy"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="Adventure">Adventure</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Beach & Island">Beach & Island</option>
                    <option value="Mountain & Trekking">Mountain & Trekking</option>
                    <option value="Wildlife & Safari">Wildlife & Safari</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.durationDays}
                    onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Nights
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.durationNights}
                    onChange={(e) => setFormData({ ...formData, durationNights: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Regular Price ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Discounted Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Overview & Description *
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Feature on Homepage
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <span>Status:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-admin"
                  style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
                >
                  {submitting ? 'Saving...' : editingTourId ? 'Save Changes' : 'Publish Tour'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline"
                  style={{ padding: '12px 20px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToursManagementPage;
