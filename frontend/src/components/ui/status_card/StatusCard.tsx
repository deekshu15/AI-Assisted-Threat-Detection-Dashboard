import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

interface StatusCardProps {
  title: string;
  value: string;
  status: "Healthy" | "Offline" | "Processing";
}

function StatusCard({
  title,
  value,
  status,
}: StatusCardProps) {
  const color =
    status === "Healthy"
      ? "success"
      : status === "Processing"
      ? "warning"
      : "error";

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="subtitle2">
            {title}
          </Typography>

          <Typography variant="h6">
            {value}
          </Typography>

          <Chip
            label={status}
            color={color}
            size="small"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default StatusCard;