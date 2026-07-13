import type { CSSProperties } from "react";

declare module "@mui/material/Typography" {
  interface TypographyProps {
    fontWeight?: CSSProperties["fontWeight"];
    textAlign?: CSSProperties["textAlign"];
  }
}

declare module "@mui/material/Stack" {
  interface StackProps {
    justifyContent?: CSSProperties["justifyContent"];
    alignItems?: CSSProperties["alignItems"];
  }
}

declare module "@mui/material/Grid" {
  interface GridProps {
    mt?: CSSProperties["marginTop"];
    mb?: CSSProperties["marginBottom"];
    container?: boolean;
    spacing?: number | string | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
    size?: unknown;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldProps {
    InputLabelProps?: unknown;
  }
}
