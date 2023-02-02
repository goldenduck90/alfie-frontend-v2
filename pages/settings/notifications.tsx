import React from "react";
import { Layout } from "@src/components/layouts/Layout";

function Notifications() {
  return <div></div>;
}

Notifications.isAuthorized = true;
Notifications.getLayout = (page: React.ReactNode) => (
  <Layout title="Settings">{page}</Layout>
);

export default Notifications;
