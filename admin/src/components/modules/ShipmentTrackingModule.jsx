import React, { useState } from 'react';
import {
  Package,
  Search,
  CheckCircle,
  Clock,
  MapPin,
  FileText,
  User,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const SHIPMENTS = [
  {
    waybill: 'WB-994012',
    tripId: 'TRP-8001',
    shipper: 'Tata Motors Component Logistics',
    consignee: 'Maruti Suzuki Assembly Yard, Manesar',
    cargo: 'Gearbox & Transmission Assemblies (22.5T)',
    currentLocation: 'NH-48 Jaipur Bypass (KM 248)',
    status: 'In Transit',
    progress: 74,
    eta: 'Today, 21:30',
    milestones: [
      { step: 'Waybill & E-Waybill Generated', time: 'Oct 06, 04:30', done: true },
      { step: 'Origin Gate-Out (JNPT Terminal 3)', time: 'Oct 06, 06:15', done: true },
      { step: 'Surat Toll Plaza Verified', time: 'Oct 06, 14:20', done: true },
      { step: 'Kishangarh Logistics Inspection', time: 'Oct 07, 08:45', done: true },
      { step: 'Destination Delivery & Electronic POD', time: 'Pending (~21:30)', done: false },
    ],
  },
  {
    waybill: 'WB-994013',
    tripId: 'TRP-8002',
    shipper: 'Foxconn Electronic Components',
    consignee: 'Dell International Logistics, Bengaluru',
    cargo: 'Microcontrollers & SMD Reels (14.2T)',
    currentLocation: 'Hosur Road Electronic City Flyover',
    status: 'Near Destination',
    progress: 92,
    eta: 'Today, 14:15',
    milestones: [
      { step: 'Waybill & E-Waybill Generated', time: 'Oct 07, 03:00', done: true },
      { step: 'Origin Gate-Out (Chennai Port)', time: 'Oct 07, 04:30', done: true },
      { step: 'Ranipet Toll Checkpoint', time: 'Oct 07, 08:10', done: true },
      { step: 'Krishnagiri Highway Hub', time: 'Oct 07, 11:30', done: true },
      { step: 'Destination Delivery & Electronic POD', time: 'Pending (~14:15)', done: false },
    ],
  },
  {
    waybill: 'WB-994014',
    tripId: 'TRP-8006',
    shipper: 'Serum Institute Cold Chain',
    consignee: 'Bharat Biotech Distribution Center, Hyderabad',
    cargo: 'Reefer Cold Storage Vaccines (6.8T • 4.0°C)',
    currentLocation: 'Nagpur Air Cargo Transit Facility',
    status: 'Delayed (Slot Reschedule)',
    progress: 45,
    eta: 'Tomorrow, 06:00',
    milestones: [
      { step: 'Waybill & E-Waybill Generated', time: 'Oct 06, 20:00', done: true },
      { step: 'Origin Gate-Out (Delhi IGI Cargo)', time: 'Oct 06, 22:30', done: true },
      { step: 'Enroute Cold-Chain Telemetry Check', time: 'Oct 07, 04:15', done: true },
      { step: 'Hyderabad Apron Ramp Discharge', time: 'Pending (Delayed +3h)', done: false },
      { step: 'Destination Delivery & Electronic POD', time: 'Pending', done: false },
    ],
  },
];

const ShipmentTrackingModule = ({ onNotify }) => {
  const [selectedWaybill, setSelectedWaybill] = useState(SHIPMENTS[0]);
  const [search, setSearch] = useState('');

  const filtered = SHIPMENTS.filter(
    (s) =>
      s.waybill.toLowerCase().includes(search.toLowerCase()) ||
      s.shipper.toLowerCase().includes(search.toLowerCase()) ||
      s.tripId.toLowerCase().includes(search.toLowerCase())
  );

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
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>
            Consignment Visibility
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px' }}>
            Shipment Milestone & Delivery Tracker
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
            Track active shipments, gate checkpoints, toll milestones, and electronic proof-of-delivery (e-POD).
          </p>
        </div>
      </div>

      {/* 2 Column: Shipment List & Milestone Visualizer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Left: Active Shipment Roster */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>Active Consignment Waybills</strong>
            <div style={{ position: 'relative', width: '200px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '8px', top: '9px' }} />
              <input
                type="text"
                placeholder="Search waybill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '6px 10px 6px 28px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map((s) => (
              <div
                key={s.waybill}
                onClick={() => setSelectedWaybill(s)}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: selectedWaybill.waybill === s.waybill ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  background: selectedWaybill.waybill === s.waybill ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{s.waybill}</strong>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: s.status.includes('Delayed') ? '#dc2626' : '#2563eb' }}>
                    {s.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '6px' }}>{s.cargo}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b' }}>
                  <span>Trip: <strong>{s.tripId}</strong></span>
                  <span>ETA: <strong>{s.eta}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Detailed Milestone Timeline */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>
                Live Waybill Telemetry
              </span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '2px 0' }}>
                {selectedWaybill.waybill} • {selectedWaybill.tripId}
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                Shipper: {selectedWaybill.shipper}
              </p>
            </div>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: '#dbeafe',
                color: '#1d4ed8',
              }}
            >
              {selectedWaybill.progress}% Completed
            </span>
          </div>

          <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>
              <MapPin size={16} color="#2563eb" />
              <span>Current GPS Location: {selectedWaybill.currentLocation}</span>
            </div>
          </div>

          {/* Stepper Milestones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {selectedWaybill.milestones.map((m, idx) => (
              <div key={m.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: m.done ? '#22c55e' : '#e2e8f0',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {m.done ? <CheckCircle size={15} /> : idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.85rem', color: m.done ? '#0f172a' : '#64748b' }}>
                      {m.step}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{m.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '20px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Consignee: <strong style={{ color: '#0f172a' }}>{selectedWaybill.consignee}</strong>
            </span>
            <button
              type="button"
              onClick={() => onNotify && onNotify(`Electronic Proof of Delivery dispatched for ${selectedWaybill.waybill}`)}
              style={{
                padding: '7px 14px',
                background: '#2563eb',
                color: '#ffffff',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Verify POD Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTrackingModule;
