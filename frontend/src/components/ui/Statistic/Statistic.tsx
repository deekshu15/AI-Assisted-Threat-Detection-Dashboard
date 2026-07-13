import {
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

interface StatisticProps {
  label: string;
  value: string | number;
}

function Statistic({
  label,
  value,
}: StatisticProps) {
  return (
    <Card elevation={0}>
      <CardContent>
        <Stack spacing={1}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {label}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Statistic;