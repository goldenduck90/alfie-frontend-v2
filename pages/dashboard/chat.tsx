import React from "react";
import { Layout } from "../../src/components/layouts/Layout";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { ChatPage } from "../../src/components/chat";
import "@sendbird/uikit-react/dist/index.css";
import { environment } from "@src/utils/environment";

const SendBirdId = environment.NEXT_PUBLIC_SENDBIRD_APP_ID;

function Chat() {
  const { user } = useCurrentUserStore();
  const hasAllParams = user && SendBirdId;

  const sendBirdParams = hasAllParams
    ? { appId: SendBirdId, userId: user._id }
    : { appId: "", userId: "" };

  if (!hasAllParams) return <div />;

  return <ChatPage {...sendBirdParams} />;
}

Chat.getLayout = (page: React.ReactNode) => (
  <Layout title="Chat">{page}</Layout>
);

Chat.isAuthRequired = true;

export default Chat;
