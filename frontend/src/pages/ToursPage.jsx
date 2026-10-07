import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Compass, SlidersHorizontal } from 'lucide-react';
import TourCard from '../components/TourCard';
import BookingModal from '../components/BookingModal';
import api from '../services/api';

const categoriesList = [
  'All',
  'Luxury',
  'Cultural',
  'Beach & Island',
  'Mountain & Trekking',
  'Wildlife & Safari',
];

const ToursPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('price-low');
  const [selectedTourForBooking, setSelectedTourForBooking] = useState(null);

  useEffect(() => {
    fetchTours();
  }, [searchParams, category, sort]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      const s = searchParams.get('search') || search;
      if (s) params.append('search', s);
      if (category && category !== 'All') params.append('category', category);
      const maxP = searchParams.get('maxPrice');
      if (maxP) params.append('maxPrice', maxP);
      if (sort) params.append('sort', sort);

      const res = await api.get(`/tours?${params.toString()}`);
      if (res.data && res.data.success) {
        setTours(res.data.tours);
      }
    } catch (err) {
      console.error('Failed to fetch tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchParams.set('search', search);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '90vh' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
            Expedition Directory
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a' }}>
            Explore All Tour Packages
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px' }}>
            Find the perfect journey customized for your budget, timeline, and travel taste.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            border: '1px solid #e2e8f0',
            marginBottom: '36px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '6px 14px',
              flex: '1 1 300px',
            }}
          >
            <Search size={18} color="#94a3b8" style={{ marginRight: '10px' }} />
            <input
              type="text"
              placeholder="Search destination, country, tour name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                fontSize: '0.92rem',
                color: '#1e293b',
              }}
            />
            <button
              type="submit"
              style={{
                background: '#0d9488',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Search
            </button>
          </form>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#1e293b',
                background: '#f8fafc',
                cursor: 'pointer',
              }}
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="duration">Duration (Days)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '14px',
            marginBottom: '32px',
          }}
        >
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '0.88rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: category === cat ? '#0d9488' : '#ffffff',
                color: category === cat ? '#ffffff' : '#475569',
                border: category === cat ? '1px solid #0d9488' : '1px solid #e2e8f0',
                boxShadow: category === cat ? '0 4px 12px rgba(13, 148, 136, 0.25)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            Loading tour packages...
          </div>
        ) : tours.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Compass size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 700 }}>No Tours Found</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px' }}>
              Try adjusting your search criteria or category filter.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '30px',
            }}
          >
            {tours.map((tour) => (
              <TourCard
                key={tour._id}
                tour={tour}
                onBookNow={() => setSelectedTourForBooking(tour)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
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

export default ToursPage;
