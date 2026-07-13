import {
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

const techniques = [
  {
    id: "T1110",
    name: "Brute Force",
    tactic: "Credential Access",
  },
  {
    id: "T1059",
    name: "Command Interpreter",
    tactic: "Execution",
  },
  {
    id: "T1078",
    name: "Valid Accounts",
    tactic: "Persistence",
  },
  {
    id: "T1021",
    name: "Remote Services",
    tactic: "Lateral Movement",
  },
];

function MitreTechniques() {
  return (
    <DashboardWidget
      title="MITRE ATT&CK"
      subtitle="Mapped adversary techniques"
      height={440}
    >
      <List disablePadding>
        {techniques.map((item) => (
          <ListItem
            key={item.id}
            divider
            disablePadding
            sx={{ py: 2 }}
          >
            <ListItemText
              primary={`${item.id} • ${item.name}`}
              secondary={item.tactic}
            />

            <Chip
              label="Mapped"
              color="success"
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default MitreTechniques;