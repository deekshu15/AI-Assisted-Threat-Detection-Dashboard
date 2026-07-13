import { Card, CardContent } from "@mui/material";
import { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
  height?: number | string;
}

function DashboardCard({
  children,
  height = "100%",
}: DashboardCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background: "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(241,247,255,0.95))",
        boxShadow: "0 16px 32px rgba(11,31,58,0.06)",
        transition: "all .25s ease",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(120deg, transparent 0%, rgba(56,189,248,0.08) 45%, transparent 100%)",
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 20px 40px rgba(11,31,58,0.12)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 3,
          position: "relative",
          zIndex: 1,
          "&:last-child": {
            pb: 3,
          },
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}

export default DashboardCard;