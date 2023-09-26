import { gql, useQuery } from "@apollo/client";
import React from "react";
import { DashboardAppointments } from "./Appointments";
import { Chart } from "./Chart";
import { DashboardTaskList } from "./DashboardTaskList";
import { YourWeight } from "./YourWeight";

const getWeight = gql`
  query Me {
    me {
      weights {
        value
        date
      }
    }
  }
`;

export function PatientDashboard() {
  const { data } = useQuery(getWeight);
  return (
    <div className="flex flex-col">
      <div className="md:flex md:gap-x-4  ">
        <Chart user={data?.me} />
        <YourWeight user={data?.me} />
      </div>
      <div className="md:flex  md:gap-x-4 ">
        <DashboardTaskList />
        <DashboardAppointments />
      </div>
    </div>
  );
}
