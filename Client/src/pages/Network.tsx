import ForceGraph from "@/components/Graph/GraphWrapper";
import { Searchbox } from "@/components/UI/Searchbox";
import { SEARCH_PLACEHOLDER } from "@/constants";
import Link from "next/link";

import { ArtistCardHorizontal } from "@/components/ArtistCardHorizontal";

export default function Network(props: { query?: string; id?: string }) {
  return (
    <>
      <div className="flex flex-col w-full items-center absolute top-16 md:top-7 gap-1 z-40">
        <Link href={"/"}>
          <h1 className="text-base line-clamp-1">{`${props.query} Network`}</h1>
        </Link>
        <Searchbox
          placeholder={SEARCH_PLACEHOLDER}
          variant={"secondary"}
          size="sm"
          inputOnLoad={props.query}
        />
      </div>
      <div className="absolute z-40 bottom-24 flex justify-center w-full">
        <ArtistCardHorizontal
          name={"Aimer"}
          img={
            "https://i.scdn.co/image/ab6761610000e5eb71d0bf45b169d9f431a72314"
          }
          alt={"Artist profile Image"}
          genres={[
            "Anime",
            "Anime Rock",
            "J-Pixie",
            "J-Pop",
            "Genre5",
            "Genre6",
            "Genre7",
          ]}
          followers={"3817"}
          pop={"97"}
          url={"https://open.spotify.com/artist/0bAsR2unSRpn6BQPEnNlZm"}
          id={"0bAsR2unSRpn6BQPEnNlZm"}
        />
      </div>
      <ForceGraph query={props.query} id={props.id} />
    </>
  );
}
