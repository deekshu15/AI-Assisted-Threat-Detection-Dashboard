import Grid from "@mui/material/Grid";

import AssistantHeader from "./components/AssistantHeader";
import ConversationSidebar from "./components/ConversationSidebar";
import ChatWindow from "./components/ChatWindow";

function AssistantPage() {
  return (
    <>
      <AssistantHeader />

      <Grid
        container
        spacing={3}
      >
        <Grid
          size={{
            xs: 12,
            lg: 3,
          }}
        >
          <ConversationSidebar />
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 9,
          }}
        >
          <ChatWindow />
        </Grid>
      </Grid>
    </>
  );
}

export default AssistantPage;