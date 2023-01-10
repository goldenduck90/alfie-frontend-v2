import React, { useState } from "react";
import { Wrapper } from "../../src/components/layouts/Wrapper";
import { Logo } from "../../src/components/Logo";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../../src/components/Button";
import * as Sentry from "@sentry/react";

export const CheckoutPayment = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: process.env.REACT_APP_STRIPE_SUCCESS_URL || "",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      alert(result.error.message);
      Sentry.captureException(result.error);
    } else {
      Sentry.captureMessage(
        `Payment successful: ${JSON.stringify(result.error)}`,
        "info"
      );
      console.log(result);
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Logo />
      <div className="flex flex-col px-6 md:px-8 pt-8 pb-10 bg-white rounded-md space-y-5 min-w-full md:min-w-0 max-w-lg">
        <h1 className="pb-0 mb-0 mt-2 font-md font-mulish font-bold text-2xl text-indigo-800">
          Checkout
        </h1>

        <div className="flex flex-col  mb-5 md:mb-0">
          <p className="font-mulish text-gray-900 text-md font-bold mb-1">
            Your plan
          </p>
          <span className="font-mulish text-indigo-800 text-2xl font-bold">
            $120 monthly
          </span>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-lg">Payment Information</h2>
            <p className="font-mulish text-gray-900">
              Please provide your payment details below.
            </p>
          </div>

          <div className="flex flex-col">
            <PaymentElement />
          </div>

          <div className="pt-4 flex flex-col items-center">
            <Button
              fullWidth
              title="Subscribe"
              onPress={handleSubmit}
              disabled={loading}
              loading={loading}
              spinnerMl={3}
              spinnerSize={16}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
