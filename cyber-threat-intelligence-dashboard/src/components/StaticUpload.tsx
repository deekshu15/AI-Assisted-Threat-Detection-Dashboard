import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Threat } from '../types';
import { generateMockThreats } from '../data';

interface StaticUploadProps {
  onLoadThreats: (threats: Threat[]) => void;
  threatsLoaded: boolean;
  onClearData: () => void;
}

export default function StaticUpload({ onLoadThreats, threatsLoaded, onClearData }: StaticUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedCount, setUploadedCount] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [localParsedThreats, setLocalParsedThreats] = useState<Threat[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): Threat[] => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    // Parse headers
    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
    const parsedThreats: Threat[] = [];

    for (let i = 1; i < lines.length; i++) {
      // Simple split by comma, respecting quotes
      const row = [];
      let currentField = '';
      let insideQuotes = false;
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          row.push(currentField.trim().replace(/^["']|["']$/g, ''));
          currentField = '';
        } else {
          currentField += char;
        }
      }
      row.push(currentField.trim().replace(/^["']|["']$/g, ''));

      const getVal = (possibleHeaders: string[]): string => {
        const idx = headers.findIndex(h => possibleHeaders.includes(h));
        return idx !== -1 && row[idx] !== undefined ? row[idx] : '';
      };

      const attackType = getVal(['attacktype', 'attack_type', 'attack', 'type', 'event']) || 'Phishing';
      const severityRaw = getVal(['severity', 'level', 'priority']).toLowerCase();
      let severity: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
      if (severityRaw.includes('crit')) severity = 'Critical';
      else if (severityRaw.includes('high')) severity = 'High';
      else if (severityRaw.includes('med') || severityRaw.includes('mod')) severity = 'Medium';
      else if (severityRaw.includes('low')) severity = 'Low';
      else {
        if (attackType === 'Zero-Day' || attackType === 'Ransomware') severity = 'Critical';
        else if (attackType === 'SQL Injection' || attackType === 'DDoS') severity = 'High';
        else if (attackType === 'Brute Force' || attackType === 'Phishing') severity = 'Medium';
      }

      const statusRaw = getVal(['status', 'action', 'mitigation']).toLowerCase();
      let status: 'Blocked' | 'Investigating' | 'Allowed' | 'Mitigated' = 'Blocked';
      if (statusRaw.includes('block')) status = 'Blocked';
      else if (statusRaw.includes('invest')) status = 'Investigating';
      else if (statusRaw.includes('allow')) status = 'Allowed';
      else if (statusRaw.includes('mitig')) status = 'Mitigated';
      else {
        if (severity === 'Critical') status = 'Blocked';
        else if (severity === 'High') status = 'Mitigated';
        else status = 'Allowed';
      }

      const bytesStr = getVal(['bytestransferred', 'bytes_transferred', 'bytes', 'size']);
      const bytesTransferred = bytesStr ? parseInt(bytesStr, 10) || 500 : Math.floor(Math.random() * 1500000) + 120;

      const portStr = getVal(['port', 'destination_port', 'dst_port']);
      const port = portStr ? parseInt(portStr, 10) || 80 : [22, 80, 443, 3306, 8080, 23, 445][Math.floor(Math.random() * 7)];

      const country = getVal(['country', 'origin', 'location']) || 'United States';
      const sourceIp = getVal(['sourceip', 'source_ip', 'ip', 'source', 'src_ip']) || '192.168.1.10';
      const targetDevice = getVal(['targetdevice', 'target_device', 'device', 'target']) || 'Workstation';
      const timestamp = getVal(['timestamp', 'time', 'date']) || new Date().toISOString().replace('T', ' ').substring(0, 19);
      const id = getVal(['id', 'tr-id', 'threat_id']) || `TR-${10000 + i}`;

      parsedThreats.push({
        id,
        timestamp,
        sourceIp,
        country,
        attackType,
        targetDevice,
        severity,
        status,
        bytesTransferred,
        port
      });
    }

    return parsedThreats;
  };

  const parseJSON = (text: string): Threat[] => {
    try {
      const data = JSON.parse(text);
      const arr = Array.isArray(data) ? data : (data.threats || data.records || [data]);
      return arr.map((item: any, idx: number) => {
        const attackType = item.attackType || item.attack_type || item.type || 'Phishing';
        const severity = item.severity || (['Critical', 'High', 'Medium', 'Low'].includes(item.level) ? item.level : 'Medium');
        const status = item.status || 'Blocked';
        return {
          id: item.id || `TR-${10000 + idx}`,
          timestamp: item.timestamp || item.time || new Date().toISOString().replace('T', ' ').substring(0, 19),
          sourceIp: item.sourceIp || item.source_ip || item.ip || '192.168.1.10',
          country: item.country || item.location || 'United States',
          attackType,
          targetDevice: item.targetDevice || item.target_device || item.device || 'Workstation',
          severity: ['Low', 'Medium', 'High', 'Critical'].includes(severity) ? severity : 'Medium',
          status: ['Blocked', 'Investigating', 'Allowed', 'Mitigated'].includes(status) ? status : 'Blocked',
          bytesTransferred: Number(item.bytesTransferred || item.bytes_transferred || item.bytes || Math.floor(Math.random() * 100000)),
          port: Number(item.port || item.destination_port || 80)
        } as Threat;
      });
    } catch (e) {
      console.error(e);
      throw new Error('Malformed JSON dataset format.');
    }
  };

  const processFile = (file: File) => {
    setUploadedFileName(file.name);
    setErrorMsg(null);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        let parsed: Threat[] = [];
        const ext = file.name.split('.').pop()?.toLowerCase();

        if (ext === 'csv') {
          parsed = parseCSV(text);
        } else if (ext === 'json') {
          parsed = parseJSON(text);
        } else {
          throw new Error('Unsupported file extension. Only .CSV and .JSON are supported.');
        }

        if (parsed.length === 0) {
          throw new Error('No valid threat records found in the uploaded file.');
        }

        let progress = 0;
        const interval = setInterval(() => {
          progress += 25;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setUploadedCount(parsed.length);
            setLocalParsedThreats(parsed);
          }
        }, 50);

      } catch (err: any) {
        setUploadProgress(null);
        setErrorMsg(err.message || 'Error parsing threat intelligence database.');
      }
    };

    reader.onerror = () => {
      setUploadProgress(null);
      setErrorMsg('Failed to read the selected file.');
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'json' || ext === 'csv') {
        processFile(file);
      } else {
        setErrorMsg('Invalid file extension. Please select a .CSV or .JSON threat database file.');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      processFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleLoadDemo = () => {
    setUploadedFileName('threat_intelligence_demo_preset.csv');
    setErrorMsg(null);
    setUploadProgress(0);

    const demoThreats = generateMockThreats(120);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadedCount(120);
        setLocalParsedThreats(demoThreats);
      }
    }, 50);
  };

  return (
    <div id="static-upload-workspace" className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#0b0e14] text-white space-y-4 md:space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
          <Upload className="h-6 w-6 text-[#39ff14]" />
          <span>COMPLIANCE <span className="text-[#39ff14] glow-green font-extrabold">DATA_INGRESS</span></span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">Ingest offline threat datasets, active firewall configuration records, or raw json audits directly into active memory mapping states.</p>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto w-full space-y-6 flex-1 flex flex-col justify-center py-6">
        
        {/* Error alerting banner */}
        {errorMsg && (
          <div className="p-3.5 bg-[#0b0e14] border border-[#ff003c] text-[#ff003c] rounded-none flex items-center gap-2.5 text-xs animate-pulse font-sans font-bold glow-box-red">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
            <span>[!] ERROR: {errorMsg.toUpperCase()}</span>
          </div>
        )}

        {/* Drag and Drop Zone */}
        {!uploadProgress && !localParsedThreats ? (
          <div
            id="file-upload-dropzone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`border-2 border-dashed rounded-none p-10 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all ${
              isDragOver 
                ? 'border-[#39ff14] bg-[#39ff14]/5 shadow-xl glow-box-green' 
                : 'border-slate-800 bg-[#1e222b] hover:border-[#39ff14] hover:bg-[#39ff14]/5'
            }`}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".csv,.json"
              onChange={handleFileSelect}
              className="hidden" 
            />
            <div className="p-4 bg-[#0b0e14] border border-[#39ff14]/30 rounded-none mb-4 text-[#39ff14] glow-box-green">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">&gt;&gt; DRAG_AND_DROP_THREAT_FILES</h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-xs leading-relaxed">
              SUPPORTED EXTENSIONS: .CSV, .JSON. CLICK TO OPEN LOCAL DIRECTORY EXTRAS.
            </p>
            
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-6">// OR</span>
            
            <button
              id="upload-demo-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadDemo();
              }}
              className="mt-3 text-xs font-bold uppercase text-white hover:text-[#39ff14] bg-[#0b0e14] hover:bg-slate-800/20 border border-slate-800 hover:border-[#39ff14] px-4 py-2 rounded-none transition-all cursor-pointer glow-box-green hover-glow"
            >
              [ INJECT_DEMO_PRESETS ]
            </button>
          </div>
        ) : uploadProgress !== null && uploadProgress < 100 ? (
          /* Loading Inbound Stream State */
          <div id="file-upload-progress-box" className="bg-[#1e222b] border border-slate-800 rounded-none p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
            <RefreshCw className="h-8 w-8 text-[#39ff14] animate-spin" />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">PARSING {uploadedFileName?.toUpperCase()}</h4>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Rebuilding target vectors and mapping firewall rules...</p>
            </div>
            
            {/* Horizontal progress bar */}
            <div className="w-64 bg-[#0b0e14] border border-slate-800 h-3 rounded-none overflow-hidden">
              <div 
                className="bg-[#39ff14] h-full transition-all duration-150" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="text-xs text-[#39ff14] font-mono font-bold">{uploadProgress}% COMPLETED</span>
          </div>
        ) : (
          /* Success State Card with Preview Table and Action Button */
          <div id="file-upload-success-box" className="bg-[#1e222b] border border-slate-800 rounded-none p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-xl w-full">
            <div className="p-3 bg-[#0b0e14] border border-[#39ff14]/30 rounded-none text-[#39ff14] glow-box-green">
              <CheckCircle className="h-6 w-6 animate-pulse" />
            </div>
            <div className="space-y-1 w-full">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">INGRESS_MAPPING_COMPLETED!</h3>
              <p className="text-xs text-[#39ff14] font-mono font-bold uppercase">
                {uploadedFileName || 'testdataset.csv'} loaded successfully
              </p>
              <p className="text-[11px] text-slate-400 max-w-lg mx-auto font-semibold leading-relaxed">
                SUCCESSFULLY PARSED {uploadedCount} EVENT LOG ROWS. PREVIEW THE RECONSTRUCTED TELEMETRY STREAM BELOW.
              </p>
            </div>

            {/* Data Preview Grid */}
            {localParsedThreats && (
              <div className="w-full border border-slate-800 bg-[#0b0e14] overflow-hidden text-left mt-2">
                <div className="bg-[#1e222b] px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#39ff14] glow-green">
                    &gt;&gt; Live Dataset Preview (First 5 Rows)
                  </span>
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Total: {uploadedCount} records
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 bg-black/45">
                        <th className="p-2 font-bold uppercase tracking-wider">Timestamp</th>
                        <th className="p-2 font-bold uppercase tracking-wider">Source IP</th>
                        <th className="p-2 font-bold uppercase tracking-wider">Destination IP</th>
                        <th className="p-2 font-bold uppercase tracking-wider">Country</th>
                        <th className="p-2 font-bold uppercase tracking-wider">Attack Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/60">
                      {localParsedThreats.slice(0, 5).map((row, idx) => {
                        const destIp = row.targetDevice === 'Workstation' ? '192.168.1.15'
                                     : row.targetDevice === 'Mail Server' ? '192.168.2.22'
                                     : row.targetDevice === 'Database Server' ? '192.168.2.10'
                                     : row.targetDevice === 'Web Server' ? '192.168.3.80'
                                     : row.targetDevice === 'Firewall' ? '192.168.1.1'
                                     : row.targetDevice === 'Router' ? '192.168.1.254'
                                     : '192.168.1.50';
                        return (
                          <tr key={row.id || idx} className="hover:bg-slate-900/30 text-slate-300">
                            <td className="p-2 whitespace-nowrap text-slate-400">{row.timestamp}</td>
                            <td className="p-2 text-white whitespace-nowrap">{row.sourceIp}</td>
                            <td className="p-2 text-slate-400 whitespace-nowrap">{destIp}</td>
                            <td className="p-2 text-[#39ff14]/80 whitespace-nowrap">{row.country}</td>
                            <td className="p-2 text-white font-semibold whitespace-nowrap">{row.attackType}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Glowing [ Visualize on Map ] Action Button */}
            <div className="w-full space-y-4 pt-2">
              <button
                id="visualize-on-map-btn"
                onClick={() => {
                  if (localParsedThreats) {
                    onLoadThreats(localParsedThreats);
                  }
                }}
                className="w-full py-3 px-6 bg-[#39ff14]/10 hover:bg-[#39ff14]/20 border-2 border-[#39ff14] text-[#39ff14] font-black uppercase text-sm tracking-widest transition-all cursor-pointer glow-box-green hover-glow shadow-[0_0_20px_rgba(57,255,20,0.4)] relative overflow-hidden"
              >
                <span className="relative z-10 font-black">[ Visualize on Map ]</span>
              </button>

              <div className="flex items-center justify-center gap-3">
                <button
                  id="success-upload-reset-btn"
                  onClick={() => {
                    onClearData();
                    setUploadProgress(null);
                    setUploadedFileName(null);
                    setLocalParsedThreats(null);
                  }}
                  className="text-xs font-bold uppercase text-[#ff003c] bg-transparent border border-[#ff003c]/40 hover:border-[#ff003c] px-3 py-1.5 rounded-none transition-all cursor-pointer"
                >
                  [ RESET_BUFFER ]
                </button>
                
                <button
                  id="success-upload-navigate-btn"
                  onClick={triggerFileInput}
                  className="text-xs font-bold uppercase text-slate-400 hover:text-white bg-transparent border border-slate-800 hover:border-slate-500 px-3 py-1.5 rounded-none transition-all cursor-pointer"
                >
                  [ UPLOAD_ANOTHER ]
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
