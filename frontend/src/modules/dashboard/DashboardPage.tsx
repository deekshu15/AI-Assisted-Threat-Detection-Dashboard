import { useEffect, useState } from "react";

import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Box, Chip, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

import GlassSurface from "../../components/ui/GlassSurface";
import PageHeader from "../../components/ui/PageHeader/PageHeader";

interface RecentEvent {
  id: number;
  timestamp: string;
  source: string;
  message: string;
}

interface Priority {
  id: number;
  title: string;
  detail: string;
  severity: string;
}

interface SourceBreakdown {
  source: string;
  count: number;
  percent: number;
}

function formatCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
}

function severityColor(severity: string): "error" | "warning" {
  return severity === "Critical" ? "error" : "warning";
}

function DashboardPage() {
  const [signalsIngested, setSignalsIngested] = useState<string>("—");
  const [criticalDetections, setCriticalDetections] = useState<string>("—");
  const [routineRate, setRoutineRate] = useState<string>("—");
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [sourceBreakdown, setSourceBreakdown] = useState<SourceBreakdown[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentEvent[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/siem/total-count")
      .then((res) => res.json())
      .then((data) => setSignalsIngested(formatCount(data.total)))
      .catch(() => setSignalsIngested("—"));

    fetch("http://localhost:8000/api/siem/severity")
      .then((res) => res.json())
      .then((data: { severity: string; count: number }[]) => {
        const critical = data.find((item) => item.severity === "Critical");
        setCriticalDetections(critical ? formatCount(critical.count) : "0");

        const total = data.reduce((sum, item) => sum + item.count, 0);
        const routine = data
          .filter((item) => item.severity === "Medium" || item.severity === "Low")
          .reduce((sum, item) => sum + item.count, 0);
        setRoutineRate(total > 0 ? `${((routine / total) * 100).toFixed(1)}%` : "—");
      })
      .catch(() => {
        setCriticalDetections("—");
        setRoutineRate("—");
      });

    fetch("http://localhost:8000/api/siem/priorities?limit=3")
      .then((res) => res.json())
      .then(setPriorities)
      .catch(() => setPriorities([]));

    fetch("http://localhost:8000/api/siem/source-breakdown")
      .then((res) => res.json())
      .then(setSourceBreakdown)
      .catch(() => setSourceBreakdown([]));

    fetch("http://localhost:8000/api/siem/events?limit=3")
      .then((res) => res.json())
      .then(setRecentActivity)
      .catch(() => setRecentActivity([]));
  }, []);

  return (
    <>
      <PageHeader
        title="Home overview"
        subtitle="A focused view of current coverage, rising risk, and the next actions your team should take."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <GlassSurface sx={{ p: 3, height: "100%" }}>
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2} mb={3}>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Threat readiness snapshot
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.7 }}>
                  Live metrics computed from normalized Windows and IDS event data.
                </Typography>
              </Box>
              <Chip icon={<ShieldRoundedIcon />} label="Live data" color="success" variant="outlined" />
            </Stack>

            <Grid container spacing={2}>
              {[
                { label: "Signals ingested", value: signalsIngested, hint: "Total normalized events" },
                { label: "Critical detections", value: criticalDetections, hint: "Highest severity events" },
                { label: "Routine event rate", value: routineRate, hint: "Medium/Low of total" },
              ].map((item) => (
                <Grid size={{ xs: 12, sm: 4 }} key={item.label}>
                  <Box sx={{ p: 2.2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.05)", height: "100%" }}>
                    <Typography variant="caption" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                      {item.hint}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </GlassSurface>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <GlassSurface sx={{ p: 3, height: "100%" }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Immediate priorities
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Most recent high-severity events
            </Typography>
            <List disablePadding>
              {priorities.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  Loading...
                </Typography>
              )}
              {priorities.map((item, index) => (
                <Box key={item.id}>
                  <ListItem disableGutters sx={{ py: 1.25 }}>
                    <Box sx={{ mr: 1.5, color: severityColor(item.severity) === "error" ? "error.main" : "warning.main" }}>
                      <WarningAmberRoundedIcon />
                    </Box>
                    <ListItemText primary={item.title} secondary={item.detail} sx={{ my: 0 }} />
                    <Chip size="small" label={item.severity} color={severityColor(item.severity)} />
                  </ListItem>
                  {index < priorities.length - 1 && <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />}
                </Box>
              ))}
            </List>
          </GlassSurface>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <GlassSurface sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Event source breakdown
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Share of total events by source
            </Typography>
            <Stack spacing={2.2}>
              {sourceBreakdown.length === 0 && (
                <Typography variant="body2" color="text.secondary">Loading...</Typography>
              )}
              {sourceBreakdown.map((item) => (
                <Box key={item.source}>
                  <Stack direction="row" justifyContent="space-between" mb={0.6}>
                    <Typography variant="body2">{item.source}</Typography>
                    <Typography variant="body2" color="primary" fontWeight={700}>
                      {item.percent}% ({formatCount(item.count)})
                    </Typography>
                  </Stack>
                  <Box sx={{ height: 8, borderRadius: 999, bgcolor: "rgba(255,255,255,0.08)" }}>
                    <Box sx={{ width: `${item.percent}%`, height: 8, borderRadius: 999, bgcolor: "linear-gradient(90deg, #4F5DFF 0%, #2E9E8E 100%)" }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </GlassSurface>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <GlassSurface sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Recent activity
            </Typography>
            <Stack spacing={1.5} mt={1.5}>
              {recentActivity.length === 0 && (
                <Typography variant="body2" color="text.secondary">Loading...</Typography>
              )}
              {recentActivity.map((event) => (
                <Box key={event.id} sx={{ p: 1.4, borderRadius: 3, bgcolor: "rgba(255,255,255,0.05)" }}>
                  <Typography fontWeight={600}>{event.message}</Typography>
                  <Typography variant="body2" color="text.secondary">{event.source} • {event.timestamp}</Typography>
                </Box>
              ))}
            </Stack>
          </GlassSurface>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;