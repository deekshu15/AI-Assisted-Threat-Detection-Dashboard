import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { ChatMessage } from "../types/assistant";

interface Props {
  message: ChatMessage;
}

function MessageBubble({ message }: Props) {
  const isAssistant = message.sender === "assistant";

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent={
        isAssistant ? "flex-start" : "flex-end"
      }
      mb={3}
    >
      {isAssistant && (
        <Avatar sx={{ bgcolor: "#1D4ED8" }}>
          <PsychologyRoundedIcon />
        </Avatar>
      )}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          maxWidth: "75%",
          bgcolor: isAssistant
            ? "#F8FAFC"
            : "#1D4ED8",
          color: isAssistant
            ? "text.primary"
            : "white",
          borderRadius: 3,
        }}
      >
        <Typography>{message.content}</Typography>

        <Box mt={1}>
          <Typography
            variant="caption"
            color={
              isAssistant
                ? "text.secondary"
                : "rgba(255,255,255,.7)"
            }
          >
            {message.timestamp}
          </Typography>
        </Box>
      </Paper>

      {!isAssistant && (
        <Avatar sx={{ bgcolor: "#64748B" }}>
          <PersonRoundedIcon />
        </Avatar>
      )}
    </Stack>
  );
}

export default MessageBubble;