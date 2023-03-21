import React, { useEffect } from "react";
import { Layout } from "@src/components/layouts/Layout";
import { useRouter } from "next/router";
import { SettingsView } from "@src/components/settings/SettingsView";

function Page() {
  return <SettingsView />;
}

Page.isAuthRequired = true;
Page.getLayout = (page: React.ReactNode) => (
  <Layout title="Settings">{page}</Layout>
);

export default Page;
