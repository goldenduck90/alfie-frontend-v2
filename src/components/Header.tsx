import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faCommentDots } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"

const MessageNotif = ({ notif = false }: { notif?: boolean }) => {
  const navigate = useNavigate()
  return (
    <button
      className="cursor-pointed relative w-7 lg:w-8 flex justify-center items-center"
      onClick={() => navigate("/chat")}
    >
      <FontAwesomeIcon
        icon={faCommentDots}
        className="text-white h-7 lg:h-10"
      />
      {notif && (
        <span className="flex absolute h-3 w-3 lg:h-4 lg:w-4 top-1 right-0 lg:-right-1 -mt-1 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 lg:h-4 lg:w-4 bg-red-500"></span>
        </span>
      )}
    </button>
  )
}

const MenuButton = ({
  show = false,
  toggleSidebar,
}: {
  show?: boolean
  toggleSidebar: (value: boolean) => void
}) => {
  return (
    <button
      className="cursor-pointed w-7 flex items-center justify-center"
      onClick={() => toggleSidebar(!show)}
    >
      <FontAwesomeIcon
        icon={show ? faClose : faBars}
        className="text-white h-7"
      />
    </button>
  )
}

export const Header = ({
  show = false,
  toggleSidebar,
}: {
  show?: boolean
  toggleSidebar: (value: boolean) => void
}) => {
  return (
    <nav className="fixed z-30 w-full bg-indigo-800 border-b-2 border-violet-50 px-5 lg:px-14 py-5 lg:py-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center lg:hidden">
          <MenuButton toggleSidebar={toggleSidebar} show={show} />
        </div>

        {/* LOGO */}
        <div className="flex items-center">
          <a href="#">
            <img
              src={require("../assets/logo-white.png")}
              className="h-8 lg:h-10"
              alt="Alfie"
            />
          </a>
        </div>

        <div className="flex items-center">
          <MessageNotif />
        </div>
      </div>
    </nav>
  )
}
