import { useMutation } from "@tanstack/react-query";

export function useLoginMutation() {
  return useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const result = await fetch("/api/login", {
        body: JSON.stringify({ email, password }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        return result.json();
      }

      const error = await result.json();
      throw new Error(error?.message || "Authentication failed");
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
