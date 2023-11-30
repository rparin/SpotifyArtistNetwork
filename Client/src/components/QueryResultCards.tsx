"use client";

import { NO_IMAGE } from "@/constants";
import { useState, useRef, useCallback, JSX, useEffect } from "react";
import { ArtistCardVertical } from "./ArtistCardVertical";
import {
  fetchSearchResults,
  getClientToken,
} from "@/lib/API/Spotify/SpotifyAPI";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export default function QueryResultCards(props: { query?: string }) {
  const parseNextPage = (nextPage: string) => {
    const searchParams = new URLSearchParams(nextPage);
    return `query=${props.query}&type=artist&offset=${searchParams.get(
      "offset"
    )}&limit=${searchParams.get("limit")}`;
  };

  const {
    data: cToken,
    isLoading: iscTokenLoading,
    isError: iscTokenError,
    error: ctokenError,
  } = useQuery({
    enabled: props?.query != undefined,
    queryKey: ["cToken"],
    queryFn: getClientToken,
    refetchOnWindowFocus: true,
    refetchInterval: 3000000, //grab new token every 50 minutes
    staleTime: 3000000, //cache token for 50 minutes
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
    isError,
  } = useInfiniteQuery({
    enabled: !!cToken,
    queryKey: ["query", props.query],
    queryFn: (params: any) => {
      return fetchSearchResults(
        props.query as string,
        params.pageParam,
        cToken
      );
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: any) => {
      if (lastPage.artists.next == null) return null;
      return parseNextPage(lastPage.artists.next);
    },
    staleTime: 600000, //cache search for 10 minutes
  });

  // Trigger fetchNextPage when near last artist card item
  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtistCardRef = useCallback(
    (node: HTMLElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if ((cToken != undefined && props?.query != undefined, hasNextPage)) {
            fetchNextPage();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const getArtistCards = () => {
    if (!data) return;

    //Spotify API may return duplicate artist for a query therefore use a set to maintain unique cards
    const idSet = new Set();
    const cards: JSX.Element[] = [];

    // Get the last artist id in the list of lists to flag this card for fetchNextPage trigger
    const lastItemId =
      data.pages[data.pages.length - 1].artists.items[
        data.pages[data.pages.length - 1].artists.items.length - 1
      ].id;

    // Data contains a list of pages and each page contains artist items
    data.pages.map((dItem: any) => {
      dItem.artists.items.map((item: any) => {
        let bakImage = NO_IMAGE;
        if (item?.images[0]?.url) {
          bakImage = item.images[0].url;
        }
        if (!idSet.has(item.id)) {
          cards.push(
            <ArtistCardVertical
              ref={item.id === lastItemId ? lastArtistCardRef : null}
              key={`${item.id}`}
              id={item.id}
              name={item.name}
              genres={item.genres}
              followers={item.followers.total}
              pop={item.popularity}
              img={bakImage}
              alt={`${item.name} Spotify profile picture`}
              url={item.external_urls.spotify}
            />
          );
          idSet.add(item.id);
        }
      });
    });
    return cards;
  };

  if (iscTokenLoading || isLoading) {
    return <p className="text-xl font-semibold">Loading results...</p>;
  }

  if (iscTokenError) {
    return (
      <p className="text-xl font-semibold">
        Authentication Error: {ctokenError.message}
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-xl font-semibold">
        Error getting artists: {error.message}
      </p>
    );
  }

  return <> {getArtistCards()} </>;
}
