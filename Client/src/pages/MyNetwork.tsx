"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { delay } from "@/lib/utils";
import * as THREE from "three";
import { effect } from "@preact/signals-core";
import { signalTheme } from "@/components/UI/ThemeToggle";

export default function MyNetwork() {
  const fgRef = useRef<ForceGraphMethods>();
  const [loadData, setLoadData] = useState<any>({
    nodes: [{ id: 0 }],
    links: [],
  });
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
    // await delay(200);
    // fgRef?.current?.zoomToFit(200);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);

    const data = {
      nodes: [
        {
          id: "id1",
          name: "name1",
        },
        {
          id: "id2",
          name: "name2",
        },
        {
          id: "id3",
          name: "name3",
        },
        {
          id: "id4",
          name: "name4",
        },
      ],
      links: [
        {
          source: "id1",
          target: "id2",
          linkType: "main",
        },
        {
          source: "id1",
          target: "id3",
          linkType: "related",
        },
        {
          source: "id3",
          target: "id4",
          linkType: "main",
        },
        {
          source: "id1",
          target: "id4",
          linkType: "related",
        },
      ],
    };

    setLoadData(data);
    return () => {
      window.removeEventListener("resize", updateSize);
      effect(() => setSignalThemeState(signalTheme.value));
    };
  }, []);

  return (
    <div className="relative">
      <ForceGraph3D
        width={winSize.width}
        height={winSize.height}
        showNavInfo={false}
        backgroundColor={signalThemeState == "light" ? "#E2E8F0" : "#020817"}
        linkColor={(node: Node | any) => {
          return node.linkType == "main" ? "green" : "blue";
        }}
        // linkAutoColorBy="group"
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
}
