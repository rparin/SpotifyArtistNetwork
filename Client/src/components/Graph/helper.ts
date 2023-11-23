import * as THREE from "three";

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

const getMaterial = (img: string) => {
  const imgTexture = new THREE.TextureLoader().load(img);
  const mask = new THREE.TextureLoader().load("/mask.png");
  imgTexture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: imgTexture,
    alphaMap: mask,
    transparent: true,
  });
  return material;
};

export const getMatObj = (obj: any) => {
  const materials: any = {};
  obj.map((node: any) => {
    const nodeImg = node.img ? node.img : "/noImage.jpg";
    const mat = getMaterial(nodeImg);
    materials[node.id] = mat;
  });
  return materials;
};

export const nodeVal = (node: Node) => {
  return (node.size + 2) | 2;
};

export const getNodePreview = (node: Node) => {
  const nodeImg = node.img ? node.img : "/noImage.jpg";
  return {
    name: node.name,
    img: nodeImg,
    followers: node.followers,
    alt: `${node.name} spotify profile Image`,
    pop: node.pop,
    genres: node.genres,
    url: node.url,
  };
};
