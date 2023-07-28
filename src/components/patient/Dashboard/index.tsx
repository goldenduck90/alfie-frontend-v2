import { gql, useQuery } from "@apollo/client";
import React from "react";
import { DashboardAppointments } from "./Appointments";
// import { BeforeAndAfter } from "./BeforeAndAfter";
// import { BodyMassIndex } from "./BodyMassIndex";
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
      weightGoal
    }
  }
`;

export function PatientDashboard() {
  const { data } = useQuery(getWeight);
  console.log({ data });
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
      {/* <div className="md:flex md:pb">
        <BodyMassIndex />
        <BeforeAndAfter />
      </div> */}
    </div>
  );
}
