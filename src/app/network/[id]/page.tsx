"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import delay from "@/utils/delay";
import { SPOTIFY_DEP_URL } from "@/constants/SpotifyConstants";
import CountdownNavigateTo from "@/components/CountdownNavigateTo";
import LoadingForceGraph from "@/components/ForceGraph/LoadingGraph/LoadingGraphWrapper";
// import publicParsedEnv from "@env/publicEnv";
// import useFetchSpotifyToken from "@/hooks/Spotify/useFetchSpotifyToken";
// import useCreateArtistNetwork from "@/hooks/Spotify/useCreateArtistNetwork";
// import RelatedArtistGraph from "@/components/ForceGraph/RelatedArtistGraph/RelatedArtistGraphWrapper";

export default function NetworkPage({ params }: { params: { id: string } }) {
  const [showLoadGraph, setShowLoadGraph] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      await delay(3000); // 3 Sec
      setShowLoadGraph(false);
    })();
  }, []);

  if (showLoadGraph) {
    return <LoadingForceGraph />;
  }

  return (
    <div className="mx-14 flex h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="flex flex-col gap-2 text-base leading-tight">
        <span>
          Unfortunately, this functionality is no longer available due to
          Spotify deprecating the endpoint:
        </span>
        <span className="italic">Get Artists Related Artists</span>
      </h1>
      <h2 className="text-sm">
        For more information, please visit:{" "}
        <Link
          href={SPOTIFY_DEP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#1DB954] underline">
          Spotify API Documentation
        </Link>{" "}
      </h2>
      <h3 className="text-sm leading-none">
        Returning to the home page in:
        <CountdownNavigateTo
          className="pl-1 font-bold"
          href={"/"}
          countdown={10000}
        />
      </h3>
    </div>
  );

  //Spotify Depreciated Endpoint, functionality no longer available
  // const props = params.id.split("_");
  // const artistName = props[0];
  // const artistId = props[1];

  // if (!artistName || !artistId) {
  //   throw new Error("Undefined Artist");
  // }

  // const DEPTH = publicParsedEnv.NEXT_PUBLIC_ARTIST_NODE_DEPTH;
  // const tokenQuery = useFetchSpotifyToken();
  // const networkQuery = useCreateArtistNetwork(
  //   tokenQuery.data?.access_token,
  //   artistId,
  //   DEPTH
  // );

  // if (tokenQuery.isError) {
  //   throw new Error("Authentication Error");
  // }

  // if (networkQuery.isError) {
  //   throw new Error("Network Fetch Error");
  // }

  // if (tokenQuery.isLoading || networkQuery.isLoading) {
  //   return <LoadingForceGraph />;
  // }

  // return (
  //   <>
  //     <div className="absolute top-11 z-40 flex w-full flex-col items-center gap-1 md:top-7">
  //       <h2 className="mr-7 line-clamp-1 text-lg font-semibold">{`${decodeURIComponent(artistName)} Network`}</h2>
  //     </div>
  //     {networkQuery.data && (
  //       <RelatedArtistGraph graphData={networkQuery.data} />
  //     )}
  //   </>
  // );
}
