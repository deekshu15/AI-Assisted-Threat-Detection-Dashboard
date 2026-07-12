import { Stack, Typography } from "@mui/material";

interface StatisticProps {
  label: string;
  value: string | number;
}

function Statistic({ label, value }: StatisticProps) {
  return (
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
  );
}

export default Statistic;