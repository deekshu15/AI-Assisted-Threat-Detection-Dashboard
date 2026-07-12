import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import DashboardWidget from "../../dashboard/components/DashboardWidget";
import { SIEMService } from "../services/siemService";

function EventExplorer() {
  const events = SIEMService.getEvents();

  return (
    <DashboardWidget title="Event Explorer" height={450}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.timestamp}</TableCell>
              <TableCell>{event.source}</TableCell>
              <TableCell>{event.event}</TableCell>
              <TableCell>{event.severity}</TableCell>
              <TableCell>{event.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardWidget>
  );
}

export default EventExplorer;