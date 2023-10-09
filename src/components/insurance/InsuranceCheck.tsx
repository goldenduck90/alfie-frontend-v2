import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Wrapper } from "@src/components/layouts/Wrapper";
import { useCheckoutQuery } from "@src/hooks/useCheckoutQuery";
import { usePartnerContext } from "@src/context/PartnerContext";
import { Button } from "@src/components/ui/Button";

import { FlowType, Insurance } from "@src/graphql/generated";
import UploadForm from "./UploadForm";
import ManualForm from "./ManualForm";
import { Loading } from "../Loading";

import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { createS3key } from "@src/utils/upload";

import { randomId } from "@src/utils/randomId";
import { useNotificationStore } from "@src/hooks/useNotificationStore";

const requestSignedUrlsMutation = gql`
  mutation RequestSignedUrls($requests: [SignedUrlRequest!]!) {
    requestSignedUrls(requests: $requests) {
      url
      key
    }
  }
`;

const insuranceTextractMutation = gql`
  mutation insuranceTextract($s3Key: String!, $userState: String!) {
    insuranceTextract(s3Key: $s3Key, userState: $userState) {
      insuranceMatches {
        memberId
        insuranceCompany
        payor
        groupId
        groupName
        rxBIN
        rxPCN
        rxGroup
      }
      words
      lines
    }
  }
`;

const insuranceCoveredQuery = gql`
  query InsuranceCovered(
    $checkoutId: String!
    $insuranceType: InsuranceTypeValue!
    $insurancePlan: InsurancePlanValue!
  ) {
    insuranceCovered(
      checkoutId: $checkoutId
      insuranceType: $insuranceType
      insurancePlan: $insurancePlan
    ) {
      covered
      comingSoon
    }
  }
`;

const insurancePlansQuery = gql`
  query insurancePlans {
    insurancePlans {
      plans {
        _id
        name
        value
        types
      }
      types {
        _id
        name
        type
      }
    }
  }
`;

const insuranceCheckMutation = gql`
  mutation insuranceCheck($input: InsuranceCheckInput!) {
    insuranceCheck(input: $input) {
      eligible {
        eligible
        reason
      }
    }
  }
`;

const InsuranceCheck = () => {
  const router = useRouter();
  const checkoutId = router.query.id;

  const [requestSignedUrls] = useMutation(requestSignedUrlsMutation);
  const [insuranceTextract] = useMutation(insuranceTextractMutation);
  const [insuranceCheck] = useMutation(insuranceCheckMutation);
  const [insuranceCovered] = useLazyQuery(insuranceCoveredQuery);

  const { partner } = usePartnerContext();
  const { addNotification } = useNotificationStore();

  const { data, loading } = useCheckoutQuery(checkoutId);
  const { data: insurancePlans } = useQuery(insurancePlansQuery);

  const [steps, setSteps] = useState(11); // Regular signup flow steps
  const [isManual, setIsManual] = useState(false);
  const [insuranceCardImage, setInsuranceCardImage] = useState<File | null>(
    null
  );
  const [insurance, setInsurance] = useState<Insurance>();

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
              userState: checkout.checkout.state,
            },
          });
          if (data.insuranceTextract.insuranceMatches.length > 0) {
            setInsurance(data.insuranceTextract.insuranceMatches[0]);
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

  const handleInsuranceSubmit = async (values: {
    plan: string;
    type: string;
    groupId: string;
    memberId: string;
  }) => {
    // Check insurance is covered
    const {
      data: { insuranceCovered: coveredData },
    } = await insuranceCovered({
      variables: {
        checkoutId,
        insurancePlan: values.plan,
        insuranceType: values.type,
      },
    });

    const covered: boolean = coveredData.covered || coveredData.comingSoon;
    if (covered) {
      // The insurance has covered, and not checking the eligibility
      let insuranceObj = insurance;
      if (!insurance) {
        insuranceObj = {
          insuranceCompany: values.plan,
          groupId: values.groupId,
          memberId: values.memberId,
        };
      }
      await insuranceCheck({
        variables: {
          input: {
            checkoutId,
            insurancePlan: values.plan,
            insuranceType: values.type,
            insurance: insuranceObj,
            covered,
          },
        },
      });
    }

    router.push(`/signup/checkout/${checkoutId}`);
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

        <div className="px-4">
          <div className="my-4">
            {isManual ? (
              <ManualForm
                insurance={insurance}
                plans={insurancePlans.insurancePlans.plans}
                types={insurancePlans.insurancePlans.types}
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

          <div className="flex flex-col justify-center mt-16">
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
