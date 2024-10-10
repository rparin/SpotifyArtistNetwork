"use server";

import {
  SpotifyRelatedArtist,
  spotifyRelatedArtistsSchema,
} from "@/schema/Spotify/SpotifyRelatedArtistSchema";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";

const fetchSpotifyRelatedArtists = async (
  accessToken: string,
  artistId: string
) => {
  const data: SpotifyRelatedArtist = await fetchWithErrorHandling({
    fetchUrl: `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    fetchErrorStr: "Spotify Related Artist: Fetch Error",
    resErrorStr: "Spotify Related Artist: Fetch Error",
    zodErrorStr: "Spotify Related Artist: Response Error",
    zodSchema: spotifyRelatedArtistsSchema,
  });
  return data.artists;
};

export default fetchSpotifyRelatedArtists;
