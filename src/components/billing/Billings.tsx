import React, { useEffect } from "react";
import { Button } from "@src/components/ui/Button";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { useQuery, useMutation } from "@tanstack/react-query";

export const Billing = () => {
  const { user } = useCurrentUserStore();

  async function queryFn() {
    const result = await fetch("/api/get_stripe_billing", {
      body: JSON.stringify({ stripeCustomer: user?.stripeCustomerId || "" }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      return result.json();
    }

    const error = await result.json();
    throw new Error(error?.message || "Failed to get stripe data");
  }

  const { data, error, isLoading } = useQuery(["test"], queryFn, {
    onSettled: (data, error) => {
      console.log({ data, error });
    },
  });

  return (
    <Button disabled={isLoading || !data?.stripeSessionData}>
      <a href={data?.stripeSessionData?.url} target="_blank" rel="noreferrer">
        Manage Billing
      </a>
    </Button>
  );
};
