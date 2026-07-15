import { useEffect, useState } from "react";

import {
  Avatar,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import intelligenceService from "../services/intelligenceService";
import { CVE } from "../types/intelligence";

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

function LatestCVEs() {
  const [cves, setCves] = useState<CVE[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    intelligenceService
      .getCVEs()
      .then((data) => {
        setCves(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load CVE data");
        setLoading(false);
      });
  }, []);

  return (
    <DashboardWidget
      title="Latest CVEs"
      subtitle="Newest published vulnerabilities"
      height={440}
    >
      {loading && <CircularProgress size={24} />}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <List disablePadding>
          {cves.map((cve) => (
            <ListItem
              key={cve.id}
              divider
              disablePadding
              sx={{ py: 2 }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "#FEE2E2",
                    color: "#DC2626",
                  }}
                >
                  <BugReportRoundedIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={cve.id}
                secondary={cve.description}
              />

              <Chip
                label={cve.severity}
                color={getColor(cve.severity)}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      )}
    </DashboardWidget>
  );
}

export default LatestCVEs;