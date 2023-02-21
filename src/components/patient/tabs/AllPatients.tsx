import { ChevronRightIcon } from "@heroicons/react/outline";
import * as Tabs from "@radix-ui/react-tabs";
import { Patient } from "@src/components/practitioner/dashboard/Table";
import { useGetAllPatientsByProvider } from "@src/hooks/useGetAllPatientsByProvider";
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { TextField } from "@src/components/ui/TextField";
import { SearchCircleIcon, SearchIcon } from "@heroicons/react/solid";
import { Button } from "@src/components/ui/Button";

export function AllPatientsTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div className="flex flex-col overflow-y-auto h-[73vh] w-full bg-white shadow-md rounded-md px-4 py-4">
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
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
      className={`p-3 rounded-md ${
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-6">
      <p className="text-lg">{`${
        table.getCoreRowModel().rows.length
      } Patients`}</p>
      <div className="w-full mt-4 border rounded-md">
        <table className="w-auto rounded-md overflow-hidden min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-50">
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

function InitialsCircleAvatar({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const bgColors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-yellow-100 text-yellow-600",
    "bg-red-100 text-red-600",
    "bg-green-100 text-green-600",
  ];
  const color = bgColors[index % bgColors.length];

  return (
    <div
      className={`w-8 h-8 rounded-full flex justify-center items-center ${color}`}
    >
      <p className="text-sm uppercase">{text}</p>
    </div>
  );
}

function NameCell({ info }: { info: CellContext<Patient, string> }) {
  const initials = useMemo(() => {
    const splitName = info.getValue().split(" ");
    const firstInitial = splitName[0].charAt(0);
    const lastInitial = splitName[splitName.length - 1].charAt(0);
    return `${firstInitial || ""}${lastInitial || ""}`;
  }, [info]);

  return (
    <div className="px-2 flex gap-x-2 items-center">
      <InitialsCircleAvatar text={initials} index={info.row.index} />
      <p className="capitalize">{info.getValue()}</p>
    </div>
  );
}

function DateOfBirthCell({ info }: { info: CellContext<Patient, string> }) {
  const dob = useMemo(() => {
    const date = new Date(info.getValue());
    return dayjs(date).format("MM.DD.YYYY");
  }, [info]);

  return <div className="px-2">{dob || ""}</div>;
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
