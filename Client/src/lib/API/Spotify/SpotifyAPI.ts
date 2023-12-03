import { spotifyAPI } from "./axios";
import { useQuery } from "@tanstack/react-query";

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

export const getClientToken = async () => {
  const res = await spotifyAPI.get("/api/spotify/cAuthToken");
  return res.data;
};

export const getMyFollowingArtists = async (accessToken: string) => {
  const res = await spotifyAPI.get(
    `/api/spotify/myFollowingArtists/${accessToken}`
  );
  return res.data;
};

export const checkClientToken = async (cToken: ClientToken | null) => {
  let curDate = new Date().getTime();
  //Get new token after 40 minutes
  if (!cToken || curDate - cToken?.obtained_at >= 2400000) {
    const res = await getClientToken();
    if (!res) return null;
    return {
      access_token: res,
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
  const res = await spotifyAPI.get(
    `/api/spotify/relatedMap/${id}/${depth}/${accessToken}`
  );
  return res.data;
};

export const useSpotifyCToken = (enabled: boolean) => {
  const cToken = useQuery({
    enabled: enabled,
    queryKey: ["cToken"],
    queryFn: getClientToken,
    refetchOnWindowFocus: true,
    refetchInterval: 3000000, //grab new token every 50 minutes
    staleTime: 3000000, //cache token for 50 minutes
  });
  return cToken;
};

export const useGetFollowingArtists = (
  enabled: boolean,
  accessToken: string
) => {
  const cToken = useQuery({
    enabled: enabled,
    queryKey: ["followingArtists"],
    queryFn: () => {
      return getMyFollowingArtists(accessToken);
    },
    staleTime: 3000000, //cache data for 50 minutes
  });
  return cToken;
};
