import { SPOTIFY_ARTIST_ID_LENGTH } from "@/constants/SpotifyConstants";
import { z } from "zod";

export const spotifyArtistCardDto = z.object({
  id: z.string().length(SPOTIFY_ARTIST_ID_LENGTH),
  name: z.string(),
  img: z.string().url().nullable(),
  followers: z.number(),
  pop: z.number(),
  genres: z.array(z.string()),
  url: z.string().url(),
  alt: z.string(),
});

export type SpotifyArtistCard = z.infer<typeof spotifyArtistCardDto>;
