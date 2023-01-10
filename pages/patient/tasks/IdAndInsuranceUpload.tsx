/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import axios from "axios"
import { FormikProvider, useFormik } from "formik"
import { useNavigate } from "react-router"

import { Button } from "../../../components/Button"
import { FileBox } from "../../../components/inputs/FileBox"
import { useNotificationDispatch } from "../../../context/NotificationContext"
import {
  FileInput,
  FileType,
  SignedUrlRequest,
  SignedUrlResponse,
} from "../../../graphql/generated"
import { useAuth } from "../../../hooks/useAuth"
import { parseError } from "../../../utils/parseError"
import { s3Key } from "../../../utils/s3Key"

type FormFields = {
  idPhoto: FileList | null
  insurancePhoto: FileList | null
}

const requestSignedUrlsMutation = gql`
  mutation RequestSignedUrls($requests: [SignedUrlRequest!]!) {
    requestSignedUrls(requests: $requests) {
      url
      key
    }
  }
`

export const IdAndInsuranceUpload = ({
  userTaskId,
}: {
  userTaskId: string
}) => {
  const notificationDispatchers = useNotificationDispatch()

  const { user } = useAuth()
  const navigate = useNavigate()
  const onCompleted = () => {
    notificationDispatchers.displayNotification(
      "ID and Insurance uploaded successfully",
      "Your results have been saved",
      "success"
    )
    navigate("/dashboard?refetch=true")
  }
  const initialValues: FormFields = {
    idPhoto: null,
    insurancePhoto: null,
  }
  const completeUploadUserTaskMutation = gql`
    mutation completeUploadFiles($files: [FileInput!]!) {
      completeUpload(files: $files) {
        _id
      }
    }
  `
  const completeUserTaskMutation = gql`
    mutation CompleteTask($input: CompleteUserTaskInput!) {
      completeUserTask(input: $input) {
        completed
      }
    }
  `
  const [completeUploadFiles] = useMutation(completeUploadUserTaskMutation)
  const [requestSignedurls] = useMutation(requestSignedUrlsMutation)
  const [completeUserTask] = useMutation(completeUserTaskMutation)
  const iDAndInsuranceForm = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: async (values, { setErrors, setStatus }) => {
      console.log(values, "values")
      if (!values.idPhoto) return
      if (!values.insurancePhoto) return
      if (!user) return

      const idKey = s3Key({
        fileName: "ID_PHOTO",
        fileType: `${values.idPhoto[0].name.split(".").pop()}`,
        folder: `${user.name}`,
      })

      const uploadRequests: SignedUrlRequest[] = [
        {
          key: idKey,
          metadata: [
            {
              key: "DOCUMENT_TYPE",
              value: "PHOTO_ID",
            },
            {
              key: "USER_ID",
              value: user._id,
            },
            {
              key: "USER_TASK_ID",
              value: userTaskId,
            },
            {
              key: "TASK_TYPE",
              value: "ID_AND_INSURANCE",
            },
            {
              key: "USER_EMAIL",
              value: user.email,
            },
          ],
          contentType: values.idPhoto[0].type || "",
        },
      ]

      const insuranceKey = s3Key({
        fileName: "INSURANCE_CARD",
        fileType: `${values.insurancePhoto[0].name.split(".").pop()}`,
        folder: `${user.name}`,
      })

      uploadRequests.push({
        key: insuranceKey,
        metadata: [
          {
            key: "DOCUMENT_TYPE",
            value: "INSURANCE_CARD",
          },
          {
            key: "USER_ID",
            value: user._id,
          },
          {
            key: "USER_TASK_ID",
            value: userTaskId,
          },
          {
            key: "TASK_TYPE",
            value: "ID_AND_INSURANCE",
          },
        ],
        contentType: values.insurancePhoto[0].type || "",
      })

      try {
        const { data } = await requestSignedurls({
          variables: {
            requests: uploadRequests,
          },
        })

        const files: FileInput[] = await Promise.all(
          data.requestSignedUrls.map(async (signedUrl: SignedUrlResponse) => {
            if (!values.idPhoto) return

            const { key, url } = signedUrl
            let file

            if (key === idKey) {
              file = values.idPhoto[0]
            } else if (key === insuranceKey && values.insurancePhoto) {
              file = values.insurancePhoto[0]
            } else {
              throw new Error("No file found")
            }

            const response = await axios.put(url, file, {
              headers: {
                "Content-Type": file.type,
              },
            })

            if (response.status !== 200) {
              throw new Error("Upload failed")
            }
            return {
              key,
              metadata: uploadRequests[0].metadata,
              type: FileType.PhotoId,
              contentType: file.type,
              ETag: response.headers.etag,
              url: `${url.split("?")[0]}?versionId=${
                response.headers["x-amz-version-id"]
              }`,
              versionId: response.headers["x-amz-version-id"],
              createdAt: response.headers.date,
            }
          })
        )
        await completeUploadFiles({
          variables: {
            files,
          },
        })
        const input = {
          _id: userTaskId,
          answers: files.map((file) => ({
            key: file.key,
            value: file.url,
            type: "FILE",
          })),
        }
        await completeUserTask({ variables: { input } })
        console.log(files)
        onCompleted()
      } catch (error) {
        console.log(error)
        const msg = parseError(error)

        if (values.insurancePhoto) {
          setErrors({
            insurancePhoto: " ",
          })
        }

        setStatus({
          error: msg,
        })
        setErrors({
          idPhoto: " ",
        })
      }
    },
  })

  const { submitForm, isSubmitting } = iDAndInsuranceForm
  const [selectedImage, setSelectedImage] = useState()
  const [selectedInsuranceImage, setSelectedInsuranceImage] = useState()

  // This function will be triggered when the file field change
  const idImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  }
  const insuranceImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedInsuranceImage(e.target.files[0])
    }
  }
  return (
    <FormikProvider value={iDAndInsuranceForm}>
      <div className="min-w-full md:min-w-0 max-w-lg">
        <div className="flex flex-col px-8 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5">
          <div className="mb-10">
            <h1 className="text-xl md:text-2xl font-bold font-mulish">
              Upload your ID &amp; Insurance card
            </h1>
            <p className="font-mulish text-gray-500 mt-4">
              Please upload a picture of your ID card &amp; Insurance card
              below. Make sure these are clear photos without any distortion.
            </p>
          </div>
          <div className="flex flex-col pb-4">
            <p className="font-mulish text-lg mb-2 text-gray-900 font-bold">
              Photo ID
            </p>
            <p className="font-mulish text-gray-500 mb-4 text-sm">
              This must be a US government issued ID or Passport.
            </p>
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                style={{ maxWidth: "100%" }}
                alt="Thumb"
              />
            )}
            <FileBox
              onChange={idImageChange}
              name="idPhoto"
              placeholder="Select a photo of your ID"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-mulish text-lg mb-2 text-gray-900 font-bold">
              Insurance Card
            </p>
            <p className="font-mulish text-gray-500 mb-4 text-sm">
              If you don't have insurance, you can skip this.
            </p>
            {selectedInsuranceImage && (
              <img
                src={URL.createObjectURL(selectedInsuranceImage)}
                style={{ maxWidth: "100%" }}
                alt="Thumb"
              />
            )}
            <FileBox
              onChange={insuranceImageChange}
              name="insurancePhoto"
              placeholder="Select a photo of your Insurance card"
            />
          </div>
          <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-between">
            <Button
              title="Upload"
              onPress={submitForm}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </FormikProvider>
  )
}
