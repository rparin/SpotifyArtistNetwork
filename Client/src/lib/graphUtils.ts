import { useCallback, useEffect, useState } from "react";
import { delay } from "@/lib/utils";
import * as THREE from "three";
import { NO_IMAGE } from "@/constants";

export interface Node {
  id: string;
  name: string;
  img: string;
  followers: string;
  pop: string;
  genres: [];
  size: number;
  url: string;
}

export const IMAGES = {
  mask: "/assets/graph/mask.png",
  maskOutline: "/assets/graph/mask-outline.png",
};

export function useUpdateSize(fgRef: any) {
  const [winSize, setWinSize] = useState<any>({
    width: undefined,
    height: undefined,
  });

  async function updateSize() {
    setWinSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  async function clearSize() {
    setWinSize({
      width: undefined,
      height: undefined,
    });
    await delay(200);
    fgRef?.current?.zoomToFit(200);
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  return { winSize, updateSize, clearSize };
}

export function useImgMat(nodes: any) {
  const [imgMaterial, setImgMaterial] = useState<any>(null);

  useEffect(() => {
    if (nodes) {
      setImgMaterial(getMatObj(nodes));
    }
  }, [nodes]);

  return imgMaterial;
}

export function useReloadGraph(callback?: () => void) {
  const [reload, setReload] = useState(false);
  const refreshGraph = async () => {
    setReload(true);
    if (callback) callback();
    await delay(2000);
    setReload(false);
  };
  return { reload, refreshGraph };
}

export function getMaterial(img: string, outline: boolean = false) {
  const imgTexture = new THREE.TextureLoader().load(img);
  const mask = new THREE.TextureLoader().load(
    outline ? IMAGES.maskOutline : IMAGES.mask
  );
  imgTexture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: imgTexture,
    alphaMap: mask,
    transparent: true,
  });
  return material;
}

export function getMatObj(obj: any, outline: boolean = false) {
  const materials: any = {};
  obj.map((node: any) => {
    const nodeImg = node.img ? node.img : NO_IMAGE;
    const mat = getMaterial(nodeImg, outline);
    materials[node.id] = mat;
  });
  return materials;
}

export function nodeVal(node: Node) {
  return (node.size + 2) | 2;
}

export function getNodePreview(node: Node) {
  const nodeImg = node.img ? node.img : NO_IMAGE;
  return {
    name: node.name,
    img: nodeImg,
    followers: node.followers,
    alt: `${node.name} spotify profile Image`,
    pop: node.pop,
    genres: node.genres,
    url: node.url,
  };
}

export function getGraphSphere(color: THREE.ColorRepresentation | undefined) {
  const geometry = new THREE.SphereGeometry(7, 10, 10);
  const material = new THREE.MeshBasicMaterial({
    color: color,
  });
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
}

export function getArtistSphere(node: Node, material: THREE.SpriteMaterial) {
  let sphere = new THREE.Sprite(material);
  const size = 10 + nodeVal(node);
  sphere.scale.set(size, size, 1);
  return sphere;
}

export function getLoadingArtistSphere(node: Node) {
  let sphere = new THREE.Sprite(getMaterial(NO_IMAGE));
  const size = 10 + nodeVal(node);
  sphere.scale.set(size, size, 1);
  return sphere;
}
