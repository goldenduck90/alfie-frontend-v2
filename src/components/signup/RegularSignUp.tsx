import React from "react";
import { usePartnerContext } from "@src/context/PartnerContext";
import { PreCheckout } from "./multiStep/PreCheckout";
import { Loading } from "../Loading";

export function RegularSignUp() {
  const { loading } = usePartnerContext();

  if (loading) return <Loading />;

  return <PreCheckout />;
}

export default RegularSignUp;
