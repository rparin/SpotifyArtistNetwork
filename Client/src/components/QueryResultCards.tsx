"use client";

import { useEffect, useState, useRef, useCallback, JSX } from "react";
import { ResultArtistCard, artistCardType } from "./ResultArtistCard";
import { useLocalStorage } from "@/hooks/LocalStorage";
import { checkClientToken } from "@/lib/utils";
import {
  fetchSearchResults,
  fetchNextPageSearchResults,
} from "@/lib/API/Spotify/SpotifyAPI";

export default function QueryResultCards(props: { query?: string }) {
  const { getItem, setItem, removeItem } = useLocalStorage("clientToken");
  const [searchResult, setSearchResult] = useState<null | any>(null);
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const parseNextPage = (nextPage: string) => {
    const searchParams = new URLSearchParams(nextPage);
    return `query=${props.query}&type=artist&offset=${searchParams.get(
      "offset"
    )}&limit=${searchParams.get("limit")}`;
  };

  const getToken = async () => {
    await checkClientToken(getItem()).then((data) => {
      setItem(data);
    });
    return getItem().access_token;
  };

  const setPage = (page: string | null) => {
    if (page) {
      setNextPage(parseNextPage(page));
    } else {
      setNextPage(null);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (!props.query) return;
      const cToken = await getToken();
      const res = await fetchSearchResults(props.query, cToken);
      setLoading(false);
      if (res.error) return;
      setPage(res.data.artists.next);
      setSearchResult(res.data.artists.items);
    }

    fetchData();
  }, [props.query]);

  const observer = useRef<any>();
  const lastArtistCardRef = useCallback(
    (node: HTMLElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      async function fetchData() {
        const cToken = await getToken();
        if (!nextPage) return;
        const res = await fetchNextPageSearchResults(nextPage, cToken);
        if (res.error) return;
        setSearchResult((prev: any) => [...prev, ...res.data.artists.items]);
        setPage(res.data.artists.next);
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          fetchData();
          setLoading(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextPage]
  );

  const getArtistCards = () => {
    if (!searchResult) return;
    const idSet = new Set();
    const cards: JSX.Element[] = [];
    searchResult.map((item: any, index: any) => {
      let bakImage = "./noImage.png";
      if (item?.images[0]?.url) {
        bakImage = item.images[0].url;
      }
      if (!idSet.has(item.id)) {
        cards.push(
          <ResultArtistCard
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

  return <>{getArtistCards()}</>;
}
