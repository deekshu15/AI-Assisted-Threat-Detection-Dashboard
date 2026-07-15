import { useEffect, useState } from "react";

import {
  Chip,
  CircularProgress,
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

import siemService from "../services/siemService";
import { SIEMEvent } from "../types/siem";

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
  const [events, setEvents] = useState<SIEMEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    siemService
      .getEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DashboardWidget
      title="Event Explorer"
      subtitle="Searchable event timeline"
      height={500}
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={700}>Time</Typography>
                </TableCell>

                <TableCell>
                  <Typography fontWeight={700}>Source</Typography>
                </TableCell>

                <TableCell>
                  <Typography fontWeight={700}>Event</Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography fontWeight={700}>Severity</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} hover>
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
      )}
    </DashboardWidget>
  );
}

export default EventExplorer;