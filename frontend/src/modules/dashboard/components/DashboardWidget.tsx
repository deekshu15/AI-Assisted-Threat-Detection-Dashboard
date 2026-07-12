import { Card, CardContent, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

interface DashboardWidgetProps {
  title: string;
  children: ReactNode;
  height?: number;
}

function DashboardWidget({
  title,
  children,
  height = 360,
}: DashboardWidgetProps) {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        height,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          mb={2}
        >
          {title}
        </Typography>

        <Box flex={1}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}

export default DashboardWidget;