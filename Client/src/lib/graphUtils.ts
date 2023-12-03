import { useEffect, useState } from "react";
import { delay } from "@/lib/utils";
import * as THREE from "three";

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
    await delay(200);
    fgRef?.current?.zoomToFit(200);
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  return { winSize, updateSize };
}

export function getGraphSphere(color: THREE.ColorRepresentation | undefined) {
  const geometry = new THREE.SphereGeometry(7, 10, 10);
  const material = new THREE.MeshBasicMaterial({
    color: color,
  });
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
}
