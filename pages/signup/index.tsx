import React, { useEffect } from "react";
import { useRouter } from "next/router";
import RegularSignUp from "@src/components/signup/RegularSignUp";

function RegularSignUpPage() {
  const router = useRouter();

  useEffect(() => {
    const partner = localStorage.getItem("partner");
    if (partner) {
      router.push(`/signup/${partner}`);
    }
  }, [router]);

  return <RegularSignUp />;
}

RegularSignUpPage.isAuthRequired = false;

export default RegularSignUpPage;
