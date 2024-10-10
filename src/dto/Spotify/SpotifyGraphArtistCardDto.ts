import { z } from "zod";

export const spotifyGraphArtistCardDto = z.object({
  name: z.string(),
  img: z.string().url().nullable(),
  alt: z.string(),
  followers: z.number(),
  url: z.string().url(),
});

export type SpotifyGraphArtistCard = z.infer<typeof spotifyGraphArtistCardDto>;
