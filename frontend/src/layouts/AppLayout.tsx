import { useState } from "react";
import { Box, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import SearchBar from "./SearchBar";

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const showSearchRow = location.pathname === "/dashboard";

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
        backgroundImage: theme.palette.mode === "dark"
          ? "radial-gradient(circle at top left, rgba(79, 93, 255, 0.18), transparent 22%), linear-gradient(135deg, #0b0f14 0%, #10151c 100%)"
          : "radial-gradient(circle at top left, rgba(79, 93, 255, 0.12), transparent 22%), linear-gradient(135deg, #f5f7ff 0%, #eef2ff 100%)",
      }}
    >
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ position: "fixed", top: 18, left: 18, zIndex: 1400, bgcolor: "rgba(16, 21, 28, 0.82)", backdropFilter: "blur(14px)", boxShadow: 2, color: "text.primary" }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 } }}
          >
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </Drawer>
        </>
      ) : (
        <Sidebar />
      )}

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header />

        <Box
          component="main"
          sx={{
            flex: 1,
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 3 },
            background: "transparent",
          }}
        >
          <Box sx={{ maxWidth: 1440, mx: "auto", width: "100%" }}>
            {showSearchRow && <SearchBar />}
            <Breadcrumbs />
            <Outlet />
          </Box>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default AppLayout;