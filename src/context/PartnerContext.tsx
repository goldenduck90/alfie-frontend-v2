import React, { useState, createContext, useContext, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { SignupPartner, SignupPartnerProvider } from "@src/graphql/generated";
import { useRouter } from "next/router";

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

type PartnerType = SignupPartner & { providers: SignupPartnerProvider[] };

type PartnerContextType = {
  partner?: PartnerType;
  loading: boolean;
  setPartner: (partner: PartnerType) => void;
};

const InitialState = {
  loading: false,
  setPartner: () => {},
};

export const PartnerContext = createContext<PartnerContextType>(InitialState);

export const PartnerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [partnerTitle, setPartnerTitle] = useState("");
  const [partner, setPartner] = useState<PartnerType>();

  const [getSignupPartner, { data, loading, error }] = useLazyQuery(
    getSignupPartnerQuery,
    {
      variables: {
        title: partnerTitle,
      },
    }
  );

  useEffect(() => {
    if (partnerTitle) {
      getSignupPartner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerTitle]);

  useEffect(() => {
    const { partner: partnerTitleInQuery } = router.query;
    if (partnerTitleInQuery && typeof partnerTitleInQuery === "string") {
      localStorage.setItem("partner", partnerTitleInQuery);
      setPartnerTitle(partnerTitleInQuery);
    } else {
      const title = localStorage.getItem("partner");
      if (title) {
        setPartnerTitle(title);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (!loading && data) {
      if (!error) {
        setPartner({
          ...data.getSignupPartnerByTitle.partner,
          providers: data.getSignupPartnerByTitle.partnerProviders,
        });
      } else {
        localStorage.removeItem("partner");
        router.push("/signup");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, data]);

  return (
    <PartnerContext.Provider value={{ partner, loading, setPartner }}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartnerContext = () => useContext(PartnerContext);
