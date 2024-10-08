import { useEffect, useMemo } from "react";
import * as Sentry from "@sentry/react";
import { gql, useQuery } from "@apollo/client";

const getCheckoutQuery = gql`
  query GetCheckout($id: String!) {
    checkout(id: $id) {
      checkout {
        _id
        name
        state
        weightInLbs
        insurance {
          memberId
        }
      }
    }
  }
`;

export const useCheckoutQuery = (checkoutId: string | string[] | undefined) => {
  const { data, loading, error } = useQuery(getCheckoutQuery, {
    variables: {
      id: checkoutId,
    },
    fetchPolicy: "no-cache",
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
    return `${(weightInLbs * 0.15).toFixed(2)} pounds`;
  }, [data]);

  const insuranceCovered = useMemo(
    () => data?.checkout.checkout.insurance ? true : false,
    [data]
  );

  const stripeClientSecret = useMemo(
    () => data?.checkout?.checkout?.stripeClientSecret,
    [data]
  );

  return {
    data,
    loading,
    error,
    weightLossValue,
    insuranceCovered,
    stripeClientSecret,
  };
};
