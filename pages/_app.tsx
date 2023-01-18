import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "../src/hooks/useAuth";
import { IntercomProvider } from "react-use-intercom";
import { client } from "../src/graphql";
import { ShowNotification } from "../src/components/ShowNotifications";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
    isAuthRequired?: boolean;
  };
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const isAuthRequired = Component.isAuthRequired ?? false;

  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  const [queryClient] = React.useState(() => new QueryClient());

  return getLayout(
    <>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <AuthProvider //isAuthRequired={isAuthRequired}
          >
            <IntercomProvider
              appId={process.env.REACT_APP_INTERCOM_APP_ID || ""}
            >
              <Component {...pageProps} />
              <ShowNotification />
            </IntercomProvider>
          </AuthProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </>
  );
}
