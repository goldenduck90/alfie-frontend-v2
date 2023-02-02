import React from "react";
import { Layout } from "@src/components/layouts/Layout";

function PlanAndBilling() {
  return <div></div>;
}

PlanAndBilling.isAuthorized = true;
PlanAndBilling.getLayout = (page: React.ReactNode) => (
  <Layout title="Settings">{page}</Layout>
);

export default PlanAndBilling;
