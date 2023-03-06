import { DashboardCard } from "@src/components/ui/DashboardCard";
import React from "react";
import Link from "next/link";
import { useGetAllPatientsByProvider } from "@src/hooks/useGetAllPatientsByProvider";
import { Patient } from "./Table";
import { AbnormalPatientPreviewItem } from "./components/AbnormalPatientPreviewItem";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";

export function PatientAbnormalities() {
  const { data, loading } = useGetAllPatientsByProvider();
  const patients: Patient[] = data?.getAllPatientsByPractitioner?.filter(
    (patient: Patient) => patient.meetingUrl !== null
  );

  const renderPatient = patients?.map((patient, i) => (
    <AbnormalPatientPreviewItem
      key={i}
      abnormality="Blood Pressure"
      icon={
        <div className="pr-4">
          <AvatarInitial size="lg" index={i} text={patient.name[0]} />
        </div>
      }
      name={patient.name}
      providerTitle={patient.email}
      patientId={patient._id}
    />
  ));

  const renderLoadItems = [0, 1].map((_, i) => (
    <AbnormalPatientPreviewItem isLoading key={i} />
  ));

  return (
    <DashboardCard
      className="w-full md:min-w-[370px] md:max-w-[400px] py-4"
      cardHeader={
        <div className="flex justify-between pb-7">
          <h3 className="font-bold">Patients with Abnormalities</h3>{" "}
          <Link href="/dashboard/patients?tab=issues">
            <p className="font-semibold hover:underline">View all</p>
          </Link>
        </div>
      }
    >
      <div className="flex flex-col w-full gap-y-4">
        {renderPatient}
        {loading && renderLoadItems}
      </div>
    </DashboardCard>
  );
}
