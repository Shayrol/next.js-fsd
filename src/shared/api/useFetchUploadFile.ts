import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export const useFetchUploadFile = () => {
  const result = useMutation<Pick<Mutation, "uploadFile">>(UPLOAD_FILE);

  return result;
};
