import React, { useState } from 'react';
import { 
  Shield, Search, Cpu, Database, Network, Key, Settings, Barcode, Wifi, 
  Terminal, BarChart2, Brain, ShieldAlert, ChevronDown, ChevronRight, FileText,
  AlertOctagon, Eye, EyeOff, Folder, Cpu as CoreIcon, Play, Radio, Database as DatabaseIcon
} from 'lucide-react';
import { SidebarToolType, ViewType } from '../types';

interface SidebarProps {
  activeTool: SidebarToolType | null;
  setActiveTool: (tool: SidebarToolType | null) => void;
  activeTab: ViewType;
  setActiveTab: (tab: ViewType) => void;
  isMobileDrawer?: boolean;
  onClose?: () => void;
}

interface MenuItem {
  name: SidebarToolType;
  icon: React.ComponentType<any>;
  label: string;
}

interface CollapsibleCategory {
  title: string;
  items: MenuItem[];
}

export default function Sidebar({ activeTool, setActiveTool, activeTab, setActiveTab, isMobileDrawer = false, onClose }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Vulnerability Assessment': false,
    'Penetration Testing': false,
    'Web Application Security': false,
    'SIEM & Monitoring': false,
    'Digital Forensics': false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const coreTools: MenuItem[] = [
    { name: 'Static Data', icon: FileText, label: 'Static Data' },
    { name: 'Live API', icon: Radio, label: 'Live API' },
    { name: 'REST API', icon: Network, label: 'REST API' },
    { name: 'Image Scan', icon: Eye, label: 'Image Scan' },
    { name: 'Barcode', icon: Barcode, label: 'Barcode' },
    { name: 'Nmap', icon: Terminal, label: 'Nmap' },
    { name: 'Statistics', icon: BarChart2, label: 'Statistics' },
    { name: 'Settings', icon: Settings, label: 'Settings' }
  ];

  const pages: MenuItem[] = [
    { name: 'API Keys', icon: Key, label: 'API Keys' },
    { name: 'AI Summary', icon: Brain, label: 'AI Summary' },
    { name: 'AI Recs', icon: ShieldAlert, label: 'AI Recs' }
  ];

  const securityTools: CollapsibleCategory[] = [
    {
      title: 'Vulnerability Assessment',
      items: [
        { name: 'OpenVAS', icon: Shield, label: 'OpenVAS' },
        { name: 'Nikto', icon: Eye, label: 'Nikto' }
      ]
    },
    {
      title: 'Penetration Testing',
      items: [
        { name: 'Metasploit Framework', icon: Terminal, label: 'Metasploit Framework' },
        { name: 'SQLmap', icon: Database, label: 'SQLmap' },
        { name: 'John the Ripper', icon: Cpu, label: 'John the Ripper' }
      ]
    },
    {
      title: 'Web Application Security',
      items: [
        { name: 'OWASP ZAP', icon: Shield, label: 'OWASP ZAP' },
        { name: 'Wapiti', icon: Eye, label: 'Wapiti' }
      ]
    },
    {
      title: 'SIEM & Monitoring',
      items: [
        { name: 'Wazuh', icon: Radio, label: 'Wazuh' },
        { name: 'Snort', icon: ShieldAlert, label: 'Snort' }
      ]
    },
    {
      title: 'Digital Forensics',
      items: [
        { name: 'Autopsy', icon: Folder, label: 'Autopsy' },
        { name: 'Volatility', icon: Cpu, label: 'Volatility' }
      ]
    }
  ];

  const handleToolClick = (toolName: SidebarToolType) => {
    setActiveTool(toolName);
    
    // Auto-switch tabs based on core navigation logic if relevant
    if (toolName === 'AI Summary') {
      setActiveTab('AI Summary');
      setActiveTool(null);
    } else if (toolName === 'AI Recs') {
      setActiveTab('AI Recs');
      setActiveTool(null);
    } else if (toolName === 'Statistics') {
      setActiveTab('Analytics');
      setActiveTool(null);
    }

    if (onClose) {
      onClose();
    }
  };

  const matchesSearch = (label: string) => {
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const renderMenuItem = (item: MenuItem, isSubItem = false) => {
    const isSelected = activeTool === item.name;
    const Icon = item.icon;
    
    if (searchQuery && !matchesSearch(item.label)) {
      return null;
    }

    return (
      <button
        id={`sidebar-tool-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
        key={item.name}
        onClick={() => handleToolClick(item.name)}
        className={`sidebar-item w-full flex items-center justify-between px-3 py-1.5 text-xs font-sans rounded-none border transition-all cursor-pointer ${
          isSubItem ? 'pl-8' : 'pl-3'
        } ${
          isSelected 
            ? 'bg-[#0b0e14] text-[#39ff14] border-[#39ff14] glow-box-green font-bold' 
            : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-800/40 hover:text-[#39ff14]'
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-[#39ff14] filter drop-shadow-[0_0_2px_#39ff14]' : 'text-slate-400'}`} />
          <span className="uppercase tracking-wider">{item.label}</span>
        </div>
      </button>
    );
  };

  const isIpAgentSelected = activeTool === 'Cyber AI Agent';

  return (
    <aside
      id="sidebar-container"
      className={
        isMobileDrawer
          ? "w-full bg-[#1e222b] flex flex-col h-full text-slate-300 select-none overflow-y-auto scrollbar-none font-sans"
          : "hidden md:flex w-64 bg-[#1e222b] border-r border-slate-800 flex-col h-screen text-slate-300 select-none shrink-0 overflow-y-auto scrollbar-none font-sans"
      }
    >
      
      <div className="p-5 flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 bg-[#0b0e14] border border-[#39ff14]/30 flex items-center justify-center glow-box-green">
            <ShieldAlert className="h-5 w-5 text-[#39ff14] filter drop-shadow-[0_0_3px_#39ff14]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-wider text-[#39ff14] uppercase glow-green">AI Threat Intelligence</span>
            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Created by VK</span>
          </div>
        </div>

        {/* Search tool */}
        <div className="mb-6">
          <div className="text-[10px] text-slate-400 mb-1.5 font-bold uppercase tracking-wider">LOCATE SECURITY TOOL</div>
          <div className="relative flex items-center bg-[#0b0e14] border border-slate-800 px-2.5 py-1.5 focus-within:border-[#39ff14]/40 transition-all">
            <span className="text-[#39ff14] mr-1.5 font-bold">&gt;</span>
            <input
              id="sidebar-search-input"
              type="text"
              placeholder="SEARCH_INDEX..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-500 text-xs focus:outline-none uppercase font-bold"
            />
          </div>
        </div>

        {/* IP Agent Switcher */}
        <div 
          className={`flex items-center justify-between p-2.5 mb-6 cursor-pointer border transition-all ${
            isIpAgentSelected 
              ? 'bg-[#ff003c]/10 border-[#ff003c] text-[#ff003c] glow-box-red' 
              : 'bg-[#0b0e14] border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
          onClick={() => handleToolClick('Cyber AI Agent')}
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${isIpAgentSelected ? 'bg-[#ff003c] animate-ping' : 'bg-slate-500'}`}></div>
            <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isIpAgentSelected ? 'text-[#ff003c] glow-red' : 'text-slate-300'}`}>CYBER AI AGENT</span>
          </div>
          <span className="text-[8px] font-bold px-1 border border-current">{isIpAgentSelected ? 'ONLINE' : 'STBY'}</span>
        </div>

        {/* Sidebar Tools Categories */}
        <div className="space-y-6 flex-1">
          {/* Core Tools Category */}
          <section>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2 px-1 tracking-widest border-b border-slate-800 pb-0.5">// CORE PROTOCOLS</h4>
            <div className="space-y-0.5">
              {coreTools.map(item => renderMenuItem(item))}
            </div>
          </section>

          {/* Pages Category */}
          <section>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2 px-1 tracking-widest border-b border-slate-800 pb-0.5">// INTEL NODES</h4>
            <div className="space-y-0.5">
              {pages.map(item => renderMenuItem(item))}
            </div>
          </section>

          {/* Security Tools (Collapsible) */}
          <section>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2 px-1 tracking-widest border-b border-slate-800 pb-0.5">// SEC AUDITING</h4>
            <div className="space-y-0.5">
              {securityTools.map((sec, idx) => {
                const isOpen = openSections[sec.title];
                const visibleItems = sec.items.filter(item => !searchQuery || matchesSearch(item.label));
                
                if (searchQuery && visibleItems.length === 0) {
                  return null;
                }

                return (
                  <div key={idx} className="space-y-0.5">
                    <button
                      id={`sidebar-category-${sec.title.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => toggleSection(sec.title)}
                      className="sidebar-item w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold rounded-none text-slate-400 border border-transparent hover:border-slate-800 hover:text-white hover:bg-slate-800/20 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-slate-400" />
                        <span className="uppercase tracking-wider">{sec.title}</span>
                      </div>
                      {isOpen ? <ChevronDown className="h-3.5 w-3.5 text-slate-400" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                    </button>
                    {(isOpen || searchQuery) && (
                      <div className="space-y-0.5 mt-0.5 border-l border-slate-800 ml-4 pl-1">
                        {sec.items.map(item => renderMenuItem(item, true))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
