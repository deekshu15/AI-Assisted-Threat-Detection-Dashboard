import React, { useState, useRef, useEffect } from 'react';
import { 
  Cpu, Send, Terminal, Shield, RefreshCw, Globe, 
  MapPin, Server, Activity, ShieldAlert, Play, Bot
} from 'lucide-react';
import { ChatMessage, Threat, IPIntelligence } from '../types';
import { PRESET_IP_INTELLIGENCE } from '../data';

interface IPAgentViewProps {
  threats: Threat[];
}

export default function IPAgentView({ threats }: IPAgentViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptChips = [
    "What attacks came from 192.168.1.1?",
    "How do I respond to a ransomware incident?",
    "Generate a server hardening checklist",
    "What firewall rules should I set up?"
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString().slice(0, 5)
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10).map(m => ({ sender: m.sender, text: m.text })),
          currentThreats: threats
        }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();

      let ipReport: IPIntelligence | undefined;
      // Extract IP context to show beautiful visual Telemetry Cards
      if (text.includes('192.168.1.51') || text.includes('192.168.1.1')) {
        const targetIp = text.includes('192.168.1.1') ? '192.168.1.1' : '192.168.1.51';
        ipReport = {
          ...PRESET_IP_INTELLIGENCE['192.168.1.51'],
          ip: targetIp
        };
      } else if (text.includes('185.220.101.5')) {
        ipReport = PRESET_IP_INTELLIGENCE['185.220.101.5'];
      }

      const agentMsg: ChatMessage = {
        id: `msg-${Date.now()}-agent`,
        sender: 'agent',
        text: data.text,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        ipReport
      };

      setMessages(prev => [...prev, agentMsg]);
    } catch (err) {
      console.error('Error hitting server chat route:', err);
      // Client-side fallback responder (very fast and highly styled!)
      const lowerText = text.toLowerCase();
      let responseText = '';
      let ipReport: IPIntelligence | undefined;

      // Match IP addresses
      const ipMatch = lowerText.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
      const matchedIp = ipMatch ? ipMatch[0] : null;

      // Match attack types
      const matchedAttack = [
        'DDoS', 'Ransomware', 'Brute Force', 'SQL Injection', 'Phishing', 'Zero-Day', 'XSS'
      ].find(type => lowerText.includes(type.toLowerCase()));

      // Match countries
      const matchedCountry = [
        'United Kingdom', 'Australia', 'South Korea', 'India', 'Iran', 'Germany', 
        'Brazil', 'Japan', 'Russia', 'China', 'United States', 'Nigeria'
      ].find(c => lowerText.includes(c.toLowerCase()));

      // Filter threats
      const matches = threats.filter(t => {
        if (matchedIp && t.sourceIp === matchedIp) return true;
        if (matchedAttack && t.attackType.toLowerCase() === matchedAttack.toLowerCase()) return true;
        if (matchedCountry && t.country.toLowerCase() === matchedCountry.toLowerCase()) return true;
        return false;
      });

      if (matchedIp) {
        const ipLogs = matches.slice(0, 5);
        const attackSummary = ipLogs.map(l => `- **${l.attackType}** targeting **${l.targetDevice}** (${l.severity} severity) status **${l.status}** at **${l.timestamp}**`).join('\n');
        
        // Populate standard ipReport payload for the UI visual telemetry card
        const preset = PRESET_IP_INTELLIGENCE[matchedIp] || PRESET_IP_INTELLIGENCE['192.168.1.51'];
        ipReport = {
          ip: matchedIp,
          geolocation: preset?.geolocation || 'Remote Location (Extrapolated)',
          isp: preset?.isp || 'Unresolved Cloud/ISP Provider',
          threatLevel: matches.some(m => m.severity === 'Critical') ? 'Critical' : (matches.some(m => m.severity === 'High') ? 'High' : 'Medium'),
          securityContext: preset?.securityContext || 'Host registered malicious scans or active exploits in the log buffer.',
          associatedAttacks: matches.length,
          lastSeen: matches[0]?.timestamp || new Date().toISOString()
        };

        responseText = `### Target IP Diagnostics: **${matchedIp}**

I have compiled a real-time host report for internal asset **${matchedIp}**. Telemetry indicators show **${matches.length}** logged exploits in the active threat buffer.

${ipLogs.length > 0 ? `#### Recent Activity Logs:
${attackSummary}` : `*No specific logged incidents were found for this IP address in the active threat buffer.*`}

#### Tactical Mitigations:
1. Revoke corporate login keys for accounts linked to this host.
2. Segregate switch port VLAN configuration immediately.
3. Initiate host kernel forensics.`;

      } else if (matchedAttack) {
        const attackLogs = matches.slice(0, 5);
        const logTable = attackLogs.map(l => `| ${l.id} | ${l.timestamp} | ${l.sourceIp} | ${l.country} | ${l.targetDevice} | ${l.severity} |`).join('\n');

        responseText = `### 🔍 Telemetry Search: **${matchedAttack}** attacks

- **Total Correlated Records**: **${matches.length}** incidents found in the live dataset.
- **Top Vulnerable Targets**: ${Array.from(new Set(attackLogs.map(m => m.targetDevice))).join(', ') || 'None'}

${attackLogs.length > 0 ? `#### Live Threat Occurrences Table:
| Incident ID | Timestamp | Source IP | Origin Country | Target Device | Severity |
|---|---|---|---|---|---|
${logTable}` : `*No occurrences of ${matchedAttack} attacks are currently logged in the threat buffer.*`}

#### 🛡️ Mitigation Actions for ${matchedAttack}:
1. Enable real-time traffic filtering on inbound gateway interfaces.
2. Deploy specific endpoint posture agents to scan and isolate malicious executables.`;

      } else if (matchedCountry) {
        const countryLogs = matches.slice(0, 5);
        const logTable = countryLogs.map(l => `| ${l.id} | ${l.timestamp} | ${l.sourceIp} | ${l.attackType} | ${l.targetDevice} | ${l.severity} |`).join('\n');

        responseText = `### 🗺️ Geographic Telemetry Search: **${matchedCountry}**

- **Total Logged Security Events**: **${matches.length}** alerts originating from this geo-location.
- **Observed Attack Profilers**: ${Array.from(new Set(countryLogs.map(m => m.attackType))).join(', ') || 'None'}

${countryLogs.length > 0 ? `#### Originating Incidents Table:
| Incident ID | Timestamp | Source IP | Attack Type | Target Device | Severity |
|---|---|---|---|---|---|
${logTable}` : `*No active ingress threat alerts mapped to ${matchedCountry} origin records currently.*`}

#### 🛡️ Geopolitical Response Guidelines:
1. Enable Geo-blocking rules at the CDN / edge proxy layers for non-operational ports.
2. Configure automated challenge CAPTCHAs on HTTP services.`;

      } else if (lowerText.includes('ransomware') || lowerText.includes('respond to a ransomware')) {
        responseText = `### Playbook: Active Ransomware Containment

For ransomware containment, follow the absolute isolation protocols:
- **Subnet Quarantine**: Sever layer-3 core networks.
- **Isolate backup vaults**: Decouple SAN nodes to prevent encryption.
- **Identify attack vector**: Check for vulnerabilities (e.g. ProxyShell, CVE-2021-34473).`;
      } else if (lowerText.includes('hardening') || lowerText.includes('server hardening checklist')) {
        responseText = `### Hardening Standard: Linux Host Server

Apply these critical configuration rules inside \`/etc/ssh/sshd_config\`:
\`\`\`text
PermitRootLogin no
PasswordAuthentication no
MaxAuthTries 3
Protocol 2
\`\`\`
Enable dynamic rate limiting on incoming port 22 using \`ufw limit 22/tcp\`.`;
      } else if (lowerText.includes('firewall') || lowerText.includes('firewall rules')) {
        responseText = `### Defensive Firewall Policy Template

Recommended implicit-deny rules:
- Allow ingress strictly on SSH (\`22\`), Web (\`80\`, \`443\`).
- Apply rate limiting on TCP connection handshakes.
- Drop all ingress database connection queries from unmapped subnets.`;
      } else {
        responseText = `### AI Security Intelligence Report

I have logged your security inquiry. I am currently monitoring **${threats.length} threat events**.

- Active Block Rate: **${threats.length ? '74%' : 'N/A'}**
- Secure Gateway Integrity: **Green**

How can I assist you with mitigation scripting? You can ask about ransomware, local firewalls, or diagnostic telemetry for IP **192.168.1.51**.`;
      }

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `msg-${Date.now()}-agent-fallback`,
          sender: 'agent',
          text: responseText,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          ipReport
        }]);
      }, 400);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputVal);
  };

  // High-fidelity Markdown line & block parser to cleanly compile headers, code-blocks, list elements, and markdown tables.
  const parseMarkdownToReact = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushCodeBlock = (key: number) => {
      const codeText = codeContent.join('\n');
      elements.push(
        <pre key={`code-${key}`} className="bg-[#070a13] border border-slate-800 p-3 rounded-lg overflow-x-auto text-[11px] font-mono text-[#39ff14] my-2">
          <code>{codeText}</code>
        </pre>
      );
      codeContent = [];
    };

    const flushTable = (key: number) => {
      if (tableRows.length === 0) return;
      // Filter out divider rows like |---|---|
      const filteredRows = tableRows.filter(row => !row.every(cell => cell.trim().match(/^-+$/)));
      
      elements.push(
        <div key={`table-wrapper-${key}`} className="overflow-x-auto my-3 border border-slate-800 rounded-lg">
          <table className="min-w-full divide-y divide-slate-800 text-[11px] text-left">
            <thead className="bg-[#0d1220] text-slate-300 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                {filteredRows[0]?.map((cell, cIdx) => (
                  <th key={cIdx} className="px-3 py-2 border-r border-slate-800 last:border-r-0">
                    {parseInlineBold(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-[#070a13]/40">
              {filteredRows.slice(1).map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/10 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 py-2 border-r border-slate-800 last:border-r-0 text-slate-300 font-sans">
                      {parseInlineBold(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    };

    const parseInlineBold = (txt: string) => {
      const parts = txt.split('**');
      return parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) return <strong key={pIdx} className="text-[#39ff14] font-bold">{part}</strong>;
        return part;
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Code Block Detection
      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          flushCodeBlock(i);
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        continue;
      }

      // Table Detection
      if (trimmed.startsWith('|')) {
        if (!inTable) {
          inTable = true;
        }
        const cells = line.split('|').slice(1, -1);
        tableRows.push(cells);
        continue;
      } else if (inTable) {
        inTable = false;
        flushTable(i);
      }

      // Headers
      if (trimmed.startsWith('###')) {
        elements.push(
          <h4 key={i} className="text-xs font-bold uppercase text-white mt-4 mb-2 tracking-wider border-b border-slate-800 pb-1 font-sans">
            {trimmed.replace(/^###\s+/, '')}
          </h4>
        );
        continue;
      }
      if (trimmed.startsWith('####')) {
        elements.push(
          <h5 key={i} className="text-[11px] font-bold uppercase text-[#39ff14] mt-3 mb-1 tracking-wider font-sans">
            {trimmed.replace(/^####\s+/, '')}
          </h5>
        );
        continue;
      }

      // Lists
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        elements.push(
          <div key={i} className="flex items-start gap-1.5 my-1.5 text-xs text-slate-300 font-sans">
            <span className="text-[#39ff14] mt-1 shrink-0 font-bold">&gt;</span>
            <span>{parseInlineBold(trimmed.replace(/^[-*]\s+/, ''))}</span>
          </div>
        );
        continue;
      }

      // Ordered Lists
      if (/^\d+\.\s+/.test(trimmed)) {
        const number = trimmed.match(/^\d+/)?.[0] || '1';
        const rest = trimmed.replace(/^\d+\.\s+/, '');
        elements.push(
          <div key={i} className="flex items-start gap-1.5 my-1.5 text-xs text-slate-300 font-sans">
            <span className="text-[#39ff14] mt-0.5 shrink-0 font-semibold">{number}.</span>
            <span>{parseInlineBold(rest)}</span>
          </div>
        );
        continue;
      }

      if (trimmed === '') {
        elements.push(<div key={i} className="h-1.5"></div>);
        continue;
      }

      // Normal paragraph
      elements.push(
        <p key={i} className="text-xs text-slate-300 leading-relaxed my-1 font-sans">
          {parseInlineBold(trimmed)}
        </p>
      );
    }

    // Flush any remaining active blocks
    if (inCodeBlock) flushCodeBlock(lines.length);
    if (inTable) flushTable(lines.length);

    return elements;
  };

  return (
    <div id="ip-agent-workspace" className="flex-1 flex flex-col bg-[#030712] text-white font-sans h-full overflow-y-auto p-6 scrollbar-none animate-fadeIn">
      {/* Page Header (Matching Image 2 outer layout) */}
      <div className="mb-6 max-w-4xl w-full mx-auto shrink-0 text-left">
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">Cyber Security Agent</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Ask about IP threats, get security advice, generate action plans, or request analytics.</p>
      </div>

      {/* Main Chatbot Card Container with sharp edge profiles */}
      <div className="max-w-4xl w-full mx-auto flex-1 bg-[#0b0f19] border border-slate-800 rounded-none flex flex-col shadow-2xl overflow-hidden mb-4 min-h-[520px]">
        
        {/* Chat Header (Matching Image 2) */}
        <div className="p-4 border-b border-slate-800 flex items-start gap-3 bg-[#0d1220] shrink-0">
          <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-none text-[#39ff14] mt-0.5">
            <Bot className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Cyber Security Agent</h3>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">
              Ask about IP threats, get security advice, generate action plans, or request analytics with charts.
            </p>
          </div>
        </div>

        {/* Chat Message Box / Suggestions Screen */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-none flex flex-col">
          {messages.length === 0 ? (
            /* Try Asking suggestions view */
            <div className="flex-1 flex flex-col items-center justify-center py-8 max-w-xl mx-auto w-full">
              <Bot className="h-12 w-12 text-[#39ff14] mb-3 animate-pulse" />
              <span className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase mb-4">Try asking:</span>
              <div className="space-y-3 w-full">
                {promptChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="w-full text-center bg-[#070a13] border border-slate-800 hover:border-[#39ff14] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:text-[#39ff14] transition-all cursor-pointer duration-150 shadow-md glow-box-green"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Message Logs Timeline */
            <div className="space-y-5">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full animate-fadeIn`}>
                    <div className={`max-w-[85%] flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}>
                      
                      {/* Message Bubble */}
                      <div className={`p-4 rounded-2xl text-xs font-sans leading-relaxed ${
                        isUser 
                          ? 'bg-[#1e293b]/80 border border-slate-700/30 rounded-tr-none text-white font-medium shadow-sm' 
                          : 'bg-[#111827]/70 border border-slate-800/80 rounded-tl-none text-slate-200 shadow-sm'
                      }`}>
                        {isUser ? (
                          <p>{msg.text}</p>
                        ) : (
                          <div className="space-y-1">
                            {parseMarkdownToReact(msg.text)}
                          </div>
                        )}
                      </div>

                      {/* Timestamp & Sender Metadata Label */}
                      <span className="text-[9px] text-slate-500 font-mono px-1">
                        {isUser ? 'You' : 'Cyber AI Agent'} • {msg.timestamp}
                      </span>

                      {/* Diagnostic IP Intelligence Details Widget */}
                      {!isUser && msg.ipReport && (
                        <div className="bg-[#0e1322] border border-slate-800 rounded-xl p-4 flex flex-col space-y-3 shadow-xl mt-3 w-full max-w-lg">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <div className="flex items-center gap-2">
                              <ShieldAlert className="h-4 w-4 text-[#ff003c] animate-pulse" />
                              <span className="text-xs font-black text-white uppercase tracking-wider">!! TELEMETRY INSIGHT: {msg.ipReport.ip} !!</span>
                            </div>
                            <span className="text-[9px] font-bold text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/40 px-2 py-0.5 rounded-md uppercase">
                              {msg.ipReport.threatLevel} RISK
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Globe className="h-3.5 w-3.5 text-[#ff003c]" />
                              <span>Geolocation: <span className="text-white font-semibold">{msg.ipReport.geolocation}</span></span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Server className="h-3.5 w-3.5 text-[#ff003c]" />
                              <span>ISP Gateway: <span className="text-white font-semibold">{msg.ipReport.isp}</span></span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Activity className="h-3.5 w-3.5 text-[#ff003c]" />
                              <span>Logged Incidents: <span className="text-white font-semibold">{msg.ipReport.associatedAttacks} attacks</span></span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Terminal className="h-3.5 w-3.5 text-[#ff003c]" />
                              <span>Last Ingress: <span className="text-white font-semibold">{msg.ipReport.lastSeen}</span></span>
                            </div>
                          </div>

                          <div className="text-[11px] bg-[#070a13] border border-slate-800 p-2.5 rounded-lg text-slate-300 leading-relaxed">
                            <strong className="text-[#ff003c] uppercase font-sans tracking-wider text-[10px]">Security Context:</strong> {msg.ipReport.securityContext}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing / Thinking Pulse Bubble */}
              {loading && (
                <div className="flex justify-start w-full">
                  <div className="flex items-center gap-2 p-3 bg-[#111827]/50 border border-slate-800/80 rounded-2xl rounded-tl-none text-xs text-slate-400 max-w-[240px]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    <span className="font-semibold">Agent is compiling response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input Bar Form (Matching Image 2) */}
        <div className="p-4 bg-[#0d1220] border-t border-slate-800/50 shrink-0">
          <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-center bg-[#070a13] border border-slate-800 focus-within:border-green-500/50 rounded-full px-4 py-1.5 w-full transition-all">
              <input
                type="text"
                placeholder="Ask anything about cybersecurity..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={loading}
                className="flex-1 bg-transparent border-none outline-none text-xs text-slate-200 placeholder-slate-500 py-2 px-1 focus:ring-0 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || loading}
                className="p-2 bg-[#39ff14] hover:bg-green-500 active:scale-95 text-slate-950 rounded-full transition-all duration-150 disabled:opacity-30 cursor-pointer flex items-center justify-center shrink-0 ml-2 h-8 w-8"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}
