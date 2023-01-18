import { ApplicationLayout } from "@src/components/layouts/ApplicationLayout";
import React from "react";

function Dashboard() {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}

Dashboard.getLayout = (page: React.ReactNode) => (
  <ApplicationLayout title="Home">{page}</ApplicationLayout>
);

Dashboard.isAuthRequired = true;
export default Dashboard;
