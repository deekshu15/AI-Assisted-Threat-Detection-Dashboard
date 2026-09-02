import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Shield, Upload, Radio, Globe, ShieldAlert, CheckCircle, AlertTriangle, 
  Clock, Server, Terminal, ShieldCheck, Activity, ArrowUpRight, X, Plus, Minus, Search, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Threat, SidebarToolType } from '../types';

interface DashboardViewProps {
  threats: Threat[];
  onLoadDemoData: () => void;
  onSetTool: (tool: SidebarToolType) => void;
  onClearData: () => void;
}

// Lat/Long Coordinate Dictionary
const GEOLOCATIONS: Record<string, string> = {
  'China': '39.90° N, 116.40° E',
  'Russia': '55.75° N, 37.61° E',
  'India': '20.59° N, 78.96° E',
  'Nigeria': '9.08° N, 8.67° E',
  'Germany': '51.16° N, 10.45° E',
  'Brazil': '14.23° S, 51.92° W',
  'United Kingdom': '55.37° N, 3.43° W',
  'UK': '55.37° N, 3.43° W',
  'United States': '37.09° N, 95.71° W',
  'USA': '37.09° N, 95.71° W',
  'South Korea': '35.90° N, 127.76° E',
  'Iran': '32.42° N, 53.68° E',
  'Australia': '25.27° S, 133.77° E',
  'Japan': '36.20° N, 138.25° E',
  'Canada': '56.13° N, 106.34° W',
  'France': '46.22° N, 2.21° E'
};

const COUNTRY_COORDS: Record<string, { x: number; y: number }> = {
  'China': { x: 620, y: 160 },
  'Russia': { x: 550, y: 100 },
  'India': { x: 580, y: 200 },
  'Nigeria': { x: 420, y: 240 },
  'Germany': { x: 440, y: 130 },
  'Brazil': { x: 300, y: 280 },
  'United Kingdom': { x: 410, y: 110 },
  'UK': { x: 410, y: 110 },
  'South Korea': { x: 660, y: 160 },
  'Iran': { x: 520, y: 170 },
  'Australia': { x: 700, y: 320 },
  'Japan': { x: 680, y: 150 },
  'Canada': { x: 200, y: 100 },
  'France': { x: 420, y: 140 },
  'United States': { x: 180, y: 150 },
  'USA': { x: 180, y: 150 },
};

// Stylized modern continent paths for the futuristic map overlay
const CONTINENT_PATHS = [
  {
    name: 'NORTH AMERICA',
    d: 'M 80,110 L 120,80 L 150,70 L 220,60 L 260,80 L 280,100 L 250,130 L 220,150 L 190,170 L 180,210 L 160,190 L 150,150 L 120,140 L 90,130 Z',
    labelX: 130,
    labelY: 90
  },
  {
    name: 'GREENLAND',
    d: 'M 220,40 L 260,30 L 290,45 L 250,65 L 220,55 Z',
    labelX: 250,
    labelY: 45
  },
  {
    name: 'SOUTH AMERICA',
    d: 'M 230,220 L 270,225 L 300,250 L 320,290 L 310,340 L 290,370 L 270,360 L 260,310 L 245,260 L 225,235 Z',
    labelX: 280,
    labelY: 280
  },
  {
    name: 'EUROPE',
    d: 'M 380,100 L 420,75 L 470,75 L 485,110 L 450,145 L 420,135 L 390,140 Z',
    labelX: 430,
    labelY: 90
  },
  {
    name: 'AFRIKA',
    d: 'M 390,165 L 440,155 L 480,185 L 490,225 L 460,305 L 440,305 L 410,245 L 385,205 Z',
    labelX: 440,
    labelY: 235
  },
  {
    name: 'ASIA',
    d: 'M 470,75 L 620,55 L 730,65 L 760,105 L 720,165 L 690,215 L 660,235 L 590,215 L 550,205 L 500,165 L 485,110 Z',
    labelX: 610,
    labelY: 105
  },
  {
    name: 'AUSTRALIA',
    d: 'M 660,285 L 710,275 L 730,305 L 700,335 L 660,315 Z',
    labelX: 695,
    labelY: 305
  }
];

export default function DashboardView({ threats, onLoadDemoData, onSetTool, onClearData }: DashboardViewProps) {
  const hasData = threats.length > 0;

  // State managers
  const [zoom, setZoom] = useState<number>(1);
  const [selectedMapCountry, setSelectedMapCountry] = useState<string>('All');
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  
  // Threat Intelligence Feed State
  const [tableSearch, setTableSearch] = useState<string>('');
  const [tableSeverity, setTableSeverity] = useState<string>('All');
  const [tablePage, setTablePage] = useState<number>(1);

  // Dynamic Metrics
  const totalThreats = threats.length;
  const criticalThreats = threats.filter(t => t.severity === 'Critical').length;
  const highThreats = threats.filter(t => t.severity === 'High').length;

  // Zoom handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));

  // Extract unique countries from threats list for the map filter
  const uniqueCountries = useMemo(() => {
    const list = threats.map(t => t.country).filter(Boolean);
    return Array.from(new Set(list)).sort();
  }, [threats]);

  // Destination IP mapper helper
  const getDestIp = (targetDevice: string, port: number) => {
    if (targetDevice === 'Workstation') return '192.168.1.15';
    if (targetDevice === 'Mail Server') return '192.168.2.22';
    if (targetDevice === 'Database Server') return '192.168.2.10';
    if (targetDevice === 'Web Server') return '192.168.3.80';
    if (targetDevice === 'Firewall') return '192.168.1.1';
    if (targetDevice === 'Router') return '192.168.1.254';
    return `10.240.12.${(port * 3) % 254 + 1}`;
  };

  // State array for active map attack arcs
  const [activeArcs, setActiveArcs] = useState<Array<{
    id: string;
    country: string;
    severity: string;
    attackType: string;
    sourceIp: string;
    addedAt: number;
  }>>([]);

  const prevThreatsLengthRef = useRef(threats.length);

  // Real-time synchronization of newly injected telemetry alerts
  useEffect(() => {
    if (threats.length > prevThreatsLengthRef.current) {
      const numNew = threats.length - prevThreatsLengthRef.current;
      const newThreats = threats.slice(0, numNew);
      
      const newArcs = newThreats.map(t => ({
        id: t.id,
        country: t.country,
        severity: t.severity,
        attackType: t.attackType,
        sourceIp: t.sourceIp,
        addedAt: Date.now()
      }));

      setActiveArcs(prev => {
        // Keep only older active arcs that are younger than 10 seconds
        const filtered = prev.filter(arc => Date.now() - arc.addedAt < 10000);
        return [...newArcs, ...filtered].slice(0, 15);
      });
    } else if (threats.length === 0) {
      setActiveArcs([]);
    }
    prevThreatsLengthRef.current = threats.length;
  }, [threats]);

  // Seed initial arcs if activeArcs is empty but threats are loaded
  useEffect(() => {
    if (threats.length > 0 && activeArcs.length === 0) {
      const initialArcs = threats.slice(0, 8).map((t, idx) => ({
        id: t.id,
        country: t.country,
        severity: t.severity,
        attackType: t.attackType,
        sourceIp: t.sourceIp,
        addedAt: Date.now() - idx * 1200
      }));
      setActiveArcs(initialArcs);
    }
  }, [threats, activeArcs.length]);

  // Periodically prune old active arcs (after 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveArcs(prev => {
        const filtered = prev.filter(arc => Date.now() - arc.addedAt < 10000);
        if (filtered.length !== prev.length) {
          return filtered;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtered active arcs for display based on selected dropdown country
  const filteredActiveArcs = useMemo(() => {
    return activeArcs.filter(arc => {
      if (selectedMapCountry !== 'All' && arc.country !== selectedMapCountry) return false;
      return true;
    });
  }, [activeArcs, selectedMapCountry]);

  // Compute if there's any recent arc added (< 1.5s) to trigger HQ pulse shockwave
  const hasRecentImpact = useMemo(() => {
    return filteredActiveArcs.some(arc => Date.now() - arc.addedAt < 1500);
  }, [filteredActiveArcs]);

  // Compute highest severity among currently active arcs to style the main node
  const maxActiveSeverity = useMemo(() => {
    const severities = filteredActiveArcs.map(a => a.severity);
    if (severities.includes('Critical')) return 'Critical';
    if (severities.includes('High')) return 'High';
    if (severities.includes('Medium')) return 'Medium';
    return 'Low';
  }, [filteredActiveArcs]);

  // Map Filtered Arcs and Points
  const activeMapThreats = useMemo(() => {
    return threats.filter(t => {
      if (selectedMapCountry !== 'All' && t.country !== selectedMapCountry) return false;
      return true;
    });
  }, [threats, selectedMapCountry]);

  // Live Threat Alerts Stack (dismissed filtered, up to top 15)
  const activeAlerts = useMemo(() => {
    return threats
      .filter(t => !dismissedAlerts.includes(t.id))
      .slice(0, 15);
  }, [threats, dismissedAlerts]);

  // Threat Intelligence Feed Table Calculations
  const tableRowsPerPage = 10;
  const filteredTableThreats = useMemo(() => {
    return threats.filter(t => {
      // Severity Filter
      if (tableSeverity !== 'All' && t.severity !== tableSeverity) return false;

      // Text Search
      if (tableSearch.trim()) {
        const query = tableSearch.toLowerCase();
        const matchesAttacker = t.sourceIp.toLowerCase().includes(query);
        const matchesTarget = getDestIp(t.targetDevice, t.port).toLowerCase().includes(query);
        const matchesType = t.attackType.toLowerCase().includes(query);
        const matchesDevice = t.targetDevice.toLowerCase().includes(query);
        const matchesCountry = t.country.toLowerCase().includes(query);
        const matchesSeverity = t.severity.toLowerCase().includes(query);
        return matchesAttacker || matchesTarget || matchesType || matchesDevice || matchesCountry || matchesSeverity;
      }

      return true;
    });
  }, [threats, tableSeverity, tableSearch]);

  const totalTablePages = Math.max(1, Math.ceil(filteredTableThreats.length / tableRowsPerPage));
  const currentTableData = useMemo(() => {
    const startIndex = (tablePage - 1) * tableRowsPerPage;
    return filteredTableThreats.slice(startIndex, startIndex + tableRowsPerPage);
  }, [filteredTableThreats, tablePage]);

  // Adjust table page if out of bounds
  React.useEffect(() => {
    if (tablePage > totalTablePages) {
      setTablePage(totalTablePages);
    }
  }, [totalTablePages, tablePage]);

  if (!hasData) {
    return (
      <div id="dashboard-empty-container" className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-[#0b0e14] text-white font-sans overflow-y-auto">
        <div className="mb-6 p-4 sm:p-6 bg-[#1e222b] border border-[#39ff14]/30 rounded-none shadow-[0_0_25px_rgba(57,255,20,0.2)] glow-box-green">
          <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-[#39ff14] animate-pulse filter drop-shadow-[0_0_5px_#39ff14]" />
        </div>

        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-center uppercase text-white px-4 leading-tight">
          AI-ASSISTED THREAT DETECTION
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md text-center mb-8 sm:mb-12 leading-relaxed px-4">
          System currently stand-by. No telemetry streams ingested. Activate standard intelligence feeds or upload compliance logs to start deep analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl px-4">
          <button
            id="dashboard-action-upload"
            onClick={() => onSetTool('Static Data')}
            className="flex flex-col items-center justify-center p-6 sm:p-8 bg-[#1e222b] border border-slate-800 hover:border-[#39ff14] rounded-none hover:bg-slate-800/40 transition-all text-center group cursor-pointer hover-glow"
          >
            <div className="p-3 sm:p-4 bg-[#0b0e14] border border-slate-800 rounded-none mb-4 text-[#39ff14] group-hover:scale-105 transition-transform">
              <Upload className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm mb-1 text-white uppercase tracking-wider group-hover:text-[#39ff14] transition-colors">Upload Data (CSV/JSON)</h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium font-sans">COMPLIANCE LOG FILES</p>
          </button>

          <button
            id="dashboard-action-connect"
            onClick={() => onSetTool('Live API')}
            className="flex flex-col items-center justify-center p-6 sm:p-8 bg-[#1e222b] border border-slate-800 hover:border-[#39ff14] rounded-none hover:bg-slate-800/40 transition-all text-center group cursor-pointer hover-glow"
          >
            <div className="p-3 sm:p-4 bg-[#0b0e14] border border-slate-800 rounded-none mb-4 text-[#39ff14] group-hover:scale-105 transition-transform">
              <Radio className="h-6 w-6 sm:h-7 sm:w-7 animate-pulse" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm mb-1 text-white uppercase tracking-wider group-hover:text-[#39ff14] transition-colors">Connect API (Live Feed)</h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium font-sans">LIVE TELEMETRY GATEWAY</p>
          </button>

          <button
            id="dashboard-action-demo"
            onClick={onLoadDemoData}
            className="flex flex-col items-center justify-center p-6 sm:p-8 bg-[#1e222b] border border-slate-800 hover:border-[#39ff14] rounded-none hover:bg-slate-800/40 transition-all text-center group cursor-pointer hover-glow"
          >
            <div className="p-3 sm:p-4 bg-[#0b0e14] border border-slate-800 rounded-none mb-4 text-[#39ff14] group-hover:scale-105 transition-transform">
              <Globe className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm mb-1 text-white uppercase tracking-wider group-hover:text-[#39ff14] transition-colors">Demo Mode</h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium font-sans">LOAD SIMULATED EVENTS</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="active-dashboard-container" className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto bg-[#0b0e14] text-white space-y-6 font-sans">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Terminal className="h-6 w-6 text-[#39ff14]" />
            <span>SEC-OPS <span className="text-[#39ff14] glow-green">TELEMETRY_CORE</span></span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">
            Real-time telemetry overview of virtualized containers, routing nodes, and active CVE targets.
          </p>
        </div>
        <button
          id="dashboard-reset-data-btn"
          onClick={onClearData}
          className="text-xs font-bold uppercase text-[#ff003c] bg-transparent hover:bg-[#ff003c]/10 border border-[#ff003c]/40 hover:border-[#ff003c] px-4 py-2 rounded-none transition-all cursor-pointer glow-box-red self-end sm:self-auto"
        >
          [ RESET_DATA_STREAMS ]
        </button>
      </div>

      {/* A. Top KPI Stat Counters (3 metric cards exact) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Total Threats */}
        <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex items-center justify-between shadow-xl hover:border-[#39ff14]/40 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">// TOTAL THREATS</span>
            <div className="text-3xl font-extrabold text-white glow-green">{totalThreats}</div>
            <span className="text-[11px] text-[#39ff14] font-semibold flex items-center gap-1 uppercase">
              +14.2% <Clock className="h-3.5 w-3.5" /> <span className="text-slate-500 font-medium">Active stream</span>
            </span>
          </div>
          <div className="p-3 bg-[#0b0e14] text-[#39ff14] border border-[#39ff14]/30 rounded-none glow-box-green">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 2: Critical Risk */}
        <div className="bg-[#1e222b] border border-red-950 p-5 rounded-none flex items-center justify-between shadow-xl hover:border-red-500/40 transition-all glow-box-red">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">!! CRITICAL RISK !!</span>
            <div className="text-3xl font-extrabold text-red-500 glow-red">{criticalThreats}</div>
            <span className="text-[11px] text-red-500/80 font-semibold uppercase tracking-tight">
              Severity Level Red Alerts
            </span>
          </div>
          <div className="p-3 bg-[#0b0e14] text-red-500 border border-red-500/30 rounded-none">
            <ShieldAlert className="h-6 w-6 animate-pulse" />
          </div>
        </div>

        {/* Metric 3: High Risk */}
        <div className="bg-[#1e222b] border-amber-950 border p-5 rounded-none flex items-center justify-between shadow-xl hover:border-amber-500/40 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">// HIGH RISK</span>
            <div className="text-3xl font-extrabold text-amber-500">{highThreats}</div>
            <span className="text-[11px] text-amber-500/80 font-medium uppercase tracking-tight">
              Actionable Ingress Anomalies
            </span>
          </div>
          <div className="p-3 bg-[#0b0e14] text-amber-500 border border-amber-500/30 rounded-none">
            <Activity className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* B. Main Interactive Workspace (Map + Live Alert Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        {/* Geospatial Risk Map (Left/Center - 70% width) */}
        <div className="lg:col-span-7 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col space-y-4 shadow-xl relative min-w-0">
          
          {/* Header & Controls Grid */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4.5 w-4.5 text-[#39ff14]" />
              <h2 className="text-sm font-black uppercase tracking-wider">// GEOSPATIAL_RISK_MAP</h2>
            </div>
            
            {/* Top-right map controls & options */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              {/* Country filter dropdown */}
              <select
                value={selectedMapCountry}
                onChange={(e) => setSelectedMapCountry(e.target.value)}
                className="bg-black/60 border border-slate-800 hover:border-[#39ff14] text-xs font-semibold px-2.5 py-1 text-white focus:outline-none rounded-none cursor-pointer tracking-wider"
              >
                <option value="All">ALL COUNTRIES</option>
                {uniqueCountries.map(c => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>

              {/* Zoom % status display */}
              <div className="border border-slate-800 bg-black/60 px-2.5 py-1 text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                ZOOM: {Math.round(zoom * 100)}%
              </div>
            </div>
          </div>

          <style>{`
            @keyframes dash-flow {
              to {
                stroke-dashoffset: -24;
              }
            }
            .dash-flow {
              animation: dash-flow 1.2s linear infinite;
            }
            @keyframes ripple-ring {
              0% {
                r: 6px;
                opacity: 1;
                stroke-width: 1.5;
              }
              50% {
                opacity: 0.6;
              }
              100% {
                r: 32px;
                opacity: 0;
                stroke-width: 0.5;
              }
            }
            .pulsing-ring-critical {
              animation: ripple-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
              stroke: #ff003c;
            }
            .pulsing-ring-critical-delay {
              animation: ripple-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
              animation-delay: 1s;
              stroke: #ff003c;
            }
            .pulsing-ring-high {
              animation: ripple-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
              stroke: #f97316;
            }
            .pulsing-ring-high-delay {
              animation: ripple-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
              animation-delay: 1s;
              stroke: #f97316;
            }
            .pulsing-ring-medium {
              animation: ripple-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
              stroke: #eab308;
            }
            .pulsing-ring-low {
              animation: ripple-ring 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
              stroke: #00f0ff;
            }
          `}</style>

          {/* Interactive Map Visual Stage */}
          <div className="relative w-full overflow-hidden flex items-center justify-center bg-black/40 border border-slate-900 h-[360px]">
            
            {/* Zoom controls pinned to the top-left of the map frame */}
            <div className="absolute top-3 left-3 flex flex-col border border-slate-800 bg-[#0b0e14]/90 z-30 shadow-lg">
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1.5 text-slate-400 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 border-b border-slate-800 focus:outline-none transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1.5 text-slate-400 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 focus:outline-none transition-colors cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Top-Right Legend Box overlay */}
            <div className="absolute top-3 right-3 bg-[#1e222b]/95 border border-slate-800 p-2.5 flex flex-col gap-1.5 z-20 text-[9px] font-mono shadow-2xl rounded-none">
              <span className="text-[#39ff14] font-black uppercase tracking-widest border-b border-slate-800 pb-1 mb-1">
                SEVERITY LEGEND
              </span>
              <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> CRITICAL
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> HIGH
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span> MEDIUM
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> LOW
              </div>
              <div className="mt-1 pt-1 border-t border-slate-800 text-[#39ff14]">
                <span className="bg-[#39ff14]/10 border border-[#39ff14]/40 px-1.5 py-0.5 rounded-none font-black uppercase">
                  ACTIVE ARCS: {filteredActiveArcs.length}
                </span>
              </div>
            </div>

            {/* SVG Plotting of Dark World Map */}
            <svg viewBox="0 0 800 400" className="w-full h-full bg-[#0b0e14] rounded-none overflow-hidden transition-all duration-300">
              <defs>
                <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff003c" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ff003c" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid Background */}
              <g stroke="rgba(0, 240, 255, 0.03)" strokeWidth="0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <line key={`x-${i}`} x1={i * 50} y1={0} x2={i * 50} y2={400} />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`y-${i}`} x1={0} y1={i * 50} x2={800} y2={i * 50} />
                ))}
              </g>

              {/* Transformable Interactive Layer */}
              <g style={{ transform: `scale(${zoom})`, transformOrigin: '300px 180px', transition: 'transform 0.3s ease' }}>
                
                {/* 1. Base Map: Styled High-contrast Continent Boundaries */}
                <g className="continents" opacity="0.3">
                  {CONTINENT_PATHS.map((cont, idx) => (
                    <path
                      key={`continent-${idx}`}
                      d={cont.d}
                      fill="#0e131f"
                      stroke="rgba(0, 240, 255, 0.35)"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  ))}
                </g>

                {/* 2. Continent Location Labels */}
                <g className="continent-labels" opacity="0.45">
                  {CONTINENT_PATHS.map((cont, idx) => (
                    <text
                      key={`label-${idx}`}
                      x={cont.labelX}
                      y={cont.labelY}
                      fill="rgba(0, 240, 255, 0.7)"
                      className="text-[8px] font-mono font-bold tracking-widest pointer-events-none"
                      textAnchor="middle"
                    >
                      {cont.name}
                    </text>
                  ))}
                </g>

                {/* 3. Real-Time Animated Attack Trajectory Arcs */}
                {filteredActiveArcs.map((arc, index) => {
                  if (!arc.country || arc.country === 'United States' || arc.country === 'USA') return null;
                  
                  const origin = COUNTRY_COORDS[arc.country] || { x: 350, y: 180 };
                  const dest = COUNTRY_COORDS['United States'];
                  
                  const dx = dest.x - origin.x;
                  const dy = dest.y - origin.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const mx = (origin.x + dest.x) / 2;
                  const my = (origin.y + dest.y) / 2 - Math.min(120, dist * 0.25);
                  const pathD = `M ${origin.x} ${origin.y} Q ${mx} ${my} ${dest.x} ${dest.y}`;

                  const arcColor = arc.severity === 'Critical' 
                    ? '#ff003c' 
                    : arc.severity === 'High' 
                    ? '#f97316' 
                    : arc.severity === 'Medium' 
                    ? '#eab308' 
                    : '#00f0ff';

                  const age = Date.now() - arc.addedAt;
                  const opacity = Math.max(0, 1 - age / 10000);

                  return (
                    <g key={`arc-${arc.id}-${index}`} opacity={opacity} style={{ transition: 'opacity 0.5s ease' }}>
                      <path d={pathD} fill="none" stroke={arcColor} strokeWidth="1.2" className="opacity-15" />
                      <path
                        d={pathD}
                        fill="none"
                        stroke={arcColor}
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        className="dash-flow opacity-70"
                      />
                    </g>
                  );
                })}

                {/* 4. HQ Target Node with Pulsing Halos */}
                <g className="cursor-pointer">
                  {/* Outer Radar Pulsing Halos */}
                  <circle cx={180} cy={150} r="12" fill="none" className={
                    maxActiveSeverity === 'Critical' ? 'pulsing-ring-critical' :
                    maxActiveSeverity === 'High' ? 'pulsing-ring-high' :
                    maxActiveSeverity === 'Medium' ? 'pulsing-ring-medium' :
                    'pulsing-ring-low'
                  } />
                  <circle cx={180} cy={150} r="12" fill="none" className={
                    maxActiveSeverity === 'Critical' ? 'pulsing-ring-critical-delay' :
                    maxActiveSeverity === 'High' ? 'pulsing-ring-high-delay' :
                    maxActiveSeverity === 'Medium' ? 'pulsing-ring-medium' :
                    'pulsing-ring-low'
                  } />

                  {/* Impact shockwave halo */}
                  {hasRecentImpact && (
                    <circle cx={180} cy={150} r="25" fill="none" stroke="#00f0ff" strokeWidth="2.5" className="animate-ping" />
                  )}

                  {/* Node fill/center */}
                  <circle cx={180} cy={150} r="18" fill="url(#hqGlow)" />
                  <circle cx={180} cy={150} r="5" fill="#00f0ff" />
                  <circle cx={180} cy={150} r="2.5" fill="#ffffff" />
                  
                  <text x={180} y={130} fill="#00f0ff" className="text-[9px] font-mono font-black tracking-widest text-shadow" textAnchor="middle">
                    SEC_HQ_USA
                  </text>
                </g>

                {/* 5. Origin Nodes with Pulsing Radar Rings */}
                {Array.from(new Set(filteredActiveArcs.map(t => t.country).filter(Boolean) as string[])).map((country: string) => {
                  if (country === 'United States' || country === 'USA') return null;

                  const coords = COUNTRY_COORDS[country] || { x: 350, y: 180 };
                  const countryArcs = filteredActiveArcs.filter(a => a.country === country);
                  const count = countryArcs.length;
                  
                  const severities = countryArcs.map(a => a.severity);
                  const countryMaxSeverity = severities.includes('Critical') 
                    ? 'Critical' 
                    : severities.includes('High') 
                    ? 'High' 
                    : severities.includes('Medium') 
                    ? 'Medium' 
                    : 'Low';

                  const ringClass = countryMaxSeverity === 'Critical'
                    ? 'pulsing-ring-critical'
                    : countryMaxSeverity === 'High'
                    ? 'pulsing-ring-high'
                    : countryMaxSeverity === 'Medium'
                    ? 'pulsing-ring-medium'
                    : 'pulsing-ring-low';

                  return (
                    <g key={`node-${country}`} className="group cursor-pointer">
                      <circle cx={coords.x} cy={coords.y} r="10" fill="none" className={ringClass} />
                      <circle cx={coords.x} cy={coords.y} r="10" fill="none" className={`${ringClass}-delay`} />
                      
                      <circle cx={coords.x} cy={coords.y} r="15" fill="url(#nodeGlow)" opacity="0.4" />
                      <circle cx={coords.x} cy={coords.y} r="4.5" fill="#00f0ff" />
                      
                      <text x={coords.x} y={coords.y + 16} fill="#ffffff" className="text-[8px] font-mono font-black tracking-tight text-slate-300 group-hover:text-[#39ff14] transition-colors" textAnchor="middle">
                        {country.toUpperCase()} ({count})
                      </text>
                    </g>
                  );
                })}

              </g>
            </svg>
          </div>
        </div>

        {/* Live Threat Alert Stack (Right Panel - 30% width) */}
        <div className="lg:col-span-3 bg-[#1e222b] border border-slate-800 rounded-none p-4 flex flex-col space-y-3 shadow-xl h-[440px] overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-[#ff003c] animate-pulse" />
              <h2 className="text-sm font-black uppercase tracking-wider">// DYNAMIC_ALERTS</h2>
            </div>
            <span className="text-[8px] font-mono text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/40 px-2 py-0.5 rounded-none font-bold uppercase animate-pulse">STREAMING</span>
          </div>

          {/* Vertical scrollable alerts stream */}
          <div className="flex-1 flex flex-col space-y-2.5 overflow-y-auto pr-1 scrollbar-thin">
            {activeAlerts.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">// ALL ALERTS DISMISSED</span>
              </div>
            ) : (
              activeAlerts.map((threat) => {
                const destIp = getDestIp(threat.targetDevice, threat.port);
                
                const severityStyles = {
                  Low: { badge: 'LOW RISK', color: 'border-blue-900/40 text-blue-400 bg-blue-950/20' },
                  Medium: { badge: 'MEDIUM RISK', color: 'border-yellow-900/30 text-yellow-500 bg-yellow-950/10' },
                  High: { badge: 'HIGH RISK', color: 'border-orange-900/40 text-orange-500 bg-orange-950/20' },
                  Critical: { badge: 'CRITICAL ALERT', color: 'border-[#ff003c]/40 text-[#ff003c] bg-[#ff003c]/10 glow-red animate-pulse' }
                };

                const details = severityStyles[threat.severity] || severityStyles.Low;

                return (
                  <div key={threat.id} className="p-3 bg-[#0b0e14] border border-slate-800/80 hover:border-[#39ff14]/30 transition-all flex flex-col space-y-1 rounded-none relative group">
                    {/* Dismiss Button */}
                    <button
                      onClick={() => setDismissedAlerts(prev => [...prev, threat.id])}
                      className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors cursor-pointer rounded-none"
                      title="Dismiss alert"
                    >
                      <X className="h-3 w-3" />
                    </button>

                    <div className="flex items-center justify-between pr-4">
                      <span className="text-[9px] font-mono font-bold text-slate-500">{threat.id}</span>
                      <span className={`px-1.5 py-0.5 text-[8px] font-mono font-black uppercase border ${details.color}`}>
                        {details.badge}
                      </span>
                    </div>

                    <div className="text-xs font-black uppercase text-white tracking-wide pr-3">
                      {threat.attackType} detected
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400 pt-1">
                      <div>From: <span className="text-green-400 font-bold">{threat.sourceIp}</span></div>
                      <div>To: <span className="text-blue-400 font-bold">{destIp}</span></div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[9px] text-slate-500 font-semibold border-t border-slate-800/60 mt-1">
                      <span>Country: {threat.country.toUpperCase()}</span>
                      <span>Port: {threat.port}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* C. Attack History Section (Scroll Down) */}
      <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4.5 w-4.5 text-[#39ff14]" />
            <h2 className="text-sm font-black uppercase tracking-wider">// ATTACK_HISTORY_TIMELINE</h2>
          </div>
          <span className="text-[9px] font-mono text-slate-500 uppercase font-bold">// SEC_HISTORY_LEDGER</span>
        </div>

        {/* Timeline list layout */}
        <div className="relative border-l border-slate-800 ml-4 pl-6 space-y-6 py-2">
          {threats.slice(0, 6).map((threat, idx) => {
            const isCritical = threat.severity === 'Critical';
            
            // Format time header (e.g. Jul 21, 2026)
            let formattedDateStr = threat.timestamp;
            try {
              const dt = new Date(threat.timestamp.replace(' ', 'T'));
              if (!isNaN(dt.getTime())) {
                formattedDateStr = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              }
            } catch(e) {}

            const riskTags = {
              Low: { text: 'LOW', badgeClass: 'bg-blue-950/20 text-blue-400 border border-blue-900/30' },
              Medium: { text: 'MEDIUM', badgeClass: 'bg-yellow-950/10 text-yellow-500 border border-yellow-900/20' },
              High: { text: 'HIGH', badgeClass: 'bg-orange-950/20 text-orange-400 border border-orange-900/30' },
              Critical: { text: 'CRITICAL', badgeClass: 'bg-[#ff003c]/10 text-[#ff003c] border border-[#ff003c]/40 animate-pulse' }
            };

            const tag = riskTags[threat.severity] || riskTags.Low;

            return (
              <div key={threat.id || idx} className="relative">
                {/* Visual marker node on the line */}
                <span className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                  isCritical ? 'bg-red-500 border-[#0b0e14] animate-ping' : 'bg-slate-700 border-[#0b0e14]'
                }`} />
                
                <span className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                  isCritical ? 'bg-red-500 border-[#0b0e14]' : 'bg-[#39ff14] border-[#0b0e14]'
                }`} />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {formattedDateStr} @ {threat.timestamp.split(' ')[1] || '00:00:00'}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black uppercase text-white tracking-wide">
                        {threat.attackType}
                      </span>
                      <span className={`px-2 py-0.5 text-[8px] font-mono font-black uppercase rounded-none ${tag.badgeClass}`}>
                        {threat.attackType} {tag.text}
                      </span>
                    </div>
                  </div>
                  
                  {/* Explanatory detail log text */}
                  <div className="text-[11px] font-mono text-slate-400 max-w-md">
                    Targeted <span className="text-blue-400">{threat.targetDevice}</span> from origin IP <span className="text-green-400 font-bold">{threat.sourceIp}</span> on port <span className="text-slate-300 font-bold">{threat.port}</span>. status: <span className="text-[#39ff14]">{threat.status}</span>.
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* D. Threat Intelligence Feed Data Table */}
      <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col space-y-4 shadow-xl">
        
        {/* Header Tools */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Server className="h-4.5 w-4.5 text-[#39ff14]" />
            <h2 className="text-sm font-black uppercase tracking-wider">Threat Intelligence Feed</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => {
                  setTableSearch(e.target.value);
                  setTablePage(1);
                }}
                placeholder="Search threats..."
                className="w-full bg-black/60 border border-slate-800 hover:border-slate-500 focus:border-[#39ff14] text-xs font-medium pl-8 pr-3 py-2 text-white focus:outline-none rounded-none placeholder-slate-500"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={tableSeverity}
              onChange={(e) => {
                setTableSeverity(e.target.value);
                setTablePage(1);
              }}
              className="bg-black/60 border border-slate-800 hover:border-slate-500 focus:border-[#39ff14] text-xs font-bold px-3 py-2 text-white focus:outline-none rounded-none cursor-pointer tracking-wider w-full sm:w-auto uppercase"
            >
              <option value="All">ALL SEVERITY</option>
              <option value="Critical">CRITICAL</option>
              <option value="High">HIGH</option>
              <option value="Medium">MEDIUM</option>
              <option value="Low">LOW</option>
            </select>
          </div>
        </div>

        {/* Data Preview Table */}
        <div className="overflow-x-auto w-full max-w-full block scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px] font-bold tracking-wider bg-black/30">
                <th className="py-2.5 px-3">Attacker IP</th>
                <th className="py-2.5 px-3">Target IP</th>
                <th className="py-2.5 px-3">Port</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Device</th>
                <th className="py-2.5 px-3">Country</th>
                <th className="py-2.5 px-3">Location (Lat, Long)</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300 font-mono">
              {currentTableData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 uppercase tracking-widest">
                    No threat records match current search filter criteria.
                  </td>
                </tr>
              ) : (
                currentTableData.map((row, idx) => {
                  const targetIp = getDestIp(row.targetDevice, row.port);
                  const latLong = GEOLOCATIONS[row.country] || '0.00° N, 0.00° E';

                  const severityColors = {
                    Low: 'bg-blue-950/20 text-blue-400 border border-blue-900/30',
                    Medium: 'bg-yellow-950/10 text-yellow-500 border border-yellow-900/20',
                    High: 'bg-orange-950/20 text-orange-400 border border-orange-900/30',
                    Critical: 'bg-[#ff003c]/10 text-[#ff003c] border border-[#ff003c]/40 animate-pulse'
                  };

                  return (
                    <tr key={row.id || idx} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 px-3 text-green-400 font-bold whitespace-nowrap">{row.sourceIp}</td>
                      <td className="py-3 px-3 text-blue-400 font-bold whitespace-nowrap">{targetIp}</td>
                      <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{row.port}</td>
                      <td className="py-3 px-3 text-white font-bold whitespace-nowrap uppercase">{row.attackType}</td>
                      <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{row.targetDevice}</td>
                      <td className="py-3 px-3 text-[#39ff14]/80 whitespace-nowrap font-sans">{row.country}</td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{latLong}</td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 text-[9px] font-sans font-bold uppercase ${severityColors[row.severity]}`}>
                          {row.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{row.timestamp}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredTableThreats.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <div>
              Showing <span className="text-white font-bold">{Math.min(filteredTableThreats.length, (tablePage - 1) * tableRowsPerPage + 1)}</span> to{' '}
              <span className="text-white font-bold">{Math.min(filteredTableThreats.length, tablePage * tableRowsPerPage)}</span> of{' '}
              <span className="text-[#39ff14] font-bold">{filteredTableThreats.length}</span> threats
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setTablePage(prev => Math.max(prev - 1, 1))}
                disabled={tablePage === 1}
                className="p-1.5 border border-slate-800 hover:border-slate-500 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-slate-400 cursor-pointer rounded-none focus:outline-none transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono px-3 text-slate-300">
                Page {tablePage} of {totalTablePages}
              </span>
              <button
                onClick={() => setTablePage(prev => Math.min(prev + 1, totalTablePages))}
                disabled={tablePage === totalTablePages}
                className="p-1.5 border border-slate-800 hover:border-slate-500 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-slate-400 cursor-pointer rounded-none focus:outline-none transition-colors"
                title="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
