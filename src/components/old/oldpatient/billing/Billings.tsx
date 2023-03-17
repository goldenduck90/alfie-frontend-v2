import { gql, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import axios from "axios";
import qs from "qs";
import React, { useEffect } from "react";
import { Button } from "@src/components/ui/Button";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";

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

export const Billing = () => {
  const { user } = useCurrentUserStore();
  const stripeUrl = process.env.NEXT_PUBLIC_STRIPE_URL;

  const stripeSecretKey = "";

  const [userStripeSession, setUserStripeSession] =
    React.useState<StripeSession>();

  const createUserStripeSession = React.useCallback(async () => {
    try {
      const session = await axios.post(
        `${stripeUrl}/billing_portal/sessions`,
        qs.stringify({
          customer: String(user?.stripeCustomerId),
          return_url:
            "http://develop.platform.joinalfie.com.s3-website-us-east-1.amazonaws.com/billing",
        }),
        {
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      setUserStripeSession(session.data);
      console.log(session);
    } catch (err) {
      console.log({ err });
      Sentry.captureException(new Error(err as any), {
        tags: {
          query: "createUserStripeSession",
          component: "Billing",
        },
      });
    }
  }, [user?.stripeCustomerId]);

  React.useEffect(() => {
    if (user?.stripeCustomerId) return;
    createUserStripeSession();
  }, [createUserStripeSession]);

  return (
    <a href={userStripeSession?.url} target="_blank" rel="noreferrer">
      <Button>Manage Billing</Button>
    </a>
  );
};
