import React, { useEffect } from "react";
import { Layout } from "@src/components/layouts/Layout";
import { useRouter } from "next/router";
import { SettingsView } from "@src/components/settings/SettingsView";

function PlanAndBilling() {
  return <SettingsView />;
}

PlanAndBilling.isAuthorized = true;
PlanAndBilling.getLayout = (page: React.ReactNode) => (
  <Layout title="Settings">{page}</Layout>
);

export default PlanAndBilling;
