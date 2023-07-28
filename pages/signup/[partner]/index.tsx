import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PartnerSignUp from "@src/components/signup/PartnerSignUp";

function PartnerSignUpPage() {
  const router = useRouter();
  const { partner } = router.query;

  useEffect(() => {
    if (partner && typeof partner === "string") {
      localStorage.setItem("partner", partner);
    }
  }, [partner]);

  return <PartnerSignUp />;
}
PartnerSignUpPage.isAuthRequired = false;

export default PartnerSignUpPage;
