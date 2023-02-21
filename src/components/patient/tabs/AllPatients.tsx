import { ChevronRightIcon } from "@heroicons/react/outline";
import * as Tabs from "@radix-ui/react-tabs";
import { Patient } from "@src/components/practitioner/dashboard/Table";
import { useGetAllPatientsByProvider } from "@src/hooks/useGetAllPatientsByProvider";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Link from "next/link";
import { TextField } from "@src/components/ui/TextField";
import { SearchIcon } from "@heroicons/react/solid";
import { Button } from "@src/components/ui/Button";
import {
  DateOfBirthCell,
  DefaultCell,
  NameCell,
} from "@src/components/ui/table";

export function AllPatientsTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div className="flex flex-col overflow-y-auto min-h-[73vh] w-full bg-white shadow-md rounded-md px-4 py-4">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between flex-wrap gap-y-4">
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
          <div className="flex gap-x-3">
            <TextField
              leftIcon={<SearchIcon className="h-5 w-5 text-gray-400" />}
              placeholder="Search Patients"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <Button buttonType="accent">Add new</Button>
          </div>
        </div>
        <Tabs.Content value="all">
          <AllPatientsTable
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
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
      className={`p-3 rounded-md whitespace-nowrap ${
        active ? "text-brand-berry bg-blue-100" : ""
      }`}
    >
      {children}
    </div>
  );
}

function AllPatientsTable({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) {
  const { data, error, loading } = useGetAllPatientsByProvider();
  const table = usePatientTable({
    data: data?.getAllPatientsByPractitioner || [],
    globalFilter,
    setGlobalFilter,
  });

  if (loading) return <div></div>;

  return (
    <div className="mt-6">
      <p className="text-lg">{`${
        table.getCoreRowModel().rows.length
      } Patients`}</p>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="divide-y divide-gray-300  table-fixed w-auto rounded-md overflow-hidden min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
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
          <tbody className="divide-y divide-gray-300 ">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4">
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
    cell: (info) => <NameCell info={info} />,
  }),
  columnHelper.accessor("dateOfBirth", {
    header: () => <Header>Date of birth</Header>,
    cell: (info) => <DateOfBirthCell info={info} />,
  }),
  columnHelper.accessor("email", {
    header: () => <Header>Email address</Header>,
    cell: (info) => <DefaultCell info={info} />,
  }),
  columnHelper.accessor("phone", {
    header: () => <Header>Phone number</Header>,
    cell: (info) => <DefaultCell info={info} />,
  }),
  columnHelper.accessor("_id", {
    header: undefined,
    cell: (info) => (
      <div className="px-2">
        <Link href={`/dashboard/patients/${info.getValue()}`}>
          <div className="p-1 border rounded-md border-gray-200 max-w-fit">
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </div>
        </Link>
      </div>
    ),
  }),
];

function usePatientTable({
  data,
  globalFilter,
  setGlobalFilter,
}: {
  data: Patient[];
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
}) {
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });
}
