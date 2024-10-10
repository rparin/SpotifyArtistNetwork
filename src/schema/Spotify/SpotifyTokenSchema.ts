import { z } from "zod";

export const spotifyTokenSchema = z.object({
  access_token: z
    .string()
    .length(115, { message: "Invalid token length" })
    .nullable(),
  token_type: z.literal("Bearer"),
  expires_in: z.number(),
});

export type SpotifyToken = z.infer<typeof spotifyTokenSchema>;
