import { createTheme } from "@mui/material/styles";

type PaletteMode = "light" | "dark";

function createAppTheme(mode: PaletteMode = "dark") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#4F5DFF",
        light: "#7C87FF",
        dark: "#3B4CCB",
        contrastText: "#F5F6F8",
      },
      secondary: {
        main: "#2E9E8E",
        light: "#62C0B4",
        dark: "#1F6F66",
        contrastText: "#F5F6F8",
      },
      background: {
        default: isDark ? "#0B0F14" : "#F5F7FF",
        paper: isDark ? "#10151C" : "#FFFFFF",
      },
      success: {
        main: "#2E9E8E",
      },
      warning: {
        main: "#4F5DFF",
      },
      error: {
        main: "#C96D6D",
      },
      info: {
        main: "#4F5DFF",
      },
      text: {
        primary: isDark ? "#E7EAF0" : "#10151C",
        secondary: isDark ? "#A8B0BC" : "#556070",
      },
      divider: isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.12)",
    },
    shape: {
      borderRadius: 18,
    },
    typography: {
      fontFamily: ["Inter", "Geist", "Söhne", "Segoe UI", "Roboto", "Arial", "sans-serif"].join(","),
      h1: { fontWeight: 800, letterSpacing: "-0.03em" },
      h2: { fontWeight: 800, letterSpacing: "-0.03em" },
      h3: { fontWeight: 700, letterSpacing: "-0.02em" },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      button: { fontWeight: 700, textTransform: "none" },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            boxShadow: isDark ? "0 16px 40px rgba(2, 6, 23, 0.32)" : "0 16px 40px rgba(15, 23, 42, 0.12)",
            backdropFilter: "blur(16px)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,23,42,0.08)",
            boxShadow: isDark ? "0 16px 40px rgba(2, 6, 23, 0.32)" : "0 16px 40px rgba(15, 23, 42, 0.08)",
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingLeft: 18,
            paddingRight: 18,
            boxShadow: "none",
            transition: "transform 180ms ease, box-shadow 180ms ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: isDark ? "0 10px 24px rgba(79, 93, 255, 0.24)" : "0 10px 24px rgba(79, 93, 255, 0.16)",
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: isDark ? "linear-gradient(180deg, #10151C 0%, #0B0F14 100%)" : "linear-gradient(180deg, #FFFFFF 0%, #F5F7FF 100%)",
            color: isDark ? "#E7EAF0" : "#0F172A",
            border: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark ? "rgba(11, 15, 20, 0.72)" : "rgba(255,255,255,0.8)",
            color: isDark ? "#E7EAF0" : "#0F172A",
            boxShadow: isDark ? "0 12px 30px rgba(2, 6, 23, 0.24)" : "0 12px 30px rgba(15, 23, 42, 0.08)",
          },
        },
      },
    },
  });
}

export { createAppTheme };
export default createAppTheme("dark");