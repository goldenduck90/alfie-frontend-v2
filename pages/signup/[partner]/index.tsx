import React from "react";
import { PartnerSignUpPage } from "@src/components/old/signup/partner";

function PartnerSignUp() {
  return <PartnerSignUpPage />;
}
PartnerSignUp.isAuthRequired = false;

export default PartnerSignUp;
