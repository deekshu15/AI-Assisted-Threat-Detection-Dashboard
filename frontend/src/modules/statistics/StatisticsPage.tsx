import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { Box, Chip, Stack, Typography } from "@mui/material";

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
          borderRadius: 4,
          background: "rgba(8, 14, 28, 0.82)",
          border: "1px solid rgba(0, 198, 255, 0.18)",
          boxShadow: "0 28px 70px rgba(0, 0, 0, 0.34)",
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

        <Box
          sx={{
            p: { xs: 2, md: 2.5 },
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0, 198, 255, 0.22)",
          }}
        >
          <Typography variant="caption" sx={{ color: "#6f87a8", letterSpacing: 1 }}>
            SEVERITY DISTRIBUTION
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: 210,
              mt: 2,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.02)",
            }}
          />

          <Stack direction="row" spacing={1.4} justifyContent="center" sx={{ flexWrap: "wrap", mt: -0.2 }}>
            {severityLegend.map((item) => (
              <Box key={item.name} sx={{ display: "inline-flex", alignItems: "center", gap: 0.8 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color }} />
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  {item.name}: {item.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ mt: 2.2, p: { xs: 2, md: 2.5 }, borderRadius: 4, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <Typography variant="caption" sx={{ color: "#6f87a8", letterSpacing: 1 }}>
            TOP ATTACK ORIGINS
          </Typography>

          <Box sx={{ height: 52, mt: 2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.02)" }} />
        </Box>
      </GlassSurface>
    </Box>
  );
}

export default StatisticsPage;