import { Wrapper } from "../layouts/Wrapper";

export const Ineligible = () => {
  // sorry, based on your inputs you are ineligible for our medication-based weight loss program. Medications are approved for individuals with a BMI > 30 or a BMI > 27 with associated conditions.
  const message =
    "Sorry based on your inputs you are ineligible for our medication-based weight loss program. Medications are approved for individuals with a BMI > 30 or a BMI > 27 with associated conditions.";
  return (
    <Wrapper>
      <div className="flex flex-col px-1 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5 min-w-full md:min-w-0 max-w-lg">
        <p className=" text-gray-900">{message}</p>
        <div className="pt-3 text-center">
          <a
            href="https://joinalfie.com"
            className="text-sm text-brand-berry hover:text-brand-berry-tint-1"
          >
            Return to joinalfie.com
          </a>
        </div>
      </div>
    </Wrapper>
  );
};
