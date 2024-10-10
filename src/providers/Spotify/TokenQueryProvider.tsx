import { ReactNode } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import fetchSpotifyToken from "@/actions/Spotify/fetchSpotifyToken";

export default async function TokenQuery({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["token"],
    queryFn: async () => {
      // return null;
      return await fetchSpotifyToken();
    },
    staleTime: 60000, //cache token for 50 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
