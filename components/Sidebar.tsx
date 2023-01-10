import React from "react"
import {
  faArrowRightFromBracket,
  faCalendarDays,
  faChartArea,
  faCircleQuestion,
  faCommentDots,
  faCreditCard,
  faPills,
  faTasks,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const SidebarItem = ({
  icon,
  title,
  active,
  path,
}: {
  icon: IconDefinition
  title: string
  active: boolean
  path: string
}) => {
  return (
    <Link to={path}>
      <li
        className={`flex items-center px-8 py-3 lg:py-4 border-b border-b-gray-300 ${
          active && "bg-gray-200"
        } hover:bg-gray-200`}
      >
        <div className="flex items-center justify-center w-5">
          <FontAwesomeIcon
            icon={icon}
            className={`${active ? "text-indigo-800" : "text-gray-700"} h-5`}
          />
        </div>
        <span
          className={`mx-4 font-mulish ${
            active ? "text-indigo-800 font-medium" : "text-gray-700"
          }`}
        >
          {title}
        </span>
      </li>
    </Link>
  )
}

const SupportItem = ({
  icon,
  title,
  path,
}: {
  icon: IconDefinition
  title: string
  path: string
}) => {
  return (
    <Link to={path}>
      <li className="flex items-center px-8 py-2 lg:py-3">
        <FontAwesomeIcon icon={icon} className="text-gray-700 h-5" />
        <span className="mx-4 font-mulish text-gray-700">{title}</span>
      </li>
    </Link>
  )
}

const LogoutButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="cursor-pointer flex items-center justify-center px-4 py-3 lg:py-4"
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-5">
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className="text-red-700 h-5"
        />
      </div>
      <span className="mx-4 font-mulish text-red-700">Logout</span>
    </button>
  )
}

export const Sidebar = ({ show = false }: { show?: boolean }) => {
  return (
    <div
      className={`bg-white fixed pt-20 lg:pt-24 flex lg:flex flex-col w-full pb-8 overflow-y-auto border-b lg:border-r h-screen lg:w-72 ${
        !show && "hidden"
      } transition-all duration-500`}
    >
      <div className="flex flex-col justify-between">
        <aside>
          <ul>
            <SidebarItem
              icon={faChartArea}
              title="Dashboard"
              active={true}
              path="/"
            />
            <SidebarItem
              icon={faTasks}
              title="Tasks"
              active={false}
              path="/tasks"
            />
            <SidebarItem
              icon={faCalendarDays}
              title="Appointments"
              active={false}
              path="/appointments"
            />
            <SidebarItem
              icon={faPills}
              title="Medications"
              active={false}
              path="/medications"
            />
            <SidebarItem
              icon={faCreditCard}
              title="Billing"
              active={false}
              path="/billing"
            />
            <SidebarItem
              icon={faUser}
              title="Account"
              active={false}
              path="/account"
            />
          </ul>

          <div className="flex flex-col ml-8 mt-8 mb-3 lg:mb-4">
            <h3 className="text-gray-500 font-medium text-lg font-mulish">
              Support
            </h3>
          </div>

          <ul>
            <SupportItem icon={faCommentDots} title="Chat" path="/chat" />
            <SupportItem icon={faCircleQuestion} title="FAQ" path="/faq" />
          </ul>

          <div className="flex items-center border-t border-bg-gray-300 mt-10 mx-4">
            <LogoutButton onClick={() => localStorage.clear()} />
          </div>
        </aside>
      </div>
    </div>
  )
}
