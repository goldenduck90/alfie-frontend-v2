import React from "react"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ChannelListHeader = ({
  query,
  onSetQuery,
  handleDrawerToggle,
}: {
  query: string
  onSetQuery: (query: string) => void
  handleDrawerToggle: () => void
}) => {
  return (
    <div className="bg-white z-[1] absolute shadow-sm font-mulish w-full text-left px-5 py-4 font-bold flex justify-between">
      <input
        className="font-mulish w-full px-3 py-1 focus:outline-none appearance-none rounded-sm border"
        onChange={(e) => {
          onSetQuery(e.target.value)
        }}
        value={query}
        placeholder="Search channels"
      />

      <div className="flex lg:hidden ml-2">
        <button onClick={handleDrawerToggle} className="px-1">
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
    </div>
  )
}
