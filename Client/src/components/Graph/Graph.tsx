"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { Aimer, Aimer3 } from "../../../public/data/Aimer";
import * as THREE from "three";
import { effect } from "@preact/signals-core";
import { signalTheme } from "../UI/ThemeToggle";
import {
  fetchArtistNetwork,
  checkClientToken,
  ClientToken,
} from "@/lib/API/Spotify/SpotifyAPI";
import { ArtistCardHorizontal } from "@/components/ArtistCardHorizontal";
import { getMatObj, Node, nodeVal, getNodePreview } from "./helper";

const Graph = (props: { query?: string; id?: string }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const [data, setData] = useState(Aimer);
  const [accessToken, setAccessToken] = useState<ClientToken | null>(null);
  const [artistPreview, setArtistPreview] = useState<any | null>(null);
  const [signalThemeState, setSignalThemeState] = useState<string>(
    signalTheme.value
  );
  const [imgMaterial, setImgMaterial] = useState<any>(null);

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

  const handleHover = useCallback((node: Node | any) => {
    if (node?.id) {
      if (artistPreview && node.id == artistPreview.id) {
        return;
      }
      setArtistPreview(getNodePreview(node));
    }
  }, []);

  useEffect(() => {
    if (data?.nodes) {
      setImgMaterial(getMatObj(data.nodes));
    }

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
          nodeLabel="name"
          onNodeClick={handleClick}
          onNodeHover={handleHover}
          nodeThreeObject={(node: Node | any) => {
            const sphere = new THREE.Sprite(imgMaterial[node.id]);
            const size = 10 + nodeVal(node);
            sphere.scale.set(size, size, 1);
            return sphere;
          }}
          nodeThreeObjectExtend={false}
        />
        {artistPreview && (
          <div className="absolute z-40 bottom-24 flex justify-center w-full">
            <ArtistCardHorizontal
              name={artistPreview.name}
              img={artistPreview.img}
              alt={"Artist profile Image"}
              genres={artistPreview.genres}
              followers={artistPreview.followers}
              pop={artistPreview.pop}
              url={artistPreview.url}
              id={artistPreview.id}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Graph;
