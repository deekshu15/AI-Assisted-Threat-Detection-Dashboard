import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import {
  Avatar,
  Button,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { conversations } from "../data/assistantMock";

function ConversationSidebar() {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={2}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddRoundedIcon />}
        >
          New Conversation
        </Button>

        <Typography
          variant="subtitle2"
          color="text.secondary"
        >
          Recent Conversations
        </Typography>

        <List disablePadding>
          {conversations.map((conversation) => (
            <ListItemButton
              key={conversation.id}
              sx={{
                borderRadius: 2,
                mb: 1,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "#E0F2FE",
                    color: "#0284C7",
                  }}
                >
                  <ChatRoundedIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={conversation.title}
                secondary={conversation.updatedAt}
              />
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Paper>
  );
}

export default ConversationSidebar;