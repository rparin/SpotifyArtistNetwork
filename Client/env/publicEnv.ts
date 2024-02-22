import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_CLIENT_URL: z.string().url({ message: "Invalid CLIENT URL" }),
  NEXT_PUBLIC_SERVER_URL: z.string().url({ message: "Invalid SERVER URL" }),
  NEXT_PUBLIC_ARTIST_NODE_DEPTH: z.coerce.number().gt(0).lt(5),
});

export const publicParsedEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_ARTIST_NODE_DEPTH: process.env.NEXT_PUBLIC_ARTIST_NODE_DEPTH,
});
