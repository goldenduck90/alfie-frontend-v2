import { CheckoutPayment } from "@src/components/old/signup/CheckoutPayment";
import { StripeWrapper } from "@src/components/old/signup/StripeWrapper";

function CheckoutPaymentPage() {
  return (
    <StripeWrapper>
      <CheckoutPayment />
    </StripeWrapper>
  );
}
CheckoutPaymentPage.isAuthRequired = false;
export default CheckoutPaymentPage;
