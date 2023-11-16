import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "../src/context/SessionContext";
import { IntercomProvider } from "react-use-intercom";
import { client } from "../src/graphql";
import { ShowNotification } from "../src/components/ShowNotifications";
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from "@tanstack/react-query";
import { SeoHeader } from "@src/components/seo/SeoHeader";
import { PartnerProvider } from "@src/context/PartnerContext";
import useRedirectHttps from "@src/hooks/useRedirectHttps";

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
    isAuthRequired?: boolean;
  };
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const redirect = useRedirectHttps()
  console.log(redirect)

  const isAuthRequired = Component.isAuthRequired ?? false;

  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  const [queryClient] = React.useState(() => new QueryClient());
  const ComponentWithLayout = getLayout(<Component {...pageProps} />);


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ApolloProvider client={client}>
            <SessionProvider authRequired={isAuthRequired}>
              <IntercomProvider
                appId={process.env.REACT_APP_INTERCOM_APP_ID || ""}
              >
                <PartnerProvider>
                  <SeoHeader />
                  {ComponentWithLayout}
                  <ShowNotification />
                </PartnerProvider>
              </IntercomProvider>
            </SessionProvider>
          </ApolloProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
