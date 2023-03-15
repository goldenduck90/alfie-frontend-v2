import { CheckoutPayment } from "@src/components/old/signup/CheckoutPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_URL || "");

function CheckoutPaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPayment />
    </Elements>
  );
}
CheckoutPaymentPage.isAthRequired = false;
export default CheckoutPaymentPage;
