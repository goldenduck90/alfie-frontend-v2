import React, { useContext, useMemo } from "react";
import { useUserSession } from "@src/hooks/useUserSession";

const SessionContext = React.createContext<ReturnType<
  typeof useUserSession
> | null>(null);

export function SessionProvider({
  children,
  authRequired,
}: {
  children: React.ReactNode;
  authRequired?: boolean;
}) {
  const session = useUserSession({
    redirectTo: "/login",
    required: authRequired,
  });
  const [data, isLoading] = session;

  const isPending = useMemo(() => {
    return !data && isLoading;
  }, [data, isLoading]);

  if (isPending) return null;

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useUserStateContext() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("<Expected context to be initialized />");
  }

  return context;
}
