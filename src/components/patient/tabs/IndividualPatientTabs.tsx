import * as Tabs from "@radix-ui/react-tabs";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";

import { useMemo, useState } from "react";

const TabList = [
  "Information",
  "Tasks",
  "Medical Questionnaire",
  "Chat",
  "Alerts",
];

export function IndividualPatientTabs({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState(TabList[0]);
  return (
    <div className="flex flex-col overflow-y-auto h-[73vh] w-full bg-white shadow-md rounded-md px-4 py-4">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <Tabs.List className="flex gap-x-3">
            {TabList.map((tab) => (
              <Tabs.Trigger value={tab}>
                <TabTitle active={activeTab === tab}>{tab}</TabTitle>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        <Tabs.Content value={TabList[0]} className="mt-6">
          <TableInformationHeader user={user} />
          <TableUserObject user={user} />
        </Tabs.Content>
        <Tabs.Content value={TabList[1]}>
          <p>Tasks</p>
        </Tabs.Content>
        <Tabs.Content value={TabList[2]}>
          <TableUserObject
            user={{
              WeightLossAttempt: "Several Years",
              WeightManagement: "Diet",
              Conditions: "Diabetes",
            }}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function TableInformationHeader({ user }: { user: any }) {
  const initials = useMemo(() => {
    if (!user?.name) return "";
    const splitName = user?.name?.split(" ");
    const firstInitial = splitName?.[0].charAt(0);
    const lastInitial = splitName[splitName.length - 1].charAt(0);
    return `${firstInitial || ""}${lastInitial || ""}`;
  }, [user]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-3 items-center">
        <AvatarInitial index={0} text={initials} />
        <p>{user?.name}</p>
      </div>
      <div className="flex gap-x-3">
        <p>Active Tasks 0</p>
        <p>Appointments 0</p>
      </div>
    </div>
  );
}

function TableUserObject({ user }: { user: any }) {
  if (!user) return null;
  return (
    <div className="">
      <div className="min-w-full mt-6 border border-gray-200 rounded-md divide-y divide-y-gray-300">
        {Object.keys(user).map((key) => {
          if (typeof user[key] !== "string") {
            return null;
          }
          return (
            <div className="flex gap-x-4 px-2 py-2">
              <p className="capitalize min-w-[225px]">{key}</p>
              <p className="text-gray-600">{user[key]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabTitle({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-md ${
        active ? "text-brand-berry bg-blue-100" : ""
      }`}
    >
      {children}
    </div>
  );
}
