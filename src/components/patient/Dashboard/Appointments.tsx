import { DashboardCard } from "@src/components/DashboardCard";
import Link from "next/link";
import React from "react";

export function DashboardAppointments() {
  const tasks = Array(2).fill(" ");
  return (
    <>
      <DashboardCard
        className="md:min-w-[49.3%]"
        cardHeader={
          <div className="flex justify-between">
            <h3 className="font-bold">Upcoming Appointments</h3>{" "}
            <Link href="/dashboard/appointments">
              <p className="font-semibold">View all</p>
            </Link>
          </div>
        }
        items={tasks}
      />
    </>
  );
}
