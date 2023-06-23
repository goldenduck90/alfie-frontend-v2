import { CheckoutPayment } from "@src/components/old/signup/optavia/CheckoutPayment";
import { StripeWrapper } from "@src/components/old/signup/optavia/StripeWrapper";

function CheckoutPaymentPage() {
  return (
    <StripeWrapper>
      <CheckoutPayment />
    </StripeWrapper>
  );
}
CheckoutPaymentPage.isAuthRequired = false;
export default CheckoutPaymentPage;
