import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import DashboardWidget from "./DashboardWidget";

const activities = [
  "Windows logs uploaded",
  "IDS detected DDoS attack",
  "Lambda normalized 2,430 logs",
  "Glue ETL completed",
  "Risk score updated",
];

function ActivityFeed() {
  return (
    <DashboardWidget title="Recent Activity">

      <List>

        {activities.map((activity) => (

          <ListItem key={activity}>

            <ListItemText
              primary={activity}
            />

          </ListItem>

        ))}

      </List>

    </DashboardWidget>
  );
}

export default ActivityFeed;