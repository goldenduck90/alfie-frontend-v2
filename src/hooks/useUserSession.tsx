import { User } from "@src/graphql/generated";
import { QueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCurrentUserStore } from "./useCurrentUser";

export function useSession() {
  return useMutation(
    async () => {
      const res = await fetch("/api/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { user } = await res.json();
      return user;
    },
    {
      onSuccess: (data) => {
        // console.log({ data });
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );
}

export function useUserSession<R extends boolean = false>({
  required,
  redirectTo = "/",
  queryConfig,
}: {
  /** If set to `true`, the returned session is guaranteed to not be `null` */
  required?: R;
  /** If `required: true`, the user will be redirected to this URL, if they don't have a session */
  redirectTo?: string;
  queryConfig?: QueryOptions<{ user: User | undefined }>;
} = {}) {
  const router = useRouter();
  const session = useSession();

  const { data, status } = useQuery(
    ["session"],
    async () => {
      try {
        const user: any = await session.mutateAsync();
        return { user };
      } catch (e) {
        return { user: undefined };
      }
    },
    {
      onSettled(data, error) {
        if (data?.user?._id || !required) {
          useCurrentUserStore.getState().setUser(data?.user as any);
          return;
        }
        router.replace(redirectTo);
      },
      ...queryConfig,
      /**
       * Stale time tells this to refetch and check user session after 10 minutes
       * Cache time says to remove this completely after 10 minutes if not in use.
       * So technically cacheTime should never be reached.
       */
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true,
      cacheTime: 1000 * 60 * 10,
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 401) {
          return false;
        }
        return failureCount < 3;
      },
    }
  );

  return [data, status === "loading"] as const;
}
