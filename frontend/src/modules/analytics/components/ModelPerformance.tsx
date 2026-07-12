import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import DashboardWidget from "../../dashboard/components/DashboardWidget";

import { AnalyticsService } from "../services/analyticsService";

function ModelPerformance() {
  const models =
    AnalyticsService.getModelMetrics();

  return (
    <DashboardWidget title="Model Performance">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Model</TableCell>
            <TableCell>Precision</TableCell>
            <TableCell>Recall</TableCell>
            <TableCell>F1</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {models.map((model) => (
            <TableRow key={model.model}>
              <TableCell>{model.model}</TableCell>
              <TableCell>{model.precision}%</TableCell>
              <TableCell>{model.recall}%</TableCell>
              <TableCell>{model.f1Score}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardWidget>
  );
}

export default ModelPerformance;