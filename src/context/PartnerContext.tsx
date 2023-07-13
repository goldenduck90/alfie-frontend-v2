import React, { useState, createContext, useContext } from "react";
import { SignupPartner } from "@src/graphql/generated";

type PartnerContextType = {
  partner: SignupPartner | null;
  setPartner: (partner: SignupPartner) => void;
};

export const PartnerContext = createContext<PartnerContextType>({
  partner: null,
  setPartner: () => {},
});

export const PartnerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [partner, setPartner] = useState<SignupPartner | null>(null);

  return (
    <PartnerContext.Provider value={{ partner, setPartner }}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartnerContext = () => useContext(PartnerContext);
