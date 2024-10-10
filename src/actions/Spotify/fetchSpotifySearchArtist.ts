"use server";

import {
  SpotifySearchArtist,
  SpotifySearchArtistObject,
  spotifySearchArtistObjectSchema,
} from "@/schema/Spotify/SpotifySearchArtistSchema";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";
import isValidHttpsUrl from "@/utils/isValidHttpsUrl";

const fetchSpotifySearchArtist = async (
  accessToken: string,
  searchQuery: string
): Promise<SpotifySearchArtist> => {
  const url = isValidHttpsUrl(searchQuery)
    ? searchQuery
    : `https://api.spotify.com/v1/search?${new URLSearchParams({
        type: "artist",
        q: searchQuery,
      })}`;
  const data: SpotifySearchArtistObject = await fetchWithErrorHandling({
    fetchUrl: url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    fetchErrorStr: "Spotify Search Artist: Fetch Error",
    resErrorStr: "Spotify Search Artist: Fetch Error",
    zodErrorStr: "Spotify Search Artist: Response Error",
    zodSchema: spotifySearchArtistObjectSchema,
  });
  return data.artists;
};

export default fetchSpotifySearchArtist;
