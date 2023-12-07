"use client";

import { NO_IMAGE } from "@/constants";
import { useRef, useCallback, JSX } from "react";
import {
  useSpotifyCToken,
  useGetSearchQuery,
} from "@/lib/API/Spotify/SpotifyAPI";
import { ArtistCardVertical } from "./ArtistCardVertical";

export default function QueryResultCards(props: { query?: string }) {
  const cTokenQuery = useSpotifyCToken(!(props?.query === undefined));

  const searchQuery = useGetSearchQuery(
    !!cTokenQuery.data,
    props.query as string,
    cTokenQuery.data
  );

  // Trigger fetchNextPage when near last artist card item
  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtistCardRef = useCallback(
    (node: HTMLElement) => {
      if (searchQuery.isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if ((props?.query != undefined, searchQuery.hasNextPage)) {
            searchQuery.fetchNextPage();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [
      searchQuery.isFetchingNextPage,
      searchQuery.fetchNextPage,
      searchQuery.hasNextPage,
    ]
  );

  const getArtistCards = (data: any) => {
    if (!data) return;

    //Spotify API may return duplicate artist for a query therefore use a set to maintain unique cards
    const idSet = new Set();
    const cards: JSX.Element[] = [];

    // Get the last artist id in the list of lists to flag this card for fetchNextPage trigger
    const lastItemId =
      data.pages[data.pages.length - 1].artists.items[
        data.pages[data.pages.length - 1].artists.items.length - 1
      ]?.id;

    // Data contains a list of pages and each page contains artist items
    data.pages.map((dItem: any) => {
      dItem.artists.items.map((item: any) => {
        let bakImage = NO_IMAGE;
        if (item?.images[0]?.url) {
          bakImage = item.images[0].url;
        }
        if (!idSet.has(item.id) && lastItemId) {
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

  if (cTokenQuery.isLoading || searchQuery.isLoading) {
    return <p className="text-xl font-semibold">Loading results...</p>;
  }

  if (cTokenQuery.isError) {
    return (
      <p className="text-xl font-semibold">
        Authentication Error: {cTokenQuery.error.message}
      </p>
    );
  }

  if (searchQuery.isError) {
    return (
      <p className="text-xl font-semibold">
        Error getting artists: {searchQuery.error.message}
      </p>
    );
  }

  return (
    <>
      {getArtistCards(searchQuery.data)}
      {searchQuery.isFetchingNextPage && (
        <p className="text-xl font-semibold w-full text-center mt-3">
          Loading more results...
        </p>
      )}
    </>
  );
}
