import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import GlassSurface from "../../components/ui/GlassSurface";

const actionCards = [
  {
    title: "Upload Data",
    detail: "CSV or JSON files",
    icon: CloudUploadOutlinedIcon,
  },
  {
    title: "Connect API",
    detail: "Live threat feed",
    icon: WifiRoundedIcon,
  },
  {
    title: "Demo Mode",
    detail: "Use sample data",
    icon: LanguageOutlinedIcon,
  },
];

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 180px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 0, md: 2 },
        py: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 930, textAlign: "center" }}>
        <Stack spacing={2.8} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(15, 23, 42, 0.36)",
              border: "1px solid rgba(45, 212, 191, 0.26)",
              boxShadow: "0 18px 40px rgba(2, 8, 23, 0.28)",
            }}
          >
            <ShieldOutlinedIcon sx={{ fontSize: 38, color: "#22d3ee" }} />
          </Box>

          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: "1.55rem", sm: "1.9rem", md: "2.15rem" } }}>
              Welcome to Cyber Threat Intelligence
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 640, mx: "auto", lineHeight: 1.7, fontSize: { xs: "0.95rem", md: "1rem" } }}>
              To view the dashboard, you need to load threat data first. Upload a data file or connect a live API feed.
            </Typography>
          </Box>

          <Grid container spacing={2.2} sx={{ pt: 1, width: "100%", justifyContent: "center" }}>
            {actionCards.map((card) => {
              const Icon = card.icon;
              const destination = card.title === "Upload Data" ? "/static-data" : card.title === "Connect API" ? "/live-api" : "/analytics";

              return (
                <Grid key={card.title} size={{ xs: 12, sm: 4 }}>
                  <GlassSurface
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(destination)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(destination);
                      }
                    }}
                    sx={{
                      p: { xs: 2.4, md: 2.8 },
                      height: "100%",
                      minHeight: 122,
                      width: "100%",
                      maxWidth: 180,
                      mx: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.9,
                      textAlign: "center",
                      border: "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 24px 48px rgba(2, 8, 23, 0.28)",
                        borderColor: "rgba(45, 212, 191, 0.24)",
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: 34, color: card.title === "Connect API" ? "#7c3aed" : card.title === "Demo Mode" ? "#22c55e" : "#22d3ee" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: "0.98rem" }}>{card.title}</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.3 }}>
                      {card.detail}
                    </Typography>
                  </GlassSurface>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}

export default DashboardPage;