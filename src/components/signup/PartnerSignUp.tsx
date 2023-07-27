import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { usePartnerContext } from "@src/context/PartnerContext";
import SingleStepPreCheckout from "./singleStep/PreCheckout";
import MultiStepPreCheckout from "./multiStep/PreCheckout";
import { Loading } from "../Loading";
import { FlowType } from "@src/graphql/generated";

const getSignupPartnerQuery = gql`
  query getSignupPartnerByTitle($title: String!) {
    getSignupPartnerByTitle(title: $title) {
      partner {
        _id
        title
        logoUrl
        flowType
      }
      partnerProviders {
        _id
        title
      }
    }
  }
`;

export function PartnerSignUp() {
  const router = useRouter();
  const { partner: signupPartner, setPartner } = usePartnerContext();
  const [loading, setLoading] = useState(true);
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
      if (!error) {
        setPartner({
          ...data.getSignupPartnerByTitle.partner,
          providers: data.getSignupPartnerByTitle.partnerProviders,
        });
        setLoading(false);
      } else {
        localStorage.removeItem("partner");
        router.push("/signup");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching, error]);

  if (loading) return <Loading />;

  return (
    <>
      {signupPartner?.flowType === FlowType.SingleStep ? (
        <SingleStepPreCheckout />
      ) : (
        <MultiStepPreCheckout />
      )}
    </>
  );
}

export default PartnerSignUp;
