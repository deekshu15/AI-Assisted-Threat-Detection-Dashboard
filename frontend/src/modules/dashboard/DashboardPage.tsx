import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Box, Chip, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

import GlassSurface from "../../components/ui/GlassSurface";
import PageHeader from "../../components/ui/PageHeader/PageHeader";

function DashboardPage() {
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
                  Monitoring posture is healthy, with two high-priority events requiring analyst attention.
                </Typography>
              </Box>
              <Chip icon={<ShieldRoundedIcon />} label="Operationally ready" color="success" variant="outlined" />
            </Stack>

            <Grid container spacing={2}>
              {[
                { label: "Signals ingested", value: "18.2K", hint: "+12% vs last hour" },
                { label: "Critical detections", value: "24", hint: "5 escalated" },
                { label: "Auto-contained", value: "91%", hint: "above target" },
              ].map((item) => (
                <Grid size={{ xs: 12, sm: 4 }} key={item.label}>
                  <Box sx={{ p: 2.2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.05)" }}>
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
            <List disablePadding>
              {[
                { title: "Investigate ransomware beacon", detail: "Detected in lateral movement path", icon: WarningAmberRoundedIcon },
                { title: "Review cloud IAM anomalies", detail: "Suspicious privilege change", icon: TrendingUpRoundedIcon },
                { title: "Validate enrichment coverage", detail: "MITRE mapping backlog reduced", icon: VerifiedRoundedIcon },
              ].map((item, index) => {
                const Icon = item.icon as typeof WarningAmberRoundedIcon;

                return (
                  <Box key={item.title}>
                    <ListItem disableGutters sx={{ py: 1.25 }}>
                      <Box sx={{ mr: 1.5, color: "primary.main" }}>
                        <Icon />
                      </Box>
                      <ListItemText
                        primary={item.title}
                        secondary={item.detail}
                        sx={{ my: 0 }}
                      />
                    </ListItem>
                    {index < 2 && <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />}
                  </Box>
                );
              })}
            </List>
          </GlassSurface>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <GlassSurface sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Coverage posture
            </Typography>
            <Stack spacing={2.2} mt={1.5}>
              {[
                ["Windows telemetry", "98%"],
                ["AWS audit trail", "94%"],
                ["Threat feed enrichment", "89%"],
              ].map(([label, value]) => (
                <Box key={label}>
                  <Stack direction="row" justifyContent="space-between" mb={0.6}>
                    <Typography variant="body2">{label}</Typography>
                    <Typography variant="body2" color="primary" fontWeight={700}>{value}</Typography>
                  </Stack>
                  <Box sx={{ height: 8, borderRadius: 999, bgcolor: "rgba(255,255,255,0.08)" }}>
                    <Box sx={{ width: value, height: 8, borderRadius: 999, bgcolor: "linear-gradient(90deg, #4F5DFF 0%, #2E9E8E 100%)" }} />
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
              {[
                ["Incident triage", "12 mins ago"],
                ["New IOC ingested", "24 mins ago"],
                ["MITRE mapping refreshed", "1 hr ago"],
              ].map(([title, time]) => (
                <Box key={title} sx={{ p: 1.4, borderRadius: 3, bgcolor: "rgba(255,255,255,0.05)" }}>
                  <Typography fontWeight={600}>{title}</Typography>
                  <Typography variant="body2" color="text.secondary">{time}</Typography>
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