import { CheckoutPayment } from "@src/components/old/signup/partner/CheckoutPayment";
import { StripeWrapper } from "@src/components/old/signup/partner/StripeWrapper";

function CheckoutPaymentPage() {
  return (
    <StripeWrapper>
      <CheckoutPayment />
    </StripeWrapper>
  );
}
CheckoutPaymentPage.isAuthRequired = false;
export default CheckoutPaymentPage;
