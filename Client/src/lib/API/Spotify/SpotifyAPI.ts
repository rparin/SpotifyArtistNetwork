import { spotifyAPI } from "./axios";

export const fetchSearchResults = async (
  artist: string,
  accessToken: string
) => {
  const res = await spotifyAPI.get(
    `/api/spotify/search/${artist}/${accessToken}`
  );
  return res.data;
};

export const fetchNextPageSearchResults = async (
  url: string,
  accessToken: string
) => {
  const res = await spotifyAPI.get(
    `/api/spotify/search/page/${url}/${accessToken}`
  );
  return res.data;
};
