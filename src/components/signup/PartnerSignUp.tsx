import { usePartnerContext } from "@src/context/PartnerContext";
import SingleStepPreCheckout from "./singleStep/PreCheckout";
import MultiStepPreCheckout from "./multiStep/PreCheckout";
import { Loading } from "../Loading";
import { FlowType } from "@src/graphql/generated";

export function PartnerSignUp() {
  const { partner, loading } = usePartnerContext();

  if (loading) return <Loading />;

  return (
    <>
      {partner?.flowType === FlowType.SingleStep ? (
        <SingleStepPreCheckout />
      ) : (
        <MultiStepPreCheckout />
      )}
    </>
  );
}

export default PartnerSignUp;
