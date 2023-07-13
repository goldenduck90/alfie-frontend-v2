import Link from "next/link";
import { Wrapper, PARTNERS } from "@src/components/layouts/Wrapper";
import { useRouter } from "next/router";
import { FeatureSection } from "../../FeatureSection";
import { Loading } from "../../Loading";
import { Button } from "@src/components/ui/Button";
import { useCheckoutQuery } from "@src/hooks/useCheckoutQuery";
import InsuranceCovered from "./checkout/InsuranceCovered";
import InsuranceNotCovered from "./checkout/InsuranceNotCovered";

const TOTAL_STEPS = 2;

export const Checkout = () => {
  const router = useRouter();
  const checkoutId = router.query.id;
  const { data, loading, error, weightLossValue, insuranceCovered } =
    useCheckoutQuery(checkoutId);

  if (loading) return <Loading />;

  if (error) {
    router.push("/login");
  }

  return (
    <Wrapper
      partner={PARTNERS.optavia}
      header={
        <h2 className="text-lg sm:text-2xl text-white font-bold">Your plan.</h2>
      }
    >
      <div className="flex flex-col max-w-lg bg-white rounded-xl gap-5">
        <div className="border-b px-8 py-4">
          <span className="text-primary-700 bg-primary-100 font-medium font-sm px-4 py-1 rounded-3xl">
            2 out of {TOTAL_STEPS}
          </span>
        </div>

        <div className="px-4">
          {insuranceCovered ? (
            <InsuranceCovered
              firstName={data?.checkout?.checkout?.name?.split(" ")[0]}
              weightLossValue={weightLossValue}
              checkoutId={checkoutId}
            />
          ) : (
            <InsuranceNotCovered
              weightLossValue={weightLossValue}
              checkoutId={checkoutId}
            />
          )}
          <div className="flex flex-col">
            <h3 className="text-xl text-secondary-500 font-bold mb-4">
              What&apos;s Included:
            </h3>
            <FeatureSection
              icon={
                <div className="w-12 h-12 rounded-full bg-secondary-100 mr-4"></div>
              }
              title="Metabolic Profiling"
              description="Lab tests and other measurements help us understand your metabolism and the scientific reasoning behind your weight gain to determine which treatment is right for you!"
            />
            <FeatureSection
              icon={
                <div className="w-12 h-12 rounded-full bg-secondary-100 mr-4"></div>
              }
              title="Doctor Prescribed Medication"
              asterisk
              description="Connect with one of our licensed providers and be prescribed the right combination of weight loss medications for you, if eligible."
            />
            <FeatureSection
              icon={
                <div className="w-12 h-12 rounded-full bg-secondary-100 mr-4"></div>
              }
              title="1:1 Accountability"
              description="Alfie pairs you with a certified health coach and integrates with your smart devices to help your care team maximize your weight loss."
            />
          </div>
          <div className="w-full">
            <Button
              onClick={() => {
                router.back();
              }}
              size="medium"
            >
              Back
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
