import { useMemo, type ReactNode } from "react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

import { createAppTheme } from ".";

interface ThemeModeProviderProps {
  children: ReactNode;
}

function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const theme = useMemo(() => createAppTheme("dark"), []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export { ThemeModeProvider };
