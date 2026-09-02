import React, { useState, useMemo } from 'react';
import { 
  BarChart2, Calendar, Globe, Download, TrendingUp, ShieldAlert, Laptop
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend 
} from 'recharts';
import { Threat } from '../types';
import { COUNTRIES, generateMockThreats } from '../data';

interface AnalyticsViewProps {
  threats: Threat[];
}

// Custom radial label drawing function for donut chart
const renderCustomLabel = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, fill, percent, name } = props;
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 18) * cos;
  const my = cy + (outerRadius + 18) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={1.5} />
      <circle cx={ex} cy={ey} r={2.5} fill={fill} />
      <text 
        x={ex + (cos >= 0 ? 1 : -1) * 6} 
        y={ey} 
        dy={3}
        textAnchor={textAnchor} 
        fill="#ffffff" 
        className="font-sans font-extrabold text-[10px] uppercase tracking-wider"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

export default function AnalyticsView({ threats }: AnalyticsViewProps) {
  const [timeFilter, setTimeFilter] = useState('Last 24h');
  const [countryFilter, setCountryFilter] = useState('All Countries');

  // Generate a stable dummy dataset once on mount to prevent any flickering
  const staticDummyThreats = useMemo(() => {
    return generateMockThreats(120);
  }, []);

  // Use live threats if loaded, otherwise immediately fall back to the stable dummy dataset
  const activeThreats = useMemo(() => {
    if (threats && threats.length > 0) {
      return threats;
    }
    return staticDummyThreats;
  }, [threats, staticDummyThreats]);

  // Filter threats based on country input
  const filteredThreats = useMemo(() => {
    return activeThreats.filter(t => {
      if (countryFilter !== 'All Countries' && t.country !== countryFilter) {
        return false;
      }
      return true;
    });
  }, [activeThreats, countryFilter]);

  // --- 1. Attack Type Frequency Panel ---
  // Dynamically group records by attack_type and plot the exact count
  const attackFrequency = useMemo(() => {
    const counts = filteredThreats.reduce((acc, t) => {
      const type = t.attackType || 'Other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value: value as number
    })).sort((a, b) => (b.value as number) - (a.value as number));
  }, [filteredThreats]);

  // --- 2. Country Distribution Panel ---
  // Dynamically aggregate percentage breakdown by country
  const countryDistribution = useMemo(() => {
    const total = filteredThreats.length;
    const counts = filteredThreats.reduce((acc, t) => {
      const country = t.country || 'Other';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => {
      const val = value as number;
      const percentage = total ? Math.round((val / total) * 100) : 0;
      return { name, value: val, percentage };
    }).sort((a, b) => (b.value as number) - (a.value as number));
  }, [filteredThreats]);

  // --- 3. Attack Trends Over Time Panel ---
  // Parse timestamps to aggregate attack frequency by hour block
  const trendsOverTime = useMemo(() => {
    const hours = ['01:00', '03:00', '05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'];
    
    const parsedTrends = filteredThreats.reduce((acc, t) => {
      let hr = 12;
      try {
        if (t.timestamp.includes('T')) {
          hr = new Date(t.timestamp).getHours();
        } else {
          const parts = t.timestamp.split(' ');
          if (parts[1]) {
            hr = parseInt(parts[1].split(':')[0], 10);
          }
        }
      } catch (e) {
        hr = 12;
      }
      if (isNaN(hr)) hr = 12;

      if (!acc[hr]) {
        acc[hr] = { Cyan: 0, Green: 0, Red: 0 };
      }
      if (t.severity === 'Critical') acc[hr].Red++;
      else if (t.severity === 'High') acc[hr].Cyan++;
      else acc[hr].Green++;

      return acc;
    }, {} as Record<number, { Cyan: number; Green: number; Red: number }>);

    return hours.map(h => {
      const hourNum = parseInt(h.split(':')[0], 10);
      // Sum counts within [hourNum - 1, hourNum + 1] to smooth curves
      let cyanCount = 0;
      let greenCount = 0;
      let redCount = 0;

      for (let offset = -1; offset <= 1; offset++) {
        const targetHr = (hourNum + offset + 24) % 24;
        if (parsedTrends[targetHr]) {
          cyanCount += parsedTrends[targetHr].Cyan;
          greenCount += parsedTrends[targetHr].Green;
          redCount += parsedTrends[targetHr].Red;
        }
      }

      return {
        hour: h,
        Cyan: cyanCount,
        Green: greenCount,
        Red: redCount,
      };
    });
  }, [filteredThreats]);

  // --- 4. Device-wise Attacks Panel ---
  // Group and sum incident counts by target_device
  const deviceAttacks = useMemo(() => {
    const counts = filteredThreats.reduce((acc, t) => {
      const dev = t.targetDevice || 'Unknown';
      acc[dev] = (acc[dev] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value: value as number
    })).sort((a, b) => (b.value as number) - (a.value as number));
  }, [filteredThreats]);

  // --- 5. Severity Breakdown Panel ---
  // Calculate the ratio of Critical, High, Medium, and Low severity events
  const severityBreakdown = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    
    const hourCounts = filteredThreats.reduce((acc, t) => {
      let hr = 12;
      try {
        if (t.timestamp.includes('T')) {
          hr = new Date(t.timestamp).getHours();
        } else {
          const parts = t.timestamp.split(' ');
          if (parts[1]) {
            hr = parseInt(parts[1].split(':')[0], 10);
          }
        }
      } catch (e) {
        hr = 12;
      }
      if (isNaN(hr)) hr = 12;

      if (!acc[hr]) {
        acc[hr] = { Critical: 0, High: 0, Medium: 0, Low: 0 };
      }
      if (['Critical', 'High', 'Medium', 'Low'].includes(t.severity)) {
        acc[hr][t.severity]++;
      } else {
        acc[hr].Medium++;
      }
      return acc;
    }, {} as Record<number, { Critical: number; High: number; Medium: number; Low: number }>);

    return hours.map((h, hourPart) => {
      const counts = hourCounts[hourPart] || { Critical: 0, High: 0, Medium: 0, Low: 0 };
      return {
        hour: h,
        High: counts.High,
        Critical: counts.Critical,
        Medium: counts.Medium,
        Low: counts.Low
      };
    });
  }, [filteredThreats]);

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredThreats, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `threat_intelligence_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const donutColors = [
    '#39ff14', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e', '#6366f1', 
    '#a855f7', '#06b6d4'
  ];

  return (
    <div id="analytics-workspace-container" className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#0b0e14] text-white space-y-4 md:space-y-6 font-sans">
      
      {/* Upper header filter bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            ANALYTICS <span className="text-[#39ff14] glow-green">DASHBOARD</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">
            Security posture metrics and payload delivery distribution arrays.
          </p>
        </div>

        {/* Dropdowns + Export */}
        <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
          {/* Time Filter */}
          <div className="relative">
            <select
              id="analytics-time-filter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] rounded-none px-3 py-1.5 text-xs text-[#e0f2fe] focus:outline-none focus:border-[#39ff14] appearance-none pr-8 font-bold uppercase cursor-pointer transition-all"
            >
              <option>Last 24h</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
            <Calendar className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Country Filter */}
          <div className="relative">
            <select
              id="analytics-country-filter"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] rounded-none px-3 py-1.5 text-xs text-[#e0f2fe] focus:outline-none focus:border-[#39ff14] appearance-none pr-8 font-bold uppercase cursor-pointer transition-all"
            >
              <option value="All Countries">All Countries</option>
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <Globe className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Export Button */}
          <button
            id="analytics-export-btn"
            onClick={handleExport}
            className="flex items-center gap-1.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] hover:text-[#39ff14] text-white px-3.5 py-1.5 rounded-none text-xs font-bold uppercase transition-all cursor-pointer glow-box-green hover-glow"
          >
            <Download className="h-3.5 w-3.5" />
            <span>EXPORT_DATA</span>
          </button>
        </div>
      </div>

      {/* Grid Row 1: Attack Type Bar Chart & Country Donut Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
        {/* 1. Attack Type Frequency Panel */}
        <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#e0f2fe] flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-[#39ff14]" />
              <span>1. ATTACK TYPE FREQUENCY</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">VERTICAL BAR ARRAY</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attackFrequency} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.4} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={{ stroke: '#ffffff', strokeWidth: 1.5 }} 
                  axisLine={{ stroke: '#ffffff', strokeWidth: 1.5 }}
                  tick={{ fill: '#ffffff', fontWeight: 'bold' }}
                />
                <YAxis 
                  stroke="#ffffff" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={{ stroke: '#ffffff', strokeWidth: 1.5 }} 
                  axisLine={{ stroke: '#ffffff', strokeWidth: 1.5 }} 
                  tick={{ fill: '#ffffff', fontWeight: 'bold' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e222b', borderColor: '#39ff14', border: '2px solid #39ff14', borderRadius: '0px' }}
                  labelStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '11px' }}
                  itemStyle={{ color: '#39ff14', fontWeight: 'bold', fontSize: '11px' }}
                />
                <Bar dataKey="value" fill="#39ff14" barSize={38} radius={[2, 2, 0, 0]}>
                  {attackFrequency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#39ff14" fillOpacity={0.85} className="hover:fill-opacity-100 cursor-pointer" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Country Distribution Panel */}
        <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#e0f2fe] flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#39ff14]" />
              <span>2. COUNTRY DISTRIBUTION</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">DONUT PERCENTAGE</span>
          </div>

          <div className="h-72 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 15, bottom: 15, left: 10, right: 10 }}>
                <Pie
                  data={countryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                  label={renderCustomLabel}
                  labelLine={false}
                >
                  {countryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={donutColors[index % donutColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e222b', borderColor: '#39ff14', border: '2px solid #39ff14', borderRadius: '0px' }}
                  itemStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Central Text HUD */}
            <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">TOTAL</span>
              <span className="text-sm font-black text-white glow-green">100%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grid Row 2: Attack Trends Over Time & Device-wise Attacks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

        {/* 3. Attack Trends Over Time Panel */}
        <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#e0f2fe] flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#39ff14]" />
              <span>3. ATTACK TRENDS OVER TIME</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">24H DUAL SEVERITY LINES</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendsOverTime} margin={{ top: 15, right: 15, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.4} />
                <XAxis 
                  dataKey="hour" 
                  stroke="#ffffff" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={{ stroke: '#ffffff', strokeWidth: 1.5 }} 
                  axisLine={{ stroke: '#ffffff', strokeWidth: 1.5 }}
                  tick={{ fill: '#ffffff', fontWeight: 'bold' }}
                />
                <YAxis 
                  stroke="#ffffff" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={{ stroke: '#ffffff', strokeWidth: 1.5 }} 
                  axisLine={{ stroke: '#ffffff', strokeWidth: 1.5 }}
                  tick={{ fill: '#ffffff', fontWeight: 'bold' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e222b', borderColor: '#39ff14', border: '2px solid #39ff14', borderRadius: '0px' }}
                  labelStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '11px' }}
                  itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                />
                <Legend 
                  iconType="circle" 
                  wrapperStyle={{ fontSize: '10px', marginTop: '10px', color: '#ffffff', fontWeight: 'bold' }} 
                  formatter={(value) => <span className="text-white font-bold uppercase tracking-wider">{value}</span>}
                />
                <Line name="Cyan Anomaly" type="monotone" dataKey="Cyan" stroke="#39ff14" strokeWidth={3} dot={{ r: 2, fill: '#39ff14' }} activeDot={{ r: 5 }} />
                <Line name="Green Anomaly" type="monotone" dataKey="Green" stroke="#00ff88" strokeWidth={3} dot={{ r: 2, fill: '#00ff88' }} activeDot={{ r: 5 }} />
                <Line name="Red Anomaly" type="monotone" dataKey="Red" stroke="#ff003c" strokeWidth={3} dot={{ r: 2, fill: '#ff003c' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Device-wise Attacks Panel */}
        <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#e0f2fe] flex items-center gap-2">
              <Laptop className="h-4 w-4 text-[#39ff14]" />
              <span>4. DEVICE-WISE ATTACKS</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">HORIZONTAL SOLID BLUE BARS</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={deviceAttacks} 
                layout="vertical" 
                margin={{ top: 15, right: 15, left: 25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.4} horizontal={false} />
                <XAxis 
                  type="number" 
                  stroke="#ffffff" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={{ stroke: '#ffffff', strokeWidth: 1.5 }} 
                  axisLine={{ stroke: '#ffffff', strokeWidth: 1.5 }}
                  tick={{ fill: '#ffffff', fontWeight: 'bold' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#ffffff" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={{ stroke: '#ffffff', strokeWidth: 1.5 }} 
                  axisLine={{ stroke: '#ffffff', strokeWidth: 1.5 }}
                  tick={{ fill: '#ffffff', fontWeight: 'bold' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e222b', borderColor: '#0052ff', border: '2px solid #0052ff', borderRadius: '0px' }}
                  labelStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '11px' }}
                  itemStyle={{ color: '#0052ff', fontWeight: 'bold', fontSize: '11px' }}
                />
                <Bar dataKey="value" fill="#0052ff" barSize={18} radius={[0, 2, 2, 0]}>
                  {deviceAttacks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#0052ff" fillOpacity={0.9} className="hover:fill-opacity-100 cursor-pointer" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Grid Row 3: Severity Breakdown Area Chart */}
      <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col space-y-4 shadow-xl">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#39ff14]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-[#e0f2fe]">5. SEVERITY BREAKDOWN WAVES</h3>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">TIMELINE DATA SPICE GRAVITIES</span>
        </div>

        {/* Full-width Area Chart with glowing gradients */}
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={severityBreakdown} margin={{ top: 15, right: 15, left: -25, bottom: 5 }}>
              <defs>
                <linearGradient id="cyanWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39ff14" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="#39ff14" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="redWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff003c" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="#ff003c" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="mediumWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.4} />
              <XAxis 
                dataKey="hour" 
                stroke="#ffffff" 
                fontSize={10} 
                fontWeight="bold"
                tickLine={{ stroke: '#ffffff', strokeWidth: 1.5 }} 
                axisLine={{ stroke: '#ffffff', strokeWidth: 1.5 }}
                tick={{ fill: '#ffffff', fontWeight: 'bold' }}
              />
              <YAxis 
                stroke="#ffffff" 
                fontSize={10} 
                fontWeight="bold"
                tickLine={{ stroke: '#ffffff', strokeWidth: 1.5 }} 
                axisLine={{ stroke: '#ffffff', strokeWidth: 1.5 }}
                tick={{ fill: '#ffffff', fontWeight: 'bold' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e222b', borderColor: '#39ff14', border: '2px solid #39ff14', borderRadius: '0px' }}
                labelStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '11px' }}
                itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
              />
              <Legend 
                iconType="circle" 
                wrapperStyle={{ fontSize: '10px', marginTop: '10px', color: '#ffffff', fontWeight: 'bold' }} 
                formatter={(value) => <span className="text-white font-bold uppercase tracking-wider">{value}</span>}
              />
              <Area name="High Severity (Large Cyan Wave)" type="monotone" dataKey="High" stroke="#39ff14" fillOpacity={1} fill="url(#cyanWave)" strokeWidth={2.5} />
              <Area name="Critical Severity (Smaller Red Wave)" type="monotone" dataKey="Critical" stroke="#ff003c" fillOpacity={1} fill="url(#redWave)" strokeWidth={2.5} />
              <Area name="Medium Severity (Green Wave)" type="monotone" dataKey="Medium" stroke="#00ff88" fillOpacity={1} fill="url(#mediumWave)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
