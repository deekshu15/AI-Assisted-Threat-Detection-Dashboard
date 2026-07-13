import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { liveEvents } from "../data/siemMock";

function getColor(
  severity: string
): "success" | "warning" | "error" {
  switch (severity) {
    case "Critical":
      return "error";

    case "High":
      return "warning";

    default:
      return "success";
  }
}

function EventExplorer() {
  return (
    <DashboardWidget
      title="Event Explorer"
      subtitle="Searchable event timeline"
      height={500}
    >
      <TableContainer component={Paper} elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={700}>
                  Time
                </Typography>
              </TableCell>

              <TableCell>
                <Typography fontWeight={700}>
                  Source
                </Typography>
              </TableCell>

              <TableCell>
                <Typography fontWeight={700}>
                  Event
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography fontWeight={700}>
                  Severity
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {liveEvents.map((event) => (
              <TableRow
                key={event.id}
                hover
              >
                <TableCell>{event.timestamp}</TableCell>

                <TableCell>{event.source}</TableCell>

                <TableCell>{event.message}</TableCell>

                <TableCell align="right">
                  <Chip
                    size="small"
                    color={getColor(event.severity)}
                    label={event.severity}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardWidget>
  );
}

export default EventExplorer;