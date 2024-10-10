import { NO_IMAGE } from "@/constants/SpotifyConstants";
import { InfiniteData } from "@tanstack/react-query";
import { SpotifySearchArtist } from "@/schema/Spotify/SpotifySearchArtistSchema";
import ArtistCardVertical from "@/components/Spotify/ArtistCardVertical";

const getArtistCards = (
  data: InfiniteData<SpotifySearchArtist>,
  lastArtistCardRef: (node: HTMLElement) => void
) => {
  //Spotify API may return duplicate artist for a query therefore use a set to maintain unique cards
  const idSet = new Set();
  const cards: JSX.Element[] = [];

  // Get the last artist id in the list of lists to flag this card for fetchNextPage trigger
  const lastPageNo = data.pages.length - 1;
  const lastItemId = data.pages[lastPageNo].items.at(-1)?.id;

  // Data contains a list of pages and each page contains artist items
  data.pages.map((dItem) => {
    dItem.items.map((item) => {
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
            url={item.external_urls.spotify}
            alt={`Spotify Artist: ${item.name} Profile Picture`}
          />
        );
        idSet.add(item.id);
      }
    });
  });
  return cards;
};

export default getArtistCards;
