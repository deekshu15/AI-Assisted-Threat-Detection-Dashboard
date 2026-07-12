import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#3B82F6",
    },

    secondary: {
      main: "#06B6D4",
    },

    success: {
      main: "#10B981",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    background: {
      default: "#0B1120",
      paper: "#111827",
    },

    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
    },
  },

  typography: {
    fontFamily: `"Inter","Segoe UI",sans-serif`,
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;