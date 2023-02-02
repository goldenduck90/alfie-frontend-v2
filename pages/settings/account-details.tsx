import React from "react";
import { Layout } from "@src/components/layouts/Layout";

function AccountDetails() {
  return <div></div>;
}

AccountDetails.isAuthorized = true;
AccountDetails.getLayout = (page: React.ReactNode) => (
  <Layout title="Settings">{page}</Layout>
);

export default AccountDetails;
