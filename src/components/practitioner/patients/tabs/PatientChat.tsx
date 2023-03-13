import { Channel, SendBirdProvider } from "@sendbird/uikit-react";
import { colorSet } from "@src/components/chat";
import "@sendbird/uikit-react/dist/index.css";
import { environment } from "@src/utils/environment";
import { gql, useQuery } from "@apollo/client";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { useRouter } from "next/router";

const getSendBirdUserChannelUrl = gql`
  query UserSendbirdChannel($userId: String!) {
    userSendbirdChannel(userId: $userId) {
      channel_url
    }
  }
`;

const SendBirdId = environment.NEXT_PUBLIC_SENDBIRD_APP_ID;

export function PatientChat() {
  const { user } = useCurrentUserStore();
  const router = useRouter();
  const hasAllParams = user && SendBirdId;
  const sendBirdParams = hasAllParams
    ? { appId: SendBirdId, userId: user._id }
    : { appId: "", userId: "" };

  const patientId = router.query.patientId as string;

  const { data, error } = useQuery(getSendBirdUserChannelUrl, {
    variables: {
      userId: patientId,
    },
  });
  console.log({ data, error });

  return (
    <SendBirdProvider {...sendBirdParams} colorSet={colorSet}>
      <div className="flex flex-col w-full h-[65vh] rounded-lg py-6 chat-container">
        <Channel
          channelUrl={data?.userSendbirdChannel?.[0]?.channel_url || ""}
          disableUserProfile={true}
          renderChannelHeader={() => null}
        />
      </div>
    </SendBirdProvider>
  );
}
