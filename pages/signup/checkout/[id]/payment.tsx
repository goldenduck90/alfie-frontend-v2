import { CheckoutPayment } from "@src/components/checkout/CheckoutPayment";
import { StripeWrapper } from "@src/components/checkout/StripeWrapper";

function CheckoutPaymentPage() {
  return (
    <StripeWrapper>
      <CheckoutPayment />
    </StripeWrapper>
  );
}
CheckoutPaymentPage.isAuthRequired = false;
export default CheckoutPaymentPage;
