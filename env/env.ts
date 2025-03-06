import { z } from "zod";

const envSchema = z.object({
  // UPSTASH_REDIS_REST_URL: z
  //   .string()
  //   .url({ message: "Invalid UPSTASH REDIS REST URL" }),
  // UPSTASH_REDIS_REST_TOKEN: z
  //   .string()
  //   .length(100, { message: "Must be exactly 100 characters long" }),
  // RATE_TOKENS: z.coerce.number().gt(0),
  // RATE_WINDOW: z.string(),
  SPOTIFY_CLIENT_ID: z
    .string()
    .length(32, { message: "Must be exactly 32 characters long" }),
  SPOTIFY_CLIENT_SECRET: z
    .string()
    .length(32, { message: "Must be exactly 32 characters long" }),
  CRYPTO_SECRET_KEY: z
    .string()
    .length(44, { message: "Must be exactly 44 characters long" }),
});

const parsedEnv = envSchema.parse({
  // UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  // UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  // RATE_TOKENS: process.env.RATE_TOKENS,
  // RATE_WINDOW: process.env.RATE_WINDOW,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
});

export default parsedEnv;
