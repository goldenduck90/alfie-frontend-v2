import { ApolloError } from "@apollo/client"

const parseError = (error: unknown): string => {
  if (error instanceof ApolloError) {
    const { graphQLErrors } = error
    if (graphQLErrors) {
      return graphQLErrors[0].message
    }
  } else if (error instanceof Error) {
    return error.message
  }

  console.error(error)
  return "An unknown error occurred"
}

export { parseError }
