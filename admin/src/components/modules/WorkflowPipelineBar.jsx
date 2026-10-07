import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Fuel,
  Send,
  Package,
  Users,
  Wrench,
  BarChart3,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export const WORKFLOW_MODULES = [
  {
    id: 'trip-costing',
    number: '1',
    name: 'Trip Costing',
    category: 'Costing',
    description: 'Organize trip-related costs and transport expense records.',
    icon: DollarSign,
    color: '#0284c7',
  },
  {
    id: 'freight-route',
    number: '2',
    name: 'Freight & Route Costing',
    category: 'Costing',
    description: 'Maintain freight rates, route costs and shipment calculations.',
    icon: TrendingUp,
    color: '#d97706',
  },
  {
    id: 'fuel-vehicle',
    number: '3',
    name: 'Fuel & Vehicle Costing',
    category: 'Costing',
    description: 'Record fuel, mileage and vehicle operating-cost data.',
    icon: Fuel,
    color: '#7c3aed',
  },
  {
    id: 'dispatch',
    number: '4',
    name: 'Dispatch Management',
    category: 'Dispatch',
    description: 'Organize dispatch details, schedules and assigned movements.',
    icon: Send,
    color: '#0d9488',
  },
  {
    id: 'shipments',
    number: '5',
    name: 'Shipment Tracking',
    category: 'Tracking',
    description: 'Track shipment status, milestones and delivery progress.',
    icon: Package,
    color: '#2563eb',
  },
  {
    id: 'fleet-drivers',
    number: '6',
    name: 'Fleet & Driver Tracking',
    category: 'Tracking',
    description: 'Maintain vehicle, driver and assignment records.',
    icon: Users,
    color: '#dc2626',
  },
  {
    id: 'maintenance',
    number: '7',
    name: 'Maintenance & Inspection',
    category: 'Control',
    description: 'Organize maintenance schedules and vehicle inspection logs.',
    icon: Wrench,
    color: '#ea580c',
  },
  {
    id: 'delivery-operations',
    number: '8',
    name: 'Delivery & Operations Control',
    category: 'Control',
    description: 'Review delivery status, expenses and estimated-vs-actual variance.',
    icon: BarChart3,
    color: '#16a34a',
  },
];

const WorkflowPipelineBar = ({ activeModule, onSelectModule }) => {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Title & Core Proposition */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#0284c7',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              display: 'inline-block',
              marginBottom: '4px',
            }}
          >
            Integrated 8-Stage Operations Flow
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', margin: 0 }}>
            Calculate Trip Costs First — Then Track Dispatch, Shipments, Fleet, Drivers & Deliveries
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px', maxWidth: '820px' }}>
            The Transport Costing, Dispatch & Operations Control Toolkit brings transport costing and day-to-day operations tracking into one practical workflow.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.76rem',
              fontWeight: 700,
              color: '#15803d',
              background: '#dcfce7',
              padding: '6px 14px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle size={14} color="#15803d" />
            1 Unified Toolkit
          </span>
        </div>
      </div>

      {/* 8-Step Interactive Grid / Stepper */}
      <div
        className="workflow-pipeline-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
        }}
      >
        {WORKFLOW_MODULES.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onSelectModule(mod.id)}
              style={{
                textAlign: 'left',
                padding: '14px 16px',
                borderRadius: '14px',
                border: isActive ? `2px solid ${mod.color}` : '1px solid #e2e8f0',
                background: isActive ? '#f8fafc' : '#ffffff',
                boxShadow: isActive ? `0 4px 16px ${mod.color}25` : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'none';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: `${mod.color}15`,
                      color: mod.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#94a3b8',
                    letterSpacing: '0.5px',
                  }}
                >
                  {mod.category}
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '3px' }}>
                  {mod.name}
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.35, margin: 0 }}>
                  {mod.description}
                </p>
              </div>

              {isActive && (
                <div
                  style={{
                    marginTop: '8px',
                    paddingTop: '6px',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: mod.color,
                  }}
                >
                  <span>Active Workspace</span>
                  <ArrowRight size={12} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowPipelineBar;
