import React, { useState } from 'react';
import { Settings, Bell, Zap, Save, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

interface SettingsViewProps {
  onClearData: () => void;
}

export default function SettingsView({ onClearData }: SettingsViewProps) {
  const [alerts, setAlerts] = useState(true);
  const [autoBlock, setAutoBlock] = useState(true);
  const [retention, setRetention] = useState('30 Days');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = () => {
    setSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 800);
  };

  return (
    <div id="settings-workspace" className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0b0e14] text-white space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
          <Settings className="h-6 w-6 text-[#39ff14]" />
          <span>SECURITY <span className="text-[#39ff14] glow-green">SETTINGS_PANEL</span></span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">Configure compliance filters, automated routing rules, firewall criteria, and database caching limits.</p>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-6 flex-1 flex flex-col justify-center py-6">
        
        {/* Save success notice */}
        {saveSuccess && (
          <div className="p-3.5 bg-[#1e222b] border border-[#39ff14] text-[#39ff14] rounded-none flex items-center gap-2.5 text-xs animate-fadeIn glow-box-green font-bold">
            <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
            <span>[+] SETTINGS SAVED AND COMMITTED SUCCESSFULLY! FIREWALL INTEGRATION SYNCED.</span>
          </div>
        )}

        {/* Configuration settings list */}
        <div className="bg-[#1e222b] border border-slate-800 rounded-none p-6 space-y-6 shadow-xl">
          
          {/* Section 1: Notifications */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 pr-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Bell className="h-4 w-4 text-[#39ff14]" />
                <span>ALERT_NOTIFICATIONS</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed uppercase font-medium">
                TRIGGER LIVE CONSOLE LOGS WHEN CRITICAL CVE INTRUSIONS TARGET HOST HUBS.
              </p>
            </div>
            {/* Binary text toggle */}
            <button
              id="toggle-alerts-btn"
              onClick={() => setAlerts(!alerts)}
              className={`px-3 py-1 text-xs font-bold border rounded-none transition-all cursor-pointer uppercase shrink-0 ${
                alerts 
                  ? 'bg-[#39ff14]/10 border-[#39ff14] text-[#39ff14] glow-green' 
                  : 'bg-[#0b0e14] border-red-900/60 text-red-500'
              }`}
            >
              {alerts ? '[ ACTIVE ]' : '[ MUTED ]'}
            </button>
          </div>

          <hr className="border-slate-800" />

          {/* Section 2: Auto-Block */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 pr-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#39ff14]" />
                <span>AUTO_BLOCK_CRITICAL_CVE</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed uppercase font-medium">
                AUTOMATICALLY UPDATE IPTABLES FIREWALL ENTRIES ON TARGET SOCKET DETECTIONS.
              </p>
            </div>
            {/* Binary text toggle */}
            <button
              id="toggle-autoblock-btn"
              onClick={() => setAutoBlock(!autoBlock)}
              className={`px-3 py-1 text-xs font-bold border rounded-none transition-all cursor-pointer uppercase shrink-0 ${
                autoBlock 
                  ? 'bg-[#39ff14]/10 border-[#39ff14] text-[#39ff14] glow-green' 
                  : 'bg-[#0b0e14] border-red-900/60 text-red-500'
              }`}
            >
              {autoBlock ? '[ ENABLED ]' : '[ DISABLED ]'}
            </button>
          </div>

          <hr className="border-slate-800" />

          {/* Section 3: Data Retention */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 pr-4">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Settings className="h-4 w-4 text-[#39ff14]" />
                <span>CACHE_RETENTION_DURATION</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed uppercase font-medium">
                DEFINES FLUSH THRESHOLDS FOR INBOUND RAW ATTACK DATABASE BUFFER LOGS.
              </p>
            </div>
            <select
              id="retention-scope-select"
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
              className="bg-[#0b0e14] border border-slate-800 rounded-none px-3 py-2 text-xs text-[#39ff14] focus:outline-none focus:border-[#39ff14] cursor-pointer font-bold uppercase shrink-0"
            >
              <option>7 Days</option>
              <option>30 Days</option>
              <option>90 Days</option>
              <option>Forever</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              id="settings-save-btn"
              onClick={handleSaveSettings}
              disabled={saving}
              className="flex items-center gap-2 bg-[#0b0e14] border border-slate-800 hover:border-[#39ff14] text-white hover:text-[#39ff14] px-5 py-2.5 rounded-none font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer glow-box-green hover-glow"
            >
              {saving ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>COMMITTING_CHANGES...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>COMMIT_SETTINGS</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Danger Zone: Reset Data */}
        <div className="bg-[#1e222b] border border-[#ff003c]/40 rounded-none p-6 space-y-4 shadow-xl glow-box-red">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[#ff003c] shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">!! WARNING_DANGER_ZONE !!</h4>
              <p className="text-xs text-slate-400 leading-relaxed uppercase font-medium">
                RESETTING THE DATA BUFFER WILL INSTANTLY PURGE ALL DETECTED SECOPS TELEMETRY INDEXES IN ACTIVE MEMORY. THIS OPERATION IS IRREVERSIBLE AND FLUSHES GRAPHING VIEWS.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end pt-2 border-t border-[#ff003c]/20">
            <button
              id="settings-danger-reset-btn"
              onClick={onClearData}
              className="bg-[#0b0e14] hover:bg-[#ff003c]/10 border border-[#ff003c] text-[#ff003c] px-5 py-2.5 rounded-none font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              FLUSH_THREAT_DATABASES
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
