import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { Box, Grid, Stack, Typography } from "@mui/material";

import GlassSurface from "../../components/ui/GlassSurface";
import PageHeader from "../../components/ui/PageHeader/PageHeader";

const severityLegend = [
  { name: "Critical", value: 0, color: "#ef4444" },
  { name: "High", value: 0, color: "#f97316" },
  { name: "Medium", value: 0, color: "#facc15" },
  { name: "Low", value: 0, color: "#22c55e" },
];

function StatisticsPage() {
  return (
    <Box sx={{ minHeight: "calc(100vh - 180px)", pb: { xs: 3, md: 5 } }}>
      <PageHeader
        title="Statistics"
        subtitle="Overview of threat severity distribution and attack origins."
      />

      <GlassSurface
        sx={{
          width: "100%",
          maxWidth: 1180,
          mx: "auto",
          mt: { xs: 3, md: 4 },
          borderRadius: 4,
          background: "rgba(8, 14, 28, 0.82)",
          boxShadow: "0 28px 70px rgba(0, 0, 0, 0.34)",
          transition: "border-color 180ms ease, box-shadow 180ms ease",
          "&:hover": {
            borderColor: "#22d3ee",
            boxShadow: "0 0 0 2px rgba(34, 211, 238, 0.18), 0 28px 70px rgba(0, 0, 0, 0.34)",
          },
          px: { xs: 2.5, md: 4 },
          py: { xs: 3, md: 3.5 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, mb: 2.2 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22d3ee",
              bgcolor: "rgba(34, 211, 238, 0.08)",
              border: "1px solid rgba(34, 211, 238, 0.22)",
              flexShrink: 0,
            }}
          >
            <BarChartOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Quick Stats
          </Typography>
        </Box>

        <Grid container spacing={2.25}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={panelSx}>
              <Typography variant="caption" sx={sectionLabelSx}>
                SEVERITY DISTRIBUTION
              </Typography>

              <Box sx={emptyChartSx}>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                  No severity data available
                </Typography>
                <Typography variant="caption" sx={{ mt: 0.6, color: "#6f87a8" }}>
                  Connect a source or upload data to populate this chart.
                </Typography>
              </Box>

              <Stack direction="row" spacing={{ xs: 1.2, sm: 1.8 }} sx={{ flexWrap: "wrap", rowGap: 1.2, mt: 2 }}>
                {severityLegend.map((item) => (
                  <Box key={item.name} sx={{ display: "inline-flex", alignItems: "center", gap: 0.7 }}>
                    <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: item.color }} />
                    <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
                      {item.name}: {item.value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={panelSx}>
              <Typography variant="caption" sx={sectionLabelSx}>
                TOP ATTACK ORIGINS
              </Typography>

              <Box sx={emptyChartSx}>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                  No origin data available
                </Typography>
                <Typography variant="caption" sx={{ mt: 0.6, color: "#6f87a8" }}>
                  Origin insights will appear when events are received.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </GlassSurface>
    </Box>
  );
}

const panelSx = {
  height: "100%",
  minHeight: 285,
  p: { xs: 2, md: 2.5 },
  borderRadius: 3,
  bgcolor: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.07)",
};

const sectionLabelSx = {
  display: "block",
  color: "#7891b2",
  letterSpacing: 1,
  fontWeight: 700,
};

const emptyChartSx = {
  minHeight: 172,
  mt: 2,
  px: 2,
  borderRadius: 2.5,
  border: "1px dashed rgba(120, 145, 178, 0.22)",
  bgcolor: "rgba(255,255,255,0.012)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

export default StatisticsPage;
