import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";

import GlassSurface from "../../components/ui/GlassSurface";
import PageHeader from "../../components/ui/PageHeader/PageHeader";

interface StatItem {
  label: string;
  value: string;
  detail: string;
}

interface WidgetItem {
  title: string;
  description: string;
  meta: string;
}

interface PlaceholderFeaturePageProps {
  title: string;
  description: string;
  stats?: StatItem[];
  widgets?: WidgetItem[];
  badge?: string;
}

function PlaceholderFeaturePage({
  title,
  description,
  stats = [],
  widgets = [],
  badge,
}: PlaceholderFeaturePageProps) {
  return (
    <>
      <PageHeader title={title} subtitle={description} />

      <Grid container spacing={3}>
        {stats.length > 0 && (
          <Grid size={{ xs: 12, lg: 8 }}>
            <GlassSurface sx={{ p: 3, height: "100%" }}>
              <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2} mb={3}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Live readiness snapshot
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.6 }}>
                    Curated telemetry and workflow status for this operational area.
                  </Typography>
                </Box>
                {badge && <Chip label={badge} color="primary" variant="outlined" />}
              </Stack>

              <Grid container spacing={2}>
                {stats.map((stat) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                    <Box sx={{ p: 2.2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Typography variant="caption" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" fontWeight={700} sx={{ mt: 0.4 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                        {stat.detail}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </GlassSurface>
          </Grid>
        )}

        <Grid size={{ xs: 12, lg: stats.length > 0 ? 4 : 12 }}>
          <GlassSurface sx={{ p: 3, height: "100%" }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Recommended next steps
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Use this space to review execution status, assign ownership, and confirm the most important follow-up actions for this tool chain.
            </Typography>
            <Divider sx={{ my: 2.2, borderColor: "rgba(255,255,255,0.08)" }} />
            <Stack spacing={1.4}>
              {[
                "Align the latest detections with analyst triage",
                "Review enrichment coverage and confidence scoring",
                "Confirm the next escalation path for critical events",
              ].map((item) => (
                <Box key={item} sx={{ px: 1.2, py: 1, borderRadius: 2, bgcolor: "rgba(255,255,255,0.05)" }}>
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Stack>
          </GlassSurface>
        </Grid>

        {widgets.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={3}>
              {widgets.map((widget) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={widget.title}>
                  <GlassSurface sx={{ p: 3, height: "100%" }}>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {widget.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {widget.description}
                    </Typography>
                    <Box sx={{ mt: 2, display: "inline-flex", px: 1.4, py: 0.7, borderRadius: 999, bgcolor: "rgba(79,93,255,0.16)", color: "primary.light" }}>
                      <Typography variant="caption" fontWeight={700}>
                        {widget.meta}
                      </Typography>
                    </Box>
                  </GlassSurface>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default PlaceholderFeaturePage;
