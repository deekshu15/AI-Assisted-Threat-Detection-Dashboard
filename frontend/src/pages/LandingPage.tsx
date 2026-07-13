import { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useNavigate } from "react-router-dom";

import GlassSurface from "../components/ui/GlassSurface";

const features = [
  {
    title: "Operational clarity",
    description: "Turn scattered telemetry into a calm, guided view of the threats that matter most.",
    icon: DashboardRoundedIcon,
  },
  {
    title: "Focused intelligence",
    description: "Layer context, detections, and responses into one premium workflow for analysts.",
    icon: InsightsRoundedIcon,
  },
  {
    title: "Trusted protections",
    description: "Keep teams aligned with streamlined review paths and evidence-backed actions.",
    icon: SecurityRoundedIcon,
  },
  {
    title: "Real-time alerting",
    description: "Receive instant, prioritized notifications the moment a credible threat is detected.",
    icon: NotificationsActiveRoundedIcon,
  },
  {
    title: "Team collaboration",
    description: "Assign, comment, and hand off cases seamlessly across shifts and analysts.",
    icon: GroupsRoundedIcon,
  },
  {
    title: "Actionable reporting",
    description: "Generate export-ready summaries for leadership, compliance, and executive reviews.",
    icon: SummarizeRoundedIcon,
  },
];

const stats = [
  { label: "Teams protected", value: "500+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Avg. response", value: "10 min" },
];

function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState({ features: false, about: false, feedback: false });

  const navItems = useMemo(
    () => [
      { label: "Features", href: "#features" },
      { label: "About", href: "#about" },
      { label: "Feedback", href: "#feedback" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = [document.getElementById("features"), document.getElementById("about"), document.getElementById("feedback")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as keyof typeof revealed;
            setRevealed((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.16 }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 1200, px: { xs: 2, md: 4 }, py: 1.5 }}>
        <Container maxWidth="xl">
          <GlassSurface
            sx={{
              px: { xs: 2, md: 3 },
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 180ms ease",
              transform: scrolled ? "scale(0.985)" : "scale(1)",
              boxShadow: scrolled ? "0 18px 42px rgba(2, 6, 23, 0.34)" : "0 16px 36px rgba(2, 6, 23, 0.26)",
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box sx={{ width: 42, height: 42, borderRadius: "50%", bgcolor: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <ShieldRoundedIcon />
              </Box>
              <Box>
                <Typography fontWeight={800}>Northstar Security</Typography>
                <Typography variant="caption" color="text.secondary">Focused defense for modern security teams</Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} underline="none" color="text.secondary" sx={{ transition: "color 160ms ease", "&:hover": { color: "primary.main" } }}>
                  {item.label}
                </Link>
              ))}
              <Button variant="outlined" color="primary" onClick={() => navigate("/dashboard")}>Sign In</Button>
              <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>Sign Up</Button>
            </Stack>

            <Button variant="text" sx={{ display: { xs: "inline-flex", md: "none" }, minWidth: 0 }} onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
            </Button>
          </GlassSurface>
          {menuOpen && (
            <GlassSurface sx={{ mt: 1.25, p: 2, display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 1.25 }}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} underline="none" color="text.secondary" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>Open workspace</Button>
            </GlassSurface>
          )}
        </Container>
      </Box>

      <Box sx={{ py: { xs: 7, md: 12 }, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 15%, rgba(79,93,255,0.18), transparent 30%), radial-gradient(circle at 80% 20%, rgba(46,158,142,0.14), transparent 24%)" }} />
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Stack spacing={3} alignItems="center" textAlign="center" sx={{ maxWidth: 900, mx: "auto" }}>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 1.5, py: 0.75, borderRadius: 999, bgcolor: "rgba(79,93,255,0.16)", color: "primary.light" }}>
              <AutoAwesomeRoundedIcon fontSize="small" />
              <Typography variant="body2" fontWeight={700}>Premium intelligence for modern teams</Typography>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.05, fontSize: { xs: "2.4rem", md: "3.6rem", lg: "4.2rem" } }}>
              Calm, confident defense for every alert that matters.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.7, fontSize: { xs: "1rem", md: "1.15rem" } }}>
              Northstar helps security leaders align detection, response, and continuity in one polished workspace designed to feel focused rather than frantic.
            </Typography>

            <GlassSurface sx={{ maxWidth: 760, px: { xs: 3, md: 4 }, py: { xs: 3, md: 3.5 }, textAlign: "center" }}>
              <Typography variant="h5" sx={{ fontStyle: "italic", lineHeight: 1.7, color: "text.primary" }}>
                “Northstar gave our SOC the clarity we had been missing for years.”
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.2 }}>
                Security Director · Fortune 500 Financial Firm
              </Typography>
            </GlassSurface>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate("/dashboard")}>
                Sign In / Sign Up
              </Button>
              <Button variant="outlined" color="primary" size="large" href="#features">
                Explore features
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box id="features" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="xl">
          <Stack spacing={2} sx={{ mb: 4, maxWidth: 700 }}>
            <Typography variant="overline" color="primary.light" fontWeight={700}>FEATURES</Typography>
            <Typography variant="h3" fontWeight={800}>Crafted for calm, confident operations.</Typography>
          </Stack>
          <Grid container spacing={3}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Grid key={feature.title} size={{ xs: 12, md: 6, lg: 4 }}>
                  <GlassSurface
                    sx={{
                      p: 3,
                      height: "100%",
                      transition: "transform 180ms ease, box-shadow 180ms ease",
                      opacity: revealed.features ? 1 : 0,
                      transform: revealed.features ? "translateY(0)" : "translateY(24px)",
                      "&:hover": { transform: "translateY(-4px)", boxShadow: "0 24px 44px rgba(2, 6, 23, 0.28)" },
                    }}
                  >
                    <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: "rgba(79,93,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                      <Icon sx={{ color: "primary.light" }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{feature.title}</Typography>
                    <Typography color="text.secondary">{feature.description}</Typography>
                  </GlassSurface>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Box id="about" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="stretch">
            <Grid size={{ xs: 12, lg: 7 }}>
              <GlassSurface sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
                <Typography variant="overline" color="primary.light" fontWeight={700}>ABOUT US</Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 2 }}>Built by security practitioners, for security practitioners.</Typography>
                <Stack spacing={2.2} sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  <Typography>
                    Northstar was built to remove the friction that slows modern teams down: fragmented telemetry, noisy alerts, and disconnected handoffs between analysts and leadership.
                  </Typography>
                  <Typography>
                    Our platform brings detection, investigation, and reporting into one calm operating layer so teams can focus on outcomes instead of juggling tools.
                  </Typography>
                  <Typography>
                    The result is faster triage, stronger confidence, and a more reliable security posture for every organization we support.
                  </Typography>
                </Stack>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  {stats.map((stat) => (
                    <Grid key={stat.label} size={{ xs: 12, sm: 4 }}>
                      <GlassSurface sx={{ p: 2.2, textAlign: "center" }}>
                        <Typography variant="h6" fontWeight={800}>{stat.value}</Typography>
                        <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                      </GlassSurface>
                    </Grid>
                  ))}
                </Grid>
              </GlassSurface>
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <GlassSurface sx={{ p: { xs: 3, md: 4 }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
                <Box sx={{ width: "100%", height: 220, borderRadius: 4, background: "linear-gradient(135deg, rgba(79,93,255,0.22), rgba(46,158,142,0.18))", border: "1px solid rgba(255,255,255,0.12)", position: "relative", overflow: "hidden" }}>
                  <Box sx={{ position: "absolute", inset: 20, borderRadius: 3, border: "1px solid rgba(255,255,255,0.18)" }} />
                  <Box sx={{ position: "absolute", left: 28, top: 36, width: 140, height: 140, borderRadius: "50%", bgcolor: "rgba(79,93,255,0.18)" }} />
                  <Box sx={{ position: "absolute", right: 32, bottom: 28, width: 110, height: 110, borderRadius: 3, bgcolor: "rgba(46,158,142,0.18)" }} />
                </Box>
                <Typography variant="subtitle1" fontWeight={700}>Security operations, reimagined.</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  A premium experience for teams that need clarity, accountability, and confidence in every decision.
                </Typography>
              </GlassSurface>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="feedback" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="xl">
          <GlassSurface sx={{ p: { xs: 3, md: 4 }, maxWidth: 760, mx: "auto" }}>
            <Typography variant="overline" color="primary.light" fontWeight={700}>FEEDBACK</Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.75, mb: 1 }}>We would love to hear from you.</Typography>
            <Typography color="text.secondary" sx={{ mb: 2.5 }}>
              Share your priorities and we will follow up within one business day.
            </Typography>
            <Stack spacing={2}>
              <TextField label="Name" fullWidth />
              <TextField label="Email" fullWidth />
              <TextField label="Message" multiline minRows={4} fullWidth />
              <Button variant="contained" color="primary" startIcon={<EmailRoundedIcon />} sx={{ width: "fit-content" }}>
                Submit feedback
              </Button>
            </Stack>
          </GlassSurface>
        </Container>
      </Box>

      <Box component="footer" sx={{ py: 6, borderTop: "1px solid", borderColor: "divider", bgcolor: "rgba(255,255,255,0.03)" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1.2}>
                <Typography fontWeight={800}>Northstar Security</Typography>
                <Typography variant="body2" color="text.secondary">Focused defense for modern security teams.</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Typography fontWeight={700} sx={{ mb: 1.2 }}>Product</Typography>
              <Stack spacing={1}>
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href} underline="none" color="text.secondary">
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography fontWeight={700} sx={{ mb: 1.2 }}>Company</Typography>
              <Stack spacing={1}>
                <Link href="#about" underline="none" color="text.secondary">About</Link>
                <Link href="#feedback" underline="none" color="text.secondary">Contact</Link>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography fontWeight={700} sx={{ mb: 1.2 }}>Resources</Typography>
              <Stack spacing={1}>
                <Link href="#features" underline="none" color="text.secondary">Platform overview</Link>
                <Link href="/dashboard" underline="none" color="text.secondary">Sign in</Link>
              </Stack>
            </Grid>
          </Grid>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 3 }}>
            © 2026 Northstar Security. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
