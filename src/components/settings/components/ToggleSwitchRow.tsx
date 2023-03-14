import { BellIcon, MailIcon } from "@heroicons/react/outline";
import { ToggleSwitch } from "@src/components/ui/ToggleSwitch";
import { useState } from "react";
import { useNotificationState } from "../NotificationView";

export function ToggleSwitchRow({
  notificationValue,
}: {
  notificationValue: string;
}) {
  const { state, setNotificationState } = useNotificationState();

  return (
    <div className="flex justify-between">
      <div className="flex md:hidden flex-col text-gray-500 gap-4">
        <div className="flex items-center gap-4">
          <BellIcon className="w-5 h-5" />
          <p>Push</p>
        </div>
        <div className="flex items-center gap-4">
          <MailIcon className="w-5 h-5" />
          <p>Email</p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <ToggleSwitch
          label=""
          checked={state[notificationValue].push}
          onCheckedChange={() =>
            setNotificationState({
              notificationType: notificationValue,
              key: "push",
              value: !state[notificationValue].push,
            })
          }
          name="notification"
        />
        <ToggleSwitch
          label=""
          checked={state[notificationValue].email}
          onCheckedChange={() =>
            setNotificationState({
              notificationType: notificationValue,
              key: "email",
              value: !state[notificationValue].email,
            })
          }
          name="email"
        />
      </div>
    </div>
  );
}
