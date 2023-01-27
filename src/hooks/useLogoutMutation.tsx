import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCurrentUserStore } from "./useCurrentUser";

export function useLogoutMutation() {
  const { clear } = useCurrentUserStore();
  const router = useRouter();

  return useMutation(
    async () => {
      return await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: (data) => {
        router.replace("/");
        clear();
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );
}
