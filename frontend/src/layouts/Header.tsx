import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import NotificationDrawer from "./NotificationDrawer";
import UserMenu from "./UserMenu";

const TOP_TABS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Analytics", path: "/analytics" },
  { label: "AI Summary", path: "/ai-summary" },
  { label: "AI Recs", path: "/ai-recs" },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = TOP_TABS.some((tab) => tab.path === location.pathname)
    ? location.pathname
    : false;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: (theme) => theme.palette.mode === "dark"
          ? "rgba(11, 15, 20, 0.78)"
          : "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(18px)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: 82, px: { xs: 2, md: 4 }, justifyContent: "space-between", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(79,93,255,0.16)",
              border: "1px solid rgba(79,93,255,0.22)",
            }}
          >
            <ShieldRoundedIcon color="primary" />
          </Box>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, value) => navigate(value)}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            minHeight: 44,
            display: { xs: "none", md: "flex" },
            "& .MuiTab-root": {
              minHeight: 44,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 14,
              color: "text.secondary",
            },
            "& .Mui-selected": { color: "primary.main" },
          }}
        >
          {TOP_TABS.map((tab) => (
            <Tab key={tab.path} label={tab.label} value={tab.path} />
          ))}
        </Tabs>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexShrink: 0 }}>
          <NotificationDrawer />
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
