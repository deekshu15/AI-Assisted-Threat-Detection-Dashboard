import {
  Stack,
  Typography,
} from "@mui/material";

import { DashboardCard } from "../../../components/ui/card";
import { StatusChip } from "../../../components/ui/chip";

const sources = [
  "Windows",
  "Linux",
  "Firewall",
  "IDS",
  "Threat Feed",
  "CVE Feed",
];

function SecuritySources() {
  return (
    <DashboardCard>

      <Typography
        variant="h6"
        mb={2}
      >
        Security Sources
      </Typography>

      <Stack spacing={2}>

        {sources.map(source => (

          <Stack
            key={source}
            direction="row"
            justifyContent="space-between"
          >

            <Typography>

              {source}

            </Typography>

            <StatusChip status="Online" />

          </Stack>

        ))}

      </Stack>

    </DashboardCard>
  );
}

export default SecuritySources;