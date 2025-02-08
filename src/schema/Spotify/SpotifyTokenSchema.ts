import { z } from "zod";
import { TOKEN_LENGTH } from "@/constants/SpotifyConstants";

export const spotifyTokenSchema = z.object({
  access_token: z
    .string()
    .length(TOKEN_LENGTH, { message: "Invalid token length" })
    .nullable(),
  token_type: z.literal("Bearer"),
  expires_in: z.number(),
});

export type SpotifyToken = z.infer<typeof spotifyTokenSchema>;
