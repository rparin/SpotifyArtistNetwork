"use client";

import { NO_IMAGE } from "@/constants";
import { useState, useRef, useCallback, JSX } from "react";
import { ArtistCardVertical } from "./ArtistCardVertical";
import {
  fetchSearchResults,
  checkClientToken,
  ClientToken,
} from "@/lib/API/Spotify/SpotifyAPI";
import { useQuery } from "@tanstack/react-query";

export default function QueryResultCards(props: { query?: string }) {
  const [searchResult, setSearchResult] = useState<JSX.Element[]>([]);
  const [accessToken, setAccessToken] = useState<ClientToken | null>(null);
  const [initialSearch, setInitialSearch] = useState(true);
  const [nextPage, setNextPage] = useState<null | string | undefined>(
    undefined
  );

  const parseNextPage = (nextPage: string) => {
    const searchParams = new URLSearchParams(nextPage);
    return `query=${props.query}&type=artist&offset=${searchParams.get(
      "offset"
    )}&limit=${searchParams.get("limit")}`;
  };

  const setPageHelper = (page: string | null) => {
    if (page) {
      setNextPage(parseNextPage(page));
    } else {
      setNextPage(null);
    }
  };

  const setResultHelper = (result: JSX.Element[], newResult: boolean) => {
    if (newResult) {
      setSearchResult(result);
    } else {
      setSearchResult((prev: JSX.Element[]) => [...prev, ...result]);
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    enabled: props?.query != undefined,
    queryKey: ["query", props.query],
    queryFn: async () => {
      if (nextPage === null) return null;
      const cToken = await checkClientToken(accessToken);
      setAccessToken(cToken);
      const res = await fetchSearchResults(
        props.query as string,
        nextPage,
        cToken?.access_token
      );
      setResultHelper(res.data.artists.items, initialSearch);
      setPageHelper(res.data.artists.next);
      if (initialSearch) setInitialSearch(false);
      return res;
    },
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtistCardRef = useCallback(
    (node: HTMLElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          refetch();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const getArtistCards = () => {
    const idSet = new Set();
    const cards: JSX.Element[] = [];
    searchResult.map((item: any, index: number) => {
      let bakImage = NO_IMAGE;
      if (item?.images[0]?.url) {
        bakImage = item.images[0].url;
      }
      if (!idSet.has(item.id)) {
        cards.push(
          <ArtistCardVertical
            ref={searchResult.length === index + 1 ? lastArtistCardRef : null}
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

  return (
    <>
      {isLoading && initialSearch && (
        <p className="text-xl font-semibold">Loading results...</p>
      )}

      {getArtistCards()}
    </>
  );
}
