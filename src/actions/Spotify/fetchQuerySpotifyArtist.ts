"use server";

import { QueryClient } from "@tanstack/react-query";
import fetchSpotifyArtist from "./fetchSpotifyArtist";

const fetchQuerySpotifyArtist = async (accessToken: string, id: string) => {
  const queryClient = new QueryClient();
  return await queryClient.fetchQuery({
    queryKey: ["artist", id],
    queryFn: async () => {
      return fetchSpotifyArtist(accessToken as string, id);
    },
    staleTime: 3000000, //cache data for 50 minutes
  });
};

export default fetchQuerySpotifyArtist;
