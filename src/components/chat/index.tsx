"use client";
import React from "react";
import { SendBirdProvider } from "@sendbird/uikit-react";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Role } from "../../graphql/generated";

import { Chat } from "./Chat";

export const colorSet = {
  "--sendbird-light-primary-500": "#0648D4",
  "--sendbird-light-primary-400": "#0C52E8",
  "--sendbird-light-primary-300": "#4B80F2",
  "--sendbird-light-primary-200": "#A1BCF7",
  "--sendbird-light-primary-100": "#D7E2FC",
};

export const ChatPage = ({
  appId,
  userId,
}: {
  appId: string;
  userId: string;
}) => {
  const { user } = useCurrentUserStore();

  return (
    <div>
      {user?.role === Role.Patient && (
        <div>
          <p className="bg-white text-red-500 rounded-xl px-4 py-2 mb-2 font-bold">
            If you are experiencing a medical emergency, please contact 911. If
            you need an immediate response for an urgent situation, please
            contact your primary care provider. For all other inquiries, please
            expect a response from our care team within one business day.
          </p>
        </div>
      )}
      <SendBirdProvider appId={appId} userId={userId} colorSet={colorSet}>
        <div className="flex flex-col w-full">
          <Chat />
        </div>
      </SendBirdProvider>
    </div>
  );
};
