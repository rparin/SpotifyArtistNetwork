import { SpotifyArtistNode } from "@/dto/Spotify/SpotifyArtistNodeDto";

export default function calcNodeVal(node: SpotifyArtistNode) {
  return (node.size + 2) | 2;
}
