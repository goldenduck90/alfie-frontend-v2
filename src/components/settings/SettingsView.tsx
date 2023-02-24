import React, { ReactNode, useEffect } from "react";
import { Layout } from "@src/components/layouts/Layout";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { TabTitle } from "@src/components/ui/tabs/TabTitle";
import { useUserSession } from "@src/hooks/useUserSession";
import { useUserStateContext } from "@src/context/SessionContext";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Button } from "../ui/Button";
export function SettingsView() {
  const router = useRouter();
  const activeTab =
    (router.query.settingsTab?.[0] as string) || "account-details";
  const [tab, setActiveTab] = React.useState(activeTab ?? "account-details");

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
          <AccountDetails />
        </Tabs.Content>
        <Tabs.Content value="plan-&-billing" className="mt-6">
          <div>Plan & Billing</div>
        </Tabs.Content>
        <Tabs.Content value="notifications" className="mt-6">
          <div>notifications</div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function AccountDetails() {
  const { user } = useCurrentUserStore();
  return (
    <div>
      <div>
        <h1 className="text-xl font-[600]">Account Details</h1>
        <TableViewRow
          inputs={[
            {
              left: (
                <TableEntryInline
                  leftText="Fullname"
                  rightText={user?.name || ""}
                />
              ),
              right: (
                <div>
                  <Button buttonType="secondary">Change</Button>
                </div>
              ),
            },
            {
              left: (
                <TableEntryInline
                  leftText="Email address"
                  rightText={user?.email || ""}
                />
              ),
              right: (
                <div>
                  <Button buttonType="secondary">Change</Button>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className="mt-6">
        <h1 className="text-xl font-[600]">Change password</h1>
        <TableViewRow
          inputs={[
            {
              left: (
                <TableEntryStacked
                  title="Password"
                  subtext="You haven't changed your password recently"
                />
              ),
              right: (
                <div>
                  <Button buttonType="secondary">Change password</Button>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className="mt-6">
        <h1 className="text-xl font-[600]">Language and region</h1>
        <TableViewRow
          inputs={[
            {
              left: (
                <TableEntryStacked
                  title="Automatic time zone"
                  subtext="Lumix uses your time zone to send summary and notification emails, for times in your activity feeds, and for reminders."
                />
              ),
              right: (
                <div>
                  <Button buttonType="secondary">GMT +01:00</Button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

function TableView({ obj }: { obj: Record<string, string> }) {
  if (!obj) return null;
  return (
    <div className="">
      <div className="min-w-full mt-6 border border-gray-200 rounded-md divide-y divide-y-gray-300">
        {Object.keys(obj).map((key) => {
          if (typeof obj[key] !== "string") {
            return null;
          }
          return (
            <div key={key} className="flex gap-x-4 px-6 py-4">
              <p className="capitalize min-w-[275px] font-bold">{key}</p>
              <p className="text-gray-600">{obj[key]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TableViewRow({
  inputs,
}: {
  inputs: { left: ReactNode; right?: ReactNode }[];
}) {
  if (!inputs) return null;
  return (
    <div className="">
      <div className="min-w-full mt-6 border border-gray-200 rounded-md divide-y divide-y-gray-300">
        {inputs.map(({ left, right }, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center px-6 py-4"
            >
              {left && left}
              {right && right}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TableEntryInline({
  leftText,
  rightText,
}: {
  leftText: string;
  rightText: string;
}) {
  return (
    <div className="flex gap-x-4">
      <p className="capitalize min-w-[275px] font-bold">{leftText}</p>
      <p className="text-gray-600">{rightText}</p>
    </div>
  );
}

function TableEntryStacked({
  title,
  subtext,
}: {
  title: string;
  subtext: string;
}) {
  return (
    <div className="flex flex-col">
      <p className="text font-bold">{title}</p>
      <p className="text-sm text-gray-600">{subtext}</p>
    </div>
  );
}
