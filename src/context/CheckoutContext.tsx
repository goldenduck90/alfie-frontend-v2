import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { Checkout } from "@src/graphql/generated";

type CheckoutContextType = {
  loading: boolean;
};

const initialValues: CheckoutContextType = {
  loading: false,
};
const CheckoutContext = createContext(initialValues);

type CheckoutProviderProps = {
  children: React.ReactNode;
};
const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const router = useRouter();
  const checkoutId = router.query.id;

  const [loading, setLoading] = useState(false);
  const [checkout, setCheckout] = useState<Checkout>();

  return (
    <CheckoutContext.Provider value={{ loading }}>
      {children}
    </CheckoutContext.Provider>
  );
};
