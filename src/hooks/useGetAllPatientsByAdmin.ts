import { gql, useQuery } from "@apollo/client";

const getAllAdminPatientsQuery = gql`
  query getAllPatients {
    users {
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

export function useGetAllPatientsByAdmins() {
  return useQuery(getAllAdminPatientsQuery);
}
