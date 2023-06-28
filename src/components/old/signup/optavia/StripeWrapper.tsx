import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { Loading } from "../../Loading";

import { useCheckoutQuery } from "@src/hooks/useCheckoutQuery";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export const StripeWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const id = router.query.id;

  const { loading, error, stripeClientSecret } = useCheckoutQuery(id);

  if (!id) {
    router.push("/signup");
  }

  if (loading) return <Loading />;

  if (error) {
    router.push("/");
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: stripeClientSecret }}
    >
      {children}
    </Elements>
  );
};
