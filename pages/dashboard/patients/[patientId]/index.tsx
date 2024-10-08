import { useQuery, gql } from "@apollo/client";
import { Layout } from "@src/components/layouts/Layout";
import { IndividualPatientTabs } from "@src/components/practitioner/patients/tabs";
import { useRouter } from "next/router";
const getPatientInfo = gql`
  query getPatientById($userId: String!) {
    getUserById(userId: $userId) {
      _id
      textOptIn
      meetingRoomUrl
      name
      email
      phone
      role
      dateOfBirth
      weights {
        value
        date
      }
      gender
      heightInInches
      akutePatientId
      stripeCustomerId
      stripeSubscriptionId
      eaCustomerId
      eaHealthCoachId
      subscriptionExpiresAt
      provider {
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
      pharmacyLocation
      meetingUrl
      labOrderSent
      bmi
      signupPartner {
        title
      }
    }
  }
`;
function Patients() {
  const router = useRouter();
  const patientId = router.query?.patientId as string;
  const { data } = useQuery(getPatientInfo, {
    variables: {
      userId: patientId,
    },
  });
  return (
    <Layout
      hasBackButton
      backRef="/dashboard/patients"
      title={data?.getUserById?.name || "Patient"}
    >
      <IndividualPatientTabs />
    </Layout>
  );
}

Patients.isAuthRequired = true;

export default Patients;
