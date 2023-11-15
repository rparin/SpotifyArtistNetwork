import { Searchbox } from "@/components/UI/Searchbox";
import { APP_NAME } from "@/constants";
import { SEARCH_PLACEHOLDER } from "@/constants";
import ArtistCard from "@/components/UI/ArtistCard";

export default function SearchResults() {
  const artistName = "Aimer";
  const aImage =
    "https://i.scdn.co/image/ab6761610000e5eb71d0bf45b169d9f431a72314";
  const aImageAlt = "Artist profile Image";
  const spotUrl = "https://open.spotify.com/artist/0bAsR2unSRpn6BQPEnNlZm";
  const followers = "3,817";
  const pop = "97";
  const genres = [
    "Anime",
    "Anime Rock",
    "J-Pixie",
    "J-Pop",
    "Genre5",
    "Genre6",
    "Genre7",
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row text-center items-center gap-5 pt-10 md:pt-5 px-5">
        <h1 className="text-2xl">{APP_NAME}</h1>
        <Searchbox placeholder={SEARCH_PLACEHOLDER} size="md" />
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3 mx-12">
        <ArtistCard
          name={artistName}
          genres={genres}
          followers={followers}
          pop={pop}
          img={aImage}
          alt={aImageAlt}
          url={spotUrl}
        />
      </div>
    </>
  );
}