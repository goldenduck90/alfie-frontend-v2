import { gql, useQuery } from "@apollo/client"
import * as Sentry from "@sentry/react"
import { useEffect } from "react"
import { PractitionerApplicationLayout } from "../../components/layouts/PractitionerApplicationLayout"
import { QuickViewCard } from "../../components/practitioner/dashboard/QuickViewCard"
import { Patient, Table } from "../../components/practitioner/Table"
import { useAuth } from "../../hooks/useAuth"

const HealthCoachDashboard = () => {
  const getAllProviderPatientsQuery = gql`
    query getAllPatientsByHealthcoach {
      getAllPatientsByHealthCoach {
        _id
        name
        gender
        email
        dateOfBirth
        heightInInches
        meetingUrl
      }
    }
  `
  const patients = useQuery(getAllProviderPatientsQuery)
  const user = useAuth()
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (patients.error) {
      Sentry.captureException(new Error(patients.error.message), {
        tags: {
          query: "getAllPatientsByProvider",
          component: "PractitionerDashboard",
        },
      })
    }
  }, [patients])
  // total patient count
  // total appoints based upon if the patients meetingUrl is null or not
  const totalPatients = patients?.data?.getAllPatientsByHealthCoach?.length
  const totalAppointments = patients?.data?.getAllPatientsByHealthCoach?.filter(
    (patient: Patient) => patient.meetingUrl !== null
  ).length
  function cleanPatientData() {
    const patientData = patients?.data?.getAllPatientsByHealthCoach.map(
      (patient: Patient) => {
        return {
          ...patient,
          dateOfBirth: new Date(patient.dateOfBirth).toLocaleDateString(),
          // If meeting url is null, then the patient has not been scheduled for an appointment yet
          status: patient.meetingUrl ? "Scheduled" : "Not Scheduled",
        }
      }
    )
    return patientData
  }
  return (
    <PractitionerApplicationLayout title={`Welcome, ${user?.user?.name}.`}>
      <div className="flex flex-col w-full lg:w-3/4">
        <QuickViewCard
          totalAppointments={totalAppointments}
          totalPatients={totalPatients}
          isAdmin={false}
          isProvider={false}
          isHealthCoach={true}
        />
      </div>
      <Table
        isHealthCoach={true}
        patientData={cleanPatientData()}
        loading={patients.loading}
      />
    </PractitionerApplicationLayout>
  )
}
export default HealthCoachDashboard
