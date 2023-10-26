"use client";
import React, { useCallback, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import { mockData } from "../../public/data/data";
import * as THREE from "three";

const Graph = () => {
  const fgRef = useRef<ForceGraphMethods>();
  const [data, setData] = useState(mockData);

  const getData = () => {
    fetch("http://localhost:8080/api/related")
      .then((res) => res.json())
      .then((d) => {
        console.log(d.relatedArtists);
        setData(d.relatedArtists);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const nodeVal = (node: any) => {
    return node.r | 3;
  };

  const handleClick = useCallback(
    (node: any) => {
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      if (fgRef.current) {
        // console.log(fgRef.current);
        fgRef.current.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
          },
          node,
          3000
        );
      }
    },
    [fgRef]
  );

  return (
    <>
      <div className="relative">
        <ForceGraph3D
          nodeVal={nodeVal}
          ref={fgRef}
          graphData={data}
          nodeLabel="id"
          // nodeAutoColorBy="group"
          onNodeClick={handleClick}
          nodeThreeObject={(node: any) => {
            const imgTexture = new THREE.TextureLoader().load(`/src.jpg`);
            const mask = new THREE.TextureLoader().load(`/mask.png`);
            imgTexture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.SpriteMaterial({
              map: imgTexture,
              alphaMap: mask,
              transparent: true,
            });
            const sphere = new THREE.Sprite(material);
            sphere.scale.set(13, 13, 1);
            return sphere;
          }}
          nodeThreeObjectExtend={false}
        />
      </div>

      <button
        className="absolute top-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getData}>
        Get Artists
      </button>
    </>
  );
};

export default Graph;
