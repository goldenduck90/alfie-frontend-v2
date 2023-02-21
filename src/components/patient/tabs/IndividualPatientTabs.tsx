import { Tab } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import * as Tabs from "@radix-ui/react-tabs";
import { Patient } from "@src/components/practitioner/dashboard/Table";
import { useGetAllPatientsByProvider } from "@src/hooks/useGetAllPatientsByProvider";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const TabList = [
  "Information",
  "Tasks",
  "Medical Questionnaire",
  "Chat",
  "Alerts",
];

export function IndividualPatientTabs() {
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
        <Tabs.Content value={TabList[0]}>
          <p>Information of User</p>
        </Tabs.Content>
        <Tabs.Content value={TabList[1]}>
          <p>Tasks</p>
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
  const { data, error, loading } = useGetAllPatientsByProvider();
  const table = usePatientTable({
    data: data?.getAllPatientsByPractitioner || [],
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-6">
      <p className="text-lg">{`${table.getRowModel().rows.length} Patients`}</p>
      <div className="w-full mt-4 border rounded-md">
        <table className="w-auto rounded-md overflow-hidden min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th>
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-b border-t-gray-200 border-b-gray-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AllPatientsIssuesTable() {
  return <div>All Patients with issues</div>;
}

const columnHelper = createColumnHelper<Patient>();

function Header({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-2 text-left font-[500]">{children}</div>;
}

const columns = [
  columnHelper.accessor("name", {
    header: () => <Header>Name</Header>,
    cell: (info) => <div className="px-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("dateOfBirth", {
    header: () => <Header>Date of birth</Header>,
    cell: (info) => <div className="px-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("email", {
    header: () => <Header>Email address</Header>,
    cell: (info) => <div className="px-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("phone", {
    header: () => <Header>Phone number</Header>,
    cell: (info) => <div className="px-2">{info.getValue()}</div>,
  }),
  columnHelper.accessor("_id", {
    header: undefined,
    cell: (info) => (
      <div className="px-2">
        <button className="p-1 border rounded-md border-gray-200 max-w-fit">
          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    ),
  }),
];

function usePatientTable({ data }: { data: Patient[] }) {
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
}
