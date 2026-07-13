import SendRoundedIcon from "@mui/icons-material/SendRounded";

import {
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import { messages } from "../data/assistantMock";

import MessageBubble from "./MessageBubble";
import PromptSuggestions from "./PromptSuggestions";

function ChatWindow() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Stack
        spacing={3}
        height="100%"
      >
        <PromptSuggestions />

        <Stack
          spacing={2}
          flex={1}
          sx={{
            overflowY: "auto",
            minHeight: 450,
          }}
        >
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={2}
        >
          <TextField
            fullWidth
            placeholder="Ask about threats, incidents, SIEM events, reports..."
          />

          <Button
            variant="contained"
            endIcon={<SendRoundedIcon />}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default ChatWindow;