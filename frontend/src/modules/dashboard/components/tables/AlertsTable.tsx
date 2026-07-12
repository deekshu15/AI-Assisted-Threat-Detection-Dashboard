import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

interface Alert {
  id: number;
  source: string;
  severity: string;
  attack: string;
  status: string;
}

interface AlertsTableProps {
  alerts: Alert[];
}

function severityColor(severity: string) {
  switch (severity) {
    case "Critical":
      return "error";

    case "High":
      return "warning";

    case "Medium":
      return "info";

    default:
      return "default";
  }
}

function AlertsTable({
  alerts,
}: AlertsTableProps) {
  return (
    <TableContainer component={Paper}>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>Source</TableCell>

            <TableCell>Severity</TableCell>

            <TableCell>Attack</TableCell>

            <TableCell>Status</TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {alerts.map((alert) => (

            <TableRow key={alert.id} hover>

              <TableCell>
                {alert.source}
              </TableCell>

              <TableCell>

                <Chip
                  label={alert.severity}
                  color={severityColor(alert.severity)}
                  size="small"
                />

              </TableCell>

              <TableCell>
                {alert.attack}
              </TableCell>

              <TableCell>
                {alert.status}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>
  );
}

export default AlertsTable;