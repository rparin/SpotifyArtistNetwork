import { useQuery } from "@tanstack/react-query";
import createArtistNetwork from "@/services/Spotify/CreateArtistNetwork";

const useCreateArtistNetwork = (
  accessToken: string | null | undefined,
  id: string,
  depth: number = 4
) => {
  return useQuery({
    // The query will not execute until the accessToken exists
    enabled: !!accessToken,
    queryKey: ["network", id],
    queryFn: () => {
      return createArtistNetwork(accessToken as string, id, depth);
    },
    staleTime: 3000000, //cache data for 50 minutes
  });
};

export default useCreateArtistNetwork;
