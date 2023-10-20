import { gql, useQuery } from "@apollo/client";

const getAllPatientsWithAlertsQuery = gql`
  query getAllPatientsWithAlerts {
    getAllPatientsWithAlerts {
      _id
      name
      gender
      email
      phone
      dateOfBirth
      heightInInches
      meetingUrl
    }
  }
`;

export function useGetAllPatientsWithAlerts() {
  return useQuery(getAllPatientsWithAlertsQuery);
}
