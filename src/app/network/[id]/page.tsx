"use client";

import publicParsedEnv from "@env/publicEnv";
import useFetchSpotifyToken from "@/hooks/Spotify/useFetchSpotifyToken";
import useCreateArtistNetwork from "@/hooks/Spotify/useCreateArtistNetwork";
import LoadingForceGraph from "@/components/ForceGraph/LoadingGraph/LoadingGraphWrapper";
import RelatedArtistGraph from "@/components/ForceGraph/RelatedArtistGraph/RelatedArtistGraphWrapper";

export default function NetworkPage({ params }: { params: { id: string } }) {
  const props = params.id.split("_");
  const artistName = props[0];
  const artistId = props[1];

  if (!artistName || !artistId) {
    throw new Error("Undefined Artist");
  }

  const DEPTH = publicParsedEnv.NEXT_PUBLIC_ARTIST_NODE_DEPTH;
  const tokenQuery = useFetchSpotifyToken();
  const networkQuery = useCreateArtistNetwork(
    tokenQuery.data?.access_token,
    artistId,
    DEPTH
  );

  if (tokenQuery.isError) {
    throw new Error("Authentication Error");
  }

  if (networkQuery.isError) {
    throw new Error("Network Fetch Error");
  }

  if (tokenQuery.isLoading || networkQuery.isLoading) {
    return <LoadingForceGraph />;
  }

  return (
    <>
      <div className="absolute top-16 z-40 flex w-full flex-col items-center gap-1 md:top-7">
        <h1 className="mr-7 line-clamp-1 text-xl">{`${artistName} Network`}</h1>
      </div>
      {networkQuery.data && (
        <RelatedArtistGraph graphData={networkQuery.data} />
      )}
    </>
  );
}
