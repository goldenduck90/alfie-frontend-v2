import { ChevronRightIcon } from "@heroicons/react/outline";
import { Provider } from "@src/graphql/generated";
import * as Tabs from "@radix-ui/react-tabs";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { TextField } from "@src/components/ui/TextField";
import { SearchIcon } from "@heroicons/react/solid";
import {
  NumberOfPatientsCell,
  ProviderDefaultCell,
  ProviderNameCell,
  NPICell,
} from "@src/components/ui/table";
import { TabTitle } from "@src/components/ui/tabs/TabTitle";
// import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";
// import { AvatarInitial } from "@src/components/ui/AvatarInitial";
import { useRouter } from "next/router";
// import { useGetAllProvidersByAdmins } from "@src/hooks/useGetAllProviders";
// import { QueryResult, OperationVariables } from "@apollo/client";
import * as SelectPrimitive from "@radix-ui/react-select";

export function AllProviders() {
  const [globalFilter, setGlobalFilter] = useState("");

  const router = useRouter();
  const tab = (router?.query?.tab as string) || "all";
  const [activeTab, setActiveTab] = useState(tab || "all");

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="relative flex flex-col overflow-y-auto min-h-[73vh] w-full bg-white shadow-md rounded-xl px-4 pb-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-y-4 sticky top-0 p-4 -mx-4 bg-white rounded-xl">
        <Tabs.List className="flex gap-x-3">
          <Tabs.Trigger value="all">
            <TabTitle active={activeTab === "all"}>All Patients</TabTitle>
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
        <ProvidersTable
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export function ProvidersTable({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) {
  const providers = {
    data: {
      users: [
        {
          _id: "65090d82d333855bec868b5d",
          akuteId: "65090331380cff0008c67355",
          eaProviderId: 3,
          email: "testprovider@gallionetech.com",
          emailTokenExpiresAt: "2021-03-29T12:34:56.789Z",
          firstName: "Test",
          lastName: "Provider",
          licensedStates: ["FL", "MD", "VA", "DC"],
          npi: "5123451234",
          numberOfPatients: 10,
          type: "Practitioner",
        },
        {
          _id: "650903e1737b3d11b845826d",
          akuteId: "650903c3380cff0008c67356",
          eaProviderId: 100,
          email: "testdoctor@gallionetech.com",
          emailTokenExpiresAt: "2021-03-29T12:34:56.789Z",
          firstName: "Test",
          lastName: "Doctor",
          licensedStates: ["FL", "MD", "VA", "DC"],
          npi: "346234535",
          numberOfPatients: 8,
          type: "Doctor",
        },
      ],
    },
  };
  // const providers = useGetAllProvidersByAdmins();
  console.log("providers================", providers);

  const providersTable = useProviderTable({
    data: providers.data?.users || [],
    globalFilter,
    setGlobalFilter,
  });

  return <AllProvidersTable table={providersTable} />;
  // return <AllProvidersTable table={providersTable} query={providers} />;
}

export function AllProvidersTable({
  table,
}: // query,
{
  table: Table<Provider>;
  // query: QueryResult<any, OperationVariables>;
}) {
  const router = useRouter();

  // const { data, error, loading } = query;

  return (
    <div className="max-h-[50vh]">
      <p className="text-lg">{`${
        table?.getCoreRowModel().rows.length
      } Providers`}</p>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="divide-y divide-gray-300  table-fixed w-auto rounded-md overflow-hidden min-w-full">
          <thead>
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-50 cur">
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
            {/* {loading && (
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
            )} */}
            {
              // {!!data &&
              table?.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer focus:bg-gray-50 hover:bg-gray-50"
                  tabIndex={0}
                  onClick={() =>
                    router.push(`/dashboard/providers/${row.getValue("_id")}`)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      router.push(
                        `/dashboard/providers/${row.getValue("_id")}`
                      );
                    }
                  }}
                >
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
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

const columnHelper = createColumnHelper<Provider>();
function Header({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-2 text-left font-[500]">{children}</div>;
}

const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "fullName",
    header: () => <Header>Name</Header>,
    cell: (info) => <ProviderNameCell info={info} />,
  }),
  columnHelper.accessor("email", {
    header: () => <Header>Email address</Header>,
    cell: (info) => <ProviderDefaultCell info={info} />,
  }),
  columnHelper.accessor("npi", {
    header: () => <Header>NPI</Header>,
    cell: (info) => <NPICell info={info} />,
  }),
  columnHelper.accessor("numberOfPatients", {
    header: () => <Header>Number of Patients</Header>,
    cell: (info) => <NumberOfPatientsCell info={info} />,
  }),
  columnHelper.accessor("_id", {
    header: undefined,
    cell: (info) => (
      <div className="px-2">
        {/* <Link href={`/dashboard/patients/${info.getValue()}`}> */}
        <div className="p-1 border rounded-md border-gray-200 max-w-fit">
          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </div>
        {/* </Link> */}
      </div>
    ),
  }),
];

function useProviderTable({
  data,
  globalFilter,
  setGlobalFilter,
}: {
  data: Provider[];
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
