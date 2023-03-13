import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { Billing } from "../old/oldpatient/billing/Billings";

export function EmbeddedStripeView() {
  const [hasError, setHasError] = useState(false);
  const { user } = useCurrentUserStore();

  const fetchClientSecret = async () => {
    console.log(user?.stripeSubscriptionId, user?.stripeCustomerId);
    // Fetch the AccountSession client secret
    const response = await fetch("/api/stripe_session", {
      method: "POST",
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
    window.StripeConnect = window.StripeConnect || {};
    (async () => {
      const clientSecret = await fetchClientSecret();
      if (clientSecret) {
        // Initialize StripeConnect after the window loads
        window.StripeConnect.onLoad = () => {
          window.StripeConnect.init({
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
        {hasError ? (
          <Billing />
        ) : (
          <stripe-connect-payments></stripe-connect-payments>
        )}
      </div>
    </div>
  );
}
