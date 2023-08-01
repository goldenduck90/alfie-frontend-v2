import React, { FC } from "react";
import { useRouter } from "next/router";
import { Button } from "@src/components/ui/Button";

type Props = {
  firstName: string;
  weightLossValue: string;
  checkoutId: string | string[] | undefined;
};

const InsuranceCovered: FC<Props> = ({
  firstName,
  weightLossValue,
  checkoutId,
}) => {
  const router = useRouter();

  return (
    <>
      <p className="p-4 font-md font-bold text-lg text-brand-berry">
        Great news {firstName}, your insurance likely covers Alfie Health’s
        program! Sign up today to gain access to Alfie’s precision weight
        management program and lose {weightLossValue} within the next 6 months.
      </p>

      <div className="flex flex-col p-4">
        <div>
          <span className="text-brand-berry text-2xl font-bold">
            $0 onboarding fee
          </span>
        </div>
        <div className="w-64">
          <Button
            onClick={() => {
              router.push(`/signup/checkout/${checkoutId}/address`);
            }}
            size="medium"
            fullWidth
          >
            Checkout
          </Button>
        </div>
      </div>
      <div className="p-4 italic text-secondary-500">
        <ul className="ml-6 list-disc">
          <li>FSA/HSA eligible</li>
          <li>Cancel or pause at any time</li>
        </ul>
        <br />
        <p>
          Provider visits billed to insurance. Patient responsible for any
          co-pays or deductible. Diagnostic testing and medications may also be
          covered by your insurance, but are not billed through Alfie Health.
        </p>
        <br />
        <p>
          {
            "Credit card information collected for copays. There are no monthly fees outside of your insurance's required copays."
          }
        </p>
        <br />
        <p>
          We require that you are under the care of a primary care provider
          (PCP) so we have an updated medical history. If you {"haven't"} seen
          your PCP in the last year, you will need to complete a visit before
          your first Alfie Health doctor appointment.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center my-8 p-4">
        <div className="flex flex-col mb-5 md:mb-0 w-full md:w-1/2">
          <p className="text-secondary-500 text-md mb-1">Your plan</p>
          <span className="text-brand-berry text-xl font-bold">
            Precision medication management
          </span>
        </div>
        <div className="flex flex-col">
          <p className="text-secondary-500 text-md mb-1">
            Ready to achieve your goals?
          </p>
          <p className="text-brand-berry text-xl font-bold">
            $0 onboarding fee
          </p>
          <Button
            onClick={() => {
              router.push(`/signup/checkout/${checkoutId}/address`);
            }}
            size="medium"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default InsuranceCovered;
