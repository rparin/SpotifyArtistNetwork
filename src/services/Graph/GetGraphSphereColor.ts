import * as THREE from "three";

export default function getGraphSphereColor(
  color: THREE.ColorRepresentation | undefined
) {
  const geometry = new THREE.SphereGeometry(7, 10, 10);
  const material = new THREE.MeshBasicMaterial({
    color: color,
  });
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
}
