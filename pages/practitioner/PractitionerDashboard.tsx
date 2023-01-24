import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { Layout } from "../../src/components/layouts/Layout";
import { QuickViewCard } from "../../src/components/practitioner/dashboard/QuickViewCard";
import { Patient, Table } from "../../src/components/practitioner/Table";
import { useAuth } from "../../src/hooks/useAuth";

const PractitionerDashboard = () => {
  const getAllProviderPatientsQuery = gql`
    query getAllPatientsByProvider {
      getAllPatientsByPractitioner {
        _id
        name
        gender
        email
        dateOfBirth
        heightInInches
        meetingUrl
      }
    }
  `;
  const patients = useQuery(getAllProviderPatientsQuery);
  const user = useAuth();
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (patients.error) {
      Sentry.captureException(new Error(patients.error.message), {
        tags: {
          query: "getAllPatientsByProvider",
          component: "PractitionerDashboard",
        },
      });
    }
  }, [patients]);
  // total patient count
  // total appoints based upon if the patients meetingUrl is null or not
  const totalPatients = patients?.data?.getAllPatientsByPractitioner?.length;
  const totalAppointments =
    patients?.data?.getAllPatientsByPractitioner?.filter(
      (patient: Patient) => patient.meetingUrl !== null
    ).length;
  function cleanPatientData() {
    const patientData = patients?.data?.getAllPatientsByPractitioner.map(
      (patient: Patient) => {
        return {
          ...patient,
          dateOfBirth: new Date(patient.dateOfBirth).toLocaleDateString(),
          // If meeting url is null, then the patient has not been scheduled for an appointment yet
          status: patient.meetingUrl ? "Scheduled" : "Not Scheduled",
        };
      }
    );
    return patientData;
  }
  return (
    <Layout title={`Welcome, ${user?.user?.name}.`}>
      <div className="flex flex-col w-full lg:w-3/4">
        <QuickViewCard
          totalAppointments={totalAppointments}
          totalPatients={totalPatients}
        />
      </div>
      <Table patientData={cleanPatientData()} loading={patients.loading} />
    </Layout>
  );
};

export default PractitionerDashboard;
