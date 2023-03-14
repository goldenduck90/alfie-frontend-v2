import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Loading } from "../Loading";

import { CheckoutPayment } from "./CheckoutPayment";
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
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

export const StripeWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    navigate("/signup");
  }

  if (fetching) return <Loading />;

  if (error) {
    navigate("/");
  }

  const { stripeClientSecret } = data.checkout.checkout;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: stripeClientSecret,
      }}
    >
      <CheckoutPayment />
    </Elements>
  );
};
