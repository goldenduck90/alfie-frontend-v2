import React from "react";
import { SelectInput } from "@src/components/inputs/SelectInput";
import { usePartnerContext } from "@src/context/PartnerContext";

export const PartnerProvider: React.FC = () => {
  const { partner } = usePartnerContext();

  if (!partner?.providers) return null;

  return (
    <div className="px-8">
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        Referring Physician
      </p>

      <div className="flex-flex-col mb-3">
        <p className="text-primary-700 font-bold">
          Please select your referring provider from the drop-down
        </p>
      </div>

      <div className="pb-2">
        <SelectInput
          name="signupPartnerProvider"
          placeholder="Select"
          options={partner.providers.map((provider) => ({
            value: provider._id,
            label: provider.title,
          }))}
        />
      </div>
    </div>
  );
};
