import React, { useState } from 'react';
import {
  Send,
  Truck,
  Calendar,
  Clock,
  ArrowRight,
  PlusCircle,
  Search,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const INITIAL_DISPATCHES = [
  { id: 'DSP-501', tripId: 'TRP-8001', route: 'JNPT Port ➔ Gurgaon ICD', vehicle: 'MH-04-GP-8821', driver: 'Vikram Singh', stage: 'In Transit', scheduledDeparture: '2026-10-06 06:00', estArrival: '2026-10-07 18:00', priority: 'High', gatePass: 'GP-99120' },
  { id: 'DSP-502', tripId: 'TRP-8002', route: 'Chennai Harbor ➔ Whitefield Depot', vehicle: 'TN-09-CB-1240', driver: 'S. Ramachandran', stage: 'In Transit', scheduledDeparture: '2026-10-07 04:30', estArrival: '2026-10-07 14:00', priority: 'Urgent', gatePass: 'GP-99121' },
  { id: 'DSP-503', tripId: 'TRP-8003', route: 'Mundra Port ➔ Baddi Industrial', vehicle: 'GJ-12-AZ-9932', driver: 'Hardeep Gill', stage: 'Held at Border', scheduledDeparture: '2026-10-05 18:00', estArrival: '2026-10-07 16:00', priority: 'Urgent', gatePass: 'GP-99118' },
  { id: 'DSP-504', tripId: 'TRP-8005', route: 'Nhava Sheva ➔ Chakan Auto Hub', vehicle: 'MH-12-QE-4519', driver: 'Manoj Jadhav', stage: 'In Transit', scheduledDeparture: '2026-10-07 08:00', estArrival: '2026-10-07 12:30', priority: 'Normal', gatePass: 'GP-99123' },
  { id: 'DSP-505', tripId: 'TRP-8021', route: 'Bhiwandi Hub ➔ Indore Transport Nagar', vehicle: 'MH-04-KU-5109', driver: 'Sunil Chavan', stage: 'Staged for Loading', scheduledDeparture: '2026-10-07 22:00', estArrival: '2026-10-08 14:00', priority: 'High', gatePass: 'GP-99128' },
  { id: 'DSP-506', tripId: 'TRP-8022', route: 'Ennore Port ➔ Hosur SEZ', vehicle: 'TN-04-XY-7719', driver: 'M. Selvam', stage: 'Staged for Loading', scheduledDeparture: '2026-10-08 02:00', estArrival: '2026-10-08 09:30', priority: 'Normal', gatePass: 'GP-99129' },
  { id: 'DSP-507', tripId: 'TRP-8023', route: 'Kandla Terminal ➔ Ludhiana Dry Port', vehicle: 'PB-10-CZ-2201', driver: 'Gurpreet Brar', stage: 'Arrived Destination', scheduledDeparture: '2026-10-05 10:00', estArrival: '2026-10-07 08:00', priority: 'High', gatePass: 'GP-99115' },
];

const DispatchManagementModule = ({ onNotify }) => {
  const [dispatches, setDispatches] = useState(INITIAL_DISPATCHES);
  const [activeStage, setActiveStage] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = dispatches.filter((d) => {
    const matchStage = activeStage === 'All' || d.stage === activeStage;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      d.id.toLowerCase().includes(q) ||
      d.tripId.toLowerCase().includes(q) ||
      d.route.toLowerCase().includes(q) ||
      d.driver.toLowerCase().includes(q) ||
      d.vehicle.toLowerCase().includes(q);
    return matchStage && matchSearch;
  });

  const handleAdvanceStage = (id, newStage) => {
    setDispatches(
      dispatches.map((d) => (d.id === id ? { ...d, stage: newStage } : d))
    );
    onNotify && onNotify(`Dispatch ${id} transitioned to stage: ${newStage}`);
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
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase' }}>
            Operations Scheduling
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px' }}>
            Dispatch Management & Movement Board
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
            Organize dispatch details, convoy schedules, departure authorizations and assigned vehicle movements.
          </p>
        </div>
      </div>

      {/* Stage Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {[
          { label: 'STAGED FOR LOADING', count: 2, color: '#d97706', bg: '#fef3c7' },
          { label: 'IN TRANSIT / RUNNING', count: 15, color: '#0284c7', bg: '#e0f2fe' },
          { label: 'HELD AT BORDER / TOLL', count: 2, color: '#dc2626', bg: '#fee2e2' },
          { label: 'ARRIVED DESTINATION', count: 6, color: '#15803d', bg: '#dcfce7' },
        ].map((s) => (
          <div
            key={s.label}
            className="card"
            style={{ padding: '18px', cursor: 'pointer' }}
            onClick={() => setActiveStage(s.label.split(' ')[0] === 'IN' ? 'In Transit' : s.label.split(' ')[0] === 'STAGED' ? 'Staged for Loading' : 'All')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b' }}>{s.label}</span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: s.color }} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{s.count}</div>
          </div>
        ))}
      </div>

      {/* Dispatch Movement Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            background: '#fafafa',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Stage Filter:</span>
            {['All', 'Staged for Loading', 'In Transit', 'Held at Border', 'Arrived Destination'].map((stg) => (
              <button
                key={stg}
                type="button"
                onClick={() => setActiveStage(stg)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: activeStage === stg ? '1px solid #0d9488' : '1px solid #cbd5e1',
                  background: activeStage === stg ? '#ccfbf1' : '#ffffff',
                  color: activeStage === stg ? '#0f766e' : '#475569',
                  cursor: 'pointer',
                }}
              >
                {stg}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '8px', top: '9px' }} />
            <input
              type="text"
              placeholder="Search dispatch, driver..."
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
                <th>Dispatch ID</th>
                <th>Trip ID & GatePass</th>
                <th>Corridor Route</th>
                <th>Assigned Unit & Driver</th>
                <th>Departure Time</th>
                <th>Est. Arrival</th>
                <th>Movement Stage</th>
                <th style={{ textAlign: 'right' }}>Advance Movement</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((dsp) => (
                <tr key={dsp.id}>
                  <td>
                    <strong style={{ color: '#0f172a' }}>{dsp.id}</strong>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0284c7' }}>{dsp.tripId}</div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Pass: {dsp.gatePass}</span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#1e293b' }}>{dsp.route}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#334155' }}>{dsp.vehicle}</div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{dsp.driver}</span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{dsp.scheduledDeparture}</td>
                  <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{dsp.estArrival}</td>
                  <td>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        background:
                          dsp.stage === 'In Transit'
                            ? '#e0f2fe'
                            : dsp.stage === 'Held at Border'
                            ? '#fee2e2'
                            : dsp.stage === 'Arrived Destination'
                            ? '#dcfce7'
                            : '#fef3c7',
                        color:
                          dsp.stage === 'In Transit'
                            ? '#0369a1'
                            : dsp.stage === 'Held at Border'
                            ? '#b91c1c'
                            : dsp.stage === 'Arrived Destination'
                            ? '#15803d'
                            : '#b45309',
                      }}
                    >
                      {dsp.stage}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {dsp.stage === 'Staged for Loading' && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStage(dsp.id, 'In Transit')}
                        style={{ padding: '5px 12px', background: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Authorize Departure
                      </button>
                    )}
                    {dsp.stage === 'In Transit' && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStage(dsp.id, 'Arrived Destination')}
                        style={{ padding: '5px 12px', background: '#16a34a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Mark Arrived
                      </button>
                    )}
                    {dsp.stage === 'Held at Border' && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStage(dsp.id, 'In Transit')}
                        style={{ padding: '5px 12px', background: '#d97706', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Clear Checkpoint
                      </button>
                    )}
                    {dsp.stage === 'Arrived Destination' && (
                      <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>Delivered</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DispatchManagementModule;
