import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";

const services = [
  "API Gateway",
  "Lambda",
  "Amazon Kinesis",
  "Amazon S3",
  "AWS Glue",
  "Amazon SageMaker",
  "Amazon DynamoDB",
  "Amazon SNS",
];

function SystemHealth() {
  return (
    <DashboardWidget
      title="AWS Infrastructure"
      subtitle="Cloud service health"
      height={420}
    >
      <List disablePadding>
        {services.map((service) => (
          <ListItem
            key={service}
            divider
            disablePadding
            sx={{ py: 1.6 }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#DCFCE7",
                  color: "#16A34A",
                }}
              >
                <CheckCircleRoundedIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography fontWeight={600}>
                  {service}
                </Typography>
              }
            />

            <Chip
              label="Healthy"
              color="success"
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </DashboardWidget>
  );
}

export default SystemHealth;