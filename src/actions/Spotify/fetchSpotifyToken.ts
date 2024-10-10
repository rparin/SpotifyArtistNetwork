"use server";

import parsedEnv from "@env/env";
import {
  SpotifyToken,
  spotifyTokenSchema,
} from "@/schema/Spotify/SpotifyTokenSchema";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";

const fetchSpotifyToken = async (): Promise<SpotifyToken> => {
  return await fetchWithErrorHandling({
    fetchUrl: `https://accounts.spotify.com/api/token`,
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        parsedEnv.SPOTIFY_CLIENT_ID + ":" + parsedEnv.SPOTIFY_CLIENT_SECRET
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    fetchErrorStr: "Spotify Token: Fetch Error",
    resErrorStr: "Spotify Token: Response Error",
    zodErrorStr: "Spotify Token: Invalid API Response format",
    zodSchema: spotifyTokenSchema,
  });
};

export default fetchSpotifyToken;
