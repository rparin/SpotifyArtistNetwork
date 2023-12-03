"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { delay } from "@/lib/utils";
import * as THREE from "three";
import { effect } from "@preact/signals-core";
import { signalTheme } from "@/components/UI/ThemeToggle";

const LoadingGraph = () => {
  const fgRef = useRef<ForceGraphMethods>();
  const [loadData, setLoadData] = useState({ nodes: [{ id: 0 }], links: [] });
  const [winSize, setWinSize] = useState<any>({
    width: undefined,
    height: undefined,
  });
  const [signalThemeState, setSignalThemeState] = useState<string>(
    signalTheme.value
  );

  const updateSize = async () => {
    setWinSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    await delay(200);
    fgRef?.current?.zoomToFit(200);
  };

  const loadIntervalFunc = useCallback(() => {
    return setInterval(() => {
      setLoadData(({ nodes, links }): any => {
        const id = nodes.length;
        return {
          nodes: [...nodes, { id }],
          links: [
            ...links,
            { source: id, target: Math.round(Math.random() * (id - 1)) },
          ],
        };
      });
    }, 500);
  }, []);

  const camIntervalFunc = useCallback(() => {
    const distance = 400;
    if (fgRef.current) {
      fgRef.current.cameraPosition({ z: distance });

      // camera orbit
      let angle = 0;
      const camIntervalId = setInterval(() => {
        if (fgRef.current) {
          fgRef.current.cameraPosition({
            x: distance * Math.sin(angle),
            z: distance * Math.cos(angle),
          });
          angle += Math.PI / 200;
        }
      }, 10);

      return camIntervalId;
    }
  }, [fgRef]);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    const loadIntervalId = loadIntervalFunc();
    const camIntervalId = camIntervalFunc();

    const stopLoad = async () => {
      await delay(10000);
      clearInterval(loadIntervalId);
      clearInterval(camIntervalId);
    };

    stopLoad();

    return () => {
      window.removeEventListener("resize", updateSize);
      effect(() => setSignalThemeState(signalTheme.value));
      clearInterval(loadIntervalId);
      clearInterval(camIntervalId);
    };
  }, []);

  return (
    <div>
      <div className="absolute flex justify-center text-center items-center z-40 w-full h-screen">
        <h1 className="select-none text-2xl bg-teal-200/75 dark:bg-teal-600/60 px-20 py-2 rounded-lg backdrop-blur-md horizontal-mask">
          Loading...
        </h1>
      </div>
      <ForceGraph3D
        width={winSize.width}
        height={winSize.height}
        showNavInfo={false}
        backgroundColor={signalThemeState == "light" ? "#E2E8F0" : "#020817"}
        linkColor={() => "#1db954"}
        linkWidth={0.5}
        linkOpacity={0.5}
        ref={fgRef}
        graphData={loadData}
        nodeLabel="id"
        nodeThreeObject={(node: Node | any) => {
          const geometry = new THREE.SphereGeometry(7, 10, 10);
          const material = new THREE.MeshBasicMaterial({
            color: signalThemeState == "dark" ? 0xffffff : 0x000000,
          });
          const sphere = new THREE.Mesh(geometry, material);
          return sphere;
        }}
        nodeThreeObjectExtend={false}
      />
    </div>
  );
};

export default LoadingGraph;
