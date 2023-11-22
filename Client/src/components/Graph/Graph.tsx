"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { Aimer1, Aimer2, Aimer3 } from "../../../public/data/Aimer";
import * as THREE from "three";
import { Node } from "@/lib/utils";
import { effect } from "@preact/signals-core";
import { signalTheme } from "../UI/ThemeToggle";
import {
  fetchArtistNetwork,
  checkClientToken,
  ClientToken,
} from "@/lib/API/Spotify/SpotifyAPI";

const Graph = (props: { query?: string; id?: string }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const [data, setData] = useState(Aimer1);
  const [accessToken, setAccessToken] = useState<ClientToken | null>(null);
  const [signalThemeState, setSignalThemeState] = useState<string>(
    signalTheme.value
  );

  const getData = async () => {
    if (!props.id) return;
    const depth = "2";
    const cToken = await checkClientToken(accessToken);
    setAccessToken(cToken);
    if (!cToken) return;
    const res = await fetchArtistNetwork(props.id, depth, cToken.access_token);
    if (res.error || !res) return;
    setData(res.relatedArtists);
  };

  const nodeVal = (node: Node) => {
    return (node.size + 2) | 2;
  };

  const handleClick = useCallback(
    (node: Node | any) => {
      const distance = 70;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      if (fgRef.current) {
        fgRef.current.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
          },
          node,
          2000
        );
      }
    },
    [fgRef]
  );

  useEffect(() => {
    // getData();
  }, []);

  useEffect(() => {
    return effect(() => setSignalThemeState(signalTheme.value));
  }, []);

  return (
    <>
      <div className="relative">
        <ForceGraph3D
          backgroundColor={signalThemeState == "light" ? "#E2E8F0" : "#020817"}
          linkColor={() => "#1db954"}
          linkOpacity={0.5}
          ref={fgRef}
          graphData={data}
          nodeLabel="id"
          onNodeClick={handleClick}
          nodeThreeObject={(node: Node | any) => {
            const nodeImg = node.img ? node.img : "/noImage.jpg";
            const imgTexture = new THREE.TextureLoader().load(nodeImg);
            const mask = new THREE.TextureLoader().load("/mask.png");
            imgTexture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.SpriteMaterial({
              map: imgTexture,
              alphaMap: mask,
              transparent: true,
            });
            const sphere = new THREE.Sprite(material);
            const size = 10 + nodeVal(node);
            sphere.scale.set(size, size, 1);
            return sphere;
          }}
          nodeThreeObjectExtend={false}
        />
      </div>
    </>
  );
};

export default Graph;
