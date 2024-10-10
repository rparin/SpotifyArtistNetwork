import { z } from "zod";

export const spotifyArtistSchema = z.object({
  external_urls: z.object({
    spotify: z.string().url(),
  }),
  followers: z.object({
    href: z.string().url().nullable(),
    total: z.number(),
  }),
  genres: z.array(z.string()),
  href: z.string().url(),
  id: z.string(),
  images: z.array(
    z.object({
      height: z.number(),
      url: z.string().url(),
      width: z.number(),
    })
  ),
  name: z.string(),
  popularity: z.number(),
  type: z.string(),
  uri: z.string(),
});

export const spotifyArtistArraySchema = z.array(spotifyArtistSchema);

export type SpotifyArtistArray = z.infer<typeof spotifyArtistArraySchema>;

export type SpotifyArtist = z.infer<typeof spotifyArtistSchema>;
