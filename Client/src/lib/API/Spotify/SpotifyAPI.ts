import { spotifyAPI } from "./axios";

export const fetchSearchResults = async (
  artist: string,
  accessToken: string
) => {
  try {
    const res = await spotifyAPI.get(
      `/api/spotify/search/${artist}/${accessToken}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
