import * as THREE from "three";
import calcNodeVal from "@/services/Graph/CalcNodeVal";
import { SpotifyGraphArtistNode } from "@/dto/Spotify/SpotifyGraphArtistNodeDto";

export default function getArtistSphereSize(
  node: SpotifyGraphArtistNode,
  material: THREE.SpriteMaterial
) {
  const sphere = new THREE.Sprite(material);
  const size = 10 + calcNodeVal(node);
  sphere.scale.set(size, size, 1);
  return sphere;
}
