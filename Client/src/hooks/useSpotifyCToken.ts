import { useQuery } from "@tanstack/react-query";
import { getClientToken } from "@/lib/API/Spotify/SpotifyAPI";

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
