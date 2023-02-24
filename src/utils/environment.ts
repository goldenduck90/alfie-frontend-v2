import { z } from "zod";

const environmentSchema = z.object({
  NEXT_PUBLIC_SENDBIRD_APP_ID: z.string().min(1, "Sendbird App ID is required"),
});

export const environment = environmentSchema.parse(process.env);
