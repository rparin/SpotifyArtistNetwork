import * as THREE from "three";
import { useState } from "react";
import { GRAPH_IMAGES, NO_IMAGE } from "@/constants/SpotifyConstants";
import {
  SpotifyArtistNode,
  SpotifyArtistNodeArray,
} from "@/dto/Spotify/SpotifyArtistNodeDto";
import Dictionary from "@/types/Dictionary";

function getMaterial(img: string, outline: boolean = false) {
  const imgTexture = new THREE.TextureLoader().load(img);
  const mask = new THREE.TextureLoader().load(
    outline ? GRAPH_IMAGES.maskOutline : GRAPH_IMAGES.mask
  );
  imgTexture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: imgTexture,
    alphaMap: mask,
    transparent: true,
  });
  return material;
}

function getMatObj(obj: SpotifyArtistNodeArray, outline: boolean = false) {
  const materials: Dictionary<THREE.SpriteMaterial> = {};
  obj.map((node: SpotifyArtistNode) => {
    const nodeImg = node.img ? node.img : NO_IMAGE;
    const mat = getMaterial(nodeImg, outline);
    materials[node.id] = mat;
  });
  return materials;
}

export default function useImgMat(nodes: SpotifyArtistNodeArray) {
  const [imgMaterial, setImgMaterial] = useState(getMatObj(nodes));
  return imgMaterial;
}
