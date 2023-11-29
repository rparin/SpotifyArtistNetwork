"use client";

import { NO_IMAGE } from "@/constants";
import { useState, useRef, useCallback, JSX, useEffect, use } from "react";
import { ArtistCardVertical } from "./ArtistCardVertical";
import {
  fetchSearchResults,
  getClientToken,
} from "@/lib/API/Spotify/SpotifyAPI";
import { useQuery } from "@tanstack/react-query";

export default function QueryResultCards(props: { query?: string }) {
  const [searchResult, setSearchResult] = useState<JSX.Element[]>([]);
  const [nextPage, setNextPage] = useState<null | string | undefined>(
    undefined
  );

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
    refetchInterval: 3000000, //50 minutes
    staleTime: 3000000, //50 minutes
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    enabled: !!cToken,
    queryKey: ["query", props.query, nextPage],
    queryFn: async () => {
      const res = await fetchSearchResults(
        props.query as string,
        nextPage,
        cToken
      );
      console.log(res);
      return res.artists.items;
    },
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtistCardRef = useCallback(
    (node: HTMLElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (cToken != undefined && props?.query != undefined) {
            console.log("here");
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const getArtistCards = () => {
    const idSet = new Set();
    const cards: JSX.Element[] = [];
    data.map((item: any, index: number) => {
      let bakImage = NO_IMAGE;
      if (item?.images[0]?.url) {
        bakImage = item.images[0].url;
      }
      if (!idSet.has(item.id)) {
        cards.push(
          <ArtistCardVertical
            ref={data.length === index + 1 ? lastArtistCardRef : null}
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

  return <>{getArtistCards()}</>;
}
