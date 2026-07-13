import { Box, Button, Container, Grid, Stack, Typography, Chip } from "@mui/material";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";

interface LandingSectionProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

function LandingSection({ title, subtitle, eyebrow, children, actions }: LandingSectionProps) {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3} alignItems={{ xs: "flex-start", md: "center" }} textAlign={{ xs: "left", md: "center" }}>
          {eyebrow && (
            <Chip
              icon={<ShieldRoundedIcon fontSize="small" />}
              label={eyebrow}
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "999px", px: 1, py: 0.5 }}
            />
          )}
          <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.7 }}>
              {subtitle}
            </Typography>
          )}
          {actions && <Box>{actions}</Box>}
          {children}
        </Stack>
      </Container>
    </Box>
  );
}

export default LandingSection;
