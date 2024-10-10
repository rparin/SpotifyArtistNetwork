import { useQuery } from "@tanstack/react-query";
import fetchSpotifyToken from "@/actions/Spotify/fetchSpotifyToken";

const useFetchSpotifyToken = () => {
  return useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      return await fetchSpotifyToken();
    },
    refetchOnWindowFocus: true,
    refetchInterval: 3000000, //grab new token every 50 minutes
    staleTime: 3000000, //cache token for 50 minutes
  });
};

export default useFetchSpotifyToken;
