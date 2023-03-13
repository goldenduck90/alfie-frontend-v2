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
import { useState } from "react";
import Link from "next/link";
import { TextField } from "@src/components/ui/TextField";
import { SearchIcon } from "@heroicons/react/solid";
import { Button } from "@src/components/ui/Button";
import {
  DateOfBirthCell,
  DefaultCell,
  NameCell,
} from "@src/components/ui/table";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";
import { useRouter } from "next/router";
import { TabTitle } from "@src/components/ui/tabs/TabTitle";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { useGetAllPatientsByAdmins } from "@src/hooks/useGetAllPatientsByAdmin";

export function AllPatientsTabs() {
  const router = useRouter();
  const tab = (router?.query?.tab as string) || "all";
  const [activeTab, setActiveTab] = useState(tab || "all");
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="relative flex flex-col overflow-y-auto min-h-[73vh] w-full bg-white shadow-md rounded-xl px-4 pb-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-y-4 sticky top-0 p-4 -mx-4 bg-white">
        <Tabs.List className="flex gap-x-3">
          <Tabs.Trigger value="all">
            <TabTitle active={activeTab === "all"}>All Patients</TabTitle>
          </Tabs.Trigger>
          <Tabs.Trigger value="issues">
            <TabTitle active={activeTab === "issues"}>
              Patients with Health Issues
            </TabTitle>
          </Tabs.Trigger>
        </Tabs.List>

        <TextField
          leftIcon={<SearchIcon className="h-5 w-5 text-gray-400" />}
          placeholder="Search Patients"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <Tabs.Content value="all" className="mt-2">
        <AllPatientsTable
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </Tabs.Content>
      <Tabs.Content value="issues" className="mt-2">
        <AllPatientsTable
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export function AllPatientsTable({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) {
  const { user } = useCurrentUserStore();
  const { data, error, loading } = useGetAllPatientsByProvider();
  const adminUsers = useGetAllPatientsByAdmins();

  const providerTable = usePatientTable({
    data: data?.getAllPatientsByPractitioner || [],
    globalFilter,
    setGlobalFilter,
  });
  const adminTable = usePatientTable({
    data: adminUsers.data?.users || [],
    globalFilter,
    setGlobalFilter,
  });

  const table = user?.role === "Admin" ? adminTable : providerTable;

  return (
    <div className="max-h-[50vh]">
      <p className="text-lg">{`${
        table?.getCoreRowModel().rows.length
      } Patients`}</p>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="divide-y divide-gray-300  table-fixed w-auto rounded-md overflow-hidden min-w-full">
          <thead>
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="">
                    <div className="min-w-max">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-300 ">
            {loading ||
              (adminUsers.loading && (
                <>
                  {table?.getHeaderGroups().map((headerGroup, i) => {
                    return Array(9)
                      .fill("")
                      .map((_, j) => (
                        <tr
                          key={j}
                          className={`border-0 border-b-[1px]
                  ${i == 0 ? "border-t-[1px]" : ""}
                `}
                        >
                          {headerGroup?.headers.map((_, j) => (
                            <td key={j} className="py-4 px-2 ">
                              {j === headerGroup.headers.length - 1 ? (
                                <button
                                  disabled
                                  className="p-1 border rounded-md border-gray-200 max-w-fit"
                                >
                                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                                </button>
                              ) : (
                                <div className="flex">
                                  {j === 0 && (
                                    <div className="pr-2">
                                      <AvatarInitial text={""} index={j} />
                                    </div>
                                  )}
                                  <div
                                    className={`${
                                      j === 0 ? "w-24" : "w-[60%]"
                                    } mt-3 `}
                                  >
                                    <PlaceHolderLine />
                                  </div>
                                </div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ));
                  })}
                </>
              ))}
            {!!data &&
              table?.getRowModel().rows.map((row) => (
                <tr key={row.id} className="">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 ">
                      <div className="min-w-max whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
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
