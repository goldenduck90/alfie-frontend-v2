import { Layout } from "@src/components/layouts/Layout";
import { IndividualPatientTabs } from "@src/components/patient/tabs";

function Patients() {
  return <IndividualPatientTabs />;
}

Patients.isAuthRequired = true;
Patients.getLayout = (page: React.ReactNode) => (
  <Layout title="My Patients">{page}</Layout>
);

export default Patients;
