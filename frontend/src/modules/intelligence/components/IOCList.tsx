import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { iocs } from "../data/intelligenceMock";

function IOCList() {
  return (
    <DashboardWidget
      title="Indicators of Compromise"
      subtitle="Known malicious indicators"
      height={440}
    >
      <List disablePadding>
        {iocs.map((ioc) => (
          <ListItem
            key={ioc.id}
            divider
            disablePadding
            sx={{ py: 2 }}
          >
            <ListItemText
              primary={ioc.value}
              secondary={
                <Typography variant="caption">
                  Confidence {ioc.confidence}%
                </Typography>
              }
            />

            <Chip
              label={ioc.type}
              color="primary"
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default IOCList;