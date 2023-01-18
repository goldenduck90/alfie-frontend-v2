import React from "react";
import { ApplicationLayout } from "../../src/components/layouts/ApplicationLayout";

import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { ChatPage } from "../../src/components/chat";
import "@sendbird/uikit-react/dist/index.css";

function Chat() {
  const { user } = useCurrentUserStore();
  const SendBirdId = process.env.REACT_APP_SENDBIRD_APP_ID;

  const sendBirdParams =
    user && SendBirdId
      ? { appId: SendBirdId, userId: user._id }
      : { appId: "", userId: "" };

  return <ChatPage {...sendBirdParams} />;
}

Chat.getLayout = (page: React.ReactNode) => (
  <ApplicationLayout title="Chat">{page}</ApplicationLayout>
);

Chat.isAuthRequired = true;

export default Chat;
