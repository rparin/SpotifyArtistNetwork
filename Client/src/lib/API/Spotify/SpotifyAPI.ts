import { spotifyAPI } from "./axios";

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
