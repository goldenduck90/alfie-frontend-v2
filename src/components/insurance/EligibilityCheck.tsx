import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Wrapper } from "@src/components/layouts/Wrapper";
import { useCheckoutQuery } from "@src/hooks/useCheckoutQuery";
import { usePartnerContext } from "@src/context/PartnerContext";
import { Button } from "@src/components/ui/Button";

import { FlowType } from "@src/graphql/generated";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import UploadForm from "./UploadForm";
import ManualForm from "./ManualForm";

const EligibilityCheck = () => {
  const router = useRouter();
  const checkoutId = router.query.id;
  const { partner } = usePartnerContext();
  const { data, loading, error, weightLossValue, insuranceCovered } =
    useCheckoutQuery(checkoutId);

  const [steps, setSteps] = useState(11); // Regular signup flow steps
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (partner) {
      setSteps(partner.flowType === FlowType.MultiStep ? 12 : 2);
    }
  }, [partner]);

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
            {isManual ? <ManualForm /> : <UploadForm />}
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

export default EligibilityCheck;
