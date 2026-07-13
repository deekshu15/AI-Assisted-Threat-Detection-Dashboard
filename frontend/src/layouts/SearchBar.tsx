import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  alpha,
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 1.2, fontWeight: 600 }}>
        What do you want to find today?
      </Typography>
      <Paper
        elevation={0}
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 760,
          mx: "auto",
          height: 54,
          px: 1.5,
          border: "1px solid",
          borderColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.10)",
          borderRadius: 999,
          bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          transition: "0.2s",

          "&:hover": {
            borderColor: "primary.main",
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}`,
          },
        })}
      >
        <IconButton size="small">
          <SearchRoundedIcon color="primary" />
        </IconButton>

        <InputBase
          fullWidth
          placeholder="Search alerts, incidents, CVEs, MITRE techniques…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            ml: 1,
            fontSize: 14,
          }}
        />
      </Paper>
    </Box>
  );
}

export default SearchBar;