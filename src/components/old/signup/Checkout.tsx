import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { Wrapper } from "@src/components/layouts/Wrapper";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { FeatureSection } from "../FeatureSection";
import { Loading } from "../Loading";
import { Button } from "@src/components/ui/Button";

const getCheckoutQuery = gql`
  query GetCheckout($id: String!) {
    checkout(id: $id) {
      checkout {
        _id
        name
        weightInLbs
      }
    }
  }
`;

export const Checkout = () => {
  const router = useRouter();
  const checkoutId = router.query.id;
  const { data, loading, error } = useQuery(getCheckoutQuery, {
    variables: {
      id: checkoutId,
    },
  });

  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "GetCheckout",
          component: "Checkout",
        },
      });
    }
  }, [error]);
  const weightLossValue = useMemo(() => {
    if (!data) return "15% of your current weight";

    const weightInLbs = parseInt(data.checkout.checkout.weightInLbs);
    return `${weightInLbs * 0.15} pounds`;
  }, [data]);

  if (loading) return <Loading />;

  if (error) {
    router.push("/login");
  }

  return (
    <Wrapper>
      <div className="flex flex-col max-w-md px-14 pt-14 pb-10 bg-white rounded-xl shadow-md gap-5">
        <div className="bg-blue-100 border rounded-xl border-blue-500 text-blue-700 px-4 py-3" role="alert">
          <p className="font-bold">Looking for insurance coverage?</p>
          <p className="text-sm">Email us at <a href="mailto:patients@joinalfie.com" className="underline">patients@joinalfie.com</a> to sign up via insurance.</p>
        </div>

        <p className="mb-4 font-md font-bold text-lg text-brand-berry">
          <span className="capitalize">
            {data?.checkout?.checkout?.name?.split(" ")[0]}
          </span>
          , you&apos;ll lose over {weightLossValue} in 6 months with Alfie, the
          virtual precision medicine clinic for people struggling with obesity.
        </p>

        <div className="flex flex-col md:flex-row justify-between md:items-center pb-4">
          <div className="flex flex-col mb-5 md:mb-0">
            <p className="text-gray-900 text-md font-bold mb-1">Your plan</p>
            <span className="text-brand-berry text-2xl font-bold">
              $120 monthly
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-900 text-md font-bold mb-2">
              Ready to be the best you?
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

        <div className="flex flex-col">
          <h3 className="text-xl text-gray-800 font-bold mb-8">
            What&apos;s Included
          </h3>
          <FeatureSection
            icon={<div />}
            title="Metabolic Profiling"
            description="Lab tests and other measurements help us understand your metabolism and the scientific reasoning behind your weight gain to determine which treatment is right for you!"
          />
          <FeatureSection
            icon={<div />}
            title="Doctor Prescribed Medication"
            asterisk
            description="Connect with one of our licensed providers and be prescribed the right combination of weight loss medications for you, if eligible."
          />
          <FeatureSection
            icon={<div />}
            title="1:1 Accountability"
            description="Alfie pairs you with a certified health coach and integrates with your smart devices to help your care team maximize your weight loss."
          />
        </div>
        <div className="flex flex-col border-t border-gray-200">
          <p className="text-center text-xs text-gray-400 pt-6">
            * Your Alfie care team will work directly with your insurance to
            obtain approval for medications and minimize any applicable copays.
            Without commercial insurance approval, some medications, such as
            GLP-1s, may cost over $1,000 per month.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
