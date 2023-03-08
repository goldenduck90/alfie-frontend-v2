import React from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ChannelListHeader = ({
  query,
  onSetQuery,
  handleDrawerToggle,
}: {
  query: string;
  onSetQuery: (query: string) => void;
  handleDrawerToggle: () => void;
}) => {
  const [value, setValue] = React.useState(query);

  React.useEffect(() => {
    const interval = setTimeout(() => {
      onSetQuery(value);
    }, 500);
    return () => clearTimeout(interval);
  }, [value]);

  return (
    <div className="bg-white z-[1] absolute rounded-tl-xl shadow-sm w-full text-left px-5 py-4 font-bold flex justify-between border-r">
      <input
        className="font-mulish w-full px-3 py-1 focus:outline-none appearance-none rounded-sm border"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        placeholder="Search channels"
      />

      <div className="flex lg:hidden ml-2">
        <button onClick={handleDrawerToggle} className="px-1">
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
    </div>
  );
};
