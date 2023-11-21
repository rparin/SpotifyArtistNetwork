import { spotifyAPI } from "./axios";

export interface ClientToken {
  access_token: string;
  obtained_at: number;
}

export const fetchSearchResults = async (
  artist: string,
  page: string | null | undefined,
  accessToken: string,
  controller: AbortController
) => {
  const res = await spotifyAPI.get(
    `/api/spotify/search/${artist}/${page}/${accessToken}`,
    { signal: controller.signal }
  );
  return res.data;
};

export const checkClientToken = async (cToken: ClientToken | null) => {
  let curDate = new Date().getTime();
  //Get new token after 40 minutes
  if (!cToken || curDate - cToken?.obtained_at >= 2400000) {
    const res = await spotifyAPI.get("/api/spotify/cAuthToken");
    if (res.data.error) return null;
    return {
      access_token: res.data.access_token,
      obtained_at: new Date().getTime(),
    };
  }

  return cToken;
};
