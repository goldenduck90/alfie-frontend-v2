import React, { useEffect } from "react";
import { Layout } from "@src/components/layouts/Layout";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { TabTitle } from "@src/components/ui/tabs/TabTitle";
export function SettingsView() {
  const router = useRouter();
  const activeTab = (router.query.settingsTab as string) || "account-details";
  const [tab, setActiveTab] = React.useState(activeTab);
  return (
    <div className="flex flex-col overflow-y-auto min-h-[73vh] w-full bg-white shadow-md rounded-md px-4 py-4">
      <Tabs.Root
        value={tab}
        onValueChange={(value) => {
          router.replace(`/settings/${value}`, undefined, { shallow: false });
          setActiveTab(value);
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-y-4">
          <Tabs.List className="flex gap-x-3">
            <Tabs.Trigger value="account-details">
              <TabTitle active={tab === "account-details"}>
                Account Details
              </TabTitle>
            </Tabs.Trigger>
            <Tabs.Trigger value="plan-&-billing">
              <TabTitle active={tab === "plan-&-billing"}>
                Plan & Billing
              </TabTitle>
            </Tabs.Trigger>
            <Tabs.Trigger value="notifications">
              <TabTitle active={tab === "notifications"}>
                Notifications
              </TabTitle>
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <Tabs.Content value="account-details" className="mt-6">
          <div>Account Details</div>
        </Tabs.Content>
        <Tabs.Content value="plan-&-billing">
          <div>Plan & Billing</div>
        </Tabs.Content>
        <Tabs.Content value="notifications">
          <div>notifications</div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
