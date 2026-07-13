import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";

import NotificationDrawer from "./NotificationDrawer";
import UserMenu from "./UserMenu";
import { useThemeMode } from "../theme/ThemeModeContext";

function Header() {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "rgba(11, 15, 20, 0.7)",
        backdropFilter: "blur(18px)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: 82, px: { xs: 2, md: 4 }, justifyContent: "space-between" }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={1.25} alignItems="center">
            <ShieldRoundedIcon color="primary" />
            <Stack spacing={0}>
              <Typography variant="subtitle1" fontWeight={800} color="primary">
                Northstar Threat Command
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Security Operations Center
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1.25} alignItems="center">
          <IconButton onClick={toggleColorMode} color="primary" size="small">
            {mode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
          <NotificationDrawer />
          <UserMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;