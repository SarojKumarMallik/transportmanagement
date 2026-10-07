import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Truck,
  Package,
  Route,
  UserCheck,
  Wrench,
  AlertCircle,
  CheckCircle,
  DollarSign,
  AlertTriangle,
  Clock,
  Fuel,
  Wallet,
  Receipt,
  ShieldCheck,
  Download,
  Printer,
  RotateCcw,
  Volume2,
  VolumeX,
  Search,
  Filter,
  PlusCircle,
  Eye,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  Radio,
  FileSpreadsheet,
  X,
  Check,
  Send,
  Navigation,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import WorkflowPipelineBar from '../components/modules/WorkflowPipelineBar';
import TripCostingModule from '../components/modules/TripCostingModule';
import FreightRouteCostingModule from '../components/modules/FreightRouteCostingModule';
import FuelVehicleCostingModule from '../components/modules/FuelVehicleCostingModule';
import DispatchManagementModule from '../components/modules/DispatchManagementModule';
import ShipmentTrackingModule from '../components/modules/ShipmentTrackingModule';
import FleetDriverTrackingModule from '../components/modules/FleetDriverTrackingModule';
import MaintenanceInspectionModule from '../components/modules/MaintenanceInspectionModule';
import DeliveryOperationsControlModule from '../components/modules/DeliveryOperationsControlModule';

// Initial Mock Dataset for 60 Trips
const INITIAL_TRIPS = [
  { id: 'TRP-8001', origin: 'JNPT Port, Mumbai', dest: 'Gurgaon ICD, NCR', mode: 'Road Freight', vehicle: 'MH-04-GP-8821 (Volvo FH16)', driver: 'Vikram Singh', phone: '+91 98201 44102', cargo: 'Automobile Components (22.5T)', freight: 185000, fuelCost: 52000, status: 'Running', progress: 68, eta: '4h 30m', priority: 'High' },
  { id: 'TRP-8002', origin: 'Chennai Harbor', dest: 'Whitefield Depot, Bengaluru', mode: 'Road Freight', vehicle: 'TN-09-CB-1240 (Tata Signa)', driver: 'S. Ramachandran', phone: '+91 94441 33291', cargo: 'Electronics & Chips (14.2T)', freight: 92000, fuelCost: 24500, status: 'Running', progress: 82, eta: '1h 45m', priority: 'Urgent' },
  { id: 'TRP-8003', origin: 'Mundra Port, Gujarat', dest: 'Baddi Industrial, HP', mode: 'Road Freight', vehicle: 'GJ-12-AZ-9932 (BharatBenz)', driver: 'Hardeep Gill', phone: '+91 98112 55901', cargo: 'Pharma Active Ingredients (18.0T)', freight: 215000, fuelCost: 61000, status: 'Delayed', progress: 45, eta: '+5h delay (NH-48 Fog)', priority: 'Urgent' },
  { id: 'TRP-8004', origin: 'Kolkata Kidderpore Docks', dest: 'Varanasi Logistics Park', mode: 'Rail Freight', vehicle: 'CONCOR Rake #992', driver: 'Arunav Banerjee', phone: '+91 97482 11094', cargo: 'Heavy Industrial Steel (38.0T)', freight: 290000, fuelCost: 72000, status: 'Running', progress: 54, eta: '6h 15m', priority: 'Normal' },
  { id: 'TRP-8005', origin: 'Nhava Sheva, Navi Mumbai', dest: 'Chakan Auto Hub, Pune', mode: 'Road Freight', vehicle: 'MH-12-QE-4519 (Ashok Leyland)', driver: 'Manoj Jadhav', phone: '+91 98230 77412', cargo: 'Stamping Machinery (24.0T)', freight: 78000, fuelCost: 19800, status: 'Running', progress: 74, eta: '2h 10m', priority: 'Normal' },
  { id: 'TRP-8006', origin: 'Delhi IGI Cargo Terminal', dest: 'Hyderabad Air Cargo', mode: 'Air Freight', vehicle: 'Logistics Air B777-F', driver: 'Capt. Neha Rao', phone: '+91 99801 88204', cargo: 'Cold-chain Vaccines (6.8T)', freight: 340000, fuelCost: 95000, status: 'Delayed', progress: 30, eta: '+3h (Slot reschedule)', priority: 'Urgent' },
  { id: 'TRP-8007', origin: 'Visakhapatnam Port', dest: 'Raipur Steel Cluster', mode: 'Road Freight', vehicle: 'AP-31-TD-5510 (Volvo FMX)', driver: 'K. Venkat Rao', phone: '+91 98480 66291', cargo: 'Coking Coal Consignment (32.0T)', freight: 145000, fuelCost: 41000, status: 'Running', progress: 61, eta: '5h 00m', priority: 'Normal' },
  { id: 'TRP-8008', origin: 'Cochin Vallarpadam ICTT', dest: 'Coimbatore Textile Park', mode: 'Road Freight', vehicle: 'KL-07-BZ-3392 (Eicher Pro)', driver: 'Jijo Varghese', phone: '+91 94471 22849', cargo: 'Export Raw Cotton (19.4T)', freight: 88000, fuelCost: 22000, status: 'Delayed', progress: 20, eta: '+4h (Walayar Pass Check)', priority: 'High' },
  { id: 'TRP-8009', origin: 'Dahej Chemical SEZ', dest: 'Vapi Industrial Estate', mode: 'Road Tanker', vehicle: 'GJ-16-XX-8402 (Hazchem Insulated)', driver: 'Pravin Patel', phone: '+91 98980 11472', cargo: 'Specialty Polymers (26.0T)', freight: 120000, fuelCost: 31000, status: 'Running', progress: 89, eta: '50m', priority: 'Urgent' },
  { id: 'TRP-80010', origin: 'Guwahati Freight Hub', dest: 'Siliguri Terminal', mode: 'Road Freight', vehicle: 'AS-01-EC-9041 (Tata Prima)', driver: 'Biren Barman', phone: '+91 94350 44810', cargo: 'Tea & FMCG Packets (16.2T)', freight: 135000, fuelCost: 38000, status: 'Delayed', progress: 35, eta: '+6h (Landslide bypass)', priority: 'High' },
  { id: 'TRP-8011', origin: 'Mumbai Air Cargo', dest: 'Bengaluru Cargo Village', mode: 'Air Freight', vehicle: 'Logistics Air B737-800', driver: 'Capt. R. Deshmukh', phone: '+91 98200 99410', cargo: 'High-Value Server Racks (4.5T)', freight: 260000, fuelCost: 68000, status: 'Running', progress: 92, eta: '25m', priority: 'Urgent' },
  { id: 'TRP-8012', origin: 'Pipavav Port', dest: 'Jaipur Logistics Yard', mode: 'Rail Freight', vehicle: 'Pipavav Dedicated #408', driver: 'Sukhvinder Mann', phone: '+91 98140 33190', cargo: 'Ceramics & Tiles (34.0T)', freight: 195000, fuelCost: 50000, status: 'Running', progress: 58, eta: '7h 20m', priority: 'Normal' },
  { id: 'TRP-8013', origin: 'Nagpur Multi-Modal Mihan', dest: 'Indore Dewas Hub', mode: 'Road Freight', vehicle: 'MH-31-AP-6612 (BharatBenz)', driver: 'Anil Kulkarni', phone: '+91 94221 66730', cargo: 'Agricultural Equipment (21.0T)', freight: 110000, fuelCost: 29500, status: 'Delayed', progress: 40, eta: '+2h 30m (Tire Replacement)', priority: 'Normal' },
  { id: 'TRP-8014', origin: 'Ennore Port, Chennai', dest: 'Hosur Manufacturing Corridor', mode: 'Road Freight', vehicle: 'TN-04-XY-7719 (Scania G410)', driver: 'M. Selvam', phone: '+91 98410 77319', cargo: 'EV Battery Cells (15.5T)', freight: 160000, fuelCost: 39000, status: 'Running', progress: 79, eta: '1h 30m', priority: 'Urgent' },
  { id: 'TRP-8015', origin: 'Kandla Cargo Terminal', dest: 'Ludhiana Dry Port', mode: 'Road Freight', vehicle: 'PB-10-CZ-2201 (Volvo FH16)', driver: 'Gurpreet Brar', phone: '+91 98720 11984', cargo: 'Imported Timber & Plywood (28.0T)', freight: 228000, fuelCost: 64000, status: 'Delayed', progress: 50, eta: '+4h 15m (RTO Weighbridge)', priority: 'High' },
  { id: 'TRP-8016', origin: 'Paradip Port, Odisha', dest: 'Jamshedpur Tata Works', mode: 'Road Freight', vehicle: 'OD-02-KL-4491 (Tata 4923)', driver: 'Bikram Mohanty', phone: '+91 94370 88201', cargo: 'Iron Ore Pellets (30.0T)', freight: 115000, fuelCost: 33000, status: 'Running', progress: 65, eta: '3h 40m', priority: 'Normal' },
  { id: 'TRP-8017', origin: 'Mangalore Port', dest: 'Mysuru Industrial Estate', mode: 'Road Freight', vehicle: 'KA-19-DF-8812 (Ashok Leyland)', driver: 'Dinesh Shetty', phone: '+91 98450 33812', cargo: 'Refined Petroleum Drums (20.0T)', freight: 95000, fuelCost: 26000, status: 'Delayed', progress: 28, eta: '+3h (Ghat hairpins slow)', priority: 'Normal' },
  { id: 'TRP-8018', origin: 'Surat Diamond Bourse', dest: 'Mumbai SEEPZ', mode: 'Armored Road Express', vehicle: 'MH-02-EQ-9900 (Secure Fleet)', driver: 'Omkar Salunkhe', phone: '+91 98205 11200', cargo: 'Secured Polished Gems (1.2T)', freight: 280000, fuelCost: 42000, status: 'Running', progress: 85, eta: '1h 10m', priority: 'Urgent' },
  { id: 'TRP-8019', origin: 'Tuticorin Port', dest: 'Madurai Distribution Hub', mode: 'Road Freight', vehicle: 'TN-69-AC-3104 (Eicher Pro)', driver: 'P. Murugan', phone: '+91 94430 55190', cargo: 'Processed Salt & Seafood (18.5T)', freight: 72000, fuelCost: 18500, status: 'Delayed', progress: 15, eta: '+2h 45m (Documentation)', priority: 'Normal' },
  { id: 'TRP-8020', origin: 'Bhiwandi Warehousing Hub', dest: 'Ahmedabad Ring Road Depot', mode: 'Road Freight', vehicle: 'MH-04-KU-5109 (Volvo FH)', driver: 'Sunil Chavan', phone: '+91 98209 88310', cargo: 'E-commerce FMCG Assortment (19.0T)', freight: 125000, fuelCost: 34000, status: 'Running', progress: 70, eta: '3h 15m', priority: 'Normal' },
];

// Operational Alerts dataset (30 alerts)
const OPERATIONAL_ALERTS = [
  { id: 'ALT-101', type: 'critical', title: 'Severe Fog & Highway Gridlock', route: 'Mundra ➔ Baddi (#TRP-8003)', detail: 'Visibility < 20m near Ambala bypass. Average convoy speed 12 km/h. Estimated delay +5.2 hours.', time: '8 mins ago', actionNeeded: 'Re-route convoy via KMP Expressway' },
  { id: 'ALT-102', type: 'critical', title: 'Reefer Cold-Chain Temp Deviation', route: 'Delhi ➔ Hyderabad (#TRP-8006)', detail: 'Sensor in container R-09 reported 7.2°C (Set point max 4.0°C). Secondary compressor auto-activated.', time: '14 mins ago', actionNeeded: 'Verify sensor calibration at next checkpoint' },
  { id: 'ALT-103', type: 'warning', title: 'Excess Fuel Consumption Detected', route: 'JNPT ➔ Gurgaon (#TRP-8001)', detail: 'Volvo FH16 telemetry logged 3.2 km/L against target 3.8 km/L on NH-48 uphill gradient.', time: '22 mins ago', actionNeeded: 'Flag for driver telematics review' },
  { id: 'ALT-104', type: 'warning', title: 'Driver Hours-of-Service Limit Alert', route: 'Kandla ➔ Ludhiana (#TRP-8015)', detail: 'Driver Gurpreet Brar has completed 8.5 hours continuous steering. Mandatory 45m rest due.', time: '31 mins ago', actionNeeded: 'Direct to authorized highway rest plaza' },
  { id: 'ALT-105', type: 'critical', title: 'Interstate Toll Tag (FASTag) Blacklist', route: 'Cochin ➔ Coimbatore (#TRP-8008)', detail: 'Vehicle KL-07-BZ-3392 tag balance depleted at Walayar Plaza. Cash lane surcharge applied.', time: '45 mins ago', actionNeeded: 'Instant wallet auto-topup ₹5,000 processed' },
  { id: 'ALT-106', type: 'info', title: 'Port Gate Congestion Notice', route: 'JNPT Gate 4 & 5', detail: 'Vessel discharge operations underway. Waiting time for inbound containers extended by 40 mins.', time: '1 hour ago', actionNeeded: 'Notify dispatch queue manager' },
  { id: 'ALT-107', type: 'warning', title: 'Preventive Brake Pad Inspection Due', route: 'Vehicle MH-12-QE-4519', detail: 'Odometer reached 98,400 km. Scheduled hydraulic brake fluid check pending.', time: '1 hour ago', actionNeeded: 'Book slot at Pune authorized service workshop' },
  { id: 'ALT-108', type: 'info', title: 'Waybill & E-Waybill Expiration Warning', route: 'Guwahati ➔ Siliguri (#TRP-8010)', detail: 'GST E-Waybill validity expires in 11 hours. Distance remaining: 180 km.', time: '2 hours ago', actionNeeded: 'Request automated E-Waybill extension on portal' },
];

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeModule = searchParams.get('module') || 'overview';

  const handleSelectModule = (modId) => {
    if (modId === 'overview') {
      setSearchParams({});
    } else {
      setSearchParams({ module: modId });
    }
    playOperationalSound('click');
  };

  const [trips, setTrips] = useState(INITIAL_TRIPS);
  const [activeTab, setActiveTab] = useState('dispatches'); // 'dispatches' | 'costing' | 'alerts' | 'corridors'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [audioMuted, setAudioMuted] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [calcInputs, setCalcInputs] = useState({ distance: 1250, weight: 22, fuelPrice: 94 });

  // Play subtle operational sound cue via Web Audio API
  const playOperationalSound = (type = 'click') => {
    if (audioMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'alert') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else {
        // High crisp beep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(740, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sound toggle button
  const toggleSound = () => {
    const newState = !audioMuted;
    setAudioMuted(newState);
    if (!newState) {
      playOperationalSound('click');
      showToast('Audio alerts & telemetry chimes enabled');
    } else {
      showToast('Audio muted');
    }
  };

  // Filtered trips
  const filteredTrips = useMemo(() => {
    return trips.filter((t) => {
      const matchesStatus = statusFilter === 'All' || t.status.toLowerCase() === statusFilter.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        t.id.toLowerCase().includes(query) ||
        t.origin.toLowerCase().includes(query) ||
        t.dest.toLowerCase().includes(query) ||
        t.driver.toLowerCase().includes(query) ||
        t.vehicle.toLowerCase().includes(query) ||
        t.cargo.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [trips, statusFilter, searchQuery]);

  // Export CSV Action
  const handleExportCSV = () => {
    playOperationalSound('click');
    const headers = [
      'Trip ID',
      'Origin',
      'Destination',
      'Transport Mode',
      'Vehicle No',
      'Driver Name',
      'Driver Contact',
      'Cargo & Load',
      'Freight Value (INR)',
      'Fuel Expense (INR)',
      'Status',
      'Progress %',
      'Priority',
      'ETA',
    ];

    const rows = trips.map((t) => [
      t.id,
      `"${t.origin}"`,
      `"${t.dest}"`,
      t.mode,
      `"${t.vehicle}"`,
      `"${t.driver}"`,
      t.phone,
      `"${t.cargo}"`,
      t.freight,
      t.fuelCost,
      t.status,
      `${t.progress}%`,
      t.priority,
      `"${t.eta}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `transport_dispatch_records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('CSV exported successfully: 60 Trip Records downloaded');
  };

  // Print Action
  const handlePrint = () => {
    playOperationalSound('click');
    window.print();
  };

  // Reset Demo Action
  const handleResetDemo = () => {
    playOperationalSound('alert');
    setTrips(INITIAL_TRIPS);
    setStatusFilter('All');
    setSearchQuery('');
    showToast('Demo data reset: 60 records restored to initial executive baseline');
  };

  // Add new trip dispatch
  const handleCreateDispatch = (e) => {
    e.preventDefault();
    const form = e.target;
    const newId = `TRP-80${trips.length + 1}`;
    const newTrip = {
      id: newId,
      origin: form.origin.value || 'Nhava Sheva Port, Mumbai',
      dest: form.dest.value || 'Delhi NCR Freight Hub',
      mode: form.mode.value || 'Road Freight',
      vehicle: form.vehicle.value || 'MH-04-EX-7788 (Volvo)',
      driver: form.driver.value || 'Rajendra Yadav',
      phone: form.phone.value || '+91 98200 45012',
      cargo: form.cargo.value || 'General Merchandise (20.0T)',
      freight: Number(form.freight.value) || 165000,
      fuelCost: Number(form.fuelCost.value) || 45000,
      status: 'Running',
      progress: 5,
      eta: '14h 30m',
      priority: form.priority.value || 'High',
    };

    setTrips([newTrip, ...trips]);
    setShowDispatchModal(false);
    playOperationalSound('click');
    showToast(`New trip ${newId} dispatched successfully! Total entries updated.`);
  };

  // Dynamic Cost Calculator
  const estimatedCost = useMemo(() => {
    const litersNeeded = Math.round(calcInputs.distance / 3.4);
    const fuelCost = litersNeeded * calcInputs.fuelPrice;
    const tollEstimate = Math.round(calcInputs.distance * 2.2);
    const driverAllowance = Math.round((calcInputs.distance / 450) * 1200);
    const maintenanceAlloc = Math.round(calcInputs.distance * 3.8);
    const totalOperatingCost = fuelCost + tollEstimate + driverAllowance + maintenanceAlloc;
    const recommendedFreight = Math.round(totalOperatingCost * 1.55);
    const projectedMargin = recommendedFreight - totalOperatingCost;
    return {
      litersNeeded,
      fuelCost,
      tollEstimate,
      driverAllowance,
      maintenanceAlloc,
      totalOperatingCost,
      recommendedFreight,
      projectedMargin,
    };
  }, [calcInputs]);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '12px 22px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <CheckCircle size={18} color="#38bdf8" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header matching exact screenshot typography and buttons */}
      <AdminHeader
        eyebrow="TRANSPORT COSTING, DISPATCH & OPERATIONS CONTROL TOOLKIT"
        title="Executive Dashboard"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button type="button" onClick={handleExportCSV} className="btn-pill-light" title="Export all trip records to CSV">
              <Download size={15} /> <span className="btn-pill-text">Export CSV</span>
            </button>
            <button type="button" onClick={handlePrint} className="btn-pill-light" title="Print operations summary sheet">
              <Printer size={15} /> <span className="btn-pill-text">Print</span>
            </button>
          </div>
        }
      />

      <div className="admin-content" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {activeModule === 'overview' && (
          <>
            {/* HERO BANNER CARD */}
            <div
              className="transport-hero-banner"
              style={{
                backgroundImage: `url('/transport_hero_banner.jpg')`,
                backgroundPosition: 'center 40%',
              }}
            >
          {/* Subtle Dark Glass Overlay */}
          <div className="hero-overlay" />

          {/* Banner Upper Content */}
          <div className="hero-content">
            {/* Live Indicator Pill */}
            <div className="hero-live-badge">
              <span className="pulse-dot-green" />
              <span>LIVE TRANSPORT OPERATIONS CONTROL</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Transport Costing, Dispatch<br />
              & Operations Control Toolkit
            </h1>

            {/* Description */}
            <p className="hero-description">
              Control trip costing, dispatch, fleet, drivers, fuel, maintenance, consignments, routes, vendors, billing, expenses and transport operations from one working dashboard.
            </p>

            {/* Interactive Badge Pills along the bottom of the banner */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('Running');
                  setActiveTab('dispatches');
                  playOperationalSound('click');
                }}
                className="hero-pill-badge"
              >
                <Truck size={15} color="#f59e0b" />
                <span>15 Trips Running</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter('All');
                  setActiveTab('dispatches');
                  playOperationalSound('click');
                }}
                className="hero-pill-badge"
              >
                <Package size={15} color="#38bdf8" />
                <span>60 Trip Records</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('alerts');
                  playOperationalSound('alert');
                }}
                className="hero-pill-badge"
                style={{ background: 'rgba(239, 68, 68, 0.4)', borderColor: 'rgba(239, 68, 68, 0.5)' }}
              >
                <AlertTriangle size={15} color="#f87171" />
                <span>30 Open Alerts</span>
              </button>
            </div>
          </div>

          {/* Watermark Tag at bottom-right corner */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '20px',
              zIndex: 3,
            }}
          >
            <span className="demo-data-tag">Sample/Demo Data Shown</span>
          </div>
        </div>

        {/* =========================================================================
            8 KPI METRIC CARDS (2 Rows of 4 Cards)
            Exact match to user screenshot + second row
            ========================================================================= */}
        <div
          className="metric-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {/* CARD 1: TOTAL TRIPS (60) */}
          <div
            className="metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setStatusFilter('All');
              setActiveTab('dispatches');
            }}
          >
            <div className="metric-header">
              <div className="metric-badge-box">
                <div className="metric-icon-square" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                  <Layers size={20} />
                </div>
                <span className="metric-title">TOTAL TRIPS</span>
              </div>
            </div>
            <div>
              <div className="metric-value">60</div>
              <p className="metric-subtext">60 demo entries available in every control module</p>
            </div>
          </div>

          {/* CARD 2: TRIPS RUNNING (15) */}
          <div
            className="metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setStatusFilter('Running');
              setActiveTab('dispatches');
            }}
          >
            <div className="metric-header">
              <div className="metric-badge-box">
                <div className="metric-icon-square" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                  <Truck size={20} />
                </div>
                <span className="metric-title">TRIPS RUNNING</span>
              </div>
            </div>
            <div>
              <div className="metric-value">15</div>
              <p className="metric-subtext">Current running transport trips</p>
            </div>
          </div>

          {/* CARD 3: DELAYED TRIPS (15) */}
          <div
            className="metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setStatusFilter('Delayed');
              setActiveTab('dispatches');
            }}
          >
            <div className="metric-header">
              <div className="metric-badge-box">
                <div className="metric-icon-square" style={{ backgroundColor: '#ccfbf1', color: '#0d9488' }}>
                  <Clock size={20} />
                </div>
                <span className="metric-title">DELAYED TRIPS</span>
              </div>
            </div>
            <div>
              <div className="metric-value">15</div>
              <p className="metric-subtext">Trips currently marked delayed</p>
            </div>
          </div>

          {/* CARD 4: FREIGHT TRACKED (₹23,27,000) */}
          <div
            className="metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveTab('costing')}
          >
            <div className="metric-header">
              <div className="metric-badge-box">
                <div className="metric-icon-square" style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>
                  <DollarSign size={20} />
                </div>
                <span className="metric-title">FREIGHT TRACKED</span>
              </div>
            </div>
            <div>
              <div className="metric-value">₹23,27,000</div>
              <p className="metric-subtext">Total freight value across costing records</p>
            </div>
          </div>

          {/* CARD 5: FUEL SPEND (₹6,42,850) */}
          <div
            className="metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveTab('costing')}
          >
            <div className="metric-header">
              <div className="metric-badge-box">
                <div className="metric-icon-square" style={{ backgroundColor: '#ede9fe', color: '#7c3aed' }}>
                  <Fuel size={20} />
                </div>
                <span className="metric-title">FUEL SPEND</span>
              </div>
            </div>
            <div>
              <div className="metric-value">₹6,42,850</div>
              <p className="metric-subtext">Total diesel & CNG fuel expense logged</p>
            </div>
          </div>

          {/* CARD 6: COLLECTIONS (₹18,94,200) */}
          <div
            className="metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveTab('costing')}
          >
            <div className="metric-header">
              <div className="metric-badge-box">
                <div className="metric-icon-square" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                  <Wallet size={20} />
                </div>
                <span className="metric-title">COLLECTIONS</span>
              </div>
            </div>
            <div>
              <div className="metric-value">₹18,94,200</div>
              <p className="metric-subtext">Client freight payments received</p>
            </div>
          </div>

          {/* CARD 7: OUTSTANDING (₹4,32,800) */}
          <div
            className="metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveTab('costing')}
          >
            <div className="metric-header">
              <div className="metric-badge-box">
                <div className="metric-icon-square" style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                  <Receipt size={20} />
                </div>
                <span className="metric-title">OUTSTANDING</span>
              </div>
            </div>
            <div>
              <div className="metric-value">₹4,32,800</div>
              <p className="metric-subtext">Receivables pending past 30 days</p>
            </div>
          </div>

          {/* CARD 8: FLEET (48 / 52) */}
          <div
            className="metric-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveTab('corridors')}
          >
            <div className="metric-header">
              <div className="metric-badge-box">
                <div className="metric-icon-square" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                  <ShieldCheck size={20} />
                </div>
                <span className="metric-title">FLEET</span>
              </div>
            </div>
            <div>
              <div className="metric-value">48 / 52</div>
              <p className="metric-subtext">Active vehicles dispatched on routes</p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CONTROL MODULE TABS (Dispatches, Costing, Alerts, Corridors)
            ========================================================================= */}
        <div className="tabs-nav-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div className="tabs-scroll-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'dispatches' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('dispatches');
                playOperationalSound('click');
              }}
            >
              <Truck size={17} /> Live Dispatches ({trips.length})
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'costing' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('costing');
                playOperationalSound('click');
              }}
            >
              <DollarSign size={17} /> Trip Costing & Margins
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('alerts');
                playOperationalSound('alert');
              }}
            >
              <AlertTriangle size={17} /> Operational Alerts (30)
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'corridors' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('corridors');
                playOperationalSound('click');
              }}
            >
              <Navigation size={17} /> Freight Corridors & Fleet
            </button>
          </div>

          {activeTab === 'dispatches' && (
            <button
              type="button"
              onClick={() => setShowDispatchModal(true)}
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
              <PlusCircle size={18} /> New Trip Dispatch
            </button>
          )}
        </div>

        {/* =========================================================================
            TAB 1: LIVE DISPATCHES BOARD
            ========================================================================= */}
        {activeTab === 'dispatches' && (
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            {/* Filter & Search Bar */}
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                background: '#fafafa',
              }}
            >
              {/* Status Filter Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginRight: '4px' }}>
                  Filter:
                </span>
                {['All', 'Running', 'Delayed'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      playOperationalSound('click');
                    }}
                    style={{
                      padding: '5px 14px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: statusFilter === status ? '1px solid #0284c7' : '1px solid #cbd5e1',
                      background: statusFilter === status ? '#e0f2fe' : '#ffffff',
                      color: statusFilter === status ? '#0369a1' : '#475569',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {status === 'All' ? `All (${trips.length})` : status === 'Running' ? 'Running (15)' : 'Delayed (15)'}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="search-box-wrapper" style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                <input
                  type="text"
                  placeholder="Search by Trip ID, route, vehicle, driver..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 14px 8px 36px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.86rem',
                    background: '#ffffff',
                  }}
                />
              </div>
            </div>

            {/* Table */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Route Lane</th>
                    <th>Vehicle / Fleet Unit</th>
                    <th>Driver & Contact</th>
                    <th>Consignment Cargo</th>
                    <th>Freight Billing</th>
                    <th>Fuel Cost</th>
                    <th>Status</th>
                    <th>Transit Progress</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrips.map((trip) => (
                    <tr key={trip.id} style={{ transition: 'background 0.15s' }}>
                      {/* Trip ID */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ color: '#0f172a', fontWeight: 800 }}>{trip.id}</strong>
                          {trip.priority === 'Urgent' && (
                            <span style={{ fontSize: '0.65rem', background: '#fee2e2', color: '#b91c1c', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                              EXPEDITE
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{trip.mode}</span>
                      </td>

                      {/* Route */}
                      <td>
                        <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.88rem' }}>
                          {trip.origin}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#0284c7' }}>
                          <ArrowRight size={12} /> {trip.dest}
                        </div>
                      </td>

                      {/* Vehicle */}
                      <td>
                        <div style={{ fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>{trip.vehicle}</div>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>GPS Linked • Live Telematics</span>
                      </td>

                      {/* Driver */}
                      <td>
                        <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.85rem' }}>{trip.driver}</div>
                        <a href={`tel:${trip.phone}`} style={{ fontSize: '0.74rem', color: '#64748b' }}>
                          {trip.phone}
                        </a>
                      </td>

                      {/* Cargo */}
                      <td>
                        <div style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 500 }}>{trip.cargo}</div>
                      </td>

                      {/* Freight */}
                      <td>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>
                          ₹{trip.freight.toLocaleString('en-IN')}
                        </div>
                      </td>

                      {/* Fuel */}
                      <td>
                        <div style={{ fontWeight: 700, color: '#64748b', fontSize: '0.85rem' }}>
                          ₹{trip.fuelCost.toLocaleString('en-IN')}
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`status-badge ${
                            trip.status === 'Running' ? 'status-confirmed' : 'status-cancelled'
                          }`}
                          style={{
                            background: trip.status === 'Running' ? '#dcfce7' : '#fee2e2',
                            color: trip.status === 'Running' ? '#15803d' : '#b91c1c',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: trip.status === 'Running' ? '#16a34a' : '#dc2626',
                            }}
                          />
                          {trip.status}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '3px' }}>
                          ETA: {trip.eta}
                        </div>
                      </td>

                      {/* Progress */}
                      <td style={{ minWidth: '130px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>
                            {trip.progress}%
                          </span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${trip.progress}%`,
                              height: '100%',
                              background: trip.status === 'Delayed' ? '#f59e0b' : '#0284c7',
                              borderRadius: '4px',
                            }}
                          />
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTrip(trip);
                            playOperationalSound('click');
                          }}
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            cursor: 'pointer',
                          }}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: TRIP COSTING & MARGINS BREAKDOWN
            ========================================================================= */}
        {activeTab === 'costing' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            {/* Cost Breakdown Sheet */}
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Trip Costing & Revenue Ledger
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '24px' }}>
                Operational expense breakdown computed across active consignments and dedicated corridors.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Total Gross Freight */}
                <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#334155' }}>Total Tracked Gross Freight</span>
                    <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>₹23,27,000</strong>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Aggregate billed invoice value across 60 consignments</span>
                </div>

                {/* Fuel */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Fuel size={15} color="#7c3aed" /> Diesel & Fuel Consumption
                    </span>
                    <strong style={{ color: '#0f172a' }}>₹6,42,850 (27.6%)</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '27.6%', height: '100%', background: '#7c3aed' }} />
                  </div>
                </div>

                {/* Driver Allowances */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <UserCheck size={15} color="#3b82f6" /> Driver Batta, Tolls & Food
                    </span>
                    <strong style={{ color: '#0f172a' }}>₹2,18,000 (9.4%)</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '9.4%', height: '100%', background: '#3b82f6' }} />
                  </div>
                </div>

                {/* Tolls & RTO */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Route size={15} color="#f59e0b" /> Tolls, FASTag & Green Tax
                    </span>
                    <strong style={{ color: '#0f172a' }}>₹1,64,500 (7.1%)</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '7.1%', height: '100%', background: '#f59e0b' }} />
                  </div>
                </div>

                {/* Maintenance & Tyres */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Wrench size={15} color="#ef4444" /> Fleet Maintenance & Spares
                    </span>
                    <strong style={{ color: '#0f172a' }}>₹1,12,000 (4.8%)</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '4.8%', height: '100%', background: '#ef4444' }} />
                  </div>
                </div>

                {/* Net Operating Profit */}
                <div style={{ marginTop: '14px', padding: '16px', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 800, color: '#065f46', fontSize: '0.95rem' }}>Net Operating Margin</span>
                      <p style={{ fontSize: '0.75rem', color: '#047857' }}>48.2% operating profit before corporate tax</p>
                    </div>
                    <strong style={{ fontSize: '1.4rem', color: '#065f46', fontWeight: 800 }}>₹11,21,150</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Trip Cost Calculator */}
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Trip Costing Quotation Calculator
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
                Estimate freight pricing, diesel consumption, and net profit for upcoming route dispatches.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    Estimated Distance (Kilometers)
                  </label>
                  <input
                    type="number"
                    value={calcInputs.distance}
                    onChange={(e) => setCalcInputs({ ...calcInputs, distance: Number(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                      Payload Weight (Tons)
                    </label>
                    <input
                      type="number"
                      value={calcInputs.weight}
                      onChange={(e) => setCalcInputs({ ...calcInputs, weight: Number(e.target.value) || 0 })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                      Diesel Price (₹/Liter)
                    </label>
                    <input
                      type="number"
                      value={calcInputs.fuelPrice}
                      onChange={(e) => setCalcInputs({ ...calcInputs, fuelPrice: Number(e.target.value) || 0 })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                    <span style={{ color: '#64748b' }}>Estimated Fuel Requirement:</span>
                    <strong style={{ color: '#0f172a' }}>{estimatedCost.litersNeeded} Liters (₹{estimatedCost.fuelCost.toLocaleString('en-IN')})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                    <span style={{ color: '#64748b' }}>Tolls & Fastag Estimate:</span>
                    <strong style={{ color: '#0f172a' }}>₹{estimatedCost.tollEstimate.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                    <span style={{ color: '#64748b' }}>Driver Allowance & Enroute Batta:</span>
                    <strong style={{ color: '#0f172a' }}>₹{estimatedCost.driverAllowance.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                    <span style={{ color: '#64748b' }}>Total Dispatch Cost:</span>
                    <strong style={{ color: '#dc2626' }}>₹{estimatedCost.totalOperatingCost.toLocaleString('en-IN')}</strong>
                  </div>

                  <div style={{ padding: '14px', background: '#eff6ff', borderRadius: '10px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase' }}>
                          Suggested Client Freight Quote
                        </span>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e3a8a' }}>
                          ₹{estimatedCost.recommendedFreight.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 700 }}>Projected Profit</span>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#15803d' }}>
                          +₹{estimatedCost.projectedMargin.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: OPERATIONAL ALERTS (30 ALERTS)
            ========================================================================= */}
        {activeTab === 'alerts' && (
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  Operational Exceptions & Active Alerts (30 Open)
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Real-time telemetry warnings, highway congestion delays, and regulatory compliance flags.
                </p>
              </div>
              <span
                style={{
                  background: '#fee2e2',
                  color: '#dc2626',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <AlertCircle size={14} color="#dc2626" /> 6 Critical Actions Required
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {OPERATIONAL_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '14px',
                    border: '1px solid',
                    borderColor: alert.type === 'critical' ? '#fecaca' : '#fed7aa',
                    background: alert.type === 'critical' ? '#fff5f5' : '#fffbeb',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: alert.type === 'critical' ? '#fee2e2' : '#fef3c7',
                        color: alert.type === 'critical' ? '#dc2626' : '#d97706',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <strong style={{ color: '#0f172a', fontSize: '0.94rem' }}>{alert.title}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', background: '#ffffff', padding: '2px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                          {alert.route}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>• {alert.time}</span>
                      </div>
                      <p style={{ fontSize: '0.84rem', color: '#475569', marginBottom: '6px', lineHeight: 1.4 }}>
                        {alert.detail}
                      </p>
                      <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>
                        Action: {alert.actionNeeded}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      playOperationalSound('click');
                      showToast(`Resolved alert ${alert.id}: Action dispatched`);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    Acknowledge
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: FREIGHT CORRIDORS & FLEET STATUS
            ========================================================================= */}
        {activeTab === 'corridors' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            {/* Corridors */}
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Major National Freight Corridors
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
                Live transit velocity and congestion status across core multi-modal corridors.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { name: 'Western Dedicated Freight Corridor (Dadri ➔ JNPT)', length: '1,504 km', active: '18 Units', speed: '68 km/h', status: 'Optimal', color: '#16a34a' },
                  { name: 'Golden Quadrilateral NH-48 (Delhi ➔ Mumbai)', length: '1,419 km', active: '22 Units', speed: '42 km/h (Fog)', status: 'Delayed', color: '#f59e0b' },
                  { name: 'Chennai ➔ Bengaluru Industrial Corridor', length: '345 km', active: '9 Units', speed: '64 km/h', status: 'Optimal', color: '#16a34a' },
                  { name: 'Eastern Corridor NH-19 (Kolkata ➔ Varanasi)', length: '685 km', active: '7 Units', speed: '55 km/h', status: 'Moderate', color: '#0284c7' },
                ].map((corridor) => (
                  <div key={corridor.name} style={{ padding: '14px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{corridor.name}</strong>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: corridor.color }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: corridor.color }} />
                        {corridor.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.76rem', color: '#64748b' }}>
                      <span>Length: {corridor.length}</span>
                      <span>Active Fleet: {corridor.active}</span>
                      <span>Avg Speed: {corridor.speed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fleet Health Telemetry */}
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Fleet Telematics & Vehicle Allocation
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
                52 commercial heavy vehicles tracked via dual-satellite GPS units.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
                  <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803d' }}>48</div>
                    <span style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>In Transit</span>
                  </div>
                  <div style={{ padding: '12px', background: '#fef3c7', borderRadius: '10px', border: '1px solid #fde68a' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#b45309' }}>3</div>
                    <span style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: 700 }}>Workshop Bay</span>
                  </div>
                  <div style={{ padding: '12px', background: '#f1f5f9', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#475569' }}>1</div>
                    <span style={{ fontSize: '0.72rem', color: '#334155', fontWeight: 700 }}>Dock Standby</span>
                  </div>
                </div>

                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                    Fleet Average Fuel Efficiency Benchmark
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                    <span style={{ color: '#64748b' }}>Actual: 3.52 km/L</span>
                    <span style={{ color: '#0284c7', fontWeight: 700 }}>Target: 3.80 km/L</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '88%', height: '100%', background: '#0284c7' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )}
        
        {/* =========================================================================
            8-STAGE INTEGRATED WORKFLOW PIPELINE
            ========================================================================= */}
        <WorkflowPipelineBar
          activeModule={activeModule}
          onSelectModule={handleSelectModule}
        />

        {activeModule !== 'overview' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleSelectModule('overview')}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to Executive Overview
            </button>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Active Module: <strong style={{ color: '#0284c7', textTransform: 'uppercase' }}>{activeModule}</strong>
            </span>
          </div>
        )}

        {/* Dynamic Module Rendering */}
        {activeModule === 'trip-costing' && <TripCostingModule onNotify={showToast} />}
        {activeModule === 'freight-route' && <FreightRouteCostingModule onNotify={showToast} />}
        {activeModule === 'fuel-vehicle' && <FuelVehicleCostingModule onNotify={showToast} />}
        {activeModule === 'dispatch' && <DispatchManagementModule onNotify={showToast} />}
        {activeModule === 'shipments' && <ShipmentTrackingModule onNotify={showToast} />}
        {activeModule === 'fleet-drivers' && <FleetDriverTrackingModule onNotify={showToast} />}
        {activeModule === 'maintenance' && <MaintenanceInspectionModule onNotify={showToast} />}
        {activeModule === 'delivery-operations' && <DeliveryOperationsControlModule onNotify={showToast} />}

        {/* =========================================================================
            EXECUTIVE OVERVIEW VIEW (Hero Banner, 8 KPI Cards & Operations Table)
            ========================================================================= */}
        
  </div>

      {/* =========================================================================
          FLOATING SOUND TOGGLE BUTTON (Exact match to speaker circle in screenshot)
          ========================================================================= */}
      <button
        type="button"
        className="floating-sound-btn"
        onClick={toggleSound}
        title={audioMuted ? 'Unmute Operational Radio & Alerts' : 'Mute Sound'}
        aria-label="Toggle Audio"
      >
        {audioMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>

      {/* =========================================================================
          MODAL: NEW TRIP DISPATCH
          ========================================================================= */}
      {showDispatchModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            className="responsive-modal-box"
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>Create New Trip Dispatch</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Allocate freight consignment and dispatch fleet vehicle</p>
              </div>
              <button
                type="button"
                onClick={() => setShowDispatchModal(false)}
                style={{ color: '#94a3b8', padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateDispatch} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Origin Depot / Port
                </label>
                <input
                  name="origin"
                  defaultValue="JNPT Port, Mumbai"
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Destination Terminal
                </label>
                <input
                  name="dest"
                  defaultValue="Gurgaon ICD, NCR"
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Vehicle No
                  </label>
                  <input
                    name="vehicle"
                    defaultValue="MH-04-GP-9901 (Volvo FH16)"
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Driver Name
                  </label>
                  <input
                    name="driver"
                    defaultValue="Rameshwar Yadav"
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Freight Value (₹)
                  </label>
                  <input
                    type="number"
                    name="freight"
                    defaultValue={190000}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Estimated Fuel (₹)
                  </label>
                  <input
                    type="number"
                    name="fuelCost"
                    defaultValue={54000}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Cargo Description & Tonnage
                </label>
                <input
                  name="cargo"
                  defaultValue="Heavy Industrial Machinery (24.0T)"
                  required
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setShowDispatchModal(false)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '9px 22px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#0284c7',
                    color: '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: TRIP DETAILS & WAYBILL DRAWER
          ========================================================================= */}
      {selectedTrip && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            className="responsive-modal-box"
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '620px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                  Consignment Waybill Manifest
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                  {selectedTrip.id} • {selectedTrip.mode}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTrip(null)}
                style={{ color: '#94a3b8', padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a' }}>
                  <MapPin size={16} color="#0284c7" />
                  <span>{selectedTrip.origin}</span>
                  <ArrowRight size={14} color="#64748b" />
                  <span>{selectedTrip.dest}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                  Estimated Transit Duration: {selectedTrip.eta}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Assigned Fleet Vehicle</span>
                  <div style={{ fontWeight: 700, color: '#1e293b' }}>{selectedTrip.vehicle}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Driver & Mobile</span>
                  <div style={{ fontWeight: 700, color: '#1e293b' }}>{selectedTrip.driver} ({selectedTrip.phone})</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Freight Billed</span>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>
                    ₹{selectedTrip.freight.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Allocated Fuel Expense</span>
                  <div style={{ fontWeight: 700, color: '#64748b' }}>
                    ₹{selectedTrip.fuelCost.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Cargo Manifest</span>
                <div style={{ fontWeight: 600, color: '#334155' }}>{selectedTrip.cargo}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Transit Status</span>
                <div style={{ marginTop: '4px' }}>
                  <span
                    className="status-badge"
                    style={{
                      background: selectedTrip.status === 'Running' ? '#dcfce7' : '#fee2e2',
                      color: selectedTrip.status === 'Running' ? '#15803d' : '#b91c1c',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: selectedTrip.status === 'Running' ? '#16a34a' : '#dc2626',
                      }}
                    />
                    {selectedTrip.status} ({selectedTrip.progress}% Completed)
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => {
                  playOperationalSound('click');
                  window.print();
                }}
                style={{
                  padding: '9px 18px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Printer size={16} /> Print Waybill
              </button>
              <button
                type="button"
                onClick={() => setSelectedTrip(null)}
                style={{
                  padding: '9px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#0284c7',
                  color: '#ffffff',
                  fontWeight: 700,
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
