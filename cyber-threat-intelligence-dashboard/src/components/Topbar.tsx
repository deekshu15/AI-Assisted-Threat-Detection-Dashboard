import React from 'react';
import { LogOut } from 'lucide-react';
import { ViewType } from '../types';

interface TopbarProps {
  activeTab: ViewType;
  setActiveTab: (tab: ViewType) => void;
  setActiveTool: (tool: any) => void;
  onSignOut: () => void;
  threatsLoaded: boolean;
  isStreamingActive: boolean;
  consoleStatus: 'SYNCED' | 'OFFLINE' | 'TERMINATED';
}

export default function Topbar({ 
  activeTab, 
  setActiveTab, 
  setActiveTool, 
  onSignOut, 
  threatsLoaded,
  isStreamingActive,
  consoleStatus
}: TopbarProps) {
  const tabs: ViewType[] = ['Dashboard', 'Analytics', 'AI Summary', 'AI Recs'];

  const handleTabClick = (tab: ViewType) => {
    setActiveTab(tab);
    // Clear any active tool view when switching main tabs so we show the tab's screen
    setActiveTool(null);
  };

  return (
    <header id="topbar-container" className="h-14 bg-[#1e222b] border-b border-slate-800 flex items-center justify-between px-8 shrink-0 select-none z-10 font-sans">
      {/* Center navigation tabs */}
      <div className="flex items-center gap-6 text-sm font-medium h-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              id={`topbar-tab-${tab.replace(/\s+/g, '-').toLowerCase()}`}
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`h-full flex items-center px-2 text-xs font-bold tracking-widest transition-all uppercase cursor-pointer border-b-2 ${
                isActive
                  ? 'text-[#39ff14] border-[#39ff14] glow-green font-extrabold'
                  : 'text-slate-400 hover:text-[#39ff14] border-transparent'
              }`}
            >
              [ {tab.toUpperCase()} ]
            </button>
          );
        })}
      </div>

      {/* Right status and sign out */}
      <div className="flex items-center gap-4">
        {consoleStatus === 'SYNCED' ? (
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0b0e14] border border-[#39ff14]/30 rounded-none text-[10px] text-[#39ff14] font-bold uppercase glow-box-green">
            <div className="w-1.5 h-1.5 bg-[#39ff14] rounded-none animate-pulse"></div>
            <span className="tracking-wider">CONSOLE: SYNCED</span>
          </div>
        ) : consoleStatus === 'TERMINATED' ? (
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0b0e14] border border-red-500/30 rounded-none text-[10px] text-red-500 font-bold uppercase">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-none"></div>
            <span className="tracking-wider">CONSOLE: TERMINATED</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0b0e14] border border-slate-700 rounded-none text-[10px] text-slate-500 font-bold uppercase">
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-none"></div>
            <span className="tracking-wider">CONSOLE: OFFLINE</span>
          </div>
        )}

        <button
          id="topbar-sign-out-btn"
          onClick={onSignOut}
          className="px-3 py-1 bg-[#0b0e14] border border-[#ff003c]/40 hover:bg-[#ff003c]/10 text-[#ff003c] text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none hover:border-[#ff003c] glow-box-red"
          title="Disconnect Operator Session"
        >
          [ TERMINATE ]
        </button>
      </div>
    </header>
  );
}
