import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Download,
  Filter,
} from 'lucide-react';

const VARIANCE_RECORDS = [
  { tripId: 'TRP-7988', route: 'JNPT Port ➔ Gurgaon ICD', estCost: 82000, actCost: 84650, costVar: '+₹2,650 (+3.2%)', estHours: 36.0, actHours: 38.5, timeVar: '+2.5h', estFuelL: 375, actFuelL: 390, fuelVar: '+15L', revenue: 185000, netMargin: 100350, marginPct: '54.2%', sla: 'On Time' },
  { tripId: 'TRP-7989', route: 'Chennai Harbor ➔ Bengaluru', estCost: 38500, actCost: 37900, costVar: '-₹600 (-1.6%)', estHours: 9.0, actHours: 8.8, timeVar: '-0.2h', estFuelL: 90, actFuelL: 88, fuelVar: '-2L', revenue: 92000, netMargin: 54100, marginPct: '58.8%', sla: 'On Time' },
  { tripId: 'TRP-7990', route: 'Mundra Port ➔ Baddi HP', estCost: 96000, actCost: 104200, costVar: '+₹8,200 (+8.5%)', estHours: 38.0, actHours: 44.0, timeVar: '+6.0h', estFuelL: 410, actFuelL: 450, fuelVar: '+40L', revenue: 215000, netMargin: 110800, marginPct: '51.5%', sla: 'Delayed' },
  { tripId: 'TRP-7991', route: 'Nhava Sheva ➔ Chakan Pune', estCost: 28000, actCost: 27800, costVar: '-₹200 (-0.7%)', estHours: 4.0, actHours: 4.2, timeVar: '+0.2h', estFuelL: 40, actFuelL: 39, fuelVar: '-1L', revenue: 78000, netMargin: 50200, marginPct: '64.4%', sla: 'On Time' },
  { tripId: 'TRP-7992', route: 'Kolkata Docks ➔ Varanasi Depot', estCost: 65000, actCost: 67200, costVar: '+₹2,200 (+3.4%)', estHours: 18.0, actHours: 19.5, timeVar: '+1.5h', estFuelL: 180, actFuelL: 188, fuelVar: '+8L', revenue: 145000, netMargin: 77800, marginPct: '53.7%', sla: 'On Time' },
  { tripId: 'TRP-7993', route: 'Delhi IGI Cargo ➔ Hyderabad', estCost: 165000, actCost: 172000, costVar: '+₹7,000 (+4.2%)', estHours: 6.0, actHours: 9.0, timeVar: '+3.0h', estFuelL: 1200, actFuelL: 1240, fuelVar: '+40L', revenue: 340000, netMargin: 168000, marginPct: '49.4%', sla: 'Delayed' },
];

const DeliveryOperationsControlModule = ({ onNotify }) => {
  const [records, setRecords] = useState(VARIANCE_RECORDS);

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
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>
            Post-Trip Audit & Operational Control
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px' }}>
            Delivery & Operations Control Variance Dashboard
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
            Review closed delivery status, operational expenses, and estimated-vs-actual variance records through structured dashboards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNotify && onNotify('Exported full Estimated-vs-Actual variance report')}
          style={{
            background: '#ffffff',
            color: '#334155',
            border: '1px solid #cbd5e1',
            padding: '9px 18px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.88rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <Download size={16} /> Export Variance Audit
        </button>
      </div>

      {/* KPI Variance Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>ON-TIME DELIVERY SLA</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#15803d', margin: '6px 0 2px' }}>
            94.2%
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Benchmark standard: 92.0%</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>COST ESTIMATE ACCURACY</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
            97.1%
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>Avg variance only +2.9%</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>NET REVENUE REALIZATION</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0284c7', margin: '6px 0 2px' }}>
            53.6%
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Operating gross profit margin</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>AVERAGE TRANSIT SLIPPAGE</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706', margin: '6px 0 2px' }}>
            +1.8 Hours
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Primary driver: NH toll congestion</span>
        </div>
      </div>

      {/* Structured Estimated-vs-Actual Variance Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
          <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>
            Estimated vs. Actual Operational Records
          </strong>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Trip ID & Route</th>
                <th>Est. Cost</th>
                <th>Actual Cost</th>
                <th>Cost Variance</th>
                <th>Est. Transit</th>
                <th>Actual Transit</th>
                <th>Billed Revenue</th>
                <th>Realized Margin</th>
                <th>SLA Compliance</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.tripId}>
                  <td>
                    <strong style={{ color: '#0f172a' }}>{r.tripId}</strong>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{r.route}</div>
                  </td>
                  <td style={{ fontSize: '0.84rem', color: '#64748b' }}>₹{r.estCost.toLocaleString('en-IN')}</td>
                  <td style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>
                    ₹{r.actCost.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        background: r.costVar.startsWith('+') ? '#fef3c7' : '#dcfce7',
                        color: r.costVar.startsWith('+') ? '#b45309' : '#15803d',
                      }}
                    >
                      {r.costVar}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{r.estHours} hrs</td>
                  <td>
                    <strong style={{ fontSize: '0.84rem', color: r.actHours > r.estHours ? '#dc2626' : '#16a34a' }}>
                      {r.actHours} hrs
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginLeft: '4px' }}>({r.timeVar})</span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>
                      ₹{r.revenue.toLocaleString('en-IN')}
                    </strong>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.88rem' }}>
                      ₹{r.netMargin.toLocaleString('en-IN')}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{r.marginPct} Margin</span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: r.sla === 'On Time' ? '#dcfce7' : '#fee2e2',
                        color: r.sla === 'On Time' ? '#15803d' : '#b91c1c',
                      }}
                    >
                      {r.sla}
                    </span>
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

export default DeliveryOperationsControlModule;
