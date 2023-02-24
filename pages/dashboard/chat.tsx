import React from "react";
import { Layout } from "../../src/components/layouts/Layout";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import "@sendbird/uikit-react/dist/index.css";
import { environment } from "@src/utils/environment";
import dynamic from "next/dynamic";

const SendBirdId = environment.NEXT_PUBLIC_SENDBIRD_APP_ID;

const ChatComponent = dynamic(
  () => import("../../src/components/chat").then((mod) => mod.ChatPage),
  {
    ssr: false,
  }
);

function Chat() {
  const { user } = useCurrentUserStore();
  const hasAllParams = user && SendBirdId;

  const sendBirdParams = hasAllParams
    ? { appId: SendBirdId, userId: user._id }
    : { appId: "", userId: "" };

  if (!hasAllParams) return <div />;

  return <ChatComponent {...sendBirdParams} />;
}

Chat.getLayout = (page: React.ReactNode) => (
  <Layout title="Chat">{page}</Layout>
);

Chat.isAuthRequired = true;

export default Chat;
