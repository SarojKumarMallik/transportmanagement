import React, { useState } from 'react';
import {
  Wrench,
  CheckSquare,
  AlertTriangle,
  PlusCircle,
  Search,
  CheckCircle,
  Calendar,
} from 'lucide-react';

const MAINTENANCE_SCHEDULES = [
  { id: 'MNT-401', vehicle: 'MH-12-QE-4519', type: 'Hydraulic Brake Pads & Drum', dueKm: 70000, currentKm: 67900, status: 'Inspection Due in 2,100km', priority: 'Medium', workshop: 'Authorized Ashok Leyland Workshop, Pune', cost: 18400 },
  { id: 'MNT-402', vehicle: 'OD-02-KL-4491', type: 'Clutch Plate & Flywheel Assembly', dueKm: 95000, currentKm: 96210, status: 'Overdue by 1,210km', priority: 'Urgent', workshop: 'Tata Commercial Service, Sambalpur', cost: 34500 },
  { id: 'MNT-403', vehicle: 'MH-04-GP-8821', type: 'Engine Oil & Micro-Filter Change', dueKm: 120000, currentKm: 114820, status: 'Scheduled (Nov 15)', priority: 'Normal', workshop: 'Volvo Truck Center, Thane', cost: 26000 },
  { id: 'MNT-404', vehicle: 'GJ-12-AZ-9932', type: 'Front Axle All-Wheel Alignment', dueKm: 135000, currentKm: 132400, status: 'Inspection Due in 2,600km', priority: 'Normal', workshop: 'BharatBenz Dealership, Ahmedabad', cost: 8200 },
];

const INSPECTION_CHECKLIST = [
  { item: 'Dual-circuit Pneumatic Air Brakes Pressure (>8.5 Bar)', category: 'Safety Critical', passed: true },
  { item: 'Tyre Tread Depth (>4.5mm across all 10 tyres)', category: 'Safety Critical', passed: true },
  { item: 'Automated Speed Governor (80 km/h Calibration Valid)', category: 'Regulatory Compliance', passed: true },
  { item: 'GPS Tracking Telematics & SOS Emergency Switch', category: 'Electrical & Telematics', passed: true },
  { item: 'Pollution Under Control (PUC) Certificate Valid', category: 'Regulatory Compliance', passed: true },
  { item: 'First-Aid Kit & 2x 6kg ABC Fire Extinguishers Present', category: 'Emergency Equipment', passed: true },
];

const MaintenanceInspectionModule = ({ onNotify }) => {
  const [schedules, setSchedules] = useState(MAINTENANCE_SCHEDULES);
  const [checklist, setChecklist] = useState(INSPECTION_CHECKLIST);

  const toggleCheck = (idx) => {
    const updated = [...checklist];
    updated[idx].passed = !updated[idx].passed;
    setChecklist(updated);
    onNotify && onNotify(`Inspection item updated: ${updated[idx].item}`);
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
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase' }}>
            Preventive Health & Regulatory Compliance
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px' }}>
            Maintenance & Pre-Trip Inspection Control
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
            Organize scheduled workshop maintenance, preventive spare-part replacements and pre-dispatch inspection protocols.
          </p>
        </div>
      </div>

      {/* 2 Columns: Scheduled Services & Inspection Protocol */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Maintenance Schedules Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
            <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Upcoming Vehicle Service Schedules</strong>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Service ID & Unit</th>
                  <th>Maintenance Task</th>
                  <th>Service Status</th>
                  <th>Est. Cost</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <strong style={{ color: '#0f172a' }}>{s.id}</strong>
                      <div style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 600 }}>{s.vehicle}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{s.type}</div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{s.workshop}</span>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: s.priority === 'Urgent' ? '#fee2e2' : '#fef3c7',
                          color: s.priority === 'Urgent' ? '#b91c1c' : '#b45309',
                        }}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#0f172a', fontSize: '0.88rem' }}>
                        ₹{s.cost.toLocaleString('en-IN')}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6-Point Mandatory Pre-Dispatch Inspection Protocol */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Pre-Dispatch Vehicle Inspection Protocol</strong>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0' }}>
                Mandatory checklist verified prior to granting highway gate pass.
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d', background: '#dcfce7', padding: '4px 10px', borderRadius: '6px' }}>
              6/6 Verified
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {checklist.map((item, idx) => (
              <div
                key={item.item}
                onClick={() => toggleCheck(idx)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: item.passed ? '#f0fdf4' : '#fff5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: item.passed ? '#0f172a' : '#b91c1c' }}>
                    {item.item}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.category}</span>
                </div>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: item.passed ? '#16a34a' : '#dc2626',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceInspectionModule;
