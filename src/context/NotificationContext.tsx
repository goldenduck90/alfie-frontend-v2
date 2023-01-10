import React, { useContext, useState } from "react"

interface NotificationStateType {
  displayNotification: boolean
  title: string
  description: string
  type: "success" | "error" | "info"
}

const NotificationStateCtx = React.createContext<NotificationStateType>({
  displayNotification: false,
  title: "",
  description: "",
  type: "success",
})

const NotificationDispatchCtx = React.createContext({
  displayNotification: (
    title: string,
    description: string,
    type: "success" | "error" | "info"
  ) => {
    console.log(title, description, type)
  },
  hideNotification: () => {
    console.log("hide notification")
  },
})

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [notificationState, setNotificationState] =
    useState<NotificationStateType>({
      displayNotification: false,
      title: "",
      description: "",
      type: "success",
    })

  const NotificationDispCtx = React.useMemo(
    () => ({
      displayNotification: (
        title: string,
        description: string,
        type: "success" | "error" | "info"
      ) => {
        setNotificationState({
          displayNotification: true,
          title,
          description,
          type,
        })
      },
      hideNotification: () => {
        setNotificationState({
          displayNotification: false,
          title: "",
          description: "",
          type: "success",
        })
      },
    }),
    []
  )

  return (
    <NotificationDispatchCtx.Provider value={NotificationDispCtx}>
      <NotificationStateCtx.Provider value={notificationState}>
        {children}
      </NotificationStateCtx.Provider>
    </NotificationDispatchCtx.Provider>
  )
}

export function useNotificationState() {
  return useContext(NotificationStateCtx)
}

export function useNotificationDispatch() {
  return useContext(NotificationDispatchCtx)
}
