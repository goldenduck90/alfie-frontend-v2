import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";

import { useNotificationStore } from "../hooks/useNotificationStore";
import type { INotification } from "../hooks/useNotificationStore";
import { v4 as randomId } from "uuid";

//? This is on the basic page layout for every page
//? all you need to do is add to the useNotification hook
export function ShowNotification() {
  const notifications = useNotificationStore((store) => store.notifications);
  return (
    <div className="fixed bottom-6 left-10 z-50">
      {notifications.map((notification) => (
        <Notification {...notification} id={randomId()} key={notification.id} />
      ))}
    </div>
  );
}

function Notification({ id, description, type, title }: INotification) {
  const removeNotification = useNotificationStore(
    (store) => store.removeNotification
  );

  // remove notification after 4 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeNotification(id);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [id, removeNotification]);

  return (
    <Transition
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`notification-${type}`}>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        <button onClick={() => removeNotification(id)}>
          <XIcon className="h-5 w-5 hover:text-prim-400" />
        </button>
      </div>
    </Transition>
  );
}
