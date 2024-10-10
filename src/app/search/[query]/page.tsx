"use client";

import { useRef, useCallback } from "react";
import useFetchSpotifyToken from "@/hooks/Spotify/useFetchSpotifyToken";
import useFetchSpotifySearchArtist from "@/hooks/Spotify/useFetchSpotifySearchArtist";
import getArtistCards from "@/services/Spotify/GetArtistCards";

export default function SearchPage({ params }: { params: { query: string } }) {
  const tokenQuery = useFetchSpotifyToken();
  const searchQuery = useFetchSpotifySearchArtist(
    tokenQuery.data?.access_token,
    params.query as string
  );

  // Trigger fetchNextPage when near last artist card item
  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtistCardCallback = useCallback(
    (node: HTMLElement) => {
      if (searchQuery.isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if ((params?.query != undefined, searchQuery.hasNextPage)) {
            searchQuery.fetchNextPage();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [params?.query, searchQuery]
  );

  if (tokenQuery.isLoading || searchQuery.isLoading) {
    return (
      <p className="w-full text-center text-xl font-semibold">
        Loading results...
      </p>
    );
  }

  if (tokenQuery.isError) {
    throw new Error("Authentication Error");
  }

  if (searchQuery.isError) {
    throw new Error("Artist Fetch Error");
  }

  return (
    <>
      {searchQuery.data &&
        getArtistCards(searchQuery.data, lastArtistCardCallback)}
      {searchQuery.isFetchingNextPage && (
        <p className="mt-3 w-full text-center text-xl font-semibold">
          Loading more results...
        </p>
      )}
    </>
  );
}
