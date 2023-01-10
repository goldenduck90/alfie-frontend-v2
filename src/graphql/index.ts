import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API,
})

const unauthorizedLink = onError(({ networkError }) => {
  if (networkError?.message === "Failed to fetch") {
    window.location.href = `/login?redirect=${window.location.pathname}`
    localStorage.clear()
  }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")

  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  }
})

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([authLink, unauthorizedLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
})
