import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const techniques = [
  {
    id: "T1110",
    name: "Brute Force",
    tactic: "Credential Access",
    severity: "Critical",
  },
  {
    id: "T1059",
    name: "Command and Scripting Interpreter",
    tactic: "Execution",
    severity: "High",
  },
  {
    id: "T1078",
    name: "Valid Accounts",
    tactic: "Persistence",
    severity: "Medium",
  },
  {
    id: "T1021",
    name: "Remote Services",
    tactic: "Lateral Movement",
    severity: "High",
  },
];

function getChipColor(
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

function MitreMapping() {
  return (
    <DashboardWidget
      title="MITRE ATT&CK Mapping"
      subtitle="Detected techniques mapped to MITRE framework"
      height={450}
    >
      <List disablePadding>
        {techniques.map((technique) => (
          <ListItem
            key={technique.id}
            divider
            disablePadding
            sx={{ py: 2 }}
          >
            <ListItemText
              primary={
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Typography fontWeight={700}>
                    {technique.id}
                  </Typography>

                  <Typography>
                    {technique.name}
                  </Typography>
                </Stack>
              }
              secondary={technique.tactic}
            />

            <Chip
              label={technique.severity}
              color={getChipColor(technique.severity)}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default MitreMapping;