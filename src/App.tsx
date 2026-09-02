import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Views
// Views
import DashboardView from './components/DashboardView';
import AnalyticsView from './components/AnalyticsView';
import AISummaryView from './components/AISummaryView';
import AIRecsView from './components/AIRecsView';
import IPAgentView from './components/IPAgentView';

// Tool Components
import NmapScanner from './components/NmapScanner';
import LiveApiManager from './components/LiveApiManager';
import StaticUpload from './components/StaticUpload';
import SettingsView from './components/SettingsView';
import SleekToolPanels from './components/SleekToolPanels';

// Types and helper functions
import { Threat, ViewType, SidebarToolType } from './types';
import { generateMockThreats } from './data';
import { ShieldAlert, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewType>('Dashboard');
  const [activeTool, setActiveTool] = useState<SidebarToolType | null>(null);
  const [threats, setThreats] = useState<Threat[]>(() => generateMockThreats(18));
  const [streamActive, setStreamActive] = useState<boolean>(false);
  const [isStreamingActive, setIsStreamingActive] = useState<boolean>(false);
  const [consoleStatus, setConsoleStatus] = useState<'SYNCED' | 'OFFLINE' | 'TERMINATED'>('OFFLINE');
  const [toastAlerts, setToastAlerts] = useState<Array<{ id: string; msg: string; severity: string }>>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const simIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Backwards compatibility wrapper for setToast and toastAlerts queue
  const setToast = useCallback((t: { id: string; msg: string; severity: string } | null) => {
    if (t === null) {
      setToastAlerts([]);
    } else {
      setToastAlerts(prev => {
        if (prev.some(x => x.id === t.id)) return prev;
        return [...prev, t].slice(-5); // Keep max 5
      });
      // Auto dismiss after 4 seconds
      setTimeout(() => {
        setToastAlerts(prev => prev.filter(x => x.id !== t.id));
      }, 4000);
    }
  }, []);

  // Load sample dataset
  const handleLoadDemoData = useCallback(() => {
    const demoThreats = generateMockThreats(120);
    setThreats(demoThreats);
    setIsStreamingActive(true);
    setConsoleStatus('SYNCED');
    
    // Trigger toast confirmation
    setToast({
      id: `toast-${Date.now()}`,
      msg: 'Demo mode activated. Loaded 120 security telemetry logs.',
      severity: 'Low'
    });
  }, [setToast]);

  const handleLoadThreats = useCallback((loadedThreats: Threat[]) => {
    setThreats(loadedThreats);
    setIsStreamingActive(true);
    setConsoleStatus('SYNCED');
    setActiveTool(null);
    setActiveTab('Dashboard');
    setToast({
      id: `toast-${Date.now()}`,
      msg: `Telemetry stream successfully synchronized from CSV (${loadedThreats.length} events loaded).`,
      severity: 'Low'
    });
  }, [setToast]);

  const handleClearData = useCallback((isTerminate: boolean = false) => {
    setThreats([]);
    setStreamActive(false);
    setIsStreamingActive(false);
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    setToastAlerts([]);
    
    if (isTerminate) {
      setConsoleStatus('TERMINATED');
      setToast({
        id: `toast-${Date.now()}`,
        msg: 'Security operations console terminated. Session closed.',
        severity: 'Critical'
      });
    } else {
      setConsoleStatus('OFFLINE');
      setToast({
        id: `toast-${Date.now()}`,
        msg: 'Active threat telemetry database flushed.',
        severity: 'Medium'
      });
    }
  }, [setToast]);

  // Set view tab and reset tools
  const handleSetTab = useCallback((tab: ViewType) => {
    setActiveTab(tab);
    setActiveTool(null);
  }, []);

  // Set tool panel
  const handleSetTool = useCallback((tool: SidebarToolType | null) => {
    setActiveTool(tool);
  }, []);

  // Ingest stream threats
  const handleAddLiveThreat = useCallback((threat: Threat) => {
    setThreats(prev => [threat, ...prev].slice(0, 500)); // Cap at 500 records to prevent memory exhaustion

    // Show live alert toast
    setToast({
      id: `toast-${Date.now()}`,
      msg: `INGRESS ALERT: [${threat.severity.toUpperCase()}] ${threat.attackType} from IP ${threat.sourceIp}`,
      severity: threat.severity
    });
  }, [setToast]);

  // Custom setter for streamActive that also syncs streaming active state and status
  const handleSetStreamActive = useCallback((active: boolean) => {
    setStreamActive(active);
    setIsStreamingActive(active);
    if (active) {
      setConsoleStatus('SYNCED');
    } else {
      setConsoleStatus('OFFLINE');
    }
  }, []);

  // Real-Time Telemetry Simulation (Live Streaming Effect)
  useEffect(() => {
    if (isStreamingActive) {
      simIntervalRef.current = setInterval(() => {
        const newThreats = generateMockThreats(1);
        if (newThreats.length > 0) {
          const newThreat = newThreats[0];
          const now = new Date();
          const hour = now.getHours().toString().padStart(2, '0');
          const min = now.getMinutes().toString().padStart(2, '0');
          const sec = now.getSeconds().toString().padStart(2, '0');
          const formattedTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${hour}:${min}:${sec}`;
          
          const customThreat: Threat = {
            ...newThreat,
            id: `TR-${Math.floor(Math.random() * 90000) + 10000}`,
            timestamp: formattedTime
          };

          setThreats(prev => [customThreat, ...prev].slice(0, 500));
          
          setToast({
            id: `toast-${Date.now()}`,
            msg: `INGRESS ALERT: [${customThreat.severity.toUpperCase()}] ${customThreat.attackType} from IP ${customThreat.sourceIp}`,
            severity: customThreat.severity
          });
        }
      }, 4000);
    } else {
      if (simIntervalRef.current) {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
      }
    }

    return () => {
      if (simIntervalRef.current) {
        clearInterval(simIntervalRef.current);
      }
    };
  }, [isStreamingActive, setToast]);

  // Main active view switcher
  const renderWorkspace = () => {
    if (activeTool) {
      switch (activeTool) {
        case 'Static Data':
          return (
            <StaticUpload 
              onLoadThreats={handleLoadThreats} 
              threatsLoaded={threats.length > 0} 
              onClearData={handleClearData} 
            />
          );
        case 'Live API':
          return (
            <LiveApiManager 
              onAddThreat={handleAddLiveThreat} 
              streamActive={streamActive} 
              setStreamActive={handleSetStreamActive} 
            />
          );
        case 'Nmap':
          return <NmapScanner />;
        case 'Settings':
          return <SettingsView onClearData={handleClearData} />;
        case 'Cyber AI Agent':
          return <IPAgentView threats={threats} />;
        default:
          return <SleekToolPanels toolName={activeTool} />;
      }
    }

    // Standard view routing
    switch (activeTab) {
      case 'Dashboard':
        return (
          <DashboardView 
            threats={threats} 
            onLoadDemoData={handleLoadDemoData} 
            onSetTool={handleSetTool} 
            onClearData={handleClearData} 
          />
        );
      case 'Analytics':
        return <AnalyticsView threats={threats} />;
      case 'AI Summary':
        return <AISummaryView threats={threats} />;
      case 'AI Recs':
        return <AIRecsView threats={threats} />;
      case 'Cyber AI Agent':
        return <IPAgentView threats={threats} />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-black border border-[#00ff41]/30 text-[#00ff41] rounded-none">
            <span className="text-xs uppercase tracking-widest font-mono">Workspace viewport unavailable.</span>
          </div>
        );
    }
  };

  return (
    <div id="cyber-dashboard-root" className="flex flex-col md:flex-row h-screen w-screen bg-black overflow-hidden select-none font-sans relative text-[#39ff14]">
      
      {/* CRT overlay effect for authentic hacker terminal display */}
      <div className="crt-overlay crt-flicker"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-50"></div>

      {/* Mobile Action Header - sticky top bar visible ONLY on mobile */}
      <div className="flex md:hidden sticky top-0 z-30 h-14 w-full bg-[#1e222b] border-b border-slate-800 items-center justify-between px-4 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0b0e14] border border-[#39ff14]/30 flex items-center justify-center glow-box-green">
            <ShieldAlert className="h-4.5 w-4.5 text-[#39ff14] filter drop-shadow-[0_0_3px_#39ff14]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs tracking-wider text-[#39ff14] uppercase glow-green">AI Threat Intelligence</span>
            <span className="text-[8px] text-slate-400 uppercase font-bold tracking-tight">Created by VK</span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-1.5 text-[#39ff14] bg-[#0b0e14] border border-slate-800 hover:border-[#39ff14]/50 transition-colors focus:outline-none cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Interactive Mobile Slide-Out Drawer with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Tap-to-dismiss background overlay mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Smooth slide-out drawer panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-64 max-w-xs bg-[#1e222b] h-full flex flex-col z-50 border-r border-slate-800 shadow-2xl overflow-hidden"
            >
              {/* Close button inside drawer */}
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 bg-[#0b0e14] border border-slate-800 text-slate-400 hover:text-[#39ff14] transition-colors cursor-pointer focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <Sidebar
                activeTab={activeTab}
                activeTool={activeTool}
                setActiveTab={handleSetTab}
                setActiveTool={handleSetTool}
                isMobileDrawer={true}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Persistent sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        activeTool={activeTool} 
        setActiveTab={handleSetTab} 
        setActiveTool={handleSetTool} 
      />

      {/* Main content body */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative bg-black overflow-hidden">
        
        {/* Dynamic header */}
        <Topbar 
          activeTab={activeTab} 
          setActiveTab={handleSetTab} 
          setActiveTool={handleSetTool} 
          onSignOut={() => handleClearData(true)} 
          threatsLoaded={threats.length > 0} 
          isStreamingActive={isStreamingActive}
          consoleStatus={consoleStatus}
        />

        {/* Dynamic scrollable content area */}
        <div className="flex-1 flex flex-col min-h-0 bg-black border-t border-[#39ff14]/20">
          {renderWorkspace()}
        </div>
      </div>

      {/* Floating security alert toasts stack */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-50 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toastAlerts.map((alert) => (
            <motion.div
              id={`security-alert-toast-${alert.id}`}
              key={alert.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-none shadow-[0_0_15px_rgba(255,0,60,0.2)] border flex items-start gap-3 pointer-events-auto ${
                alert.severity === 'Critical'
                  ? 'bg-black border-[#ff003c] text-[#ff003c] glow-box-red'
                  : alert.severity === 'High'
                  ? 'bg-black border-[#ff003c]/70 text-orange-500'
                  : 'bg-black border-[#00ff41] text-[#00ff41] glow-box-green'
              }`}
            >
              <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${
                alert.severity === 'Critical' ? 'text-[#ff003c] animate-pulse' : 'text-[#00ff41]'
              }`} />
              <div className="space-y-1">
                <h5 className="text-xs font-black uppercase tracking-wider font-mono">
                  {alert.severity === 'Critical' || alert.severity === 'High' ? '!! SECURITY ALERT INGRESS !!' : '>> SYSTEM LOG UPDATE'}
                </h5>
                <p className="text-[11px] leading-relaxed font-mono">{alert.msg}</p>
              </div>
              <button 
                onClick={() => setToastAlerts(prev => prev.filter(t => t.id !== alert.id))}
                className="text-gray-500 hover:text-white shrink-0 ml-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
