// import { useQuery, gql } from "@apollo/client";
import { Layout } from "@src/components/layouts/Layout";
import { IndividualProviderTabs } from "@src/components/admin/providers/tabs";
// import { useRouter } from "next/router";
// const getProviderInfo = gql`
//   query getProviderById($userId: String!) {
//     getUserById(userId: $userId) {
//       _id
//       type
//       akuteId
//       eaProviderId
//       npi
//       licensedStates
//       firstName
//       lastName
//       email
//       numberOfPatients
//     }
//   }
// `;
function Providers() {
  // const router = useRouter();
  // const providerId = router.query?.providerId as string;
  // const { data } = useQuery(getProviderInfo, {
  //   variables: {
  //     userId: providerId,
  //   },
  // });

  const data = {
    getUserById: {
      _id: "65090d82d333855bec868b5d",
      akuteId: "65090331380cff0008c67355",
      eaProviderId: 3,
      email: "testprovider@gallionetech.com",
      firstName: "Test",
      lastName: "Provider",
      licensedStates: ["FL", "MD", "VA", "DC"],
      npi: "5123451234",
      numberOfPatients: 10,
      type: "Practitioner",
    },
  };
  return (
    <Layout
      hasBackButton
      backRef="/dashboard/providers"
      title={
        data?.getUserById?.firstName + " " + data?.getUserById?.lastName ||
        "Provider"
      }
    >
      <IndividualProviderTabs />
    </Layout>
  );
}

Providers.isAuthRequired = true;

export default Providers;
