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

function Patients() {
  return <AllPatientsTabs />;
}

Patients.isAuthRequired = true;
Patients.getLayout = (page: React.ReactNode) => (
  <Layout title="My Patients">{page}</Layout>
);

export default Patients;
