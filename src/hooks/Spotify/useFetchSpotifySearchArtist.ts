import { useInfiniteQuery } from "@tanstack/react-query";
import fetchSpotifySearchArtist from "@/actions/Spotify/fetchSpotifySearchArtist";
import { SpotifySearchArtist } from "@/schema/Spotify/SpotifySearchArtistSchema";

const useFetchSpotifySearchArtist = (
  accessToken: string | null | undefined,
  searchQuery: string
) => {
  return useInfiniteQuery({
    // The query will not execute until the accessToken exists
    enabled: !!accessToken,
    queryKey: ["search", searchQuery],
    initialPageParam: searchQuery,
    queryFn: async (params) => {
      return fetchSpotifySearchArtist(accessToken as string, params.pageParam);
    },
    getNextPageParam: (res: SpotifySearchArtist) => {
      return res.next;
    },
    staleTime: 3000000, //cache data for 50 minutes
  });
};

export default useFetchSpotifySearchArtist;
