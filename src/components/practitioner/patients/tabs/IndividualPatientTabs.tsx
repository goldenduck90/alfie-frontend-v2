import * as Tabs from "@radix-ui/react-tabs";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";

import React, { useMemo } from "react";
import { BasicChart } from "./BasicChart";
import { MetabolicChart } from "./MetabolicChart";
import { PatientTasks } from "./components/PatientTasks";
import { CalendarIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useGetAllPatientsByProvider } from "@src/hooks/useGetAllPatientsByProvider";
import { TaskType, User } from "@src/graphql/generated";
import { ChooseTaskIcon } from "@src/components/ChooseTaskIcon";
import { Button } from "@src/components/ui/Button";
import { CheckCircleIcon } from "@heroicons/react/solid";

const TabList = [
  "Information",
  "Tasks",
  "Medical Questionnaire",
  "Chat",
  "Alerts",
];

export function IndividualPatientTabs({ user }: { user: any }) {
  const router = useRouter();
  const activeTab = (router?.query?.tab as string) || TabList[0];

  const { data } = useGetAllPatientsByProvider();
  //TODO: Need to change this to accurate information
  const patientOne = data?.getAllPatientsByPractitioner?.[0];
  console.log({ patientOne });
  const patientNumeroUno = {
    "Full Name": patientOne?.name,
    "Date of Birth": dayjs(patientOne?.dateOfBirth).format("MM/DD/YYYY"),
    "Email Address": patientOne?.email,
    "Phone Number": patientOne?.phone,
    Address: "1234 Main St, New York, NY 10001",
    "Height In Inches": "70",
    Weight: "190",
    Attachments: "No attachments",
  };

  return (
    <div className="flex flex-col overflow-y-auto min-h-[73vh] w-full bg-white md:bg-gray-50 shadow-md rounded-md px-4 md:px-8 py-4">
      <Tabs.Root
        value={activeTab}
        onValueChange={(value) => {
          router.replace(
            `/dashboard/patients/${router.query.patientId}?tab=${value}`,
            undefined,
            { shallow: true }
          );
        }}
      >
        <div className="flex items-center justify-between overflow-x-auto">
          <Tabs.List className="flex  gap-x-3">
            {TabList.map((tab, i) => (
              <TabTitle value={tab} key={i} active={activeTab === tab}>
                {tab}
              </TabTitle>
            ))}
          </Tabs.List>
        </div>
        <Tabs.Content value={TabList[0]} className="mt-6">
          <TableInformationHeader user={patientOne} />
          <TableUserObject user={patientNumeroUno} />
          <div className="w-full mt-6">
            <p className="mb-6 text-xl font-bold">Metabolic Profile</p>
            <MetabolicChart />
          </div>
          <div className="flex items-center justify-between">
            <p className="my-6 text-xl font-bold">Other Details</p>
            <div className="flex justify-end items-center gap-x-2 text-sm border rounded-md py-2 px-4 border-gray-300 text-gray-600 bg-white">
              <span>
                <CalendarIcon className="w-4 h-4 stroke-gray-600" />
              </span>
              <p>{`${dayjs().format("MM/DD/YYYY")}-${dayjs()
                .add(3, "months")
                .format("MM/DD/YYYY")}`}</p>
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-4">
            <BasicChart title="Weight" lineColor="#0C52E8" />
            <BasicChart title="Waist" lineColor="#8B5CF6" />
            <BasicChart title="Steps" lineColor="#22C55E" />
            <BasicChart title="Blood Pressure" lineColor="#F43F5E" />
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
        <Tabs.Content value={TabList[3]}>
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-2xl font-bold">Chat</p>
            <p className="text-gray-500">Coming Soon</p>
          </div>
        </Tabs.Content>
        <Tabs.Content value={TabList[4]}>
          <AlertsPlaceholder />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function TableInformationHeader({ user }: { user: User }) {
  const initials = useMemo(() => {
    if (!user?.name) return "";
    const splitName = user?.name?.split(" ");
    const firstInitial = splitName?.[0].charAt(0);
    const lastInitial = splitName[splitName.length - 1].charAt(0);
    return `${firstInitial || ""}${lastInitial || ""}`;
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
      <div className="flex gap-3 items-center">
        <AvatarInitial size="xl" index={0} text={initials} />
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
      <div className="min-w-full mt-6 border border-gray-200 rounded-md divide-y divide-y-gray-300 bg-white">
        {Object.keys(user).map((key) => {
          if (typeof user[key] !== "string") {
            return null;
          }
          return (
            <div
              key={key}
              className="flex flex-col md:flex-row gap-x-4 px-6 py-4"
            >
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
  value,
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
  value: string;
}) {
  return (
    <Tabs.Trigger
      value={value}
      className={`p-3 border border-transparent rounded-md hover:bg-gray-100 min-w-fit ${
        active ? "text-brand-berry bg-blue-100 hover:bg-blue-100" : ""
      }`}
    >
      {children}
    </Tabs.Trigger>
  );
}

function AlertsPlaceholder() {
  return (
    <div className="mt-6 flex flex-col gap-y-3">
      <AlertItem />
      <AlertItem isAcknowledged />
      <AlertItem />
      <AlertItem />
    </div>
  );
}

function AlertItem({ isAcknowledged }: { isAcknowledged?: boolean }) {
  return (
    <div className="flex items-center justify-between border rounded-md border-gray-300 p-6 shadow">
      <div className="flex items-center gap-x-2">
        <div className="flex items-center">
          <ChooseTaskIcon value={TaskType.BpLog} />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bold text">Patients note</p>
          <p className="text-gray-500 text-sm">
            The patient experienced a drastic drop in blood pressure.
          </p>
        </div>
      </div>
      <div className="flex items-start justify-start gap-x-2">
        <CalendarIcon className="w-5 h-5" />
        <p className="text-sm text-gray-500">3 hours ago</p>
      </div>
      <div className="flex items-center gap-x-2 min-w-[230px] justify-end">
        {isAcknowledged ? (
          <div className="flex gap-x-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-600">Acknowledged</p>
          </div>
        ) : (
          <React.Fragment>
            <Button buttonType="secondary">Acknowledge</Button>
            <Button>Contact</Button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
