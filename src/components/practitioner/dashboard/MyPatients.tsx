import React from "react";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import dayjs from "dayjs";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import Link from "next/link";
import { AllPatientsTable } from "../patients/tabs/AllPatients";

export function MyPatients() {
  return (
    <DashboardCard
      className="w-full md:max-w-full md:min-w-max py-4"
      cardHeader={
        <div className="flex justify-between mb-6">
          <h3 className="font-bold">My Patients</h3>{" "}
          <Link href="/dashboard/patients">
            <p className="font-semibold hover:underline">View all</p>
          </Link>
        </div>
      }
    >
      <div className="max-h-96 md:max-h-128 overflow-y-auto">
        <AllPatientsTable globalFilter={""} setGlobalFilter={() => undefined} />
      </div>
    </DashboardCard>
  );
}
