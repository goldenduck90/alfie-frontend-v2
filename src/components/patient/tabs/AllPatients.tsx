import { Tab } from "@headlessui/react";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";

export function AllPatientsTabs() {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div className="flex flex-col overflow-y-auto h-[73vh] w-full bg-white shadow-md rounded-md px-4 py-4">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-x-3">
          <Tabs.Trigger value="all">
            <TabTitle active={activeTab === "all"}>All Patients</TabTitle>
          </Tabs.Trigger>
          <Tabs.Trigger value="active">
            <TabTitle active={activeTab === "active"}>
              Patients with Health Issues
            </TabTitle>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all">
          <AllPatientsTable />
        </Tabs.Content>
        <Tabs.Content value="active">
          <AllPatientsIssuesTable />
        </Tabs.Content>
      </Tabs.Root>
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

function AllPatientsTable() {
  return <div>All Patients list</div>;
}

function AllPatientsIssuesTable() {
  return <div>All Patients with issues</div>;
}
