import { spotifyAPI } from "./axios";

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
