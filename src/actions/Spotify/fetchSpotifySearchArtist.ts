"use server";

import {
  SpotifySearchArtist,
  SpotifySearchArtistObject,
  spotifySearchArtistObjectSchema,
} from "@/schema/Spotify/SpotifySearchArtistSchema";
import { SpotifyToken } from "@/schema/Spotify/SpotifyTokenSchema";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";
import { EncryptedPayload } from "@/utils/Crypto/types";
import handleDecryption from "@/utils/Crypto/decrypt";
import isValidHttpsUrl from "@/utils/isValidHttpsUrl";

const fetchSpotifySearchArtist = async (
  encryptedToken: EncryptedPayload,
  searchQuery: string
): Promise<SpotifySearchArtist> => {
  const url = isValidHttpsUrl(searchQuery)
    ? searchQuery
    : `https://api.spotify.com/v1/search?${new URLSearchParams({
        type: "artist",
        q: searchQuery,
      })}`;
  const tokenData = (await handleDecryption(encryptedToken)) as SpotifyToken;
  const data: SpotifySearchArtistObject = await fetchWithErrorHandling({
    fetchUrl: url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
    fetchErrorStr: "Spotify Search Artist: Fetch Error",
    resErrorStr: "Spotify Search Artist: Fetch Error",
    zodErrorStr: "Spotify Search Artist: Response Error",
    zodSchema: spotifySearchArtistObjectSchema,
  });
  return data.artists;
};

export default fetchSpotifySearchArtist;
