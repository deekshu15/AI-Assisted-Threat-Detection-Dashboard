import {
  Typography,
} from "@mui/material";

import { DashboardCard } from "../../../components/ui/card";

function AISecurityAssistant() {

  return (

    <DashboardCard>

      <Typography variant="h6">
        AI Security Assistant
      </Typography>

      <Typography color="text.secondary">
        AI recommendations will appear here.
      </Typography>

    </DashboardCard>

  );

}

export default AISecurityAssistant;