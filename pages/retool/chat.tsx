import { Channel, SendBirdProvider } from "@sendbird/uikit-react";
import { colorSet } from "@src/components/chat";
import "@sendbird/uikit-react/dist/index.css";
import { environment } from "@src/utils/environment";
import { gql, useQuery } from "@apollo/client";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { Navbar } from "@src/components/navigation/NavBar";

const getSendBirdUserChannelUrl = gql`
  query UserSendbirdChannel($userId: String!) {
    userSendbirdChannel(userId: $userId) {
      channel_url
    }
  }
`;

const SendBirdId = environment.NEXT_PUBLIC_SENDBIRD_APP_ID;

export default function PatientChat() {
  // const { user } = useCurrentUserStore();
  // const router = useRouter();
  // const hasAllParams = user && SendBirdId;
  const sendBirdParams = { appId: "56D883B9-B30F-428B-8B7A-31184E513DF4", userId: "63378a286990956ac4dbcbeb" }
    

  // const patientId = router.query.patientId as string;

  // const { data, error } = useQuery(getSendBirdUserChannelUrl, {
  //   variables: {
  //     userId: "63378a286990956ac4dbcbeb",
  //   },
  // });

  window.addEventListener('message', (event) => {
    // Ensure the message is from a trusted source
    if (event.origin !== 'https://joinalfie.retool.com') {
      return;
    }
    
    const patientId = event.data.patientId;
  });
  return (
    <>
    {/* <Navbar /> */}
    <SendBirdProvider {...sendBirdParams} colorSet={colorSet}>
      <div className="flex flex-col w-full h-[65vh] rounded-lg py-6 chat-container">
        <Channel
          channelUrl="sendbird_group_channel_187584357_de999bc5198fcf2f5ff2334b7c2d1cd97c62ce01"
          disableUserProfile={true}
          renderChannelHeader={() => null}
        />
      </div>
    </SendBirdProvider>
    </>
  );
}
