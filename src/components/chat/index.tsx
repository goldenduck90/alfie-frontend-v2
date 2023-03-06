"use client";
import React from "react";
import { SendBirdProvider } from "@sendbird/uikit-react";

import { Chat } from "./Chat";

export const ChatPage = ({
  appId,
  userId,
}: {
  appId: string;
  userId: string;
}) => {
  const colorSet = {
    "--sendbird-light-primary-500": "#0648D4",
    "--sendbird-light-primary-400": "#0C52E8",
    "--sendbird-light-primary-300": "#4B80F2",
    "--sendbird-light-primary-200": "#A1BCF7",
    "--sendbird-light-primary-100": "#D7E2FC",
  };
  return (
    <SendBirdProvider appId={appId} userId={userId} colorSet={colorSet}>
      <div className="flex flex-col max-w-5xl m-auto">
        <Chat />
      </div>
    </SendBirdProvider>
  );
};
