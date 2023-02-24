import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { TabTitle } from "@src/components/ui/tabs/TabTitle";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Button } from "../ui/Button";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { DialogModal } from "../modal/Dialog";
import { ChangeNameModal } from "../modal/settings/ChangeNameModal";
import { ChangeEmailModal } from "../modal/settings/ChangeEmailModal";
import { ChangePasswordModal } from "../modal/settings/ChangePasswordModal";
import dayjs from "dayjs";
import { CheckCircleIcon } from "@heroicons/react/outline";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function SettingsView() {
  const router = useRouter();
  const activeTab =
    (router.query.settingsTab?.[0] as string) || "account-details";

  return (
    <div className="flex flex-col overflow-y-auto min-h-[73vh] w-full bg-white shadow-md rounded-md px-4 py-4">
      <Tabs.Root
        value={activeTab}
        onValueChange={(value) => {
          router.replace(`/settings/${value}`, undefined, { shallow: true });
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-y-4">
          <Tabs.List className="flex gap-x-3">
            <Tabs.Trigger value="account-details">
              <TabTitle active={activeTab === "account-details"}>
                Account Details
              </TabTitle>
            </Tabs.Trigger>
            <Tabs.Trigger value="plan-&-billing">
              <TabTitle active={activeTab === "plan-&-billing"}>
                Plan & Billing
              </TabTitle>
            </Tabs.Trigger>
            <Tabs.Trigger value="notifications">
              <TabTitle active={activeTab === "notifications"}>
                Notifications
              </TabTitle>
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <Tabs.Content value="account-details" className="mt-6">
          <AccountDetails />
        </Tabs.Content>
        <Tabs.Content value="plan-&-billing" className="mt-6">
          <PlanAndBillingView />
        </Tabs.Content>
        <Tabs.Content value="notifications" className="mt-6">
          <NotificationsView />
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
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  <ChangeNameModal title="Full name" />
                </DialogModal>
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
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  <ChangeEmailModal title="Email address" />
                </DialogModal>
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
                <DialogModal
                  triggerAsChild
                  trigger={
                    <Button buttonType="secondary">Change password</Button>
                  }
                >
                  <ChangePasswordModal title="Change password" />
                </DialogModal>
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
                <div className="flex items-center gap-x-3">
                  <span className="text-sm text-gray-600">
                    GMT {dayjs().format("Z")}
                  </span>
                  <ToggleSwitch
                    label=""
                    checked={true}
                    onCheckedChange={() => {}}
                    name="Automatic time zone"
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

type NotificationViewItem = {
  title: string;
  subtext: string;
  rightNode?: React.ReactNode;
};

const topItems: NotificationViewItem[] = [
  {
    title: "Someone messages me",
    subtext:
      "When someone sends you a message in chat, we will send you a notification.",
    rightNode: <ToggleSwitchRow />,
  },
  {
    title: "My subscription is about to expire",
    subtext:
      "We will send you a notification one week before your subscription expires.",
    rightNode: <ToggleSwitchRow />,
  },
  {
    title: "I have a new task assigned",
    subtext:
      "When someone from the Alfie team adds a task for you to complete, we will notify you.",
    rightNode: <ToggleSwitchRow />,
  },
  {
    title: "I have an overdue task",
    subtext: "If one of your tasks will be overdue we will let you know.",
    rightNode: <ToggleSwitchRow />,
  },
  {
    title: "I receive a new invoice",
    subtext: "We will notify you when a new invoice is issued.",
    rightNode: <ToggleSwitchRow />,
  },
  {
    title: "My scheduled appointments change",
    subtext:
      "If any changes related to your appointment would appear, we'll let you know via notification.",
    rightNode: <ToggleSwitchRow />,
  },
];

const weeklyNewsLetter: NotificationViewItem[] = [
  {
    title: "Education",
    subtext:
      "Increase your knowledge about a healthy lifestyle and implement new habits on a daily basis.",
    rightNode: (
      <ToggleSwitch
        label=""
        checked={true}
        onCheckedChange={() => {}}
        name="phone"
      />
    ),
  },
  {
    title: "Alfie Insider",
    subtext:
      "Stay up to date with all news, changes and new services from Alfie.",
    rightNode: (
      <ToggleSwitch
        label=""
        checked={true}
        onCheckedChange={() => {}}
        name="phone"
      />
    ),
  },
];

function ToggleSwitchRow() {
  return (
    <div className="flex gap-x-2">
      <ToggleSwitch
        label=""
        checked={true}
        onCheckedChange={() => {}}
        name="phone"
      />
      <ToggleSwitch
        label=""
        checked={true}
        onCheckedChange={() => {}}
        name="email"
      />
    </div>
  );
}

function NotificationsView() {
  return (
    <div>
      <div>
        <h1 className="text-xl font-[600]">Notifications</h1>
        <TableViewRow
          inputs={topItems.map((item) => ({
            left: (
              <TableEntryStacked title={item.title} subtext={item.subtext} />
            ),
            right: item.rightNode,
          }))}
        />
      </div>
      <div className="mt-6">
        <h1 className="text-lg font-[600]">Weekly newsletter</h1>
        <TableViewRow
          inputs={weeklyNewsLetter.map((item) => ({
            left: (
              <TableEntryStacked title={item.title} subtext={item.subtext} />
            ),
            right: item.rightNode,
          }))}
        />
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

function PlanAndBillingView() {
  const { user } = useCurrentUserStore();

  return (
    <div>
      <p>Plan & Billing</p>
      <div className="flex gap-x-5">
        <PlanCard />
        <NextPaymentCard />
      </div>
      <div className="mt-6">
        <p>Billing Information</p>
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
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  {/* <ChangeNameModal title="Full name" /> */}
                </DialogModal>
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
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  {/* <ChangeNameModal title="Full name" /> */}
                </DialogModal>
              ),
            },
            {
              left: (
                <TableEntryInline
                  leftText="Billing address"
                  rightText={user?.address?.state || ""}
                />
              ),
              right: (
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  <div />
                </DialogModal>
              ),
            },
            {
              left: (
                <TableEntryInline
                  leftText="Phone number"
                  rightText={user?.phone || ""}
                />
              ),
              right: (
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  <div />
                </DialogModal>
              ),
            },
          ]}
        />
      </div>
      <div className="mt-6">
        <p>Invoice history</p>
        <InvoiceHistoryTable />
      </div>
    </div>
  );
}

const planPoints = [
  "4 free appointments with our specialist per monthaccess to ",
  "access to medical data history",
  "chat with our experts",
  "individual program",
  "personal dashboard",
];
function PlanCard() {
  return (
    <div className="border border-gray-300 rounded-md flex-grow shadow">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <p>Basic Plan</p>
          <div>
            <p>US $120.00</p>
          </div>
        </div>
        <p className="py-2 whitespace-pre">
          {`If you want to upgrade your plan, please click the button below.\nYour current plan includes:`}
        </p>
        <div className="flex flex-col gap-y-2 mb-6">
          {planPoints.map((point, index) => {
            return (
              <p
                className="text-sm flex items-center gap-x-2 text-gray-600"
                key={point}
              >
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                {point}
              </p>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p>Enable auto renew</p>
            <p>
              After your subscription ends on 5 February 2024, this plan will
              continue automatically.
            </p>
          </div>
          <div>
            <ToggleSwitch
              label=""
              checked={true}
              onCheckedChange={() => {}}
              name="phone"
            />
          </div>
        </div>
      </div>
      <div className="w-full border-t border-gray-200 px-4 flex items-center justify-end py-4 gap-x-3">
        <Button buttonType="urgent">Cancel plan</Button>
        <Button>Change plan</Button>
      </div>
    </div>
  );
}

function NextPaymentCard() {
  return (
    <div>
      <div className="p-4 border border-gray-300 rounded-md flex-shrink-0 max-h-fit min-w-[270px] shadow">
        <p>Next payment</p>
        <p>on 25 Feb 2023</p>
        <div className="flex items-center justify-end mt-10">
          <Button buttonType="secondary">Manage payments</Button>
        </div>
      </div>
    </div>
  );
}

interface InvoiceHistory {
  date: string;
  name: string;
  status: string;
  amount: string;
  file: string;
}

const columnHelper = createColumnHelper<InvoiceHistory>();

const columns = [
  columnHelper.accessor("date", {
    header: () => (
      <p className="py-2 text-gray-600 font-[500] capitalize text-left pl-3">
        date
      </p>
    ),
    cell: (info) => <p className="py-2 pl-3">{info.getValue()}</p>,
  }),
  columnHelper.accessor("name", {
    header: () => (
      <p className="py-2 text-gray-600 font-[500] capitaliz text-left">Name</p>
    ),
    cell: (info) => <p>{info.getValue()}</p>,
  }),
  columnHelper.accessor("status", {
    header: () => (
      <p className="py-2 text-gray-600 font-[500] capitalize text-left">
        status
      </p>
    ),
    cell: (info) => <p>{info.getValue()}</p>,
  }),
  columnHelper.accessor("amount", {
    header: () => (
      <p className="py-2 text-gray-600 font-[500] capitalize text-left">
        amount
      </p>
    ),
    cell: (info) => <p>{info.getValue()}</p>,
  }),
  columnHelper.accessor("file", {
    header: () => (
      <p className="py-2 text-gray-600 font-[500] capitalize text-left pr-3">
        file
      </p>
    ),
    cell: (info) => <p>{info.getValue()}</p>,
  }),
];

const tempData = [
  {
    date: "10.04.1992",
    name: "Alfie Basic Subscription",
    status: "Paid",
    amount: "$120.00",
    file: "Download",
  },
  {
    date: "10.04.1992",
    name: "Alfie Basic Subscription",
    status: "Paid",
    amount: "$120.00",
    file: "Download",
  },
  {
    date: "10.04.1992",
    name: "Alfie Basic Subscription",
    status: "Paid",
    amount: "$120.00",
    file: "Download",
  },
  {
    date: "10.04.1992",
    name: "Alfie Basic Subscription",
    status: "Paid",
    amount: "$120.00",
    file: "Download",
  },
];

function InvoiceHistoryTable() {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: tempData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="divide-y divide-gray-300  table-fixed w-auto rounded-md overflow-hidden min-w-full">
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {getRowModel().rows.map((row) => (
            <tr key={row.id} className="">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-left">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
