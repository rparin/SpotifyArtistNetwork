import dynamic from "next/dynamic";

const ArtistGraph = dynamic(() => import("./ArtistGraph"), {
  ssr: false,
});

export default ArtistGraph;
