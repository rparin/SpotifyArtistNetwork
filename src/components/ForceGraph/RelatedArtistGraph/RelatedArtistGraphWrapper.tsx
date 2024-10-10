import dynamic from "next/dynamic";

const ArtistGraph = dynamic(() => import("./RelatedArtistGraph"), {
  ssr: false,
});

export default ArtistGraph;
