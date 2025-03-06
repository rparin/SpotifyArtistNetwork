"use server";

import parsedEnv from "@env/env";
import { spotifyTokenSchema } from "@/schema/Spotify/SpotifyTokenSchema";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";
import handleEncryption from "@/utils/Crypto/encrypt";

const fetchSpotifyToken = async () => {
  const spotifyToken = await fetchWithErrorHandling({
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
  return await handleEncryption(spotifyToken);
};

export default fetchSpotifyToken;
