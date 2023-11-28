import { spotifyAPI } from "./axios";

export interface ClientToken {
  access_token: string;
  obtained_at: number;
}

export const fetchSearchResults = async (
  artist: string,
  page: string | null | undefined,
  accessToken: string
) => {
  const res = await spotifyAPI.get(
    `/api/spotify/search/${artist}/${page}/${accessToken}`
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

export const fetchArtistNetwork = async (
  id: string,
  depth: string,
  accessToken: string
) => {
  try {
    const res = await spotifyAPI.get(
      `/api/spotify/relatedMap/${id}/${depth}/${accessToken}`
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
