"use client";
import UserForceGraph from "@/components/UserGraph/UserGraphWrapper";
import LoadingForceGraph from "@/components/LoadingGraph/LoadingGraphWrapper";
import React, { useEffect } from "react";
import { useGetFollowingArtists } from "@/lib/API/Spotify/SpotifyAPI";
import GraphError from "@/components/GraphError";

export default function MyNetwork(props: { accessToken: string }) {
  const fArtistQuery = useGetFollowingArtists(
    props.accessToken != undefined,
    props.accessToken
  );

  useEffect(() => {
    window.history.replaceState({}, "Title", "/mynetwork");
  }, []);

  if (fArtistQuery.isLoading) {
    return <LoadingForceGraph />;
  }

  if (fArtistQuery.isError) {
    return <GraphError errorMsg="Issue fetching network..." />;
  }

  return <UserForceGraph />;
}
