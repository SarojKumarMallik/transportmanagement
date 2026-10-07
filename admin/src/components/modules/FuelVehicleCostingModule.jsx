import React, { useState } from 'react';
import {
  Fuel,
  PlusCircle,
  Search,
  CreditCard,
  Gauge,
  TrendingDown,
  AlertCircle,
} from 'lucide-react';

const INITIAL_FUEL_LOGS = [
  { id: 'FL-901', vehicle: 'MH-04-GP-8821', driver: 'Vikram Singh', date: '2026-10-06', liters: 240, rate: 94.2, total: 22608, odometer: 114820, bunk: 'HPCL AutoPort, Vapi Highway', mileage: 3.65, variance: '-4%' },
  { id: 'FL-902', vehicle: 'TN-09-CB-1240', driver: 'S. Ramachandran', date: '2026-10-06', liters: 120, rate: 93.8, total: 11256, odometer: 84310, bunk: 'IOCL Plaza, Sriperumbudur', mileage: 3.92, variance: '+3%' },
  { id: 'FL-903', vehicle: 'GJ-12-AZ-9932', driver: 'Hardeep Gill', date: '2026-10-05', liters: 310, rate: 94.5, total: 29295, odometer: 132400, bunk: 'BPCL Oasis, Kishangarh', mileage: 3.10, variance: '-18%' },
  { id: 'FL-904', vehicle: 'OD-02-KL-4491', driver: 'Bikram Mohanty', date: '2026-10-06', liters: 180, rate: 95.1, total: 17118, odometer: 96210, bunk: 'Reliance Petroleum, Sambalpur', mileage: 3.55, variance: '-6%' },
  { id: 'FL-905', vehicle: 'MH-12-QE-4519', driver: 'Manoj Jadhav', date: '2026-10-07', liters: 95, rate: 94.0, total: 8930, odometer: 67900, bunk: 'HPCL Express, Expressway Khalapur', mileage: 3.84, variance: '+1%' },
];

const FuelVehicleCostingModule = ({ onNotify }) => {
  const [logs, setLogs] = useState(INITIAL_FUEL_LOGS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = logs.filter((l) => {
    const q = search.toLowerCase();
    return (
      !q ||
      l.id.toLowerCase().includes(q) ||
      l.vehicle.toLowerCase().includes(q) ||
      l.driver.toLowerCase().includes(q) ||
      l.bunk.toLowerCase().includes(q)
    );
  });

  const totalFuelSpend = logs.reduce((acc, curr) => acc + curr.total, 0);
  const totalLiters = logs.reduce((acc, curr) => acc + curr.liters, 0);

  const handleAddFuel = (e) => {
    e.preventDefault();
    const form = e.target;
    const liters = Number(form.liters.value) || 150;
    const rate = Number(form.rate.value) || 94.2;
    const newEntry = {
      id: `FL-${900 + logs.length + 1}`,
      vehicle: form.vehicle.value || 'MH-04-GP-8821',
      driver: form.driver.value || 'Vikram Singh',
      date: new Date().toISOString().slice(0, 10),
      liters,
      rate,
      total: Math.round(liters * rate),
      odometer: Number(form.odometer.value) || 115000,
      bunk: form.bunk.value || 'HPCL Mega Station',
      mileage: 3.7,
      variance: '0%',
    };
    setLogs([newEntry, ...logs]);
    setShowAddModal(false);
    onNotify && onNotify(`Fuel receipt ${newEntry.id} recorded (${newEntry.liters}L - ₹${newEntry.total}).`);
  };

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
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase' }}>
            Energy & Operating Costs
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px' }}>
            Fuel & Vehicle Operating Cost Ledger
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
            Record fuel purchases, diesel bunk slips, odometer logs and vehicle mileage benchmarks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          style={{
            background: '#7c3aed',
            color: '#ffffff',
            border: 'none',
            padding: '9px 18px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.88rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
          }}
        >
          <PlusCircle size={16} /> Log Fuel Purchase
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>TOTAL RECORDED DIESEL</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
            {totalLiters.toLocaleString()} L
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Avg ₹94.3 / Liter</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>TOTAL DIESEL DISBURSEMENT</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7c3aed', margin: '6px 0 2px' }}>
            ₹{totalFuelSpend.toLocaleString('en-IN')}
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>Settled via Fleet Cards</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>FLEET AVERAGE MILEAGE</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
            3.61 km/L
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Target: 3.80 km/L</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>FUEL CARDS BALANCE</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#15803d', margin: '6px 0 2px' }}>
            ₹1,42,800
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>HPCL & IOCL corporate wallets</span>
        </div>
      </div>

      {/* Fuel Log Table */}
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
          <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Fuel Dispensation History</strong>
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '8px', top: '9px' }} />
            <input
              type="text"
              placeholder="Search by vehicle, bunk..."
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
                <th>Slip ID</th>
                <th>Vehicle Plate</th>
                <th>Driver Name</th>
                <th>Bunk Location</th>
                <th>Liters</th>
                <th>Rate (₹)</th>
                <th>Total Paid (INR)</th>
                <th>Telemetry Mileage</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id}>
                  <td>
                    <strong style={{ color: '#0f172a' }}>{log.id}</strong>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{log.vehicle}</span>
                  </td>
                  <td style={{ color: '#475569' }}>{log.driver}</td>
                  <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{log.bunk}</td>
                  <td>
                    <strong style={{ color: '#0f172a' }}>{log.liters} L</strong>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#64748b' }}>₹{log.rate}</td>
                  <td>
                    <strong style={{ color: '#7c3aed', fontSize: '0.92rem' }}>
                      ₹{log.total.toLocaleString('en-IN')}
                    </strong>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        background: log.variance.startsWith('+') ? '#dcfce7' : '#fee2e2',
                        color: log.variance.startsWith('+') ? '#15803d' : '#b91c1c',
                      }}
                    >
                      {log.mileage} km/L ({log.variance})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Fuel */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '460px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
              Log Diesel Dispensation Slip
            </h3>
            <form onSubmit={handleAddFuel} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Vehicle</label>
                <input name="vehicle" defaultValue="MH-04-GP-8821" required style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Liters</label>
                  <input type="number" name="liters" defaultValue={220} required style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Rate (₹/L)</label>
                  <input type="number" step="0.1" name="rate" defaultValue={94.2} required style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Fuel Bunk Station</label>
                <input name="bunk" defaultValue="HPCL Highway Plaza, Surat" required style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Odometer Reading</label>
                <input type="number" name="odometer" defaultValue={116400} required style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#7c3aed', color: '#ffffff', fontWeight: 700 }}>Record Fuel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelVehicleCostingModule;
