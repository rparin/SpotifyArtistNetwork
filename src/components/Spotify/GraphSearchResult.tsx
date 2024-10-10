import { NO_IMAGE } from "@/constants/SpotifyConstants";
import { SpotifyGraphArtistNode } from "@/dto/Spotify/SpotifyGraphArtistNodeDto";
import Image from "next/image";

export default function GraphSearchResult(props: SpotifyGraphArtistNode) {
  return (
    <>
      <div className="flex gap-3">
        <Image
          className="h-7 w-7 rounded-[50%] object-cover"
          width={100}
          height={100}
          src={props.img ? props.img : NO_IMAGE}
          alt={`${props.name} Spotify profile pic`}
        />
        {props.name}
      </div>
    </>
  );
}
