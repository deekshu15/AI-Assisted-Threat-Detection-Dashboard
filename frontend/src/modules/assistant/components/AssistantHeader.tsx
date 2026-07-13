import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

import {
  Avatar,
  Stack,
  Typography,
} from "@mui/material";

function AssistantHeader() {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      mb={3}
    >
      <Avatar
        sx={{
          bgcolor: "#1D4ED8",
          width: 60,
          height: 60,
        }}
      >
        <PsychologyRoundedIcon />
      </Avatar>

      <Stack>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          AI Security Copilot
        </Typography>

        <Typography color="text.secondary">
          Powered by Large Language Models
        </Typography>
      </Stack>
    </Stack>
  );
}

export default AssistantHeader;