import React from "react"
import { ApplicationLayout } from "../components/layouts/ApplicationLayout"
import "@sendbird/uikit-react/dist/index.css"
import { useAuth } from "../hooks/useAuth"
import { ChatPage } from "../components/chat"

export const Chat = () => {
  const { user } = useAuth()
  const SendBirdId = process.env.REACT_APP_SENDBIRD_APP_ID

  const sendBirdParams =
    user && SendBirdId
      ? { appId: SendBirdId, userId: user._id }
      : { appId: "", userId: "" }

  return (
    <ApplicationLayout title="Chat">
      <ChatPage {...sendBirdParams} />
    </ApplicationLayout>
  )
}
