import React from "react";
import { Role } from "../../graphql/generated";
import { useCheckRole } from "@src/hooks/useCheckRole";

import ChannelAvatar from "@sendbird/uikit-react/ui/ChannelAvatar";
import { useSendbirdStateContext } from "@sendbird/uikit-react";
import { useChannelContext } from "@sendbird/uikit-react/Channel/context";

import { ArrowLeftIcon } from "@heroicons/react/outline";

export const ChannelHeader = ({
  handleDrawerToggle,
}: {
  handleDrawerToggle: () => void;
}) => {
  const { config } = useSendbirdStateContext();
  const { currentGroupChannel } = useChannelContext();

  const isPatientRole = useCheckRole([Role.Patient]);

  if (!currentGroupChannel) return null;

  const members = currentGroupChannel.members
    .map((item) => item.nickname)
    // remove undefined
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex relative">
      <button
        className={`absolute left-3 top-7 ${
          isPatientRole ? "hidden" : "block lg:hidden"
        }`}
        onClick={handleDrawerToggle}
      >
        <ArrowLeftIcon className="h-5 w-5 text-gray-400 px-1" />
      </button>

      <div className="flex flex-col w-full px-5 py-2 items-center border-b shadow-sm">
        <ChannelAvatar
          channel={currentGroupChannel}
          userId={config.userId}
          theme={config.theme}
          height={32}
          width={32}
        />
        <p className="font-bold text-lg pl-2">{members}</p>
      </div>
    </div>
  );
};
