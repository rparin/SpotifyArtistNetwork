"use server";

import {
  SpotifyArtist,
  spotifyArtistSchema,
} from "@/schema/Spotify/SpotifyArtistSchema";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";

const fetchSpotifyArtist = async (
  accessToken: string,
  id: string
): Promise<SpotifyArtist> => {
  return await fetchWithErrorHandling({
    fetchUrl: `https://api.spotify.com/v1/artists/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    fetchErrorStr: "Spotify Artist: Fetch Error",
    resErrorStr: "Spotify Artist: Response Error",
    zodErrorStr: "Spotify Artist: Invalid API Response format",
    zodSchema: spotifyArtistSchema,
  });
};

export default fetchSpotifyArtist;
