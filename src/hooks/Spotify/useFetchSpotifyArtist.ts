import { useQuery } from "@tanstack/react-query";
import fetchSpotifyArtist from "@/actions/Spotify/fetchSpotifyArtist";

const useFetchSpotifyArtist = (
  accessToken: string | null | undefined,
  id: string
) => {
  return useQuery({
    // The query will not execute until the accessToken exists
    enabled: !!accessToken,
    queryKey: ["artist", id],
    queryFn: async () => {
      return fetchSpotifyArtist(accessToken as string, id);
    },
    staleTime: 3000000, //cache data for 50 minutes
  });
};

export default useFetchSpotifyArtist;
