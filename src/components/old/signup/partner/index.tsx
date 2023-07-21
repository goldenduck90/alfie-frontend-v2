import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { usePartnerContext } from "@src/context/PartnerContext";
import PreCheckout from "./PreCheckout";
import { Loading } from "../../Loading";

const getSignupPartnerQuery = gql`
  query getSignupPartnerByTitle($title: String!) {
    getSignupPartnerByTitle(title: $title) {
      partner {
        _id
        title
        logoUrl
      }
      partnerProviders {
        _id
        title
      }
    }
  }
`;

export function PartnerSignUpPage() {
  const router = useRouter();
  const { setPartner } = usePartnerContext();
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
      } else router.push("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching, error]);

  return <>{loading ? <Loading /> : <PreCheckout />}</>;
}
