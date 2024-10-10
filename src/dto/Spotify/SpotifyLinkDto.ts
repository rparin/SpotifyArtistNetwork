import { SPOTIFY_ARTIST_ID_LENGTH } from "@/constants/SpotifyConstants";
import { z } from "zod";

export const spotifyLinkDto = z.object({
  source: z.string().length(SPOTIFY_ARTIST_ID_LENGTH),
  target: z.string().length(SPOTIFY_ARTIST_ID_LENGTH),
});

export const spotifyLinkItemArrayDto = z.array(spotifyLinkDto);

export type SpotifyLinkItem = z.infer<typeof spotifyLinkDto>;
export type SpotifyLinkItemArray = z.infer<typeof spotifyLinkItemArrayDto>;
