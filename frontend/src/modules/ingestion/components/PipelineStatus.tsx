import { Grid } from "@mui/material";

import { StatusCard } from "../../../components/ui/status-card";

const services = [
  {
    title: "API Gateway",
    value: "Receiving",
    status: "Healthy",
  },
  {
    title: "Amazon Kinesis",
    value: "Streaming",
    status: "Healthy",
  },
  {
    title: "Normalize Lambda",
    value: "Running",
    status: "Healthy",
  },
  {
    title: "Amazon S3",
    value: "Connected",
    status: "Healthy",
  },
];

function PipelineStatus() {
  return (
    <Grid container spacing={2}>
      {services.map((service) => (
        <Grid
          size={{ xs: 12, sm: 6 }}
          key={service.title}
        >
          <StatusCard {...service} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PipelineStatus;