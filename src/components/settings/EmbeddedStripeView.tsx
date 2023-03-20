import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { Billing } from "../old/oldpatient/billing/Billings";

// TODO Work in progress
export function EmbeddedStripeView() {
  const [hasError, setHasError] = useState(false);
  const { user } = useCurrentUserStore();

  const fetchClientSecret = async () => {
    // Fetch the AccountSession client secret
    const response = await fetch("/api/stripe_session", {
      method: "POST",
      body: JSON.stringify({ stripeCustomerId: user?.stripeCustomerId || "" }),
    });
    if (!response.ok) {
      // Handle errors on the client side here
      const { error } = await response.json();
      console.log("An error occurred: ", error);
      setHasError(true);
      return undefined;
    } else {
      const { client_secret: clientSecret } = await response.json();
      setHasError(false);
      return clientSecret;
    }
  };

  useEffect(() => {
    (window as any).StripeConnect = (window as any).StripeConnect || {};
    (async () => {
      const clientSecret = await fetchClientSecret();
      if (clientSecret) {
        // Initialize StripeConnect after the window loads
        (window as any).StripeConnect.onLoad = () => {
          (window as any).StripeConnect.init({
            publishableKey: user?.stripeSubscriptionId || "",
            clientSecret,
            appearance: {
              colors: {
                primary: "#625afa",
              },
            },
            uiConfig: {
              overlay: "dialog",
            },
            refreshClientSecret: async () => {
              return await fetchClientSecret();
            },
          });
        };
      }
    })();
  }, []);

  return (
    <div>
      <Script async src="https://connect-js.stripe.com/v0.1/connect.js" />
      <div className="container">
        <Billing />
        {!hasError && (
          // <stripe-connect-payments></stripe-connect-payments>
          <div />
        )}
      </div>
    </div>
  );
}
