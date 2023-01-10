import React from "react"
import { SendBirdProvider } from "@sendbird/uikit-react"

import { Chat } from "./Chat"

export const ChatPage = ({
  appId,
  userId,
}: {
  appId: string
  userId: string
}) => {
  const colorSet = {
    "--sendbird-light-primary-500": "#6366f1",
    "--sendbird-light-primary-400": "#818cf8",
    "--sendbird-light-primary-300": "#a5b4fc",
    "--sendbird-light-primary-200": "#c7d2fe",
    "--sendbird-light-primary-100": "#e0e7ff",
  }
  return (
    <SendBirdProvider appId={appId} userId={userId} colorSet={colorSet}>
      <Chat />
    </SendBirdProvider>
  )
}
