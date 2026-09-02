import React, { useState } from 'react';
import { 
  Terminal, Shield, Key, ShieldCheck, Upload, AlertTriangle, Eye, Barcode,
  Laptop, Cpu, Network, FileText, Server, Globe, Search, Database, Play
} from 'lucide-react';

interface SleekToolPanelProps {
  toolName: string;
}

export default function SleekToolPanels({ toolName }: SleekToolPanelProps) {
  // Generic state managers
  const [running, setRunning] = useState(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState('https://internal-api.corp/v2/authenticate');
  const [targetHost, setTargetHost] = useState('192.168.1.100');

  // Metasploit Interactive State
  const [meterpreterSession, setMeterpreterSession] = useState<string[]>([]);
  const [activePayload, setActivePayload] = useState('windows/meterpreter/reverse_tcp');

  // John the Ripper Interactive State
  const [hashesCracked, setHashesCracked] = useState<Array<{user: string, hash: string, pass: string, state: string}>>([
    { user: 'admin', hash: '$2a$12$R9h/l7...', pass: '••••••••', state: 'locked' },
    { user: 'db_user', hash: '$6$rounds=5...', pass: '••••••••', state: 'locked' },
    { user: 'backup_admin', hash: '$1$ms9s...', pass: '••••••••', state: 'locked' }
  ]);

  // Image Scan State
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [imageReport, setImageReport] = useState<any | null>(null);
  const [imageScanning, setImageScanning] = useState(false);

  // Barcode State
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [barcodeReport, setBarcodeReport] = useState<any | null>(null);
  const [barcodeScanning, setBarcodeScanning] = useState(false);

  // Other tools inputs/selectors
  const [vulnProfile, setVulnProfile] = useState('Full and deep');
  const [dbVendor, setDbVendor] = useState('PostgreSQL');
  const [zapDepth, setZapDepth] = useState('10');
  const [volCommand, setVolCommand] = useState('pslist');

  // Run a generic audit tool simulation
  const handleRunGeneric = (tool: string, desc: string, callback: () => void) => {
    setRunning(true);
    setOutputLines([`[+] Initiating ${tool.toUpperCase()} auditing pipeline...`]);
    setTimeout(() => {
      setOutputLines(prev => [...prev, `[+] Binding sockets to virtual secure interfaces...`]);
    }, 400);
    setTimeout(() => {
      setOutputLines(prev => [...prev, `[+] Analyzing active telemetry packet maps...`]);
    }, 800);
    setTimeout(() => {
      setOutputLines(prev => [...prev, `[+] Executing security audits for target: ${targetHost}...`]);
    }, 1300);
    setTimeout(() => {
      callback();
      setRunning(false);
    }, 2000);
  };

  // Run Meterpreter Command
  const runMeterpreterCmd = (cmd: string) => {
    setMeterpreterSession(prev => [...prev, `meterpreter > ${cmd}`]);
    setTimeout(() => {
      let res = '';
      if (cmd === 'sysinfo') {
        res = `Computer        : SEC-HQ-AD99\nOS              : Windows Server 2022 Datacenter (Build 20348)\nArchitecture    : x64\nSystem Language : en_US\nMeterpreter     : x64/windows`;
      } else if (cmd === 'getuid') {
        res = `Server username: NT AUTHORITY\\SYSTEM (Administrative Privileges Authenticated)`;
      } else if (cmd === 'hashdump') {
        res = `Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::\nGuest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::\nLocalBackupAdmin:1003:aad3b435b51404ee:e2b99a4e98f0293cd:::\n\n[+] Credentials captured. Ready for John the Ripper decipher check!`;
      } else {
        res = `Command completed successfully on remote socket.`;
      }
      setMeterpreterSession(prev => [...prev, res]);
    }, 400);
  };

  // Run John crack
  const handleJohnCrack = () => {
    setRunning(true);
    setOutputLines([`$ john --wordlist=rockyou.txt hashes.txt`]);
    setTimeout(() => {
      setOutputLines(prev => [...prev, `Loaded 3 password hashes with 3 different salts (bcrypt, sha512crypt)\nProcessing hash indices...`]);
    }, 500);
    setTimeout(() => {
      setOutputLines(prev => [...prev, `[+] Cracked: db_user : "mysql_master_2026"`]);
      setHashesCracked(prev => [
        { ...prev[0] },
        { ...prev[1], pass: 'mysql_master_2026', state: 'unlocked' },
        { ...prev[2] }
      ]);
    }, 1300);
    setTimeout(() => {
      setOutputLines(prev => [...prev, `[+] Cracked: backup_admin : "password123"`]);
      setHashesCracked(prev => [
        { ...prev[0] },
        { ...prev[1], pass: 'mysql_master_2026', state: 'unlocked' },
        { ...prev[2], pass: 'password123', state: 'unlocked' }
      ]);
    }, 2400);
    setTimeout(() => {
      setOutputLines(prev => [...prev, `Session completed. Cracked 2 of 3 hashes successfully.`]);
      setRunning(false);
    }, 3000);
  };

  // Image Scan Trigger
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScannedImage(file.name);
    setImageScanning(true);
    setImageReport(null);

    setTimeout(() => {
      setImageScanning(false);
      setImageReport({
        fileName: file.name,
        fileSize: `${Math.round((file.size / 1024) * 10) / 10} KB`,
        mimeType: file.type || 'image/png',
        md5Hash: '7f3f1e9c8b0932a18837d2f98e09f53e',
        sha256: '9f2a4b8c3d7e6f1a0b5c4d2e1f8a9b0c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a',
        stegoFound: Math.random() < 0.5,
        exifData: {
          software: 'Photoshop 24.2 (Windows)',
          modifyDate: '2026-07-15 14:22:11',
          leakCoordinates: Math.random() < 0.5 ? '48.8584° N, 2.2945° E (Paris, France)' : 'None',
        },
        payloadSize: Math.random() < 0.5 ? '14.2 KB (Embedded ELF file detected)' : 'None'
      });
    }, 2000);
  };

  // Barcode Trigger
  const handleBarcodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScannedBarcode(file.name);
    setBarcodeScanning(true);
    setBarcodeReport(null);

    setTimeout(() => {
      setBarcodeScanning(false);
      setBarcodeReport({
        fileName: file.name,
        type: 'QR Code (Matrix Model 2)',
        payload: Math.random() < 0.5 
          ? 'https://malicious-phishing-portal.net/login?token=9f38a2e1d83c92b'
          : 'http://corp-internal-vault.net/transfer?id=99021',
        threatLevel: Math.random() < 0.5 ? 'Critical Risk (Blacklisted URL)' : 'Safe (Internal Subnet)',
        actions: ['Check domain host DNS record age', 'Block URL redirects at edge WAF proxy layer']
      });
    }, 2000);
  };

  const renderPanelBody = () => {
    switch (toolName) {
      // --- IMAGE SCAN TOOL ---
      case 'Image Scan':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#39ff14]" />
                <span>FORENSIC STAGNOGRAPHY & EXIF SCANNER</span>
              </h3>

              <div className="p-8 border border-dashed border-[#39ff14]/30 bg-[#0b0e14] hover:bg-slate-800/10 transition-all text-center flex flex-col items-center justify-center relative rounded-none group">
                <Upload className="h-8 w-8 text-[#39ff14]/70 mb-3 group-hover:scale-105 transition-transform" />
                <span className="text-xs text-slate-300 font-semibold mb-1">Drag and drop digital image or Click below</span>
                <span className="text-[10px] text-slate-500 uppercase mb-4 tracking-wider">Supports PNG, JPG, GIF up to 8MB</span>
                
                <label className="px-4 py-2 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] hover:text-[#39ff14] text-white text-xs font-bold uppercase cursor-pointer rounded-none transition-all glow-box-green hover-glow">
                  Upload Image to scan
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
              </div>

              {imageScanning && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex justify-between items-center text-[10px] text-[#39ff14] font-bold uppercase">
                    <span>Forensic decryption in progress...</span>
                    <span>Scanning pixels LSB</span>
                  </div>
                  <div className="w-full bg-[#0b0e14] border border-slate-800 h-1.5 overflow-hidden">
                    <div className="bg-[#39ff14] h-full w-2/3 animate-pulse rounded-none"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col min-h-[360px] shadow-xl">
              <div className="border-b border-slate-800 pb-3 text-slate-400 mb-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span>IMAGE SCAN FORENSICS OUTPUT</span>
                {imageReport && (
                  <span className={`px-2 py-0.5 border text-[9px] font-bold ${
                    imageReport.stegoFound 
                      ? 'border-[#ff003c]/40 text-[#ff003c] bg-[#ff003c]/5' 
                      : 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5'
                  }`}>
                    {imageReport.stegoFound ? 'MALICIOUS_THREAT_DETECTED' : 'CLEAN_VERDICT'}
                  </span>
                )}
              </div>

              {!imageReport ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 text-xs">
                  <span className="uppercase">[!] Awaiting image upload to trigger stego-forensics and EXIF audits.</span>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-sans animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3 bg-[#0b0e14] p-3 border border-slate-800 text-slate-300">
                    <div>File name: <strong className="text-white font-semibold">{imageReport.fileName}</strong></div>
                    <div>File size: <strong className="text-white font-semibold">{imageReport.fileSize}</strong></div>
                    <div>Mime type: <strong className="text-[#39ff14] font-semibold">{imageReport.mimeType}</strong></div>
                    <div>Verdicts: <strong className={imageReport.stegoFound ? 'text-[#ff003c]' : 'text-emerald-400'}>
                      {imageReport.stegoFound ? 'Hidden payload found' : 'Secure integrity'}
                    </strong></div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">EXIF Telemetry Details</h4>
                    <div className="bg-[#0b0e14] border border-slate-800 p-2 text-slate-300 grid grid-cols-1 gap-1 font-sans">
                      <div>Software: <strong className="text-slate-100">{imageReport.exifData.software}</strong></div>
                      <div>Modify date: <strong className="text-slate-100">{imageReport.exifData.modifyDate}</strong></div>
                      <div>Leaked coordinates: <strong className="text-amber-500">{imageReport.exifData.leakCoordinates}</strong></div>
                    </div>
                  </div>

                  {imageReport.stegoFound && (
                    <div className="bg-[#ff003c]/5 border border-[#ff003c]/40 p-3 text-[#ff003c] rounded-none space-y-1 animate-pulse">
                      <div className="font-bold uppercase tracking-wider">!! CRITICAL BUFFER DISCOVERY !!</div>
                      <div>Embedded payload segment: <strong className="font-extrabold">{imageReport.payloadSize}</strong></div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Hash Checks</h4>
                    <div className="bg-[#0b0e14] border border-slate-800 p-2 font-mono text-[10px] text-slate-400 space-y-0.5">
                      <div>MD5: {imageReport.md5Hash}</div>
                      <div className="truncate">SHA-256: {imageReport.sha256}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      // --- BARCODE SCAN TOOL ---
      case 'Barcode':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Barcode className="h-4 w-4 text-[#39ff14]" />
                <span>BARCODE & QR DECODING MODULE</span>
              </h3>

              <div className="p-8 border border-dashed border-[#39ff14]/30 bg-[#0b0e14] hover:bg-slate-800/10 transition-all text-center flex flex-col items-center justify-center relative rounded-none group">
                <Barcode className="h-8 w-8 text-[#39ff14]/70 mb-3 group-hover:scale-105 transition-transform" />
                <span className="text-xs text-slate-300 font-semibold mb-1">Drag and drop QR or Barcode image, or Click below</span>
                <span className="text-[10px] text-slate-500 uppercase mb-4 tracking-wider">Supports code 128, QR formats</span>
                
                <label className="px-4 py-2 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] hover:text-[#39ff14] text-white text-xs font-bold uppercase cursor-pointer rounded-none transition-all glow-box-green hover-glow">
                  Upload Barcode / QR Code to scan
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleBarcodeUpload} 
                    className="hidden" 
                  />
                </label>
              </div>

              {barcodeScanning && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex justify-between items-center text-[10px] text-[#39ff14] font-bold uppercase">
                    <span>Decoding matrix points...</span>
                    <span>Checking redirection lists</span>
                  </div>
                  <div className="w-full bg-[#0b0e14] border border-slate-800 h-1.5 overflow-hidden">
                    <div className="bg-[#39ff14] h-full w-2/3 animate-pulse rounded-none"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col min-h-[360px] shadow-xl">
              <div className="border-b border-slate-800 pb-3 text-slate-400 mb-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span>DECODING INTELLIGENCE MATRIX</span>
                {barcodeReport && (
                  <span className={`px-2 py-0.5 border text-[9px] font-bold ${
                    barcodeReport.threatLevel.includes('Critical') 
                      ? 'border-[#ff003c]/40 text-[#ff003c] bg-[#ff003c]/5' 
                      : 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5'
                  }`}>
                    {barcodeReport.threatLevel.includes('Critical') ? 'CRITICAL_RISK' : 'SAFE_PASS'}
                  </span>
                )}
              </div>

              {!barcodeReport ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 text-xs">
                  <span className="uppercase">[!] Awaiting barcode or QR file upload to initiate decoding audits.</span>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-sans animate-fadeIn">
                  <div className="bg-[#0b0e14] border border-slate-800 p-3.5 space-y-2">
                    <div>Format model: <strong className="text-white font-bold">{barcodeReport.type}</strong></div>
                    <div>Source file: <strong className="text-slate-300">{barcodeReport.fileName}</strong></div>
                    <div>Security assessment: <strong className={barcodeReport.threatLevel.includes('Critical') ? 'text-[#ff003c] font-black' : 'text-emerald-400 font-black'}>
                      {barcodeReport.threatLevel}
                    </strong></div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Decoded payload string</h4>
                    <div className="bg-[#0b0e14] border border-slate-800 p-3 font-mono text-[11px] text-green-400 break-all select-text font-semibold">
                      {barcodeReport.payload}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Recommended incident playbooks</h4>
                    <div className="space-y-1.5">
                      {barcodeReport.actions.map((action: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-300 bg-[#0b0e14] px-3 py-2 border border-slate-800/80">
                          <span className="text-[#39ff14] font-bold">&gt;</span>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      // --- REST API TOOL ---
      case 'REST API':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// REST API GATEWAY CLIENT</h3>
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">HTTP Method</label>
                <select className="w-full bg-[#0b0e14] border border-slate-800 focus:border-[#39ff14] rounded-none p-2 text-xs text-[#39ff14] focus:outline-none font-bold uppercase transition-all">
                  <option>POST</option>
                  <option>GET</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">REST Target Endpoint</label>
                <input 
                  type="text" 
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full bg-[#0b0e14] border border-slate-800 focus:border-[#39ff14] rounded-none p-2 text-xs text-white focus:outline-none font-semibold transition-all"
                />
              </div>

              <button
                onClick={() => handleRunGeneric('REST API', 'pinging API gateway', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] HANDSHAKE ESTABLISHED: Status 200 OK`,
                    `[i] Content-Type: application/json; charset=UTF-8`,
                    `[i] X-Content-Type-Options: nosniff`,
                    `[i] Response Matrix: { "auth_status": "linked", "access_level": "administrator" }`
                  ]);
                })}
                disabled={running}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'PINGING_GATEWAY...' : '[ SEND_API_HANDSHAKE ]'}
              </button>
            </div>

            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>REST_AUDITOR@TUNNEL_SOCKET</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'PINGING' : 'IDLE'}</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No REST handshake executed. Send request packet to trace headers.</span>
                ) : (
                  outputLines.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        );

      // --- METASPLOIT FRAMEWORK ---
      case 'Metasploit Framework':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// EXPLOIT PAYLOAD TUNER</h3>
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Inbound listener payload</label>
                <select 
                  value={activePayload}
                  onChange={(e) => setActivePayload(e.target.value)}
                  className="w-full bg-[#0b0e14] border border-slate-800 focus:border-[#ff003c] rounded-none p-2 text-xs text-[#ff003c] focus:outline-none font-bold uppercase transition-all"
                >
                  <option>windows/meterpreter/reverse_tcp</option>
                  <option>linux/x64/meterpreter_reverse_https</option>
                  <option>generic/shell_reverse_tcp</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Target Remote Host (RHOST)</label>
                <input 
                  type="text" 
                  value={targetHost}
                  onChange={(e) => setTargetHost(e.target.value)}
                  className="w-full bg-[#0b0e14] border border-slate-800 focus:border-[#ff003c] rounded-none p-2 text-xs text-white focus:outline-none font-bold transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMeterpreterSession([
                      `$ msfconsole`,
                      `use exploit/multi/handler`,
                      `set PAYLOAD ${activePayload}`,
                      `set LHOST 192.168.1.5`,
                      `exploit`,
                      `[*] Started reverse TCP handler on 192.168.1.5:4444`,
                      `[*] Sending stage (175174 bytes) to ${targetHost}`,
                      `[*] Meterpreter session 1 opened (${targetHost} -> 192.168.1.5:4444) at ${new Date().toISOString().slice(0, 10)} 23:27:01 UTC`
                    ]);
                  }}
                  className="w-full py-2.5 bg-[#1e222b] hover:bg-[#ff003c]/10 border border-[#ff003c]/40 hover:border-[#ff003c] text-[#ff003c] font-black text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer glow-box-red"
                >
                  [ INJECT SESSION TUNNEL ]
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-[#ff003c] mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>METERPRETER_SHELL_v2.0@MSFCONSOLE</span>
                <span className="text-[#ff003c] font-bold uppercase animate-pulse">TUNNEL_ACTIVE</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1 text-[#ff003c] mb-4 select-text">
                {meterpreterSession.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No active Meterpreter tunnel. Trigger payload exploit above to link virtual session socket.</span>
                ) : (
                  meterpreterSession.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap font-mono uppercase font-semibold">{line}</div>
                  ))
                )}
              </div>

              {meterpreterSession.length > 0 && (
                <div className="flex gap-2 pt-3 border-t border-slate-800">
                  <button onClick={() => runMeterpreterCmd('sysinfo')} className="px-3 py-1 bg-[#0b0e14] hover:bg-[#ff003c]/10 rounded-none border border-slate-800 hover:border-[#ff003c] text-[#ff003c] text-[10px] font-bold uppercase cursor-pointer">sysinfo</button>
                  <button onClick={() => runMeterpreterCmd('getuid')} className="px-3 py-1 bg-[#0b0e14] hover:bg-[#ff003c]/10 rounded-none border border-slate-800 hover:border-[#ff003c] text-[#ff003c] text-[10px] font-bold uppercase cursor-pointer">getuid</button>
                  <button onClick={() => runMeterpreterCmd('hashdump')} className="px-3 py-1 bg-[#0b0e14] hover:bg-[#ff003c]/10 rounded-none border border-slate-800 hover:border-[#ff003c] text-[#ff003c] text-[10px] font-bold uppercase cursor-pointer">hashdump</button>
                </div>
              )}
            </div>
          </div>
        );

      // --- JOHN THE RIPPER ---
      case 'John the Ripper':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// TARGET HASHES DICTIONARY</h3>
              
              <div className="space-y-3.5 flex-1">
                {hashesCracked.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#0b0e14] border border-slate-800 rounded-none text-xs flex justify-between items-center">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-300 font-sans uppercase">{item.user}</div>
                      <div className="text-[10px] text-slate-500 font-mono truncate max-w-[120px]">{item.hash}</div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded-none font-mono text-[9px] font-bold uppercase ${
                        item.state === 'unlocked' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-[#ff003c]/10 text-[#ff003c] border border-[#ff003c]/30'
                      }`}>
                        {item.state}
                      </span>
                      {item.state === 'unlocked' && (
                        <div className="text-[10px] text-emerald-400 font-bold mt-1 font-mono">"{item.pass}"</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleJohnCrack}
                disabled={running}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'CRACKING_HASH_BUFFERS...' : '[ CRACK_CRYPT_ALGORITHMS ]'}
              </button>
            </div>

            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>RIPPER_CORE@JOHN_DAEMON</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'CRACKING_ACTIVE' : 'IDLE'}</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text font-mono uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No cracking process active. Push action to feed hashing seeds into john daemon.</span>
                ) : (
                  outputLines.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        );

      // --- API KEYS INFO PANEL ---
      case 'API Keys':
        return (
          <div className="max-w-xl mx-auto bg-[#1e222b] border border-slate-800 rounded-none p-6 space-y-4 shadow-xl text-center">
            <div className="p-3 bg-[#0b0e14] border border-[#39ff14]/30 rounded-none w-fit mx-auto text-[#39ff14] glow-box-green">
              <Key className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">// CREDENTIALS PROTECTION VAULT</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              Configure credentials inside the settings panel. The server-side Gemini API credentials are proxy encrypted in container secure storage.
            </p>
            <div className="pt-4 border-t border-slate-800 flex justify-center">
              <span className="text-[10px] font-sans font-bold text-[#39ff14] bg-[#0b0e14] border border-[#39ff14]/30 px-3 py-1 rounded-none uppercase tracking-widest flex items-center gap-1.5 glow-green">
                <ShieldCheck className="h-4 w-4" />
                <span>Secret vault container linked successfully</span>
              </span>
            </div>
          </div>
        );

      // --- OPENVAS PANEL ---
      case 'OpenVAS':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// OPENVAS SCAN TUNER</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Target Domain/IP</label>
                <input type="text" value={targetHost} onChange={(e) => setTargetHost(e.target.value)} className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-white focus:outline-none font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Scan profile</label>
                <select value={vulnProfile} onChange={(e) => setVulnProfile(e.target.value)} className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-[#39ff14] focus:outline-none font-bold uppercase">
                  <option>Full and deep</option>
                  <option>Full and fast</option>
                  <option>System Ports only</option>
                </select>
              </div>
              <button 
                onClick={() => handleRunGeneric('OpenVAS', 'vulnerability scan', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] COMPLETE: 12 CVE vulnerability indexes mapped.`,
                    `[!] CVE-2026-1182 (High) identified on Target Port 443`,
                    `[!] CVE-2025-4491 (Medium) identified on Target Port 22`
                  ]);
                })}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'SCANNING_CVE_MATRIX...' : '[ RUN_OPENVAS_SWEEP ]'}
              </button>
            </div>
            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>OPENVAS_CONSOLE@CORE</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'SCANNING_ACTIVE' : 'READY'}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No scanning trace logs found. Bind target host to begin.</span>
                ) : (
                  outputLines.map((line, i) => <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>)
                )}
              </div>
            </div>
          </div>
        );

      // --- NIKTO PANEL ---
      case 'Nikto':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// NIKTO CGI AUDITOR</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Target Web host</label>
                <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-white focus:outline-none font-bold" />
              </div>
              <button 
                onClick={() => handleRunGeneric('Nikto', 'web scan', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] COMPLETED: Web Server Nikto audit returned 2 findings`,
                    `[i] Target Server: Apache/2.4.41 (Ubuntu)`,
                    `[!] Finding: /wp-content/ leaks directory indexes`,
                    `[!] Finding: Anti-clickjacking X-Frame-Options header not present`
                  ]);
                })}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'AUDITING_WEB_SERVER...' : '[ BEGIN_NIKTO_AUDIT ]'}
              </button>
            </div>
            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>NIKTO_SCANNER@WEB</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'AUDIT_ACTIVE' : 'READY'}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No audit traces compiled. Initiate Nikto sweep above.</span>
                ) : (
                  outputLines.map((line, i) => <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>)
                )}
              </div>
            </div>
          </div>
        );

      // --- SQLMAP PANEL ---
      case 'SQLmap':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// SQLMAP INJECTION AUDITOR</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Target GET/POST parameter URL</label>
                <input type="text" value={`${inputUrl}?id=1`} onChange={(e) => setInputUrl(e.target.value)} className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-white focus:outline-none font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">DB Vendor Profile</label>
                <select value={dbVendor} onChange={(e) => setDbVendor(e.target.value)} className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-[#39ff14] focus:outline-none font-bold uppercase">
                  <option>PostgreSQL</option>
                  <option>MySQL</option>
                  <option>MSSQL</option>
                </select>
              </div>
              <button 
                onClick={() => handleRunGeneric('SQLmap', 'sql injection audit', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] COMPLETE: GET parameter 'id' is VULNERABLE to SQL Injection`,
                    `[!] Payload type: Boolean-based blind injection`,
                    `[!] DB Schema found: 4 tables ('users', 'credentials', 'payments', 'configs')`
                  ]);
                })}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'INJECTING_PAYLOADS...' : '[ AUDIT_SQL_INJECTION ]'}
              </button>
            </div>
            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>SQLMAP_PROCESS@CORE</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'INJECTING' : 'IDLE'}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No active injection logs. Trigger SQLmap audit above.</span>
                ) : (
                  outputLines.map((line, i) => <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>)
                )}
              </div>
            </div>
          </div>
        );

      // --- OWASP ZAP PANEL ---
      case 'OWASP ZAP':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// OWASP ZAP WEB SPIDER</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Root Web domain</label>
                <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-white focus:outline-none font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Crawl spider depth</label>
                <input type="number" value={zapDepth} onChange={(e) => setZapDepth(e.target.value)} className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-white focus:outline-none font-bold" />
              </div>
              <button 
                onClick={() => handleRunGeneric('OWASP ZAP', 'spider crawl', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] COMPLETE: 120 URLs spider-mapped successfully.`,
                    `[i] 4 critical inputs flagged with missing anti-CSRF tokens.`,
                    `[!] OWASP Top 10 Alert: A1 Broken Access Control risk on /admin/config/`
                  ]);
                })}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'SPIDER_CRAWLING...' : '[ TRIGGER_ZAP_SPIDER ]'}
              </button>
            </div>
            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>ZAP_SPIDER@CORE_WEB</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'CRAWLING' : 'IDLE'}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No crawl indexes logged. Execute active web spider above.</span>
                ) : (
                  outputLines.map((line, i) => <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>)
                )}
              </div>
            </div>
          </div>
        );

      // --- WAPITI PANEL ---
      case 'Wapiti':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// WAPITI API COMPLIANCE</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Root endpoint URL</label>
                <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-white focus:outline-none font-bold" />
              </div>
              <button 
                onClick={() => handleRunGeneric('Wapiti', 'wapiti audit', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] COMPLETE: Wapiti API endpoint sweep compiled.`,
                    `[i] XSS module: OK`,
                    `[!] Command Injection module: Flagged /api/v1/deploy for shell parameter escapes!`
                  ]);
                })}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'API_COMPLIANCE_SCAN...' : '[ RUN_WAPITI_AUDIT ]'}
              </button>
            </div>
            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>WAPITI_DAEMON@API</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'ACTIVE_AUDIT' : 'READY'}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No Wapiti outputs traced. Trigger API sweep above.</span>
                ) : (
                  outputLines.map((line, i) => <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>)
                )}
              </div>
            </div>
          </div>
        );

      // --- WAZUH PANEL ---
      case 'Wazuh':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// WAZUH AGENT INTEGRITY</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Select active node agent</label>
                <select className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-[#39ff14] focus:outline-none font-bold uppercase">
                  <option>Active Directory Gateway</option>
                  <option>Exchange Mail Node</option>
                  <option>Edge Firewall Router</option>
                </select>
              </div>
              <button 
                onClick={() => handleRunGeneric('Wazuh', 'wazuh report', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] COMPLETE: CIS compliance score audited at 92%.`,
                    `[i] Host intrusion signatures: Clean`,
                    `[i] Integrity monitoring (FIM): Checked /etc/pam.d/ configurations (OK)`
                  ]);
                })}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'COMPILING_INTEGRITY...' : '[ SECURE_WAZUH_RECAP ]'}
              </button>
            </div>
            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>WAZUH_SIEM@MONITOR</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'STREAMING_EVENTS' : 'ONLINE'}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No event streams filtered. Bind active agent.</span>
                ) : (
                  outputLines.map((line, i) => <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>)
                )}
              </div>
            </div>
          </div>
        );

      // --- SNORT PANEL ---
      case 'Snort':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// SNORT IDS MATRIX</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Monitor Network interface</label>
                <select className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-[#39ff14] focus:outline-none font-bold uppercase">
                  <option>eth0 (Default LAN Ingress)</option>
                  <option>vlan10 (Local Core Subnet)</option>
                  <option>tun0 (VPN Secure Node)</option>
                </select>
              </div>
              <button 
                onClick={() => handleRunGeneric('Snort', 'packet monitoring', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] EXECUTING: Snort rule compilation updated.`,
                    `[*] Alerts mapped: 2 anomalous ICMP pings from unmapped VLANs`,
                    `[!] Dropped: 1 TCP connection attempting raw SSH handshake on port 22`
                  ]);
                })}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'TRIGGERING_MONITOR...' : '[ INGEST_SNORT_IDS ]'}
              </button>
            </div>
            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>SNORT_IDS@CORE_ETH0</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'CAPTURING_PACKETS' : 'ONLINE'}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] Awaiting network interface capture binding.</span>
                ) : (
                  outputLines.map((line, i) => <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>)
                )}
              </div>
            </div>
          </div>
        );

      // --- AUTOPSY PANEL ---
      case 'Autopsy':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// AUTOPSY DISK INQUEST</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Virtual raw image target path</label>
                <input type="text" value="/dev/sdb1_prod_dump.raw" className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-white focus:outline-none font-bold" readOnly />
              </div>
              <button 
                onClick={() => handleRunGeneric('Autopsy', 'forensic disk analysis', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] COMPLETE: 14 deleted administrative logs fully recovered.`,
                    `[i] Hidden folder discovered inside NTFS root volume.`,
                    `[!] Forensic payload: Decrypted compromised .sh shell initialization script.`
                  ]);
                })}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'DECRYPTING_SECTOR_MAPS...' : '[ INITIATE_AUTOPSY_FORENSICS ]'}
              </button>
            </div>
            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>AUTOPSY_ENGINE@FORENSICS</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'DECRYPTING' : 'READY'}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No sector recovery scans active. Execute image inquest above.</span>
                ) : (
                  outputLines.map((line, i) => <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>)
                )}
              </div>
            </div>
          </div>
        );

      // --- VOLATILITY PANEL ---
      case 'Volatility':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// VOLATILITY KERNEL MONITORS</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Analysis command module</label>
                <select value={volCommand} onChange={(e) => setVolCommand(e.target.value)} className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-[#39ff14] focus:outline-none font-bold uppercase">
                  <option value="pslist">pslist (Processes List)</option>
                  <option value="netscan">netscan (Socket Connections)</option>
                  <option value="malfind">malfind (Malicious DLL Find)</option>
                </select>
              </div>
              <button 
                onClick={() => handleRunGeneric('Volatility', 'kernel memory scan', () => {
                  setOutputLines(prev => {
                    if (volCommand === 'pslist') {
                      return [
                        ...prev,
                        `[✔] COMPLETE: Volatility output compiled for 'pslist'`,
                        `[i] Process: services.exe (PID: 648)`,
                        `[!] Process: svchost.exe (PID: 1102, anomalies: thread injection hooks detected!)`
                      ];
                    } else if (volCommand === 'netscan') {
                      return [
                        ...prev,
                        `[✔] COMPLETE: Volatility output compiled for 'netscan'`,
                        `[i] TCP Connection: 192.168.1.100:443 -> ESTABLISHED`,
                        `[!] TCP Connection: 192.168.1.100:4444 -> 185.220.101.5 (ESTABLISHED back-tunnel!)`
                      ];
                    } else {
                      return [
                        ...prev,
                        `[✔] COMPLETE: Volatility output compiled for 'malfind'`,
                        `[!] Flagged Virtual Memory Segment: 0x00007ff83f910000 with PAGE_EXECUTE_READWRITE permissions (Signature of DLL injection!)`
                      ];
                    }
                  });
                })}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'COMPILING_MEMORY_IMAGE...' : '[ RUN_VOLATILITY_AUDIT ]'}
              </button>
            </div>
            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>VOLATILITY_RAM@CORE_IMAGE</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'DECONSTRUCTING' : 'ONLINE'}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No memory traces parsed. Trigger command scan module above.</span>
                ) : (
                  outputLines.map((line, i) => <div key={i} className="whitespace-pre-wrap font-semibold">{line}</div>)
                )}
              </div>
            </div>
          </div>
        );

      default:
        // Generic fallback panel for other tools
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e222b] border border-slate-800 p-5 rounded-none flex flex-col space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">// TARGET NODE SETUP</h3>
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Remote Asset Target Host</label>
                <input 
                  type="text" 
                  value={targetHost}
                  onChange={(e) => setTargetHost(e.target.value)}
                  className="w-full bg-[#0b0e14] border border-slate-800 p-2 text-xs text-white focus:outline-none font-bold"
                />
              </div>

              <button
                onClick={() => handleRunGeneric(toolName, 'system scan', () => {
                  setOutputLines(prev => [
                    ...prev,
                    `[✔] COMPLETE: Interactive audit on host ${targetHost} verified successfully.`,
                    `[i] All standard telemetry buffers are inside secure baseline threshold ratios.`
                  ]);
                })}
                disabled={running}
                className="w-full py-2.5 bg-[#1e222b] border border-slate-700 hover:border-[#39ff14] text-white hover:text-[#39ff14] font-bold text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer glow-box-green hover-glow"
              >
                {running ? 'SCANNING_NODE...' : `[ RUN_${toolName.toUpperCase().replace(/\s+/g, '_')}_SCAN ]`}
              </button>
            </div>

            <div className="lg:col-span-2 bg-[#1e222b] border border-slate-800 rounded-none p-5 flex flex-col h-[380px] font-mono text-xs shadow-xl">
              <div className="border-b border-slate-800 pb-2 text-slate-400 mb-4 flex justify-between items-center text-[9px] font-bold">
                <span>{toolName.toUpperCase().replace(/\s+/g, '_')}@SECOPS_NODE</span>
                <span className="text-[#39ff14] font-bold uppercase animate-pulse">{running ? 'EXECUTING' : 'READY'}</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1 text-green-400 select-text uppercase font-semibold">
                {outputLines.length === 0 ? (
                  <span className="text-slate-500 italic uppercase">[!] No diagnostics logs triggered. Feed RHOST and initiate tool scan.</span>
                ) : (
                  outputLines.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap">{line}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div id="sleek-tool-panel-workspace" className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0b0e14] text-white space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 shrink-0">
        <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
          <Shield className="h-6 w-6 text-[#39ff14]" />
          <span>{toolName.toUpperCase()} <span className="text-[#39ff14] glow-green">MODULE_AUDIT</span></span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">
          Automate security compliance testing sweeps, audit configurations, and inspect REST gateway endpoints.
        </p>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full">
        {renderPanelBody()}
      </div>
    </div>
  );
}
