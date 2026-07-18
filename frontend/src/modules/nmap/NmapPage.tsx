import { useMemo, useState } from "react";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";

import GlassSurface from "../../components/ui/GlassSurface";

type ScanType = "quick" | "full" | "syn" | "service";

type PortFinding = {
  port: number;
  protocol: "tcp" | "udp";
  service: string;
  state: "open" | "filtered" | "closed";
  risk: "low" | "medium" | "high";
};

type HostSnapshot = {
  target: string;
  resolvedTo: string;
  osGuess: string;
  scanType: ScanType;
  findings: PortFinding[];
  score: number;
  status: string;
};

const scanTypes: Array<{
  id: ScanType;
  title: string;
  description: string;
}> = [
  { id: "quick", title: "Quick Scan", description: "Top 100 ports" },
  { id: "full", title: "Full Scan", description: "All 65535 ports" },
  { id: "syn", title: "SYN Stealth", description: "Half-open scan" },
  { id: "service", title: "Service Detect", description: "Version detection" },
];

const commonServices: Array<{ port: number; service: string; protocol: "tcp" | "udp"; risk: PortFinding["risk"] }> = [
  { port: 22, service: "ssh", protocol: "tcp", risk: "medium" },
  { port: 53, service: "dns", protocol: "udp", risk: "low" },
  { port: 80, service: "http", protocol: "tcp", risk: "medium" },
  { port: 110, service: "pop3", protocol: "tcp", risk: "medium" },
  { port: 139, service: "netbios-ssn", protocol: "tcp", risk: "high" },
  { port: 143, service: "imap", protocol: "tcp", risk: "medium" },
  { port: 443, service: "https", protocol: "tcp", risk: "low" },
  { port: 445, service: "microsoft-ds", protocol: "tcp", risk: "high" },
  { port: 3389, service: "rdp", protocol: "tcp", risk: "high" },
  { port: 8080, service: "http-proxy", protocol: "tcp", risk: "medium" },
  { port: 8443, service: "https-alt", protocol: "tcp", risk: "medium" },
  { port: 9200, service: "elasticsearch", protocol: "tcp", risk: "high" },
];

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }

  return Math.abs(hash);
}

function isValidTarget(value: string) {
  const target = value.trim();
  if (!target) {
    return false;
  }

  if (/^(localhost|127\.0\.0\.1|\d{1,3}(?:\.\d{1,3}){3}|\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})$/.test(target)) {
    return true;
  }

  return /^[a-zA-Z0-9.-]+$/.test(target) && !target.startsWith("-") && !target.endsWith("-");
}

function buildResolvedAddress(target: string) {
  const seed = hashString(target);
  const third = (seed % 254) + 1;
  const fourth = ((seed >> 8) % 254) + 1;
  return `10.${third}.${(seed >> 16) % 254}.${fourth}`;
}

function pickPorts(target: string, scanType: ScanType) {
  const seed = hashString(`${target}-${scanType}`);
  const threshold = scanType === "full" ? 10 : scanType === "service" ? 6 : scanType === "syn" ? 4 : 3;
  const selected = commonServices.filter((_, index) => ((seed + index * 13) % 7) < threshold);

  if (selected.length === 0) {
    return [commonServices[0]];
  }

  return selected;
}

function buildFindings(target: string, scanType: ScanType) {
  const ports = pickPorts(target, scanType);
  return ports.map<PortFinding>((item) => ({
    port: item.port,
    protocol: item.protocol,
    service: item.service,
    state: item.risk === "low" ? "closed" : item.risk === "medium" ? "filtered" : "open",
    risk: item.risk,
  }));
}

function scoreScan(findings: PortFinding[]) {
  return Math.min(findings.reduce((score, finding) => score + (finding.risk === "high" ? 22 : finding.risk === "medium" ? 10 : 4), 0), 100);
}

function getStatus(score: number, findings: PortFinding[]) {
  if (findings.some((finding) => finding.risk === "high") || score >= 50) {
    return "High exposure";
  }

  if (score >= 25) {
    return "Review recommended";
  }

  return "Low exposure";
}

function getOsGuess(target: string) {
  const seed = hashString(target);
  const guesses = ["Linux 5.x", "Windows Server 2019", "Network appliance", "BSD-family host"];
  return guesses[seed % guesses.length];
}

function NmapPage() {
  const [target, setTarget] = useState("192.168.1.0/24");
  const [scanType, setScanType] = useState<ScanType>("quick");
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<HostSnapshot | null>(null);

  const selectedScan = useMemo(() => scanTypes.find((item) => item.id === scanType) ?? scanTypes[0], [scanType]);

  const startScan = async () => {
    const trimmedTarget = target.trim();

    if (!isValidTarget(trimmedTarget)) {
      setErrorMessage("Enter a valid IP, CIDR block, localhost, or hostname.");
      return;
    }

    setErrorMessage("");
    setIsScanning(true);
    setResult(null);

    await new Promise((resolve) => window.setTimeout(resolve, 900));

    const findings = buildFindings(trimmedTarget, scanType);
    const score = scoreScan(findings);

    setResult({
      target: trimmedTarget,
      resolvedTo: buildResolvedAddress(trimmedTarget),
      osGuess: getOsGuess(trimmedTarget),
      scanType,
      findings,
      score,
      status: getStatus(score, findings),
    });
    setIsScanning(false);
  };

  const riskColor = result ? (result.score >= 50 ? "#fb7185" : result.score >= 25 ? "#fbbf24" : "#34d399") : "#7c8aa5";

  return (
    <Box sx={{ minHeight: "calc(100vh - 180px)", pb: { xs: 3, md: 5 } }}>
      <Box sx={{ width: "100%", maxWidth: 960, mx: "auto", pt: { xs: 1, md: 2 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: "1.75rem", md: "2rem" } }}>
          Nmap Network Scanner
        </Typography>

        <Typography sx={{ mt: 2, color: "text.secondary", maxWidth: 760, lineHeight: 1.7, fontSize: { xs: "0.97rem", md: "1.02rem" } }}>
          Discover hosts, open ports, running services, and potential vulnerabilities on your network.
        </Typography>
      </Box>

      <GlassSurface
        sx={{
          width: "100%",
          maxWidth: 960,
          mx: "auto",
          mt: 4,
          px: { xs: 2.5, md: 4 },
          py: { xs: 3, md: 3.5 },
          borderRadius: 4,
          background: "rgba(8, 14, 28, 0.82)",
          border: "1px solid rgba(0, 198, 255, 0.18)",
          boxShadow: "0 28px 70px rgba(0, 0, 0, 0.34)",
        }}
      >
        <Typography variant="caption" sx={{ display: "block", mb: 1.1, color: "#6f87a8", letterSpacing: 0.8 }}>
          Target (IP / CIDR / hostname)
        </Typography>

        <TextField
          fullWidth
          hiddenLabel
          value={target}
          onChange={(event) => {
            setTarget(event.target.value);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
          placeholder="192.168.1.0/24"
          variant="outlined"
          size="small"
          sx={{
            mb: 2.2,
            "& .MuiOutlinedInput-root": {
              minHeight: 42,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.04)",
              color: "text.primary",
              fontWeight: 600,
              "& fieldset": { borderColor: "rgba(255,255,255,0.06)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.12)" },
              "&.Mui-focused fieldset": { borderColor: "rgba(34, 211, 238, 0.45)" },
            },
            "& .MuiInputBase-input": {
              py: 1.2,
              px: 1.7,
              fontSize: "0.98rem",
              "&::placeholder": { color: "rgba(148, 163, 184, 0.72)", opacity: 1 },
            },
          }}
        />

        <Typography variant="caption" sx={{ display: "block", mb: 1.1, color: "#6f87a8", letterSpacing: 0.8 }}>
          Scan Type
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.2 }}>
          {scanTypes.map((item) => {
            const active = item.id === scanType;

            return (
              <Box
                key={item.id}
                onClick={() => setScanType(item.id)}
                sx={{
                  minHeight: 54,
                  px: 1.6,
                  py: 1.2,
                  borderRadius: 3,
                  cursor: "pointer",
                  bgcolor: active ? "rgba(0, 198, 255, 0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? "rgba(0, 198, 255, 0.95)" : "rgba(255,255,255,0.06)"}`,
                  transition: "160ms ease",
                  "&:hover": {
                    bgcolor: active ? "rgba(0, 198, 255, 0.14)" : "rgba(255,255,255,0.06)",
                  },
                }}
              >
                <Typography fontWeight={700} sx={{ color: active ? "#22d3ee" : "text.primary" }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.2, color: active ? "#7dd3fc" : "text.secondary" }}>
                  {item.description}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Button
          onClick={startScan}
          disabled={isScanning}
          fullWidth
          startIcon={<PlayArrowRoundedIcon />}
          sx={{
            mt: 2.2,
            minHeight: 42,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.98rem",
            color: "#e5e7eb",
            bgcolor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.07)",
              borderColor: "rgba(255,255,255,0.12)",
            },
          }}
        >
          {isScanning ? "Scanning..." : "Start Scan"}
        </Button>

        {errorMessage && (
          <Box sx={{ mt: 2.2, p: 1.5, borderRadius: 2, bgcolor: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.18)" }}>
            <Typography variant="body2" sx={{ color: "#fca5a5" }}>
              {errorMessage}
            </Typography>
          </Box>
        )}

        {result && (
          <Box sx={{ mt: 3, display: "grid", gap: 2.2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2, alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Scan result
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                  {result.status} • Score {result.score}/100
                </Typography>
              </Box>

              <Chip
                label={result.status}
                sx={{
                  bgcolor: `${riskColor}1a`,
                  color: riskColor,
                  border: `1px solid ${riskColor}33`,
                  fontWeight: 700,
                }}
              />
            </Box>

            <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography variant="caption" color="text.secondary">
                  Target
                </Typography>
                <Typography variant="body2">{result.target}</Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography variant="caption" color="text.secondary">
                  Resolved Address
                </Typography>
                <Typography variant="body2">{result.resolvedTo}</Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography variant="caption" color="text.secondary">
                  Scan Type
                </Typography>
                <Typography variant="body2">{selectedScan.title}</Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography variant="caption" color="text.secondary">
                  OS Guess
                </Typography>
                <Typography variant="body2">{result.osGuess}</Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ display: "block", mb: 1, letterSpacing: 1, color: "#6f87a8" }}>
                DISCOVERED SERVICES
              </Typography>
              <Stack spacing={1.1}>
                {result.findings.map((finding) => (
                  <Box
                    key={`${finding.port}-${finding.protocol}`}
                    sx={{
                      p: 1.4,
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <Stack direction="row" spacing={1.2} alignItems="center" justifyContent="space-between" flexWrap="wrap">
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <PublicRoundedIcon sx={{ color: severityColor(finding.risk) }} fontSize="small" />
                        <Typography variant="body2" fontWeight={700}>
                          {finding.port}/{finding.protocol}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {finding.service}
                        </Typography>
                      </Stack>

                      <Chip
                        size="small"
                        label={finding.state}
                        sx={{
                          textTransform: "capitalize",
                          bgcolor: `${severityColor(finding.risk)}1a`,
                          color: severityColor(finding.risk),
                          border: `1px solid ${severityColor(finding.risk)}33`,
                          fontWeight: 700,
                        }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box sx={{ display: "grid", gap: 1.1, gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" } }}>
              {[
                { label: "Hosts scanned", value: result.scanType === "full" ? "1" : "1" },
                { label: "Open ports", value: String(result.findings.filter((finding) => finding.state === "open").length) },
                { label: "Critical", value: String(result.findings.filter((finding) => finding.risk === "high").length) },
              ].map((item) => (
                <Box key={item.label} sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Typography variant="caption" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ mt: 0.4 }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              onClick={() => setResult(null)}
              fullWidth
              startIcon={<ShieldOutlinedIcon />}
              sx={{
                minHeight: 42,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.98rem",
                color: "#e5e7eb",
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              Clear Results
            </Button>
          </Box>
        )}

        <Stack direction="row" spacing={1.2} justifyContent="center" sx={{ mt: 3.5, flexWrap: "wrap" }}>
          {[
            "Host discovery",
            "Port analysis",
            "Service detection",
            "Risk scoring",
          ].map((item) => (
            <Chip
              key={item}
              label={item}
              variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.08)", color: "text.secondary" }}
            />
          ))}
        </Stack>
      </GlassSurface>
    </Box>
  );
}

export default NmapPage;
