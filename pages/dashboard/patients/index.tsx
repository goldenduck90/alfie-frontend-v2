import { gql, useLazyQuery, useQuery } from "@apollo/client";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PaperClipIcon,
} from "@heroicons/react/solid";
import * as Sentry from "@sentry/react";
import { UnControlledTextInput } from "@src/components/inputs/UnControlledTextInput";
import { SkeletonLoader } from "@src/components/old/loading/PatientSkeletonLoader";
import {
  Patient,
  PatientWeights,
} from "@src/components/practitioner/dashboard/Table";
import { SlideOver } from "@src/components/old/SlideOver";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Layout } from "@src/components/layouts/Layout";
import { PatientTasks } from "@src/components/practitioner/patients/PatientTasks";
import { AllPatientsTabs } from "@src/components/patient/tabs";

const getAllProviderPatientsQuery = gql`
  query getAllPatientsByProvider {
    getAllPatientsByPractitioner {
      _id
      name
      gender
      phone
      email
      dateOfBirth
      heightInInches
      meetingRoomUrl
      address {
        line1
        line2
        city
        state
        postalCode
      }
      weights {
        date
        value
      }
    }
  }
`;
const getTasksQuery = gql`
  query getTasksByPatient($userId: String!) {
    getAllUserTasksByUser(userId: $userId) {
      _id
      task {
        name
      }
      dueAt
      completed
      answers {
        key
        value
      }
      pastDue
      lastNotifiedUserAt
      createdAt
      completedAt
    }
  }
`;
function Patients() {
  const patients = useQuery(getAllProviderPatientsQuery);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [taskView, setTaskViewOpen] = useState<boolean>(false);
  const [showPatientDetails, setShowPatientDetails] = useState<boolean>(false);
  const [showPatientTasks, setShowPatientTasks] = useState<boolean>(false);
  const [showPatientMedical, setShowPatientMedical] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient>(
    null || patients.data?.getAllPatientsByPractitioner[0]
  );
  const [patientFilterValue, setPatientFilterValue] = useState<string>("");

  useEffect(() => {
    if (selectedPatient?._id) {
      const allPatients = patients.data?.getAllPatientsByPractitioner.find(
        (patient: Patient) => patient._id === String(selectedPatient?._id)
      );
      setSelectedPatient(allPatients);
    } else {
      // Just set the first patient in the list to the selected patient
      setSelectedPatient(patients.data?.getAllPatientsByPractitioner[0]);
    }
  }, [selectedPatient?._id, patients.data?.getAllPatientsByPractitioner]);

  // use lazy query to make the call in a useEffect
  const [getTasks, { data, loading }] = useLazyQuery(getTasksQuery);
  useEffect(() => {
    if (selectedPatient?._id) {
      getTasks({ variables: { userId: String(selectedPatient?._id) } });
    }
  }, [selectedPatient?._id, getTasks]);

  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (patients.error) {
      Sentry.captureException(new Error(patients.error.message), {
        tags: {
          query: "getAllPatientsByProvider",
          component: "Patients",
        },
      });
    }
  }, [patients]);

  // filters by first and last name ignoring spaces
  const filterPatients = patients.data?.getAllPatientsByPractitioner?.filter(
    (patient: Patient) => {
      // Sorry about the split here and in the build directory
      // db needs to separate first and last name
      const name = patient?.name.split(" ");
      const firstName = name[0];
      const lastName = name[1];

      return !patientFilterValue
        ? true
        : (firstName?.toLowerCase() + lastName?.toLowerCase()).includes(
            patientFilterValue?.toLowerCase().replace(/\s/g, "")
          );
    }
  );
  // memoize the filtered patients so we don't have to filter on every render
  const filteredPatients = useMemo(() => filterPatients, [filterPatients]);

  type Directory = {
    [key: string]: { id: string; name: string }[];
  };
  const buildDirectory = (): Directory => {
    const directory: any = [];

    filteredPatients?.forEach((patient: Patient) => {
      // capitalize first letter of name
      const name = patient.name.split(" ");
      const firstLetter: string = name[0][0].toUpperCase();
      const patientObj = {
        id: patient._id,
        name: patient.name,
      };

      if (directory[firstLetter]) {
        directory[firstLetter].push(patientObj);
      } else {
        directory[firstLetter] = [patientObj];
      }
    });
    // put directory in alphabetical order
    const sortedDirectory = Object.keys(directory)
      .sort()
      .reduce((obj: any, key: any) => {
        obj[key] = directory[key];
        return obj;
      }, {});
    return sortedDirectory;
  };

  const directory = buildDirectory();

  const selectedPatientWeight = selectedPatient?.weights.map(
    (weight: PatientWeights) => {
      const today = new Date();
      const weightDate = new Date(weight.date);
      if (today > weightDate) {
        return weight;
      } else {
        return null;
      }
    }
  ) as PatientWeights[];
  function selectATask(task: any) {
    setTaskViewOpen(true);
    setSelectedTask(task);
  }
  const medicalQuestionnaire = data?.getAllUserTasksByUser.find(
    (task: any) => task.task.name === "Medical Questionnaire"
  );
  const medicalQuestionnaireAnswers = medicalQuestionnaire?.answers;
  function questionnaireNames(name: string) {
    switch (name) {
      case "weightLossAttemptTime":
        return "Weight Loss Attempt";
      case "weightManagementMethods":
        return "Weight Management Methods";
      case "conditions":
        return "Conditions";
      case "medications":
        return "Medications";
      case "previousConditions":
        return "Previous Conditions";
      case "hasSurgicalHistory":
        return "Surgical History";
      case "usePillPack":
        return "Pill Pack";
      case "hasRequiredLabs":
        return "Has Labs";
      case "pharmacyLocation":
        return "Pharmacy Location";
      case "labCorpLocation":
        return "LabCorp Location";
      default:
        return name;
    }
  }
  const answers = medicalQuestionnaireAnswers?.map((answer: any) => {
    return {
      key: questionnaireNames(answer.key),
      value: answer.value,
    };
  });
  const allTasks = data?.getAllUserTasksByUser;
  const waistTasks = allTasks?.filter(
    (task: any) => task.task.name === "Waist Measurement" && task.task.completed
  );
  const weightTasks = allTasks?.filter(
    (task: any) => task.task.name === "Enter your Weight" && task.task.completed
  );
  const stepTasks = allTasks?.filter(
    (task: any) =>
      task.task.name === "Metabolic Profile: Activity" && task.task.completed
  );
  const bloodPressureTask = allTasks?.filter(
    (task: any) =>
      task.task.name === "Log your Blood Pressure" && task.task.completed
  );
  const weightData = weightTasks?.map((task: any) => {
    return {
      date: new Date(task.completedAt).toLocaleDateString(),
      value: task?.answers[0]?.value,
    };
  });
  const waistData = waistTasks?.map((task: any) => {
    return {
      date: new Date(task.completedAt).toLocaleDateString(),
      value: task?.answers[0]?.value,
    };
  });
  const stepData = stepTasks?.map((task: any) => {
    return {
      date: new Date(task.completedAt).toLocaleDateString(),
      value: task?.answers[0]?.value,
    };
  });
  const bloodPressureData = bloodPressureTask?.map((task: any) => {
    return {
      date: new Date(task.completedAt).toLocaleDateString(),
      value: task?.answers[0]?.value,
    };
  });
  return <AllPatientsTabs />;
}

Patients.isAuthRequired = true;
Patients.getLayout = (page: React.ReactNode) => (
  <Layout title="My Patients">{page}</Layout>
);

export default Patients;
