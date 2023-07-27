import { Layout } from "../../../src/components/layouts/Layout";
import { CalendarView } from "../../../src/components/appointments/Calendar";
import React from "react";
import { WeightChart } from "@src/components/practitioner/patients/components/WeightChart";
import { WaistChart } from "@src/components/practitioner/patients/components/WaistChart";
import { StepsChart } from "@src/components/practitioner/patients/components/StepsChart";
import { BloodPressureChart } from "@src/components/practitioner/patients/components/BloodPressureChart";
import { useUserTaskInformation } from "@src/hooks/useUserTaskInformation";
import { TaskType } from "@src/graphql/generated";
import { MetabolicChart } from "@src/components/practitioner/patients/tabs/MetabolicChart";

const HealthMetrics = () => {
  const { chartInformation, classificationData } = useUserTaskInformation();

  return (
    <div>
      <div className="w-full mt-6">
        <p className="mb-6 text-xl font-bold text-white">Metabolic Profile</p>
        <MetabolicChart chartData={classificationData?.classifications ?? undefined} />
      </div>
      <div className="w-full grid md:grid-cols-2 gap-4">
        <WeightChart
          title="Weight"
          lineColor="#0C52E8"
          chartData={
            (chartInformation as { [key: string]: any })[TaskType.WeightLog]
          }
        />
        <WaistChart
          title="Waist"
          lineColor="#8B5CF6"
          chartData={
            (chartInformation as { [key: string]: any })[TaskType.WaistLog]
          }
        />
        <StepsChart
          title="Steps"
          lineColor="#22C55E"
          chartData={
            (chartInformation as { [key: string]: any })[TaskType.MpActivity]
          }
        />
        <BloodPressureChart
          title="Blood Pressure"
          chartData={
            (chartInformation as { [key: string]: any })[TaskType.BpLog]
          }
        />
      </div>
    </div>
  );
};

HealthMetrics.getLayout = (page: React.ReactNode) => (
  <Layout
    title="Health Metrics"
    subtitle="View your health metrics and track your progress."
  >
    {page}
  </Layout>
);
HealthMetrics.isAuthRequired = true;

export default HealthMetrics;
