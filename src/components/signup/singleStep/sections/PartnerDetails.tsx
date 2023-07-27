import { SelectInput } from "@src/components/inputs/SelectInput";
import { SignupPartnerProvider } from "@src/graphql/generated";

const PartnerDetails = ({
  providers,
}: {
  providers: SignupPartnerProvider[];
}) => {
  return (
    <div>
      <h3 className="text-xl text-brand-berry font-bold mb-4 mx-4">
        Referring Physician
      </h3>
      <div className="flex flex-col gap-8 px-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 w-full">
          <div className="flex flex-col w-64">
            <p className="text-primary-700 font-bold">
              Please select your referring provider from the drop-down
              <span className="text-[red]">*</span>
            </p>
            <SelectInput
              name="signupPartnerProvider"
              placeholder="Select"
              options={providers.map((provider) => ({
                value: provider._id,
                label: provider.title,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PartnerDetails;
