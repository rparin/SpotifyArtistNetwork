import { z } from "zod";
import { spotifyArtistArraySchema } from "./SpotifyArtistSchema";

export const spotifySearchArtistSchema = z.object({
  href: z.string().url(),
  items: spotifyArtistArraySchema,
  limit: z.number(),
  next: z.string().url().nullable(),
  offset: z.number(),
  previous: z.string().url().nullable(),
  total: z.number(),
});

export const spotifySearchArtistObjectSchema = z.object({
  artists: spotifySearchArtistSchema,
});

export type SpotifySearchArtist = z.infer<typeof spotifySearchArtistSchema>;
export type SpotifySearchArtistObject = z.infer<
  typeof spotifySearchArtistObjectSchema
>;
