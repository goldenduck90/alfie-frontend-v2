import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import * as Tabs from "@radix-ui/react-tabs";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";
import { gql, useQuery } from "@apollo/client";
import { CalendarIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { ChooseTaskIcon } from "@src/components/ChooseTaskIcon";
import { Button } from "@src/components/ui/Button";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";
import { TaskType, User } from "@src/graphql/generated";
import { BloodPressureChart } from "../components/BloodPressureChart";
import { MedicalQuestionnaire } from "../components/MedicalQuestionnaire";
import { PatientTasks } from "../components/PatientTasks";
import { StepsChart } from "../components/StepsChart";
import { WaistChart } from "../components/WaistChart";
import { WeightChart } from "../components/WeightChart";
import { MetabolicChart } from "./MetabolicChart";

import { AdhocSchedule } from "../components/AdhocSchedule";
import { GenerateSummary } from "../components/GenerateSummary";
import { PatientChat } from "./PatientChat";

const GetUserById = gql`
  query GetUser($userId: String!) {
    getUserById(userId: $userId) {
      _id
      textOptIn
      meetingRoomUrl
      generatedSummary
      name
      email
      phone
      role
      dateOfBirth
      address {
        line1
        line2
        city
        state
        postalCode
        country
      }
      weightGoal
      weights {
        value
        date
      }
      gender
      heightInInches
      akutePatientId
      stripeCustomerId
      stripeSubscriptionId
      eaCustomerId
      eaHealthCoachId
      subscriptionExpiresAt
      pharmacyLocation
      meetingUrl
      labOrderSent
      bmi
      classifications {
        classification
        calculatedPercentile
        percentile
        date
      }
      files {
        key
        signedUrl
        contentType
        metadata {
          key
          value
        }
      }
    }
  }
`;

const getTasksQuery = gql`
  query GetAllUserTasksByUser($userId: String!) {
    getAllUserTasksByUser(userId: $userId) {
      _id
      task {
        _id
        name
        type
        daysTillDue
        interval
      }
      archived
      completed
      dueAt
      pastDue
      completedAt
      createdAt
      updatedAt
      providerEmail
      answers {
        key
        value
        type
      }
    }
  }
`;

const TabList = [
  "Information",
  "Tasks",
  "Medical Questionnaire",
  "Chat",
  // "Alerts",
];

export function IndividualPatientTabs() {
  const router = useRouter();
  const patientId = router.query.patientId as string;
  const activeTab = (router?.query?.tab as string) || TabList[0];

  const { data, loading, error } = useQuery(GetUserById, {
    variables: {
      userId: patientId,
    },
  });
  const taskData = useQuery(getTasksQuery, {
    variables: {
      userId: patientId,
    },
  });

  const patient: User = data?.getUserById;

  const patientImages =
    patient?.files?.filter(
      ({ signedUrl, contentType }) => signedUrl && contentType.includes("image")
    ) ?? [];

  const patientTable = {
    "Full Name": patient?.name,
    "Date of Birth": dayjs(patient?.dateOfBirth).format("MM/DD/YYYY"),
    "Email Address": patient?.email,
    "Phone Number": patient?.phone,
    "Address": `${patient?.address?.line1 || ""}, ${
      (patient?.address?.line2 && ",") || ""
    } ${patient?.address?.city}, ${patient?.address?.state}, ${
      patient?.address?.postalCode
    }`,
    "Height In Inches": patient?.heightInInches,
    "Weight": patient?.weights?.[patient.weights.length - 1]?.value,
    "Attachments":
      patientImages.length > 0 ? (
        <div
          style={{ display: "flex", gap: 10, overflowY: "auto", padding: 6 }}
        >
          {patientImages.map(({ signedUrl, key }) => (
            <Image
              src={signedUrl}
              alt={key}
              title={key}
              style={{ objectFit: "contain", maxHeight: 200 }}
            />
          ))}
        </div>
      ) : (
        "No Attachments"
      ),
    "Signup Partner": patient?.signupPartner?.title ?? "N/A",
  };

  const chartInformation: {
    [key in TaskType]: {
      value: any;
      date: number;
      systolic?: any;
      diastolic?: any;
    }[];
  } = {} as any;

  taskData?.data?.getAllUserTasksByUser?.forEach((item: any) => {
    if (!chartInformation[item?.task?.type as TaskType]) {
      chartInformation[item?.task?.type as TaskType] = [];
    }
    if (item?.task?.type === TaskType.BpLog && item.completed > 0) {
      chartInformation[item?.task?.type as TaskType].push({
        date: new Date(item.completedAt).getTime(),
        systolic: item?.answers[0]?.value,
        diastolic: item?.answers[1]?.value,
        value: item?.answers[0]?.value,
      });
    } else {
      if (item?.answers?.[0]?.value && item.completed > 0) {
        chartInformation[item?.task?.type as TaskType].push({
          date: new Date(item.completedAt).getTime(),
          value: item?.answers[0]?.value,
        });
      }
    }
  });

  const weightChartInfo = chartInformation[TaskType.WeightLog];

  const activeTasks = taskData?.data?.getAllUserTasksByUser?.filter(
    (item: any) => !item.completed && !item.archived
  ).length;

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
          <TableInformationHeader
            user={patient}
            loading={loading}
            activeTasks={activeTasks}
          />
          <TableUserObject user={patientTable} loading={loading} />

          {/*//? ADHOC SCHEDULING */}
          <AdhocSchedule patient={patient} />

          {/*//? OPEN AI SUMMARY GENERATION */}
          <GenerateSummary patient={patient} />
          <div className="w-full mt-6">
            <p className="mb-6 text-xl font-bold">Metabolic Profile</p>
            <MetabolicChart chartData={patient?.classifications ?? undefined} />
          </div>
          <div className="flex items-center justify-between">
            <p className="my-6 text-xl font-bold">Other Details</p>
            <div className="flex justify-end items-center gap-x-2 text-sm border rounded-md py-2 px-4 border-gray-300 text-gray-600 bg-white">
              <span>
                <CalendarIcon className="w-4 h-4 stroke-gray-600" />
              </span>
              <p>{`${dayjs(weightChartInfo?.[0]?.date).format(
                "MM/DD/YYYY"
              )}-${dayjs(
                weightChartInfo?.[weightChartInfo?.length - 1]?.date
              ).format("MM/DD/YYYY")}`}</p>
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-4">
            <WeightChart
              title="Weight"
              lineColor="#0C52E8"
              chartData={weightChartInfo}
            />
            <WaistChart
              title="Waist"
              lineColor="#8B5CF6"
              chartData={chartInformation[TaskType.WaistLog]}
            />
            <StepsChart
              title="Steps"
              lineColor="#22C55E"
              chartData={chartInformation[TaskType.MpActivity]}
            />
            <BloodPressureChart
              title="Blood Pressure"
              chartData={chartInformation[TaskType.BpLog]}
            />
          </div>
        </Tabs.Content>
        <Tabs.Content value={TabList[1]}>
          <PatientTasks taskData={taskData} />
        </Tabs.Content>
        <Tabs.Content value={TabList[2]}>
          <MedicalQuestionnaire taskData={taskData} />
        </Tabs.Content>
        <Tabs.Content value={TabList[3]}>
          <PatientChat />
        </Tabs.Content>
        {/* <Tabs.Content value={TabList[4]}>
          <AlertsPlaceholder />
        </Tabs.Content> */}
      </Tabs.Root>
    </div>
  );
}

function TableInformationHeader({
  user,
  loading,
  activeTasks,
}: {
  user: User;
  loading?: boolean;
  activeTasks: number;
}) {
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
        {loading ? (
          <div className="h-7 w-56 mt-2">
            <PlaceHolderLine hasTopMargin />
          </div>
        ) : (
          <p className="font-bold text-xl">{user?.name}</p>
        )}
      </div>
      <div className="flex gap-x-3 items-center">
        <p className="flex gap-x-2 items-center">
          Active Tasks
          <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-center flex items-center justify-center">
            {activeTasks}
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

export function TableUserObject({
  user,
  loading,
}: {
  user: any;
  loading?: boolean;
}) {
  if (!user) return null;
  return (
    <div className="">
      <div className="min-w-full mt-6 border border-gray-200 rounded-md divide-y divide-y-gray-300 bg-white">
        {Object.keys(user).map((key) => {
          if (!user[key] && !loading) {
            return null;
          }
          return (
            <div
              key={key}
              className="flex flex-col md:flex-row gap-x-4 px-6 py-4"
            >
              <p className="capitalize min-w-[275px] font-bold">{key}</p>
              {loading ? (
                <div className="w-1/4 h-6 flex items-center">
                  <PlaceHolderLine hasTopMargin />
                </div>
              ) : (
                <p className="text-gray-600">{user[key]}</p>
              )}
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

const alertsList = [
  {
    alertType: TaskType.BpLog,
    title: "Patients note",
    subtitle: "The patient experienced a drastic drop in blood pressure.",
  },
  {
    alertType: TaskType.NewPatientIntakeForm,
    title: "Abnormal pulse",
    subtitle: "The patient experienced a drastic increase in heart rate.",
    isAcknowledged: true,
  },
  {
    alertType: TaskType.WeightLog,
    title: "Abnormal weight loss",
    subtitle: "The patient experienced a drastic weight loss.",
  },
  {
    alertType: TaskType.IdAndInsuranceUpload,
    title: "Reported symptoms",
    subtitle: "The patient reported dizziness",
  },
];

function AlertsPlaceholder() {
  return (
    <div className="mt-6 flex flex-col gap-y-3 w-full">
      {alertsList.map((alert) => (
        <AlertItem key={alert.alertType} {...alert} />
      ))}
    </div>
  );
}

function AlertItem({
  isAcknowledged,
  alertType,
  title,
  subtitle,
}: {
  isAcknowledged?: boolean;
  alertType: TaskType;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="items-center justify-between border rounded-md border-gray-300 p-6 shadow bg-white grid grid-cols-6 md:grid-cols-12 w-full gap-y-3">
      <div className="col-span-6 flex items-center gap-x-2">
        <div className="flex items-center">
          <ChooseTaskIcon value={alertType} />
        </div>
        <div className="col-span-5 justify-center">
          <p className="font-bold text">{title}</p>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="col-span-6 md:col-span-3 flex items-start justify-start gap-x-2">
        <CalendarIcon className="w-5 h-5" />
        <p className="text-sm text-gray-500">3 hours ago</p>
      </div>
      <div className="col-span-6 md:col-span-3 flex  md:items-center gap-x-2 min-w-[230px] justify-start md:justify-end">
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
