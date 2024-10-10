import { z } from "zod";
import { spotifyArtistArraySchema } from "./SpotifyArtistSchema";

export const spotifyRelatedArtistsSchema = z.object({
  artists: spotifyArtistArraySchema,
});

export type SpotifyRelatedArtist = z.infer<typeof spotifyRelatedArtistsSchema>;
