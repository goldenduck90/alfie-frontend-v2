import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { usePartnerContext } from "@src/context/PartnerContext";
import PreCheckout from "./PreCheckout";
import { Loading } from "../../Loading";

const getSignupPartnerQuery = gql`
  query getSignupPartnerByTitle($title: String!) {
    getSignupPartnerByTitle(title: $title) {
      _id
      title
      logoUrl
    }
  }
`;

export function PartnerSignUpPage() {
  const router = useRouter();
  const { setPartner } = usePartnerContext();

  const { partner } = router.query;

  const {
    data,
    loading: fetching,
    error,
  } = useQuery(getSignupPartnerQuery, {
    variables: {
      title: partner,
    },
  });

  useEffect(() => {
    if (!fetching) {
      if (!error) setPartner(data.getSignupPartnerByTitle);
      else router.push("/signup");
    }
  }, [fetching, error]);

  return <>{fetching ? <Loading /> : <PreCheckout />}</>;
}
