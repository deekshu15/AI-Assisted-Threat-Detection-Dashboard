import React, { useState } from 'react';
import { Terminal, Play, RefreshCw } from 'lucide-react';

export default function NmapScanner() {
  const [target, setTarget] = useState('192.168.1.51');
  const [scanType, setScanType] = useState('Quick Scan');
  const [scanning, setScanning] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const runNmapScan = () => {
    if (scanning) return;
    setScanning(true);
    setTerminalLines([]);

    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const log = (msg: string, delay: number) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, msg]);
      }, delay);
    };

    log(`$ nmap -T4 -F ${target}`, 0);
    log(`Starting Nmap 7.92 ( https://nmap.org ) at ${timestamp} UTC`, 300);
    log(`Initiating ARP Ping Scan at ${timestamp}`, 600);
    log(`Scanning ${target} [1 host]`, 900);
    log(`Host is up (0.00012s latency).`, 1300);
    log(`rDNS record for ${target}: hq-db-server.internal.corp`, 1600);
    log(`\nPORT     STATE SERVICE      REASON`, 1900);
    log(`22/tcp   open  ssh          syn-ack ttl 64`, 2200);
    log(`80/tcp   open  http         syn-ack ttl 64`, 2400);
    log(`443/tcp  open  https        syn-ack ttl 64`, 2600);
    log(`3306/tcp open  mysql        syn-ack ttl 64`, 2800);
    log(`8080/tcp open  http-proxy   syn-ack ttl 64`, 3000);

    if (scanType === 'Vuln Scan' || scanType === 'Service Detection') {
      log(`\n[+] Vulnerability Script Scan Initiated...`, 3400);
      log(`|  cve-2021-34473: VULNERABLE (ProxyShell RCE Exploit Detected)`, 3800);
      log(`|  mysql-empty-password: root password is empty! (SECURITY RISK)`, 4100);
    }

    setTimeout(() => {
      setTerminalLines(prev => [
        ...prev,
        `\nNmap done: 1 IP address (1 host up) scanned in ${scanType === 'Vuln Scan' ? '4.52' : '3.12'} seconds`
      ]);
      setScanning(false);
    }, scanType === 'Vuln Scan' ? 4500 : 3300);
  };

  return (
    <div id="nmap-scanner-workspace" className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0b0e14] text-white space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
          <Terminal className="h-6 w-6 text-[#39ff14]" />
          <span>NMAP <span className="text-[#39ff14] glow-green font-extrabold">NETWORK_AUDIT</span></span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">Audit active network devices, map container port gateways, and scan structures for critical CVE exposures.</p>
      </div>

      {/* Control panel and terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full flex-1">
        
        {/* Form Controls Column */}
        <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col space-y-4 shadow-xl h-fit">
          <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-2">// SCANNER_OPTIONS</h3>
          
          {/* Target IP */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target IP / Subnet</label>
            <input 
              id="nmap-target-input"
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="E.G. 192.168.1.1"
              disabled={scanning}
              className="w-full bg-[#0b0e14] border border-slate-800 focus:border-[#39ff14] rounded-none px-3 py-2 text-xs text-white focus:outline-none disabled:opacity-60 font-bold"
            />
          </div>

          {/* Scan Type */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Audit Scan Type</label>
            <select
              id="nmap-scantype-select"
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              disabled={scanning}
              className="w-full bg-[#0b0e14] border border-slate-800 focus:border-[#39ff14] rounded-none px-3 py-2 text-xs text-[#39ff14] focus:outline-none cursor-pointer disabled:opacity-60 font-bold uppercase"
            >
              <option>Quick Scan</option>
              <option>Full Port Scan</option>
              <option>Vuln Scan</option>
              <option>Service Detection</option>
            </select>
          </div>

          {/* Action Trigger */}
          <button
            id="nmap-trigger-scan-btn"
            onClick={runNmapScan}
            disabled={scanning || !target.trim()}
            className="w-full flex items-center justify-center gap-2 bg-[#0b0e14] border border-slate-800 hover:border-[#39ff14] text-white hover:text-[#39ff14] py-2.5 rounded-none font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer glow-box-green hover-glow"
          >
            {scanning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>AUDITING_PORTS...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>LAUNCH_SCANNER</span>
              </>
            )}
          </button>
        </div>

        {/* Terminal output Column (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col bg-[#1e222b] border border-slate-800 rounded-none overflow-hidden shadow-xl h-[400px]">
          {/* Terminal Window Header */}
          <div className="bg-[#0b0e14] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-rose-600"></span>
              <span className="w-2 h-2 bg-yellow-600"></span>
              <span className="w-2 h-2 bg-emerald-600"></span>
              <span className="text-[10px] font-sans font-bold text-slate-500 ml-2">AUDITOR-SHELL@SECOPS-TERMINAL</span>
            </div>
            <span className="text-[9px] font-bold text-[#39ff14] uppercase tracking-wider animate-pulse">
              {scanning ? 'PORT AUDIT IN PROGRESS' : 'READY'}
            </span>
          </div>

          {/* Scrolling output container */}
          <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-[#39ff14] bg-[#0b0e14] flex flex-col space-y-1 select-text selection:bg-[#39ff14]/20">
            {terminalLines.length === 0 ? (
              <span className="text-slate-600 italic uppercase font-bold">[!] Console stream is empty. Input host targets and trigger scanner sweep.</span>
            ) : (
              terminalLines.map((line, idx) => {
                const isVuln = line.includes('VULNERABLE') || line.includes('SECURITY RISK');
                return (
                  <div key={idx} className={`whitespace-pre-wrap font-bold ${isVuln ? 'text-[#ff003c] glow-red animate-pulse' : ''}`}>{line}</div>
                );
              })
            )}

            {scanning && (
              <div className="text-[#39ff14]/50 animate-pulse mt-1">█ <span className="text-[10px] font-sans font-bold uppercase tracking-wider">ANALYZING HOST GATEWAYS...</span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
