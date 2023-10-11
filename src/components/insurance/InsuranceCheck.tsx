import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Wrapper } from "@src/components/layouts/Wrapper";
import { useCheckoutQuery } from "@src/hooks/useCheckoutQuery";
import { usePartnerContext } from "@src/context/PartnerContext";
import { Button } from "@src/components/ui/Button";

import { FlowType, InsuranceCheckMutation, InsuranceCheckMutationVariables, InsuranceTextractMutation, InsuranceTextractMutationVariables, InsuranceType, InsurancesQuery, InsurancesQueryVariables } from "@src/graphql/generated";
import UploadForm from "./UploadForm";
import ManualForm from "./ManualForm";
import { Loading } from "../Loading";

import { gql, useMutation, useQuery } from "@apollo/client";
import { createS3key } from "@src/utils/upload";

import { randomId } from "@src/utils/randomId";
import { useNotificationStore } from "@src/hooks/useNotificationStore";
import { set } from "lodash";

const requestSignedUrlsMutation = gql`
  mutation RequestSignedUrls($requests: [SignedUrlRequest!]!) {
    requestSignedUrls(requests: $requests) {
      url
      key
    }
  }
`;

const insuranceTextractMutation = gql`
  mutation insuranceTextract($s3Key: String!) {
    insuranceTextract(s3Key: $s3Key) {
      insurance {
        company
        type
        memberId
        groupId
      }
      words
      lines
    }
  }
`;

const insuranceQuery = gql`
  query insurances {
    insurances {
      _id
      name
    }
  }
`;

const insuranceCheckMutation = gql`
  mutation insuranceCheck($input: InsuranceCheckInput!) {
    insuranceCheck(input: $input) {
      status
      eligible
      errors
    }
  }
`;

const InsuranceCheck = () => {
  const router = useRouter();
  const checkoutId = String(router.query.id);

  const [requestSignedUrls] = useMutation(requestSignedUrlsMutation);
  const [insuranceTextract] = useMutation<InsuranceTextractMutation, InsuranceTextractMutationVariables>(insuranceTextractMutation);
  const [insuranceCheck] = useMutation<InsuranceCheckMutation, InsuranceCheckMutationVariables>(insuranceCheckMutation);

  const { partner } = usePartnerContext();
  const { addNotification } = useNotificationStore();

  const { data, loading } = useCheckoutQuery(checkoutId);
  const { data: insData } = useQuery<InsurancesQuery, InsurancesQueryVariables>(insuranceQuery);

  const [steps, setSteps] = useState(11); // Regular signup flow steps
  const [isManual, setIsManual] = useState(false);
  const [insuranceCardImage, setInsuranceCardImage] = useState<File | null>(
    null
  );

  const [dInsuranceId, setInsuranceId] = useState<string>("");
  const [dType, setType] = useState<InsuranceType>(InsuranceType.Ppo);
  const [dMemberId, setMemberId] = useState<string>("");
  const [dGroupId, setGroupId] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (partner) {
      setSteps(partner.flowType === FlowType.MultiStep ? 12 : 2);
    }
  }, [partner]);

  if (loading) return <Loading />;

  const handleInsuranceCardUpload = async () => {
    const { checkout } = data;
    try {
      if (insuranceCardImage) {
        const insurancePhotoKey = createS3key({
          fileName: "INSURANCE_CARD",
          fileType: `${insuranceCardImage.name.split(".").pop()}`,
          folder: checkout.checkout.name.replace(" ", "_").toLowerCase(),
        });
        const uploadRequest = [
          {
            key: insurancePhotoKey,
            metadata: [
              {
                key: "DOCUMENT_TYPE",
                value: "INSURANCE_CARD",
              },
            ],
            contentType: insuranceCardImage.type,
          },
        ];

        const { data } = await requestSignedUrls({
          variables: {
            requests: uploadRequest,
          },
        });

        const { key, url } = data.requestSignedUrls[0];

        const uploadResponse = await fetch(url, {
          method: "PUT",
          headers: {
            ["Content-Type"]: insuranceCardImage.type || "",
          },
          body: insuranceCardImage,
        });

        if (uploadResponse.ok) {
          const { data } = await insuranceTextract({
            variables: {
              s3Key: key,
            },
          });

          if (data?.insuranceTextract.insurance) {
            const parsedInsurance = data.insuranceTextract.insurance

            // find insurance ID from list
            if (parsedInsurance.company) {
              const insuranceId = insData?.insurances.find((i) => i.name === parsedInsurance.company)?._id
              if (insuranceId) setInsuranceId(insuranceId)
            }

            if (parsedInsurance.type) setType(parsedInsurance.type)
            if (parsedInsurance.memberId) setMemberId(parsedInsurance.memberId)
            if (parsedInsurance.groupId) setGroupId(parsedInsurance.groupId)

            setIsManual(true);
          }
        }
      }
    } catch (err) {
      addNotification({
        id: randomId(),
        type: "error",
        description: "please upload clear image or enter details manually",
        title: "Unable to read insurance card",
      });
    }
  };

  const handleInsuranceSubmit = async ({
    insuranceId,
    memberId,
    groupId,
    type,
  }: {
    insuranceId: string;
    memberId: string;
    groupId: string;
    type: InsuranceType;
  }) => {
    setErrors([]);

    const { data } = await insuranceCheck({
      variables: {
        input: {
          checkoutId,
          insurance: {
            insurance: insuranceId,
            memberId,
            groupId,
            type,
          }
        },
      },
    });


    if (data?.insuranceCheck.errors) {
      setErrors(data.insuranceCheck.errors);
      return false;
    } else {
      router.push(`/signup/checkout/${checkoutId}`);
      return true;
    }
  };

  return (
    <Wrapper
      header={
        <h2 className="text-lg sm:text-2xl text-white font-bold">
          Your insurance.
        </h2>
      }
    >
      <div className="flex flex-col max-w-lg bg-white rounded-xl gap-5">
        <div className="border-b px-8 py-4">
          <span className="text-primary-700 bg-primary-100 font-medium font-sm px-4 py-1 rounded-3xl">
            {steps - 1} out of {steps}
          </span>
        </div>

        {errors.length > 0 ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-6 rounded relative" role="alert">
            <div>
              <strong className="font-bold">Error Processing Insurance!</strong>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red-500" onClick={() => setErrors([])} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
              </span>
            </div>
            <div className="ml-4 mt-2">
              <ul className="list-disc">
                {errors.map((e) => <li>{e}</li>)}
              </ul>
            </div>
          </div>
        ) : null}

        <div className="px-4">
          <div className="my-4">
            {isManual ? (
              <ManualForm
                insurances={insData?.insurances || []}
                insuranceId={dInsuranceId}
                type={dType}
                groupId={dGroupId}
                memberId={dMemberId}
                onSubmit={handleInsuranceSubmit}
              />
            ) : (
              <UploadForm
                insuranceCard={insuranceCardImage}
                onInsuranceCardChange={setInsuranceCardImage}
                onUpload={handleInsuranceCardUpload}
              />
            )}
          </div>

          <div className="flex flex-col justify-center items-center mt-12">
            <Button
              onClick={() => {
                setIsManual(!isManual);
              }}
              size="medium"
              buttonType="secondary"
            >
              {isManual ? "Upload insurance card" : "Enter details manually"}
            </Button>

            <div className="text-center my-4">
              <span>or</span>
            </div>

            <Button
              onClick={() => {
                router.push(`/signup/checkout/${checkoutId}`);
              }}
              size="medium"
            >
              Continue without insurance
            </Button>
          </div>
          <div className="flex flex-col">
            <p className="text-center text-xs text-gray-400 pt-6">
              * Depending on your insurance, you may have to pay applicable
              copays for medications prescribed by Alfie Health providers.
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-center text-sm font-medium text-gray-400 py-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-brand-berry hover:text-brand-berry-tint-1 underline"
              >
                Click here to login.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default InsuranceCheck;
