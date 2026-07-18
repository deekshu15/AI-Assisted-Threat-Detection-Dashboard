import { useState } from "react";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

type Range = "Last 24h" | "Last 7 days" | "Last 30 days";

const countries = [
  "All Countries",
  "Japan",
  "Brazil",
  "Nigeria",
  "South Korea",
  "Russia",
  "Germany",
  "China",
  "United Kingdom",
  "Iran",
  "United States",
  "Australia",
  "India",
];

function AnalyticsCard({ title, wide = false }: { title: string; wide?: boolean }) {
  return (
    <Card sx={{ height: wide ? 306 : 394, borderColor: "rgba(36, 207, 226, .16)", bgcolor: "rgba(10, 16, 29, .72)" }}>
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Typography variant="h6" fontWeight={700}>{title}</Typography>
      </CardContent>
    </Card>
  );
}

function AnalyticsPage() {
  const [range, setRange] = useState<Range>("Last 24h");
  const [country, setCountry] = useState("All Countries");

  const exportReport = () => {
    const report = `Threat Analytics Report\nTime range,${range}\nCountry,${country}\n`;
    const blob = new Blob([report], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "threat-analytics-report.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ md: "center" }}
        justifyContent="space-between"
        rowGap={2}
        mb={4}
        width="100%"
      >
        <Typography variant="h4" fontWeight={800}>
          Threat <Box component="span" color="#12cfe2">Analytics</Box>
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} gap={1} sx={{ ml: { md: "auto" } }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time range</InputLabel>
            <Select value={range} label="Time range" onChange={event => setRange(event.target.value as Range)}>
              {["Last 24h", "Last 7 days", "Last 30 days"].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Country</InputLabel>
            <Select value={country} label="Country" onChange={event => setCountry(event.target.value)}>
              {countries.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
          <Button size="small" variant="contained" startIcon={<DownloadRoundedIcon fontSize="small" />} onClick={exportReport} sx={{ minWidth: 88, px: 1.25 }}>
            Export
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 6 }}><AnalyticsCard title="Attack Type Frequency" /></Grid>
        <Grid size={{ xs: 12, lg: 6 }}><AnalyticsCard title="Country Distribution" /></Grid>
        <Grid size={{ xs: 12, lg: 6 }}><AnalyticsCard title="Attack Trends Over Time" /></Grid>
        <Grid size={{ xs: 12, lg: 6 }}><AnalyticsCard title="Device-wise Attacks" /></Grid>
        <Grid size={12}><AnalyticsCard title="Severity Breakdown" wide /></Grid>
      </Grid>
    </Box>
  );
}

export default AnalyticsPage;
