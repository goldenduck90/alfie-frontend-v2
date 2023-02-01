import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import React, { useMemo } from "react";
import { Checkbox } from "../../inputs/Checkbox";
import { IconInput } from "../../inputs/IconInput";

export const EmailCapture = () => {
  const fullName = localStorage.getItem("fullName") || "";
  const weight = localStorage.getItem("weight") || "";

  const weightLossValue = useMemo(() => {
    if (!weight) return "15% of your current weight";

    const weightInLbs = parseInt(weight);
    const roundedWeightLoss = Math.round(weightInLbs * 0.15);
    return `${roundedWeightLoss} pounds`;
  }, [weight]);

  return (
    <div>
      <p className="mb-10 mt-4 font-md font-mulish font-bold text-lg text-indigo-800">
        Great news, <span className="capitalize">{fullName.split(" ")[0]}</span>
        ! With Alfie, you could lose over {weightLossValue} in under 6 months.
        We&apos;ll design a customized plan for you that includes metabolic
        profiling, doctor-managed care, and accountability.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="font-mulish text-gray-900">
          Enter your email address and phone number to continue to your plan.
        </p>
      </div>

      <div className="pb-4">
        <IconInput
          name="email"
          placeholder="My email address is..."
          type="email"
          icon={<MailIcon className="h-5 w-5 text-indigo-800" />}
        />
      </div>
      <div className="pb-4">
        <IconInput
          name="phone"
          placeholder="My phone number is..."
          type="tel"
          icon={<PhoneIcon className="h-5 w-5 text-indigo-800" />}
        />
      </div>
      <div>
        {/* 
        We need a checkbox that will allow the user to opt-in to receive text messages from us.
         */}
        <Checkbox
          name="textOptIn"
          label="I would like to receive text messages from Alfie"
        />
      </div>
    </div>
  );
};
