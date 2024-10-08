/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import * as Tabs from "@radix-ui/react-tabs";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";
import { gql, useQuery, useMutation } from "@apollo/client";
import { CalendarIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { ChooseTaskIcon } from "@src/components/ChooseTaskIcon";
import { Button } from "@src/components/ui/Button";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";
import { TaskType, User, Alert, SeverityType } from "@src/graphql/generated";
import { GeneralInformation } from "../components/GeneralInformation";
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
import { nameToInitials } from "@src/utils/nameToInitials";
import { timeSince } from "@src/utils/dateTime";

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
      provider {
        _id
        firstName
        lastName
      }
      dateOfBirth
      address {
        line1
        line2
        city
        state
        postalCode
        country
      }
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
      signupPartner {
        title
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
  "Alerts",
];

export function IndividualPatientTabs() {
  const router = useRouter();
  const patientId = router.query.patientId as string;
  const activeTab = (router?.query?.tab as string) || TabList[0];

  const { data, loading, refetch } = useQuery(GetUserById, {
    variables: {
      userId: patientId,
    },
    nextFetchPolicy: "network-only",
  });

  const taskData = useQuery(getTasksQuery, {
    variables: {
      userId: patientId,
    },
  });

  const patient: User = data?.getUserById;

  const chartInformation: {
    [key in TaskType]: {
      value: any;
      date: number;
      systolic?: any;
      diastolic?: any;
      heartRate?: any;
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
        heartRate: item?.answers[2]?.value,
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
          <GeneralInformation
            patient={patient}
            patientLoading={loading}
            refetchPatient={refetch}
          />

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
        <Tabs.Content value={TabList[4]}>
          <PatientAlerts />
        </Tabs.Content>
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
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
      <div className="flex gap-3 items-center">
        <AvatarInitial size="xl" index={0} text={nameToInitials(user?.name)} />
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

const getAlertsByPatient = gql`
  query getAlertsByPatient($patientId: String!) {
    getAlertsByPatient(patientId: $patientId) {
      _id
      title
      description
      severity
      medical
      acknowledgedAt
      notifiedAt
      createdAt
      user {
        _id
        name
        email
      }
      task {
        _id
        type
      }
    }
  }
`;

const acknowledgeAlertMutation = gql`
  mutation acknowledgeAlert($input: AcknowledgeAlertInput!) {
    acknowledgeAlert(input: $input) {
      _id
      acknowledgedAt
    }
  }
`;

const SEVERITY_ORDER = [
  SeverityType.Low,
  SeverityType.Medium,
  SeverityType.High,
  SeverityType.Extreme,
];
const ALERT_TABS = ["Medical", "Administrative"];

function PatientAlerts() {
  const router = useRouter();
  const patientId = router.query.patientId as string;
  const { data, loading, error } = useQuery(getAlertsByPatient, {
    variables: { patientId },
  });
  const [activeTab, setActiveTab] = useState(ALERT_TABS[0]);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [medicalAlerts, setMedicalAlerts] = useState<Alert[]>([]);
  const [administrativeAlerts, setAdministrativeAlerts] = useState<Alert[]>([]);

  const [acknowledgeAlert] = useMutation(acknowledgeAlertMutation);

  const handleAcknowledgeClick = async (alert: Alert) => {
    const { data } = await acknowledgeAlert({
      variables: { input: { id: alert._id } },
    });

    const { _id, acknowledgedAt } = data.acknowledgeAlert;
    setAlerts([
      ...alerts.map((alert) =>
        alert._id === _id ? { ...alert, acknowledgedAt } : alert
      ),
    ]);
  };

  useEffect(() => {
    if (loading) return;

    if (error) {
      setAlerts([]);
    } else {
      setAlerts(data.getAlertsByPatient);
    }
  }, [data, loading, error]);

  useEffect(() => {
    const sorted = [...alerts].sort(
      (a, b) =>
        SEVERITY_ORDER.indexOf(b.severity) - SEVERITY_ORDER.indexOf(a.severity)
    );

    const outstanding = sorted.filter((alert) => !alert.acknowledgedAt);
    const acknowledged = sorted.filter((alert) => alert.acknowledgedAt);

    setMedicalAlerts(
      [...outstanding, ...acknowledged].filter((alert) => alert.medical)
    );
    setAdministrativeAlerts(
      [...outstanding, ...acknowledged].filter((alert) => !alert.medical)
    );
  }, [alerts]);

  return (
    <div className="mt-6 flex flex-col gap-y-3 w-full">
      <Tabs.Root
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
      >
        <div className="flex items-center justify-between overflow-x-auto">
          <Tabs.List className="flex  gap-x-3">
            {ALERT_TABS.map((tab, i) => (
              <TabTitle value={tab} key={i} active={activeTab === tab}>
                {tab}
              </TabTitle>
            ))}
          </Tabs.List>
        </div>
        <Tabs.Content value={ALERT_TABS[0]} className="mt-6">
          {medicalAlerts.map((alert) => (
            <AlertItem
              key={alert._id}
              alert={alert}
              onAcknowledgeAlert={handleAcknowledgeClick}
            />
          ))}
        </Tabs.Content>
        <Tabs.Content value={ALERT_TABS[1]} className="mt-6">
          {administrativeAlerts.map((alert) => (
            <AlertItem
              key={alert._id}
              alert={alert}
              onAcknowledgeAlert={handleAcknowledgeClick}
            />
          ))}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

const SeverityBadge = ({ severity }: { severity: SeverityType }) => {
  const bgColor = useMemo(() => {
    switch (severity) {
      case SeverityType.Extreme:
      case SeverityType.High:
        return "bg-red-500";
      case SeverityType.Medium:
        return "bg-yellow-500";
      default:
        return "";
    }
  }, [severity]);

  if (severity === SeverityType.Low) return null;

  return (
    <span
      className={`${bgColor} text-white text-xs font-medium mx-2 px-2.5 py-0.5 rounded-full`}
    >
      Severity: {severity}
    </span>
  );
};

function AlertItem({
  alert,
  onAcknowledgeAlert,
}: {
  alert: Alert;
  onAcknowledgeAlert: (alert: Alert) => Promise<void>;
}) {
  const router = useRouter();
  const { patientId } = router.query;

  return (
    <div className="items-center justify-between border rounded-md border-gray-300 p-6 shadow bg-white grid grid-cols-6 md:grid-cols-12 w-full gap-y-3 mb-2">
      <div className="col-span-6 flex items-center gap-x-2">
        <div className="flex items-center">
          <ChooseTaskIcon value={alert.task.type} />
        </div>
        <div className="col-span-5 justify-center">
          <p className="font-bold text">
            {alert.title}
            <SeverityBadge severity={alert.severity} />
          </p>
          <p className="text-gray-500 text-sm">{alert.description}</p>
        </div>
      </div>
      <div className="col-span-6 md:col-span-3 flex items-start justify-start gap-x-2">
        <CalendarIcon className="w-5 h-5" />
        <p className="text-sm text-gray-500">
          {timeSince(new Date(alert.createdAt))} ago
        </p>
      </div>
      <div className="col-span-6 md:col-span-3 flex  md:items-center gap-x-2 min-w-[230px] justify-start md:justify-end">
        {alert.acknowledgedAt ? (
          <div>
            <div className="flex gap-x-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-600">Acknowledged</p>
            </div>
            <p className="text-sm">
              {new Date(alert.acknowledgedAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <React.Fragment>
            <Button
              buttonType="secondary"
              onClick={() => onAcknowledgeAlert(alert)}
            >
              Acknowledge
            </Button>
            <Button
              onClick={() => {
                router.push(`/dashboard/patients/${patientId}?tab=Chat`);
              }}
            >
              Contact
            </Button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
