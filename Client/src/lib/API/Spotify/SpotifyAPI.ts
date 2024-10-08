import { spotifyAPI } from "./axios";
import {
  spotifyCTokenSchema,
  spotifySearchResultSchema,
  spotifyNetworkSchema,
} from "./SpotifySchema";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

const fetchClientToken = async () => {
  const res = await spotifyAPI.get("/api/spotify/cAuthToken");
  const result = spotifyCTokenSchema.safeParse(res.data);

  if (!result.success) {
    throw new Error("Invalid cToken");
  } else {
    return res.data;
  }
};

const fetchSearchResults = async (
  artist: string,
  page: string | null | undefined,
  accessToken: string
) => {
  const res = await spotifyAPI.get(
    `/api/spotify/search/${artist}/${page}/${accessToken}`
  );

  const result = spotifySearchResultSchema.safeParse(res.data.artists);
  if (!result.success) {
    throw new Error("Invalid result format");
  } else {
    return res.data;
  }
};

const fetchArtistNetwork = async (
  id: string,
  depth: string,
  accessToken: string
) => {
  const res = await spotifyAPI.get(
    `/api/spotify/relatedMap/${id}/${depth}/${accessToken}`
  );
  const result = spotifyNetworkSchema.safeParse(res.data);
  if (!result.success) {
    throw new Error("Invalid network format");
  } else {
    return res.data;
  }
};

const fetchMyFollowingArtists = async (accessToken: string) => {
  const res = await spotifyAPI.get(
    `/api/spotify/myFollowingArtists/${accessToken}`
  );
  return res.data;
};

export const useSpotifyCToken = (enabled: boolean) => {
  const cToken = useQuery({
    enabled: enabled,
    queryKey: ["cToken"],
    queryFn: fetchClientToken,
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
      return fetchMyFollowingArtists(accessToken);
    },
    staleTime: 3000000, //cache data for 50 minutes
  });
  return cToken;
};

export const useGetNetworkQuery = (
  enabled: boolean,
  artistId: string,
  depth: string,
  accessToken: string
) =>
  useQuery({
    enabled: enabled,
    queryKey: ["network", artistId],
    queryFn: async () => {
      return fetchArtistNetwork(artistId, depth, accessToken);
    },
    staleTime: 1800000, //cache network data for 30 minutes
  });

export const useGetSearchQuery = (
  enabled: boolean,
  query: string,
  accessToken: string
) => {
  const parseNextPage = (nextPage: string) => {
    const searchParams = new URLSearchParams(nextPage);
    return `query=${query}&type=artist&offset=${searchParams.get(
      "offset"
    )}&limit=${searchParams.get("limit")}`;
  };
  return useInfiniteQuery({
    enabled: enabled,
    queryKey: ["query", query],
    queryFn: (params: any) => {
      return fetchSearchResults(query, params.pageParam, accessToken);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: any) => {
      if (lastPage.artists.next == null) return null;
      return parseNextPage(lastPage.artists.next);
    },
    staleTime: 600000, //cache search for 10 minutes
  });
};
