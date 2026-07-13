import type { ReactNode } from "react";
import { Box, type BoxProps } from "@mui/material";

interface GlassSurfaceProps extends BoxProps {
  children: ReactNode;
}

function GlassSurface({ children, sx, ...props }: GlassSurfaceProps) {
  return (
    <Box
      {...props}
      sx={[
        (theme) => ({
          borderRadius: 4,
          border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.10)"}`,
          background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: theme.palette.mode === "dark" ? "0 20px 45px rgba(2, 6, 23, 0.32)" : "0 20px 45px rgba(15, 23, 42, 0.10)",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}

export default GlassSurface;
