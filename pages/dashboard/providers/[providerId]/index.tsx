import { gql, useQuery } from "@apollo/client";
import { Layout } from "@src/components/layouts/Layout";
import { IndividualProviderTabs } from "@src/components/admin/providers/tabs";
import { useRouter } from "next/router";

export const getProviderInfo = gql`
  query GetProviderInfo($providerId: String!) {
    provider(id: $providerId) {
      _id
      type
      akuteId
      eaProviderId
      npi
      licensedStates
      firstName
      lastName
      email
      numberOfPatients
    }
  }
`;

function Providers() {
  const router = useRouter();
  const providerId = router.query?.providerId as string;
  const { data, refetch } = useQuery(getProviderInfo, {
    variables: {
      providerId,
    },
    nextFetchPolicy: "network-only",
  });

  const retry = () => refetch();

  return (
    <Layout
      hasBackButton
      backRef="/dashboard/providers"
      title={
        data?.provider?.firstName + " " + data?.provider?.lastName ||
        "Provider"
      }
    >
      <IndividualProviderTabs provider={data?.provider} refetch={retry} />
    </Layout>
  );
}

Providers.isAuthRequired = true;

export default Providers;
