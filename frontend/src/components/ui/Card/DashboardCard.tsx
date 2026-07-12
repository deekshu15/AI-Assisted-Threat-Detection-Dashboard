import { Card } from "@mui/material";
import { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
}

function DashboardCard({
  children,
}: DashboardCardProps) {
  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 3,
        backgroundColor: "#111827",
      }}
    >
      {children}
    </Card>
  );
}

export default DashboardCard;