import { CheckoutPayment } from "@src/components/old/signup/CheckoutPayment";
import { StripeWrapper } from "@src/components/old/signup/StripeWrapper";

function CheckoutPaymentPage() {
  return (
    <StripeWrapper>
      <CheckoutPayment />
    </StripeWrapper>
  );
}
CheckoutPaymentPage.isAthRequired = false;
export default CheckoutPaymentPage;
