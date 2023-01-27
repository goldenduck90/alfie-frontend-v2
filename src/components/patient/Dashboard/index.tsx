import React from "react";
import { DashboardAppointments } from "./Appointments";
import { BeforeAndAfter } from "./BeforeAndAfter";
import { BodyMassIndex } from "./BodyMassIndex";
import { Chart } from "./Chart";
import { DashboardTaskList } from "./DashboardTaskList";
import { YourWeight } from "./YourWeight";

export function PatientDashboard() {
  return (
    <div className="flex flex-col">
      <div className="md:flex md:gap-x-4  ">
        <Chart />
        <YourWeight isLoading={true} />
      </div>
      <div className="md:flex  md:gap-x-4 ">
        <DashboardTaskList />
        <DashboardAppointments />
      </div>
      <div className="md:flex md:pb">
        <BodyMassIndex />
        <BeforeAndAfter isLoading={true} />
      </div>
    </div>
  );
}
