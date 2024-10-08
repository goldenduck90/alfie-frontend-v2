import React, { useMemo, useState } from "react";
import { Channel, useSendbirdStateContext } from "@sendbird/uikit-react";
import { Role } from "../../graphql/generated";
import ChannelPreview from "@sendbird/uikit-react/ChannelList/components/ChannelPreview";
import ChannelListUI from "@sendbird/uikit-react/ChannelList";
import { ChannelProvider } from "@sendbird/uikit-react/Channel/context";
import { ChannelHeader } from "./ChannelHeader";
import { ChannelListHeader } from "./ChannelListHeader";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { useNotificationStore } from "@src/hooks/useNotificationStore";
import { randomId } from "@src/utils/randomId";

export const Chat = () => {
  const { user } = useCurrentUserStore();
  const [currentChannelUrl, setCurrentChannelUrl] = useState<string>("");
  const [toggleChannelDrawer, setToggleChannelDrawer] =
    useState<boolean>(false);
  const [query, setQuery] = useState("");
  const { stores } = useSendbirdStateContext();
  const { addNotification } = useNotificationStore();
  const sendBirdError = stores.sdkStore.error;

  React.useEffect(() => {
    if (sendBirdError) {
      addNotification({
        type: "error",
        description: "Error with chat please try again later",
        id: randomId(),
        title: "Chat Error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendBirdError]);

  const handleDrawerToggle = () => setToggleChannelDrawer(!toggleChannelDrawer);

  const queries = useMemo(() => {
    if (query.length === 0) {
      return { channelListQuery: { includeEmpty: true } };
    } else {
      return {
        channelListQuery: {
          nicknameContainsFilter: query,
          includeEmpty: true,
        },
      };
    }
  }, [query]);

  const showDrawer = useMemo(() => {
    if (user?.role === Role.Patient) {
      return "hidden";
    } else if (toggleChannelDrawer) {
      return "block";
    } else {
      return "hidden lg:block";
    }
  }, [user?.role, toggleChannelDrawer]);

  return (
    <div
      className={`flex relative h-[75vh] rounded-lg ${
        user?.role === Role.Patient ? "chat-container" : ""
      }`}
    >
      <div
        className={`h-[75vh] relative z-10 bg-white rounded-l-xl ${showDrawer}`}
      >
        <ChannelListUI
          queries={queries}
          allowProfileEdit={false}
          className={`overflow-y-auto border rounded-l-xl border-r-0`}
          onChannelSelect={(channel) => {
            if (channel && channel.url) {
              setCurrentChannelUrl(channel.url);
              setToggleChannelDrawer(false);
            } else {
              setCurrentChannelUrl("");
            }
          }}
          renderHeader={() => (
            <ChannelListHeader
              onSetQuery={setQuery}
              query={query}
              handleDrawerToggle={handleDrawerToggle}
            />
          )}
          renderUserProfile={() => <></>}
          renderChannelPreview={(a) => {
            return (
              <ChannelPreview
                channel={a.channel}
                onClick={() => undefined}
                isActive={currentChannelUrl === a.channel.url}
                tabIndex={1}
                renderChannelAction={() => <></>}
                onLeaveChannel={() => undefined}
              />
            );
          }}
        />
      </div>
      <div className="flex-row w-full h-[75vh] absolute lg:relative z-90">
        {toggleChannelDrawer && (
          <div
            onClick={handleDrawerToggle}
            className="absolute h-full w-full top-0 right-0 bg-opacity-30 bg-gray-600 z-[9] rounded-xl"
          />
        )}
        <Channel
          channelUrl={currentChannelUrl}
          disableUserProfile={true}
          renderChannelHeader={() => (
            <>
              <ChannelHeader handleDrawerToggle={handleDrawerToggle} />
            </>
          )}
        />
      </div>
    </div>
  );
};
