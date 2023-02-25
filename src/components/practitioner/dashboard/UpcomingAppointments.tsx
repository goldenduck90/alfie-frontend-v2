import { DashboardCard } from "@src/components/ui/DashboardCard";
import React from "react";
import Link from "next/link";
import { useGetAllPatientsByProvider } from "@src/hooks/useGetAllPatientsByProvider";
import { Patient } from "./Table";
import { DashboardPreviewItem } from "@src/components/ui/DashboardPreviewItem";
import { useRouter } from "next/router";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";

export function UpcomingAppointments() {
  const router = useRouter();
  const patients = useGetAllPatientsByProvider();
  const appointments: Patient[] =
    patients?.data?.getAllPatientsByPractitioner?.filter(
      (patient: Patient) => patient.meetingUrl !== null
    );

  const renderAppointments = appointments?.map((appointment, i) => (
    <DashboardPreviewItem
      key={i}
      renderDate={{ date: "today", time: "8:30 am - 9:00 am" }}
      title={appointment.name}
      subtitle={appointment.email}
      renderIcon={
        <div className="pr-4">
          <AvatarInitial size="lg" index={i} text={appointment.name[0]} />
        </div>
      }
      onClick={() =>
        router.push(
          `/dashboard/appointments/${appointment._id}` || "/dashboard"
        )
      }
    />
  ));

  const renderLoadItems = [0, 1, 2].map((place, i) => (
    <DashboardPreviewItem {...(place as any)} isLoading key={i} />
  ));

  return (
    <DashboardCard
      className="w-full md:max-w-[75%] py-4"
      cardHeader={
        <div className="flex justify-between pb-7">
          <h3 className="font-bold">Upcoming Appointments</h3>{" "}
          <Link href="/dashboard/appointments">
            <p className="font-semibold hover:underline">View all</p>
          </Link>
        </div>
      }
    >
      <div className="w-full max-h-96 overflow-auto">
        {renderAppointments}
        {renderAppointments}
        {patients.loading && renderLoadItems}
      </div>
    </DashboardCard>
  );
}
