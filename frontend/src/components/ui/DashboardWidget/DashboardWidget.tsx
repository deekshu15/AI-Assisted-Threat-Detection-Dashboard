import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

interface DashboardWidgetProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  height?: number | string;
}

function DashboardWidget({
  title,
  subtitle,
  action,
  children,
  height = "100%",
}: DashboardWidgetProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        transition: "all .25s ease",

        "&:hover": {
          boxShadow: "0 12px 30px rgba(15,23,42,.08)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5}>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}
          </Stack>

          {action ?? (
            <IconButton size="small">
              <MoreHorizRoundedIcon />
            </IconButton>
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack flex={1}>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DashboardWidget;