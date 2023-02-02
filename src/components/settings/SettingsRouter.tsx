import { useRouter } from "next/router";
import React from "react";
import { ToggleGroup } from "../ui/ToggleGroup";

export function SettingsRouter() {
  const router = useRouter();

  const items: any[] = [
    {
      label: "Account details",
      content: (
        <button onClick={() => router.push("/settings/account-details")}>
          Account details
        </button>
      ),
    },
    {
      label: "Plan & billing",
      content: (
        <button onClick={() => router.push("/settings/plan-&-billing")}>
          Plan & billing
        </button>
      ),
    },
    {
      label: "Notifications",
      content: (
        <button onClick={() => router.push("/settings/notifications")}>
          Notifications
        </button>
      ),
    },
  ];

  return <ToggleGroup items={items} />;
}
