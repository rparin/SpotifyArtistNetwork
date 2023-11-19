"use client";

import { useEffect, useState, useRef, useCallback, JSX } from "react";
import { ResultArtistCard } from "./ResultArtistCard";
import { useLocalStorage } from "@/hooks/LocalStorage";
import { checkClientToken } from "@/lib/utils";
import { fetchSearchResults } from "@/lib/API/Spotify/SpotifyAPI";

export default function QueryResultCards(props: { query?: string }) {
  const { getItem, setItem, removeItem } = useLocalStorage("clientToken");
  const [searchResult, setSearchResult] = useState<JSX.Element[]>([]);
  const [nextPage, setNextPage] = useState<null | string | undefined>(
    undefined
  );
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

  async function fetchData(
    query: string,
    nextPage: null | string | undefined,
    newResult: boolean
  ) {
    setLoading(true);
    if (!props.query) return;
    const cToken = await getToken();
    const res = await fetchSearchResults(query, nextPage, cToken);
    if (res.error) return;
    setLoading(false);
    setResultHelper(res.data.artists.items, newResult);
    setPageHelper(res.data.artists.next);
  }

  useEffect(() => {
    if (props.query) {
      fetchData(props.query, undefined, true);
    }
  }, [props.query]);

  const observer = useRef<any>();
  const lastArtistCardRef = useCallback(
    (node: HTMLElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (nextPage != null && props.query) {
            fetchData(props.query, nextPage, false);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const getArtistCards = () => {
    const idSet = new Set();
    const cards: JSX.Element[] = [];
    searchResult.map((item: any, index: number) => {
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
