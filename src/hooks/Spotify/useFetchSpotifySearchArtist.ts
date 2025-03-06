import { useInfiniteQuery } from "@tanstack/react-query";
import fetchSpotifySearchArtist from "@/actions/Spotify/fetchSpotifySearchArtist";
import { SpotifySearchArtist } from "@/schema/Spotify/SpotifySearchArtistSchema";
import { EncryptedPayload } from "@/utils/Crypto/types";

const useFetchSpotifySearchArtist = (
  encryptedToken: EncryptedPayload | undefined,
  searchQuery: string
) => {
  return useInfiniteQuery({
    // The query will not execute until the encryptedToken exists
    enabled: !!encryptedToken,
    queryKey: ["search", searchQuery],
    initialPageParam: searchQuery,
    queryFn: async (params) => {
      return fetchSpotifySearchArtist(
        encryptedToken as EncryptedPayload,
        params.pageParam
      );
    },
    getNextPageParam: (res: SpotifySearchArtist) => {
      return res.next;
    },
    staleTime: 3000000, //cache data for 50 minutes
  });
};

export default useFetchSpotifySearchArtist;
