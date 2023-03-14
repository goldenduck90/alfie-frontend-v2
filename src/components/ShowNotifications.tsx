import { CheckCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";

import { useNotificationStore } from "../hooks/useNotificationStore";
import type { INotification } from "../hooks/useNotificationStore";

//? This is on the basic page layout for every page
//? all you need to do is add to the useNotification hook
export function ShowNotification() {
  const notifications = useNotificationStore((store) => store.notifications);
  return (
    <div className="fixed bottom-6 left-10 z-50">
      {notifications.map((notification) => (
        <Notification {...notification} key={notification.id} />
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
    <div className={`notification-${type}`}>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-1 text-sm text-white">{description}</p>
      </div>
      <button onClick={() => removeNotification(id)}>
        <XIcon className="h-5 w-5 hover:text-red-400" />
      </button>
    </div>
  );
}
