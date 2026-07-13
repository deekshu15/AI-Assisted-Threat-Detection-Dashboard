import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

import { createAppTheme } from ".";

type PaletteMode = "light" | "dark";

interface ThemeModeContextValue {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

interface ThemeModeProviderProps {
  children: ReactNode;
}

function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((current) => (current === "dark" ? "light" : "dark")),
    }),
    [mode]
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}

function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }

  return context;
}

export { ThemeModeProvider, useThemeMode };
export type { PaletteMode };
