"use client";

import { useEffect, useState } from "react";
import ResultArtistCard from "@/components/ResultArtistCard";
import { useLocalStorage } from "@/hooks/LocalStorage";
import { checkClientToken } from "@/lib/utils";
import { fetchSearchResults } from "@/lib/API/Spotify/SpotifyAPI";

export default function QueryResultCards(props: { query?: string }) {
  const { getItem, setItem, removeItem } = useLocalStorage("clientToken");
  const [searchResult, setSearchResult] = useState<null | any>(null);
  const [pages, setPages] = useState<null | {}>(null);

  const getToken = async () => {
    await checkClientToken(getItem()).then((data) => {
      setItem(data);
    });
    return getItem().access_token;
  };

  useEffect(() => {
    async function doWork() {
      if (!props.query) return;
      const cToken = await getToken();
      const res = await fetchSearchResults(props.query, cToken);
      const cards = res.data.artists.items.map((item: any, index: any) => {
        let bakImage = "./noImage.png";
        if (item?.images[0]?.url) {
          bakImage = item.images[0].url;
        }

        return (
          <ResultArtistCard
            key={item.id}
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
      });

      setSearchResult(cards);

      setPages({
        prev: res.data.artists.previous,
        next: res.data.artists.next,
      });
    }

    doWork();
  }, [props.query]);

  return <>{searchResult}</>;
}
