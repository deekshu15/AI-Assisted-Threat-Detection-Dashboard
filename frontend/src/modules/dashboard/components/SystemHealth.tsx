import {
  Stack,
  Typography,
  Chip,
} from "@mui/material";

import DashboardWidget from "./DashboardWidget";

const services = [
  { name: "API Gateway", status: "Healthy" },
  { name: "Lambda", status: "Healthy" },
  { name: "Kinesis", status: "Healthy" },
  { name: "S3", status: "Healthy" },
  { name: "Glue", status: "Healthy" },
  { name: "SageMaker", status: "Healthy" },
];

function SystemHealth() {
  return (
    <DashboardWidget title="AWS Services">

      <Stack spacing={2}>

        {services.map((service) => (

          <Stack
            key={service.name}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >

            <Typography>
              {service.name}
            </Typography>

            <Chip
              label={service.status}
              color="success"
              size="small"
            />

          </Stack>

        ))}

      </Stack>

    </DashboardWidget>
  );
}

export default SystemHealth;