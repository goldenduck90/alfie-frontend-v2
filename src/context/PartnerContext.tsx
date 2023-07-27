import React, { useState, createContext, useContext } from "react";
import { SignupPartner, SignupPartnerProvider } from "@src/graphql/generated";

type PartnerType = SignupPartner & { providers: SignupPartnerProvider[] };

type PartnerContextType = {
  partner?: PartnerType;
  setPartner: (partner: PartnerType) => void;
};

const InitialState = {
  setPartner: () => {},
};

export const PartnerContext = createContext<PartnerContextType>(InitialState);

export const PartnerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [partner, setPartner] = useState<PartnerType>();

  return (
    <PartnerContext.Provider value={{ partner, setPartner }}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartnerContext = () => useContext(PartnerContext);
