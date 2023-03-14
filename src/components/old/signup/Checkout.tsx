import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { Wrapper } from "@src/components/layouts/Wrapper";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { Button } from "../Button";
import { FeatureSection } from "../FeatureSection";
import { Loading } from "../Loading";
import { Logo } from "../Logo";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();
  const router = useRouter();

  const { data, loading, error } = useQuery(getCheckoutQuery, {
    variables: {
      id: id,
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
    router.push("/");
  }

  const { checkout } = data.checkout;

  return (
    <Wrapper>
      <Logo />
      <div className="flex flex-col px-6 md:px-8 pt-8 pb-10 bg-white rounded-md space-y-5 min-w-full md:min-w-0 max-w-lg">
        <p className="mb-4 mt-4 font-md font-mulish font-bold text-lg text-indigo-800">
          <span className="capitalize">{checkout.name.split(" ")[0]}</span>,
          you&apos;ll lose over {weightLossValue} in 6 months with Alfie, the
          virtual precision medicine clinic for people struggling with obesity.
        </p>

        <div className="flex flex-col md:flex-row justify-between md:items-center pb-4">
          <div className="flex flex-col mb-5 md:mb-0">
            <p className="font-mulish text-gray-900 text-md font-bold mb-1">
              Your plan
            </p>
            <span className="font-mulish text-indigo-800 text-2xl font-bold">
              $120 monthly
            </span>
          </div>
          <div className="flex flex-col">
            <p className="font-mulish text-gray-900 text-md font-bold mb-2">
              Ready to be the best you?
            </p>
            <Button
              title="Checkout"
              onPress={() => {
                router.push(`/signup/checkout/${"id"}/address`);
              }}
              bold
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="font-mulish text-xl text-gray-800 font-bold mb-8">
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
          <p className="font-mulish text-center text-xs text-gray-400 pt-6">
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
