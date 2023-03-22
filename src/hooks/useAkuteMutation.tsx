import { client } from "@src/graphql";
import { gql, useMutation } from "@apollo/client";

export interface DocUploadInput {
  file: string | ArrayBuffer | null;
  fileName: string;
  description?: string;
  patientId?: string;
  externalPatientId?: string;
  tags?: string[];
}

const uploadAkuteDocMutation = gql`
  mutation UploadDocument($input: DocUploadInput!) {
    uploadDocument(input: $input) {
      id
    }
  }
`;

export const useAkuteMutation = () => {
  return useMutation(uploadAkuteDocMutation, {
    onError: () => {
      console.log("Error in document upload");
    },
    onCompleted: async () => {
      try {
        await client.refetchQueries({
          include: "active",
        });
      } catch (error) {
        console.log("Failed to refresh", { error });
      }
      console.log("Upload successful");
    },
  });
};
