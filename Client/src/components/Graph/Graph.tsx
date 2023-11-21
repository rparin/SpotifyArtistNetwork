"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { Aimer1, Aimer2, Aimer3 } from "../../../public/data/Aimer";
import * as THREE from "three";
import { Node, ClientToken } from "@/lib/utils";

import { effect } from "@preact/signals-core";
import { signalTheme } from "../UI/ThemeToggle";

const Graph = () => {
  const fgRef = useRef<ForceGraphMethods>();
  const [data, setData] = useState(Aimer1);
  const [authToken, setAuthToken] = useState<ClientToken | undefined>(
    undefined
  );

  const checkClientToken = async (cToken: ClientToken | undefined) => {
    let curDate = new Date().getTime();
    if (!cToken || curDate - cToken?.obtained_at >= 2400000) {
      try {
        const res = await fetch("http://localhost:8080/api/spotify/cAuthToken");
        const data = await res.json();
        return {
          access_token: data.access_token,
          obtained_at: new Date().getTime(),
        };
      } catch (error) {
        console.error("Error fetching client token:", error);
        return undefined;
      }
    }

    return cToken;
  };

  const getData = async () => {
    const aId = "0bAsR2unSRpn6BQPEnNlZm";
    const depth = 2;
    const cTokenObj = await checkClientToken(authToken);

    // handle undefined / error
    setAuthToken(cTokenObj);
    fetch(
      `http://localhost:8080/api/spotify/relatedMap/${aId}/${depth}/${cTokenObj?.access_token}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.relatedArtists);
      })
      .catch((error) => {
        console.error("Error fetching related artists:", error);
      });
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

  const [signalThemeState, setSignalThemeState] = useState<string>(
    signalTheme.value
  );

  useEffect(() => {
    console.log(signalTheme);
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
          // nodeAutoColorBy="group"
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

      {/* <button
        className="absolute top-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getData}>
        Get Artists
      </button> */}
    </>
  );
};

export default Graph;
