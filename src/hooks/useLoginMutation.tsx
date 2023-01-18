import { useMutation } from "@tanstack/react-query";

export function useLoginMutation() {
  return useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      return await fetch("/api/login", {
        body: JSON.stringify({ email, password }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: (data) => {
        console.log("success", data);
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );
}
