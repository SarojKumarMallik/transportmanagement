import React, { useState, useEffect } from 'react';
import { Search, UserCheck, UserX, Shield, RefreshCw } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import api from '../services/api';

const UsersManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      if (res.data && res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      await api.put(`/admin/users/${user._id}`, { isActive: !user.isActive });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminHeader
        title="User & Access Management"
        subtitle="Manage registered customers, guide permissions, and admin roles"
        actionButton={
          <button onClick={fetchUsers} className="btn-outline">
            <RefreshCw size={16} /> Refresh
          </button>
        }
      />

      <div className="admin-content">
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
              placeholder="Search user by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', border: 'none', fontSize: '0.9rem' }}
            />
          </div>
          <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>
            {filteredUsers.length} total registered accounts
          </span>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                      Loading accounts...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                      No accounts found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                            alt={u.name}
                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block' }}>
                              {u.name}
                            </strong>
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            background: u.role === 'admin' ? '#eef2ff' : '#f8fafc',
                            color: u.role === 'admin' ? '#4f46e5' : '#475569',
                          }}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="guide">Guide</option>
                        </select>
                      </td>
                      <td>
                        <span className={`status-badge status-${u.isActive ? 'active' : 'inactive'}`}>
                          {u.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleToggleStatus(u)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: u.isActive ? '#fee2e2' : '#dcfce7',
                            color: u.isActive ? '#dc2626' : '#15803d',
                          }}
                        >
                          {u.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagementPage;
