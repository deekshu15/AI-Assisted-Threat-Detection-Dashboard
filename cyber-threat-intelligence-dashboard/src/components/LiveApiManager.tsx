import React, { useState, useEffect, useRef } from 'react';
import { Radio, Play, Square, Wifi, Key, Link2, Sliders, ShieldCheck } from 'lucide-react';
import { Threat } from '../types';
import { generateMockThreats } from '../data';

interface LiveApiManagerProps {
  onAddThreat: (threat: Threat) => void;
  streamActive: boolean;
  setStreamActive: (active: boolean) => void;
}

export default function LiveApiManager({ onAddThreat, streamActive, setStreamActive }: LiveApiManagerProps) {
  const [apiUrl, setApiUrl] = useState('https://api.cyberthreatintelligence.io/v1/feed');
  const [apiKey, setApiKey] = useState('cti_live_key_993hdk47shsks');
  const [intervalSec, setIntervalSec] = useState(3);
  const [recentEvents, setRecentEvents] = useState<string[]>([]);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const prevStreamActiveRef = useRef(streamActive);

  const toggleStreaming = () => {
    setStreamActive(!streamActive);
  };

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [recentEvents]);

  useEffect(() => {
    if (streamActive) {
      // Connect handshake
      if (!prevStreamActiveRef.current) {
        setRecentEvents([
          `[+] Initializing secure WSS handshake with endpoint...`,
          `[+] Authenticating Gateway Token Ingress Key... [OK]`,
          `[+] Tunnel established. Listening for telemetry bursts...`
        ]);
      }

      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
      }

      streamTimerRef.current = setInterval(() => {
        const mockThreatRaw = generateMockThreats(1)[0];
        const liveThreat: Threat = {
          ...mockThreatRaw,
          id: `TR-${Math.floor(Math.random() * 90000) + 10000}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };

        const rawJsonString = JSON.stringify({
          type: liveThreat.attackType,
          src: liveThreat.sourceIp,
          sev: liveThreat.severity.toUpperCase()
        });

        setRecentEvents(prev => [
          ...prev,
          `[!] INGRESS RAW: ${rawJsonString}`
        ]);

        onAddThreat(liveThreat);
      }, intervalSec * 1000);

    } else {
      // Disconnect log
      if (prevStreamActiveRef.current) {
        setRecentEvents(prev => [
          ...prev,
          `[-] Remote host closed connection. Tunnel terminated.`
        ]);
      }
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
      }
    }

    prevStreamActiveRef.current = streamActive;

    return () => {
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
      }
    };
  }, [streamActive, intervalSec, onAddThreat]);

  return (
    <div id="live-api-workspace" className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#0b0e14] text-white space-y-4 md:space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
          <Radio className="h-6 w-6 text-[#39ff14] animate-pulse" />
          <span>Live Stream <span className="text-[#39ff14] glow-green font-extrabold">API Gateway</span></span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">Configure live WebSocket endpoints to ingest real-time corporate network security telemetry logs.</p>
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto w-full flex-1">
        
        {/* API Credentials Card */}
        <div className="bg-[#1e222b] border border-slate-800 rounded-none p-4 sm:p-5 flex flex-col space-y-4 shadow-xl h-fit">
          <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-2">// INBOUND_CONNECTION_CONFIG</h3>

          {/* API URL */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Link2 className="h-3 w-3 text-[#39ff14]" />
              <span>Base API Socket Endpoint</span>
            </label>
            <input 
              id="live-api-url"
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              disabled={streamActive}
              className="w-full bg-[#0b0e14] border border-slate-800 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#39ff14] disabled:opacity-60 font-bold"
            />
          </div>

          {/* API Key */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Key className="h-3 w-3 text-[#39ff14]" />
              <span>Gateway Token Ingress Key</span>
            </label>
            <input 
              id="live-api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={streamActive}
              className="w-full bg-[#0b0e14] border border-slate-800 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-[#39ff14] disabled:opacity-60 font-bold"
            />
          </div>

          {/* Polling Interval Slider */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1"><Sliders className="h-3 w-3 text-[#39ff14]" /> Ingestion Speed</span>
              <span className="text-[#39ff14] font-mono text-xs font-bold">{intervalSec} seconds</span>
            </div>
            <input
              id="live-api-interval-slider"
              type="range"
              min="1"
              max="10"
              value={intervalSec}
              onChange={(e) => setIntervalSec(Number(e.target.value))}
              disabled={streamActive}
              className="w-full accent-[#39ff14] cursor-pointer disabled:opacity-60 my-1"
            />
          </div>

          {/* Stream Switch Button */}
          <button
            id="live-api-stream-toggle-btn"
            onClick={toggleStreaming}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-none font-extrabold text-xs uppercase tracking-wider transition-all border cursor-pointer ${
              streamActive
                ? 'bg-rose-500/10 border-[#ff003c] text-[#ff003c] hover:bg-rose-500/20 shadow-xl'
                : 'bg-[#0b0e14] border-slate-800 hover:border-[#39ff14] text-white hover:text-[#39ff14] glow-box-green hover-glow'
            }`}
          >
            {streamActive ? (
              <>
                <Square className="h-4 w-4 fill-[#ff003c] text-[#ff003c]" />
                <span>[ 🛑 DISCONNECT GATEWAY ]</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white text-white" />
                <span>[ &gt; CONNECT GATEWAY ]</span>
              </>
            )}
          </button>
        </div>

        {/* Live Event Diagnostics Log Column (2/3 width) */}
        <div className="md:col-span-2 flex flex-col bg-[#1e222b] border border-slate-800 rounded-none overflow-hidden shadow-xl h-[400px]">
          {/* Diagnostics Tab Header */}
          <div className="bg-[#0b0e14] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className={`h-4 w-4 ${streamActive ? 'text-[#39ff14] animate-pulse' : 'text-slate-500'}`} />
              <span className="text-[10px] font-sans font-bold text-slate-400">Stream Connection Diagnostics Terminal</span>
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border ${
              streamActive 
                ? 'text-emerald-400 bg-emerald-950/30 border-emerald-500/40 animate-pulse' 
                : 'text-slate-500 bg-[#0b0e14] border-transparent'
            }`}>
              {streamActive ? 'CONNECTED_SECURE' : 'DISCONNECTED'}
            </span>
          </div>

          {/* Scrolling Logging output */}
          <div 
            ref={terminalContainerRef}
            className="flex-1 p-5 overflow-y-auto font-mono text-[11px] text-[#39ff14] bg-[#0b0e14] flex flex-col space-y-2 select-text selection:bg-[#39ff14]/20 selection:text-white"
          >
            {recentEvents.length === 0 ? (
              <span className="text-slate-500 italic uppercase font-bold">[!] No diagnostic events log available. Define credentials and click "Connect Gateway" to start listening to the inbound tunnel sockets.</span>
            ) : (
              recentEvents.map((line, idx) => {
                const isRaw = line.includes('INGRESS RAW');
                const isErrorOrTerminated = line.includes('Tunnel terminated') || line.includes('closed connection');
                const isInit = line.includes('[+]') || line.includes('handshake') || line.includes('established');
                
                let textColor = 'text-slate-500';
                if (isRaw) {
                  textColor = 'text-[#39ff14]';
                } else if (isErrorOrTerminated) {
                  textColor = 'text-rose-500';
                } else if (isInit) {
                  textColor = 'text-cyan-400';
                }
                
                return (
                  <div 
                    key={idx} 
                    className={`${textColor} font-bold`}
                  >
                    {line}
                  </div>
                );
              })
            )}

            {streamActive && (
              <div className="text-[#39ff14]/40 animate-pulse mt-2 flex items-center gap-1.5 text-[10px] font-sans font-bold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#39ff14]"></span>
                </span>
                <span>LISTENING ON TUNNEL SOCKET (SPEED: {intervalSec}S)...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
