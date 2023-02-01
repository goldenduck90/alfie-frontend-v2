/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import axios from "axios";
import qs from "qs";
import React, { useEffect } from "react";
import { ApplicationLayout } from "../../../src/components/layouts/ApplicationLayout";
interface StripeSession {
  id: string;
  object: string;
  configuration: string;
  created: number;
  customer: string;
  livemode: boolean;
  locale: string;
  on_behalf_of: string;
  return_url: string;
  url: string;
}

const getUserDetailsQuery = gql`
  query GetUserDetails {
    user {
      stripeCustomerId
    }
  }
`;

export const Billing = () => {
  const [userStripeSession, setUserStripeSession] =
    React.useState<StripeSession>();

  const { data, loading, error } = useQuery(getUserDetailsQuery, {});

  const createUserStripeSession = React.useCallback(async () => {
    try {
      const session = await axios.post(
        `${process.env.REACT_APP_STRIPE_URL}/billing_portal/sessions`,
        qs.stringify({
          customer: String(data.user?.stripeCustomerId),
          return_url:
            "http://develop.platform.joinalfie.com.s3-website-us-east-1.amazonaws.com/billing",
        }),
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      setUserStripeSession(session.data);
    } catch (err) {
      Sentry.captureException(new Error(err as any), {
        tags: {
          query: "createUserStripeSession",
          component: "Billing",
        },
      });
    }
  }, [data]);

  function navigateToStripe() {
    window.open(userStripeSession?.url, "_blank");
  }
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "GetUserDetails",
          component: "Billing",
        },
      });
    }
  }, [error]);

  React.useEffect(() => {
    if (!data?.user?.stripeCustomerId) return;
    createUserStripeSession();
  }, [createUserStripeSession, data, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <ApplicationLayout title="Billing">
      <button
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => navigateToStripe()}
      >
        Manage Billing
      </button>
    </ApplicationLayout>
  );
};
