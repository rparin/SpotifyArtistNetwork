"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { Aimer, Aimer3 } from "../../../public/data/Aimer";
import * as THREE from "three";
import { Node } from "@/lib/utils";
import { effect } from "@preact/signals-core";
import { signalTheme } from "../UI/ThemeToggle";
import {
  fetchArtistNetwork,
  checkClientToken,
  ClientToken,
} from "@/lib/API/Spotify/SpotifyAPI";
import { ArtistCardHorizontal } from "@/components/ArtistCardHorizontal";

const Graph = (props: { query?: string; id?: string }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const [data, setData] = useState(Aimer);
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
      console.log(node);
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
    // console.log(data.nodes); //contains position of node
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
          nodeLabel="name"
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

        <div className="absolute z-40 bottom-24 flex justify-center w-full">
          <ArtistCardHorizontal
            name={"Aimer"}
            img={
              "https://i.scdn.co/image/ab6761610000e5eb71d0bf45b169d9f431a72314"
            }
            alt={"Artist profile Image"}
            genres={[
              "Anime",
              "Anime Rock",
              "J-Pixie",
              "J-Pop",
              "Genre5",
              "Genre6",
              "Genre7",
            ]}
            followers={"3817"}
            pop={"97"}
            url={"https://open.spotify.com/artist/0bAsR2unSRpn6BQPEnNlZm"}
            id={"0bAsR2unSRpn6BQPEnNlZm"}
          />
        </div>
      </div>
    </>
  );
};

export default Graph;
