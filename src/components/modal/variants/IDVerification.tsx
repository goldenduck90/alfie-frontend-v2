import { CalculatorIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import React, { useState, useEffect, useCallback } from "react";
import { Control, useController, useForm, useWatch } from "react-hook-form";
import { Button } from "../../ui/Button";
import { DialogLongHeader, useDialogToggle } from "../Dialog";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";
import {
  DocUploadInput,
  useAkuteMutation,
} from "../../../hooks/useAkuteMutation";
import { useCurrentUserStore } from "../../../hooks/useCurrentUser";
import { useTaskCompletion } from "../../../hooks/useTaskCompletion";
import { FileType } from "../../../graphql/generated";
import { fileToBase64 } from "../../../utils/fileToBase64";
import { InputFileField, maxFileSize } from "../../inputs/InputFileField";

function createS3key({
  fileName,
  fileType,
  folder,
  timestamp = false,
}: {
  fileName: string;
  fileType: string;
  folder: string;
  timestamp?: boolean;
}) {
  let key = `${folder.replace(" ", "_")}/${fileName}`;
  if (timestamp) {
    key = `${key}-${Date.now()}`;
  }

  return `${key}.${fileType}`;
}

const requestSignedUrlsMutation = gql`
  mutation RequestSignedUrls($requests: [SignedUrlRequest!]!) {
    requestSignedUrls(requests: $requests) {
      url
      key
    }
  }
`;

const completeUploadUserTaskMutation = gql`
  mutation completeUploadFiles($files: [FileInput!]!) {
    completeUpload(files: $files) {
      _id
    }
  }
`;

export const IDVerificationModal = ({
  title,
  taskId,
}: {
  title: string;
  taskId: string;
}) => {
  const [step, setStep] = useState(1);
  const { user } = useCurrentUserStore();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      _id: taskId,
      insurancePhoto: null,
      idPhoto: null,
    },
  });
  const setOpen = useDialogToggle();
  const [requestSignedUrls] = useMutation(requestSignedUrlsMutation);
  const [completeUploadFiles] = useMutation(completeUploadUserTaskMutation);
  const [mutate] = useTaskCompletion(() => setOpen(false));
  const [mutateAkuteDocUpload] = useAkuteMutation();
  const fileInput = useWatch({
    control,
    name: "idPhoto",
  });
  const [selectedIdImage, setSelectedId] = useState<Blob | null>(null);
  const [selectedInsuranceImage, setSelectedInsurance] = useState<Blob | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!!fileInput) {
      setStep(2);
    }
  }, [fileInput]);

  const { field: idField } = useController({
    name: "idPhoto",
    control,
    defaultValue: null,
  })
  const { field: insuranceField } = useController({
    name: "insurancePhoto",
    control,
    defaultValue: null,
  })

  const onSubmitFiles = useCallback(
    async ({ insurancePhoto, idPhoto, _id }: any) => {
      try {
        // Get S3 Signed URLs
        const idPhotoKey = createS3key({
          fileName: "ID_PHOTO",
          fileType: `${idPhoto?.value?.split(".").pop()}`,
          folder: `${user?.name}`,
        });

        const insurancePhotoKey = createS3key({
          fileName: "INSURANCE_CARD",
          fileType: `${insurancePhoto?.value?.split(".").pop()}`,
          folder: `${user?.name}`,
        });

        const uploadRequest = [
          {
            key: idPhotoKey,
            metadata: [
              {
                key: "DOCUMENT_TYPE",
                value: "PHOTO_ID",
              },
              {
                key: "USER_ID",
                value: user?._id,
              },
              {
                key: "USER_TASK_ID",
                value: _id,
              },
              {
                key: "TASK_TYPE",
                value: "ID_AND_INSURANCE",
              },
              {
                key: "USER_EMAIL",
                value: user?.email,
              },
            ],
            contentType: idPhoto?.file?.type || "",
          },
        ];

        uploadRequest.push({
          key: insurancePhotoKey,
          metadata: [
            {
              key: "DOCUMENT_TYPE",
              value: "INSURANCE_CARD",
            },
            {
              key: "USER_ID",
              value: user?._id,
            },
            {
              key: "USER_TASK_ID",
              value: _id,
            },
            {
              key: "TASK_TYPE",
              value: "ID_AND_INSURANCE",
            },
          ],
          contentType: insurancePhoto?.file?.type || "",
        });

        const { data } = await requestSignedUrls({
          variables: {
            requests: uploadRequest,
          },
        });

        const uploadedFiles = await Promise.all(
          data?.requestSignedUrls?.map(
            async ({ key, url }: { key: string; url: string }) => {
              let file: File | null = null;
              let type: FileType | null = null;
              if (key.includes("ID_PHOTO")) {
                file = idPhoto?.file;
                type = FileType.PhotoId;
              } else {
                file = insurancePhoto?.file;
                type = FileType.InsuranceCard;
              }

              const uploadResponse = await fetch(url, {
                method: "PUT",
                headers: {
                  ["Content-Type"]: file?.type || "",
                },
                body: file,
              });

              if (uploadResponse.status === 200) {
                // console.log("Upload Request Response", { uploadResponse });
                return {
                  key,
                  metadata: uploadRequest?.[0]?.metadata,
                  type: type,
                  contentType: file?.type,
                  ETag: uploadResponse.headers.get("etag") || "",
                  url: `${url.split("?")[0]
                    }?versionId=${uploadResponse.headers.get(
                      "x-amz-version-id"
                    )}`,
                  versionId: uploadResponse.headers.get("x-amz-version-id"),
                  createdAt: uploadResponse.headers.get("date"),
                };
              }
            }
          )
        );

        const idImage = await fileToBase64(idPhoto.file);
        const insuranceImage = await fileToBase64(insurancePhoto.file);

        const idDocument: DocUploadInput = {
          file: idImage.split(",").pop()!,
          fileName: idPhoto.file.name,
          description: "personal id photo",
          patientId:
            user?.akutePatientId || user?.externalPatientId || undefined,
          tags: [""],
        };
        const insuranceIdDocument: DocUploadInput = {
          file: insuranceImage.split(",").pop()!,
          fileName: insurancePhoto.file.name,
          description: "insurance id photo",
          patientId:
            user?.akutePatientId || user?.externalPatientId || undefined,
          tags: [""],
        };

        await mutateAkuteDocUpload({
          variables: { input: idDocument },
        });

        await mutateAkuteDocUpload({
          variables: { input: insuranceIdDocument },
        });

        await completeUploadFiles({
          variables: {
            files: uploadedFiles,
          },
        });

        const finalInput = {
          _id,
          answers: uploadedFiles.map((file) => {
            return {
              key: file.key,
              value: file.url,
              type: "FILE",
            };
          }),
        };

        mutate({
          variables: {
            input: finalInput,
          },
        });
        // Complete upload file?
      } catch (error) {
        console.log("Failed to get Signed URLS", { error });
      }

      // End
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="w-full md:max-w-[560px]">
      <DialogLongHeader
        title={title}
        step={step}
        total={2}
        icon={<CalculatorIcon className="w-5 h-5 stroke-inherit" />}
      />
      <div className="w-full py-6 bg-gray-50 border-t border-b border-gray-400 px-6 flex flex-col gap-y-2 ">
        <p className="text-sm">
          Please upload a picture of your ID card & Insurance card. Make sure
          these are clear photos without any distortion.
        </p>
        <div className="text-sm">
          {step === 1 ? (
            <React.Fragment>
              <p className="font-bold">ID photo</p>
              <p>This must be a US government issued ID or passport</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="font-bold">Insurance Card</p>
              <p>If you don&apos;t have insurance you can skip this.</p>
            </React.Fragment>
          )}
        </div>
        <InputFileField
          field={step === 1 ? idField : insuranceField}
          multi={false}
          error={error}
          onUploadFile={(file) => {
            if (file.size > maxFileSize) {
              if (step === 1) {
                setSelectedId(null);
              } else {
                setSelectedInsurance(null);
              }
              setError("File size limit: 10 MB.");
            } else {
              setError(null);
              return step === 1
                ? setSelectedId(file)
                : step === 2 && file
                  ? setSelectedInsurance(file)
                  : null;
            }
          }}
        >
          <div className="flex flex-col gap-y-3 items-center justify-center h-full">
            <div className="p-2 rounded-full max-w-fit">
              {step === 1 && selectedIdImage ? (
                <Image
                  src={URL.createObjectURL(selectedIdImage)}
                  width={140}
                  height={140}
                  alt="id thumbnail"
                />
              ) : step === 2 && selectedInsuranceImage ? (
                <Image
                  src={URL.createObjectURL(selectedInsuranceImage)}
                  width={140}
                  height={140}
                  alt="insurance thumbnail"
                />
              ) : (
                <CalculatorIcon className="w-5 h-5 stroke-inherit" />
              )}
            </div>
            <p className="font-bold">
              {step === 1
                ? "Upload your ID photo"
                : "Upload your Insurance Card photo"}
            </p>
            <p className="text-sm text-gray-500">
              Accepted file types are: png, jpg, pdf.
            </p>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button>Upload from computer</Button>
          </div>
        </InputFileField>
      </div>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
        {step === 1 && (
          <RadixDialog.Close asChild>
            <Button buttonType="secondary">Cancel</Button>
          </RadixDialog.Close>
        )}
        {step === 2 && (
          <Button onClick={() => setStep(1)} buttonType="secondary">
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
        )}
        <Button
          onClick={() => {
            if (step === 1) {
              setStep(2);
            } else {
              handleSubmit(onSubmitFiles)();
            }
          }}
        >
          {step === 1 ? "Next" : "Complete"}
        </Button>
      </div>
    </div>
  );
};
