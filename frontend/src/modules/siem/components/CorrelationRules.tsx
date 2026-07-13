import RuleRoundedIcon from "@mui/icons-material/RuleRounded";

import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";

import { DashboardWidget } from "../../../components/ui/DashboardWidget";

import { correlationRules } from "../data/siemMock";

function CorrelationRules() {
  return (
    <DashboardWidget
      title="Correlation Rules"
      subtitle="Detection rules currently enabled"
      height={450}
    >
      <List disablePadding>
        {correlationRules.map((rule) => (
          <ListItem
            key={rule.id}
            divider
            disablePadding
            sx={{ py: 1.8 }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#E0F2FE",
                  color: "#0284C7",
                }}
              >
                <RuleRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={rule.name}
              secondary={
                <Typography variant="caption">
                  {rule.matches} matches today
                </Typography>
              }
            />

            <Chip
              label={`${rule.matches}`}
              color="primary"
              size="small"
              sx={{ mr: 2 }}
            />

            <Switch
              checked={rule.enabled}
              disabled
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default CorrelationRules;