import { gql, useQuery } from "@apollo/client";

const getAllProviders = gql`
  query getAllProviders {
    users {
      _id
      akuteId
      eaProviderId
      email
      emailToken
      emailTokenExpiresAt
      firstName
      lastName
      licensedStates
      npi
      numberOfPatients
      password?
      type
    }
  }
`;

export function useGetAllProvidersByAdmins() {
  return useQuery(getAllProviders);
}
