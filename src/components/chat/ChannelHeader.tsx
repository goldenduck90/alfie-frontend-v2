import React from "react";
import { Role } from "../../graphql/generated";
import { useCheckRole } from "@src/hooks/useCheckRole";

import ChannelAvatar from "@sendbird/uikit-react/ui/ChannelAvatar";
import { useSendbirdStateContext } from "@sendbird/uikit-react";
import { useChannelContext } from "@sendbird/uikit-react/Channel/context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon className="px-1" icon={faArrowLeft} />
      </button>

      <div className="flex flex-col w-full px-5 py-2 items-center">
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
