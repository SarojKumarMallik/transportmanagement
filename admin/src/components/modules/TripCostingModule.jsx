import React, { useState } from 'react';
import {
  DollarSign,
  PlusCircle,
  Download,
  Filter,
  Search,
  CheckCircle,
  FileText,
  CreditCard,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

const INITIAL_EXPENSES = [
  { id: 'EXP-101', tripId: 'TRP-8001', category: 'En-route Toll & FASTag', amount: 4850, vehicle: 'MH-04-GP-8821', driver: 'Vikram Singh', date: '2026-10-06', status: 'Approved', receipt: 'INV-4401.pdf', payment: 'Corporate FASTag' },
  { id: 'EXP-102', tripId: 'TRP-8001', category: 'Driver Daily Batta', amount: 3200, vehicle: 'MH-04-GP-8821', driver: 'Vikram Singh', date: '2026-10-06', status: 'Approved', receipt: 'VCH-981.pdf', payment: 'Direct Bank Transfer' },
  { id: 'EXP-103', tripId: 'TRP-8002', category: 'Port Loading & Crane', amount: 8500, vehicle: 'TN-09-CB-1240', driver: 'S. Ramachandran', date: '2026-10-05', status: 'Approved', receipt: 'PRT-2201.pdf', payment: 'NEFT Corporate' },
  { id: 'EXP-104', tripId: 'TRP-8003', category: 'Emergency Tyre Puncture', amount: 1800, vehicle: 'GJ-12-AZ-9932', driver: 'Hardeep Gill', date: '2026-10-07', status: 'Pending Review', receipt: 'RCP-5509.jpg', payment: 'Petty Cash' },
  { id: 'EXP-105', tripId: 'TRP-8004', category: 'Rail Terminal Siding Fee', amount: 14200, vehicle: 'CONCOR Rake #992', driver: 'Arunav Banerjee', date: '2026-10-06', status: 'Approved', receipt: 'RRL-8821.pdf', payment: 'Rail E-Pay' },
  { id: 'EXP-106', tripId: 'TRP-8005', category: 'State Border Green Tax', amount: 2400, vehicle: 'MH-12-QE-4519', driver: 'Manoj Jadhav', date: '2026-10-06', status: 'Approved', receipt: 'TAX-1102.pdf', payment: 'Online Challan' },
  { id: 'EXP-107', tripId: 'TRP-8006', category: 'Cold Storage Nitrogen Top-up', amount: 6200, vehicle: 'Logistics Air B777-F', driver: 'Capt. Neha Rao', date: '2026-10-07', status: 'Approved', receipt: 'AIR-3301.pdf', payment: 'Aviation Card' },
];

const TripCostingModule = ({ onNotify }) => {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = expenses.filter((e) => {
    const matchCat = categoryFilter === 'All' || e.category === categoryFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      e.tripId.toLowerCase().includes(q) ||
      e.driver.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.vehicle.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEntry = {
      id: `EXP-${100 + expenses.length + 1}`,
      tripId: form.tripId.value || 'TRP-8001',
      category: form.category.value || 'En-route Toll & FASTag',
      amount: Number(form.amount.value) || 2500,
      vehicle: form.vehicle.value || 'MH-04-GP-8821',
      driver: form.driver.value || 'Vikram Singh',
      date: new Date().toISOString().slice(0, 10),
      status: 'Approved',
      receipt: 'Uploaded.pdf',
      payment: form.payment.value || 'Corporate FASTag',
    };
    setExpenses([newEntry, ...expenses]);
    setShowAddModal(false);
    onNotify && onNotify(`Trip cost record ${newEntry.id} logged successfully.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Module Overview Header */}
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
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
            Financial Records
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px' }}>
            Trip Costing & Transport Expense Ledger
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
            Organize trip-related costs, en-route disbursements, toll logs, and transport expense records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          style={{
            background: '#0284c7',
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
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
          }}
        >
          <PlusCircle size={16} /> Log Trip Cost
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>TOTAL LOGGED DISBURSEMENTS</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
            ₹{totalExpense.toLocaleString('en-IN')}
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>Across {expenses.length} expense vouchers</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>AVERAGE TRIP OVERHEAD</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
            ₹{Math.round(totalExpense / expenses.length).toLocaleString('en-IN')}
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Includes tolls, batta & loading</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>PENDING REVIEWS</span>
          <h4 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706', margin: '6px 0 2px' }}>1 Voucher</h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Tyre puncture claim in review</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>PRIMARY COST CENTER</span>
          <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '10px 0 2px' }}>Tolls & FASTag</h4>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>38.4% of non-fuel expenditure</span>
        </div>
      </div>

      {/* Expense Records Table */}
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
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Category:</span>
            {['All', 'En-route Toll & FASTag', 'Driver Daily Batta', 'Port Loading & Crane'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: categoryFilter === cat ? '1px solid #0284c7' : '1px solid #cbd5e1',
                  background: categoryFilter === cat ? '#e0f2fe' : '#ffffff',
                  color: categoryFilter === cat ? '#0369a1' : '#475569',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '9px' }} />
            <input
              type="text"
              placeholder="Search by Trip ID, driver, vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 12px 7px 32px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.84rem',
              }}
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Voucher ID</th>
                <th>Trip ID</th>
                <th>Cost Category</th>
                <th>Vehicle & Driver</th>
                <th>Date</th>
                <th>Amount (INR)</th>
                <th>Payment Channel</th>
                <th>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong style={{ color: '#0f172a' }}>{item.id}</strong>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#0284c7' }}>{item.tripId}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{item.category}</div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Receipt: {item.receipt}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#334155' }}>{item.vehicle}</div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.driver}</span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.date}</td>
                  <td>
                    <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                      ₹{item.amount.toLocaleString('en-IN')}
                    </strong>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#475569' }}>{item.payment}</td>
                  <td>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: item.status === 'Approved' ? '#dcfce7' : '#fef3c7',
                        color: item.status === 'Approved' ? '#15803d' : '#b45309',
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Cost */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '480px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
              Log Trip Expense Voucher
            </h3>
            <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Trip ID
                </label>
                <input name="tripId" defaultValue="TRP-8001" required style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Cost Category
                </label>
                <select name="category" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <option value="En-route Toll & FASTag">En-route Toll & FASTag</option>
                  <option value="Driver Daily Batta">Driver Daily Batta</option>
                  <option value="Port Loading & Crane">Port Loading & Crane</option>
                  <option value="State Border Green Tax">State Border Green Tax</option>
                  <option value="Emergency Tyre Puncture">Emergency Tyre Puncture</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Amount (₹)
                  </label>
                  <input type="number" name="amount" defaultValue={3500} required style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Payment Mode
                  </label>
                  <input name="payment" defaultValue="Corporate FASTag" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Vehicle
                  </label>
                  <input name="vehicle" defaultValue="MH-04-GP-8821" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Driver Name
                  </label>
                  <input name="driver" defaultValue="Vikram Singh" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 600 }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#0284c7', color: '#ffffff', fontWeight: 700 }}>
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCostingModule;
