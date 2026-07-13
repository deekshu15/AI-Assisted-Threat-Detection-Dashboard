import {
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { mitreCoverage } from "../data/analyticsMock";

function MitreCoverage() {
  return (
    <DashboardWidget
      title="MITRE ATT&CK Coverage"
      subtitle="Coverage across ATT&CK tactics"
      height={430}
    >
      <List disablePadding>
        {mitreCoverage.map((item) => (
          <ListItem
            key={item.tactic}
            divider
            disablePadding
            sx={{ py: 2 }}
          >
            <ListItemText
              primary={item.tactic}
              secondary={
                <LinearProgress
                  variant="determinate"
                  value={item.coverage}
                  sx={{
                    mt: 1,
                    height: 8,
                    borderRadius: 5,
                  }}
                />
              }
            />

            <Chip
              label={`${item.coverage}%`}
              color="success"
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default MitreCoverage;