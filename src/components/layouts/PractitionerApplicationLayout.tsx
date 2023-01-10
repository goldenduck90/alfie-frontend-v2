/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-function */
/* This example requires Tailwind CSS v2.0+ */
import {
  faArrowRightFromBracket,
  faCalendarDays,
  faChartArea,
  faCog,
  faCommentDots,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useIntercom } from "react-use-intercom";
import { useAuth } from "../../hooks/useAuth";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const PractitionerApplicationLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const { boot } = useIntercom();

  useEffect(() => {
    boot({
      email: user?.email,
      name: user?.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FontAwesomeIcon className="h-5" icon={faChartArea} />,
      current: location.pathname === "/dashboard" ? true : false,
    },
    {
      name: "Appointments",
      href: "/practitioner/appointments",
      icon: <FontAwesomeIcon className="h-5" icon={faCalendarDays} />,
      current:
        location.pathname === "/practitioner/appointments" ? true : false,
    },
    {
      name: "My Patients",
      href: "/patients",
      icon: <FontAwesomeIcon className="h-5" icon={faUserGroup} />,
      current: location.pathname.includes("patients") ? true : false,
    },
    {
      name: "Chat",
      href: "/chat",
      icon: <FontAwesomeIcon className="h-5" icon={faCommentDots} />,
      current: location.pathname === "/chat" ? true : false,
    },
    {
      name: "Settings",
      href: "/practitioner/settings",
      icon: <FontAwesomeIcon className="h-5" icon={faCog} />,
      current: location.pathname === "/practitioner/settings" ? true : false,
    },
    {
      name: "Logout",
      href: "/",
      action: () => {
        window.location.href = "/";
        localStorage.clear();
      },
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-5" />,
      current: false,
    },
  ];
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-royalBlue">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Link to="/dashboard">
                        <img
                          src={require("../../assets/logo-white.png")}
                          className="h-8 lg:h-10"
                          alt="Alfie"
                        />
                      </Link>
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <Link
                          onClick={item.action ? item.action : () => {}}
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-700 text-white"
                              : "text-white hover:bg-indigo-700 hover:bg-opacity-75",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <div>{item.icon}</div>
                          <div className="mx-4 font-medium text-lg">
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-royalBlue p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            {user?.name}
                          </p>
                          {/* <p className="text-sm font-medium text-indigo-200 group-hover:text-white">
                            View profile
                          </p> */}
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-royalBlue">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Link to="/dashboard">
                  <img
                    src={require("../../assets/logo-white.png")}
                    className="h-8 lg:h-10"
                    alt="Alfie"
                  />
                </Link>
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    onClick={item.action ? item.action : () => {}}
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-700 text-white"
                        : "text-white hover:bg-indigo-700 hover:bg-opacity-75",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <div>{item.icon}</div>
                    <div className="mx-4 font-medium text-lg">{item.name}</div>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
              <a href="#" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs font-medium text-indigo-200 group-hover:text-white">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto px-4 sm:px-6 md:px-8 pb-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {title}
                </h1>
              </div>
              {/*  */}
              <div className="mx-autopx-4 px-4 md:px-8 lg:py-6 sm:py-6 md:py-6">
                {/* Replace with your content */}
                {children}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
