import * as Tabs from "@radix-ui/react-tabs";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";

import { useMemo, useState } from "react";
import { BasicChart } from "./BasicChart";
import { MetabolicChart } from "./MetabolicChart";
import { PatientTasks } from "./components/PatientTasks";

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
    <div className="flex flex-col overflow-y-auto min-h-[73vh] w-full bg-white md:bg-gray-50 shadow-md rounded-md px-4 md:px-8 py-4">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between overflow-x-auto">
          <Tabs.List className="flex gap-x-3">
            {TabList.map((tab, i) => (
              <Tabs.Trigger value={tab} key={i}>
                <TabTitle active={activeTab === tab}>{tab}</TabTitle>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        <Tabs.Content value={TabList[0]} className="mt-6">
          <TableInformationHeader user={user} />
          <TableUserObject user={user} />
          <div className="w-full mt-6">
            <p className="mb-6 text-xl font-bold">Metabolic Profile</p>
            <MetabolicChart />
          </div>
          <p className="my-6 text-xl font-bold">Other Details</p>
          <div className="w-full grid md:grid-cols-2 gap-4">
            <BasicChart title="Weight" />
            <BasicChart title="Waist" />
            <BasicChart title="Steps" />
            <BasicChart title="Blood Pressure" />
          </div>
        </Tabs.Content>
        <Tabs.Content value={TabList[1]}>
          <PatientTasks />
        </Tabs.Content>
        <Tabs.Content value={TabList[2]}>
          <TableUserObject
            user={{
              WeightLossAttempt: "Several Years",
              WeightManagement: "Diet",
              Conditions: "Diabetes",
              PreviousConditions: "None",
              Medications: "None",
              SurgicalHistory: "None",
              Allergies: "None",
              UseAmazonPharmacy: "No",
              Pharmacy: "None",
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
        <p className="font-bold text-xl">{user?.name}</p>
      </div>
      <div className="flex gap-x-3 items-center">
        <p className="flex gap-x-2 items-center">
          Active Tasks
          <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-center flex items-center justify-center">
            0
          </span>
        </p>
        <p className="flex gap-x-2 items-center">
          Appointments
          <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-center flex items-center justify-center">
            0
          </span>
        </p>
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
            <div key={key} className="flex gap-x-4 px-6 py-4">
              <p className="capitalize min-w-[275px] font-bold">{key}</p>
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
      className={`p-3 rounded-md hover:bg-gray-50 ${
        active ? "text-brand-berry bg-blue-100 hover:bg-blue-100" : ""
      }`}
    >
      {children}
    </div>
  );
}
