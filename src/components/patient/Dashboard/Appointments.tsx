import { DashboardCard } from "@src/components/ui/DashboardCard";
import { DashboardPreviewItem } from "@src/components/ui/DashboardPreviewItem";
import Link from "next/link";
import React from "react";

export function DashboardAppointments({ isLoading }: any) {
  const tasks = Array(2).fill(" ");
  const renderItems = tasks.map((item, i) => (
    <DashboardPreviewItem key={i} {...(item as any)} isLoading={isLoading} />
  ));
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
      >
        {renderItems}
      </DashboardCard>
    </>
  );
}
