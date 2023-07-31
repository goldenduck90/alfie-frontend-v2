import { gql, useQuery } from "@apollo/client";

const getAllProviderPatientsQuery = gql`
  query GetAllPatientsByProvider {
    getAllPatientsByProvider {
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

export function useGetAllPatientsByProvider() {
  return useQuery(getAllProviderPatientsQuery);
}
