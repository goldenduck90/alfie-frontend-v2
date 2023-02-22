import { DashboardCard } from "@src/components/ui/DashboardCard";
import React from "react";
import Link from "next/link";
import { useGetAllPatientsByProvider } from "@src/hooks/useGetAllPatientsByProvider";
import { Patient } from "./Table";
import { AppointmentPreviewItem } from "./components/AppointmentPreviewItem";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";

export function PatientAbnormalities() {
  const patients = useGetAllPatientsByProvider();
  const appointments: Patient[] =
    patients?.data?.getAllPatientsByPractitioner?.filter(
      (patient: Patient) => patient.meetingUrl !== null
    );

  const renderPatient = appointments?.map((appointment, i) => (
    <AppointmentPreviewItem
      key={i}
      abnormality="Blood Pressure"
      icon={
        <div className="pr-4">
          <AvatarInitial index={i} text={appointment.name[0]} />
        </div>
      }
      name={appointment.name}
      providerTitle={appointment.email}
    />
  ));

  const renderLoadItems = [0, 1].map((_, i) => (
    <AppointmentPreviewItem isLoading key={i} />
  ));

  return (
    <DashboardCard
      className="w-full md:min-w-[370px] md:max-w-[400px] py-4"
      cardHeader={
        <div className="flex justify-between pb-7">
          <h3 className="font-bold">Patients with Abnormalities</h3>{" "}
          <Link href="/dashboard/appointments">
            <p className="font-semibold hover:underline">View all</p>
          </Link>
        </div>
      }
    >
      <div className="flex flex-col w-full gap-y-4">
        {renderPatient}
        {patients.loading && renderLoadItems}
      </div>
    </DashboardCard>
  );
}
