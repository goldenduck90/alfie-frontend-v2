import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loading } from "../Loading";

const getCheckoutQuery = gql`
  query GetCheckout($id: String!) {
    checkout(id: $id) {
      checkout {
        _id
        stripeClientSecret
      }
    }
  }
`;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY || "");

export const StripeWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const id = router.query.id;

  const {
    data,
    loading: fetching,
    error,
  } = useQuery(getCheckoutQuery, {
    variables: {
      id,
    },
  });
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "GetCheckout",
          component: "StripeWrapper",
        },
      });
    }
  }, [error]);

  if (!id) {
    router.push("/signup");
  }

  if (fetching) return <Loading />;

  if (error) {
    router.push("/");
  }

  const { stripeClientSecret } = data.checkout.checkout;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: stripeClientSecret,
      }}
    >
      {children}
    </Elements>
  );
};
