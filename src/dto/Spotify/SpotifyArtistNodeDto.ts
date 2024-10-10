import { SPOTIFY_ARTIST_ID_LENGTH } from "@/constants/SpotifyConstants";
import { z } from "zod";

export const spotifyArtistNodeDto = z.object({
  id: z.string().length(SPOTIFY_ARTIST_ID_LENGTH),
  name: z.string(),
  img: z.string().url().nullable(),
  followers: z.number(),
  pop: z.number(),
  genres: z.array(z.string()),
  size: z.number(),
  url: z.string().url(),
  type: z.string(),
});

export const spotifyArtistNodeArrayDto = z.array(spotifyArtistNodeDto);

export type SpotifyArtistNode = z.infer<typeof spotifyArtistNodeDto>;
export type SpotifyArtistNodeArray = z.infer<typeof spotifyArtistNodeArrayDto>;
