import React, { useState } from 'react';
import {
  TrendingUp,
  MapPin,
  Calculator,
  PlusCircle,
  Search,
  ArrowRight,
  ShieldAlert,
  Percent,
} from 'lucide-react';

const INITIAL_ROUTES = [
  { id: 'RT-101', origin: 'JNPT Port, Mumbai', dest: 'Gurgaon ICD, NCR', distance: 1419, baseRate: 185000, ratePerKm: 130.3, transitHours: 36, avgToll: 4850, capacityTon: 32 },
  { id: 'RT-102', origin: 'Chennai Harbor', dest: 'Whitefield Depot, Bengaluru', distance: 345, baseRate: 92000, ratePerKm: 266.6, transitHours: 9, avgToll: 1250, capacityTon: 24 },
  { id: 'RT-103', origin: 'Mundra Port, Gujarat', dest: 'Baddi Industrial, HP', distance: 1380, baseRate: 215000, ratePerKm: 155.7, transitHours: 38, avgToll: 5200, capacityTon: 28 },
  { id: 'RT-104', origin: 'Kolkata Docks', dest: 'Varanasi Logistics Park', distance: 685, baseRate: 145000, ratePerKm: 211.6, transitHours: 18, avgToll: 2800, capacityTon: 35 },
  { id: 'RT-105', origin: 'Nhava Sheva, Mumbai', dest: 'Chakan Auto Hub, Pune', distance: 138, baseRate: 78000, ratePerKm: 565.2, transitHours: 4, avgToll: 650, capacityTon: 26 },
  { id: 'RT-106', origin: 'Delhi IGI Cargo', dest: 'Hyderabad Air Cargo', distance: 1580, baseRate: 340000, ratePerKm: 215.1, transitHours: 6, avgToll: 0, capacityTon: 10 },
];

const FreightRouteCostingModule = ({ onNotify }) => {
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [search, setSearch] = useState('');
  const [calcState, setCalcState] = useState({
    origin: 'JNPT Port, Mumbai',
    dest: 'Gurgaon ICD, NCR',
    weight: 24,
    rateMultiplier: 1.15,
  });

  const filtered = routes.filter((r) => {
    const q = search.toLowerCase();
    return (
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.origin.toLowerCase().includes(q) ||
      r.dest.toLowerCase().includes(q)
    );
  });

  // Calculate quotation
  const selectedRoute = routes.find((r) => r.origin === calcState.origin && r.dest === calcState.dest) || routes[0];
  const calculatedFreight = Math.round(selectedRoute.baseRate * (calcState.weight / 25) * calcState.rateMultiplier);
  const fuelEstimated = Math.round(selectedRoute.distance * 38);
  const tollEstimated = selectedRoute.avgToll;
  const driverExpense = Math.round(selectedRoute.transitHours * 120);
  const marginEstimate = calculatedFreight - (fuelEstimated + tollEstimated + driverExpense);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>
            Freight Tariffs & Corridors
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px' }}>
            Freight & Route Costing Matrix
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
            Maintain standard freight rates, corridor tariffs, distance tables and shipment-related calculations.
          </p>
        </div>
      </div>

      {/* 2-Column: Rate Matrix Table & Interactive Calculator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        {/* Route Tariff Matrix Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#fafafa',
            }}
          >
            <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Active Route Tariff Sheet</strong>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '8px', top: '9px' }} />
              <input
                type="text"
                placeholder="Search route..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '6px 10px 6px 28px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
              />
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Route Lane</th>
                  <th>Distance</th>
                  <th>Base Rate (INR)</th>
                  <th>Rate/Km</th>
                  <th>Transit ETA</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setCalcState({ ...calcState, origin: r.origin, dest: r.dest })}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>{r.origin}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: '#0284c7' }}>
                        <ArrowRight size={11} /> {r.dest}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{r.distance} km</td>
                    <td>
                      <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>
                        ₹{r.baseRate.toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#475569' }}>₹{r.ratePerKm}/km</td>
                    <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{r.transitHours} hrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Freight Quotation Estimator */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Calculator size={18} color="#d97706" />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Live Freight Rate Calculator
            </h4>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '16px' }}>
            Instant rate quote computation with automated fuel allocation and margin projection.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Selected Corridor
              </label>
              <div style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                {selectedRoute.origin} ➔ {selectedRoute.dest} ({selectedRoute.distance} km)
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Payload Weight (Tons)
                </label>
                <input
                  type="number"
                  value={calcState.weight}
                  onChange={(e) => setCalcState({ ...calcState, weight: Number(e.target.value) || 1 })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Surge / Demand Multiplier
                </label>
                <select
                  value={calcState.rateMultiplier}
                  onChange={(e) => setCalcState({ ...calcState, rateMultiplier: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                >
                  <option value={1.0}>Standard Tariff (1.0x)</option>
                  <option value={1.15}>Peak Highway Season (1.15x)</option>
                  <option value={1.3}>Urgent Priority Express (1.30x)</option>
                </select>
              </div>
            </div>

            {/* Computation Card */}
            <div style={{ background: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>
                  Quoted Billed Freight
                </span>
                <strong style={{ fontSize: '1.4rem', fontWeight: 800, color: '#b45309' }}>
                  ₹{calculatedFreight.toLocaleString('en-IN')}
                </strong>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#78350f', borderTop: '1px solid #fde68a', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated Diesel Allocation:</span>
                  <strong>₹{fuelEstimated.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tolls & FASTag Allocation:</span>
                  <strong>₹{tollEstimated.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Driver En-route Batta:</span>
                  <strong>₹{driverExpense.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803d', fontWeight: 800, paddingTop: '4px' }}>
                  <span>Projected Net Contribution:</span>
                  <strong>+₹{marginEstimate.toLocaleString('en-IN')} ({Math.round((marginEstimate / calculatedFreight) * 100)}%)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreightRouteCostingModule;
