import { useQuery } from "@tanstack/react-query";
import fetchSpotifyRelatedArtists from "@/actions/Spotify/fetchSpotifyRelatedArtists";

const useFetchSpotifyRelatedArtists = (
  accessToken: string | null | undefined,
  id: string
) => {
  return useQuery({
    // The query will not execute until the accessToken exists
    enabled: !!accessToken,
    queryKey: ["related", id],
    queryFn: async () => {
      return fetchSpotifyRelatedArtists(accessToken as string, id);
    },
    staleTime: 3000000, //cache data for 50 minutes
  });
};

export default useFetchSpotifyRelatedArtists;
