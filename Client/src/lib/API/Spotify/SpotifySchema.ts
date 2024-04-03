import { z } from "zod";

export const spotifyCTokenSchema = z
  .string()
  .length(115, { message: "Invalid token length" });

const spotifyArtistItemSchema = z.object({
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

export const spotifySearchResultSchema = z.object({
  href: z.string().url(),
  items: z.array(spotifyArtistItemSchema),
  limit: z.number(),
  next: z.string().url().nullable(),
  offset: z.number(),
  previous: z.string().url().nullable(),
  total: z.number(),
});

export type spotifyArtistItem = z.infer<typeof spotifyArtistItemSchema>;
export type spotifySearchResult = z.infer<typeof spotifySearchResultSchema>;
