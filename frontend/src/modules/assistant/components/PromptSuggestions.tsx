import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

import {
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { suggestions } from "../data/assistantMock";

function PromptSuggestions() {
  return (
    <Stack spacing={2}>
      <Typography
        variant="subtitle1"
        fontWeight={700}
      >
        Suggested Prompts
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
      >
        {suggestions.map((item) => (
          <Chip
            key={item.id}
            icon={<BoltRoundedIcon />}
            label={item.title}
            clickable
            color="primary"
            variant="outlined"
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default PromptSuggestions;