import React from 'react';
import { Shield, Loader2 } from 'lucide-react';
import { Threat } from '../types';

interface AIRecsViewProps {
  threats: Threat[];
}

export default function AIRecsView({ threats }: AIRecsViewProps) {
  return (
    <div id="ai-recs-workspace" className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#030712] text-white space-y-6 font-sans animate-fadeIn">
      
      {/* View Header */}
      <div className="flex flex-row items-center justify-between border-b border-slate-800 pb-4 shrink-0 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <Shield className="h-6 w-6 text-[#39ff14]" />
          <h1 className="text-xl font-bold tracking-tight text-white">
            AI Recommendations
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-[#0d1220] border border-slate-800/80 text-[#39ff14] text-xs font-semibold px-4 py-2 rounded-lg">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Analyzing...</span>
        </div>
      </div>

      {/* Main Content Container with standard rounded-2xl corners */}
      <div className="flex-1 max-w-4xl mx-auto w-full">
        <div className="bg-[#0b0f19] border border-slate-800/60 rounded-2xl p-6 md:p-8 shadow-2xl">
          
          {/* Continuous block of highly legible text */}
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
            <p className="text-slate-200">
              Based on the provided threat intelligence data, here's an analysis and recommended actions:
            </p>

            {/* Suggested Fixes */}
            <div className="border-t border-slate-800/40 pt-5">
              <h2 className="text-base font-bold text-white tracking-tight mb-1">Suggested Fixes</h2>
              <p className="text-slate-400 text-xs">
                Here are specific, actionable remediation steps for the detected threats:
              </p>
            </div>

            {/* Firewall Rules Section */}
            <div className="border-t border-slate-800/40 pt-5 space-y-6">
              <h3 className="text-xs font-bold text-[#39ff14] uppercase tracking-wider mb-2">
                Firewall Rules and Configuration Changes
              </h3>

              {/* RDP Port 3389 */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-white leading-snug">
                  Block RDP (Port 3389) from External Networks to Devices (Firewall, Web Server, IoT Devices, Router):
                </p>
                <div className="pl-4 border-l border-[#39ff14]/30 space-y-1.5">
                  <p className="text-slate-300">
                    <strong className="text-[#39ff14] font-bold">Rule:</strong> Create an inbound firewall rule on all perimeter firewalls to explicitly deny traffic to destination port 3389 (RDP) from any external (untrusted) source IP address range.
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-[#39ff14] font-bold">Configuration:</strong> For internal RDP access, ensure it's restricted to specific management subnets or utilize a secure jump box with multi-factor authentication (MFA). If RDP is absolutely necessary externally, implement strong IP whitelisting and VPN access.
                  </p>
                </div>
              </div>

              {/* SSH Port 22 */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-white leading-snug">
                  Restrict SSH (Port 22) Access (Workstation, Router, Firewall):
                </p>
                <div className="pl-4 border-l border-[#39ff14]/30 space-y-1.5">
                  <p className="text-slate-300">
                    <strong className="text-[#39ff14] font-bold">Rule:</strong> Implement firewall rules to limit inbound SSH access to only known administrative IP addresses or trusted management subnets.
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-[#39ff14] font-bold">Configuration:</strong> Disable direct SSH access to critical devices from the internet. Use a VPN for secure remote access. Enforce key-based authentication over password-based authentication.
                  </p>
                </div>
              </div>

              {/* Database Port Restrictions */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-white leading-snug">
                  Database Port Restrictions (Ports 3306, 5432 - Database Server, IoT Device, Router, Workstation):
                </p>
                <div className="pl-4 border-l border-[#39ff14]/30 space-y-1.5">
                  <p className="text-slate-300">
                    <strong className="text-[#39ff14] font-bold">Rule:</strong> Block inbound traffic to Ports 3306 (MySQL) and 5432 (PostgreSQL) from external networks.
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-[#39ff14] font-bold">Configuration:</strong> Database servers should only be accessible from application servers or specific database administration machines within the internal network, never directly from the internet.
                  </p>
                </div>
              </div>

              {/* Secure DNS Port 53 */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-white leading-snug">
                  Secure DNS (Port 53) on Firewalls and Database Servers:
                </p>
                <div className="pl-4 border-l border-[#39ff14]/30 space-y-1.5">
                  <p className="text-slate-300">
                    <strong className="text-[#39ff14] font-bold">Rule:</strong> Allow only trusted internal DNS servers to initiate outbound queries on port 53. Restrict inbound port 53 to trusted internal DNS client IPs or specific DNS resolvers.
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-[#39ff14] font-bold">Configuration:</strong> Ensure firewalls and database servers are not acting as open DNS resolvers.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
