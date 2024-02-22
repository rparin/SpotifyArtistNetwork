import { z } from "zod";

const envSchema = z.object({
  UPSTASH_REDIS_REST_URL: z
    .string()
    .url({ message: "Invalid UPSTASH REDIS REST URL" }),
  UPSTASH_REDIS_REST_TOKEN: z
    .string()
    .length(100, { message: "Must be exactly 100 characters long" }),
  RATE_TOKENS: z.coerce.number().gt(0),
  RATE_WINDOW: z.string(),
});

export const parsedEnv = envSchema.parse({
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  RATE_TOKENS: process.env.RATE_TOKENS,
  RATE_WINDOW: process.env.RATE_WINDOW,
});
