"use client";
import ArtistGraph from "@/components/ArtistGraph/ArtistGraphWrapper";
import LoadingForceGraph from "@/components/LoadingGraph/LoadingGraphWrapper";
import GraphError from "@/components/GraphError";
import { useSpotifyCToken } from "@/lib/API/Spotify/SpotifyAPI";
import { useGetNetworkQuery } from "@/lib/API/Spotify/SpotifyAPI";

export default function ArtistNetwork(props: { id?: string | undefined }) {
  const DEPTH = `${process.env.NEXT_PUBLIC_ARTIST_NODE_DEPTH}`;
  const cTokenQuery = useSpotifyCToken(!(props.id === undefined));
  const networkQuery = useGetNetworkQuery(
    !!cTokenQuery.data && !(props.id === undefined),
    props?.id as string,
    DEPTH as string,
    cTokenQuery.data
  );

  if (cTokenQuery.isLoading || networkQuery.isLoading) {
    return <LoadingForceGraph />;
  }

  if (cTokenQuery.isError || networkQuery.isError || !networkQuery.data) {
    return <GraphError errorMsg="Issue fetching artist network..." />;
  }

  return <ArtistGraph graphData={networkQuery.data} />;
}
