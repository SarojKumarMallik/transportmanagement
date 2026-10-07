import React, { useState } from 'react';
import {
  Users,
  Truck,
  ShieldCheck,
  Search,
  PlusCircle,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

const FLEET_UNITS = [
  { plate: 'MH-04-GP-8821', model: 'Volvo FH16 (4x2)', type: 'Heavy Commercial', capacity: '32 Tons', status: 'In Transit', driver: 'Vikram Singh', odo: 114820, fitnessDue: '2027-04-12', insuranceDue: '2027-02-15' },
  { plate: 'TN-09-CB-1240', model: 'Tata Signa 4825.T', type: 'Multi-Axle Rigid', capacity: '28 Tons', status: 'In Transit', driver: 'S. Ramachandran', odo: 84310, fitnessDue: '2027-06-20', insuranceDue: '2027-05-10' },
  { plate: 'GJ-12-AZ-9932', model: 'BharatBenz 3528C', type: 'Heavy Haulage', capacity: '26 Tons', status: 'In Transit', driver: 'Hardeep Gill', odo: 132400, fitnessDue: '2026-12-05', insuranceDue: '2026-11-28' },
  { plate: 'MH-12-QE-4519', model: 'Ashok Leyland 4220', type: 'Trailer Unit', capacity: '30 Tons', status: 'In Transit', driver: 'Manoj Jadhav', odo: 67900, fitnessDue: '2027-08-14', insuranceDue: '2027-07-01' },
  { plate: 'OD-02-KL-4491', model: 'Tata Prima 4928.S', type: 'Heavy Tractor', capacity: '35 Tons', status: 'Workshop Bay', driver: 'Bikram Mohanty', odo: 96210, fitnessDue: '2026-10-25', insuranceDue: '2026-11-04' },
  { plate: 'PB-10-CZ-2201', model: 'Volvo FH 500', type: 'Long Haul Semi', capacity: '34 Tons', status: 'Dock Standby', driver: 'Gurpreet Brar', odo: 142100, fitnessDue: '2027-01-18', insuranceDue: '2027-03-22' },
];

const DRIVERS = [
  { id: 'DRV-101', name: 'Vikram Singh', phone: '+91 98201 44102', license: 'MH042014008912', class: 'Heavy Motor Vehicle (HMV)', expYears: 14, hoursToday: 6.5, rating: '4.9 / 5.0', status: 'On Route' },
  { id: 'DRV-102', name: 'S. Ramachandran', phone: '+91 94441 33291', license: 'TN092012004419', class: 'HMV + Hazardous Cargo', expYears: 18, hoursToday: 7.0, rating: '4.8 / 5.0', status: 'On Route' },
  { id: 'DRV-103', name: 'Hardeep Gill', phone: '+91 98112 55901', license: 'GJ122016007781', class: 'Heavy Goods Transport', expYears: 11, hoursToday: 8.2, rating: '4.7 / 5.0', status: 'Rest Due' },
  { id: 'DRV-104', name: 'Manoj Jadhav', phone: '+91 98230 77412', license: 'MH122015003310', class: 'Heavy Commercial Vehicle', expYears: 9, hoursToday: 3.5, rating: '4.9 / 5.0', status: 'On Route' },
  { id: 'DRV-105', name: 'Gurpreet Brar', phone: '+91 98720 11984', license: 'PB102010009941', class: 'HMV + Interstate Permit', expYears: 16, hoursToday: 0.0, rating: '4.9 / 5.0', status: 'Available' },
];

const FleetDriverTrackingModule = ({ onNotify }) => {
  const [activeTab, setActiveTab] = useState('fleet'); // 'fleet' | 'drivers'
  const [search, setSearch] = useState('');

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
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' }}>
            Asset & Human Resource Roster
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px' }}>
            Fleet Vehicles & Driver Directory
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
            Maintain commercial vehicle inventory, driver licensing, duty limits, safety compliance and live assignments.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('fleet')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: activeTab === 'fleet' ? '1px solid #dc2626' : '1px solid #cbd5e1',
              background: activeTab === 'fleet' ? '#fee2e2' : '#ffffff',
              color: activeTab === 'fleet' ? '#b91c1c' : '#475569',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
            }}
          >
            Commercial Fleet (52)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('drivers')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: activeTab === 'drivers' ? '1px solid #dc2626' : '1px solid #cbd5e1',
              background: activeTab === 'drivers' ? '#fee2e2' : '#ffffff',
              color: activeTab === 'drivers' ? '#b91c1c' : '#475569',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
            }}
          >
            Authorized Drivers (48)
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' }}>
          <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>
            {activeTab === 'fleet' ? 'Registered Commercial Fleet Units' : 'Licensed Fleet Drivers Roster'}
          </strong>
          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '8px', top: '9px' }} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '6px 10px 6px 28px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
            />
          </div>
        </div>

        <div className="table-container">
          {activeTab === 'fleet' ? (
            <table>
              <thead>
                <tr>
                  <th>Vehicle Number</th>
                  <th>Make & Model</th>
                  <th>Payload Capacity</th>
                  <th>Assigned Driver</th>
                  <th>Odometer (KM)</th>
                  <th>Fitness Expiry</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {FLEET_UNITS.filter((f) => f.plate.toLowerCase().includes(search.toLowerCase()) || f.model.toLowerCase().includes(search.toLowerCase())).map((f) => (
                  <tr key={f.plate}>
                    <td>
                      <strong style={{ color: '#0f172a' }}>{f.plate}</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{f.model}</div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{f.type}</span>
                    </td>
                    <td style={{ color: '#475569' }}>{f.capacity}</td>
                    <td style={{ color: '#0284c7', fontWeight: 600 }}>{f.driver}</td>
                    <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{f.odo.toLocaleString()} km</td>
                    <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{f.fitnessDue}</td>
                    <td>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: f.status === 'In Transit' ? '#dcfce7' : f.status === 'Workshop Bay' ? '#fee2e2' : '#f1f5f9',
                          color: f.status === 'In Transit' ? '#15803d' : f.status === 'Workshop Bay' ? '#b91c1c' : '#475569',
                        }}
                      >
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Driver Name</th>
                  <th>License Number</th>
                  <th>License Class</th>
                  <th>Contact Mobile</th>
                  <th>Experience</th>
                  <th>Driving Today</th>
                  <th>Safety Score</th>
                  <th>Duty Status</th>
                </tr>
              </thead>
              <tbody>
                {DRIVERS.filter((d) => d.name.toLowerCase().includes(search.toLowerCase())).map((d) => (
                  <tr key={d.id}>
                    <td>
                      <strong style={{ color: '#0f172a' }}>{d.name}</strong>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{d.license}</td>
                    <td style={{ fontSize: '0.82rem', color: '#334155' }}>{d.class}</td>
                    <td>
                      <a href={`tel:${d.phone}`} style={{ color: '#0284c7', fontSize: '0.82rem' }}>{d.phone}</a>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{d.expYears} yrs</td>
                    <td>
                      <strong style={{ color: d.hoursToday > 8.0 ? '#dc2626' : '#0f172a' }}>
                        {d.hoursToday} hrs
                      </strong>
                    </td>
                    <td style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.84rem' }}>{d.rating}</td>
                    <td>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: d.status === 'On Route' ? '#dcfce7' : d.status === 'Rest Due' ? '#fee2e2' : '#e0f2fe',
                          color: d.status === 'On Route' ? '#15803d' : d.status === 'Rest Due' ? '#b91c1c' : '#0369a1',
                        }}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FleetDriverTrackingModule;
